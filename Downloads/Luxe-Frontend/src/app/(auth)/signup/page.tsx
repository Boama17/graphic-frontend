/* eslint-disable @typescript-eslint/no-explicit-any */

//sign-up
"use client"
import { useState } from "react"
import type React from "react"

import Image from "next/image"
import one from "../../../assets/img/one.jpg"
import two from "../../../assets/img/two.png"
import three from "../../../assets/img/three.jpg"
import Footer from "@/app/sections/footer"
import { authService } from "@/app/services/authService"
import { useRouter } from "next/navigation"

type FormData = {
  firstName: string
  lastName: string
  email: string
  phone: string
  password: string
  confirmPassword: string
  interests: string[]
  terms: boolean
  passportFront: File | null
  passportBack: File | null
}

type FormErrors = {
  [key: string]: string
}

export default function SignupPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    interests: [],
    terms: false,
    passportFront: null,
    passportBack: null,
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [currentStep, setCurrentStep] = useState(1)
  const [passwordVisible, setPasswordVisible] = useState(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false)

  // Add these additional state variables:
  const [isLoading, setIsLoading] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()

  const [passportFrontPreview, setPassportFrontPreview] = useState<string | null>(null)
  const [passportBackPreview, setPassportBackPreview] = useState<string | null>(null)

  const propertyTypes = [
    {
      name: "Residential",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
      ),
    },
    {
      name: "Commercial",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
          />
        </svg>
      ),
    },
    {
      name: "Luxury",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
          />
        </svg>
      ),
    },
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const updated = { ...prev }
        delete updated[name]
        return updated
      })
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fieldName: "passportFront" | "passportBack") => {
    const file = e.target.files?.[0]
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "Please select a valid image file",
        }))
        return
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: "File size must be less than 5MB",
        }))
        return
      }

      setFormData((prev) => ({
        ...prev,
        [fieldName]: file,
      }))

      // Create preview
      const reader = new FileReader()
      reader.onload = (e) => {
        if (fieldName === "passportFront") {
          setPassportFrontPreview(e.target?.result as string)
        } else {
          setPassportBackPreview(e.target?.result as string)
        }
      }
      reader.readAsDataURL(file)

      // Clear error
      if (errors[fieldName]) {
        setErrors((prev) => {
          const updated = { ...prev }
          delete updated[fieldName]
          return updated
        })
      }
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = e.target

    if (name === "terms") {
      setFormData((prev) => ({
        ...prev,
        terms: checked,
      }))

      if (errors.terms) {
        setErrors((prev) => {
          const updated = { ...prev }
          delete updated.terms
          return updated
        })
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        interests: checked ? [...prev.interests, value] : prev.interests.filter((interest) => interest !== value),
      }))

      // Clear interests error when user selects an option
      if (errors.interests) {
        setErrors((prev) => {
          const updated = { ...prev }
          delete updated.interests
          return updated
        })
      }
    }
  }

  // Enhanced password validation function:
  const validatePassword = (password: string): string | null => {
    if (!password) return "Password is required"
    if (password.length < 8) return "Password must be at least 8 characters"
    if (!/(?=.*[a-z])/.test(password)) return "Password must contain at least one lowercase letter"
    if (!/(?=.*[A-Z])/.test(password)) return "Password must contain at least one uppercase letter"
    if (!/(?=.*\d)/.test(password)) return "Password must contain at least one number"
    if (!/(?=.*[@$!%*?&_])/.test(password)) return "Password must contain at least one special character"
    return null
  }

  // Update your validateStep function to use enhanced password validation:
  const validateStep = (step: number): boolean => {
    const newErrors: FormErrors = {}

    if (step === 1) {
      // First name validation
      if (!formData.firstName.trim()) {
        newErrors.firstName = "First name is required"
      } else if (formData.firstName.trim().length < 2) {
        newErrors.firstName = "First name must be at least 2 characters long"
      } else if (formData.firstName.trim().length > 50) {
        newErrors.firstName = "First name must be less than 50 characters"
      } else if (!/^[a-zA-Z\s'-]+$/.test(formData.firstName.trim())) {
        newErrors.firstName = "First name can only contain letters, spaces, hyphens, and apostrophes"
      } else if (/^\s|\s$/.test(formData.firstName)) {
        newErrors.firstName = "First name cannot start or end with spaces"
      }

      // Last name validation
      if (!formData.lastName.trim()) {
        newErrors.lastName = "Last name is required"
      } else if (formData.lastName.trim().length < 2) {
        newErrors.lastName = "Last name must be at least 2 characters long"
      } else if (formData.lastName.trim().length > 50) {
        newErrors.lastName = "Last name must be less than 50 characters"
      } else if (!/^[a-zA-Z\s'-]+$/.test(formData.lastName.trim())) {
        newErrors.lastName = "Last name can only contain letters, spaces, hyphens, and apostrophes"
      } else if (/^\s|\s$/.test(formData.lastName)) {
        newErrors.lastName = "Last name cannot start or end with spaces"
      }

      // Email validation
      if (!formData.email.trim()) {
        newErrors.email = "Email is required"
      } else if (formData.email.length > 254) {
        newErrors.email = "Email address is too long"
      } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(formData.email.trim())) {
        newErrors.email = "Please enter a valid email address"
      } else if (formData.email.includes("..")) {
        newErrors.email = "Email cannot contain consecutive dots"
      } else if (formData.email.startsWith(".") || formData.email.endsWith(".")) {
        newErrors.email = "Email cannot start or end with a dot"
      } else if (formData.email.includes("@.") || formData.email.includes(".@")) {
        newErrors.email = "Invalid email format"
      } else {
        // Additional checks for domain part
        const [localPart, domainPart] = formData.email.split("@")
        if (localPart.length > 64) {
          newErrors.email = "Email local part is too long"
        } else if (domainPart.length > 253) {
          newErrors.email = "Email domain is too long"
        } else if (domainPart.split(".").some((part) => part.length > 63)) {
          newErrors.email = "Email domain labels are too long"
        }
      }

      // Phone validation (for Ghana +233 format)
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required"
      } else {
        const cleanPhone = formData.phone.replace(/\s+/g, "")
        if (!/^\d{9}$/.test(cleanPhone)) {
          newErrors.phone = "Please enter exactly 9 digits"
        } else if (
          !["20", "23", "24", "26", "27", "28", "30", "50", "53", "54", "55", "56", "57", "59"].some((prefix) =>
            cleanPhone.startsWith(prefix),
          )
        ) {
          newErrors.phone = "Please enter a valid Ghana phone number"
        }
      }
    }

    if (step === 2) {
      const passwordError = validatePassword(formData.password)
      if (passwordError) {
        newErrors.password = passwordError
      }

      if (!formData.confirmPassword) {
        newErrors.confirmPassword = "Please confirm your password"
      } else if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match"
      }

      if (!formData.passportFront) {
        newErrors.passportFront = "Please upload the front of your passport/national ID"
      }

      if (!formData.passportBack) {
        newErrors.passportBack = "Please upload the back of your passport/national ID"
      }

      if (formData.interests.length === 0) {
        newErrors.interests = "Please select at least one interest"
      }

      if (!formData.terms) {
        newErrors.terms = "You must agree to the terms and conditions"
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Replace your existing handleSubmit function with this enhanced version:
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateStep(currentStep)) return

    setIsLoading(true)
    setSubmitError("")
    setShowSuccess(false)

    try {
      // Register user with Firebase Auth
      const result = await authService.registerWithEmail(
        formData.email,
        formData.password,
        formData.firstName,
        formData.lastName,
      )

      if (result.success && result.user) {
        // Send email verification
        await authService.sendEmailVerification(result.user)

        // Sign out the user so they can't access the app until verified
        await authService.signOut()

        setShowSuccess(true)

        // Redirect to sign in after a short delay
        setTimeout(() => {
          router.push("/verify-email")
        }, 1500)
      } else {
        setSubmitError(result.error || "Registration failed. Please try again.")
      }
    } catch (error: any) {
      setSubmitError(error.message || "Registration failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-amber-50 flex flex-col font-[Poppins-regular]">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-emerald-800 text-white">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
            </div>
            <span className="ml-2 text-xl font-[Elegant] text-emerald-900">LuxeRealty</span>
          </div>
          <nav>
            <a href="/signin" className="text-emerald-800 hover:text-emerald-600 font-medium">
              Sign In
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col md:flex-row">
        {/* Image Section - Now on the left */}
        <section className="hidden md:block md:w-1/2 bg-emerald-800 p-8">
          <div className="h-full flex flex-col justify-center relative">
            <div className="absolute inset-0 overflow-hidden rounded-lg">
              <Image
                src={one || "/placeholder.svg"}
                alt="Luxury property"
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 to-transparent"></div>
            </div>

            <div className="relative z-10 bg-white/90 p-8 rounded-lg max-w-md mx-auto shadow-xl">
              <h3 className="text-2xl font-[Elegant] font-bold text-emerald-800 mb-4">Find Your Perfect Home</h3>
              <p className="text-gray-600">
                Join thousands of satisfied clients who have found their dream properties through our personalized
                service.
              </p>

              <div className="mt-6 flex items-center">
                <div className="flex -space-x-4">
                  <Image
                    src={one || "/placeholder.svg"}
                    alt=""
                    className="rounded-full h-12 w-12 border-2 border-white object-cover"
                  />
                  <Image
                    src={two || "/placeholder.svg"}
                    alt=""
                    className="rounded-full h-12 w-12 border-2 border-white object-cover"
                  />
                  <Image
                    src={three || "/placeholder.svg"}
                    alt=""
                    className="rounded-full h-12 w-12 border-2 border-white object-cover"
                  />
                </div>
                <span className="ml-4 text-sm text-gray-700">
                  <span className="font-medium">1000+</span> properties available
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-emerald-800 font-medium">245+</div>
                  <div className="text-xs text-gray-500">Properties Sold</div>
                </div>
                <div className="bg-emerald-50 p-4 rounded-lg">
                  <div className="text-emerald-800 font-medium">98%</div>
                  <div className="text-xs text-gray-500">Client Satisfaction</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Form Section - Now on the right */}
        <section className="w-full md:w-1/2 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="max-w-md w-full">
            <div className="text-center mb-8">
              <h1 className="text-emerald-900 font-[Elegant] text-4xl md:text-5xl mb-2">
                Join <span className="font-normal">Our</span> Community
              </h1>
              <p className="text-gray-600">
                Create your account to discover curated properties that match your lifestyle preferences.
              </p>

              <div className="mt-6 flex items-center justify-center">
                <div className="flex items-center">
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 1 ? "bg-emerald-800 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    1
                  </div>
                  <div className={`h-1 w-8 ${currentStep === 1 ? "bg-gray-200" : "bg-emerald-800"}`}></div>
                  <div
                    className={`flex items-center justify-center h-8 w-8 rounded-full ${currentStep === 2 ? "bg-emerald-800 text-white" : "bg-gray-200 text-gray-600"}`}
                  >
                    2
                  </div>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white shadow-lg rounded-xl p-8">
              {currentStep === 1 && (
                <>
                  <div className="space-y-1">
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.firstName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent`}
                      placeholder="John"
                    />
                    {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.lastName ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent`}
                      placeholder="Doe"
                    />
                    {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
                  </div>

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
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent`}
                      placeholder="john.doe@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div className="space-y-1">
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">+233</span>
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-16 pr-4 py-3 rounded-lg border ${errors.phone ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent`}
                        placeholder="54 321-0987"
                        maxLength={10}
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                  </div>

                  <button
                    type="button"
                    onClick={handleNextStep}
                    className="w-full bg-emerald-800 hover:bg-emerald-900 text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                  >
                    Continue
                    <svg
                      className="ml-2 w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </button>
                </>
              )}

              {currentStep === 2 && (
                <>
                  <div className="space-y-1 relative">
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                      Create a Password
                    </label>
                    <div className="relative">
                      <input
                        type={passwordVisible ? "text" : "password"}
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.password ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent`}
                        placeholder="Set a secure password"
                      />
                      <button
                        type="button"
                        onClick={togglePasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {passwordVisible ? (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                  </div>

                  <div className="space-y-1 relative">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <input
                        type={confirmPasswordVisible ? "text" : "password"}
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border ${errors.confirmPassword ? "border-red-500" : "border-gray-300"} focus:outline-none focus:ring-2 focus:ring-emerald-800 focus:border-transparent`}
                        placeholder="Re-enter your password"
                      />
                      <button
                        type="button"
                        onClick={toggleConfirmPasswordVisibility}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {confirmPasswordVisible ? (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-5 w-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </button>
                    </div>

                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                  </div>

                  <div className="space-y-4">
                    <div className="text-center">
                      <h3 className="text-lg font-medium text-gray-900 mb-2">Identity Verification</h3>
                      <p className="text-sm text-gray-600">
                        Please upload clear photos of your passport or national ID for verification
                      </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Front of Passport/ID */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Front of Passport/National ID</label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.passportFront ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"} hover:border-emerald-400 transition-colors`}
                        >
                          {passportFrontPreview ? (
                            <div className="relative">
                              <Image
                                src={passportFrontPreview || "/placeholder.svg"}
                                alt="Passport front preview"
                                width={400} // set an explicit width
                                height={128} // set an explicit height (h-32 ≈ 128px)
                                className="w-full h-32 object-cover rounded-lg"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, passportFront: null }))
                                  setPassportFrontPreview(null)
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div>
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="mt-2">
                                <label htmlFor="passportFront" className="cursor-pointer">
                                  <span className="text-emerald-600 hover:text-emerald-500 font-medium">
                                    Upload front
                                  </span>
                                  <input
                                    id="passportFront"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "passportFront")}
                                    className="sr-only"
                                  />
                                </label>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {errors.passportFront && <p className="text-red-500 text-xs">{errors.passportFront}</p>}
                      </div>

                      {/* Back of Passport/ID */}
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Back of Passport/National ID</label>
                        <div
                          className={`border-2 border-dashed rounded-lg p-4 text-center ${errors.passportBack ? "border-red-300 bg-red-50" : "border-gray-300 bg-gray-50"} hover:border-emerald-400 transition-colors`}
                        >
                          {passportBackPreview ? (
                            <div className="relative">
                             <div className="relative w-full h-32">
                              <Image
                                src={passportBackPreview || "/placeholder.svg"}
                                alt="Passport back preview"
                                fill
                                className="object-cover rounded-lg"
                              />
                            </div>

                              <button
                                type="button"
                                onClick={() => {
                                  setFormData((prev) => ({ ...prev, passportBack: null }))
                                  setPassportBackPreview(null)
                                }}
                                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                              >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </button>
                            </div>
                          ) : (
                            <div>
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="mt-2">
                                <label htmlFor="passportBack" className="cursor-pointer">
                                  <span className="text-emerald-600 hover:text-emerald-500 font-medium">
                                    Upload back
                                  </span>
                                  <input
                                    id="passportBack"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleFileChange(e, "passportBack")}
                                    className="sr-only"
                                  />
                                </label>
                                <p className="text-xs text-gray-500 mt-1">PNG, JPG up to 5MB</p>
                              </div>
                            </div>
                          )}
                        </div>
                        {errors.passportBack && <p className="text-red-500 text-xs">{errors.passportBack}</p>}
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <div className="flex">
                        <svg
                          className="h-5 w-5 text-blue-400 mt-0.5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <div className="ml-3">
                          <p className="text-sm text-blue-700">
                            <strong>Tips for clear photos:</strong> Ensure good lighting, avoid glare, and make sure all
                            text is readable. Your information will be kept secure and used only for verification
                            purposes.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <fieldset className="space-y-3">
                    <legend className="text-sm font-medium text-gray-700">
                      What type of properties do you want to sell?
                    </legend>
                    <div className="grid grid-cols-2 gap-3">
                      {propertyTypes.map((type) => (
                        <div
                          key={type.name}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg cursor-pointer border-2 transition-all ${
                            formData.interests.includes(type.name)
                              ? "border-emerald-800 bg-emerald-50"
                              : "border-gray-200 bg-white hover:bg-gray-50"
                          }`}
                        >
                          <input
                            type="checkbox"
                            id={`interest-${type.name}`}
                            name="interests"
                            value={type.name}
                            onChange={handleCheckboxChange}
                            checked={formData.interests.includes(type.name)}
                            className="sr-only"
                          />
                          <label
                            htmlFor={`interest-${type.name}`}
                            className="flex flex-col items-center cursor-pointer"
                          >
                            <div
                              className={`p-2 rounded-full mb-1 ${
                                formData.interests.includes(type.name) ? "text-emerald-800" : "text-gray-500"
                              }`}
                            >
                              {type.icon}
                            </div>
                            <span
                              className={`text-sm ${
                                formData.interests.includes(type.name)
                                  ? "text-emerald-800 font-medium"
                                  : "text-gray-600"
                              }`}
                            >
                              {type.name}
                            </span>
                          </label>
                        </div>
                      ))}
                    </div>
                    {errors.interests && <p className="text-red-500 text-xs mt-1">{errors.interests}</p>}
                  </fieldset>

                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="terms"
                        name="terms"
                        type="checkbox"
                        checked={formData.terms}
                        onChange={handleCheckboxChange}
                        className={`h-4 w-4 rounded border ${errors.terms ? "border-red-500" : "border-gray-300"} text-emerald-800 focus:ring-emerald-800`}
                      />
                    </div>
                    <label htmlFor="terms" className="ml-3 text-sm text-gray-700">
                      I confirm that I am an agent or property owner and agree to the{" "}
                      <a href="#" className="text-emerald-800 hover:underline font-medium">
                        Terms and Conditions
                      </a>{" "}
                      for listing properties on LuxeRealty.
                    </label>
                  </div>
                  {errors.terms && <p className="text-red-500 text-xs -mt-4">{errors.terms}</p>}

                  {/* Error message display */}
                  {submitError && (
                    <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                      <p className="text-red-600 text-sm">{submitError}</p>
                    </div>
                  )}

                  {/* Success message display */}
                  {showSuccess && (
                    <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-green-600 text-sm">
                        Registration successful! Please check your email to verify your account. Redirecting to sign
                        in...
                      </p>
                    </div>
                  )}

                  <div className="flex space-x-4">
                    <button
                      type="button"
                      onClick={handlePrevStep}
                      disabled={isLoading}
                      className="w-1/2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-gray-800 py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      <svg
                        className="mr-2 w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                      </svg>
                      Back
                    </button>

                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-1/2 bg-emerald-800 hover:bg-emerald-900 disabled:bg-emerald-400 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg transition-colors duration-300 flex items-center justify-center"
                    >
                      {isLoading ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Registering...
                        </>
                      ) : (
                        <>
                          Register
                          <svg
                            className="ml-2 w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </>
                      )}
                    </button>
                  </div>
                </>
              )}
            </form>

            <div className="mt-8 text-center">
              <p className="text-gray-700">
                Already have an account?{" "}
                <a href="/signin" className="text-emerald-800 hover:underline font-medium">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer background="bg-white" />
    </div>
  )
}
