"use client"

import {useEffect, useState} from "react"
import Link from "next/link"
import Image from "next/image"
import {AnimatePresence, motion} from "framer-motion"
import {ArrowLeft, ArrowRight} from "lucide-react"
import type {HeroItem} from "@/data/heroData"
import {cn} from "@/lib/utils"
import {useMediaQuery} from "@/hooks/use-media-query"

interface HeroProps {
  items: HeroItem[]
  autoSlideInterval?: number
  primaryButtonText?: string
  primaryButtonLink?: string
  secondaryButtonText?: string
  secondaryButtonLink?: string
}

export default function Hero({
                               items,
                               autoSlideInterval = 5000,
                               primaryButtonText ,
                               primaryButtonLink = "/our-story",
                               secondaryButtonText ,
                               secondaryButtonLink = "/contact-us",
                             }: HeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const isMobile = useMediaQuery("(max-width: 768px)")

  // Auto-slide functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length)
    }, autoSlideInterval)

    return () => clearInterval(interval)
  }, [isAutoPlaying, items.length, autoSlideInterval])

  // Pause auto-slide on hover
  const handleMouseEnter = () => setIsAutoPlaying(false)
  const handleMouseLeave = () => setIsAutoPlaying(true)

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 3000)
  }

  const goToPrevious = () => {
    const newIndex = currentIndex === 0 ? items.length - 1 : currentIndex - 1
    goToSlide(newIndex)
  }

  const goToNext = () => {
    const newIndex = (currentIndex + 1) % items.length
    goToSlide(newIndex)
  }

  const currentItem = items[currentIndex]

  // Split title into words for individual animation
  const titleWords = currentItem.title.split(" ")

  return (
      <div
          className="relative h-[85vh] flex items-center overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
      >
        <div className="absolute inset-0 w-full min-h-[85vh] bg-gradient-to-b from-transparent to-black z-10 pointer-events-none"></div>
        {/* Background Image with Animation */}
        <AnimatePresence mode="wait">
          <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute inset-0 z-0"
          >
            <Image
                src={isMobile ? currentItem.mobileImage : currentItem.desktopImage}
                alt="Church background"
                fill
                priority
                className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>

        {/* Content - Left Aligned */}
        <div className="relative z-10 container mx-auto px-6 md:px-12 flex flex-col items-start justify-center h-full">
          <AnimatePresence mode="wait">
            <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="max-w-2xl text-left text-white"
            >
              {/* Church Name with Elegant Styling */}
              <motion.div
                  className="relative mb-6"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.8 }}
              >
              <span className="inline-block text-[0.5rem] md:text-xs font-light mb-2 text-blue-200/80 uppercase tracking-[0.2em] relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
                  Lovereign Bible Church
                </span>
                <motion.div
                    className="absolute -bottom-1 left-0 h-[1px] bg-gradient-to-r from-blue-400/60 to-transparent"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.8, duration: 1 }}
                />
              </span>
              </motion.div>

              {/* Main Title with Word-by-Word Animation */}
              <motion.h1
                  className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl mb-8 tracking-tight"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
              >
                {titleWords.map((word, index) => (
                    <motion.span
                        key={index}
                        className="inline-block leading-22 mr-3 md:mr-4 bg-gradient-to-b from-white via-white to-gray-200 bg-clip-text text-transparent"
                        initial={{ opacity: 0, y: 50, rotateX: -90 }}
                        animate={{ opacity: 1, y: 0, rotateX: 0 }}
                        transition={{
                          delay: 0.6 + index * 0.1,
                          duration: 0.8,
                          ease: "easeOut",
                        }}
                        style={{
                          textShadow: "0 4px 20px rgba(0,0,0,0.3)",
                        }}
                    >
                      {word}
                    </motion.span>
                ))}
              </motion.h1>

              {/* Decorative Line with Glow Effect */}
              <motion.div
                  className="relative mb-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1, duration: 0.8 }}
              >
                <motion.div
                    className="h-[2px] bg-gradient-to-r from-blue-400 via-blue-300 to-transparent relative"
                    initial={{ width: 0 }}
                    animate={{ width: "120px" }}
                    transition={{ delay: 1.2, duration: 1.2, ease: "easeOut" }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-blue-300 to-transparent blur-sm opacity-60" />
                </motion.div>
              </motion.div>

              {/* Subtitle with Elegant Typography */}
              <motion.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.4, duration: 0.8 }}
              >
                <p className="text-base md:text-lg lg:text-xl xl:text-xl font-light leading-relaxed">
                <span className="bg-gradient-to-r italic from-gray-100 via-white to-gray-200 bg-clip-text text-transparent">
                  {currentItem.subtitle}
                </span>
                </p>
              </motion.div>

              {/* Enhanced Buttons */}
              <motion.div
                  className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 0.8 }}
              >
                {primaryButtonText ? (
                    <Link
                        href={primaryButtonLink}
                        className="group relative overflow-hidden inline-flex items-center gap-3 text-white font-medium"
                    >
                  <span className="relative z-10 bg-gradient-to-r from-white to-gray-100 bg-clip-text text-transparent group-hover:from-blue-200 group-hover:to-white transition-all duration-300 text-base md:text-lg">
                    {primaryButtonText}
                  </span>
                      <span className="relative z-10 transition-all duration-300 group-hover:translate-x-2 group-hover:scale-110">
                    <ArrowRight className="h-5 w-5 md:h-6 md:w-6" />
                  </span>
                      <motion.span
                          className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-blue-400 to-blue-300"
                          initial={{ width: "30%" }}
                          whileHover={{ width: "100%" }}
                          transition={{ duration: 0.3 }}
                      />
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-blue-400 to-blue-300 blur-sm opacity-50" />
                    </Link>
                ) : null}

                {secondaryButtonText ? (
                    <Link
                        href={secondaryButtonLink}
                        className="group relative overflow-hidden inline-block px-8 py-3 text-base md:text-lg font-medium text-white border border-white/20 hover:border-white/40 transition-all duration-300 backdrop-blur-sm rounded-sm"
                    >
                  <span className="relative z-10 group-hover:text-blue-100 transition-colors duration-300 text-sm md:text-base">
                    {secondaryButtonText}
                  </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                ) : null}
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Enhanced Slide Counter */}
          <motion.div
              className="absolute bottom-12 left-6 md:left-12 z-20 flex items-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.2, duration: 0.6 }}
          >
          <span className="text-white/90 text-sm font-medium tracking-wider">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
            <div className="w-16 h-[1px] bg-white/20 relative">
              <motion.div
                  className="h-full bg-gradient-to-r from-blue-400 to-white"
                  initial={{ width: 0 }}
                  animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-white blur-sm opacity-50" />
            </div>
            <span className="text-white/60 text-sm font-light">{String(items.length).padStart(2, "0")}</span>
          </motion.div>
        </div>

        {/* Enhanced Navigation Controls */}
        <div className="absolute bottom-12 right-6 md:right-12 z-20 flex items-center gap-6">
          <button
              onClick={goToPrevious}
              className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Previous slide"
          >
            <ArrowLeft className="h-6 w-6" />
          </button>
          <button
              onClick={goToNext}
              className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-all duration-300 hover:scale-110"
              aria-label="Next slide"
          >
            <ArrowRight className="h-6 w-6" />
          </button>
        </div>

        {/* Enhanced Indicators */}
        <div className="absolute top-1/2 -translate-y-1/2 right-6 md:right-12 z-20 flex flex-col gap-4">
          {items.map((_, index) => (
              <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                      "relative transition-all duration-300",
                      index === currentIndex
                          ? "w-2 h-8 bg-gradient-to-b from-blue-400 to-white rounded-full"
                          : "w-1.5 h-1.5 bg-white/40 hover:bg-white/70 rounded-full",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-400 to-white rounded-full blur-sm opacity-60" />
                )}
              </button>
          ))}
        </div>
      </div>
  )
}