"use client";

import Link from "next/link";
import {useEffect, useState} from "react";
import {usePathname} from "next/navigation";
import {Menu, X} from "lucide-react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Our Story", href: "/our-story" },
    { name: "Church Branches", href: "/church-branches" },
    { name: "Founder", href: "/founder" },
    { name: "Books", href: "/books" },
    { name: "Media", href: "/media" },
    { name: "Give", href: "/give" },
    { name: "Contact Us", href: "/contact-us" },
  ];

  const isActive = (path: string) => pathname === path;

  return (
      <nav
        className={`fixed top-0 left-0 w-full text-white z-50 shadow-md transition-colors duration-300 ${
          scrolled ? "bg-gray-900 bg-opacity-95" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Title */}
            <div className="flex items-center space-x-2">
              {/* Logo */}
              <img
                  src="/logos/logo.png"
                  alt="Logo"
                  className="w-8 h-8 md:w-10 md:h-10"
              />
              {/* Title - hidden on mobile */}
              <Link
                  href="/"
                  className="font-bold text-xl text-white hidden md:block"
              >
                Lovereign Bible Church
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                            isActive(link.href)
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                    >
                      {link.name}
                    </Link>
                ))}
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden p-4 flex items-center">
              <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              >
                <span className="sr-only">Open main menu</span>
                {isMenuOpen ? (
                    <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                    <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
            <div className="md:hidden bg-black">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                {navLinks.map((link) => (
                    <Link
                        key={link.name}
                        href={link.href}
                        className={`block px-3 py-2 rounded-md text-base font-medium ${
                            isActive(link.href)
                                ? "bg-gray-800 text-white"
                                : "text-gray-300 hover:bg-gray-700 hover:text-white"
                        }`}
                        onClick={() => setIsMenuOpen(false)}
                    >
                      {link.name}
                    </Link>
                ))}
              </div>
            </div>
        )}
      </nav>
  );
}
