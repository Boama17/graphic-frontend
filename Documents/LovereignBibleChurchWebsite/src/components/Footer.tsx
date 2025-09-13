"use client"

import React, {useState} from "react"
import Link from "next/link"
import {Facebook, Instagram, Mail, MapPin, Phone, Send, Twitter, Youtube} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Textarea} from "@/components/ui/textarea"
import emailjs from '@emailjs/browser'

// EmailJS configuration
const EMAILJS_CONFIG = {
  publicKey: 'ItF3ATskFLsm2Zb1F',
  serviceId: 'service_86ce4g7',
  templateId: 'template_9p9ksuo'
}

export default function Footer() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [newsletterEmail, setNewsletterEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmittingNewsletter, setIsSubmittingNewsletter] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [newsletterSuccess, setNewsletterSuccess] = useState(false)
  const [submitError, setSubmitError] = useState("")
  const [newsletterError, setNewsletterError] = useState("")

  // Initialize EmailJS
  React.useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmittingNewsletter(true)
    setNewsletterError("")

    try {
      const templateParams = {
        from_name: 'Newsletter Subscriber',
        from_email: newsletterEmail,
        message: `New newsletter subscription from: ${newsletterEmail}`,
        to_name: 'Lovereign Bible Church',
        subject: 'Newsletter Subscription'
      }

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      )

      setNewsletterSuccess(true)
      setNewsletterEmail("")
      setTimeout(() => setNewsletterSuccess(false), 3000)
    } catch (error) {
      console.error("Error subscribing to newsletter:", error)
      setNewsletterError("Failed to subscribe. Please try again.")
      setTimeout(() => setNewsletterError(""), 3000)
    } finally {
      setIsSubmittingNewsletter(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError("")

    try {
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
        to_name: 'Lovereign Bible Church',
        subject: 'New Contact Form Message'
      }

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      )

      setSubmitSuccess(true)
      setFormData({ name: "", email: "", message: "" })
      setTimeout(() => setSubmitSuccess(false), 3000)
    } catch (error) {
      console.error("Error submitting form:", error)
      setSubmitError("Failed to send message. Please try again.")
      setTimeout(() => setSubmitError(""), 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative">
      {/* Newsletter & Quick Contact Section */}
      <div className="bg-gray-800/50 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Newsletter Signup */}
            <div className="text-centerß lg:text-left">
              <h3 className="text-2xl font-bold mb-3 flex items-center justify-center lg:justify-start">
                <Mail className="h-6 w-6 mr-2 text-blue-300" />
                Stay Connected
              </h3>
              <p className="text-blue-200 mb-6 max-w-md mx-auto lg:mx-0">
                Subscribe to our newsletter for updates on events, sermons, and community news.
              </p>

              {newsletterSuccess && (
                <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-200">
                  Thank you for subscribing! You&#39;ll receive updates soon.
                </div>
              )}

              {newsletterError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                  {newsletterError}
                </div>
              )}

              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto lg:mx-0">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  required
                  className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-300"
                />
                <Button
                  type="submit"
                  disabled={isSubmittingNewsletter}
                  className="bg-white text-blue-600 hover:bg-blue-50 whitespace-nowrap"
                >
                  {isSubmittingNewsletter ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </div>

            {/* Quick Contact Form */}
            <div className="lg:pl-8">
              <h3 className="text-2xl font-bold mb-6 text-center lg:text-left flex items-center justify-center lg:justify-start">
                <Send className="h-6 w-6 mr-2 text-blue-300" />
                Quick Message
              </h3>

              {submitSuccess && (
                <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-200">
                  Thank you! We&#39;ll get back to you soon.
                </div>
              )}

              {submitError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200">
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    type="text"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-300"
                  />
                  <Input
                    type="email"
                    name="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-300"
                  />
                </div>
                <Textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:border-blue-300 resize-none"
                />
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-white text-blue-600 hover:bg-blue-50"
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Church Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <img
                  src="/logos/logo.png"
                  alt="Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
                />
              </div>
              <h3 className="text-xl font-bold">Lovereign Bible Church</h3>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Bringing hope, faith and love to our community and beyond. Join us in worship, fellowship, and service.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com/lovereignbiblechurch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Facebook</span>
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/lovereignbiblechurch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Instagram</span>
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/lovereignchurch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="sr-only">Twitter</span>
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="https://www.youtube.com/@lovereignbiblechurch"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
              >
                <span className="sr-only">YouTube</span>
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/church-branches"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Church Branches
                </Link>
              </li>
              <li>
                <Link
                  href="/founder"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Founder
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/books"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Books
                </Link>
              </li>
              <li>
                <Link
                  href="/media"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Media
                </Link>
              </li>
              <li>
                <Link
                  href="/give"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Give
                </Link>
              </li>
              <li>
                <Link
                  href="/contact-us"
                  className="text-gray-300 hover:text-white hover:translate-x-1 transition-all duration-200 inline-block"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-blue-400">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start group">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 mt-0.5 group-hover:bg-blue-600 transition-colors">
                  <MapPin className="h-4 w-4 text-blue-400 group-hover:text-white" />
                </div>
                <div>
                  <span className="text-gray-300 leading-relaxed">
                    Dome Pillar Two Road
                    <br />
                    Christian Village, Achimota
                  </span>
                </div>
              </li>
              <li className="flex items-center group">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                  <Phone className="h-4 w-4 text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-gray-300">(+233) 24 237 1411</span>
              </li>
              <li className="flex items-center group">
                <div className="w-8 h-8 bg-blue-600/20 rounded-lg flex items-center justify-center mr-3 group-hover:bg-blue-600 transition-colors">
                  <Mail className="h-4 w-4 text-blue-400 group-hover:text-white" />
                </div>
                <span className="text-gray-300">info@lovereignbiblechurch.org</span>
              </li>
            </ul>

            {/* Service Times */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-white/10">
              <h4 className="font-semibold text-blue-400 mb-2">Service Times</h4>
              <p className="text-sm text-gray-300">
                Sunday: 8:00 AM & 11:00 AM & 5:00 PM
                <br />
                Wednesday: 6:00 PM
                <br />
                Friday: 6:00 PM
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10 bg-black/20">
        <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} Lovereign Bible Church. <span className="ms-2">All rights reserved.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}