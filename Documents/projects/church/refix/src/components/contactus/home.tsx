"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { ChevronDown, Mail } from "lucide-react"

const pjwm1 = '@/../public/assets/img/backgroundImages/welcomehomeMobilebg1.jpg'
const pjwd1 = '@/../public/assets/img/blacknwhite.jpg'

const Home: React.FC = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    handleResize()

    window.addEventListener("resize", handleResize)

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const scrollToMethods = () => {
    const methodsSection = document.getElementById("contact-methods")
    if (methodsSection) {
      methodsSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="relative min-h-screen w-full text-white">
        {/* Background image with subtle zoom animation */}
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "easeOut" }}
          className="absolute inset-0 bg-cover bg-center min-h-screen"
          style={{ backgroundImage: `url(${isMobile ? pjwm1 : pjwd1})` }}
        />

        {/* Enhanced gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-teal-900/20"></div>

        {/* Hero content */}
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-lg md:text-xl uppercase tracking-[0.2em] text-teal-200 mb-2">
              We'd Love To Hear From You
            </h2>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mt-0 mb-4
                      bg-clip-text text-transparent bg-gradient-to-r from-white via-teal-100 to-indigo-200
                      drop-shadow-[0_5px_15px_rgba(93,218,165,0.3)]"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            Contact Us
          </motion.h1>

          <motion.p
            className="max-w-md md:max-w-xl mt-4 md:mt-6 text-lg md:text-xl text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Reach out to our church for prayer requests, inquiries, or to connect with our community
          </motion.p>

          <motion.div
            className="mt-8 md:mt-12 flex flex-col sm:flex-row items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <a
              href="mailto:Info@lovereignbiblechurch.org"
              className="bg-transparent border border-white/30 hover:bg-white/10 text-white px-8 py-4 rounded-full flex items-center gap-2 transition-all duration-300"
            >
              <Mail size={18} />
              Email Us
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-32 md:bottom-40 left-0 right-0 flex justify-center z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            onClick={scrollToMethods}
            className="cursor-pointer"
          >
            <ChevronDown className="h-8 w-8 text-white/70" />
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <div className="absolute top-[20%] left-[10%] w-32 h-32 bg-teal-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[30%] right-[15%] w-40 h-40 bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  )
}

export default Home;

