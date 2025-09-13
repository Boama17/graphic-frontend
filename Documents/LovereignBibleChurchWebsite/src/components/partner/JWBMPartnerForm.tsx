"use client";

import type React from "react";
import {useEffect, useRef, useState} from "react";
import emailjs from "@emailjs/browser"; // Fixed import
import Image from "next/image";
import {ChevronDown, X} from "lucide-react";

interface PartnerFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function JWBMPartnerForm({ isOpen, onClose }: PartnerFormProps) {
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    telephone: "",
    country: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const categoryRef = useRef<HTMLDivElement>(null);

  const partnershipCategories = [
    "Silver Partner",
    "Gold Partner",
    "Platinum Partner",
    "Diamond Partner",
  ];

  // EmailJS Configuration - Using your provided credentials
  const EMAILJS_CONFIG = {
    publicKey: "ItF3ATskFLsm2Zb1F",
    serviceId: "service_86ce4g7",
    templateId: "template_9p9ksuo", // Using the Contact Us template
    // If you have a separate template for partnerships, replace with: "template_sb90q7b"
  };

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.publicKey);
  }, [EMAILJS_CONFIG.publicKey]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    
    if (
      !formData.fullName ||
      !formData.telephone ||
      !formData.country ||
      !selectedCategory
    ) {
      setSubmitError("Please fill in all fields and select a category.");
      return;
    }

    setIsSending(true);

    try {
      // Template parameters that match your EmailJS template structure
      const templateParams = {
        from_name: formData.fullName,
        from_email: formData.telephone, // Using telephone as contact method
        message: `JWBM Partnership Application:
        
Full Name: ${formData.fullName}
Telephone: ${formData.telephone}
Country: ${formData.country}
Partnership Category: ${selectedCategory}
Application Time: ${new Date().toLocaleString()}

This is a partnership application for the John Winfred Book Ministry.`,
        to_name: "JWBM Team",
        subject: `New JWBM Partnership Application - ${selectedCategory}`,
      };

      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        templateParams
      );

      setSubmitSuccess(true);
      setFormData({ fullName: "", telephone: "", country: "" });
      setSelectedCategory("");
      
      // Auto-close after 2 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
      }, 2000);

    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitError("An error occurred. Please try again later.");
    } finally {
      setIsSending(false);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setCategoryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="w-full max-w-4xl bg-black/50 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-800 relative">
        {/* Logo - Fixed positioning for mobile */}
        <div className="absolute top-4 left-0 right-0 mx-auto md:left-auto md:right-4 md:mx-0 z-20">
          <Image
            src="https://raw.githubusercontent.com/THE-LOVEREIGN-BIBLE-CHURCH/logo/main/jwbm.png"
            alt="JWBM Logo"
            className="mx-auto md:mx-0"
            height={60}
            width={60}
          />
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-30 w-8 h-8 bg-gray-800/50 hover:bg-gray-700/50 rounded-full flex items-center justify-center text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Information Section */}
          <div className="bg-gradient-to-br from-purple-900/40 to-black p-8 pt-20 md:pt-8 md:w-2/5 flex flex-col justify-center rounded-t-2xl md:rounded-l-2xl md:rounded-t-2xl">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center md:text-left">
              Partner with JWBM
            </h1>
            <p className="text-gray-300 text-sm md:text-base leading-relaxed text-center md:text-left">
              Join the John Winfred Book Ministry Partnership and become part of
              a mission spreading knowledge and inspiration through impactful
              literature.
            </p>
          </div>

          {/* Form Section */}
          <div className="p-8 md:w-3/5 rounded-b-2xl md:rounded-r-2xl md:rounded-b-2xl">
            {/* Success Message */}
            {submitSuccess && (
              <div className="mb-6 p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-200 text-center">
                Thank you for becoming a partner! Your application has been sent successfully.
              </div>
            )}

            {/* Error Message */}
            {submitError && (
              <div className="mb-6 p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-center">
                {submitError}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Full Name *
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="telephone"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Telephone *
                </label>
                <input
                  id="telephone"
                  name="telephone"
                  type="tel"
                  value={formData.telephone}
                  onChange={handleInputChange}
                  placeholder="Enter your phone number"
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Country *
                </label>
                <input
                  id="country"
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleInputChange}
                  placeholder="Enter your country"
                  className="w-full px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Partnership Category *
                </label>
                <div className="relative" ref={categoryRef}>
                  <button
                    type="button"
                    onClick={() =>
                      setCategoryDropdownOpen(!categoryDropdownOpen)
                    }
                    className="w-full flex items-center justify-between px-4 py-2.5 bg-gray-900/50 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition-all duration-200"
                  >
                    <span
                      className={
                        selectedCategory ? "text-white" : "text-gray-400"
                      }
                    >
                      {selectedCategory || "Select partnership category"}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                        categoryDropdownOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {categoryDropdownOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden">
                      <ul className="py-1 max-h-60 overflow-auto">
                        {partnershipCategories.map((category) => (
                          <li key={category}>
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedCategory(category);
                                setCategoryDropdownOpen(false);
                              }}
                              className="w-full text-left px-4 py-2 text-sm text-white hover:bg-purple-700/30 transition-colors duration-150"
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="w-full px-4 py-2.5 bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-medium rounded-lg shadow-lg transition-all duration-200 transform hover:translate-y-[-2px] disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSending}
              >
                {isSending ? "Sending..." : "BECOME A PARTNER"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}