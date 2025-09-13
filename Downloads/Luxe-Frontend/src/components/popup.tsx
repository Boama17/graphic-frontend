'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X } from 'lucide-react';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const Popup: React.FC<PopupProps> = ({ isOpen, onClose }) => {
  const router = useRouter();

  const handleSelling = () => {
    // Route to sign up page for sellers
    router.push('/signup');
    onClose();
  };

  if (!isOpen) return null;

  const handleBuying = () => {
    const featuredSection = document.getElementById('featured-properties');
    if (featuredSection) {
        featuredSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        onClose();
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Popup */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 relative animate-in fade-in-0 zoom-in-95 duration-200">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>

          {/* Content */}
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              What brings you here today?
            </h2>
            <p className="text-gray-600 mb-8">
              Are you looking to buy or sell a property?
            </p>

            {/* Action Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleBuying}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <span className="mr-2">🏠</span>
                I&apos;m Looking to Buy
              </button>
              
              <button
                onClick={handleSelling}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-6 rounded-xl transition-colors duration-200 flex items-center justify-center"
              >
                <span className="mr-2">💰</span>
                I Want to Sell
              </button>
            </div>

            {/* Additional Info */}
            <p className="text-sm text-gray-500 mt-6">
              New to selling? We&apos;ll help you get started with our simple sign-up process.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

// Hook for managing popup timing - now triggers immediately on load
export const usePopupTrigger = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [hasShown, setHasShown] = useState(false);  

  useEffect(() => {
    if (hasShown) return;

    // Show popup immediately after component mounts (2 seconds delay for better UX)
    const timeoutId = setTimeout(() => {
      if (!hasShown) {
        setShowPopup(true);
        setHasShown(true);
      }
    }, 2000); // 2 second delay after page load

    return () => {
      clearTimeout(timeoutId);
    };
  }, [hasShown]);

  const closePopup = () => {
    setShowPopup(false);
  };

  return { showPopup, closePopup };
};

export default Popup;