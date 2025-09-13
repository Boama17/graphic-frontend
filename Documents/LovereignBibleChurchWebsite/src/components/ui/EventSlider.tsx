"use client"

import {useEffect, useRef, useState} from "react"
import {motion, useInView} from "framer-motion"
import {Calendar, ChevronLeft, ChevronRight} from "lucide-react"
import EventCard from "./EventCard"
import type {EventItem} from "@/data/eventsData"
import {cn} from "@/lib/utils"


interface EventsSliderProps {
    events: EventItem[]
    autoSlideInterval?: number
    slidesToShow?: {
        mobile: number
        tablet: number
        desktop: number
    }
    title?: string
    subtitle?: string
}

function EmptyState() {
    return (
        <motion.div 
            className="flex flex-col items-center justify-center py-24 px-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
        >

            <h3 className="text-xl md:text-2xl font-medium text-gray-300 text-center mb-3">
                No Upcoming Events
            </h3>
            <p className="text-gray-400 text-sm text-center max-w-md">
                Check back soon for new events and activities. 
                Meanwhile, you can join us for our regular Sunday service.
            </p>
            <motion.div
                className="w-16 h-0.5 bg-gradient-to-r from-teal-300/0 via-teal-300/50 to-teal-300/0 mt-8"
                animate={{ 
                    scaleX: [1, 1.5, 1],
                    opacity: [0.3, 0.7, 0.3]
                }}
                transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
            />
        </motion.div>
    )
}

export default function EventsSlider({
    events = [],
    ...props
}: EventsSliderProps) {
    // Filter out past events at the component level
    const upcomingEvents = events.filter(event => {
        const eventDate = new Date(event.date)
        const today = new Date()
        today.setHours(0, 0, 0, 0) // Reset time to start of day for fair comparison
        return eventDate >= today
    })

    const [currentIndex, setCurrentIndex] = useState(0)
    const [isAutoPlaying, setIsAutoPlaying] = useState(true)
    const [slidesPerView, setSlidesPerView] = useState(props.slidesToShow?.desktop || 3)
    const sliderRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(headerRef, { 
        margin: "-100px",
        amount: 0.3 // This means 30% of the element needs to be visible
    })

    const headerVariants = {
        hidden: { 
            opacity: 0, 
            y: 20,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    }

    const underlineVariants = {
        hidden: { 
            width: 0,
            transition: {
                duration: 0.3,
                ease: "easeIn"
            }
        },
        visible: { 
            width: 96,
            transition: {
                duration: 0.5,
                delay: 0.2,
                ease: "easeOut"
            }
        }
    }

useEffect(() => {
    if (!isAutoPlaying || upcomingEvents.length <= slidesPerView) return

    const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => {
            const maxIndex = upcomingEvents.length - slidesPerView
            return prevIndex >= maxIndex ? 0 : prevIndex + 1
        })
    }, props.autoSlideInterval || 5000)

    return () => clearInterval(interval)
}, [isAutoPlaying, upcomingEvents.length, slidesPerView, props.autoSlideInterval])

    useEffect(() => {
        if (!isAutoPlaying || events.length <= slidesPerView) return

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => {
                const maxIndex = events.length - slidesPerView
                return prevIndex >= maxIndex ? 0 : prevIndex + 1
            })
        }, props.autoSlideInterval || 5000)

        return () => clearInterval(interval)
    }, [isAutoPlaying, events.length, slidesPerView, props.autoSlideInterval])

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            if (width < 768) {
                setSlidesPerView(props.slidesToShow?.mobile || 1)
            } else if (width < 1024) {
                setSlidesPerView(props.slidesToShow?.tablet || 2)
            } else {
                setSlidesPerView(props.slidesToShow?.desktop || 3)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [props.slidesToShow])

    const maxIndex = Math.max(0, events.length - slidesPerView)

    const goToSlide = (index: number) => {
        setCurrentIndex(Math.max(0, Math.min(index, maxIndex)))
        setIsAutoPlaying(false)
        setTimeout(() => setIsAutoPlaying(true), 3000)
    }

    const goToPrevious = () => {
        const newIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1
        goToSlide(newIndex)
    }

    const goToNext = () => {
        const newIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1
        goToSlide(newIndex)
    }

    const handleMouseEnter = () => setIsAutoPlaying(false)
    const handleMouseLeave = () => setIsAutoPlaying(true)

    // Use upcomingEvents instead of events in the render
    return (
        <section className="py-16 bg-gradient-to-b overflow-x-hidden justify-center items-center from-black/80 to-black">
            <div className="container mx-auto px-4">
                <motion.div
                    ref={headerRef}
                    className="text-center mb-12"
                    variants={headerVariants}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                >
                    <div className="flex items-center justify-center pb-4">
                        <Calendar className="h-8 w-8 text-gray-100 mr-3" />
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-teal-300 via-white to-teal-300 mb-2" 
                            style={{ lineHeight: "1.2", overflow: "visible" }}>
                            {props.title || "Upcoming Events"}
                        </h2>
                    </div>
                    <motion.p 
                        className="text-lg text-white max-w-2xl mx-auto"
                        style={{ lineHeight: "1.5", overflow: "visible" }}
                        variants={{
                            hidden: { opacity: 0 },
                            visible: { opacity: 1 }
                        }}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        {props.subtitle || "Join us for these exciting upcoming events and activities"}
                    </motion.p>

                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-teal-300 via-white to-teal-300 mx-auto mt-6 rounded-full"
                        variants={underlineVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                    />
                </motion.div>

                {upcomingEvents.length === 0 ? (
                    <EmptyState />
                ) : (
                    <>
                        <div className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                            <div className="" ref={sliderRef}>
                                <motion.div
                                    className="flex gap-6"
                                    animate={{
                                        x: `calc(-${currentIndex * (100 / slidesPerView)}% - ${currentIndex * 1.5}rem)`,
                                    }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                >
                                    {upcomingEvents.map((event, index) => (
                                        <div
                                            key={event.id}
                                            className={cn(
                                                "flex-shrink-0 justify-center items-center  p-12",
                                                slidesPerView === 1 && "w-full",
                                                slidesPerView === 2 && "w-[calc(50%-0.75rem)]",
                                                slidesPerView === 3 && "w-[calc(33.333%-1rem)]",
                                            )}
                                        >
                                            <EventCard
                                                event={event}
                                                index={index}
                                                isActive={index >= currentIndex && index < currentIndex + slidesPerView}
                                            />
                                        </div>
                                    ))}
                                </motion.div>
                            </div>

                            {upcomingEvents.length > slidesPerView && (
                                <>
                                    <button
                                        onClick={goToPrevious}
                                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 z-10"
                                        aria-label="Previous events"
                                    >
                                        <ChevronLeft className="h-6 w-6" />
                                    </button>

                                    <button
                                        onClick={goToNext}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-600 hover:text-blue-600 hover:shadow-xl transition-all duration-300 z-10"
                                        aria-label="Next events"
                                    >
                                        <ChevronRight className="h-6 w-6" />
                                    </button>
                                </>
                            )}
                        </div>

                        {upcomingEvents.length > slidesPerView && (
                            <div className="flex justify-center mt-8 gap-2">
                                {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToSlide(index)}
                                        className={cn(
                                            "w-3 h-3 rounded-full transition-all duration-300",
                                            index === currentIndex ? "bg-blue-600 w-8" : "bg-gray-300 hover:bg-gray-400",
                                        )}
                                        aria-label={`Go to slide ${index + 1}`}
                                    />
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    )
}