"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import useWindowSize from "../../hooks/useWindowSize";

// Define images outside component to prevent recreating on each render
import mobileImage1 from "@/../public/assets/img/backgroundImages/welcomehomemobilebg2.jpg";
import mobileImage2 from "@/../public/assets/img/backgroundImages/welcomehomeMobilebg1.jpg";
import desktopImage1 from "@/../public/assets/img/backgroundImages/homedesktopbg1.jpg";
import desktopImage2 from "@/../public/assets/img/backgroundImages/homedesktopbg2.png";

// Constants
const PHRASES = ["Your model church", "Your place to shine", "Keep shining"];

const TITLES = ["Welcome Home", "Lovereign Bible Church"];
const IMAGE_TRANSITION_INTERVAL = 6000;
const TITLE_TRANSITION_INTERVAL = 4000;
const PHRASE_TRANSITION_INTERVAL = 4000;

export default function Home() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const imageIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const phraseIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const titleIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const { width } = useWindowSize();

  // Determine if mobile based on screen width
  const isMobile = width <= 768;

  // Determine images based on screen width
  const images = isMobile
    ? [mobileImage1, mobileImage2]
    : [desktopImage1, desktopImage2];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [isImageTransitioning, setIsImageTransitioning] = useState(false);

  // Preload images for smoother transitions
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src.src;
    });
  }, [images]);

  // Scroll-based animations
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start", "end start"],
  });

  const titleY = useTransform(scrollYProgress, [0, 0.3], [0, -50]);
  const phraseY = useTransform(scrollYProgress, [0, 0.3], [0, -30]);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  // Image transition
  useEffect(() => {
    imageIntervalRef.current = setInterval(() => {
      setIsImageTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
        setIsImageTransitioning(false);
      }, 300); // Short delay for smoother transition
    }, IMAGE_TRANSITION_INTERVAL);

    return () => {
      if (imageIntervalRef.current) clearInterval(imageIntervalRef.current);
    };
  }, [images.length]);

  // Phrase transition
  useEffect(() => {
    phraseIntervalRef.current = setInterval(() => {
      setCurrentPhraseIndex((prev) => (prev + 1) % PHRASES.length);
    }, PHRASE_TRANSITION_INTERVAL);

    return () => {
      if (phraseIntervalRef.current) clearInterval(phraseIntervalRef.current);
    };
  }, []);

  // Title transition
  useEffect(() => {
    titleIntervalRef.current = setInterval(() => {
      setCurrentTitleIndex((prev) => (prev + 1) % TITLES.length);
    }, TITLE_TRANSITION_INTERVAL);

    return () => {
      if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
    };
  }, []);

  return (
    <motion.div
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden z-40"
      style={{ opacity }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentImageIndex}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${images[currentImageIndex]})` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Enhanced dark overlay */}
      <div className="absolute inset-0 bg-black/40 z-10" />

      {/* Enhanced gradient with stronger black at bottom */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/90 z-20"></div>

      <div
        className={`absolute z-30 flex flex-col  ${
          isMobile
            ? "items-end justify-end bottom-64 right-6 text-right "
            : "items-start justify-center h-full left-12 md:left-16 lg:left-24 text-left"
        }`}
      >
        {/* Title with improved animations */}
        <motion.div style={{ y: titleY }} className={`${isMobile ? "" : ""}`}>
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentTitleIndex}
              className={`${
                isMobile ? "text-4xl" : "text-5xl md:text-7xl lg:text-8xl"
              } font-Geist tracking-tight overflow-hidden text-white`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              {TITLES[currentTitleIndex].split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.1 + index * 0.05,
                    ease: [0.215, 0.61, 0.355, 1] as [number, number, number, number],
                  }}
                  className={`inline-block ${isMobile ? "ml-4" : "mr-4"}`}
                >
                  {word === "Bible" || word === "Home" ? (
                    <span className="italic font-semibold">{word}</span>
                  ) : (
                    word
                  )}
                </motion.span>
              ))}
            </motion.h1>
          </AnimatePresence>
        </motion.div>

        {/* Phrases with improved animations */}
        <motion.div
          style={{ y: phraseY }}
          className={`h-12 md:h-16 flex ${
            isMobile ? "items-end justify-end" : "items-start justify-start"
          } overflow-hidden max-w-md`}
        >
          <AnimatePresence mode="wait">
            <motion.p
              key={currentPhraseIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{
                duration: 0.8,
                ease: "easeOut",
              }}
              className={`text-white/90 ${
                isMobile ? "text-base" : "text-lg md:text-2xl lg:text-3xl"
              } font-Geist font-light`}
            >
              {PHRASES[currentPhraseIndex]}
            </motion.p>
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.div>
  );
}
