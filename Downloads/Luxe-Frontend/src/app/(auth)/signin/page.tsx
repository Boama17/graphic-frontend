//sign-in
"use client"
import { useState, useEffect } from "react";
import Image from "next/image";
import one from "../../../assets/img/one.jpg";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { authService } from "@/app/services/authService";

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isCheckingRedirect, setIsCheckingRedirect] = useState(true);
  const router = useRouter();

  // Check for redirect result on component mount
 // Wrap your checkForRedirectResult in a timeout to prevent hanging
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;

      const checkForRedirectResult = async () => {
        try {
          // Set a timeout fallback to avoid hanging
          timeoutId = setTimeout(() => {
            setIsCheckingRedirect(false);
          }, 7000); // fallback in case Firebase hangs

          const result = await authService.checkRedirectResult();
          clearTimeout(timeoutId);

          if (result.success && result.user) {
            console.log("User signed in via redirect:", result.user);
            router.push("/admin");
            return;
          }

          // Wait briefly to allow Firebase to set currentUser
          setTimeout(() => {
            const currentUser = authService.getCurrentUser();
            if (currentUser) {
              console.log("Recovered user after redirect:", currentUser);
              router.push("/admin");
            } else {
              setIsCheckingRedirect(false);
            }
          }, 1500);
        } catch (err) {
          console.error("Redirect check failed:", err);
          setError("Failed to complete Google sign-in. Please try again.");
          setIsCheckingRedirect(false);
        }
      };

      checkForRedirectResult();

      return () => {
        if (timeoutId) clearTimeout(timeoutId);
      };
    }, [router]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await authService.signInWithEmail(formData.email, formData.password);
      
      if (result.success) {
        console.log("User signed in:", result.user);
        router.push("/admin");
      } else {
        setError(result.error || "An error occurred during sign in.");
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    setError("");
  
    try {
      const result = await authService.signInWithGoogle();
      
      if (result.success) {
        if (result.redirecting) {
          // For mobile redirect, we'll handle the result in the useEffect
          return;
        }
        
        // For desktop popup success
        console.log("User signed in with Google:", result.user);
        router.push("/admin");
      } else {
        setError(result.error || "An error occurred during Google sign in.");
        setIsLoading(false);
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again.");
      console.error("Google sign-in error:", err);
      setIsLoading(false);
    }
  };

  // Show loading spinner while checking for redirect result
  if (isCheckingRedirect) {
    return (
      <div className="min-h-screen bg-amber-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-amber-50 flex flex-col font-[Poppins-regular]">
      {/* Main Content */}
      <main className="flex-grow flex flex-col lg:flex-row">
        {/* Form Section */}
        <section className="w-full lg:w-1/2 p-8 md:p-12 flex items-center justify-center">
          <div className="max-w-md w-full">
            <header className="mb-10">
              <h1 className="text-emerald-900 font-[Elegant] text-4xl md:text-5xl mb-4">
                Welcome Back
              </h1>
              <p className="text-gray-700">
                Sign in to access your personalized property dashboard.
              </p>
            </header>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-md border border-red-200">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between items-center">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link href="/forgot-password" className="text-sm text-emerald-800 hover:underline">
                    Forgot password?
                  </Link>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-emerald-800 border-gray-300 rounded focus:ring-emerald-800"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                    Remember me
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 px-6 rounded-md transition-colors duration-300 flex items-center justify-center ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>

            {/* Google Sign In Button */}
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-amber-50 text-gray-500">Or continue with</span>
                </div>
              </div>

              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={isLoading}
                className={`mt-4 w-full bg-white border border-gray-300 text-gray-700 py-3 px-6 rounded-md hover:bg-gray-50 transition-colors duration-300 flex items-center justify-center ${
                  isLoading ? "opacity-75 cursor-not-allowed" : ""
                }`}
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Connecting...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    Continue with Google
                  </>
                )}
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Don&rsquo;t have an account?{" "}
                <Link href="/signup" className="text-emerald-800 hover:underline font-medium">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <section className="hidden lg:block lg:w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-amber-900/10 z-10"></div>
          <Image 
            src={one}
            alt="Luxury property interior"
            fill
            className="object-cover"
            priority
          />
          
          <div className="absolute bottom-0 left-0 right-0 p-12 z-20">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 max-w-xl mx-auto shadow-2xl">
              <h3 className="text-2xl font-[Elegant] font-bold text-emerald-800 mb-6 text-center">
                Unlock Your Property Journey
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-800/10 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-emerald-800 mb-1">Smart Filters</h4>
                  <p className="text-sm text-gray-600">Find exactly what you&rsquo;re looking for</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-800/10 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-emerald-800 mb-1">Verified Listings</h4>
                  <p className="text-sm text-gray-600">Only authentic properties</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-800/10 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-emerald-800 mb-1">Price Alerts</h4>
                  <p className="text-sm text-gray-600">Never miss a deal</p>
                </div>
                
                <div className="flex flex-col items-center text-center">
                  <div className="p-3 bg-emerald-800/10 rounded-full mb-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                    </svg>
                  </div>
                  <h4 className="font-medium text-emerald-800 mb-1">Virtual Tours</h4>
                  <p className="text-sm text-gray-600">Explore from anywhere</p>
                </div>
              </div>
              
              <div className="mt-8 pt-6 border-t border-emerald-800/20 text-center">
                <p className="text-sm text-gray-600">
                  Join our community of 50,000+ satisfied property seekers
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-emerald-900 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm">
          © {new Date().getFullYear()} LuxeRealty. All rights reserved.
        </div>
      </footer>
    </div>
  );
}