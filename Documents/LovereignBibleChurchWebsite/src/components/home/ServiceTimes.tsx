"use client"

import {motion} from "framer-motion"
import {Clock, MapPin, Moon, Sparkles} from "lucide-react"
import {services} from "@/data/serviceData"

export default function ServiceTimes() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut",
            },
        },
    }

    return (
        <section className="py-20 relative overflow-hidden bg-black">
            <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900/30 to-black" />
            <div className="absolute top-20 left-20 w-40 h-40 bg-gray-800/20 rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-20 w-32 h-32 bg-gray-700/20 rounded-full blur-3xl" />

            <motion.div
                className="container mx-auto px-4 relative z-10"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
            >
                {/* Header */}
                <motion.div className="text-center mb-16" variants={{cardVariants}}>
                    <motion.div
                        className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl mb-6 border border-gray-600/20"
                        whileHover={{
                            scale: 1.1,
                            rotate: 360,
                            transition: { duration: 0.6 },
                        }}
                    >
                        <Clock className="h-6 w-6 md:h-8 md:w-8 text-gray-300" />
                    </motion.div>

                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
            <span className="bg-gradient-to-r from-gray-100 via-gray-300 to-gray-100 bg-clip-text text-transparent">
              Join Us for{" "}
            </span>
                        <span className="bg-gradient-to-r from-gray-400 to-gray-500 bg-clip-text text-transparent">Worship</span>
                    </h2>

                    <motion.div
                        className="w-24 h-1 bg-gradient-to-r from-gray-500 to-gray-600 mx-auto rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: 96 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                    />

                    <p className="text-base md:text-lg text-gray-400 mt-6 max-w-2xl mx-auto font-light">
                        Experience God&#39;s presence with us throughout the week
                    </p>
                </motion.div>

                {/* Service Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {services.map((service, index) => {
                        const IconComponent = service.icon
                        return (
                            <motion.div
                                key={service.id}
                                className={`group relative bg-gray-900/70 backdrop-blur-sm rounded-3xl p-6 sm:p-8 border border-gray-700/30 shadow-lg hover:shadow-2xl hover:shadow-gray-900/50 transition-all duration-500 ${
                                    service.featured ? "lg:scale-105 ring-2 ring-gray-600/50" : ""
                                }`}
                                variants={{cardVariants}}
                                whileHover={{
                                    y: -8,
                                    transition: { duration: 0.3 },
                                }}
                            >
                                {/* Background Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Featured Badge */}
                                {service.featured && (
                                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-gray-600 to-gray-700 text-gray-100 px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                      Most Popular
                    </span>
                                    </div>
                                )}

                                <div className="relative z-10">
                                    {/* Icon */}
                                    <motion.div
                                        className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-gray-800/50 to-gray-700/50 rounded-2xl mb-6 shadow-sm"
                                        whileHover={{
                                            rotate: 360,
                                            scale: 1.1,
                                            transition: { duration: 0.6 },
                                        }}
                                    >
                                        <IconComponent className="h-6 w-6 md:h-7 md:w-7 text-gray-300" />
                                    </motion.div>

                                    {/* Title */}
                                    <h3 className="text-lg md:text-xl font-bold text-gray-100 mb-3 group-hover:text-white transition-colors duration-300">
                                        {service.title}
                                    </h3>

                                    {/* Time */}
                                    <div className="flex items-start mb-3">
                                        <Clock className="h-4 w-4 text-gray-400 mr-3 mt-0.5 flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-gray-100 text-base md:text-lg">{service.time}</p>
                                            <p className="text-gray-400 text-sm font-medium">{service.description}</p>
                                        </div>
                                    </div>

                                    {/* Location */}
                                    <div className="flex items-center">
                                        <MapPin className="h-4 w-4 text-gray-500 mr-3 flex-shrink-0" />
                                        <p className="text-gray-400 text-sm md:text-base font-medium">{service.location}</p>
                                    </div>

                                    {/* Decorative Element */}
                                    <motion.div
                                        className="absolute bottom-6 right-6 w-8 h-8 bg-gradient-to-br from-gray-600/20 to-gray-700/20 rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.1, 0.2, 0.1],
                                        }}
                                        transition={{
                                            duration: 3,
                                            repeat: Number.POSITIVE_INFINITY,
                                            ease: "easeInOut",
                                            delay: index * 0.5,
                                        }}
                                    />
                                </div>
                            </motion.div>
                        )
                    })}
                </div>

                {/* Bottom CTA */}
                <motion.div className="text-center mt-16" variants={{cardVariants}}>
                    <p className="text-xs md:text-sm text-gray-500 mt-4 font-light">We can&#39;t wait to worship with you</p>
                </motion.div>

                {/* Floating Decorative Elements */}
                <motion.div
                    className="absolute top-32 right-1/4 opacity-20"
                    animate={{
                        y: [0, -15, 0],
                        rotate: [0, 5, -5, 0],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                >
                    <Moon className="h-6 w-6 text-gray-600" />
                </motion.div>

                <motion.div
                    className="absolute bottom-32 left-1/4 opacity-15"
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, -5, 5, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                >
                    <Sparkles className="h-8 w-8 text-gray-600" />
                </motion.div>
            </motion.div>
        </section>
    )
}