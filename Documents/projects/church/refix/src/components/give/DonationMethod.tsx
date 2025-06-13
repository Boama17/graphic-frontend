"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Smartphone, Building, Phone, Copy, Check, ChevronDown, DollarSign } from "lucide-react"

type MethodDetail = {
  label: string
  value: string
}

type Method = {
  icon: React.ElementType
  iconColor: string
  name: string
  titleColor: string
  bgColor: string
  borderColor: string
  details: MethodDetail[]
  instructions: string
}

type DonationMethodsProps = {
  className?: string
  textClassName?: string
}

const DonationMethods: React.FC<DonationMethodsProps> = ({
  className = "",
  textClassName = "",
}) => {
  const [activeTab, setActiveTab] = useState<"mobile" | "bank">("mobile")
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

  const mobileMethods: Method[] = [
    {
      icon: Phone,
      iconColor: "text-yellow-500",
      name: "MTN Mobile Money",
      titleColor: "text-yellow-500",
      bgColor: "bg-yellow-950/40",
      borderColor: "border-yellow-800/30",
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
      details: [
        { label: "Account Name", value: "LOVEREIGN BIBLE CHURCH" },
        { label: "Phone", value: "057 441 0001" },
      ],
      instructions: "Open your AT Money app, select 'Transfer' and enter our phone number.",
    },
  ]

  const bankMethods: Method[] = [
    {
      icon: Building,
      iconColor: "text-blue-400",
      name: "USD Account",
      titleColor: "text-blue-400",
      bgColor: "bg-blue-950/40",
      borderColor: "border-blue-800/30",
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
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      borderColor: "rgba(255, 255, 255, 0.2)",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
      y: 0,
    },
    inactive: {
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      boxShadow: "0 2px 6px rgba(0, 0, 0, 0.05)",
      y: 2,
    },
  }

  const methodVariants = {
    collapsed: {
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut" },
    },
    expanded: {
      height: "auto",
      transition: { duration: 0.5, ease: "easeInOut" },
    },
  }

  const detailsVariants = {
    hidden: {
      opacity: 0,
      height: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: { duration: 0.3, ease: "easeInOut", staggerChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  }

  const renderMethods = (methods: Method[]) => {
    return methods.map((method, index) => (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        className={`relative overflow-hidden rounded-xl ${method.bgColor} border ${method.borderColor} backdrop-blur-md mb-4`}
        variants={{methodVariants}}
        layout
      >
        {/* Method header - always visible */}
        <div className="p-4 cursor-pointer flex items-center justify-between" onClick={() => toggleExpand(index)}>
          <div className="flex items-center gap-3">
            <div className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center`}>
              <method.icon className={method.iconColor} size={20} />
            </div>
            <h3 className={`font-medium ${method.titleColor}`}>{method.name}</h3>
          </div>
          <motion.div animate={{ rotate: expandedMethod === index ? 180 : 0 }} transition={{ duration: 0.3 }}>
            <ChevronDown className="text-white/70" size={18} />
          </motion.div>
        </div>

        {/* Method details - shown when expanded */}
        <AnimatePresence>
          {expandedMethod === index && (
            <motion.div
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{detailsVariants}}
              className="px-4 pb-4"
            >
              <div className="space-y-3 mb-4">
                {method.details.map((detail, detailIndex) => (
                  <motion.div
                    key={detailIndex}
                    variants={itemVariants}
                    className="flex items-center justify-between bg-black/20 p-3 rounded-lg border border-white/5"
                  >
                    <p className="text-sm text-white/60">{detail.label}</p>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-white">{detail.value}</span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          copyToClipboard(detail.value)
                        }}
                        className="text-white/60 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
                        title="Copy to clipboard"
                        type="button"
                      >
                        {copiedText === detail.value ? (
                          <Check size={14} className="text-green-400" />
                        ) : (
                          <Copy size={14} />
                        )}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Instructions */}
              <motion.div
                variants={itemVariants}
                className="bg-white/5 border border-white/10 rounded-lg p-3 text-sm text-white/70 italic"
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
    <div className={`py-16 ${className}`}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br from-amber-500/20 to-purple-500/20 flex items-center justify-center border border-white/10"
            >
              <DollarSign className="text-amber-400" size={28} />
            </motion.div>
          </div>

          {/* Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-black/30 backdrop-blur-md p-1.5 rounded-xl border border-white/10 flex gap-2">
              <motion.button
                variants={tabVariants}
                animate={activeTab === "mobile" ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("mobile")}
                className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium"
                type="button"
              >
                <Smartphone size={16} />
                <span>Mobile Money</span>
              </motion.button>

              <motion.button
                variants={tabVariants}
                animate={activeTab === "bank" ? "active" : "inactive"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setActiveTab("bank")}
                className="flex items-center gap-2 py-2 px-4 rounded-lg text-sm font-medium"
                type="button"
              >
                <Building size={16} />
                <span>Bank Transfer</span>
              </motion.button>
            </div>
          </div>

          {/* Content */}
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl"></div>

            {/* Main card */}
            <motion.div
              className="relative bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-2xl p-[1px] pointer-events-none">
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-white/5 opacity-50"></div>
              </div>

              {/* Card content */}
              <div className="p-6">
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
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default DonationMethods
