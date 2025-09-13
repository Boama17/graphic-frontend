"use client"

import {motion} from "framer-motion"
import Image from "next/image"
import {Clock, MapPin} from "lucide-react"
import type {EventItem} from "@/data/eventsData"

interface EventCardProps {
    event: EventItem
    index: number
    isActive?: boolean
}

export default function EventCard({ event, index, isActive = false }: EventCardProps) {
    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("en-US", {
            weekday: "short",
            month: "short",
            day: "numeric",
        })
    }

    // Format time
    const formatTime = (timeString: string) => {
        return timeString
    }

    return (
        <motion.div
            className={`relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group ${
                isActive ? "ring-2 ring-gray-50 ring-opacity-50" : ""
            }`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6 }}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
        >
            {/* Event Image */}
            <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Category Badge */}
                {event.category && (
                    <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-gray-50 backdrop-blur-sm text-blue-400 text-xs font-medium rounded-full">
              {event.category}
            </span>
                    </div>
                )}

            </div>

            {/* Event Content */}
            <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors duration-300">
                    {event.title}
                </h3>

                {event.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>
                )}

                {/* Event Details */}
                <div className="space-y-2 mb-4">
                    {event.time.morning && ( <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Morning: {formatTime(event.time.morning)}</span>
                    </div>)}
                    {event.time.afternoon && ( <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Afternoon: {formatTime(event.time.afternoon)}</span>
                    </div>)}
                    {event.time.evening && ( <div className="flex items-center text-gray-500 text-sm">
                        <Clock className="h-4 w-4 mr-2 text-blue-500" />
                        <span>Evening: {formatTime(event.time.evening)}</span>
                    </div>)}

                    {event.location && (
                        <div className="flex items-center text-gray-500 text-sm">
                            <MapPin className="h-4 w-4 mr-2 text-blue-500" />
                            <span>{event.location}</span>
                        </div>
                    )}

                    <div className="absolute bottom-4 right-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl p-3 text-center shadow-lg">
                        <div className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {formatDate(event.date).split(" ")[0]}
                        </div>
                        <div className="text-lg font-bold text-gray-900">{formatDate(event.date).split(" ")[2]}</div>
                        <div className="text-xs font-medium text-gray-600">{formatDate(event.date).split(" ")[1]}</div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}
