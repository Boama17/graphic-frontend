"use client";
import React from "react";
import { Award, Network, HeartHandshake } from "lucide-react";
import Flora from "@/components/ui/flora";
import { motion } from "framer-motion";

export default function About() {
  const cardVariants = {
    offscreen: {
      y: 50,
      opacity: 0
    },
    onscreen: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        bounce: 0.4,
        duration: 0.8
      }
    }
  };

  return (
    <section className="bg-white py-28 font-sans overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header Section */}
        <header className="flex flex-col lg:flex-row items-start justify-between gap-12 mb-24">
          <div className="flex items-center gap-8">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 10 }}
            >
              <Flora />
            </motion.div>
            <span className="font-[Poppins-regular] text-sm tracking-wider text-gray-500 bg-gray-100 px-4 py-2 rounded-full">
              About Our Company
            </span>
          </div>
          
          <motion.div 
            className="lg:max-w-2xl"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="font-[Poppins-Regular] text-lg leading-relaxed text-gray-700 bg-gradient-to-r from-white to-gray-50 p-8 rounded-3xl shadow-sm border border-gray-100">
              We believe that finding the perfect home or office space should be an 
              enjoyable and stress-free experience. Our team of dedicated professionals 
              brings a wealth of knowledge and experience to the table. With a deep 
              understanding of the local market and a commitment to personalized service, 
              we strive to make every transaction seamless and satisfying.
            </p>
          </motion.div>
        </header>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
          {/* Decorative elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-green-100/30 blur-3xl -z-10"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 rounded-full bg-purple-100/30 blur-3xl -z-10"></div>
          
          <motion.article 
            className="group relative bg-white p-10 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 overflow-hidden"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-green-500 group-hover:h-full transition-all duration-500 ease-out -z-10"></div>
            
            <div className="mb-8 flex justify-center">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
                <Award 
                  size={64} 
                  className="text-green-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" 
                />
              </div>
            </div>
            <h3 className="text-2xl font-[Poppins-SemiBold] text-gray-800 mb-4 group-hover:text-green-700 transition-colors duration-300">
              Experienced
            </h3>
            <p className="text-base leading-relaxed text-gray-600 font-[Poppins-Regular] group-hover:text-gray-700 transition-colors duration-300">
              With over 10 years of experience in the real estate industry, we know 
              what it takes to find the perfect home for you.
            </p>
          </motion.article>

          <motion.article 
            className="group relative bg-white p-10 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 overflow-hidden"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <div className="absolute top-0 right-0 w-1 h-full bg-purple-500 group-hover:w-full transition-all duration-500 ease-out -z-10"></div>
            
            <div className="mb-8 flex justify-center">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
                <Network 
                  size={64} 
                  className="text-purple-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" 
                />
              </div>
            </div>
            <h3 className="text-2xl font-[Poppins-SemiBold] text-gray-800 mb-4 group-hover:text-purple-700 transition-colors duration-300">
              Extensive Network
            </h3>
            <p className="text-base leading-relaxed text-gray-600 font-[Poppins-Regular] group-hover:text-gray-700 transition-colors duration-300">
              We have a wide network that includes the best properties across the 
              city and surrounding areas.
            </p>
          </motion.article>

          <motion.article 
            className="group relative bg-white p-10 rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 border border-gray-100 overflow-hidden md:col-span-2 lg:col-span-1"
            variants={cardVariants}
            initial="offscreen"
            whileInView="onscreen"
            viewport={{ once: true, margin: "-100px" }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-amber-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
            <div className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 group-hover:h-full transition-all duration-500 ease-out -z-10"></div>
            
            <div className="mb-8 flex justify-center">
              <div className="p-6 bg-white rounded-2xl shadow-sm border border-gray-100 group-hover:shadow-md transition-shadow duration-300">
                <HeartHandshake 
                  size={64} 
                  className="text-amber-600 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110" 
                />
              </div>
            </div>
            <h3 className="text-2xl font-[Poppins-SemiBold] text-gray-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
              Top-Notch Service
            </h3>
            <p className="text-base leading-relaxed text-gray-600 font-[Poppins-Regular] group-hover:text-gray-700 transition-colors duration-300">
              Our team is available 24/7 to assist you with friendly and 
              professional service.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}
