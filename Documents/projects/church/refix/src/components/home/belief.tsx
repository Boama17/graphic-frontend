"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize";

import desktopImage1 from "@/../public/assets/img/backgroundImages/belief.png";
import mobileImage1 from "@/../public/assets/img/backgroundImages/beliefinthebilemobile.jpg";

export default function Belief() {
  const { width } = useWindowSize();
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: false, amount: 0.2 });

  const backgroundImage = width <= 768 ? mobileImage1 : desktopImage1;

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.7, 1, 1, 0.7],
  );
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -30]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [0, -15]);

  // Text animation variants
  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        delay: 0.5,
        ease: "easeOut",
      },
    },
  };

  // Split the title for letter animation
  const titleText = "We Believe In The Bible";
  const titleWords = titleText.split(" ");

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden z-20 -mt-16"
      style={{ opacity }}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: "center bottom",
        }}
      />

      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/40 to-black/80 z-10"></div>

      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPgo8cmVjdCB3aWR0aD0iNSIgaGVpZ2h0PSI1IiBmaWxsPSIjMDAwIj48L3JlY3Q+CjxwYXRoIGQ9Ik0wIDVMNSAwWk02IDRMNCA2Wk0tMSAxTDEgLTFaIiBzdHJva2U9IiMyMjIiIHN0cm9rZS13aWR0aD0iMSI+PC9wYXRoPgo8L3N2Zz4=')] opacity-5 z-10"></div>

      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-6 max-w-4xl mx-auto pt-12">
        <motion.div
          className="w-16 h-px bg-white/30 mb-8"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 0.7 } : {}}
          transition={{ duration: 1, ease: "easeOut" }}
        />

        <motion.div style={{ y: titleY }}>
          <h1 className="text-4xl md:text-6xl font-light tracking-wide text-white">
            {titleWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.8,
                  delay: 0.3 + index * 0.1,
                  ease: [0.215, 0.61, 0.355, 1],
                }}
                className="inline-block mr-3 md:mr-4"
              >
                {index === 3 ? (
                  <span className="text-purple-200 italic font-extralight">
                    {word}
                  </span>
                ) : (
                  <span className="font-extralight">{word}</span>
                )}
              </motion.span>
            ))}
          </h1>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 0.8, scale: 1 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
          className="my-6 text-purple-200 text-2xl"
        >
          ✦
        </motion.div>

        <motion.div
          style={{ y: textY }}
          variants={{textVariants}}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-2xl"
        >
          <p className="text-sm md:text-base leading-relaxed text-white/80 font-light">
            The Church is characterized by amazing testimonies of supernatural
            experiences. We are passionate about church planting, working for
            the Lord and serving in His House.
          </p>
        </motion.div>
      </div>

      {/* Floating elements for visual interest */}
      {[...Array(4)].map((_, index) => (
        <motion.div
          key={index}
          className="absolute w-1 h-1 rounded-full bg-white/30"
          initial={{
            x:
              Math.random() *
              (typeof window !== "undefined" ? window.innerWidth : 1000),
            y:
              Math.random() *
              (typeof window !== "undefined" ? window.innerHeight : 800),
            opacity: 0,
          }}
          animate={{
            y: [
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800),
              Math.random() *
                (typeof window !== "undefined" ? window.innerHeight : 800) -
                100,
            ],
            opacity: [0, 0.4, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 8 + Math.random() * 10,
            repeat: Number.POSITIVE_INFINITY,
            delay: index * 2,
            ease: "easeInOut",
          }}
        />
      ))}
    </motion.div>
  );
}
