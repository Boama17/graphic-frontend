"use client"

import {useRef} from "react"
import Link from "next/link"
import Image from "next/image"
import {motion, useInView, useScroll, useTransform} from "framer-motion"
import {BookOpen, Calendar, Heart, Quote, Star, Users} from "lucide-react"

export default function FounderStorySection() {
    const containerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true, amount: 0.3 })

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })

    const y = useTransform(scrollYProgress, [0, 1], [100, -100])

    const storyMilestones = [
        {
            year: "2003",
            title: "The Calling",
            description: "Received divine calling to ministry",
            icon: Star,
            color: "from-amber-400 to-orange-500",
        },
        {
            year: "2013",
            title: "Church Founded",
            description: "Established on December 1st with 12 members",
            icon: Users,
            color: "from-blue-400 to-purple-500",
        },
        {
            year: "2018",
            title: "Community Growth",
            description: "Expanded to 1000 members",
            icon: Heart,
            color: "from-pink-400 to-red-500",
        },
        {
            year: "2025",
            title: "Global Reach",
            description: "Ministry now touches lives worldwide",
            icon: BookOpen,
            color: "from-green-400 to-teal-500",
        },
    ]

    return (
        <section ref={containerRef} className="py-20 bg-black relative overflow-hidden">
            <div className="absolute inset-0">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-r from-gray-800/20 to-gray-700/20 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.4, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                >
                    <motion.div
                        className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm px-4 py-2 rounded-full border border-gray-700/30 mb-6"
                        whileHover={{ scale: 1.05 }}
                    >
                        <Quote className="h-4 w-4 text-gray-300" />
                        <span className="text-sm text-gray-300 font-medium">Our Foundation</span>
                    </motion.div>

                    <h2 className="text-4xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
              The Founder&#39;s
            </span>
                        <br />
                        <span className="bg-gradient-to-r from-gray-400 to-gray-600 bg-clip-text text-transparent">Journey</span>
                    </h2>
                </motion.div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
                    {/* Left Side - Founder Image & Quote */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <div className="relative">
                            {/* Decorative frame */}
                            <div className="absolute -inset-4 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-3xl blur-xl" />

                            <div className="relative bg-gray-900/70 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/30">
                                <div className="flex items-start gap-6">
                                    <div className="relative">
                                        <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-600/50">
                                            <Image
                                                src="/logos/pjw.jpeg"
                                                alt="Pastor John Winfred"
                                                width={96}
                                                height={96}
                                                className="object-cover"
                                            />
                                        </div>
                                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                            <Heart className="h-4 w-4 text-white" />
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h3 className="text-xl font-semibold text-gray-100 mb-2">Pastor John Winfred</h3>
                                        <p className="text-gray-400 text-sm mb-4">Founder & Senior Pastor</p>

                                        <blockquote className="text-gray-300 italic text-sm leading-relaxed">
                                            &#34;For the gifts and calling of God are without repentance - Romans 11:29&#34;
                                        </blockquote>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Story Text */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="space-y-6">
                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                                <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                                    <Calendar className="h-5 w-5 text-gray-400" />
                                    Early Ministry
                                </h4>
                                <p className="text-gray-300 leading-relaxed">
                                    In 2003, Pastor John Winfred started his ministry that would go on to change countless lives. Through
                                    prayer and unwavering faith, he felt God&#39;s direction to establish a church that would make a people ready for Him.
                                </p>
                            </div>

                            <div className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30">
                                <h4 className="text-lg font-semibold text-gray-100 mb-3 flex items-center gap-2">
                                    <Users className="h-5 w-5 text-gray-400" />
                                    Building Community
                                </h4>
                                <p className="text-gray-300 leading-relaxed">
                                    What started as a small gathering of 12 faithful believers on December 1st, 2013, has grown into a
                                    thriving spiritual family. Today, our church continues to fulfill its mission of bringing
                                    transformation through Christ&#39;s love.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Timeline Section */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <h3 className="text-2xl font-bold text-center mb-12 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Milestones of Faith
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {storyMilestones.map((milestone, index) => {
                            const IconComponent = milestone.icon
                            return (
                                <motion.div
                                    key={milestone.year}
                                    className="relative group"
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="bg-gray-900/70 backdrop-blur-sm rounded-xl p-6 border border-gray-700/30 h-full">
                                        <div
                                            className={`w-12 h-12 bg-gradient-to-r ${milestone.color} rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                                        >
                                            <IconComponent className="h-6 w-6 text-white" />
                                        </div>

                                        <div className="text-2xl font-bold text-gray-100 mb-2">{milestone.year}</div>
                                        <h4 className="text-lg font-semibold text-gray-200 mb-2">{milestone.title}</h4>
                                        <p className="text-gray-400 text-sm">{milestone.description}</p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8, delay: 1.2 }}
                >
                    <Link href="/founder">
                        <motion.button
                            className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-gray-700 to-gray-800 text-gray-100 px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl hover:shadow-gray-900/50 transition-all duration-300 border border-gray-600/30"
                            whileHover={{
                                scale: 1.05,
                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3)",
                            }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <BookOpen className="h-5 w-5 group-hover:rotate-12 transition-transform duration-300" />
                            <span>Read Full Story</span>
                            <motion.div className="absolute inset-0 bg-gradient-to-r from-gray-600/20 to-gray-700/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.button>
                    </Link>

                    <p className="text-sm text-gray-500 mt-4">Discover the complete journey of faith and ministry</p>
                </motion.div>
            </div>
        </section>
    )
}
