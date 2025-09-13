"use client";
import { Mail, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function VerifyEmailPage() {
  const [isResending, setIsResending] = useState(false);

  const handleResendEmail = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsResending(false);
  };

  return (
    <div className="min-h-screen font-[Poppins-regular] flex items-center justify-center bg-gradient-to-br from-emerald-50 to-amber-50 p-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md w-full text-center border border-emerald-100">
        {/* Email Icon */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <Mail className="w-8 h-8 text-emerald-600" />
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="text-3xl font-[Poppins] font-semibold text-emerald-900 mb-3">
          Check Your Email
        </h1>

        {/* Subheading */}
        <p className="text-emerald-700 font-medium mb-6">
          We&apos;ve sent a verification link to your email
        </p>

        {/* Instructions */}
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <p className="text-gray-700 text-sm leading-relaxed">
            Please check your inbox and click the verification link to activate your account.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleResendEmail}
            disabled={isResending}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-400 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
          >
            {isResending ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Sending...
              </>
            ) : (
              "Resend Verification Email"
            )}
          </button>

          <a
            href="/signin"
            className="block w-full text-emerald-800 hover:text-emerald-900 font-medium py-3 px-4 rounded-lg border border-emerald-200 hover:border-emerald-300 transition-colors duration-200"
          >
            Back to Sign In
          </a>
        </div>

        {/* Help Text */}
        <div className="mt-8 pt-6 border-t border-gray-100">
          <p className="text-gray-500 text-sm">
            <span className="font-medium">Didn&apos;t receive the email?</span>
            <br />
            Check your spam folder or try resending
          </p>
        </div>
      </div>
    </div>
  );
}