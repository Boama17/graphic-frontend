"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import sub from "@/../public/assets/img/backgroundImages/subscribe.jpg";
import { ArrowRight, Bell } from "lucide-react";

export default function Subscribe() {
  const navigate = useNavigate();
  const [showText, setShowText] = useState(false);

  // Toggle text visibility every 4 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handleSubscribeClick = () => {
    navigate("/media");
  };

  return (
    <div
      className="relative transform z-30"
      style={{
        backgroundImage: "url('@/../public/assets/img/backgroundImages/Divider.png')",
        backgroundSize: "cover",
        backgroundPosition: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-[85vw] md:w-[75vw] lg:w-[65vw] xl:w-[60vw] mx-auto relative overflow-hidden rounded-xl shadow-xl"
        style={{
          minHeight: "240px",
          height: "auto",
        }}
      >
        {/* Dark gradient background - modified to be more transparent */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/90 via-gray-900/90 to-zinc-900/90 ">
          {/* Subtle animated overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-emerald-900/10 to-teal-900/10"
            animate={{
              opacity: [0.2, 0.3, 0.2],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
          />

          {/* Subtle grain texture */}
          <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
        </div>

        <div className="flex flex-col md:flex-row items-center relative z-10">
          {/* Left content */}
          <div className="w-full md:w-1/2 p-6 md:p-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <h1 className="text-white text-xl sm:text-2xl lg:text-3xl font-light tracking-tight">
                This is <span className="font-normal italic">Church</span>, This
                is <span className="font-normal italic">Home</span>!
              </h1>

              <motion.div
                className="w-10 h-0.5 bg-teal-500/50 mt-3 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: 40 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              />

              <p className="text-sm md:text-base leading-relaxed text-white/80 font-light max-w-sm">
                From anywhere in the world, you can join our online service
                experience and be part of our growing community.
              </p>
            </motion.div>
          </div>

          {/* Right content with image - improved height handling */}
          <div className="w-full md:w-1/2 relative">
            <motion.div
              className="relative"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="w-full h-[200px] md:h-[240px] lg:h-[280px] xl:h-[320px] overflow-hidden">
                <img
                  src={sub.src}
                  alt="Subscribe"
                  className="w-full h-full object-cover object-center"
                  style={{ objectPosition: "center 30%" }} // Adjust vertical position to prevent top cropping
                />
              </div>

              {/* Gradient overlay on image */}
              <div className="absolute inset-0 bg-gradient-to-r from-slate-900/70 via-transparent to-transparent"></div>
            </motion.div>
          </div>

          {/* Animated button - positioned absolutely */}
          <motion.button
            onClick={handleSubscribeClick}
            className="absolute bottom-4 right-4 flex items-center bg-teal-600 hover:bg-teal-500 text-xs rounded-full text-white font-medium py-2 transition-all duration-300 overflow-hidden shadow-lg shadow-teal-900/20"
            style={{
              paddingLeft: showText ? "0.875rem" : "0.75rem",
              paddingRight: showText ? "0.875rem" : "0.75rem",
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.6 }}
          >
            <motion.div
              animate={{
                rotate: showText ? [0, 10, 0] : 0,
                scale: showText ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 0.4 }}
            >
              <Bell size={14} className="text-white" />
            </motion.div>

            <AnimatePresence>
              {showText && (
                <motion.span
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: "auto", opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  className="ml-1.5 whitespace-nowrap overflow-hidden"
                >
                  SUBSCRIBE
                  <motion.span
                    className="inline-block ml-1"
                    animate={{ x: [0, 2, 0] }}
                    transition={{ duration: 0.8, repeat: 1 }}
                  >
                    <ArrowRight size={10} className="text-white inline" />
                  </motion.span>
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
