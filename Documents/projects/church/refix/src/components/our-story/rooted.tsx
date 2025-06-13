"use client";

import React, { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { NavLink } from "react-router-dom";

const bigLogobg = "/public/assets/img/large.png";
const gradientBg = "/public/assets/img/layoutblur.svg";

const Rooted: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.3 });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect for background
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5], [0.1, 0.2]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.05]);

  // Text animations variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.8,
        ease: [0.215, 0.61, 0.355, 1],
      },
    }),
  };

  return (
    <motion.div
      ref={containerRef}
      className="relative py-12 w-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ backgroundColor: "#050505" }}
      animate={{ backgroundColor: "#050505" }}
    >
      {/* Subtle gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-purple-900/10 to-black/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1.5 }}
      />

      {/* Background elements with parallax */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${gradientBg})`,
          opacity: bgOpacity,
          scale: bgScale,
        }}
      />

      <motion.div
        className="absolute inset-0 bg-center bg-no-repeat"
        style={{
          backgroundImage: `url(${bigLogobg})`,
          backgroundSize: "18%",
          opacity: 0.08,
          scale: bgScale,
        }}
      />

      {/* Minimal horizontal lines */}
      <motion.div
        className="absolute top-20 left-[10%] right-[10%] h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 0.1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut" }}
      />

      <motion.div
        className="absolute bottom-20 left-[10%] right-[10%] h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 0.1 } : {}}
        transition={{ duration: 1.2, ease: "easeOut", delay: 0.3 }}
      />

      {/* Content with staggered animations */}
      <div className="z-10 text-center px-6 md:px-12 max-w-3xl">
        <motion.div initial="hidden" animate={isInView ? "visible" : "hidden"} className="space-y-6">
          <motion.p variants={{fadeInUp}} custom={0} className="text-white/60 text-sm tracking-wider uppercase">
            Rooted in faith since
          </motion.p>

          <motion.h1 variants={{fadeInUp}} custom={1} className="text-6xl md:text-8xl font-light tracking-tight">
            <span className="text-white font-extralight">01</span>
            <span className="text-white/80 font-thin">.</span>
            <span className="text-white font-extralight">12</span>
            <span className="text-white/80 font-thin">.</span>
            <span className="text-purple-300 font-extralight">2013</span>
          </motion.h1>

          <motion.p variants={{fadeInUp}} custom={2} className="text-white/60 text-sm tracking-wider uppercase">
            Join Us in faith
          </motion.p>

          <motion.div variants={{fadeInUp}} custom={3} className="pt-4">
            <NavLink to="/give">
              <motion.button
                className="px-8 py-2.5 border border-white/20 text-white rounded-full text-xs tracking-widest uppercase font-light hover:bg-white/5 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.98 }}
              >
                Join Us
              </motion.button>
            </NavLink>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating particles */}
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-purple-300/30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0,
          }}
          animate={{
            y: [Math.random() * window.innerHeight, Math.random() * window.innerHeight - 100],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
};

export default Rooted;

