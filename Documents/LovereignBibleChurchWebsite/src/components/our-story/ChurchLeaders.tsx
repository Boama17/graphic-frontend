"use client"

import {useRef, useState} from "react"
import {AnimatePresence, motion, useInView} from "framer-motion"
import {Search} from "lucide-react"
import {leaderData} from "@/data/LeaderData";
import LeaderCard from "@/components/ui/LeaderCard";


export default function ChurchLeadership() {
    const [searchTerm, setSearchTerm] = useState("")
    const [selectedCategory, setSelectedCategory] = useState("All")
    const containerRef = useRef<HTMLDivElement>(null)
    const headerRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(containerRef, { once: true })
    const isHeaderInView = useInView(headerRef, {once: true })

    // Categories
    const categories = ["All", "Headquarters", "Church Planters"]

    // Filter leaders based on search term and category
    const filteredLeaders = leaderData.filter((leader) => {
        const matchesSearch =
            leader.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            leader.location.toLowerCase().includes(searchTerm.toLowerCase())

        // Filter logic for categories
        let matchesCategory = selectedCategory === "All"

        if (selectedCategory === "Headquarters") {
            matchesCategory = leader.location === "Headquarters"
        } else if (selectedCategory === "Church Planters") {
            matchesCategory = leader.location !== "Headquarters"
        }

        return matchesSearch && matchesCategory
    })

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    }

    return (
        <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 mb-60 text-white">
            <div ref={headerRef} className="max-w-5xl mx-auto text-center mb-10">
                <motion.h1
                    initial={{ opacity: 0, y: -10 }}
                    animate={isHeaderInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl sm:text-4xl font-bold text-white mb-4"
                >
                    Church Pastors
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-base text-gray-300 max-w-2xl mx-auto mb-8"
                >
                    Serving with dedication across over 20 branches throughout the country
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8"
                    initial={{ opacity: 0 }}
                    animate={isHeaderInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="relative w-full max-w-xs">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        <input
                            type="text"
                            placeholder="Search by name or location..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
                        />
                    </div>

                    <div className="flex gap-2 flex-wrap justify-center">
                        {categories.map((category) => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                                    selectedCategory === category
                                        ? "bg-blue-600 text-white"
                                        : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                                }`}
                            >
                                {category}
                            </button>
                        ))}
                    </div>
                </motion.div>
            </div>

            <motion.div
                ref={containerRef}
                className="max-w-6xl mx-auto"
                variants={containerVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
            >
                <AnimatePresence>
                    {filteredLeaders.length > 0 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
                            {filteredLeaders.map((leader, index) => (
                                <LeaderCard key={leader.id} leader={leader} index={index} />
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="text-center py-10"
                        >
                            <p className="text-base text-gray-400">No leaders found matching your search criteria.</p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

            {/* Stats Section */}
            <motion.div
                className="mt-16 max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
                initial={{ opacity: 0 }}
                animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
            >
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                    <h3 className="text-3xl font-bold text-blue-400">{leaderData.length}+</h3>
                    <p className="mt-1 text-xs text-gray-300">Church Pastors</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                    <h3 className="text-3xl font-bold text-purple-400">20+</h3>
                    <p className="mt-1 text-xs text-gray-300">Branches</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                    <h3 className="text-3xl font-bold text-indigo-400">15+</h3>
                    <p className="mt-1 text-xs text-gray-300">Cities</p>
                </div>
                <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 border border-gray-700">
                    <h3 className="text-3xl font-bold text-sky-400">1000+</h3>
                    <p className="mt-1 text-xs text-gray-300">Members</p>
                </div>
            </motion.div>
        </div>
    )
}
