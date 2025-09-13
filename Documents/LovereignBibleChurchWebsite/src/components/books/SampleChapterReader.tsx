"use client"

import {motion} from "framer-motion"
import {BookOpen, ChevronLeft, ChevronRight, X} from "lucide-react"
import {useState} from "react"

interface Book {
    id: number
    title: string
    image?: string
    sampleChapter?: {
        title: string
        content: string[]
    }
}

export interface SampleChapterReaderProps {
  book: Book;
  onClose: () => void;
  onContinueFullBook: () => void;
}

export default function SampleChapterReader({ book, onClose, onContinueFullBook }: SampleChapterReaderProps) {
    const [currentPage, setCurrentPage] = useState(0)

    const sampleChapter = book.sampleChapter || {
        title: "Chapter 1: The Beginning of Faith",
        content: [
            "Faith is not just a word we speak; it is the foundation upon which we build our entire spiritual journey. In this opening chapter, we explore the very essence of what it means to have faith in God's plan for our lives.",

            "When I first received the calling to ministry, I was filled with both excitement and uncertainty. The path ahead seemed unclear, yet there was an undeniable peace that came with knowing I was walking in God's will.",

            "Many believers struggle with doubt, and this is completely natural. Doubt does not make us weak; rather, it provides us with opportunities to strengthen our faith through prayer, study, and community fellowship.",

            "The scriptures tell us in Hebrews 11:1 that 'faith is confidence in what we hope for and assurance about what we do not see.' This verse has been a cornerstone of my ministry and personal walk with Christ.",

            "As we journey together through this book, my prayer is that you will discover not only the power of faith but also the practical ways to apply biblical principles in your daily life.",

            "Remember, faith is not a destination but a continuous journey of growth, learning, and deepening our relationship with our Heavenly Father.",
        ],
    }

    const totalPages = sampleChapter.content.length
    const canGoNext = currentPage < totalPages - 1
    const canGoPrev = currentPage > 0

    return (
        <motion.div
            className="fixed inset-0 bg-black z-50 flex flex-col"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
                <div className="flex items-center gap-3">
                    <BookOpen className="h-6 w-6 text-gray-300" />
                    <div>
                        <h2 className="text-lg font-semibold text-gray-100">{book.title}</h2>
                        <p className="text-sm text-gray-400">{sampleChapter.title}</p>
                    </div>
                </div>

                <div className="flex items-center gap-2">
          <span className="text-sm text-gray-400">
            Page {currentPage + 1} of {totalPages}
          </span>
                    <button onClick={onClose} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                        <X className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 flex items-center justify-center p-4">
                <div className="max-w-4xl w-full">
                    <motion.div
                        key={currentPage}
                        className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-8 md:p-12 border border-gray-700/30 min-h-[500px] flex flex-col justify-center"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="prose prose-invert max-w-none">
                            <p className="text-gray-300 text-lg leading-relaxed">{sampleChapter.content[currentPage]}</p>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-4 border-t border-gray-700">
                <button
                    onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
                    disabled={!canGoPrev}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        canGoPrev ? "bg-gray-800 hover:bg-gray-700 text-gray-100" : "bg-gray-900 text-gray-600 cursor-not-allowed"
                    }`}
                >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                </button>

                <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentPage(i)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                i === currentPage ? "bg-gray-300" : "bg-gray-600"
                            }`}
                        />
                    ))}
                </div>

                <button
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))}
                    disabled={!canGoNext}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                        canGoNext ? "bg-gray-800 hover:bg-gray-700 text-gray-100" : "bg-gray-900 text-gray-600 cursor-not-allowed"
                    }`}
                >
                    Next
                    <ChevronRight className="h-4 w-4" />
                </button>
            </div>

            {/* Footer Actions */}
            <div className="p-4 bg-gray-900/50 border-t border-gray-700">
                <div className="flex items-center justify-center gap-4">
                    <button
                        onClick={onContinueFullBook}
                        className="px-6 py-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 rounded-full transition-all duration-300 border border-gray-600/30"
                    >
                        Continue Reading Full Book
                    </button>

                 
                </div>
            </div>
        </motion.div>
    )
}
