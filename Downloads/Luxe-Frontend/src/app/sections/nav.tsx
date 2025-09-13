"use client"
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import phone from '../../assets/img/phone.svg';

export default function Nav() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close popover when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset copied state after 1.5s
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handlePhoneClick = () => {
    navigator.clipboard.writeText("0541537940");
    setCopied(true);
  };

  return (
    <nav className="w-full px-4 py-4 lg:px-14 lg:py-6 font-[Poppins] bg-white shadow-sm relative">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <span className="font-bold text-base lg:text-lg">
          LuxeRealty
        </span>

        {/* Mobile: Phone Icon + Hamburger */}
        <div className="md:hidden flex items-center gap-3">
          {/* Phone Icon Only */}
          <div className="relative">
            <button
              onClick={handlePhoneClick}
              className="p-2 rounded-full hover:bg-emerald-50 transition-colors"
              title="Call 0541537940 (tap to copy)"
            >
              <Image 
                src={phone} 
                alt="Phone" 
                width={20}  
                height={20}
                className="w-5 h-5"
              />
            </button>
            {copied && (
              <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-xs px-2 py-1 rounded shadow-lg z-50 whitespace-nowrap">
                Copied!
              </span>
            )}
          </div>

          {/* Hamburger Menu */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-md hover:bg-emerald-50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-emerald-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMobileMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'
              }`}></span>
              <span className={`bg-emerald-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${
                isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}></span>
              <span className={`bg-emerald-800 block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${
                isMobileMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'
              }`}></span>
            </div>
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {/* Phone */}
          <div className="flex items-center gap-2 relative">
            <Image 
              src={phone} 
              alt="Phone icon" 
              width={16}  
              height={16}
              className="w-4 h-4"
            />
            <button
              className="font-semibold text-sm lg:text-base cursor-pointer text-gray-700 hover:text-emerald-800 transition-colors bg-transparent border-none outline-none"
              onClick={handlePhoneClick}
              title="Click to copy"
              type="button"
            >
              0541537940
            </button>
            {copied && (
              <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-emerald-700 text-white text-xs px-3 py-1 rounded shadow transition-opacity duration-200 z-30">
                Copied!
              </span>
            )}
          </div>

          {/* Become an agent */}
          <div className="relative" ref={popoverRef}>
            <button 
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
              className={`flex items-center gap-2 px-4 py-2 border ${
                isPopoverOpen 
                  ? "bg-emerald-800 text-white border-emerald-800" 
                  : "border-emerald-800 text-emerald-800 hover:bg-emerald-800 hover:text-white"
              } rounded-full transition-all duration-300 text-sm font-medium shadow-sm`}
              aria-expanded={isPopoverOpen}
              aria-haspopup="true"
            >
              <span>Become an agent</span>
              <svg 
                className={`w-4 h-4 transition-transform duration-200 ${
                  isPopoverOpen ? "rotate-180" : ""
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            
            {/* Desktop Dropdown */}
            <div 
              className={`absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-2xl border border-emerald-100 overflow-hidden z-30 transition-all duration-200 origin-top ${
                isPopoverOpen 
                  ? "scale-100 opacity-100" 
                  : "scale-95 opacity-0 pointer-events-none"
              }`}
            >
              <div className="py-2">
                <Link 
                  href="/signin" 
                  className="block px-6 py-3 text-sm text-emerald-900 hover:bg-emerald-50 hover:text-emerald-800 font-medium transition-colors"
                  onClick={() => setIsPopoverOpen(false)}
                >
                  Sign In
                </Link>
                <div className="border-t border-emerald-100" />
                <Link 
                  href="/signup" 
                  className="block px-6 py-3 text-sm text-emerald-900 hover:bg-emerald-50 hover:text-emerald-800 font-medium transition-colors"
                  onClick={() => setIsPopoverOpen(false)}
                >
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`md:hidden fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 z-40 ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`} onClick={() => setIsMobileMenuOpen(false)} />

      {/* Mobile Menu Slide-out */}
      <div className={`md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
        isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6">
          {/* Close Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Mobile Menu Content */}
          <div className="mt-8 space-y-6">
            {/* Phone Number */}
            <div className="pb-4 border-b border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Contact us</p>
              <button
                onClick={handlePhoneClick}
                className="flex items-center gap-3 text-lg font-semibold text-emerald-800 hover:text-emerald-700 transition-colors"
              >
                <Image src={phone} alt="Phone" width={20} height={20} />
                0541537940
              </button>
              {copied && (
                <span className="text-sm text-green-600 mt-1 block">Number copied!</span>
              )}
            </div>

            {/* Agent Links */}
            <div className="space-y-4">
              <p className="text-sm text-gray-600 font-medium">Agent Portal</p>
              <Link 
                href="/signin"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 text-emerald-800 border border-emerald-200 rounded-lg hover:bg-emerald-50 transition-colors font-medium"
              >
                Sign In
              </Link>
              <Link 
                href="/signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full text-left px-4 py-3 bg-emerald-800 text-white rounded-lg hover:bg-emerald-700 transition-colors font-medium text-center"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}