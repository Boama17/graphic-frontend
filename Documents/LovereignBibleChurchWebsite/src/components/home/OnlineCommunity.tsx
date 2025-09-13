"use client"

import {useEffect, useState} from "react"
import {motion} from "framer-motion"
import {Facebook, Globe, Headphones, Instagram, MessageCircle, Music, PodcastIcon, Video, Youtube} from "lucide-react"

// Custom TikTok Icon (since it's not in Lucide)
const TikTokIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-.04-.1z" />
    </svg>
)

// Custom X (Twitter) Icon
const XIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
)


// Enhanced CountUp component with better visibility and control
const CountUp = ({ end, duration = 3000, prefix = "", suffix = "", delay = 0 }: { end: number; duration?: number; prefix?: string; suffix?: string; delay?: number }) => {
    const [count, setCount] = useState(0)
    const [hasStarted, setHasStarted] = useState(false)

    useEffect(() => {
        if (!hasStarted) return

        const startDelay = setTimeout(() => {
            let startTime: number
            let animationFrame: number

            const updateCount = (timestamp: number) => {
                if (!startTime) startTime = timestamp
                const progress = timestamp - startTime

                if (progress < duration) {
                    const percentage = progress / duration
                    // Easing function for smoother animation
                    const easeOutQuart = 1 - Math.pow(1 - percentage, 4)
                    setCount(Math.floor(easeOutQuart * end))
                    animationFrame = requestAnimationFrame(updateCount)
                } else {
                    setCount(end)
                }
            }

            animationFrame = requestAnimationFrame(updateCount)

            return () => {
                if (animationFrame) {
                    cancelAnimationFrame(animationFrame)
                }
            }
        }, delay)

        return () => {
            clearTimeout(startDelay)
        }
    }, [end, duration, delay, hasStarted])

    // Function to start counting
    const startCounting = () => {
        if (!hasStarted) {
            setHasStarted(true)
        }
    }

    return (
        <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            onViewportEnter={startCounting}
            viewport={{ once: true, margin: "-100px" }}
        >
            {prefix}
            {count.toLocaleString()}
            {suffix}
        </motion.span>
    )
}

export default function OnlineCommunity() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    const socialPlatforms = [
        {
            name: "YouTube",
            icon: Youtube,
            url: "https://youtube.com/@lovereignbiblechurch?si=lExgqZKahNHcNtxS",
            color: "text-gray-300 hover:text-gray-100",
            bgColor: "bg-gray-800/50 hover:bg-gray-700/50",
        },
        {
            name: "Podbean",
            icon: PodcastIcon,
            url: "https://lovereignbiblechurch.podbean.com/?source=ad",
            color: "text-gray-300 hover:text-gray-100",
            bgColor: "bg-gray-800/50 hover:bg-gray-700/50",
        },
        {
            name: "TikTok",
            icon: TikTokIcon,
            url: "https://www.tiktok.com/@lovereignbiblechurch",
            color: "text-gray-300 hover:text-gray-100",
            bgColor: "bg-gray-800/50 hover:bg-gray-700/50",
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://www.instagram.com/lovereignbiblechurch",
            color: "text-gray-300 hover:text-gray-100",
            bgColor: "bg-gray-800/50 hover:bg-gray-700/50",
        },
        {
            name: "Facebook",
            icon: Facebook,
            url: "http://facebook.com/LOVEREIGNBIBLECHURCH",
            color: "text-gray-300 hover:text-gray-100",
            bgColor: "bg-gray-800/50 hover:bg-gray-700/50",
        },
        {
            name: "X",
            icon: XIcon,
            url: "https://x.com/lovereignchurch",
            color: "text-gray-300 hover:text-gray-100",
            bgColor: "bg-gray-800/50 hover:bg-gray-700/50",
        },
    ]

    const stats = [
        {
            title: "Sermons",
            value: 520,
            icon: Video,
            color: "text-gray-300",
            bgColor: "bg-gray-800/50",
        },
        {
            title: "Messages",
            value: 1250,
            icon: MessageCircle,
            color: "text-gray-300",
            bgColor: "bg-gray-800/50",
        },
        {
            title: "Podcasts",
            value: 180,
            icon: Headphones,
            color: "text-gray-300",
            bgColor: "bg-gray-800/50",
        },
    ]

    return (
        <section className="py-20 relative overflow-hidden bg-black">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
            <div className="absolute top-20 right-20 w-40 h-40 bg-gray-800/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-20 w-32 h-32 bg-gray-700/20 rounded-full blur-3xl" />

            <motion.div
                className="container mx-auto px-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-12" variants={{itemVariants}}>
                    {/* Reduce icon size */}
                    <motion.div
                        className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl mb-4 sm:mb-6 border border-gray-600/20"
                        whileHover={{
                            scale: 1.05,
                            rotate: 360,
                            transition: { duration: 0.6 },
                        }}
                    >
                        <Globe className="h-6 w-6 sm:h-7 sm:w-7 text-gray-300" />
                    </motion.div>

                    {/* Reduce heading size */}
                    <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-transparent">
                            Join Our{" "}
                        </span>
                        <span className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">
                            Online Community
                        </span>
                    </h2>

                    {/* Adjust description text */}
                    <p className="text-base sm:text-lg text-gray-400 mt-4 max-w-2xl mx-auto font-light">
                        Connect with us on social media and access our growing library of spiritual content
                    </p>
                </motion.div>

                {/* Social Media Icons */}
                <motion.div className="flex flex-wrap justify-center items-center gap-3 sm:gap-4 mb-12" variants={{itemVariants}}>
                    {socialPlatforms.map((platform, index) => {
                        const IconComponent = platform.icon
                        return (
                            <motion.a
                                key={platform.name}
                                href={platform.url}
                                className={`group relative flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl transition-all duration-300 ${platform.bgColor} ${platform.color} border border-gray-700/30`}
                                whileHover={{ y: -2, scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                variants={{itemVariants}}
                                target="_blank"
                                rel="noopener noreferrer"
                                title={platform.name}
                            >
                                <IconComponent className="h-5 w-5 sm:h-6 sm:w-6" />

                                {/* Smaller tooltip */}
                                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-gray-100 text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap border border-gray-600">
                                    {platform.name}
                                </div>
                            </motion.a>
                        )
                    })}
                </motion.div>

                {/* Stats with Count Up */}
                <motion.div
                    className="bg-gray-900/70 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-700/30 shadow-lg"
                    variants={{itemVariants}}
                >
                    <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Our Growing Content Library
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {stats.map((stat, index) => {
                            const IconComponent = stat.icon
                            return (
                                <motion.div
                                    key={stat.title}
                                    className="flex flex-col items-center text-center"
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-50px" }}
                                    transition={{ duration: 0.5, delay: index * 0.2 }}
                                >
                                    <div
                                        className={`w-12 h-12 sm:w-14 sm:h-14 ${stat.bgColor} rounded-xl flex items-center justify-center mb-3 border border-gray-700/30`}
                                    >
                                        <IconComponent className={`h-6 w-6 sm:h-7 sm:w-7 ${stat.color}`} />
                                    </div>

                                    <h4 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                                        <CountUp end={stat.value} prefix="" suffix="+" duration={2000} delay={index * 200} />
                                    </h4>

                                    <p className="text-sm sm:text-base text-gray-400 font-medium">{stat.title}</p>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* CTA */}
                <motion.div className="text-center mt-8 sm:mt-10" variants={{itemVariants}}>
                    <motion.a
                        href="/media"
                        className="inline-flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 px-6 py-3 rounded-xl font-medium text-base sm:text-lg shadow-lg hover:shadow-xl hover:shadow-gray-900/30 transition-all duration-300 border border-gray-600/30"
                        whileHover={{
                            scale: 1.02,
                            boxShadow: "0 15px 30px rgba(0, 0, 0, 0.2)",
                        }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Music className="h-4 w-4 sm:h-5 sm:w-5" />
                        <span>Explore Our Content</span>
                    </motion.a>

                    <p className="text-xs sm:text-sm text-gray-500 mt-3 font-light">New content added weekly</p>
                </motion.div>
            </motion.div>
        </section>
    )
}