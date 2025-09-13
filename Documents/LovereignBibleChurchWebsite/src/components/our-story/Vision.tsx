"use client"

import {easeOut, motion, useInView} from "framer-motion"
import {useRef} from "react";

export default function Vision() {
    const containerRef = useRef(null)
    const isInView = useInView(containerRef, { once: false, amount: 0.2 })

    // Animation variants
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.9, ease: easeOut },
        },
    }

    const lineExpand = {
        hidden: { width: 0 },
        visible: {
            width: "100%",
            transition: { duration: 1.2, ease: easeOut, delay: 0.3 },
        },
    }

    return (
        <div
            ref={containerRef}
            className="relative min-h-[80vh] flex items-center justify-center py-20 px-4 bg-gradient-to-b from-[#0a0a1a] to-[#111133] text-white overflow-hidden"
        >
            {/* Subtle background elements */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-[0.02]"></div>

            {/* Light beams */}
            <motion.div
                className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300/10 to-transparent"
                initial={{ opacity: 0, height: 0 }}
                animate={isInView ? { opacity: 1, height: "100%" } : { opacity: 0, height: 0 }}
                transition={{ duration: 1.5, delay: 0.2 }}
            />
            <motion.div
                className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-amber-300/10 to-transparent"
                initial={{ opacity: 0, height: 0 }}
                animate={isInView ? { opacity: 1, height: "100%" } : { opacity: 0, height: 0 }}
                transition={{ duration: 1.5, delay: 0.4 }}
            />

            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    variants={fadeIn}
                    className="flex flex-col items-center justify-center"
                >
                    {/* Simple elegant header */}
                    <motion.h2
                        className="text-2xl font-light text-amber-200/80 mb-6 tracking-wide"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        OUR VISION
                    </motion.h2>

                    {/* Scripture container */}
                    <div className="relative mb-12 px-6 py-10 max-w-2xl w-full">
                        {/* Top decorative line */}
                        <motion.div
                            className="absolute top-0 left-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
                            variants={lineExpand}
                        />

                        {/* Scripture quote with enhanced typography */}
                        <motion.div
                            className="relative z-10 my-8"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                            transition={{ duration: 1, delay: 0.5 }}
                        >
                            <div className="absolute -top-6 left-0 text-5xl text-amber-300/20 font-serif">&#34;</div>
                            <div className="absolute -bottom-10 right-0 text-5xl text-amber-300/20 font-serif">&#34;</div>

                            <p className="text-2xl md:text-3xl lg:text-4xl font-light leading-relaxed text-center text-white/90 italic">
                                Making ready a people prepared for the Lord
                            </p>
                        </motion.div>

                        {/* Bottom decorative line */}
                        <motion.div
                            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-amber-300/50 to-transparent"
                            variants={lineExpand}
                        />
                    </div>

                    {/* Scripture reference */}
                    <motion.p
                        className="text-sm tracking-widest uppercase text-amber-200/60 font-light"
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8, delay: 0.8 }}
                    >
                        Luke 1:17
                    </motion.p>
                </motion.div>
            </div>

            {/* Floating light particles */}
            {[...Array(8)].map((_, index) => (
                <motion.div
                    key={index}
                    className="absolute rounded-full bg-amber-300/10"
                    style={{
                        width: Math.random() * 4 + 2 + "px",
                        height: Math.random() * 4 + 2 + "px",
                        left: Math.random() * 100 + "%",
                        top: Math.random() * 100 + "%",
                    }}
                    initial={{ opacity: 0 }}
                    animate={{
                        opacity: [0, 0.3, 0],
                        y: [0, -20],
                    }}
                    transition={{
                        duration: 3 + Math.random() * 5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

