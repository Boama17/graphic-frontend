import {
  Facebook,
  Instagram,
  Mail,
  MapPin,
  Phone,
  Twitter,
  Youtube,
} from "lucide-react";
import { Link } from "react-router-dom";
import React, { FormEvent } from "react";

import logo from "@/../public/assets/img/logo.png";

export default function Footer() {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    alert(`Thank you ${name} for subscribing to our newsletter!`);
  };

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 py-6">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Contact Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-blue-500/10 rounded-full p-1 flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                <img
                  src={logo.src}
                  alt="Lovereign Bible Church"
                  className="w-6 h-6 object-contain"
                />
              </div>
              <span className="text-white font-semibold text-sm tracking-wide group-hover:text-blue-400 transition-colors">
                LOVEREIGN BIBLE CHURCH
              </span>
            </Link>

            <div className="space-y-3 text-slate-300 text-sm pl-1">
              <a href="tel:0242371411">
                <p className="flex items-center gap-2 hover:text-blue-400 transition-colors">
                  <Phone size={16} className="text-blue-500" />
                  <span>+233 24 237 1411</span>
                </p>
              </a>

              <a
                href="mailto:info@Lovereign.org"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <Mail size={16} className="text-blue-500" />
                <span>info@lovereignbiblechurch.org</span>
              </a>
              <Link
                to="/contact-us"
                className="flex items-center gap-2 hover:text-blue-400 transition-colors"
              >
                <MapPin size={16} className="text-blue-500" />
                <span>Christian Village, Achimota</span>
              </Link>
            </div>

            <div className="flex gap-4 pt-2">
              <a
                href="https://www.facebook.com/lovereignbiblechurch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-500 transition-colors bg-slate-800/50 p-2 rounded-full hover:bg-slate-800"
              >
                <Facebook size={16} />
              </a>
              <a
                href="https://twitter.com/lovereignbible"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-blue-400 transition-colors bg-slate-800/50 p-2 rounded-full hover:bg-slate-800"
              >
                <Twitter size={16} />
              </a>
              <a
                href="https://www.instagram.com/lovereignbiblechurch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-pink-400 transition-colors bg-slate-800/50 p-2 rounded-full hover:bg-slate-800"
              >
                <Instagram size={16} />
              </a>
              <a
                href="https://www.youtube.com/@lovereignbiblechurch"
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate-400 hover:text-red-500 transition-colors bg-slate-800/50 p-2 rounded-full hover:bg-slate-800"
              >
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Menu and Useful Links */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm tracking-wider border-b border-blue-500/30 pb-2 inline-block">
                MENU
              </h3>
              <ul className="space-y-2 list-none">
                <li className="group hover:list-disc">
                  <Link
                    to="/"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    Home
                  </Link>
                </li>
                <li className="group hover:list-disc">
                  <Link
                    to="/media"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    News
                  </Link>
                </li>
                <li className="group hover:list-disc">
                  <Link
                    to="/our-story"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    Who we are
                  </Link>
                </li>
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-white font-semibold text-sm tracking-wider border-b border-blue-500/30 pb-2 inline-block">
                USEFUL
              </h3>
              <ul className="space-y-2 list-none">
                <li className="group hover:list-disc">
                  <Link
                    to="/founder"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    Rev John Winfred
                  </Link>
                </li>
                <li className="group hover:list-disc">
                  <Link
                    to="/contact-us"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    Visit Us
                  </Link>
                </li>
                <li className="group hover:list-disc">
                  <Link
                    to="/media"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    Sermons
                  </Link>
                </li>
                <li className="group hover:list-disc">
                  <Link
                    to="/media"
                    className="text-slate-300 hover:text-white transition-colors flex items-center gap-1.5 group"
                  >
                    <span className=" group-hover:bg-blue-500 transition-colors"></span>
                    Media
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter Sign-Up */}
          <div className="space-y-4">
            <h3 className="text-white font-semibold text-sm tracking-wider border-b border-blue-500/30 pb-2 inline-block">
              NEWSLETTER
            </h3>
            <p className="text-slate-300 text-sm">
              Stay updated with our latest sermons and events
            </p>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  placeholder="Your email address"
                  className="w-full px-4 py-2.5 bg-slate-800/80 border border-slate-700 rounded-lg text-sm text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-500 hover:from-purple-500 hover:to-purple-400 text-white py-2.5 px-4 text-sm rounded-lg transition-all duration-300 font-medium shadow-md shadow-blue-900/20 hover:shadow-blue-900/30"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-700/50 to-transparent my-6"></div>

        <div className="text-center text-slate-400 text-sm">
          <p>
            Lovereign Bible Church - © {new Date().getFullYear()} All rights
            reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
