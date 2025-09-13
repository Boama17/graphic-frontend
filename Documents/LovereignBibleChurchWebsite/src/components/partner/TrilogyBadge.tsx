"use client"

import {useEffect, useState} from "react"
import {AnimatePresence, motion} from "framer-motion"
import {BookOpen, Sparkles} from "lucide-react"
import {usePathname} from "next/navigation"
import TrilogyModal from "./TrilogyModal"

const flyers = [
	{
		img: "/books/flyer1.jpg",
		alt: "The Gifts and Calling of God",
	},
	{
		img: "/books/flyer2.jpg",
		alt: "The Work of Ministry",
	},
	{
		img: "/books/flyer3.jpg",
		alt: "Church Systems and Structures",
	},
]

export default function TrilogyBadge() {
	const [isModalOpen, setIsModalOpen] = useState(false)
	const [isHovered, setIsHovered] = useState(false)
	const [current, setCurrent] = useState(0)
	const pathname = usePathname()

	// Open modal by default on home page
	/*
useEffect(() => {
    if (pathname === "/") setIsModalOpen(true)
}, [pathname])
*/

	return (
		<>
			{/* Floating Trilogy Badge */}
			<motion.div
				className="fixed right-0 top-[55%] -translate-y-1/2 z-30 cursor-pointer"
				initial={{ x: "50%" }}
				animate={{ x: isHovered ? "0%" : "50%" }}
				transition={{ duration: 0.3, ease: "easeOut" }}
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
				onClick={() => setIsModalOpen(true)}
			>
				<div className="relative">
					{/* Main Badge */}
					<div className="bg-gradient-to-l from-yellow-500 via-yellow-600 to-yellow-700 text-white px-6 py-4 rounded-l-2xl shadow-2xl border-l-4 border-yellow-300 min-w-[200px]">
						<div className="flex items-center gap-3">
							<motion.div
								className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center"
								animate={{
									scale: [1, 1.1, 1],
									rotate: [0, 5, -5, 0],
								}}
								transition={{
									duration: 2,
									repeat: Number.POSITIVE_INFINITY,
									ease: "easeInOut",
								}}
							>
								<BookOpen className="h-5 w-5 text-white" />
							</motion.div>
							<div className="flex-1">
								<div className="font-bold text-sm uppercase tracking-wide">
									Discover the
								</div>
								<div className="font-bold text-lg -mt-1">Trilogy</div>
							</div>
						</div>
						{/* Animated Sparkles */}
						<motion.div
							className="absolute -top-1 -left-1"
							animate={{
								scale: [0, 1, 0],
								rotate: [0, 180, 360],
							}}
							transition={{
								duration: 3,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
							}}
						>
							<Sparkles className="h-4 w-4 text-white" />
						</motion.div>
						<motion.div
							className="absolute -bottom-1 -right-1"
							animate={{
								scale: [0, 1, 0],
								rotate: [360, 180, 0],
							}}
							transition={{
								duration: 3,
								repeat: Number.POSITIVE_INFINITY,
								ease: "easeInOut",
								delay: 1.5,
							}}
						>
							<Sparkles className="h-3 w-3 text-white" />
						</motion.div>
					</div>
					{/* Pulse Effect */}
					<motion.div
						className="absolute inset-0 bg-yellow-400/30 rounded-l-2xl"
						animate={{
							scale: [1, 1.05, 1],
							opacity: [0.3, 0.6, 0.3],
						}}
						transition={{
							duration: 2,
							repeat: Number.POSITIVE_INFINITY,
							ease: "easeInOut",
						}}
					/>
					{/* Hover Text */}
					<AnimatePresence>
						{isHovered && (
							<motion.div
								className="absolute right-full top-1/2 -translate-y-1/2 mr-4 bg-yellow-700 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap shadow-lg"
								initial={{ opacity: 0, x: 10 }}
								animate={{ opacity: 1, x: 0 }}
								exit={{ opacity: 0, x: 10 }}
								transition={{ duration: 0.2 }}
							>
								See the Trilogy 
								<div className="absolute left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-yellow-700" />
							</motion.div>
						)}
					</AnimatePresence>
				</div>
			</motion.div>

			{/* Trilogy Modal */}
			<TrilogyModal
				isOpen={isModalOpen}
				onClose={() => setIsModalOpen(false)}
				flyers={flyers}
				current={current}
				setCurrent={setCurrent}
			/>
		</>
	)
}