/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"

import type React from "react"
import { useRouter } from "next/navigation"

import { useState, useEffect } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Autoplay, Pagination } from "swiper/modules"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import {
  Loader2,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  BedDouble,
  Bath,
  Ruler,
  MapPin,
  Heart,
  Star,
  Home,
  Building2,
  Crown,
  TrendingUp,
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  fetchProperties, 
  formatPrice, 
  Property, 
  PropertyCategory, 
  getPropertiesByCategory,
  getCategoriesWithCounts,
  PROPERTY_CATEGORIES 
} from "@/lib/properties"

// Import Swiper styles
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

//spinning flower
import Flora from "@/components/ui/flora"

// Category tab configuration
const CATEGORY_TABS = {
  all: {
    label: 'All Properties',
    icon: Home,
    color: 'green',
    description: 'Browse all available properties'
  },
  [PropertyCategory.RESIDENTIAL]: {
    label: 'Residential',
    icon: Home,
    color: 'blue',
    description: 'Apartments, flats, and family homes'
  },
  [PropertyCategory.COMMERCIAL]: {
    label: 'Commercial',
    icon: Building2,
    color: 'purple',
    description: 'Office spaces and business properties'
  },
  [PropertyCategory.LUXURY]: {
    label: 'Luxury',
    icon: Crown,
    color: 'amber',
    description: 'Premium properties with high-end amenities'
  }
} as const;

const COLOR_VARIANTS = {
  green: {
    bg: 'bg-green-50',
    text: 'text-green-600',
    border: 'border-green-200',
    active: 'bg-green-600 text-white',
    badge: 'bg-green-100 text-green-800'
  },
  blue: {
    bg: 'bg-blue-50',
    text: 'text-blue-600',
    border: 'border-blue-200',
    active: 'bg-blue-600 text-white',
    badge: 'bg-blue-100 text-blue-800'
  },
  purple: {
    bg: 'bg-purple-50',
    text: 'text-purple-600',
    border: 'border-purple-200',
    active: 'bg-purple-600 text-white',
    badge: 'bg-purple-100 text-purple-800'
  },
  amber: {
    bg: 'bg-amber-50',
    text: 'text-amber-600',
    border: 'border-amber-200',
    active: 'bg-amber-600 text-white',
    badge: 'bg-amber-100 text-amber-800'
  }
};

export default function CategorizedPropertyListing() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)
  const [showAll, setShowAll] = useState<Record<string, boolean>>({})
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [categoryCounts, setCategoryCounts] = useState<Record<string, number>>({})

  // Load properties and calculate category counts
  useEffect(() => {
    const loadProperties = async () => {
      try {
        const fetchedProperties = await fetchProperties();
        setProperties(fetchedProperties);
        
        // Calculate category counts
        const counts: Record<string, number> = {
          all: fetchedProperties.length
        };
        
        Object.values(PropertyCategory).forEach(category => {
          counts[category] = getPropertiesByCategory(category).length;
        });
        
        setCategoryCounts(counts);
      } catch (err) {
        setError("Failed to load properties. Please try again later.")
        console.error("Fetch error:", err)
      } finally {
        setLoading(false)
      }
    }

    loadProperties()
  }, [])

  // Get filtered properties based on active category
  const getFilteredProperties = () => {
    if (activeCategory === 'all') {
      return properties;
    }
    return getPropertiesByCategory(activeCategory as PropertyCategory);
  };

  const toggleViewMore = (category: string) => {
    setShowAll((prev) => ({
      ...prev,
      [category]: !prev[category]
    }))
  }

  const toggleFavorite = (propertyId: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev)
      if (newFavorites.has(propertyId)) {
        newFavorites.delete(propertyId)
      } else {
        newFavorites.add(propertyId)
      }
      return newFavorites
    })
  }

  // Property feature component with improved styling
  const PropertyFeature = ({
    icon: Icon,
    value,
    label,
  }: {
    icon: React.ComponentType<{ className?: string }>
    value: number
    label: string
  }) => (
    <div className="flex items-center gap-2 text-gray-700">
      <div className="flex-shrink-0 w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
        <Icon className="w-4 h-4 text-green-600" />
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-semibold text-gray-900">{value}</span>
        <span className="text-xs text-gray-500">{label}</span>
      </div>
    </div>
  )

  // Enhanced property card component
  const PropertyCard = ({
    property,
    index = 0,
  }: {
    property: Property
    index?: number
  }) => {
    const router = useRouter()
    const categoryConfig = PROPERTY_CATEGORIES[property.category];
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1, duration: 0.5 }}
        className="h-full font-[Poppins-regular]"
      >
        <Card className="group relative overflow-hidden h-full bg-white shadow-sm hover:shadow-xl transition-all duration-300 border-0 rounded-2xl">
          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
            <Image
              src={property.imageUrl || "/placeholder.svg"}
              alt={`${property.title} in ${property.location}`}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={index < 3}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />

            {/* Top badges and buttons */}
            <div className="absolute top-4 left-4 right-4 flex items-start justify-between">
              {/* Listing type and category badges */}
              <div className="flex flex-col gap-2">
                <Badge className={`${property.listingType === 'rent' ? 'bg-blue-500 hover:bg-blue-600' : 'bg-purple-500 hover:bg-purple-600'} text-white border-0 px-3 py-1 text-xs font-medium`}>
                  For {property.listingType === 'rent' ? 'Rent' : 'Sale'}
                </Badge>
                <Badge 
                  className={`${
                    property.category === PropertyCategory.LUXURY 
                      ? 'bg-amber-500 hover:bg-amber-600' 
                      : property.category === PropertyCategory.COMMERCIAL
                      ? 'bg-purple-500 hover:bg-purple-600'
                      : 'bg-blue-500 hover:bg-blue-600'
                  } text-white border-0 px-3 py-1 text-xs font-medium flex items-center gap-1`}
                >
                  <span>{categoryConfig?.icon}</span>
                  {categoryConfig?.label}
                </Badge>
                {property.isNew && (
                  <Badge className="bg-green-500 hover:bg-green-600 text-white border-0 px-3 py-1 text-xs font-medium">
                    New
                  </Badge>
                )}
              </div>

              {/* Favorite button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation()
                  toggleFavorite(String(property.id))
                }}
                className="ml-auto w-9 h-9 bg-white/90 backdrop-blur-sm hover:bg-white rounded-full shadow-sm border-0"
              >
                <Heart
                  className={`w-4 h-4 transition-colors ${
                    favorites.has(String(property.id)) ? "text-red-500 fill-red-500" : "text-gray-600 hover:text-red-500"
                  }`}
                />
              </Button>
            </div>

            {/* Price badge */}
            <div className="absolute top-4 right-4">
              <div className="bg-white/95 backdrop-blur-sm px-4 py-2 rounded-xl shadow-sm">
                <span className="font-bold text-green-600 text-lg">
                  {formatPrice(property.price, property.currency, property.listingType)}
                </span>
              </div>
            </div>

            {/* Location badge */}
            <div className="absolute bottom-4 left-4">
              <div className="flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg">
                <MapPin className="w-3.5 h-3.5 text-white" />
                <span className="text-white text-sm font-medium">{property.location}</span>
              </div>
            </div>
          </div>

          {/* Card content */}
          <CardContent className="p-6 flex flex-col h-full">
            {/* Title and rating */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-lg text-gray-900 mb-1 line-clamp-1 group-hover:text-green-600 transition-colors">
                  {property.title}
                </h3>
                <p className="text-gray-600 text-sm font-medium">{property.city}</p>
              </div>
              <div className="flex items-center gap-1 ml-3">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-semibold text-gray-700">{property.rating}</span>
              </div>
            </div>

            {/* Property features */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-100">
              <PropertyFeature icon={BedDouble} value={property.bedrooms} label="Beds" />
              <PropertyFeature icon={Bath} value={property.bathrooms} label="Baths" />
              <PropertyFeature icon={Ruler} value={property.area} label="Sq Ft" />
            </div>

            {/* View Details button */}
            <Button
              className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white"
              onClick={() => router.push(`/property/${property.id}`)}
            >
              View Details
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  // Category content component
  const CategoryContent = ({ category }: { category: string }) => {
    const filteredProperties = category === 'all' ? properties : getPropertiesByCategory(category as PropertyCategory);
    const showAllForCategory = showAll[category] || false;
    const displayProperties = showAllForCategory ? filteredProperties : filteredProperties.slice(0, 6);

    if (filteredProperties.length === 0) {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center h-64 p-8 bg-gray-50 rounded-2xl text-center"
        >
          <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
            <Home className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">No properties found</h3>
          <p className="text-gray-500">
            {category === 'all' ? 'No properties available at the moment.' : `No ${CATEGORY_TABS[category as keyof typeof CATEGORY_TABS]?.label?.toLowerCase()} properties available.`}
          </p>
        </motion.div>
      );
    }

    return (
      <div className="space-y-16">
        {/* Featured properties carousel */}
        <div className="relative">
          <Swiper
            modules={[Navigation, Autoplay, Pagination]}
            navigation={{
              nextEl: `.swiper-button-next-${category}`,
              prevEl: `.swiper-button-prev-${category}`,
            }}
            pagination={{
              clickable: true,
              bulletClass: "swiper-pagination-bullet !bg-green-200 !opacity-100",
              bulletActiveClass: "!bg-green-600",
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 16 },
              768: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!pb-12"
          >
            {displayProperties.map((property, index) => (
              <SwiperSlide key={property.id} className="!h-auto">
                <PropertyCard property={property} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Custom navigation buttons */}
          <Button
            variant="outline"
            size="icon"
            className={`swiper-button-prev-${category} absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 z-10`}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className={`swiper-button-next-${category} absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg border-gray-200 hover:bg-gray-50 z-10`}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Additional properties grid */}
        <AnimatePresence>
          {showAllForCategory && filteredProperties.length > 6 && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-3">More Properties</h3>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Discover additional properties in this category
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.slice(6).map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* View more button */}
        {filteredProperties.length > 6 && (
          <div className="flex justify-center">
            <Button
              onClick={() => toggleViewMore(category)}
              variant="outline"
              className="flex items-center gap-2 px-8 py-3 rounded-xl border-green-200 text-green-700 hover:bg-green-50 hover:border-green-300 transition-all duration-200"
            >
              <motion.div animate={{ rotate: showAllForCategory ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown className="w-4 h-4" />
              </motion.div>
              {showAllForCategory ? "Show Less" : `View All (${filteredProperties.length})`}
            </Button>
          </div>
        )}
      </div>
    );
  };

  // Loading state
  if (loading) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Header />
        <div className="flex flex-col items-center justify-center h-64 rounded-2xl bg-gray-50">
          <Loader2 className="w-8 h-8 text-green-600 mb-4 animate-spin" />
          <span className="text-gray-600 font-medium">Loading properties...</span>
        </div>
      </section>
    )
  }

  // Error state
  if (error) {
    return (
      <section className="max-w-7xl mx-auto px-6 py-16">
        <Header />
        <div className="flex flex-col items-center justify-center h-64 p-8 bg-red-50 rounded-2xl text-center">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
            <span className="text-red-600 text-xl">⚠</span>
          </div>
          <h3 className="text-lg font-semibold text-red-800 mb-2">Something went wrong</h3>
          <p className="text-red-600 mb-6">{error}</p>
          <Button onClick={() => window.location.reload()} className="bg-green-600 hover:bg-green-700">
            Try Again
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="max-w-7xl mx-auto px-6 py-16" id="featured-properties">
      <Header />

      {/* Category statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {Object.entries(CATEGORY_TABS).map(([key, config]) => {
          const count = categoryCounts[key] || 0;
          const isActive = activeCategory === key;
          
          return (
            <div
              key={key}
              className={`p-4 rounded-xl border transition-all duration-200 ${
                isActive 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  isActive ? 'bg-green-100' : 'bg-gray-100'
                }`}>
                  <config.icon className={`w-5 h-5 ${
                    isActive ? 'text-green-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{config.label}</h3>
                  <p className="text-lg font-bold text-green-600">{count}</p>
                </div>
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Category tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 mb-12 bg-gray-100 p-1 rounded-xl h-auto">
            {Object.entries(CATEGORY_TABS).map(([key, config]) => {
              const count = categoryCounts[key] || 0;
              
              return (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="flex items-center gap-2 px-4 py-3 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
                >
                  <config.icon className="w-4 h-4" />
                  <span className="font-medium">{config.label}</span>
                  <Badge variant="secondary" className="ml-1 text-xs">
                    {count}
                  </Badge>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {/* Tab content */}
          {Object.keys(CATEGORY_TABS).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <CategoryContent category={category} />
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>
    </section>
  )
}

// Header component
const Header = () => (
  <motion.header
    className="flex items-center justify-between mb-20"
    initial={{ opacity: 0, y: -30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
  >
    <div className="flex items-center gap-8">
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", damping: 10 }}
      >
        <Flora />
      </motion.div>
      <span className="font-[Poppins-regular] text-sm tracking-wider text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
        Property Categories
      </span>
    </div>

    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
      className="hidden md:flex items-center gap-4"
    >
      <span className="text-sm text-gray-500 bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-3 rounded-2xl border border-gray-200 font-medium shadow-sm">
        Categorized Collection
      </span>
      <div className="flex items-center gap-2 text-green-600">
        <TrendingUp className="w-4 h-4" />
        <span className="text-sm font-medium">Smart Filtering</span>
      </div>
    </motion.div>
  </motion.header>
)