'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'
import { useState } from 'react'
import type { FAQItemProps } from './types'

export function FAQItem({ faq, isOpen, onToggle }: FAQItemProps) {
	const [isHovered, setIsHovered] = useState(false)

	return (
		<motion.button
			onClick={onToggle}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			className="w-full text-left p-6 rounded-xl bg-card/60 backdrop-blur-xs border border-primary/20 relative overflow-hidden"
			type="button"
		>
			{/* Gradient overlay on hover */}
			<motion.div
				className="absolute inset-0 bg-gradient-to-r from-primary/5 to-primary/10"
				initial={{ opacity: 0 }}
				animate={{ opacity: isHovered ? 1 : 0 }}
				transition={{ duration: 0.3 }}
			/>

			{/* Enhanced border effect */}
			<motion.div
				className="absolute inset-0 rounded-xl border-2"
				initial={{
					borderColor: 'rgba(var(--primary), 0.2)',
					boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)'
				}}
				animate={{
					borderColor: isHovered
						? 'rgba(var(--primary), 0.4)'
						: 'rgba(var(--primary), 0.2)',
					boxShadow: isHovered
						? '0 8px 25px rgba(var(--primary), 0.15)'
						: '0 2px 8px rgba(0, 0, 0, 0.1)'
				}}
				transition={{ duration: 0.3 }}
			/>

			<div className="relative z-10">
				<div className="flex items-center justify-between gap-4">
					<motion.h3
						className="text-lg font-semibold"
						initial={{ color: 'hsl(var(--foreground))' }}
						animate={{
							color: isHovered
								? 'hsl(var(--primary))'
								: 'hsl(var(--foreground))'
						}}
						transition={{ duration: 0.3 }}
					>
						{faq.question}
					</motion.h3>
					<div className="flex-shrink-0">
						<motion.div
							animate={{
								rotate: isHovered ? 5 : 0
							}}
							transition={{ duration: 0.2 }}
						>
							{isOpen ? (
								<Minus className="h-5 w-5 text-primary" />
							) : (
								<motion.div
									animate={{
										color: isHovered
											? 'hsl(var(--primary))'
											: 'hsl(var(--muted-foreground))'
									}}
									transition={{ duration: 0.3 }}
								>
									<Plus className="h-5 w-5" />
								</motion.div>
							)}
						</motion.div>
					</div>
				</div>
				<AnimatePresence>
					{isOpen && (
						<motion.div
							initial={{ height: 0, opacity: 0 }}
							animate={{ height: 'auto', opacity: 1 }}
							exit={{ height: 0, opacity: 0 }}
							transition={{ duration: 0.3, ease: 'easeInOut' }}
							className="overflow-hidden"
						>
							<p className="mt-4 text-muted-foreground leading-relaxed">
								{faq.answer}
							</p>
						</motion.div>
					)}
				</AnimatePresence>
			</div>
		</motion.button>
	)
}
