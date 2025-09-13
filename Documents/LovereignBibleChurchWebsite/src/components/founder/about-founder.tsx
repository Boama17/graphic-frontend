"use client";

import {useRef} from "react";
import {easeInOut, motion, useInView} from "framer-motion";
import {Facebook, Instagram, Quote, Twitter} from "lucide-react";

const pjw = "/logos/pjw.jpeg";

export default function AboutFounder() {
    const ref = useRef(null);
    const isInView = useInView(ref, {
        once: false,
        amount: 0.2,
    });


    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                when: "beforeChildren",
                staggerChildren: 0.1, // faster stagger
            },
        },
    };

    const titleVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4, // reduced from 0.8
                ease: easeInOut,
            },
        },
    };

    const contentVariants = {
        hidden: { opacity: 0, x: -50 },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.4, // reduced from 0.8
                ease: easeInOut,
            },
        },
    };

    const imageVariants = {
        hidden: { opacity: 0, scale: 0.9, rotate: -2 },
        visible: {
            opacity: 1,
            scale: 1,
            rotate: 0,
            transition: {
                duration: 0.5, // reduced from 1
                ease: easeInOut,
            },
        },
    };

    const decorationVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delay: 0.2, // reduced delay
                duration: 0.6, // reduced from 1.2
            },
        },
    };

    const socialVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3, // reduced from 0.6
                delay: 0.4, // reduced from 0.8
            },
        },
    };

    return (
        <div
            ref={ref}
            className="relative min-h-screen w-full ps-10 bg-gradient-to-b from-black via-gray-900 to-black overflow-hidden flex items-center justify-center py-12 md:py-16"
        >
            {/* Decorative Elements - Reduced sizes */}
            <motion.div
                className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
                variants={decorationVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="absolute top-16 left-8 w-48 h-48 rounded-full bg-purple-500/5 blur-3xl"></div>
                <div className="absolute bottom-16 right-8 w-56 h-56 rounded-full bg-blue-500/5 blur-3xl"></div>

                {/* Decorative Lines - Shorter */}
                <div className="absolute top-0 left-1/4 w-px h-28 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
                <div className="absolute bottom-0 right-1/3 w-px h-40 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>

                {/* Decorative Quotes - Smaller */}
                <div className="absolute top-32 right-16 text-white/5">
                    <Quote size={80} />
                </div>
                <div className="absolute bottom-32 left-16 text-white/5 rotate-180">
                    <Quote size={60} />
                </div>
            </motion.div>

            {/* Main Content */}
            <motion.div
                className="relative z-10 container mx-auto px-4 lg:px-6 text-white"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        className="text-left order-2 lg:order-1"
                        variants={contentVariants}
                    >
                        <motion.div className="mb-5 inline-block" variants={titleVariants}>
                            <div className="h-0.5 w-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full mb-4"></div>
                            <h2 className="text-2xl leading-[3rem] md:text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                                Reverend
                                <br />
                                <span className="text-3xl md:text-4xl lg:text-5xl">
                  John Winfred
                </span>
                            </h2>
                        </motion.div>

                        <motion.div
                            className="space-y-4 text-base text-gray-300 leading-relaxed"
                            variants={contentVariants}
                        >
                            <p>
                                Rev. John Winfred is a proficient Pastor, preacher and teacher
                                of the word of God. He is a highly sought after minister of
                                God&#39;s word on most university campuses in Ghana. His
                                ministrations are characterized by consummate revelations in the
                                Body of Christ, soul winning the work of the ministry, Bible
                                doctrine and shepherding (discipleship/discipling) the flock of
                                God.
                            </p>

                            <p>
                                He is the founder and Senior Pastor of Lovereign Bible church.
                                He oversees a network of branches of Lovereign Bible Church.
                            </p>

                            <blockquote className="border-l-3 border-blue-500 pl-3 my-4 italic text-white text-sm">
                                &#34;Faith is taking the first step even when you don&#39;t see the
                                whole staircase.&#34;
                            </blockquote>

                            <p>
                                He is also the founder of the Young Ministers' Network
                                International (YMNI), a growing fellowship and a network of
                                young ministers of the gospel. He is a board member of the
                                "Healing Jesus Campaign", an international evangelistic network
                                of pastors, headed by the renowned Healing Evangelist, Mega
                                Church Pastor and Teacher, Bishop Dag Heward Mills. He is also a
                                member of the Ghana Charismatic Bishops' Conference.
                            </p>
                            <p>
                                His aim is to prepare Gods people and arm them with an excellent
                                Bible based belief, guiding them to fulfil their divine mandate.
                                Rev. John Winfred is blessed with so many sons and daughters in
                                the ministry all over the world. He is married to Dr. Anita
                                Winfred and they are blessed with two children.
                            </p>
                        </motion.div>

                        <motion.div className="mt-8" variants={socialVariants}>
                            <p className="text-white/80 mb-3 font-medium text-sm">
                                Follow Reverend John Winfred
                            </p>
                            <div className="flex gap-4">
                                <a
                                    href="https://www.facebook.com/johnwinfred.nsiahantwi"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                                    aria-label="Facebook"
                                >
                                    <Facebook size={16} />
                                </a>
                                <a
                                    href="https://www.instagram.com/john.winfred?igsh=ZHFsNzJiZnJnejNo"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                                    aria-label="Instagram"
                                >
                                    <Instagram size={16} />
                                </a>
                                <a
                                    href="https://x.com/pastorwinfred?s=11"
                                    className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors duration-300"
                                    aria-label="Twitter"
                                >
                                    <Twitter size={16} />
                                </a>
                            </div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column - Image */}
                    <motion.div
                        className="relative flex justify-center items-center order-1 lg:order-2"
                        variants={imageVariants}
                    >
                        <div className="relative">
                            {/* Image Frame - Reduced inset */}
                            <motion.div
                                className="absolute -inset-3 border border-white/20 rounded-xl -rotate-3"
                                animate={{
                                    rotate: [-3, 0, -3],
                                    transition: {
                                        duration: 8,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "reverse",
                                        ease: "easeInOut",
                                    },
                                }}
                            ></motion.div>

                            {/* Glow Effect - Smaller blur */}
                            <motion.div
                                className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-purple-600/20 rounded-lg blur-lg opacity-70"
                                animate={{
                                    opacity: [0.5, 0.7, 0.5],
                                    scale: [0.98, 1.01, 0.98],
                                }}
                                transition={{
                                    duration: 5,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "mirror",
                                }}
                            ></motion.div>

                            {/* Main Image - Smaller max width */}
                            <img
                                src={pjw || "/placeholder.svg"}
                                alt="Reverend John Winfred"
                                className="rounded-lg shadow-2xl w-full max-w-sm mx-auto relative z-10"
                            />

                            {/* Decorative Element - Smaller size */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full opacity-80 blur-md"
                                animate={{
                                    scale: [1, 1.1, 1],
                                    opacity: [0.6, 0.8, 0.6],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            ></motion.div>
                        </div>
                    </motion.div>
                </div>
            </motion.div>
        </div>
    );
}