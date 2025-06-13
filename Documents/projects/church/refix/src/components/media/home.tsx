"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, ChevronDown } from "lucide-react";

import pjwd1 from "@/../public/assets/img/backgroundImages/mediadesktop1.jpg";
import pjwm1 from "@/../public/assets/img/workerMobile2.jpg";

// Custom button component to replace the shadcn import
type ButtonProps = {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline";
};
const Button = ({ children, className, variant = "default" }: ButtonProps) => {
  const baseStyles =
    "px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2";

  const variantStyles = {
    default: "bg-indigo-600 hover:bg-indigo-700 text-white",
    outline: "bg-transparent border border-white/30 hover:bg-white/10 text-white",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${className || ""}`}>
      {children}
    </button>
  );
};

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(contentRef, { once: false });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Animation for letters in "MEDIA"
  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      },
    }),
  };

  // Text content
  const mediaText = "MEDIA";

  return (
    <div className="relative min-h-screen w-full text-white overflow-hidden">
      {/* Background image with subtle zoom animation */}
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0 bg-cover bg-center min-h-screen"
        style={{ backgroundImage: `url(${isMobile ? pjwm1 : pjwd1})` }}
      />

      {/* Enhanced gradient overlay with multiple layers for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/20 to-blue-900/20"></div>

      {/* Additional text shadow layer - reduced opacity */}
      <div className="absolute inset-0 backdrop-blur-[1px] opacity-20"></div>

      {/* Main content with animations */}
      <div
        ref={contentRef}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4"
      >
        {/* Refined subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h2 className="font-serif text-lg md:text-xl uppercase tracking-[0.4em] font-extralight">
            <span className="inline-block relative">
              {/* Subtle outline effect */}
              <span className="absolute inset-0 blur-[1px] text-white/5">
                Spreading the Word
              </span>

              {/* Main text with gradient */}
              <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-blue-200/90 via-blue-100/80 to-indigo-200/90
                              drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                Spreading the Word
              </span>
            </span>
          </h2>
        </motion.div>

        {/* Animated MEDIA text with letter-by-letter animation */}
        <div className="relative mt-4 overflow-hidden">
          {/* Glow effect behind text */}
          <motion.div
            className="absolute -inset-x-20 -inset-y-10 bg-gradient-to-r from-indigo-600/20 via-blue-500/20 to-indigo-600/20 rounded-full blur-3xl"
            animate={{
              opacity: [0.4, 0.7, 0.4],
              scale: [0.95, 1.05, 0.95],
            }}
            transition={{
              duration: 8,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
            }}
          />

          {/* Main MEDIA text */}
          <div className="relative flex justify-center overflow-hidden">
            {mediaText.split("").map((letter, i) => (
              <motion.span
                key={`letter-${i}`}
                custom={i}
                variants={letterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                className="font-serif font-light inline-block text-[3rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7rem] leading-none"
              >
                {/* Glow effect for each letter */}
                <span className="relative inline-block">
                  {/* Subtle outline/shadow */}
                  <span className="absolute inset-0 blur-[3px] text-indigo-400/20">
                    {letter}
                  </span>

                  {/* Main letter with gradient */}
                  <span className="relative bg-clip-text text-transparent bg-gradient-to-b from-white/90 via-blue-100/80 to-indigo-200/90
                                  drop-shadow-[0_2px_10px_rgba(93,148,218,0.4)]">
                    {letter}
                  </span>

                  {/* Animated highlight effect */}
                  <motion.span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0"
                    animate={{
                      opacity: [0, 0.8, 0],
                      x: ["-100%", "100%", "100%"],
                    }}
                    transition={{
                      duration: 3,
                      delay: 1.5 + i * 0.2,
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 5,
                    }}
                  />
                </span>
              </motion.span>
            ))}
          </div>

          {/* Floating particles around the text */}
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute rounded-full bg-blue-400/30"
              style={{
                width: Math.random() * 4 + 2,
                height: Math.random() * 4 + 2,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -20, 0],
                x: [0, Math.random() * 10 - 5, 0],
                opacity: [0, 0.7, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Refined description text */}
        <motion.div
          className="max-w-md md:max-w-xl mt-8 md:mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <p className="font-serif text-lg md:text-xl font-extralight tracking-wide text-transparent bg-clip-text bg-gradient-to-b from-gray-200/95 to-gray-300/75 drop-shadow-[0_1px_1px_rgba(0,0,0,0.4)]">
            Sharing God's message through inspiring content and spiritual connections
          </p>
        </motion.div>
      </div>

      {/* Scroll indicator with refined animation */}
      <motion.div
        className="absolute bottom-8 left-0 right-0 flex flex-col items-center justify-center z-20 gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.span className="text-xs tracking-widest uppercase text-blue-200/70 font-light">
          Scroll Down
        </motion.span>
        <motion.div
          animate={{
            y: [0, 10, 0],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            repeat: Number.POSITIVE_INFINITY,
            duration: 2,
          }}
        >
          <ChevronDown className="h-6 w-6 text-blue-200/70" />
        </motion.div>
      </motion.div>

      {/* Enhanced decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none">
        <motion.div
          className="absolute top-[20%] left-[10%] w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
        <motion.div
          className="absolute bottom-[30%] right-[15%] w-40 h-40 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        />
      </div>
    </div>
  );
}
