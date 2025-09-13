"use client"

import {useEffect, useState} from "react"
import {ChevronLeft, ChevronRight, Search} from "lucide-react"
import {branchData, type BranchItem} from "@/data/branchData"
import BranchModal from "@/components/branches/branchModal";
import BranchCard from "@/components/branches/branchCard";

export default function BranchesPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [serviceFilter, setServiceFilter] = useState("all")
    const [currentPage, setCurrentPage] = useState(0)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedBranch, setSelectedBranch] = useState<BranchItem | null>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Check if we're on mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        window.addEventListener("resize", checkMobile)

        return () => {
            window.removeEventListener("resize", checkMobile)
        }
    }, [])

    const filteredBranches = branchData.filter((branch) => {
        // Search filter
        const matchesSearch =
            branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.pastor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            branch.location.toLowerCase().includes(searchQuery.toLowerCase())

        // Service filter
        if (serviceFilter === "all") return matchesSearch
        if (serviceFilter === "tuesday") return matchesSearch && branch.services.tuesday
        if (serviceFilter === "friday") return matchesSearch && branch.services.friday
        if (serviceFilter === "sunday") {
            return (
                matchesSearch &&
                (branch.services.sunday.morning || branch.services.sunday.afternoon || branch.services.sunday.evening)
            )
        }

        return matchesSearch
    })

    // Calculate total pages
    const branchesPerPage = 9
    const totalPages = Math.ceil(filteredBranches.length / branchesPerPage)

    const nextPage = () => {
        setCurrentPage((prevPage) => (prevPage + 1) % totalPages)
    }

    const prevPage = () => {
        setCurrentPage((prevPage) => (prevPage - 1 + totalPages) % totalPages)
    }

    const goToPage = (pageIndex: number) => {
        setCurrentPage(pageIndex)
    }

    // Get the current page branches
    const startIndex = currentPage * branchesPerPage
    const endIndex = startIndex + branchesPerPage
    const visibleBranches = filteredBranches.slice(startIndex, endIndex)

    const handleBranchClick = (branch: BranchItem) => {
        setSelectedBranch(branch)
        setIsModalOpen(true)
    }

    return (
        <div className="bg-gradient-to-b pt-28 from-[#0a0a0a] to-[#121212] min-h-screen flex flex-col items-center justify-center px-3 md:px-6 py-16 relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-10 w-40 h-40 rounded-full bg-amber-500/5 blur-3xl"></div>
                <div className="absolute bottom-1/4 right-10 w-48 h-48 rounded-full bg-amber-500/5 blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[url('/placeholder.svg?height=10&width=10')] bg-repeat opacity-5"></div>
            </div>

            {/* Title Section */}
            <div className="w-full max-w-6xl text-center md:text-left mb-8">
                <div className="flex items-center justify-center md:justify-start mb-3">
                    <div className="h-0.5 w-12 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full mr-3"></div>
                    <span className="text-amber-400 uppercase tracking-wider text-xs font-medium">Find Your Community</span>
                </div>

                <h1 className="text-white text-xl sm:text-2xl md:text-3xl leading-tight font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-amber-100 to-white">
                    Our Branch Churches
                </h1>

                <p className="text-amber-100/70 mt-4 max-w-xl mx-auto md:mx-0 text-sm">
                    Find a branch near you and join us for worship. Our branches are located throughout the city to serve you
                    better.
                </p>
            </div>

            {/* Search and Filter */}
            <div className="w-full max-w-6xl mb-8">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-amber-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search by branch name, pastor, or location..."
                            className="w-full px-10 py-2 bg-white/5 backdrop-blur-sm border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500/50 text-white placeholder:text-gray-400"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    {/* Custom Tabs */}
                    <div className="w-full md:w-auto">
                        <div className="flex rounded-md overflow-hidden border border-white/10 shadow-sm backdrop-blur-sm">
                            <button
                                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                                    serviceFilter === "all"
                                        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                                        : "bg-white/5 text-gray-200 hover:bg-white/10"
                                }`}
                                onClick={() => setServiceFilter("all")}
                            >
                                All
                            </button>
                            <button
                                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                                    serviceFilter === "tuesday"
                                        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                                        : "bg-white/5 text-gray-200 hover:bg-white/10"
                                }`}
                                onClick={() => setServiceFilter("tuesday")}
                            >
                                Tuesday
                            </button>
                            <button
                                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                                    serviceFilter === "friday"
                                        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                                        : "bg-white/5 text-gray-200 hover:bg-white/10"
                                }`}
                                onClick={() => setServiceFilter("friday")}
                            >
                                Friday
                            </button>
                            <button
                                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                                    serviceFilter === "sunday"
                                        ? "bg-gradient-to-r from-amber-600 to-amber-500 text-white"
                                        : "bg-white/5 text-gray-200 hover:bg-white/10"
                                }`}
                                onClick={() => setServiceFilter("sunday")}
                            >
                                Sunday
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Branch Cards */}
            <div className="w-full max-w-6xl">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-white text-lg font-medium">Branch Locations</h2>
                    <div className="flex gap-2">
                        <button
                            onClick={prevPage}
                            disabled={currentPage === 0}
                            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Previous branches"
                        >
                            <ChevronLeft className="text-white text-xs" size={16} />
                        </button>
                        <button
                            onClick={nextPage}
                            disabled={currentPage === totalPages - 1 || totalPages === 0}
                            className="w-8 h-8 flex items-center justify-center bg-white/10 backdrop-blur-sm rounded-full shadow-md hover:bg-white/20 transition border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
                            aria-label="Next branches"
                        >
                            <ChevronRight className="text-white text-xs" size={16} />
                        </button>
                    </div>
                </div>

                <div className="relative overflow-hidden">
                    <div className="flex transition-transform duration-300 ease-in-out" style={{ transform: `translateX(0)` }}>
                        {visibleBranches.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                                {visibleBranches.map((branch) => (
                                    <BranchCard key={branch.id} branch={branch} onClick={handleBranchClick} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-12 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 w-full">
                                <p className="text-amber-400">No branches found matching your search criteria.</p>
                            </div>
                        )}
                    </div>
                </div>

                {/* Pagination indicators */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-6 gap-2">
                        {Array.from({ length: totalPages }).map((_, index) => (
                            <button
                                key={index}
                                onClick={() => goToPage(index)}
                                className={`w-3 h-3 rounded-full transition-colors ${
                                    currentPage === index ? "bg-amber-500" : "bg-white/30"
                                }`}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Branch Modal */}
            {isModalOpen && selectedBranch && <BranchModal branch={selectedBranch} onClose={() => setIsModalOpen(false)} />}
        </div>
    )
}
