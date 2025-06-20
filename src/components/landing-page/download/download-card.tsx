'use client'

import Image from 'next/image'
import { useState } from 'react'
import Confetti from 'react-confetti-boom'
import type { DownloadCardProps } from './types'

export function DownloadCard({ option }: DownloadCardProps) {
	const {
		title,
		description,
		href,
		icon: Icon,
		imageSrc,
		imageAlt,
		gradientColors
	} = option
	const [showConfetti, setShowConfetti] = useState(false)
	const [clickPosition, setClickPosition] = useState({ x: 0.5, y: 0.5 })

	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()

		const rect = e.currentTarget.getBoundingClientRect()
		const x = (rect.left + rect.width / 2) / window.innerWidth
		const y = (rect.top + rect.height / 2) / window.innerHeight

		setClickPosition({ x, y })
		setShowConfetti(true)

		setTimeout(() => {
			window.location.href = href
		}, 1750)
	}

	return (
		<div className="relative">
			{showConfetti && (
				<div className="fixed inset-0 z-[9999] pointer-events-none">
					<Confetti
						mode="boom"
						particleCount={120}
						colors={[
							'#9b0bc7',
							'#10c000',
							'#00BFFF',
							'#FFD700',
							'#FF4500',
							'#003cd4'
						]}
						x={clickPosition.x}
						y={clickPosition.y}
						deg={270}
						spreadDeg={40}
						shapeSize={8}
						launchSpeed={0.6}
						effectCount={1}
					/>
				</div>
			)}
			<a
				href={href}
				onClick={handleClick}
				className="group relative block animate-card-hover animate-card-tap"
			>
				<div className="relative h-full p-8 rounded-3xl border border-primary/10 hover:border-primary/20 bg-card/40 backdrop-blur-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">
					<div className="flex flex-col items-center text-center space-y-6">
						<div className="relative animate-icon-hover">
							<div
								className={`absolute inset-0 bg-gradient-to-r ${gradientColors.from} ${gradientColors.to} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
							/>
							{imageSrc && imageAlt ? (
								<Image
									src={imageSrc}
									alt={imageAlt}
									width={56}
									height={56}
									className="h-14 w-auto relative z-10"
								/>
							) : (
								Icon && (
									<Icon className="h-14 w-14 text-primary relative z-10" />
								)
							)}
						</div>
						<div className="space-y-2">
							<div className="text-sm font-medium text-muted-foreground/90 group-hover:text-muted-foreground/80 transition-colors">
								{description}
							</div>
							<div className="text-xl font-semibold text-primary group-hover:text-primary/80 transition-all duration-500">
								{title}
							</div>
						</div>
					</div>
				</div>
			</a>
		</div>
	)
}
