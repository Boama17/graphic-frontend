"use client"

import type React from "react"
import {useState} from "react"
import {AnimatePresence, easeInOut, motion} from "framer-motion"
import {Building, Check, ChevronDown, Copy, Globe, Heart, Phone, Smartphone, Sparkles} from "lucide-react"

interface DonationDetail {
    label: string
    value: string
}

interface DonationMethod {
    icon: React.ElementType
    iconColor: string
    name: string
    titleColor: string
    bgColor: string
    borderColor: string
    glowColor?: string
    details: DonationDetail[]
    instructions: string
}

interface DonationMethodsProps {
    className?: string
    textClassName?: string
}

export default function DonationMethods({ className = ""}: DonationMethodsProps) {
    const [activeTab, setActiveTab] = useState("mobile")
    const [copiedText, setCopiedText] = useState<string | null>(null)
    const [expandedMethod, setExpandedMethod] = useState<number | null>(null)

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopiedText(text)
        setTimeout(() => setCopiedText(null), 2000)
    }

    const toggleExpand = (index: number) => {
        if (expandedMethod === index) {
            setExpandedMethod(null)
        } else {
            setExpandedMethod(index)
        }
    }

    const mobileMethods: DonationMethod[] = [
        {
            icon: Phone,
            iconColor: "text-yellow-500",
            name: "MTN Mobile Money",
            titleColor: "text-yellow-500",
            bgColor: "bg-yellow-950/40",
            borderColor: "border-yellow-800/30",
            glowColor: "from-yellow-500/20 to-yellow-600/5",
            details: [
                { label: "Momo Pay ID", value: "276822" },
                { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
                { label: "Phone", value: "024 237 1411" },
            ],
            instructions: "Open your MTN MoMo app, select 'Pay' and enter our MoMo Pay ID or phone number.",
        },
        {
            icon: Phone,
            iconColor: "text-red-500",
            name: "Telecel Cash",
            titleColor: "text-red-500",
            bgColor: "bg-red-950/40",
            borderColor: "border-red-800/30",
            glowColor: "from-red-500/20 to-red-600/5",
            details: [
                { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
                { label: "Phone", value: "050 658 7666" },
            ],
            instructions: "Dial *110# on your Telecel line, select 'Send Money' and enter our phone number.",
        },
        {
            icon: Phone,
            iconColor: "text-blue-500",
            name: "AT Money",
            titleColor: "text-blue-500",
            bgColor: "bg-blue-950/40",
            borderColor: "border-blue-800/30",
            glowColor: "from-blue-500/20 to-blue-600/5",
            details: [
                { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
                { label: "Phone", value: "057 441 0001" },
            ],
            instructions: "Open your AT Money app, select 'Transfer' and enter our phone number.",
        },
    ]

    const bankMethods: DonationMethod[] = [
        {
            icon: Building,
            iconColor: "text-blue-400",
            name: "USD Account",
            titleColor: "text-blue-400",
            bgColor: "bg-blue-950/40",
            borderColor: "border-blue-800/30",
            glowColor: "from-blue-400/20 to-blue-500/5",
            details: [
                { label: "Bank", value: "ECOBANK" },
                { label: "Account Name", value: "Lovereign Bible Church" },
                { label: "Account", value: "3441002209588" },
                { label: "Swift Code", value: "ECOCGHAC" },
            ],
            instructions:
                "For international transfers, please include the Swift Code. Transfers typically take 1-3 business days to process.",
        },
        {
            icon: Building,
            iconColor: "text-green-400",
            name: "Ghana Cedis Account",
            titleColor: "text-green-400",
            bgColor: "bg-green-950/40",
            borderColor: "border-green-800/30",
            glowColor: "from-green-400/20 to-green-500/5",
            details: [
                { label: "Bank", value: "ECOBANK" },
                { label: "Account Name", value: "Lovereign Bible Church" },
                { label: "Account", value: "1441000860595" },
            ],
            instructions:
                "For local transfers, please include 'Donation' in the reference field. Transfers are usually processed within 24 hours.",
        },
    ]

    const tabVariants = {
        active: {
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderColor: "rgba(255, 255, 255, 0.2)",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
            y: 0,
        },
        inactive: {
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            borderColor: "rgba(255, 255, 255, 0.1)",
            boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
            y: 2,
        },
    }

    const methodVariants = {
        collapsed: {
            height: "auto",
            transition: { duration: 0.3, ease: easeInOut },
        },
        expanded: {
            height: "auto",
            transition: { duration: 0.5, ease: easeInOut },
        },
    }

    const detailsVariants = {
        hidden: {
            opacity: 0,
            height: 0,
            transition: { duration: 0.2, ease: easeInOut },
        },
        visible: {
            opacity: 1,
            height: "auto",
            transition: { duration: 0.3, ease: easeInOut, staggerChildren: 0.1 },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 },
    }

    const renderMethods = (methods: DonationMethod[]) => {
        return methods.map((method, index) => (
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className={`relative overflow-hidden rounded-xl ${method.bgColor} border ${method.borderColor} backdrop-blur-md mb-6`}
                variants={methodVariants}
                layout
            >
                {/* Glow effect */}
                <div className="absolute inset-0 opacity-30">
                    <div
                        className={`absolute inset-0 bg-gradient-to-br ${method.glowColor || "from-white/10 to-white/5"} blur-xl`}
                    ></div>
                </div>

                {/* Method header - always visible */}
                <div
                    className="p-5 cursor-pointer flex items-center justify-between relative z-10"
                    onClick={() => toggleExpand(index)}
                >
                    <div className="flex items-center gap-4">
                        <div
                            className={`w-12 h-12 rounded-full bg-black/30 flex items-center justify-center border border-white/10 shadow-lg`}
                        >
                            <method.icon className={`${method.iconColor}`} size={22} />
                        </div>
                        <h3 className={`font-semibold text-lg ${method.titleColor}`}>{method.name}</h3>
                    </div>
                    <motion.div
                        animate={{ rotate: expandedMethod === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="w-8 h-8 rounded-full bg-black/20 flex items-center justify-center border border-white/10"
                    >
                        <ChevronDown className="text-white/70" size={16} />
                    </motion.div>
                </div>

                {/* Method details - shown when expanded */}
                <AnimatePresence>
                    {expandedMethod === index && (
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="hidden"
                            variants={detailsVariants}
                            className="px-5 pb-5 relative z-10"
                        >
                            <div className="space-y-3 mb-5">
                                {method.details.map((detail, detailIndex) => (
                                    <motion.div
                                        key={detailIndex}
                                        variants={itemVariants}
                                        className="flex items-center justify-between bg-black/30 p-4 rounded-lg border border-white/10 backdrop-blur-sm hover:bg-black/40 transition-colors"
                                    >
                                        <p className="text-sm font-medium text-white/70">{detail.label}</p>
                                        <div className="flex items-center gap-3">
                                            <span className="font-semibold text-white">{detail.value}</span>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    copyToClipboard(detail.value)
                                                }}
                                                className="text-white/60 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                                                title="Copy to clipboard"
                                            >
                                                {copiedText === detail.value ? (
                                                    <Check size={16} className="text-green-400" />
                                                ) : (
                                                    <Copy size={16} />
                                                )}
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Instructions */}
                            <motion.div
                                variants={itemVariants}
                                className="bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white/80 italic backdrop-blur-sm"
                            >
                                <p>{method.instructions}</p>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        ))
    }

    return (
        <div className={`py-20 ${className}`}>
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto"
                >
                    {/* Header */}
                    <div className="text-center mb-16">
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                            className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-white/10 shadow-lg"
                        >
                            <Heart className="text-amber-400" size={32} />
                        </motion.div>

                        <motion.h2
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-amber-200 via-amber-100 to-amber-200 bg-clip-text text-transparent"
                        >
                            Ways to Give
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                            className="text-amber-100/70 max-w-xl mx-auto"
                        >
                            Your generous donations help us continue our mission and support our community. Choose the method that
                            works best for you.
                        </motion.p>
                    </div>

                    {/* Tabs */}
                    <div className="flex justify-center mb-10">
                        <div className="bg-black/40 backdrop-blur-md p-1.5 rounded-2xl border border-white/10 flex gap-2 shadow-xl">
                            <motion.button
                                variants={tabVariants}
                                animate={activeTab === "mobile" ? "active" : "inactive"}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveTab("mobile")}
                                className={`flex items-center gap-2 py-3 px-6 rounded-xl text-sm font-medium ${
                                    activeTab === "mobile" ? "text-amber-100" : "text-white/70"
                                }`}
                            >
                                <Smartphone size={18} />
                                <span>Mobile Money</span>
                            </motion.button>

                            <motion.button
                                variants={tabVariants}
                                animate={activeTab === "bank" ? "active" : "inactive"}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => setActiveTab("bank")}
                                className={`flex items-center gap-2 py-3 px-6 rounded-xl text-sm font-medium ${
                                    activeTab === "bank" ? "text-amber-100" : "text-white/70"
                                }`}
                            >
                                <Building size={18} />
                                <span>Bank Transfer</span>
                            </motion.button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="relative">
                        {/* Decorative elements */}
                        <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl"></div>
                        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl"></div>

                        {/* Floating elements */}
                        <motion.div
                            className="absolute top-10 right-10 text-amber-500/20"
                            animate={{
                                y: [0, -15, 0],
                                rotate: [0, 10, 0],
                            }}
                            transition={{
                                duration: 6,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                            }}
                        >
                            <Sparkles size={24} />
                        </motion.div>

                        <motion.div
                            className="absolute bottom-10 left-10 text-purple-500/20"
                            animate={{
                                y: [0, 15, 0],
                                rotate: [0, -10, 0],
                            }}
                            transition={{
                                duration: 7,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatType: "reverse",
                                delay: 1,
                            }}
                        >
                            <Globe size={28} />
                        </motion.div>

                        {/* Main card */}
                        <motion.div
                            className="relative bg-black/50 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            {/* Gradient border effect */}
                            <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-amber-500/30 via-transparent to-purple-500/20 opacity-50"></div>
                            </div>

                            {/* Card content */}
                            <div className="p-6 md:p-8">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={activeTab}
                                        initial={{ opacity: 0, x: activeTab === "mobile" ? -20 : 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: activeTab === "mobile" ? 20 : -20 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        {activeTab === "mobile" ? renderMethods(mobileMethods) : renderMethods(bankMethods)}
                                    </motion.div>
                                </AnimatePresence>

                                {/* Bottom message */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="mt-6 text-center"
                                >
                                    <p className="text-white/60 text-sm italic">
                                        For any questions about donations, please contact our finance team at{" "}
                                        <a
                                            href="mailto:info@lovereignBibleChurch.org"
                                            className="text-amber-400 hover:text-amber-300 transition-colors"
                                        >
                                            info@lovereignBibleChurch.org
                                        </a>
                                    </p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
