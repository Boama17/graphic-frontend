"use client"

import Image from "next/image"
import {Clock, MapPinned, Phone, User, X} from "lucide-react"
import type {BranchItem} from "@/data/branchData"

interface BranchModalProps {
    branch: BranchItem
    onClose: () => void
}

export default function BranchModal({ branch, onClose }: BranchModalProps) {
    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            <div className="bg-[#121212] border border-white/10 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
                <div className="sticky top-0 bg-[#121212] p-4 border-b border-white/10 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-white">{branch.name}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20"
                        aria-label="Close modal"
                    >
                        <X size={18} className="text-white" />
                    </button>
                </div>

                <div className="p-4 md:p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div>
                            <p className="text-amber-100/70 text-sm mb-4">
                                Led by {branch.pastor.name}, our {branch.name} is dedicated to serving the community with love and
                                compassion.
                            </p>

                            <div className="grid grid-cols-1 gap-4 mb-4">
                                <div className="flex items-start gap-3">
                                    <MapPinned className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-amber-400 text-xs font-medium mb-1">Location</h4>
                                        <p className="text-white text-sm">{branch.location || "Location not specified"}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <User className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-amber-400 text-xs font-medium mb-1">Pastor</h4>
                                        <p className="text-white text-sm">{branch.pastor.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Phone className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <div>
                                        <h4 className="text-amber-400 text-xs font-medium mb-1">Contact</h4>
                                        <p className="text-white text-sm">{branch.contact || "No contact information available"}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="flex items-start gap-3 mb-2">
                                    <Clock className="h-5 w-5 text-amber-400 mt-0.5 flex-shrink-0" />
                                    <h4 className="text-amber-400 text-sm font-medium">Service Schedule</h4>
                                </div>

                                <div className="space-y-2 pl-8">
                                    {branch.services.tuesday && (
                                        <div className="flex items-center">
                                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                                            <p className="text-white text-sm">
                                                <span className="font-medium">Tuesday:</span> {branch.services.tuesday.time}
                                            </p>
                                        </div>
                                    )}

                                    {branch.services.thursday && (
                                        <div className="flex items-center">
                                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                                            <p className="text-white text-sm">
                                                <span className="font-medium">Thursday:</span> {branch.services.thursday.time}
                                            </p>
                                        </div>
                                    )}

                                    {branch.services.friday && (
                                        <div className="flex items-center">
                                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                                            <p className="text-white text-sm">
                                                <span className="font-medium">Friday:</span> {branch.services.friday.time}
                                            </p>
                                        </div>
                                    )}

                                    {branch.services.sunday.morning && (
                                        <div className="flex items-center">
                                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                                            <p className="text-white text-sm">
                                                <span className="font-medium">Sunday Morning:</span> {branch.services.sunday.morning.time}
                                            </p>
                                        </div>
                                    )}

                                    {branch.services.sunday.afternoon && (
                                        <div className="flex items-center">
                                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                                            <p className="text-white text-sm">
                                                <span className="font-medium">Sunday Afternoon:</span> {branch.services.sunday.afternoon.time}
                                            </p>
                                        </div>
                                    )}

                                    {branch.services.sunday.evening && (
                                        <div className="flex items-center">
                                            <span className="w-1 h-1 bg-amber-400 rounded-full mr-1.5"></span>
                                            <p className="text-white text-sm">
                                                <span className="font-medium">Sunday Evening:</span> {branch.services.sunday.evening.time}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {branch.contact && (
                                <div className="flex flex-wrap gap-2">
                                    <a
                                        href={`tel:${branch.contact}`}
                                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-700 hover:to-amber-600 text-white text-xs rounded-full transition-colors"
                                    >
                                        <span>Call Branch</span>
                                    </a>
                                </div>
                            )}
                        </div>

                        <div className="flex justify-center items-center">
                            <div className="relative max-w-[250px]">
                                <div className="absolute -inset-3 bg-gradient-to-r from-amber-500/20 to-amber-700/20 rounded-lg blur-lg opacity-70"></div>
                                <div className="relative z-10 rounded-lg shadow-xl max-h-[300px] overflow-hidden">
                                    <Image
                                        src={branch.pastor.photo || "/images/branches/no-picture.png"}
                                        alt={branch.pastor.name}
                                        width={250}
                                        height={300}
                                        className="object-cover"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
