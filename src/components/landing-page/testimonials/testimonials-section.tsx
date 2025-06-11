'use client'

import { useInView } from 'framer-motion'
import { Quote } from 'lucide-react'
import React from 'react'
import { useTranslation } from '@/lib/useTranslations'
import { SectionHeader } from '../section-header'
import { TestimonialCard } from './testimonial-card'
import { useTestimonials } from './testimonials-data'

interface RatingBoxProps {
	platform: string
	rating: string
}

function RatingBox({ platform, rating }: RatingBoxProps) {
	const { t } = useTranslation()
	const ref = React.useRef(null)
	const isInView = useInView(ref, { once: true, margin: '-100px' })
	const [displayRating, setDisplayRating] = React.useState('0.0')

	React.useEffect(() => {
		if (isInView) {
			const targetRating = parseFloat(rating)
			let currentRating = 0
			const duration = 1000 // 1 second
			const steps = 20
			const increment = targetRating / steps
			const interval = duration / steps

			const timer = setInterval(() => {
				currentRating += increment
				if (currentRating >= targetRating) {
					currentRating = targetRating
					clearInterval(timer)
				}
				setDisplayRating(currentRating.toFixed(1))
			}, interval)

			return () => clearInterval(timer)
		}
	}, [isInView, rating])

	return (
		<div
			ref={ref}
			className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 bg-card/50 backdrop-blur-sm px-5 py-3 rounded-4xl shadow-sm border border-primary/20 animate-rating-box-hover"
		>
			<span className="font-semibold text-primary">{platform}</span>
			<div className="flex items-center gap-1 sm:gap-2">
				<span className="text-yellow-600 font-bold">{displayRating}</span>
				<span className="text-muted-foreground">
					{t('testimonials.ratings.maxRating')}
				</span>
				<svg
					className="w-5 h-5 text-yellow-600"
					fill="currentColor"
					viewBox="0 0 20 20"
					aria-hidden="true"
				>
					<path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
				</svg>
			</div>
		</div>
	)
}

export function TestimonialsSection() {
	const { t } = useTranslation()
	const testimonials = useTestimonials()

	return (
		<section className="py-20 sm:py-32 relative overflow-hidden bg-muted/30">
			{/* Decorative background elements */}
			<div className="absolute inset-0 pointer-events-none">
				<div className="absolute top-1/4 left-[5%] w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl animate-pulse" />
				<div className="absolute bottom-1/4 right-[5%] w-48 h-48 bg-yellow-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
			</div>

			<div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
				<div className="relative">
					<SectionHeader
						icon={Quote}
						title={t('testimonials.title')}
						description={t('testimonials.description')}
						iconColor="text-yellow-600"
						titleColor="from-yellow-600 to-yellow-600/60"
					/>

					<div className="flex justify-center items-center gap-8 mt-6">
						<RatingBox
							platform={t('testimonials.ratings.platforms.appStore')}
							rating="5.0"
						/>
						<RatingBox
							platform={t('testimonials.ratings.platforms.googlePlay')}
							rating="4.8"
						/>
					</div>

					<div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
						{testimonials.map((testimonial, index) => (
							<TestimonialCard
								key={`testimonial-${testimonial.author}-${index}`}
								testimonial={{
									...testimonial,
									delay: 0.2 + index * 0.1
								}}
							/>
						))}
					</div>
				</div>
			</div>
		</section>
	)
}
