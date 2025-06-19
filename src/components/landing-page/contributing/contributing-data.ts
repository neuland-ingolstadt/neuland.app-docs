'use client'

import {
	BookText,
	Code2,
	GitBranch,
	Palette,
	SparklesIcon,
	Users
} from 'lucide-react'
import { useTranslation } from '@/lib/useTranslations'
import type { ContributingButton, ContributingCard } from './types'

export function useContributingCards() {
	const { t } = useTranslation()

	const cards: ContributingCard[] = [
		{
			icon: Code2,
			title: t('contributing.cards.development.title'),
			description: t('contributing.cards.development.description'),
			gradient: 'from-blue-400/20 to-sky-500/20',
			delay: 0.2
		},
		{
			icon: Palette,
			title: t('contributing.cards.design.title'),
			description: t('contributing.cards.design.description'),
			gradient: 'from-blue-400/20 to-sky-500/20',
			delay: 0.3
		},
		{
			icon: SparklesIcon,
			title: t('contributing.cards.testing.title'),
			description: t('contributing.cards.testing.description'),
			gradient: 'from-blue-400/20 to-sky-500/20',
			delay: 0.4
		},
		{
			icon: GitBranch,
			title: t('contributing.cards.features.title'),
			description: t('contributing.cards.features.description'),
			gradient: 'from-blue-400/20 to-sky-500/20',
			delay: 0.5
		}
	]

	return cards
}

export function useContributingButtons() {
	const { t } = useTranslation()

	const buttons: ContributingButton[] = [
		{
			href: '/docs/app/contribute',
			icon: BookText,
			label: t('contributing.buttons.docs.label'),
			variant: 'default',
			external: false
		},
		{
			href: 'https://neuland-ingolstadt.de',
			icon: Users,
			label: t('contributing.buttons.association.label'),
			variant: 'outline',
			external: true
		}
	]

	return buttons
}
