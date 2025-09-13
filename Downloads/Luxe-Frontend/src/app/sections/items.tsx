import { useState } from "react";

export default function Ham() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const menuItems = [
    { title: "About", href: "#about" },
    { title: "Properties", href: "#properties" },
    { title: "Contact", href: "#contact" }
  ];

  return (
    <div className="relative z-50">
      {/* Menu Button */}
      <button 
        onClick={toggleMenu}
        className="flex items-center bg-white hover:bg-black hover:text-white transition-all duration-300 rounded-3xl px-5 py-2 group"
      >
        <span className="text-sm mr-5">MENU</span>
        <div className="w-8 h-8 bg-black group-hover:bg-white rounded-full flex items-center justify-center">
          <svg
            className="fill-current stroke-white group-hover:stroke-black"
            viewBox="0 0 100 100"
            width="30"
          >
            <path
              d="m 70,33 h -40 c 0,0 -8.5,-0.149796 -8.5,8.5 0,8.649796 8.5,8.5 8.5,8.5 h 20 v -20"
            />
            <path 
              d="m 70,50 h -40" 
            />
            <path
              d="m 30,67 h 40 c 0,0 8.5,0.149796 8.5,-8.5 0,-8.649796 -8.5,-8.5 -8.5,-8.5 h -20 v 20"
            />
          </svg>
        </div>
      </button>

      {/* Fullscreen Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-black bg-opacity-95 transition-all duration-500 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {/* Close Button */}
        <button 
          onClick={toggleMenu}
          className="absolute top-4 right-4 md:top-8 md:right-8 w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center hover:scale-110 transition-transform duration-300"
        >
          <svg
            viewBox="0 0 24 24"
            width="24"
            height="24"
            stroke="currentColor"
            strokeWidth="2"
            className="text-black"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {/* Menu Content */}
        <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
          {/* Logo or Brand */}
          <div className="mb-12 text-white text-2xl md:text-3xl font-bold">
            LuxeRealty
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col items-center space-y-6 md:space-y-8">
            {menuItems.map((item, index) => (
              <a
                key={index}
                href={item.href}
                onClick={toggleMenu}
                className="group relative text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light hover:text-gray-300 transition-colors duration-300"
              >
                {item.title}
                <span className="absolute -bottom-2 left-0 w-0 h-0.5 bg-white group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </nav>

          {/* Contact Info */}
          <div className="mt-12 md:mt-16 text-center">
            <p className="text-white text-sm md:text-base mb-2">Get in touch</p>
            <p className="text-white text-lg md:text-xl font-semibold">054 153 7940</p>
          </div>

          {/* Social Links */}
          <div className="mt-8 flex space-x-6">
            {['Instagram', 'Twitter', 'LinkedIn'].map((social, index) => (
              <a
                key={index}
                href="#"
                className="text-white text-sm hover:text-gray-300 transition-colors duration-300"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}