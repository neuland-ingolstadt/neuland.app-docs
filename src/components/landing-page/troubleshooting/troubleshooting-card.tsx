'use client'

import type { TroubleshootingCard as TroubleshootingCardType } from './types'

interface TroubleshootingCardProps {
	card: TroubleshootingCardType
}

export function TroubleshootingCard({ card }: TroubleshootingCardProps) {
	const { icon: Icon, title, description, gradient, link } = card

	return (
		<div className="h-full animate-card-hover">
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				className="group relative p-6 rounded-2xl border border-primary/10 bg-card/50 backdrop-blur-xs hover:border-primary/20 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 h-full block"
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
			</a>
		</div>
	)
}
