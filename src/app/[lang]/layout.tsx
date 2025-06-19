import type { Metadata } from 'next'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { LastUpdated, Layout, Navbar } from 'nextra-theme-docs'

import type { FC, ReactNode } from 'react'
import { Footer } from '@/components/footer'
import NeulandLogo from '@/components/icons/logo'
import { LocaleSwitcher } from '@/components/locale-switcher'
import { ThemeToggle } from '@/components/theme-toggle'
import { getDictionary } from '../_dictionaries/get-dictionary'
import './global.css'

export async function generateMetadata({
	params
}: {
	params: Promise<{ lang: string }>
}): Promise<Metadata> {
	const resolvedParams = await params
	const dictionary = await getDictionary(resolvedParams.lang)

	return {
		title: {
			default: dictionary.metadata.title,
			template: `%s | ${dictionary.metadata.title}`
		},
		description: dictionary.metadata.description,
		keywords: ['neuland', 'campus', 'university', 'app', 'ingolstadt', 'thi'],
		authors: [{ name: 'Neuland Ingolstadt e.V.' }],
		creator: 'Neuland Ingolstadt e.V.',
		publisher: 'Neuland Ingolstadt e.V.',
		metadataBase: new URL('https://neuland.app'),
		openGraph: {
			type: 'website',
			locale: resolvedParams.lang,
			alternateLocale: resolvedParams.lang === 'en' ? 'de' : 'en',
			title: dictionary.metadata.title,
			description: dictionary.metadata.description,
			siteName: dictionary.metadata.title,
			images: {
				url: '/og-image.webp'
			}
		},
		twitter: {
			title: dictionary.metadata.title,
			description: dictionary.metadata.description
		}
	}
}

type LayoutProps = Readonly<{
	children: ReactNode
	params: Promise<{
		lang: string
	}>
}>

const RootLayout: FC<LayoutProps> = async ({ children, params }) => {
	const resolvedParams = await params
	const { lang } = resolvedParams
	const dictionary = await getDictionary(lang)
	const pageMap = await getPageMap(`/${lang}`)

	return (
		<html lang="de" dir="ltr" suppressHydrationWarning>
			<Head />
			<body>
				<Layout
					sidebar={{
						autoCollapse: false,
						defaultMenuCollapseLevel: 1,
						toggleButton: true
					}}
					navbar={
						<Navbar
							logo={
								<div className="flex items-center gap-2 group cursor-pointer">
									<NeulandLogo
										className="h-6 w-6 rounded-lg object-contain transition-transform duration-300 group-hover:scale-110"
										color="currentColor"
									/>
									<span className="text-lg font-bold text-foreground">
										Neuland Next
									</span>
								</div>
							}
						>
							<div className="flex items-center gap-2">
								<ThemeToggle />
								<LocaleSwitcher />
							</div>
						</Navbar>
					}
					search={
						<Search
							placeholder={dictionary.search.placeholder}
							emptyResult={dictionary.search.emptyResult}
							errorText={dictionary.search.errorText}
							loading={dictionary.search.loading}
						/>
					}
					pageMap={pageMap}
					docsRepositoryBase="https://github.com/neuland-ingolstadt/neuland.app-docs/tree/main"
					feedback={{
						content: 'Feedback'
					}}
					toc={{
						backToTop: dictionary.toc.backToTop,
						title: dictionary.toc.onThisPage
					}}
					lastUpdated={<LastUpdated> {dictionary.lastUpdated}</LastUpdated>}
					editLink={dictionary.editPage}
					footer={<Footer />}
				>
					{children}
				</Layout>
			</body>
		</html>
	)
}

export default RootLayout
