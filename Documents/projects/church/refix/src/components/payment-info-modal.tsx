import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "emailjs-com";
import {
  X,
  CreditCard,
  BookOpen,
  Phone,
  User,
  ShoppingBag,
  AlertCircle,
  Check,
} from "lucide-react";

type Book = {
  id: number;
  title: string;
  price: string;
};

type SelectedBook = Book & { quantity: number };

type PaymentInfoModalProps = {
  isOpen: boolean;
  onClose: () => void;
  books?: Book[];
};

type Errors = {
  name?: string;
  phoneNumber?: string;
};

const PaymentInfoModal: React.FC<PaymentInfoModalProps> = ({
  isOpen,
  onClose,
  books = [],
}) => {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [selectedBooks, setSelectedBooks] = useState<SelectedBook[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<Errors>({});

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setName("");
      setPhoneNumber("");
      setSelectedBooks([]);
      setIsSubmitted(false);
      setErrors({});
    }
  }, [isOpen]);

  const handleBookSelection = (e: ChangeEvent<HTMLSelectElement>) => {
    const bookId = Number.parseInt(e.target.value);
    if (bookId === 0) return; // Skip the placeholder option

    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    // Check if book is already in the selection
    if (selectedBooks.some((b) => b.id === bookId)) return;

    setSelectedBooks([
      ...selectedBooks,
      {
        id: book.id,
        title: book.title,
        quantity: 1,
        price: book.price,
      },
    ]);
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setSelectedBooks(
      selectedBooks.map((book) =>
        book.id === id ? { ...book, quantity } : book,
      ),
    );
  };

  const removeBook = (id: number) => {
    setSelectedBooks(selectedBooks.filter((book) => book.id !== id));
  };

  const validateForm = () => {
    const newErrors: Errors = {};

    if (!name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!phoneNumber.trim()) {
      newErrors.phoneNumber = "Phone number is required";
    } else if (!/^\+?[0-9\s-]{10,15}$/.test(phoneNumber.trim())) {
      newErrors.phoneNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Create order details for email
    const orderDetails = selectedBooks
      .map(
        (book) =>
          `${book.title} - Quantity: ${book.quantity} - Price: ${book.price}`,
      )
      .join("\n");

    const totalAmount = selectedBooks
      .reduce(
        (total, book) =>
          total +
          parseFloat(book.price.replace(/[^0-9.]/g, "")) * book.quantity,
        0,
      )
      .toFixed(2);

    // Prepare email template parameters
    const templateParams = {
      name: name,
      phone: phoneNumber,
      order_details: orderDetails,
      total_amount: totalAmount,
      message: `Order placed by ${name} (${phoneNumber}) for books:\n${orderDetails}\nTotal: ${totalAmount}`,
    };

    // Send email using emailjs
    emailjs
      .send(
        "service_cte8xrg",
        "template_vruhehp",
        templateParams,
        "fN2qkg7bDDx_2te0R",
      )
      .then(() => {
        setIsSubmitting(false);
        setIsSubmitted(true);

        // Log the order details
        console.log({
          name,
          phoneNumber,
          books: selectedBooks,
        });

        // Close modal after showing success message
        setTimeout(() => {
          onClose();
        }, 3000);
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        setIsSubmitting(false);
        alert(
          "An error occurred while submitting your order. Please try again.",
        );
      });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative w-full max-w-lg max-h-[90vh] overflow-auto bg-gradient-to-b from-gray-900 to-black rounded-xl border border-blue-900/40 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-blue-500/10 blur-3xl"></div>
              <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-purple-500/10 blur-3xl"></div>
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
              aria-label="Close modal"
            >
              <X size={18} className="text-white" />
            </button>

            {/* Header */}
            <div className="relative z-10 p-6 border-b border-white/10">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-blue-500/20 rounded-full">
                  <CreditCard size={20} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-bold text-white">
                  Payment Information
                </h2>
              </div>
              <p className="text-blue-100/80 text-sm">
                Online purchase will be available soon. For now, you can make a
                payment using the details below.
              </p>
            </div>

            {/* Content */}
            <div className="relative z-10 p-6">
              {!isSubmitted ? (
                <>
                  {/* Account details */}
                  <div className="mb-6 p-4 bg-blue-900/20 rounded-lg border border-blue-900/30">
                    <h3 className="text-blue-300 font-medium mb-3 flex items-center gap-2">
                      <BookOpen size={16} />
                      <span>John Winfred Books Ministry</span>
                    </h3>

                    <div className="space-y-2 text-sm">
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-blue-200/70">
                          Account Number:
                        </span>
                        <span className="text-white font-medium col-span-2">
                          1441004955063
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-blue-200/70">Bank:</span>
                        <span className="text-white font-medium col-span-2">
                          Ecobank
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <span className="text-blue-200/70">Branch:</span>
                        <span className="text-white font-medium col-span-2">
                          Westlands
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Order form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-blue-300 text-sm mb-1"
                      >
                        Your Name
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User size={16} className="text-blue-400/60" />
                        </div>
                        <input
                          type="text"
                          id="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2 bg-black/40 border ${errors.name ? "border-red-500" : "border-blue-900/30"} rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          placeholder="Enter your full name"
                        />
                      </div>
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="phone"
                        className="block text-blue-300 text-sm mb-1"
                      >
                        Phone Number
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone size={16} className="text-blue-400/60" />
                        </div>
                        <input
                          type="tel"
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className={`w-full pl-10 pr-4 py-2 bg-black/40 border ${errors.phoneNumber ? "border-red-500" : "border-blue-900/30"} rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500`}
                          placeholder="Enter your phone number"
                        />
                      </div>
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.phoneNumber}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="book"
                        className="block text-blue-300 text-sm mb-1"
                      >
                        Select Books
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <BookOpen size={16} className="text-blue-400/60" />
                        </div>
                        <select
                          id="book"
                          onChange={handleBookSelection}
                          value="0"
                          className="w-full pl-10 pr-4 py-2 bg-black/40 border border-blue-900/30 rounded-lg text-white focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
                          style={{
                            backgroundImage:
                              'url(\'data:image/svg+xml;charset=US-ASCII,<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><path d="M5 8l5 5 5-5" stroke="%234B91F7" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>\')',
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 10px center",
                          }}
                        >
                          <option value="0">Select a book to add</option>
                          {books.map((book) => (
                            <option
                              key={book.id}
                              value={book.id}
                              disabled={selectedBooks.some(
                                (b) => b.id === book.id,
                              )}
                            >
                              {book.title} - {book.price}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Selected books */}
                    {selectedBooks.length > 0 && (
                      <div className="mt-4 space-y-3">
                        <h4 className="text-blue-300 text-sm font-medium flex items-center gap-2">
                          <ShoppingBag size={16} />
                          <span>Your Order</span>
                        </h4>

                        <div className="space-y-2">
                          {selectedBooks.map((book) => (
                            <div
                              key={book.id}
                              className="flex items-center justify-between p-2 bg-blue-900/10 rounded-lg border border-blue-900/20"
                            >
                              <div className="flex-1">
                                <p className="text-white text-sm">
                                  {book.title}
                                </p>
                                <p className="text-blue-300/70 text-xs">
                                  {book.price}
                                </p>
                              </div>

                              <div className="flex items-center gap-2">
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(book.id, book.quantity - 1)
                                  }
                                  className="w-6 h-6 flex items-center justify-center bg-black/40 rounded-full border border-blue-900/30 text-white hover:bg-black/60"
                                >
                                  -
                                </button>
                                <span className="text-white text-sm w-6 text-center">
                                  {book.quantity}
                                </span>
                                <button
                                  type="button"
                                  onClick={() =>
                                    updateQuantity(book.id, book.quantity + 1)
                                  }
                                  className="w-6 h-6 flex items-center justify-center bg-black/40 rounded-full border border-blue-900/30 text-white hover:bg-black/60"
                                >
                                  +
                                </button>
                                <button
                                  type="button"
                                  onClick={() => removeBook(book.id)}
                                  className="ml-2 p-1 text-red-400 hover:text-red-300"
                                >
                                  <X size={16} />
                                </button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="pt-4 flex items-center gap-2 text-sm text-blue-200/70">
                      <AlertCircle size={16} className="text-blue-400" />
                      <p>
                        Please make payment before submitting your order
                        details.
                      </p>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || selectedBooks.length === 0}
                      className="w-full py-2.5 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Order Details</span>
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={32} className="text-green-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Order Submitted Successfully!
                  </h3>
                  <p className="text-blue-100/80 text-sm mb-6">
                    Thank you for your order. Your order details have been sent
                    via email, and we'll contact you shortly to confirm your
                    purchase.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PaymentInfoModal;
