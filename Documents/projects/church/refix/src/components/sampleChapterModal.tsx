import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

type BookType = {
  id: number;
  title: string;
  image?: string;
  description?: string;
  price?: string;
  pages?: string;
  year?: number;
  availableAt?: string[];
  formats?: string[];
};

type SampleChapterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  book?: BookType | null;
};

export default function SampleChapterModal({
  isOpen,
  onClose,
  book,
}: SampleChapterModalProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        setLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    } else {
      setLoading(true);
    }
  }, [isOpen]);

  const getSampleContent = (bookId: number) => {
    const chapters: Record<
      number,
      { title: string; content: string }
    > = {
      1: {
        title: "Chapter 1: The Gifts and Calling of God",
        content: `
    <h2>The Gifts and Calling of God</h2>
    <p>God’s gifts and calling are irrevocable, yet many struggle to fully walk in them. Why do some ministers thrive while others falter? What separates a fruitful ministry from one that fades into obscurity? Ministry is deeply spiritual; without the supernatural element, it becomes a mere social gathering. The manifestation of gifts sustains true service, marking the beginning of a believer’s walk with God. The author establishes that every biblical calling was ultimately a call to build a nation, the church, the city of God, and His tabernacle among men.</p>
    <p>In <strong>The Gifts and Calling of God</strong>, you will discover the many gifts given to believers, all working toward a singular purpose to build the church, the nation of God. This book explores the principles, characteristics, and signs that mark the receiving and manifestation of spiritual gifts, emphasizing their divine nature in establishing God’s nation, the church, the ground, and the pillar of truth.</p>
    <p>Through biblical insights and practical wisdom, you will gain understanding of:</p>
    <ul>
      <li>1. How to identify and activate your God-given gifts.</li>
      <li>2. The role of gifts in ministry growth and impact.</li>
      <li>3. How to follow divine pathways and receive from those God sends your way.</li>
      <li>4. The three major categories of gifts are those that serve in support, manifest divine power, and establish leadership, authority, and spiritual governance.</li>
    </ul>
    <p>Whether you are a seasoned minister, just beginning your journey, or simply seeking relevance in God’s house, this book will equip you with the knowledge, wisdom, and spiritual understanding needed to walk in your calling and divine assignment with confidence and impact.</p>
    <p>Are you ready to embrace your calling and fulfill your ministry? <strong>The Gifts and Calling of God</strong> will show you the way.</p>
  `,
      },

      2: {
        title: "Chapter 1: The Foundation of Church Systems",
        content: `
          <h2>The Foundation of Church Systems</h2>
          <p>Every thriving ministry is built upon well-designed systems and structures. Just as the human body functions through interconnected systems, the body of Christ requires organizational frameworks that facilitate growth, health, and effectiveness.</p>
          <p>In 1 Corinthians 14:40, Paul instructs that "all things should be done decently and in order." This biblical principle underscores the importance of intentional organization within the church. Without proper systems, even the most passionate ministry efforts can become chaotic and ultimately ineffective.</p>
          <h3>Why Systems Matter</h3>
          <p>Systems provide the necessary infrastructure for sustainable growth. They allow churches to:
          <ul>
            <li>Efficiently steward resources</li>
            <li>Effectively disciple new believers</li>
            <li>Consistently deliver ministry services</li>
            <li>Seamlessly integrate new members</li>
            <li>Strategically expand outreach efforts</li>
          </ul>
          </p>
          <p>When Jesus fed the five thousand, He implemented a system—having people sit in groups, distributing the food through the disciples, and collecting the leftovers. This demonstrates that even miraculous ministry benefits from systematic approaches.</p>
          <p>In the following chapters, we will examine 13 essential systems that every growing church needs to implement...</p>
        `,
      },
      3: {
        title: "Chapter 1: The Work Of The Ministry",
        content: `
    <h2>The Sacred Call to Ministry</h2>
    <p>Ministry is a sacred calling, but it is also a battlefield, one that demands divine direction, wisdom, endurance, and unwavering commitment. Many begin with zeal, yet only those who grasp the principles, understand spiritual warfare, and receive continuous divine strategy, endure to the end.</p>
    <p>This book explores essential aspects of ministry, including practical church work, leadership succession, the different phases of ministry, critical pitfalls to avoid, the mindset required for effective ministry, the role and responsibilities of an assistant, strategies for overcoming setbacks, preservation of ministry focus, and many other vital insights.</p>
    <p>Whatever phase of the ministry you are in, this book will challenge, inspire, and empower you to rise above obstacles, walk in the fullness of your ministry, and fulfill the call of God on your life. </p>
    <p>Prepare to be transformed for the work of ministry!"</p>
  `,
      },
    };

    return (
      chapters[bookId] || {
        title: "Sample Chapter",
        content: "<p>Sample chapter content coming soon...</p>",
      }
    );
  };

  // Get content for the current book
  const chapterContent = book ? getSampleContent(book.id) : null;

  // Prevent scrolling on the body when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        <motion.div
          className="relative w-full max-w-3xl max-h-[80vh] bg-gradient-to-b from-blue-900/90 to-[#152745]/90 backdrop-blur-md rounded-xl shadow-2xl overflow-hidden border border-white/20"
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded overflow-hidden">
                <img
                  src={book.image}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-sm">{book.title}</h3>
                <p className="text-blue-200 text-xs">Sample Chapter</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <X size={16} className="text-white" />
            </button>
          </div>

          {/* Content */}
          <div className="overflow-y-auto p-5 max-h-[calc(80vh-64px)]">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <div className="w-10 h-10 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="text-blue-200 text-sm">
                  Loading sample chapter...
                </p>
              </div>
            ) : (
              <div className="prose prose-invert prose-blue max-w-none">
                <h1 className="text-xl md:text-2xl font-bold text-white mb-4">
                  {chapterContent?.title}
                </h1>
                <div
                  className="text-blue-100/90 space-y-4 text-sm leading-relaxed"
                  dangerouslySetInnerHTML={{
                    __html: chapterContent?.content || "",
                  }}
                />

                <div className="mt-8 pt-6 border-t border-white/10 text-center">
                  <p className="text-blue-200 text-sm mb-3">
                    Want to continue reading?
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors">
                      Purchase Book
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
