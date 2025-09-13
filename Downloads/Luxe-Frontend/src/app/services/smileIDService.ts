/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

export interface VerificationResult {
    success: boolean
    jobId?: string
    confidence?: number
    verified?: boolean
    error?: string
    extractedData?: {
      firstName?: string
      lastName?: string
      idNumber?: string
      dateOfBirth?: string
      expiryDate?: string
    }
  }
  
  export class SmileIdService {
    private static instance: SmileIdService
    
    public static getInstance(): SmileIdService {
      if (!SmileIdService.instance) {
        SmileIdService.instance = new SmileIdService()
      }
      return SmileIdService.instance
    }
  
    /**
     * Submit documents for verification
     */
    async verifyDocument(
      userId: string,
      idType: 'NATIONAL_ID' | 'PASSPORT',
      documentFront: File,
      documentBack: File,
      userData: {
        firstName: string
        lastName: string
        email: string
        phone: string
      }
    ): Promise<VerificationResult> {
      try {
        // Convert files to base64
        const frontBase64 = await this.fileToBase64(documentFront)
        const backBase64 = await this.fileToBase64(documentBack)
  
        const response = await fetch('/api/smile-id/verify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            idType,
            documentFront: frontBase64,
            documentBack: backBase64,
            userData,
          }),
        })
  
        const result = await response.json()
  
        if (result.success) {
          return {
            success: true,
            jobId: result.jobId,
            verified: true,
          }
        } else {
          return {
            success: false,
            error: result.error || 'Verification failed',
          }
        }
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Network error during verification',
        }
      }
    }
  
    /**
     * Check verification status by job ID
     */
    async checkVerificationStatus(jobId: string): Promise<VerificationResult> {
      try {
        const response = await fetch(`/api/smile-id/verify?jobId=${jobId}`)
        const result = await response.json()
  
        return {
          success: result.success,
          jobId,
          verified: result.data?.job_success && result.data?.result?.id_verification?.verified,
          confidence: result.data?.result?.id_verification?.confidence,
          extractedData: result.data?.result?.id_verification?.extracted_data,
          error: result.error,
        }
      } catch (error: any) {
        return {
          success: false,
          error: error.message || 'Failed to check verification status',
        }
      }
    }
  
    /**
     * Validate document quality before sending to Smile ID
     */
    async validateDocumentQuality(file: File): Promise<{ valid: boolean; error?: string }> {
      // Basic file validation
      if (!file.type.startsWith('image/')) {
        return { valid: false, error: 'File must be an image' }
      }
  
      if (file.size > 5 * 1024 * 1024) {
        return { valid: false, error: 'File size must be less than 5MB' }
      }
  
      if (file.size < 50 * 1024) {
        return { valid: false, error: 'File size too small - image may not be clear enough' }
      }
  
      // Check image dimensions
      try {
        const dimensions = await this.getImageDimensions(file)
        if (dimensions.width < 300 || dimensions.height < 300) {
          return { valid: false, error: 'Image resolution too low - minimum 300x300 pixels required' }
        }
      } catch (error) {
        return { valid: false, error: 'Could not process image' }
      }
  
      return { valid: true }
    }
  
    /**
     * Get supported ID types for a country
     */
    getSupportedIdTypes(country: string = 'GH'): Array<{ value: string; label: string }> {
      const idTypes: Record<string, Array<{ value: string; label: string }>> = {
        GH: [
          { value: 'NATIONAL_ID', label: 'Ghana National ID' },
          { value: 'PASSPORT', label: 'Passport' },
          { value: 'DRIVERS_LICENSE', label: 'Driver\'s License' },
        ],
        NG: [
          { value: 'NATIONAL_ID', label: 'National ID' },
          { value: 'PASSPORT', label: 'Passport' },
          { value: 'DRIVERS_LICENSE', label: 'Driver\'s License' },
          { value: 'VOTERS_CARD', label: 'Voter\'s Card' },
        ],
        KE: [
          { value: 'NATIONAL_ID', label: 'National ID' },
          { value: 'PASSPORT', label: 'Passport' },
        ],
      }
  
      return idTypes[country] || idTypes.GH
    }
  
    // Private helper methods
    private fileToBase64(file: File): Promise<string> {
      return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
          const result = reader.result as string
          // Remove the data URL prefix
          const base64 = result.split(',')[1]
          resolve(base64)
        }
        reader.onerror = (error) => reject(error)
      })
    }
  
    private getImageDimensions(file: File): Promise<{ width: number; height: number }> {
      return new Promise((resolve, reject) => {
        const img = new Image()
        const url = URL.createObjectURL(file)
        
        img.onload = () => {
          URL.revokeObjectURL(url)
          resolve({
            width: img.naturalWidth,
            height: img.naturalHeight,
          })
        }
        
        img.onerror = () => {
          URL.revokeObjectURL(url)
          reject(new Error('Failed to load image'))
        }
        
        img.src = url
      })
    }
  }
  
  // Export singleton instance
  export const smileIdService = SmileIdService.getInstance()