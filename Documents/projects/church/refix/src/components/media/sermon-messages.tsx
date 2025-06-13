"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Headphones,
  Youtube,
  Calendar,
  Clock,
} from "lucide-react";

const podbeanMessages = [
  {
    id: "pb1",
    title: "Supernatural Provision",
    date: "April 22, 2025",
    duration: "100:57",
    image: "@/../public/assets/img/messages_thumbnail/supernatural_provision.jpeg",
    url: "https://www.podbean.com/ew/pb-jix3y-188980b",
  },
  {
    id: "pb2",
    title: "Kingdom Prosperity",
    date: "April 22, 2025",
    duration: "134:47",
    image: "@/../public/assets/img/messages_thumbnail/kingdom_prosperity.jpeg",
    url: "https://www.podbean.com/ew/pb-knb4n-18897a4",
  },
  {
    id: "pb3",
    title: "The Law of Success",
    date: "April 3, 2025",
    duration: "99:05",
    image: "@/../public/assets/img/messages_thumbnail/laws_of_success.jpeg",
    url: "https://www.podbean.com/ew/pb-gskd3-186dbdc",
  },
  {
    id: "pb4",
    title: "The Secrets to Prosperity",
    date: "MArch 20, 2025",
    duration: "106:15",
    image: "@/../public/assets/img/messages_thumbnail/secrets_to_prosperity.jpeg",
    url: "https://lovereignbiblechurch.podbean.com/e/the-secret-to-prosperity-pastor-john-winfred/",
  },
  {
    id: "pb5",
    title: "Trials, Tests, and Temptations of the Believer",
    date: "March 12, 2025",
    duration: "47:20",
    image: "@/../public/assets/img/messages_thumbnail/ttt.jpeg",
    url: "https://lovereignbiblechurch.podbean.com/e/the-trials-tests-and-temptations-of-the-believer-pastor-john-winfred/",
  },
  {
    id: "pb6",
    title: "Significance of Church",
    date: "March 7, 2025",
    duration: "94:37",
    image: "@/../public/assets/img/messages_thumbnail/significance_of_church.jpeg",
    url: "https://lovereignbiblechurch.podbean.com/e/1-significance-of-church-pt_1-pastor-john-winfred/",
  },
];

const youtubeMessages = [
  {
    id: "yt1",
    title: "Why Relationships Don't Work",
    date: "April 24, 2025",
    duration: "01:45",
    image: "@/../public/assets/img/messages_thumbnail/why_relationships_dont_work.jpeg",
    url: "https://youtu.be/-9pG-yb_jGI?si=je-dTUhDfIR9Ue3o",
  },
  {
    id: "yt2",
    title: "The Right Way To Leave a Church",
    date: "February 12, 2024",
    duration: "50:10",
    image: "@/../public/assets/img/messages_thumbnail/right_way_to_leave_church.jpeg",
    url: "https://youtu.be/i8bet_hzjL8?si=yrGgT1LSZkFHn-lC",
  },
  {
    id: "yt3",
    title: "Practical Steps to Entering the Ministry",
    date: "September 13, 2024",
    duration: "03:05",
    image: "@/../public/assets/img/messages_thumbnail/practical_steps_into_ministry.jpeg",
    url: "https://youtu.be/H_7oQRtEXwI?si=xRNXHFIh6rqWHaLF",
  },
  {
    id: "yt4",
    title: "The Prayer that changes Stories",
    date: "September 26, 2023",
    duration: "1:03:00",
    image: "@/../public/assets/img/messages_thumbnail/prayer_that_changes_stories.jpeg",
    url: "https://youtu.be/djWu_4AX9ek?si=Lx9KtSB2ZvozdxDJ",
  },
  {
    id: "yt5",
    title: "Men Are Pathways",
    date: "April 22, 2024",
    duration: "15:32",
    image: "@/../public/assets/img/messages_thumbnail/men_are_pathways.jpeg",
    url: "https://youtu.be/S4Bxq7s5j4M?si=bczbAmqday2LTLPa",
  },
];

type MessageType = {
  id: string;
  title: string;
  date: string;
  duration: string;
  image: string;
  url: string;
};

type MessageCardProps = {
  message: MessageType;
  type: "podbean" | "youtube";
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
};

export default function SermonMessages() {
  const [activeTab, setActiveTab] = useState<"podbean" | "youtube">("podbean");
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="w-full bg-black text-white px-4 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Latest Sermons
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore our recent messages from Sunday services and special events.
          </p>
        </div>

        {/* Minimalist Tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("podbean")}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === "podbean"
                  ? "text-purple-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Headphones className="h-4 w-4" />
                <span>Podbean</span>
              </span>
              {activeTab === "podbean" && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-400"
                  initial={false}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab("youtube")}
              className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                activeTab === "youtube"
                  ? "text-red-400"
                  : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <span className="flex items-center gap-2">
                <Youtube className="h-4 w-4" />
                <span>YouTube</span>
              </span>
              {activeTab === "youtube" && (
                <motion.div
                  layoutId="tab-indicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-400"
                  initial={false}
                />
              )}
            </button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "podbean" && (
            <motion.div
              key="podbean"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {podbeanMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  type="podbean"
                  isHovered={hoveredItem === message.id}
                  onHover={() => setHoveredItem(message.id)}
                  onLeave={() => setHoveredItem(null)}
                />
              ))}
            </motion.div>
          )}

          {activeTab === "youtube" && (
            <motion.div
              key="youtube"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {youtubeMessages.map((message) => (
                <MessageCard
                  key={message.id}
                  message={message}
                  type="youtube"
                  isHovered={hoveredItem === message.id}
                  onHover={() => setHoveredItem(message.id)}
                  onLeave={() => setHoveredItem(null)}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-12 text-center">
          <a
            href={
              activeTab === "podbean"
                ? "https://lovereignbiblechurch.podbean.com/"
                : "https://www.youtube.com/@lovereignbiblechurch"
            }
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center justify-center px-6 py-2 text-sm font-medium transition-all border ${
              activeTab === "podbean"
                ? "text-purple-400 border-purple-800 hover:bg-purple-900/30"
                : "text-red-400 border-red-800 hover:bg-red-900/30"
            }`}
          >
            View All <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
    </div>
  );
}

function MessageCard({
  message,
  type,
  isHovered,
  onHover,
  onLeave,
}: MessageCardProps) {
  const isPodbean = type === "podbean";
  const accentColor = isPodbean ? "purple" : "red";

  return (
    <a
      href={message.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block h-full"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
    >
      <motion.div
        whileHover={{ y: -5 }}
        className="h-full bg-gray-900 overflow-hidden rounded-md"
      >
        <div className="relative">
          <div className="relative overflow-hidden aspect-video">
            <img
              src={message.image.src}
              alt={message.title}
              className={`w-full h-full object-cover transition-transform duration-500 ${
                isHovered ? "scale-105" : "scale-100"
              }`}
            />
            <div
              className={`absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100`}
            />
            <div
              className={`absolute bottom-3 left-3 rounded-full px-2 py-0.5 text-xs font-medium text-white bg-${accentColor}-600/80 flex items-center gap-1`}
            >
              {isPodbean ? (
                <>
                  <Headphones className="h-3 w-3" /> Podbean
                </>
              ) : (
                <>
                  <Youtube className="h-3 w-3" /> YouTube
                </>
              )}
            </div>
          </div>
        </div>
        <div className="p-4">
          <h3 className="font-medium text-white mb-2 line-clamp-2 h-12">
            {message.title}
          </h3>
          <div className="flex items-center justify-between text-xs text-gray-400">
            <div className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              <span>{message.date}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-3 w-3 mr-1" />
              <span>{message.duration}</span>
            </div>
          </div>
        </div>
        <div className={`h-0.5 w-full bg-${accentColor}-700`}></div>
      </motion.div>
    </a>
  );
}
