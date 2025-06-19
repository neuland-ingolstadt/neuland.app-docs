'use client'

import { Bug } from 'lucide-react'
import React, { useCallback, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { TroubleshootingCard as TroubleshootingCardType } from './types'

interface TroubleshootingCardProps {
	card: TroubleshootingCardType
}

export function TroubleshootingCard({ card }: TroubleshootingCardProps) {
	const { icon: Icon, title, description, gradient, link } = card

	// Only for the 'Report Bug' card
	const isBugCard = card.icon === Bug
	const [showBug, setShowBug] = useState(false)
	const bugRef = useRef<HTMLDivElement>(null)

	// Keep bug within viewport with margin
	const BUG_SIZE = 60
	const BUG_MARGIN = 20
	const [bugPos, setBugPos] = useState<{ x: number; y: number; angle: number }>(
		{ x: 0, y: 0, angle: 0 }
	)
	const animationRef = useRef<number | null>(null)
	const [hoverTimer, setHoverTimer] = useState<NodeJS.Timeout | null>(null)

	// Helper to clamp bug position
	const clamp = useCallback((val: number, min: number, max: number) => {
		return Math.max(min, Math.min(max, val))
	}, [])

	// Set initial bug position after mount (client only)
	React.useEffect(() => {
		if (typeof window !== 'undefined') {
			setBugPos({
				x: window.innerWidth / 2,
				y: window.innerHeight / 2,
				angle: 0
			})
		}
	}, [])

	// Start bug near the card on hover
	function handleMouseEnter(e: React.MouseEvent) {
		if (!isBugCard) return
		if (typeof window === 'undefined') return
		const rect = (e.target as HTMLElement).getBoundingClientRect()
		const startX = clamp(
			rect.left + rect.width / 2,
			BUG_MARGIN,
			window.innerWidth - BUG_SIZE - BUG_MARGIN
		)
		const startY = clamp(
			rect.top + rect.height / 2,
			BUG_MARGIN,
			window.innerHeight - BUG_SIZE - BUG_MARGIN
		)
		setBugPos({ x: startX, y: startY, angle: 0 })
		const timer = setTimeout(() => {
			setShowBug(true)
		}, 1000)
		setHoverTimer(timer)
	}

	function handleMouseLeave() {
		if (!isBugCard) return
		setShowBug(false)
		if (hoverTimer) {
			clearTimeout(hoverTimer)
			setHoverTimer(null)
		}
		if (animationRef.current) cancelAnimationFrame(animationRef.current)
	}

	// Natural wandering movement
	const wander = useCallback(() => {
		if (typeof window === 'undefined') return
		setBugPos((prev) => {
			const speed = 2 + Math.random() * 2 // px per frame
			let angle = prev.angle + (Math.random() - 0.5) * 0.3 // small random turn
			let x = prev.x + Math.cos(angle) * speed
			let y = prev.y + Math.sin(angle) * speed
			x = clamp(x, BUG_MARGIN, window.innerWidth - BUG_SIZE - BUG_MARGIN)
			y = clamp(y, BUG_MARGIN, window.innerHeight - BUG_SIZE - BUG_MARGIN)
			// If at edge, bounce
			if (x === BUG_MARGIN || x === window.innerWidth - BUG_SIZE - BUG_MARGIN)
				angle = Math.PI - angle
			if (y === BUG_MARGIN || y === window.innerHeight - BUG_SIZE - BUG_MARGIN)
				angle = -angle
			return { x, y, angle }
		})
		animationRef.current = requestAnimationFrame(wander)
	}, [clamp])

	React.useEffect(() => {
		if (!showBug) {
			if (animationRef.current) cancelAnimationFrame(animationRef.current)
			return
		}
		animationRef.current = requestAnimationFrame(wander)
		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current)
		}
	}, [showBug, wander])

	return (
		<div className="h-full animate-card-hover">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative p-6 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-xs hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full block"
				onMouseEnter={handleMouseEnter}
				onMouseLeave={handleMouseLeave}
			>
				<div
					className={`absolute inset-0 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
				/>
				<div className="relative flex flex-col items-center text-center space-y-4">
					<div className="relative animate-icon-hover">
						<Icon className="h-8 w-8 text-primary relative z-10" />
					</div>
					<div className="space-y-2">
						<h3 className="text-lg font-semibold text-primary">{title}</h3>
						<p className="text-sm text-muted-foreground/90">{description}</p>
					</div>
				</div>
				{/* Insane bug animation */}
				{isBugCard &&
					showBug &&
					typeof window !== 'undefined' &&
					createPortal(
						<div
							ref={bugRef}
							style={{
								position: 'fixed',
								left: 0,
								top: 0,
								zIndex: 99999,
								pointerEvents: 'none',
								transform: `translate(${bugPos.x}px, ${bugPos.y}px) rotate(${(bugPos.angle * 180) / Math.PI}deg)`,
								transition: 'none'
							}}
						>
							<svg width="70" height="70" viewBox="0 0 70 70" fill="none">
								<title>Animated bug</title>
								<defs>
									<radialGradient id="shadow" cx="50%" cy="50%" r="50%">
										<stop offset="0%" stop-color="#000" stop-opacity="0.3" />
										<stop offset="100%" stop-color="#000" stop-opacity="0" />
									</radialGradient>
								</defs>
								{/* Shadow */}
								<ellipse cx="35" cy="62" rx="18" ry="6" fill="url(#shadow)" />
								{/* Antennae */}
								<path
									d="M28 12 Q20 2 18 18"
									stroke="#222"
									strokeWidth="2"
									fill="none"
								/>
								<path
									d="M42 12 Q50 2 52 18"
									stroke="#222"
									strokeWidth="2"
									fill="none"
								/>
								{/* Body segments */}
								<ellipse cx="35" cy="44" rx="13" ry="16" fill="#222" />
								<ellipse cx="35" cy="32" rx="11" ry="10" fill="#333" />
								<ellipse cx="35" cy="22" rx="7" ry="7" fill="#222" />
								{/* Head */}
								<ellipse cx="35" cy="15" rx="5" ry="5.5" fill="#222" />
								{/* Eyes */}
								<circle cx="32.5" cy="13.5" r="1.2" fill="#fff" />
								<circle cx="37.5" cy="13.5" r="1.2" fill="#fff" />
								{/* Legs - left */}
								<path
									d="M22 38 Q10 40 8 55"
									stroke="#222"
									strokeWidth="2.2"
									fill="none"
								/>
								<path
									d="M24 46 Q14 50 12 62"
									stroke="#222"
									strokeWidth="2.2"
									fill="none"
								/>
								<path
									d="M28 54 Q22 60 20 68"
									stroke="#222"
									strokeWidth="2.2"
									fill="none"
								/>
								{/* Legs - right */}
								<path
									d="M48 38 Q60 40 62 55"
									stroke="#222"
									strokeWidth="2.2"
									fill="none"
								/>
								<path
									d="M46 46 Q56 50 58 62"
									stroke="#222"
									strokeWidth="2.2"
									fill="none"
								/>
								<path
									d="M42 54 Q48 60 50 68"
									stroke="#222"
									strokeWidth="2.2"
									fill="none"
								/>
							</svg>
						</div>,
						document.body
					)}
			</a>
		</div>
	)
}
