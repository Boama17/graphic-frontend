"use client";

import {Facebook, Podcast, Twitter, Video, Youtube} from "lucide-react";
import {motion} from "framer-motion";
import {useEffect, useState} from "react";

const StreamingPlatforms = () => {
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
            },
        },
    };

    const platforms = [
        {
            name: "YouTube",
            icon: <Youtube className="text-red-500" size={24} />,
            description:
                "Watch our latest content, interviews, and behind-the-scenes footages on YouTube.",
            cta: "Subscribe Now",
            ctaIcon: <Youtube size={14} />,
            url: "https://www.youtube.com/@lovereignbiblechurch",
            color: "red",
            gradient: "from-red-600 to-red-500 hover:from-red-500 hover:to-red-600",
            iconBg: "bg-red-500/10",
            hoverText: "text-red-400",
            shadow: "shadow-red-500/20 hover:shadow-red-500/40",
            blobRotate: "rotate-12",
        },
        {
            name: "Podbean",
            icon: <Podcast className="text-green-500" size={24} />,
            description:
                "Listen to our podcasts and audio content on Podbean. Available anytime, anywhere.",
            cta: "Listen Now",
            ctaIcon: <Podcast size={14} />,
            url: "https://lovereignbiblechurch.podbean.com/",
            color: "green",
            gradient:
                "from-green-600 to-green-500 hover:from-green-500 hover:to-green-600",
            iconBg: "bg-green-500/10",
            hoverText: "text-green-400",
            shadow: "shadow-green-500/20 hover:shadow-blue-500/40",
            blobRotate: "-rotate-12",
        },
        {
            name: "TikTok",
            icon: <Video className="text-pink-500" size={24} />,
            description:
                "Catch our short-form videos, quick insights, and engaging content on TikTok.",
            cta: "Follow Now",
            ctaIcon: <Video size={14} />,
            url: "https://www.tiktok.com/@lovereignbiblechurch",
            color: "pink",
            gradient:
                "from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600",
            iconBg: "bg-pink-500/10",
            hoverText: "text-pink-400",
            shadow: "shadow-pink-500/20 hover:shadow-pink-500/40",
            blobRotate: "rotate-6",
        },
        {
            name: "Facebook",
            icon: <Facebook className="text-blue-600" size={24} />,
            description:
                "Join us on Facebook and engage with us. Available anytime, anywhere.",
            cta: "Join Now",
            ctaIcon: <Facebook size={14} />,
            url: "https://facebook.com/lovereignbiblechurch",
            color: "blue",
            gradient:
                "from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-600",
            iconBg: "bg-blue-500/10",
            hoverText: "text-blue-400",
            shadow: "shadow-blue-500/20 hover:shadow-blue-500/40",
            blobRotate: "-rotate-12",
        },
        {
            name: "Twitter (now X)",
            icon: <Twitter className="text-blue-400" size={24} />,
            description:
                "Catch our short-form videos, quick insights, and engaging content on X.",
            cta: "Follow Now",
            ctaIcon: <Twitter size={14} />,
            url: "https://x.com/lovereignchurch",
            color: "blue",
            gradient:
                "from-blue-500 to-blue-400 hover:from-blue-400 hover:to-blue-500",
            iconBg: "bg-blue-400/10",
            hoverText: "text-blue-300",
            shadow: "shadow-blue-400/20 hover:shadow-blue-400/40",
            blobRotate: "rotate-6",
        },
    ];

    // Store all particles for all platforms in state to avoid hydration issues
    const [allParticles, setAllParticles] = useState<Array<Array<{
        width: number;
        height: number;
        left: string;
        top: string;
        y: number;
        x: number;
        duration: number;
        repeatDelay: number;
    }>>>([]);

    useEffect(() => {
        setAllParticles(
            platforms.map(() =>
                [...Array(4)].map(() => ({
                    width: Math.random() * 3 + 1,
                    height: Math.random() * 3 + 1,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    y: -15 - Math.random() * 20,
                    x: Math.random() * 15 - 7.5,
                    duration: 1 + Math.random(),
                    repeatDelay: Math.random() * 0.5,
                }))
            )
        );
    }, [platforms.length]);

    return (
        <div className="py-12 text-white relative overflow-hidden">
            {/* Enhanced background elements with more fluid animations */}
            <div className="absolute inset-0 opacity-20">
                <motion.div
                    className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-[100px]"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-72 h-72 bg-purple-500 rounded-full filter blur-[100px]"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.2, 0.3, 0.2],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-500 rounded-full filter blur-[120px]"
                    animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.2, 0.25, 0.2],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "reverse",
                    }}
                />
            </div>

            {/* Subtle grid pattern overlay */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMDIwMjAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0aDR2MWgtNHYtMXptMC0yaDF2NGgtMXYtNHptMi0yaDF2MWgtMXYtMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xem0yLTJoMXYxaC0xdi0xem0tMiAydi0xaC0xdjFoMXptLTIgMmgtMXYxaDF2LTF6bS0yLTJoMXYxaC0xdi0xeiIvPjwvZz48L2c+PC9zdmc+')] opacity-10"></div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Refined heading with more elegant typography */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-3xl md:text-4xl font-light mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 inline-block font-serif tracking-wide">
                        Our Streaming Platforms
                    </h2>
                    <div className="w-20 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-base font-light">
                        Connect with us across multiple platforms so you never miss out on
                        our latest content
                    </p>
                </motion.div>

                {/* Fluid platform cards with organic shapes - REDUCED SIZE */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-4 justify-items-center"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {platforms.map((platform, index) => {
                        const particles = allParticles[index] || [];
                        return (
                            <motion.div
                                key={platform.name}
                                className="group w-full max-w-[260px]"
                                variants={{ itemVariants }}
                                whileHover={{ scale: 1.03 }}
                                transition={{ type: "spring", stiffness: 300, damping: 15 }}
                            >
                                {/* Organic blob shape container */}
                                <div className={`relative ${platform.blobRotate}`}>
                                    {/* Background blob shape */}
                                    <div
                                        className={`absolute -inset-1 bg-gradient-to-br from-${platform.color}-500/20 to-${platform.color}-600/20 
                  blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500 rounded-[60%_40%_40%_60%/60%_30%_70%_40%]`}
                                    ></div>

                                    {/* Main content container with organic shape */}
                                    <div
                                        className={`relative bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] 
                  rounded-[60%_40%_40%_60%/60%_30%_70%_40%] overflow-hidden 
                  border border-gray-800 group-hover:border-${platform.color}-900/30
                  shadow-md shadow-${platform.color}-500/10 group-hover:shadow-${platform.color}-500/20
                  transition-all duration-500`}
                                    >
                                        {/* Glossy overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                        {/* Fluid glare effect */}
                                        <motion.div
                                            className="absolute -top-40 -left-40 w-60 h-60 bg-white opacity-0 group-hover:opacity-10
                      rotate-45 transform"
                                            initial={{ x: 0, y: 0 }}
                                            whileHover={{
                                                x: 200,
                                                y: 200,
                                                transition: { duration: 1.5, ease: "easeOut" },
                                            }}
                                        ></motion.div>

                                        {/* Content with more fluid spacing - REDUCED PADDING */}
                                        <div className="p-5 text-center relative z-10">
                                            {/* Floating particles on hover */}
                                            {particles.map((particle, i) => (
                                                <motion.div
                                                    key={`particle-${platform.name}-${i}`}
                                                    className={`absolute rounded-full bg-${platform.color}-400/40 opacity-0 group-hover:opacity-100`}
                                                    style={{
                                                        width: particle.width,
                                                        height: particle.height,
                                                        left: particle.left,
                                                        top: particle.top,
                                                    }}
                                                    initial={{ scale: 0 }}
                                                    whileHover={{
                                                        y: [0, particle.y],
                                                        x: [0, particle.x],
                                                        scale: [0, 1, 0],
                                                        opacity: [0, 1, 0],
                                                        transition: {
                                                            duration: particle.duration,
                                                            repeat: Number.POSITIVE_INFINITY,
                                                            repeatDelay: particle.repeatDelay,
                                                        },
                                                    }}
                                                />
                                            ))}

                                            {/* Icon with fluid animation - SMALLER SIZE */}
                                            <motion.div
                                                className={`w-12 h-12 rounded-full ${platform.iconBg} flex items-center justify-center mx-auto mb-3
                        group-hover:scale-110 transition-transform duration-500`}
                                                whileHover={{
                                                    rotate: [0, -10, 10, -5, 5, 0],
                                                    transition: { duration: 1.5 },
                                                }}
                                            >
                                                {platform.icon}
                                            </motion.div>

                                            {/* Platform name with gradient hover effect - SMALLER TEXT */}
                                            <h3
                                                className={`text-lg font-medium mb-2 text-white group-hover:${platform.hoverText} transition-colors duration-300`}
                                            >
                                                {platform.name}
                                            </h3>

                                            {/* Description with improved typography - SMALLER TEXT */}
                                            <p className="text-gray-400 mb-4 leading-relaxed text-xs font-light line-clamp-3">
                                                {platform.description}
                                            </p>

                                            {/* CTA button with fluid animation - SMALLER BUTTON */}
                                            <a
                                                href={platform.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className={`inline-block bg-gradient-to-r ${platform.gradient} text-white font-medium 
                        py-1.5 px-4 rounded-full transition-all duration-300
                        relative overflow-hidden group shadow-sm ${platform.shadow}`}
                                            >
                      <span className="relative z-10 flex items-center justify-center gap-1.5 text-xs">
                        {platform.ctaIcon}
                          <span>{platform.cta}</span>
                      </span>

                                                {/* Button highlight effect */}
                                                <motion.span
                                                    className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                                                    initial={{ x: "-100%" }}
                                                    whileHover={{
                                                        x: "100%",
                                                        transition: { duration: 1, ease: "easeOut" },
                                                    }}
                                                ></motion.span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>
        </div>
    );
};

export default StreamingPlatforms;
