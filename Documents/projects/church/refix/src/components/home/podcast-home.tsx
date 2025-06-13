"use client"

import { useRef } from "react"
import { motion, useInView } from "framer-motion"
import CountUp from "react-countup"

import earth from "@/../public/assets/img/earth.png"
import youtube from "@/../public/assets/img/youtube.svg"
import podbean from "@/../public/assets/img/podbean.svg"
import tiktok from "@/../public/assets/img/tiktok.png"
import instagram from "@/../public/assets/img/instagram.png"
import twitter from "@/../public/assets/img/twitter.png";
import facebook from "@/../public/assets/img/facebook.png";

function Podcast() {
  const containerRef = useRef(null);
  const statsRef = useRef(null);
  const platformsRef = useRef(null);

  const isInView = useInView(containerRef, { once: false, amount: 0.2 });
  const statsInView = useInView(statsRef, { once: false, amount: 0.5 });
  const platformsInView = useInView(platformsRef, { once: false, amount: 0.3 });

  // Platform data with URLs
  const platforms = [
    { name: "YouTube", icon: youtube, url: "https://youtube.com/@lovereignbiblechurch" },
    { name: "Podbean", icon: podbean, url: "https://lovereignbiblechurch.podbean.com/" },
    { name: "TikTok", icon: tiktok, url: "https://www.tiktok.com/@lovereignbiblechurch" },
    { name: "Instagram", icon: instagram, url: "https://www.instagram.com/lovereignbiblechurch/" },
    { name: "Twitter", icon: twitter, url: "https://x.com/lovereignchurch" },
    { name: "Facebook", icon: facebook, url: "https://facebook.com/@lovereignbiblechurch" },
  ];

  return (
      <motion.div ref={containerRef} className="relative w-full overflow-hidden z-20 bg-transparent">
        {/* Subtle texture overlay */}
        {/* Content */}
        <div className="relative z-20 container mx-auto px-6 md:px-8 lg:px-16 xl:px-24 max-w-5xl">
          <div className="flex flex-col items-center text-center">
            {/* Earth Image with Animation */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
                className="relative mb-8"
            >
              <motion.img
                  src={earth.src}
                  alt="Earth"
                  className="w-[12rem] md:w-[14rem] relative z-10"
                  animate={
                    isInView
                        ? {
                          rotate: [0, 5, 0, -5, 0],
                        }
                        : {}
                  }
                  transition={{
                    duration: 20,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "linear",
                  }}
              />

              {/* Subtle glow effect */}
              <div className="absolute inset-0 bg-teal-500/10 blur-2xl rounded-full -z-10 scale-75"></div>
            </motion.div>

            {/* Stats Section */}
            <motion.div ref={statsRef} className="text-center mb-12">
              <motion.h1
                  initial={{ opacity: 0, y: 15 }}
                  animate={statsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="text-2xl md:text-3xl font-light tracking-wide text-white mb-6"
              >
                Join our online community
              </motion.h1>

              <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mb-2"
              >
              <span className="text-6xl md:text-8xl font-bold text-white">
                {statsInView && <CountUp start={0} end={7563} duration={2} delay={0.2} />}
                <span className="text-purple-400">+</span>
              </span>
              </motion.div>

              <motion.p
                  initial={{ opacity: 0 }}
                  animate={statsInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  className="text-sm md:text-base text-slate-300 font-light"
              >
                messages and counting
              </motion.p>
            </motion.div>

            {/* Platforms */}
            <motion.div ref={platformsRef} className="w-full">
              <motion.h2
                  initial={{ opacity: 0, y: 10 }}
                  animate={platformsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="text-white text-xl md:text-2xl font-medium mb-8"
              >
                Listen on your favorite platform
              </motion.h2>

              <motion.div
                  className="flex flex-wrap justify-center gap-10 md:gap-16"
                  initial={{ opacity: 0, y: 15 }}
                  animate={platformsInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.2 }}
              >
                {platforms.map((platform, index) => (
                    <motion.a
                        key={index}
                        href={platform.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, y: 10 }}
                        animate={platformsInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                        className="flex flex-col items-center group cursor-pointer"
                        whileHover={{ scale: 1.05 }}
                    >
                      <div className="p-4 bg-opacity-50 backdrop-blur-sm mb-2 transition-all duration-300 group-hover:bg-gray-700 group-hover:shadow-lg group-hover:shadow-purple-500/20">
                        <motion.img
                            src={platform.icon.src}
                            alt={platform.name}
                            className="w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20 object-contain"
                        />
                      </div>
                      <span className="text-lg text-gray-300 group-hover:text-white transition-colors duration-200">
                    {platform.name}
                  </span>
                    </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>
  );
}

export default Podcast;

