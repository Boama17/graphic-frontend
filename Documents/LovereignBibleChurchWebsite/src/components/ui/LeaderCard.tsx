"use client"

import {useState} from "react"
import {motion} from "framer-motion"
import {MapPin} from "lucide-react"
import Image from "next/image"
import {LeaderItem} from "@/data/LeaderData";


interface LeaderCardProps {
    leader: LeaderItem
    index: number
}

export default function LeaderCard({ leader, index }: LeaderCardProps) {
    const [imageLoaded, setImageLoaded] = useState(false)

    // Generate a random color for each pastor's glow
    const getGlowColor = (index: number) => {
        const colors = [
            "from-blue-500/30 to-indigo-500/30",
            "from-purple-500/30 to-pink-500/30",
            "from-amber-500/30 to-orange-500/30",
            "from-emerald-500/30 to-teal-500/30",
            "from-sky-500/30 to-cyan-500/30",
            "from-violet-500/30 to-fuchsia-500/30",
        ]
        return colors[index % colors.length]
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
            },
        },
    }

    return (
        <motion.div
            variants={cardVariants}
            className="flex flex-col items-center text-center group"
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 300 }}
        >
            <div className="relative mb-3">
                {/* Glowing oval background with angled curve */}
                <div
                    className={`absolute -inset-1 rounded-full bg-gradient-to-br ${getGlowColor(
                        index,
                    )} blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300 transform -rotate-12`}
                ></div>

                {/* Inner oval with angled curve */}
                <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gray-800/80 to-gray-900/80 transform -rotate-12"></div>

                {/* Image container */}
                <div className="relative w-28 h-28 sm:w-32 sm:h-32 overflow-hidden rounded-full border-2 border-gray-700 group-hover:border-gray-500 transition-colors">
                    {!imageLoaded && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                    )}
                    <Image
                        src={leader.image || "/church_leaders/noPic.png"}
                        alt={leader.name}
                        fill
                        className="object-cover"
                        priority={index < 10}
                        onLoad={() => setImageLoaded(true)}
                        style={{ opacity: imageLoaded ? 1 : 0 }}
                    />
                </div>
            </div>

            {/* Location badge */}
            <div className="flex items-center justify-center space-x-1 text-xs bg-gray-800/80 text-blue-300 px-2 py-0.5 rounded-full mb-2 backdrop-blur-sm">
                <MapPin size={10} />
                <span>{leader.location}</span>
            </div>

            {/* Name and title */}
            <h3 className="text-sm font-medium text-white mb-0.5 line-clamp-2">{leader.name}</h3>
            <p className="text-gray-400 text-xs">{leader.title}</p>
        </motion.div>
    )
}
