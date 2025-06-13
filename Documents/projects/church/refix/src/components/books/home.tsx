"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingCart, Download, Info } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import SampleChapterModal from "../sampleChapterModal";
import PaymentInfoModal from "../payment-info-modal";

// Type definitions
interface Book {
  id: number;
  title: string;
  image: string;
  description: string;
  price: string;
  pages: string;
  year: number;
  availableAt: string[];
  formats: string[];
}

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
    transition: { duration: 0.6 },
  },
};

const detailsVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: "easeInOut" },
  },
};

// Book images constants
import bookImage1 from "@/../public/assets/img/giftsandcallings.jpg";
import bookImage2 from "@/../public/assets/img/systems_structures.jpg";
import bookImage3 from "@/../public/assets/img/work_of_ministry.jpg";

export default function BooksByFounder() {
  const [books, setBooks] = useState<Book[]>([]);
  const [activeBook, setActiveBook] = useState<Book | null>(null);
  const [showSampleChapter, setShowSampleChapter] = useState<boolean>(false);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Simulate API call with book information
  useEffect(() => {
    const fetchBooks = async (): Promise<void> => {
      const placeholderBooks: Book[] = [
        {
          id: 1,
          title: "The Gifts and Calling of God",
          image: bookImage1.src,
          description:
            "An insightful exploration of spiritual rebirth and the transformative journey of faith. This book delves into the profound meaning of being 'born again' and how it changes one's perspective on life.",
          price: "$20",
          pages: "200+",
          year: 2025,
          availableAt: ["Amazon", "Church Bookstore", "Christian Bookshops"],
          formats: ["Hardcover", "Paperback", "E-Book"],
        },
        {
          id: 2,
          title: "Church Systems and Structures For Growth",
          image: bookImage2.src,
          description:
            'Church Systems and Structures for Growth Unlock the keys to training leaders, strengthening church governance, and driving effective growth in the ministry.Drawing deeply from biblical principles, observations of thriving ministries, denominations, as well as personal experience ministering to pastors and leaders, this bookintroduces 13 essential systems and structures thatempower churches to flourish. Perfect for equipping ministry leaders and enhancing organizational excellence in the church. This resource offers practical strategies to ensure your church operates with purpose clarity, and lasting impact. Whether you\'re a church founder, pastor, church administrator, ministry trainer or someone preparing to step into ministry, "Church Systems and Structures for Growth" is your ultimate guide to building a well-organized and enduring ministry.',
          price: "$20",
          pages: "327+",
          year: 2025,
          availableAt: ["Amazon", "Church Bookstore", "Christian Bookshops"],
          formats: ["Hardcover", "Paperback", "E-Book", "Audiobook"],
        },
        {
          id: 3,
          title: "The Work of Ministry",
          image: bookImage3.src,
          description:
            "A comprehensive guide to understanding the various aspects of ministry work and how to effectively serve in your calling. This book offers wisdom for both new and experienced ministers.",
          price: "$20",
          pages: "400+",
          year: 2025,
          availableAt: ["Amazon", "Church Bookstore", "Christian Bookshops"],
          formats: ["Hardcover", "Paperback", "E-Book"],
        },
      ];
      setBooks(placeholderBooks);

      // Process URL parameters
      const bookId = searchParams?.get("id");

      if (bookId) {
        const selectedBook = placeholderBooks.find(
          (book) => book.id === Number.parseInt(bookId, 10),
        );
        if (selectedBook) {
          setActiveBook(selectedBook);
        } else {
          // Default to first book if ID not found
          setActiveBook(placeholderBooks[0]);
        }
      } else {
        // Default to first book if no ID in URL
        setActiveBook(placeholderBooks[0]);
      }
    };

    fetchBooks();
  }, [searchParams]);

  const scroll = (direction: "left" | "right"): void => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // Update URL when active book changes
  useEffect(() => {
    if (activeBook) {
      const currentBookId = searchParams?.get("id");

      // Only update URL if the book ID has actually changed
      if (!currentBookId || Number.parseInt(currentBookId, 10) !== activeBook.id) {
        const params = new URLSearchParams(searchParams?.toString() || "");
        params.set("id", activeBook.id.toString());
        router.replace(`/books?${params.toString()}`);
      }
    }
  }, [activeBook, router, searchParams]);

  // Function to open sample chapter modal
  const openSampleChapter = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setShowSampleChapter(true);
  };

  // Function to open payment modal
  const openPaymentModal = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault();
    setShowPaymentModal(true);
  };

  return (
    <div className="bg-transparent min-h-screen flex flex-col items-center justify-center px-3 md:px-6 py-24 relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5" />
      </div>

      {/* Title Section */}
      <motion.div
        className="w-full max-w-5xl text-center md:text-left mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="flex items-center justify-center md:justify-start mb-3">
          <div className="h-0.5 w-12 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-3" />
          <span className="text-blue-300 uppercase tracking-wider text-xs font-medium">
            Coming Soon
          </span>
        </div>

        <h1 className="text-white text-xl sm:text-2xl md:text-3xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-blue-100 to-white">
          Books By <br className="hidden md:block" /> Pastor John Winfred
        </h1>

        <p className="text-blue-100/80 mt-4 max-w-xl mx-auto md:mx-0 text-sm">
          Explore spiritual wisdom and guidance through these transformative
          books that have touched thousands of lives around the world.
        </p>

        <div className="flex justify-center md:justify-start gap-2 mt-5">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20"
            aria-label="Scroll left"
            type="button"
          >
            <ChevronLeft className="text-white text-xs" size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20"
            aria-label="Scroll right"
            type="button"
          >
            <ChevronRight className="text-white text-xs" size={14} />
          </button>
        </div>
      </motion.div>

      {/* Books Carousel */}
      <div className="relative overflow-hidden w-full max-w-5xl">
        <motion.div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-hide p-3 flex-nowrap pb-6 -mx-3 px-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ WebkitOverflowScrolling: "touch" }}
        >
          {books.map((book) => (
            <motion.div
              id={`book-${book.id}`}
              key={book.id}
              className={`min-w-[12rem] sm:min-w-[14rem] md:min-w-[16rem] flex flex-col cursor-pointer ${
                activeBook?.id === book.id 
                  ? "ring-1 ring-blue-400 ring-offset-2 ring-offset-[#152745]" 
                  : ""
              }`}
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                transition: { duration: 0.3 },
              }}
              onClick={() => setActiveBook(book)}
            >
              <div className="relative group overflow-hidden rounded-lg">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 z-10 group-hover:opacity-80 transition-opacity duration-300" />

                <Image
                  src={book.image}
                  alt={book.title}
                  width={256}
                  height={256}
                  className="w-full h-[16rem] object-cover rounded-lg shadow-lg transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute bottom-0 left-0 right-0 p-3 z-20">
                  <h3 className="text-white text-base font-bold">
                    {book.title}
                  </h3>
                  <p className="text-blue-200 text-xs mt-0.5">
                    {book.year} • {book.pages} pages
                  </p>

                  <div className="mt-2 flex gap-1.5">
                    <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] text-white">
                      {book.price}
                    </span>
                    <span className="px-1.5 py-0.5 bg-white/20 backdrop-blur-sm rounded-full text-[10px] text-white">
                      {book.formats[0]}
                    </span>
                  </div>
                </div>

                <button
                  className="absolute top-3 right-3 z-20 w-6 h-6 flex items-center justify-center bg-white/20 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-white/40"
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveBook(book);
                  }}
                  type="button"
                >
                  <Info size={12} className="text-white" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Book Details Section */}
      <AnimatePresence mode="wait">
        {activeBook && (
          <motion.div
            className="w-full max-w-5xl mt-8 bg-white/10 backdrop-blur-sm rounded-xl p-4 md:p-6 border border-white/20"
            key={activeBook.id}
            variants={{detailsVariants}}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 30, transition: { duration: 0.5 } }}
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-lg md:text-xl font-bold text-white mb-3">
                  {activeBook.title}
                </h2>
                <p className="text-blue-100/90 text-sm mb-4">
                  {activeBook.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">
                      Price
                    </h4>
                    <p className="text-white text-sm font-semibold">
                      {activeBook.price}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">
                      Published
                    </h4>
                    <p className="text-white text-sm">{activeBook.year}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">
                      Pages
                    </h4>
                    <p className="text-white text-sm">{activeBook.pages}</p>
                  </div>
                  <div>
                    <h4 className="text-blue-300 text-xs font-medium mb-1">
                      Formats
                    </h4>
                    <p className="text-white text-sm">
                      {activeBook.formats.join(", ")}
                    </p>
                  </div>
                </div>

                <div className="mb-5">
                  <h4 className="text-blue-300 text-xs font-medium mb-1">
                    Where to Buy
                  </h4>
                  <ul className="text-white text-sm space-y-0.5">
                    {activeBook.availableAt.map((place, i) => (
                      <li key={i} className="flex items-center">
                        <span className="w-1 h-1 bg-blue-400 rounded-full mr-1.5" />
                        {place}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={openPaymentModal}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs rounded-full transition-colors"
                    type="button"
                  >
                    <ShoppingCart size={12} />
                    <span>Purchase Now</span>
                  </button>
                  <button
                    onClick={openSampleChapter}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white text-xs rounded-full transition-colors border border-white/20 group"
                    type="button"
                  >
                    <Download
                      size={12}
                      className="group-hover:animate-bounce"
                    />
                    <span>Read Sample Chapter</span>
                  </button>
                </div>
              </div>

              <div className="flex justify-center items-center">
                <div className="relative max-w-[180px]">
                  <div className="absolute -inset-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg blur-lg opacity-70" />
                  <Image
                    src={activeBook.image}
                    alt={activeBook.title}
                    width={180}
                    height={250}
                    className="relative z-10 rounded-lg shadow-xl max-h-[250px] object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sample Chapter Modal */}
      <SampleChapterModal
        isOpen={showSampleChapter}
        onClose={() => setShowSampleChapter(false)}
        book={activeBook}
      />

      {/* Payment Info Modal */}
      <PaymentInfoModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        books={books}
      />
    </div>
  );
}