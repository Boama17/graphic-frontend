/* eslint-disable @typescript-eslint/no-explicit-any */

import { NextRequest, NextResponse } from 'next/server'
import crypto from 'crypto'

interface SmileIdWebhookPayload {
  job_id: string
  user_id: string
  job_type: number
  job_complete: boolean
  job_success: boolean
  result: {
    right_eye_open: number
    left_eye_open: number
    smile_score: number
    id_verification: {
      confidence: number
      verified: boolean
    }
  }
  history: any[]
  timestamp: string
  signature: string
}

// Verify webhook signature
function verifySignature(payload: string, signature: string, apiKey: string): boolean {
  const expectedSignature = crypto
    .createHmac('sha256', apiKey)
    .update(payload)
    .digest('hex')
  
  return crypto.timingSafeEqual(
    Buffer.from(signature, 'hex'),
    Buffer.from(expectedSignature, 'hex')
  )
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = await request.text()
    const webhookData: SmileIdWebhookPayload = JSON.parse(body)
    
    // Verify the webhook signature
    const signature = request.headers.get('x-smile-signature') || webhookData.signature
    if (!signature || !verifySignature(body, signature, process.env.SMILE_ID_API_KEY!)) {
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      )
    }

    console.log('Smile ID Webhook received:', {
      jobId: webhookData.job_id,
      userId: webhookData.user_id,
      jobComplete: webhookData.job_complete,
      jobSuccess: webhookData.job_success,
    })

    // Process the verification result
    if (webhookData.job_complete) {
      const isVerified = webhookData.job_success && 
                        webhookData.result?.id_verification?.verified

      // Here you can update your database with the verification status
      // Example:
      // await updateUserVerificationStatus(webhookData.user_id, {
      //   status: isVerified ? 'verified' : 'failed',
      //   jobId: webhookData.job_id,
      //   confidence: webhookData.result?.id_verification?.confidence,
      //   timestamp: new Date().toISOString()
      // })

      console.log(`Verification ${isVerified ? 'successful' : 'failed'} for user:`, webhookData.user_id)
    }

    // Respond with success
    return NextResponse.json({ received: true })

  } catch (error: any) {
    console.error('Webhook processing error:', error)
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    )
  }
}

// Handle webhook verification (GET request)
export async function GET(request: NextRequest): Promise<NextResponse> {
  // Some webhook services send a verification challenge
  const { searchParams } = new URL(request.url)
  const challenge = searchParams.get('challenge')
  
  if (challenge) {
    return NextResponse.json({ challenge })
  }
  
  return NextResponse.json({ status: 'Webhook endpoint active' })
}