"use client"

import {AnimatePresence, motion} from "framer-motion"
import {BooksData} from "@/data/booksData"
import {ArrowLeft, Book, Calendar, Check, Copy, Eye, FileText, ShoppingCart, Star} from "lucide-react"
import {useRouter} from "next/navigation"
import {useState} from "react"
import SampleChapterReader from "./SampleChapterReader"

interface BookDetailsProps {
    bookId: number
}

function DownloadModal({ open, onClose }: { open: boolean; onClose: () => void }) {
    const [copied, setCopied] = useState(false)
    const phoneNumber = "(+233) 24 237 1411"

    const handleCopy = async () => {
        await navigator.clipboard.writeText(phoneNumber)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className="relative bg-gradient-to-br from-white via-purple-50 to-purple-100 rounded-3xl shadow-2xl max-w-md w-full p-8 text-center border border-indigo-200/50"
                        initial={{ scale: 0.85, opacity: 0, y: 40 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.85, opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-purple-100 hover:bg-purple-200 flex items-center justify-center text-indigo-700 text-2xl font-bold shadow transition"
                            aria-label="Close"
                        >
                            ×
                        </button>
                        <div className="mb-6">
                            <h2 className="text-3xl font-extrabold mb-2 text-indigo-900 tracking-tight">Download Online</h2>
                            <p className="text-lg text-indigo-700 mb-4 font-medium">Coming soon</p>
                        </div>
                        <div className="mb-4">
                            <p className="text-indigo-900 font-semibold mb-2">For physical copies contact:</p>
                            <button
                                onClick={handleCopy}
                                className={`mx-auto flex items-center gap-2 px-4 py-2 rounded-lg border border-indigo-300 bg-white hover:bg-indigo-50 active:bg-indigo-100 transition shadow text-indigo-700 font-bold text-lg`}
                                title="Click to copy"
                            >
                                {phoneNumber}
                                {copied ? (
                                    <Check className="h-5 w-5 text-green-500" />
                                ) : (
                                    <Copy className="h-5 w-5 text-indigo-400" />
                                )}
                            </button>
                            <div className="mt-2 h-5">
                                {copied && (
                                    <span className="text-green-600 text-xs font-medium animate-fade-in">
                                        Number copied!
                                    </span>
                                )}
                            </div>
                        </div>
                        <div className="mt-8 text-xs text-indigo-500">
                            Thank you for your interest! Online downloads will be available soon.
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default function BookDetails({ bookId }: BookDetailsProps) {
    const router = useRouter()
    const [showSampleReader, setShowSampleReader] = useState(false)
    const [showDownloadModal, setShowDownloadModal] = useState(false)

    const book = BooksData.find((b) => b.id === bookId)
    const otherBooks = BooksData.filter((b) => b.id !== bookId).slice(0, 3)

    if (!book) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-100 mb-4">Book Not Found</h2>
                    <button
                        onClick={() => router.push("/books")}
                        className="text-gray-400 hover:text-gray-200 flex items-center gap-2"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Books
                    </button>
                </div>
            </div>
        )
    }

    if (showSampleReader) {
        return (
            <>
                <SampleChapterReader
                    book={book}
                    onClose={() => setShowSampleReader(false)}
                    onContinueFullBook={() => setShowDownloadModal(true)}
                />
                <DownloadModal open={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
            </>
        )
    }

    return (
        <div className="bg-black min-h-screen">
            {/* Hero Section */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black z-10" />
                <div className="absolute inset-0">
                    <img
                        src={book.image || "/placeholder.svg?height=600&width=1200"}
                        alt={book.title}
                        className="w-full h-full object-cover blur-sm scale-110"
                    />
                </div>

                <div className="relative z-20 container mx-auto px-4 py-16">
                    {/* Back Button */}
                    <button
                        onClick={() => router.push("/books")}
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-gray-100 transition-colors mb-8"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span>Back to Books</span>
                    </button>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Book Cover */}
                        <motion.div
                            className="flex justify-center lg:justify-start"
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gradient-to-r from-gray-700/20 to-gray-600/20 rounded-2xl blur-xl" />
                                <img
                                    src={book.image || "/placeholder.svg?height=500&width=350"}
                                    alt={book.title}
                                    className="relative w-80 h-auto rounded-lg shadow-2xl"
                                />
                            </div>
                        </motion.div>

                        {/* Book Info */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex items-center gap-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                    ))}
                                </div>
                                <span className="text-gray-400 text-sm">(4.8/5 from 234 reviews)</span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-bold text-gray-100 mb-4">{book.title}</h1>

                            <p className="text-xl text-gray-300 mb-6">by Pastor John Winfred</p>

                            <div className="flex flex-wrap gap-4 mb-6">
                                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                                    <Calendar className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 text-sm">{book.year}</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                                    <FileText className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 text-sm">{book.pages} pages</span>
                                </div>
                                <div className="flex items-center gap-2 bg-gray-800/50 px-3 py-1 rounded-full">
                                    <Book className="h-4 w-4 text-gray-400" />
                                    <span className="text-gray-300 text-sm">{book.category}</span>
                                </div>
                            </div>

                            <p className="text-gray-300 text-lg leading-relaxed mb-8">{book.description}</p>

                            <div className="flex flex-wrap gap-4 mb-8">
                                <button
                                    onClick={() => setShowSampleReader(true)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-gray-100 px-6 py-3 rounded-full font-medium transition-all duration-300 border border-gray-600/30"
                                >
                                    <Eye className="h-5 w-5" />
                                    Read Sample
                                </button>

                                <button
                                    onClick={() => setShowDownloadModal(true)}
                                    className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-full font-medium transition-all duration-300"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Buy Now - {book.price}
                                </button>
                            </div>

                            <div className="border-t border-gray-700 pt-6">
                                <h3 className="text-lg font-semibold text-gray-100 mb-3">Available Formats:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {book.formats.map((format, index) => (
                                        <span
                                            key={index}
                                            className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full text-sm border border-gray-700/50"
                                        >
                      {format}
                    </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Other Books Section */}
            {otherBooks.length > 0 && (
                <div className="container mx-auto px-4 py-16">
                    <h2 className="text-3xl font-bold text-gray-100 mb-8">Other Books by Pastor John</h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {otherBooks.map((otherBook) => (
                            <motion.div
                                key={otherBook.id}
                                className="bg-gray-900/70 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-700/30 cursor-pointer group"
                                whileHover={{ y: -5 }}
                                onClick={() => router.push(`/books?id=${otherBook.id}`)}
                            >
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={otherBook.image || "/placeholder.svg?height=192&width=300"}
                                        alt={otherBook.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                                <div className="p-4">
                                    <h3 className="text-lg font-semibold text-gray-100 mb-2">{otherBook.title}</h3>
                                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">{otherBook.description}</p>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-300 font-medium">{otherBook.price}</span>
                                        <span className="text-gray-500 text-sm">{otherBook.year}</span>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            )}

            <DownloadModal open={showDownloadModal} onClose={() => setShowDownloadModal(false)} />
        </div>
    )
}
