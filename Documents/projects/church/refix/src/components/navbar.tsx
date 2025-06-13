"use client";

import React, { useState, useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Heart, ChevronRight } from "lucide-react";

import logo from "@/../public/assets/img/logo.png";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navRef = useRef<HTMLElement | null>(null);

  const navItems = [
    "Home",
    "Our Story",
    "Church Branches",
    "Founder",
    "Books",
    "Media",
    "Give",
    "Contact Us",
  ];

  const formatLink = (item: string) => `/${item.toLowerCase().replace(/\s+/g, "-")}`;

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Prevent body scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Animation variants for the church name text
  const textVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "loop",
        repeatDelay: 5,
      },
    },
  };

  const letterVariants = {
    initial: { opacity: 0.7, y: 0 },
    animate: {
      opacity: [0.7, 1, 0.7],
      y: [0, -3, 0],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Number.POSITIVE_INFINITY,
        repeatType: "reverse",
        repeatDelay: 1,
      },
    },
  };

  // Split text for letter animation
  const churchNameFirst = "Lovereign";
  const churchNameSecond = "Bible Church";

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled && !isOpen
          ? "bg-black/10 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      {/* Desktop & Mobile Top Navigation */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-16 flex items-center justify-between py-4">
        {/* Logo */}
        <motion.div
          className="flex items-center gap-3"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <NavLink to="/" className="flex items-center gap-2">
            <img
              src={logo.src}
              className="w-8 h-8 md:w-10 md:h-10"
              alt="Logo"
            />
            <motion.span
              className="text-lg font-light tracking-wide hidden sm:flex text-white overflow-hidden"
              variants={{textVariants}}
              initial="initial"
              animate="animate"
            >
              <motion.span className="font-medium flex">
                {churchNameFirst.split("").map((letter, index) => (
                  <motion.span
                    key={`first-${index}`}
                    variants={{letterVariants}}
                    initial="initial"
                    animate="animate"
                    custom={index}
                    style={{
                      animationDelay: `${index * 0.08}s`,
                      display: "inline-block",
                    }}
                  >
                    {letter}
                  </motion.span>
                ))}
              </motion.span>
              <motion.span className="ml-1.5 flex">
                {churchNameSecond.split("").map((letter, index) => (
                  <motion.span
                    key={`second-${index}`}
                    variants={{letterVariants}}
                    initial="initial"
                    animate="animate"
                    custom={index + churchNameFirst.length}
                    style={{
                      animationDelay: `${(index + churchNameFirst.length) * 0.08}s`,
                      display: "inline-block",
                    }}
                  >
                    {letter === " " ? "\u00A0" : letter}
                  </motion.span>
                ))}
              </motion.span>
            </motion.span>
          </NavLink>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {navItems.map((item, index) => (
              <motion.li key={index} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <NavLink
                  to={formatLink(item)}
                  className={({ isActive }) =>
                    `relative text-sm font-light tracking-wide transition-colors ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {item.toUpperCase()}
                      {isActive && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-purple-400"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Desktop Give Button - Changed to NavLink */}
        <div className="hidden lg:flex items-center">
          <NavLink to="/give">
            <motion.div
              whileHover={{ scale: 1.05, backgroundColor: "#8A75FF" }}
              whileTap={{ scale: 0.95 }}
              className="bg-purple-500 text-white px-5 py-2 rounded-full text-sm font-light tracking-wider flex items-center gap-2 shadow-md cursor-pointer"
            >
              <Heart size={16} className="text-white" />
              GIVE
            </motion.div>
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="lg:hidden text-white p-1 rounded-full"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Menu size={24} />
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{
              type: "spring",
              damping: 20,
              stiffness: 100,
              duration: 0.5,
            }}
            className="fixed inset-0 bg-gradient-to-b from-black to-black z-[100] overflow-y-auto backdrop-blur-lg"
          >
            <div className="flex justify-between items-center px-6 py-6 border-b border-gray-800/30">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <img
                  src={logo.src}
                  className="w-8 h-8"
                  alt="Logo"
                />
                <motion.span
                  className="text-lg font-light text-white"
                  initial={{ opacity: 0.7 }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    y: [0, -2, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    repeatDelay: 1,
                  }}
                >
                  <motion.span className="font-medium">
                    {["L", "B", "C"].map((letter, index) => (
                      <motion.span
                        key={`mobile-${index}`}
                        initial={{ opacity: 0.7 }}
                        animate={{
                          opacity: [0.7, 1, 0.7],
                          y: [0, -2, 0],
                        }}
                        transition={{
                          duration: 1.5,
                          ease: "easeInOut",
                          repeat: Number.POSITIVE_INFINITY,
                          repeatType: "reverse",
                          repeatDelay: 1,
                          delay: index * 0.08,
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {letter}
                      </motion.span>
                    ))}
                  </motion.span>
                </motion.span>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="text-white p-1 rounded-full"
              >
                <X size={24} />
              </motion.button>
            </div>

            {/* Links */}
            <div className="flex flex-col items-center justify-center gap-4 mt-8 w-full px-6">
              {navItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="w-full"
                >
                  <NavLink
                    to={formatLink(item)}
                    className={({ isActive }) =>
                      `flex items-center justify-between py-4 px-4 rounded-lg w-full transition-all ${
                        isActive
                          ? "bg-purple-500/20 text-white font-medium"
                          : "text-gray-300 hover:bg-white/5"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <span>{item}</span>
                        {isActive ? (
                          <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                        ) : (
                          <ChevronRight size={16} className="text-gray-500" />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
