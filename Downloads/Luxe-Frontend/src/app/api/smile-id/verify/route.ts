/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

interface SmileIdRequest {
  userId: string
  idType: 'NATIONAL_ID' | 'PASSPORT'
  documentFront: string // base64
  documentBack: string // base64
  userData: {
    firstName: string
    lastName: string
    email: string
    phone: string
  }
}

interface SmileIdResponse {
  success: boolean
  jobId?: string
  error?: string
  verificationResult?: any
}

// Smile ID API configuration
const SMILE_ID_CONFIG = {
  partnerId: process.env.SMILE_ID_PARTNER_ID!,
  apiKey: process.env.SMILE_ID_API_KEY!,
  baseUrl: process.env.SMILE_ID_ENVIRONMENT === 'production' 
    ? 'https://3eydmgh10d.execute-api.us-west-2.amazonaws.com/test' 
    : 'https://testapi.smileidentity.com/v1',
  environment: process.env.SMILE_ID_ENVIRONMENT || 'sandbox'
}

// Generate signature for Smile ID API
function generateSignature(timestamp: string, partnerId: string, requestId: string, apiKey: string): string {
  const data = `${timestamp}${partnerId}${requestId}`
  return crypto.createHmac('sha256', apiKey).update(data).digest('hex')
}

// Generate unique request ID
function generateRequestId(): string {
  return crypto.randomUUID()
}

export async function POST(request: NextRequest): Promise<NextResponse<SmileIdResponse>> {
  try {
    const body: SmileIdRequest = await request.json()
    
    // Validate required fields
    if (!body.userId || !body.documentFront || !body.documentBack) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    // Generate request metadata
    const timestamp = Date.now().toString()
    const requestId = generateRequestId()
    const signature = generateSignature(timestamp, SMILE_ID_CONFIG.partnerId, requestId, SMILE_ID_CONFIG.apiKey)

    // Prepare the request payload for Smile ID
    const smileIdPayload = {
      source_sdk: 'rest_api',
      source_sdk_version: '1.0.0',
      partner_id: SMILE_ID_CONFIG.partnerId,
      signature,
      timestamp,
      partner_params: {
        user_id: body.userId,
        job_id: requestId,
        job_type: 4, // Document verification job type
      },
      images: [
        {
          image_type_id: 1, // Front of document
          image: body.documentFront,
        },
        {
          image_type_id: 7, // Back of document  
          image: body.documentBack,
        }
      ],
      id_info: {
        country: 'GH', // Ghana
        id_type: body.idType,
        id_number: '', // Optional - can be extracted from document
        first_name: body.userData.firstName,
        last_name: body.userData.lastName,
        middle_name: '', // Optional
        phone_number: body.userData.phone,
        entered: true
      }
    }

    // Make request to Smile ID API
    const response = await fetch(`${SMILE_ID_CONFIG.baseUrl}/upload`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(smileIdPayload)
    })

    const smileIdResult = await response.json()

    if (response.ok && smileIdResult.upload_url) {
      // Successfully submitted for verification
      return NextResponse.json({
        success: true,
        jobId: requestId,
        verificationResult: smileIdResult
      })
    } else {
      // Handle Smile ID API errors
      return NextResponse.json({
        success: false,
        error: smileIdResult.error || smileIdResult.code || 'Verification failed'
      }, { status: 400 })
    }

  } catch (error: any) {
    console.error('Smile ID API Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Internal server error during verification'
    }, { status: 500 })
  }
}

// Optional: GET endpoint to check verification status
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get('jobId')
    
    if (!jobId) {
      return NextResponse.json({
        success: false,
        error: 'Job ID is required'
      }, { status: 400 })
    }

    const timestamp = Date.now().toString()
    const requestId = generateRequestId()
    const signature = generateSignature(timestamp, SMILE_ID_CONFIG.partnerId, requestId, SMILE_ID_CONFIG.apiKey)

    // Check job status with Smile ID
    const response = await fetch(`${SMILE_ID_CONFIG.baseUrl}/job_status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        partner_id: SMILE_ID_CONFIG.partnerId,
        signature,
        timestamp,
        user_id: jobId,
        job_id: jobId,
      })
    })

    const result = await response.json()

    return NextResponse.json({
      success: response.ok,
      data: result
    })

  } catch (error: any) {
    console.error('Smile ID Status Check Error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to check verification status'
    }, { status: 500 })
  }
}