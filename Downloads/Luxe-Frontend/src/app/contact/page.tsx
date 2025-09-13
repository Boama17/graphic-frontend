"use client"
import type React from "react"
import { useCallback, useState, useEffect } from "react"
import { User, Mail, MessageSquare, Send, Phone, CheckCircle, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

import emailjs from '@emailjs/browser'

interface FormData {
  name: string
  email: string
  message: string
}

interface FormErrors {
  name?: string
  email?: string
  message?: string
}

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [touched, setTouched] = useState<Record<string, boolean>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string>("")

  // Initialize EmailJS
  useEffect(() => {
   
    emailjs.init('YaKqT3F4mm8mkagRw')
  }, [])

  const validateForm = useCallback((): FormErrors => {
    const newErrors: FormErrors = {}
    if (!formData.name.trim()) newErrors.name = "Name is required"
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Please enter a valid email address"
    if (!formData.message.trim()) newErrors.message = "Message is required"
    else if (formData.message.trim().length < 10) newErrors.message = "Message must be at least 10 characters"
    return newErrors
  }, [formData])

  useEffect(() => {
    const validationErrors = validateForm()
    const touchedErrors: FormErrors = {}
    Object.keys(touched).forEach((field) => {
      if (touched[field] && validationErrors[field as keyof FormErrors]) {
        touchedErrors[field as keyof FormErrors] = validationErrors[field as keyof FormErrors]
      }
    })
    setErrors(touchedErrors)
  }, [formData, touched, validateForm])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear submit error when user starts typing
    if (submitError) setSubmitError("")
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const validationErrors = validateForm()
    setErrors(validationErrors)
    setTouched({ name: true, email: true, message: true })
    
    if (Object.keys(validationErrors).length > 0) return

    setIsSubmitting(true)
    setSubmitError("")

    try {
      // EmailJS template parameters
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: "Luxe Realty", 
        to_email: "luxerealty75@gmail.com",
        reply_to: formData.email,
        // Additional parameters for timestamp
        sent_date: new Date().toLocaleDateString(),
        sent_time: new Date().toLocaleTimeString()
      }

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_nimssm9',  
        'template_aqah0ua',  
        templateParams
      )

      console.log('Email sent successfully:', response)
      setIsSubmitted(true)
      
      // Reset form after 5 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" })
        setIsSubmitted(false)
        setTouched({})
      }, 5000)

    } catch (error) {
      console.error('EmailJS error:', error)
      setSubmitError("Failed to send message. Please try again or contact us directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen font-[Poppins-regular] bg-gradient-to-br from-white via-sky-50 to-sky-100 text-gray-800">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, #c0c0c0 2px, transparent 2px), radial-gradient(circle at 75% 75%, #b0e0e6 2px, transparent 2px)`,
          backgroundSize: "60px 60px"
        }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 lg:py-16">
        <div className="space-y-12 max-w-4xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-sky-100 to-gray-100 rounded-full">
              <span className="text-sky-700 font-semibold text-sm">Get in Touch</span>
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight">
              Let&apos;s Start a <span className="block text-transparent bg-clip-text bg-gradient-to-r from-sky-600 to-gray-400">Conversation</span>
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed">
              We&apos;re here to help and answer any question you might have. We look forward to hearing from you.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Side - Info Cards */}
            <div className="space-y-4">
              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-sky-100 hover:border-sky-200 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-sky-400 to-gray-300 rounded-xl text-white">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Email Us</h3>
                    <p className="text-sky-600 text-sm truncate">luxerealty75@gmail.com</p>
                  </div>
                </div>
              </div>

              <div className="group p-6 bg-white/70 backdrop-blur-sm rounded-2xl border border-gray-300 hover:border-gray-400 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-gradient-to-br from-gray-300 to-sky-400 rounded-xl text-white">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Call Us</h3>
                    <p className="text-gray-600 text-sm">+233 (541) 53-7940</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-sky-200 to-gray-300 rounded-3xl opacity-10 blur-2xl"></div>
                <AnimatePresence mode="wait">
                  {isSubmitted ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="relative bg-white/80 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-8 flex flex-col items-center justify-center min-h-[400px]"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", damping: 10, stiffness: 100, delay: 0.2 }}
                        className="w-20 h-20 bg-gradient-to-br from-sky-400 to-gray-400 rounded-full flex items-center justify-center mb-6"
                      >
                        <CheckCircle className="h-10 w-10 text-white" />
                      </motion.div>
                      <motion.h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                        Message Sent Successfully!
                      </motion.h2>
                      <motion.p className="text-gray-600 text-center max-w-md">
                        Thank you for reaching out to us. We&apos;ll get back to you shortly.
                      </motion.p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative bg-white/90 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl p-6 space-y-6"
                    >
                      {["name", "email", "message"].map((field) => (
                        <div key={field} className="space-y-2">
                          <label htmlFor={field} className="flex items-center text-sm font-semibold text-gray-700">
                            {field === "name" && <User className="h-4 w-4 mr-2 text-sky-500" />}
                            {field === "email" && <Mail className="h-4 w-4 mr-2 text-sky-500" />}
                            {field === "message" && <MessageSquare className="h-4 w-4 mr-2 text-sky-500" />}
                            {field.charAt(0).toUpperCase() + field.slice(1)}
                          </label>
                          {field !== "message" ? (
                            <input
                              type={field === "email" ? "email" : "text"}
                              id={field}
                              name={field}
                              value={formData[field as keyof FormData]}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              className="w-full px-4 py-3 bg-gradient-to-r from-white to-sky-50 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 placeholder-gray-400"
                            />
                          ) : (
                            <textarea
                              id={field}
                              name={field}
                              value={formData.message}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              required
                              rows={5}
                              className="w-full px-4 py-3 bg-gradient-to-r from-white to-sky-50 border border-sky-200 rounded-xl focus:ring-2 focus:ring-sky-400 placeholder-gray-400"
                            ></textarea>
                          )}
                          {errors[field as keyof FormErrors] && (
                            <div className="text-sm text-red-500 flex items-center">
                              <AlertCircle className="h-4 w-4 mr-1" />
                              {errors[field as keyof FormErrors]}
                            </div>
                          )}
                        </div>
                      ))}

                      {submitError && (
                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                          <div className="flex items-center text-red-700">
                            <AlertCircle className="h-5 w-5 mr-2" />
                            <span className="text-sm">{submitError}</span>
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-3 px-6 bg-gradient-to-r from-sky-400 to-gray-400 text-white font-semibold rounded-xl hover:from-sky-500 hover:to-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <div className="flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          ) : (
                            <Send className="h-5 w-5" />
                          )}
                          <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                        </div>
                      </button>
                      <p className="text-xs text-gray-400 text-center">
                        By submitting this form, you agree to our privacy policy.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactPage;