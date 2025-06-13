"use client"

import { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Quote } from "lucide-react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "swiper/css/effect-fade"

// Fixed image paths - they had incomplete extensions
const pjwd1 = "@/../public/assets/img/backgroundImages/ourstorydesktop1.jpg"
const pjwd2 = "@/../public/assets/img/backgroundImages/thefounderdesktop1.jpg"
const pjwm1 = "@/../public/assets/img/backgroundImages/foundermobile1.jpg"
const pjwm2 = "@/../public/assets/img/backgroundImages/foundermobile2.jpg"
const pjwm3 = "@/../public/assets/img/backgroundImages/foundermobile3.jpg"

const desktopImages = [pjwd1, pjwd2]
const mobileImages = [pjwm1, pjwm2, pjwm3]

const founderQuotes: string[] = [
  "Faith is taking the first step even when you don't see the whole staircase.",
  "The true measure of our faith is how we live in service to others.",
  "Through prayer, we find the strength to overcome any challenge.",
  "Our mission is to spread love and hope to all corners of the world.",
]

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)

  const contentRef = useRef<HTMLDivElement | null>(null)
  const isInView = useInView(contentRef, { once: false })

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % founderQuotes.length)
    }, 5000)

    return () => clearInterval(timer)
  }, [])

  // Animation variants
  const titleVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.42, 0, 0.58, 1], // This is correct (cubic bezier)
      },
    },
  }

  const subtitleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        delay: 0.3,
        ease: "easeInOut",
      },
    },
  }

  return (
      <div className="relative min-h-screen w-full text-white overflow-hidden">
        {/* Static Background Image based on screen size */}
        <div
            className="absolute inset-0 bg-cover bg-center min-h-screen"
            style={{ backgroundImage: `url(${isMobile ? pjwm2 : pjwd2})` }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent"></div>

        {/* Content */}
        <div
            ref={contentRef}
            className={`absolute inset-0 z-20 flex flex-col ${
                isMobile ? "items-end justify-end pb-16 pr-6" : "items-start justify-center"
            } text-left px-4 md:px-8`}
        >
          <motion.div
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{titleVariants}}
              className={`relative ${isMobile ? "mr-4" : "ml-4 md:ml-8"}`}
          >
            <motion.div
                className="absolute -inset-x-6 -inset-y-3 rounded-lg bg-gradient-to-r from-purple-600/20 via-blue-500/20 to-purple-600/20 opacity-60 blur-xl"
                animate={{
                  opacity: [0.4, 0.6, 0.4],
                  scale: [0.98, 1.01, 0.98],
                }}
                transition={{
                  duration: 5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "mirror",
                }}
            />
            <h1
                className={`${isMobile ? "text-4xl" : "text-5xl md:text-7xl lg:text-8xl"} font-Geist tracking-tight overflow-hidden text-white`}
            >
              {"Rev John Winfred".split(" ").map((word, index) => (
                  <motion.span
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        delay: 0.1 + index * 0.05,
                        ease: [0.215, 0.61, 0.355, 1],
                      }}
                      className="inline-block mr-4"
                  >
                    {word === "Wnfred" ? <span className="italic">{word}</span> : word}
                  </motion.span>
              ))}
            </h1>
          </motion.div>

          <motion.h2
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              variants={{subtitleVariants}}
              className={`mt-4 ${
                  isMobile ? "mr-4 text-lg" : "ml-4 md:ml-8 text-xl md:text-2xl lg:text-3xl"
              } text-blue-100/90 max-w-3xl font-light tracking-wider
          drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]`}
          >
            Visionary Leader & Spiritual Guide
          </motion.h2>

          <motion.div
              className={`w-16 h-px bg-purple-300/70 my-6 ${isMobile ? "mr-4 self-end" : "ml-4 md:ml-8"}`}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.7 }}
              transition={{ duration: 1, delay: 1.5 }}
          />

          <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className={`mt-6 ${isMobile ? "max-w-xs mr-4" : "mt-8 md:mt-12 max-w-2xl ml-4 md:ml-8"}`}
          >
            <div
                className="relative px-8 py-6 bg-black/20 backdrop-blur-sm rounded-xl border border-white/10
            shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <Quote className="absolute top-2 left-2 text-white/20 w-8 h-8" />
              <Quote className="absolute bottom-2 right-2 text-white/20 w-8 h-8 rotate-180" />
              <div className="space-y-2">
                <p
                    className={`${
                        isMobile ? "text-base" : "text-lg md:text-xl lg:text-2xl"
                    } italic text-white/90 font-light drop-shadow-[0_1px_1px_rgba(0,0,0,0.5)]`}
                >
                  {founderQuotes[activeIndex]}
                </p>
                <p className="text-sm md:text-base text-white/70 font-medium mt-2">— Rev John Wnfred</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
  )
}

export default Home
