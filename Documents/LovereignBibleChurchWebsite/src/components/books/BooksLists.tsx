"use client"


import {motion} from "framer-motion";
import {BooksData} from "@/data/booksData";
import {ExternalLink} from "lucide-react";
import {useRouter} from "next/navigation";

export default function BooksLists() {
    const router = useRouter(); // Hook for programmatic navigation

    // Function to handle navigation to book details
    const handleBookDetails = (bookId: number) => {
        router.push(`/books?id=${bookId}`);
    };

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        },
    };

    return (
        <div className="bg-gradient-to-b from-[#295264] to-[#152745] min-h-screen flex flex-col items-center px-4 md:px-12 pt-24 py-8 relative overflow-hidden">
            {/* Decorative Elements - Smaller */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-32 h-32 rounded-full bg-blue-500/10 blur-2xl"></div>
                <div className="absolute bottom-1/4 right-10 w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5"></div>
            </div>

            {/* Title Section - Reduced sizes */}
            <motion.div
                className="w-full max-w-4xl text-center md:text-left -ms-64 mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <div className="flex items-center justify-center md:justify-start mb-3">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3"></div>
                    <span className="text-blue-300 uppercase tracking-wider text-xs font-medium">
            Published Books
          </span>
                </div>

                <h1 className="text-white text-xl sm:text-2xl md:text-3xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
                    Books By <br className="hidden md:block" /> Pastor John Winfred
                </h1>

                <p className="text-blue-100/80 mt-4 max-w-xl mx-auto md:mx-0 text-sm">
                    Explore spiritual wisdom and guidance through these transformative
                    books that have touched thousands of lives around the world.
                </p>
            </motion.div>

            {/* Books List */}
            <motion.div
                className="w-full max-w-6xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {BooksData.map((book, index) => (
                        <motion.div
                            key={book.id || index}
                            className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden border border-white/20 flex flex-col h-full"
                            variants={itemVariants}
                        >
                            <div className="relative h-48 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10"></div>
                                <img
                                    src={book.image || "/placeholder.svg"}
                                    alt={book.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                                    <h3 className="text-white text-lg font-bold">{book.title}</h3>
                                    <p className="text-blue-200 text-sm mt-1">
                                        {book.year} • {book.pages} pages
                                    </p>
                                </div>
                            </div>

                            <div className="p-4 flex-1 flex flex-col">
                                <p className="text-blue-100/90 text-sm mb-4 line-clamp-3">
                                    {book.description}
                                </p>

                                <div className="grid grid-cols-2 gap-3 mb-4 mt-auto">
                                    <div>
                                        <h4 className="text-blue-300 text-xs font-medium mb-1">
                                            Price
                                        </h4>
                                        <p className="text-white text-sm">{book.price}</p>
                                    </div>
                                    <div>
                                        <h4 className="text-blue-300 text-xs font-medium mb-1">
                                            Formats
                                        </h4>
                                        <p className="text-white text-sm">{book.formats[0]}, ...</p>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleBookDetails(book.id)}
                                    className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm transition-colors w-full"
                                >
                                    <ExternalLink size={14} />
                                    <span>More Details</span>
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}