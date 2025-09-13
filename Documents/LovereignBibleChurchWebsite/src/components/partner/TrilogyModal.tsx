"use client"

import {useEffect, useRef} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {BookOpen, ChevronLeft, ChevronRight, Star, X} from "lucide-react"

interface Flyer {
  img: string
  alt: string
}

interface TrilogyModalProps {
  isOpen: boolean
  onClose: () => void
  flyers: Flyer[]
  current: number
  setCurrent: (idx: number) => void
}

export default function TrilogyModal({
  isOpen,
  onClose,
  flyers,
  current,
  setCurrent,
}: TrilogyModalProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (!isOpen) return
    intervalRef.current = setInterval(() => {
      setCurrent((current + 1) % flyers.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [isOpen, current, flyers.length, setCurrent])

  const next = () => setCurrent((current + 1) % flyers.length)
  const prev = () => setCurrent((current - 1 + flyers.length) % flyers.length)

  const bgImg = flyers[current]?.img

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(75, 0, 130, 0.4) 0%, rgba(25, 25, 112, 0.6) 40%, rgba(0, 0, 0, 0.8) 100%)'
        }}
        onClick={onClose}
      >
        <motion.div
          className="relative max-w-2xl w-full overflow-hidden"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 50 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          onClick={e => e.stopPropagation()}
          style={{
            background: 'linear-gradient(135deg, #1a0b2e 0%, #2d1b3d 25%, #4a2c5a 50%, #2d1b3d 75%, #1a0b2e 100%)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.1), inset 0 1px 0 rgba(255, 215, 0, 0.1)'
          }}
        >
          {/* Decorative border */}
          <div className="absolute inset-0 rounded-2xl border-2 border-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 opacity-30"></div>
          
          {/* Golden accent lines */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 sm:w-32 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent opacity-60"></div>

          <div className="relative rounded-2xl p-4 sm:p-6 lg:p-8">
            <button
              className="absolute top-2 right-2 sm:top-4 sm:right-4 p-2 rounded-full transition-all duration-300 hover:scale-110 z-10"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.2) 0%, rgba(255, 193, 7, 0.3) 100%)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 215, 0, 0.3)'
              }}
              onClick={onClose}
              aria-label="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-200 hover:text-yellow-100" />
            </button>

            {/* Header with decorative elements */}
            <div className="text-center mb-4 sm:mb-6 relative">
              <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
                <div className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
                <BookOpen className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-400" />
                <div className="w-4 sm:w-6 h-px bg-gradient-to-r from-transparent via-yellow-400 to-transparent"></div>
              </div>
              
              <motion.h2 
                className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-1 relative inline-block"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                style={{
                  background: 'linear-gradient(110deg, #ffd700 45%, #fff 50%, #ffd700 55%)',
                  backgroundSize: '200% 100%',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  animation: 'shimmer 2s ease-in-out infinite alternate',
                  textShadow: '0 0 20px rgba(255, 215, 0, 0.3)'
                }}
              >
                The Trilogy
                <style jsx>{`
                  @keyframes shimmer {
                    0% {
                      background-position: -200% 0;
                    }
                    100% {
                      background-position: 200% 0;
                    }
                  }
                `}</style>
              </motion.h2>
              
              <motion.p 
                className="text-purple-200 text-sm sm:text-base font-light tracking-wide px-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                A Literary Journey Through Excellence
              </motion.p>
              
              {/* Decorative stars */}
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400 fill-current opacity-70" />
                ))}
              </div>
            </div>

            {/* Main content area - Mobile stack, Desktop horizontal */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Mobile: Navigation buttons on top */}
              <div className="flex sm:hidden items-center justify-center gap-4 order-2">
                <motion.button
                  className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.25) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.1)'
                  }}
                  onClick={e => {
                    e.stopPropagation()
                    prev()
                  }}
                  whileHover={{ boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)' }}
                  aria-label="Previous book"
                >
                  <ChevronLeft className="w-5 h-5 text-yellow-200" />
                </motion.button>

                <motion.button
                  className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 active:scale-95"
                  style={{
                    background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.25) 100%)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.1)'
                  }}
                  onClick={e => {
                    e.stopPropagation()
                    next()
                  }}
                  whileHover={{ boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)' }}
                  aria-label="Next book"
                >
                  <ChevronRight className="w-5 h-5 text-yellow-200" />
                </motion.button>
              </div>

              {/* Desktop: Left navigation button */}
              <motion.button
                className="hidden sm:block p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.25) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.1)'
                }}
                onClick={e => {
                  e.stopPropagation()
                  prev()
                }}
                whileHover={{ boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)' }}
                aria-label="Previous book"
              >
                <ChevronLeft className="w-6 h-6 text-yellow-200" />
              </motion.button>

              {/* Book image - responsive sizing */}
              <div className="relative flex-1 max-w-xs sm:max-w-md order-1 sm:order-none">
                {/* Book spotlight effect */}
                <div className="absolute inset-0 rounded-xl bg-gradient-to-t from-yellow-400/10 via-transparent to-purple-400/10 blur-xl scale-110"></div>
                
                <motion.div
                  className="relative rounded-xl overflow-hidden mx-auto"
                  style={{
                    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 215, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", damping: 20 }}
                >
                  <motion.img
                    key={current}
                    src={bgImg || '/api/placeholder/280/400'}
                    alt={flyers[current]?.alt || `Book ${current + 1}`}
                    className="w-full h-80 sm:h-96 object-cover"
                    style={{ aspectRatio: '7/10' }}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  />
                  
                  {/* Golden frame overlay */}
                  <div className="absolute inset-0 border-2 border-gradient-to-br from-yellow-400/30 via-transparent to-yellow-600/30 rounded-xl"></div>
                </motion.div>
              </div>

              {/* Desktop: Right navigation button */}
              <motion.button
                className="hidden sm:block p-3 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 flex-shrink-0"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15) 0%, rgba(255, 193, 7, 0.25) 100%)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 4px 15px rgba(255, 215, 0, 0.1)'
                }}
                onClick={e => {
                  e.stopPropagation()
                  next()
                }}
                whileHover={{ boxShadow: '0 8px 25px rgba(255, 215, 0, 0.2)' }}
                aria-label="Next book"
              >
                <ChevronRight className="w-6 h-6 text-yellow-200" />
              </motion.button>
            </div>

            {/* Enhanced pagination dots */}
            <div className="flex justify-center gap-2 sm:gap-3 mb-3 sm:mb-4">
              {flyers.map((_, idx) => (
                <motion.button
                  key={idx}
                  className={`transition-all duration-500 rounded-full border ${
                    idx === current
                      ? "w-8 sm:w-12 h-3 sm:h-4 border-yellow-400"
                      : "w-3 sm:w-4 h-3 sm:h-4 border-purple-400/50 hover:border-yellow-400/70"
                  }`}
                  style={{
                    background: idx === current 
                      ? 'linear-gradient(90deg, #ffd700 0%, #ffed4a 50%, #ffd700 100%)'
                      : 'rgba(147, 51, 234, 0.3)',
                    boxShadow: idx === current 
                      ? '0 0 15px rgba(255, 215, 0, 0.4)' 
                      : '0 2px 5px rgba(0, 0, 0, 0.2)'
                  }}
                  onClick={() => setCurrent(idx)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Go to book ${idx + 1}`}
                />
              ))}
            </div>

            {/* Bottom decorative section */}
            <div className="text-center">
              <motion.div 
                className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm font-medium"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.1) 0%, rgba(147, 51, 234, 0.15) 100%)',
                  border: '1px solid rgba(255, 215, 0, 0.2)',
                  color: '#e5d4ff'
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <span className="text-center">Discover the Complete Collection</span>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}