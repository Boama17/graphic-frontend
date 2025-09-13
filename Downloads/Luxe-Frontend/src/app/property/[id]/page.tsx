"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  MapPin, 
  BedDouble, 
  Bath, 
  Ruler, 
  Star, 
  Loader2,
  Car,
  Shield,
  Phone,
  MessageCircle
} from "lucide-react"
import { getPropertyById, getPropertyListingById, Property, PropertyListing, formatPrice } from "@/lib/properties"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PropertyDetailPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [property, setProperty] = useState<Property | null>(null)
  const [propertyListing, setPropertyListing] = useState<PropertyListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImage, setCurrentImage] = useState(0)
  const [favorites, setFavorites] = useState<Set<string>>(new Set())

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        const [prop, listing] = await Promise.all([
          getPropertyById(Number(id)),
          getPropertyListingById(Number(id))
        ])
        
        if (!prop) {
          setError("Property not found")
          setProperty(null)
        } else {
          setProperty(prop)
        }
        
        setPropertyListing(listing)
      } catch {
        setError("Failed to load property.")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [id])

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <Loader2 className="w-8 h-8 text-green-600 animate-spin mb-4" />
        <span className="text-gray-600">Loading property details...</span>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="flex flex-col items-center justify-center h-96">
        <span className="text-red-600">{error || "Property not found."}</span>
        <Button onClick={() => router.back()} className="mt-4">Go Back</Button>
      </div>
    )
  }

  // Use the property's interior images for the gallery
  const images = property.interiorImages

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 font-[Poppins-regular]">
      {/* Breadcrumbs */}
      <nav className="mb-6 text-sm text-gray-500 flex items-center gap-2">
        <span className="cursor-pointer hover:underline" onClick={() => router.push("/")}>Home</span>
        <span>›</span>
        <span className="cursor-pointer hover:underline" onClick={() => router.push("/search")}>
          For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
        </span>
        <span>›</span>
        <span className="cursor-pointer hover:underline">{property.city}</span>
        <span>›</span>
        <span className="font-semibold">{property.title}</span>
      </nav>

      {/* Title & Price */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{property.title}</h1>
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <span>{property.location}</span>
            <Badge className={`ml-2 ${property.listingType === 'rent' ? 'bg-blue-500' : 'bg-purple-500'} text-white`}>
              For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
            </Badge>
            <Badge className="ml-2 bg-green-500 text-white">{property.isNew}</Badge>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-2xl font-bold text-green-700">
            {formatPrice(property.price, property.currency, property.listingType)}
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setFavorites(fav => {
              const newFav = new Set(fav)
              if (newFav.has(String(property.id))) newFav.delete(String(property.id))
              else newFav.add(String(property.id))
              return newFav
            })}
            className="w-10 h-10 bg-white border border-gray-200 rounded-full shadow"
          >
            <Heart className={favorites.has(String(property.id)) ? "text-red-500 fill-red-500" : "text-gray-600"} />
          </Button>
        </div>
      </div>

      {/* Dynamic Image Gallery */}
      <div className="relative mb-8">
        <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden relative">
          <Image
            src={images[currentImage]}
            alt={`${property.title} - Image ${currentImage + 1}`}
            fill
            className="object-cover"
            priority
          />
          {/* Gallery navigation */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setCurrentImage(i => (i - 1 + images.length) % images.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Previous photo"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => setCurrentImage(i => (i + 1) % images.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/40 hover:bg-black/60 text-white rounded-full flex items-center justify-center transition-all duration-200"
                aria-label="Next photo"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          {/* Image indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentImage(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  idx === currentImage ? "bg-white w-6" : "bg-white/60 hover:bg-white/80"
                }`}
                aria-label={`Go to image ${idx + 1}`}
              />
            ))}
          </div>
          {/* Image counter */}
          <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
            {currentImage + 1} / {images.length}
          </div>
        </div>
      </div>

      {/* Property Features */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
          <BedDouble className="w-6 h-6 text-green-600" />
          <div>
            <span className="font-semibold text-lg">{property.bedrooms}</span>
            <p className="text-sm text-gray-500">Bedrooms</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
          <Bath className="w-6 h-6 text-green-600" />
          <div>
            <span className="font-semibold text-lg">{property.bathrooms}</span>
            <p className="text-sm text-gray-500">Bathrooms</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
          <Ruler className="w-6 h-6 text-green-600" />
          <div>
            <span className="font-semibold text-lg">{property.area}</span>
            <p className="text-sm text-gray-500">Sq Ft</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-700 bg-gray-50 p-4 rounded-xl">
          <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
          <div>
            <span className="font-semibold text-lg">{property.rating}</span>
            <p className="text-sm text-gray-500">Rating</p>
          </div>
        </div>
      </div>

      {/* Property Description */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-xl">Property Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed mb-6">{property.description}</p>
          
          {propertyListing && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Key Features */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Key Features</h3>
                <ul className="space-y-2">
                  {propertyListing.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-2 text-gray-700">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              {/* Amenities */}
              <div>
                <h3 className="font-semibold text-lg mb-3 text-gray-900">Amenities</h3>
                <div className="grid grid-cols-1 gap-2">
                  {propertyListing.amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center gap-2 text-gray-700">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>{amenity}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Property Details */}
      {propertyListing && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Property Information */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Property Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Property Type</span>
                <span className="font-semibold">{property.propertyType}</span>
              </div>
              {propertyListing.propertyDetails.yearBuilt && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Year Built</span>
                  <span className="font-semibold">{propertyListing.propertyDetails.yearBuilt}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Parking Spaces</span>
                <span className="font-semibold flex items-center gap-1">
                  <Car className="w-4 h-4" />
                  {propertyListing.propertyDetails.parking}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Furnishing</span>
                <span className="font-semibold">{propertyListing.propertyDetails.furnishing}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Pet Policy</span>
                <span className="font-semibold">{propertyListing.propertyDetails.petPolicy}</span>
              </div>
            </CardContent>
          </Card>

          {/* Financial Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {property.listingType === 'rent' ? 'Rental Terms' : 'Purchase Terms'}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  {property.listingType === 'rent' ? 'Monthly Rent' : 'Sale Price'}
                </span>
                <span className="font-bold text-green-700">
                  {formatPrice(property.price, property.currency, property.listingType)}
                </span>
              </div>
              
              {property.listingType === 'rent' ? (
                <>
                  {propertyListing.financialDetails.securityDeposit && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Security Deposit</span>
                      <span className="font-semibold">
                        GHS {propertyListing.financialDetails.securityDeposit.toLocaleString()}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agent Commission</span>
                    <span className="font-semibold">{propertyListing.financialDetails.agentCommission}%</span>
                  </div>
                  {propertyListing.financialDetails.registrationFee && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Registration Fee</span>
                      <span className="font-semibold">
                        GHS {propertyListing.financialDetails.registrationFee}
                      </span>
                    </div>
                  )}
                  {propertyListing.financialDetails.serviceCharge && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Service Charge</span>
                      <span className="font-semibold">
                        GHS {propertyListing.financialDetails.serviceCharge}/month
                      </span>
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Agent Commission</span>
                    <span className="font-semibold">{propertyListing.financialDetails.agentCommission}%</span>
                  </div>
                  {propertyListing.financialDetails.legalFees && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">Legal Fees</span>
                      <span className="font-semibold">
                        GHS {propertyListing.financialDetails.legalFees.toLocaleString()}
                      </span>
                    </div>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Location & Nearby Places */}
      {propertyListing && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg">Location & Nearby Places</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-4 flex items-center gap-2 text-gray-700">
              <MapPin className="w-5 h-5 text-green-600" />
              <span className="font-semibold">{property.address}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {propertyListing.nearbyPlaces.map((place, index) => (
                <div key={index} className="flex items-center gap-2 text-gray-600">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>{place}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Contact Section */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Interested in this property?
              </h3>
              <p className="text-gray-700 mb-2">
                Call or WhatsApp now for a swift response
              </p>
              <div className="text-2xl font-bold text-green-700 mb-1">
                05917*****/05534*****
              </div>
              <div className="text-sm text-gray-600">
                Agent: <span className="font-semibold">{property.agent}</span>
              </div>
              <div className="text-sm text-gray-500 mt-2">
                {property.views} views • {property.inquiries} inquiries
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="bg-green-700 hover:bg-green-800 text-white px-8 py-3 rounded-xl text-lg font-semibold flex items-center gap-2">
                <Phone size={20} />
                Call Agent
              </Button>
              <Button variant="outline" className="border-green-700 text-green-700 hover:bg-green-50 px-8 py-3 rounded-xl text-lg font-semibold flex items-center gap-2">
                <MessageCircle size={20} />
                WhatsApp
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}