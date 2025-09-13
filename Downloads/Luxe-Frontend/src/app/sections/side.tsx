"use client";
import React, { useState, useEffect } from 'react';
import { Play, Heart, MapPin, BathIcon, BedIcon, RulerIcon, X, Star, Phone, Mail, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from "next/image";
import one from "@/../public/house8.jpg"; 
import two from "@/../public/house1.jpg";
import three from "@/../public/house3.jpg";

const propertyData = [
  {
    image: one.src,
    title: "Luxurious Town House",
    location: "East Legon, Accra",
    price: "GH₵2M",
    beds: 3,
    baths: 2,
    area: "2.1K",
    offer: "15% discount on closing costs + free home inspection",
    tag: "Featured",
    isHot: false,
  },
  {
    image: two.src,
    title: "Luxury Villa Retreat",
    location: "Airport Hills, Accra",
    price: "GH₵1.2M",
    monthly: "GH₵7,200",
    beds: 5,
    baths: 4,
    area: "4.5K",
    offer: "Free smart home upgrade + pool maintenance for 1 year",
    tag: "Hot Deal",
    isHot: true,
  },
  {
    image: three.src,
    title: "Urban Family Home",
    location: "Osu, Accra",
    price: "GH₵650K",
    monthly: "GH₵3,900",
    beds: 4,
    baths: 3,
    area: "3.2K",
    offer: "No agency fee + free moving service",
    tag: "New Listing",
    isHot: false,
  },
];

export default function PropertyListing() {
  const [isLiked, setIsLiked] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showTour, setShowTour] = useState(false);
  const [copied, setCopied] = useState(false);

  const property = propertyData[currentImageIndex];

  // Auto-scroll carousel (slower, less intrusive)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % propertyData.length);
    }, 16000);
    return () => clearInterval(interval);
  }, []);

 

  const handleCopyPhone = async () => {
    await navigator.clipboard.writeText("+233 54 153 7940");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % propertyData.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + propertyData.length) % propertyData.length);
  };

  return (
    <div className="max-w-sm mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
      {/* Image Section */}
      <div className="relative">
        <div className="aspect-[4/3] bg-gray-100 overflow-hidden relative">
          <Image 
            src={property.image}
            alt={property.title}
            fill
            className="w-full h-full object-cover"
          />
          
          {/* Navigation arrows */}
          <button 
            onClick={prevImage}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={nextImage}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/20 hover:bg-black/40 backdrop-blur-sm rounded-full flex items-center justify-center text-white transition-all"
            aria-label="Next image"
          >
            <ChevronRight size={16} />
          </button>

          {/* Top overlay with controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
            <div className="flex gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium bg-white text-gray-800 ${
                property.isHot ? 'ring-2 ring-red-500' : ''
              }`}>
                {property.tag}
              </span>
              {property.isHot && (
                <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-500 text-white">
                  Hot
                </span>
              )}
            </div>
            
            <div className="flex gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                  isLiked 
                    ? 'bg-red-500 text-white shadow-lg' 
                    : 'bg-white/90 text-gray-600 hover:bg-white'
                }`}
                aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
              </button>

            </div>
          </div>

          {/* Price badge */}
          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <div className="text-lg font-bold text-gray-900">{property.price}</div>
            {property.monthly ? (
              <div className="text-xs text-gray-500">{property.monthly}/month</div>
            ) : (
              <div className="text-xs text-gray-500">For Sale</div>
            )}
          </div>

          {/* Property features */}
          <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="flex items-center gap-1">
                <BedIcon size={14} />
                <span className="font-medium">{property.beds}</span>
              </div>
              <div className="flex items-center gap-1">
                <BathIcon size={14} />
                <span className="font-medium">{property.baths}</span>
              </div>
              <div className="flex items-center gap-1">
                <RulerIcon size={14} />
                <span className="font-medium">{property.area}</span>
              </div>
            </div>
          </div>

          {/* Image indicators */}
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex gap-1">
            {propertyData.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white w-4' 
                    : 'bg-white/50'
                }`}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 space-y-4">
        {/* Property Info */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-1">{property.title}</h2>
          <div className="flex items-center text-gray-600 text-sm">
            <MapPin size={14} className="mr-1" />
            <span>{property.location}</span>
          </div>
        </div>

        {/* Special Offer */}
        <div className="bg-blue-50 border border-blue-100 rounded-lg p-3">
          <div className="flex items-start gap-2">
            <div className="text-blue-600 text-sm">🎁</div>
            <div>
              <div className="font-semibold text-blue-900 text-sm mb-1">Special Offer</div>
              <div className="text-blue-800 text-xs leading-relaxed">
                {property.offer}
              </div>
            </div>
          </div>
        </div>

        {/* Virtual Tour */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div>
              <div className="font-semibold text-gray-900 text-sm">Virtual Tour</div>
              <div className="text-xs text-gray-500">360° interactive experience</div>
            </div>
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          </div>
          <button
            onClick={() => setShowTour(true)}
            className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Play size={16} />
            Start Tour
          </button>
        </div>

        {/* Agent Section */}
        <div className="border border-gray-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-900 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                CA
              </div>
              <div>
                <div className="font-semibold text-gray-900 text-sm">Caleb Asiedu</div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star size={10} className="text-yellow-500 fill-current" />
                  <span>4.9 rating • Licensed Agent</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyPhone}
                className="relative w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Copy phone number"
              >
                <Phone size={14} className="text-gray-600" />
                {copied && (
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    Copied!
                  </div>
                )}
              </button>
              
              <button
                onClick={() => window.location.href = "mailto:calebaseidu100@gmail.com"}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Email agent"
              >
                <Mail size={14} className="text-gray-600" />
              </button>
            
            </div>
          </div>
        </div>
      </div>

      {/* Virtual Tour Modal */}
      {showTour && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold text-gray-900">Virtual Tour</h3>
              <button
                onClick={() => setShowTour(false)}
                className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-lg flex items-center justify-center transition-colors"
                aria-label="Close tour"
              >
                <X size={16} />
              </button>
            </div>
            <div className="p-4">
              <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <Play size={48} className="mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Virtual tour would load here</p>
                  <p className="text-xs text-gray-400 mt-1">Interactive 360° experience</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}