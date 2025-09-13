"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, Clock, ExternalLink, Headphones, Youtube } from "lucide-react";
import {podbeanMessages, youtubeMessages} from "@/data/messagesData";

// Define the Message type
interface Message {
    id: string;
    title: string;
    date: string;
    duration: string;
    image?: string;
    url: string;
}


export default function SermonMessages() {
    const [activeTab, setActiveTab] = useState<"podbean" | "youtube">("podbean");
    const [hoveredItem, setHoveredItem] = useState<string | null>(null);

    return (
        <div className="w-full bg-black text-white px-4 py-16">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent">
                        Latest Sermons
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore our recent messages from Sunday services and special events.
                    </p>
                </div>

                {/* Tabs */}
                <div className="flex justify-center mb-12">
                    <div className="flex space-x-8">
                        <TabButton
                            isActive={activeTab === "podbean"}
                            onClick={() => setActiveTab("podbean")}
                            icon={<Headphones className="h-4 w-4" />}
                            label="Podbean"
                        />
                        <TabButton
                            isActive={activeTab === "youtube"}
                            onClick={() => setActiveTab("youtube")}
                            icon={<Youtube className="h-4 w-4" />}
                            label="YouTube"
                        />
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
                        className="inline-flex items-center justify-center px-6 py-2 text-sm font-medium transition-all border rounded-full text-gray-300 border-gray-600 hover:bg-gray-800/50"
                    >
                        View All <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </div>
            </div>
        </div>
    );
}

interface TabButtonProps {
    isActive: boolean;
    onClick: () => void;
    icon: React.ReactNode;
    label: string;
}

function TabButton({ isActive, onClick, icon, label }: TabButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`relative px-2 py-1 text-sm font-medium transition-colors ${
                isActive ? "text-gray-300" : "text-gray-500 hover:text-gray-400"
            }`}
        >
            <span className="flex items-center gap-2">{icon} {label}</span>
            {isActive && (
                <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-400"
                    initial={false}
                />
            )}
        </button>
    );
}

interface MessageCardProps {
    message: Message;
    type: "podbean" | "youtube";
    isHovered: boolean;
    onHover: () => void;
    onLeave: () => void;
}

function MessageCard({ message, type, isHovered, onHover, onLeave }: MessageCardProps) {
    const isPodbean = type === "podbean";

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
                className="h-full bg-gray-900/70 overflow-hidden rounded-xl border border-gray-700/30"
            >
                <div className="relative">
                    <div className="relative overflow-hidden aspect-video">
                        <img
                            src={message.image || "/placeholder.svg"}
                            alt={message.title}
                            className={`w-full h-full object-cover transition-transform duration-500 ${
                                isHovered ? "scale-105" : "scale-100"
                            }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100" />
                        <div className="absolute bottom-3 left-3 rounded-full px-2 py-0.5 text-xs font-medium text-white bg-gray-700/80 flex items-center gap-1">
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
                    <h3 className="font-medium text-gray-100 mb-2 line-clamp-2 h-12">{message.title}</h3>
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
                <div className="h-0.5 w-full bg-gray-600"></div>
            </motion.div>
        </a>
    );
}
