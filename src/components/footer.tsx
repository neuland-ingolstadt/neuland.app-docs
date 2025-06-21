'use client'
import {
	ExternalLink,
	Github,
	Linkedin,
	ScrollText,
	ShieldCheck,
	ShieldIcon
} from 'lucide-react'
import { useTranslation } from '@/lib/useTranslations'
import NeulandLogo from './icons/logo'

export function Footer() {
	const { t } = useTranslation()
	const fullCommitHash = process.env.NEXT_PUBLIC_COMMIT_HASH || 'development'
	const commitHash =
		typeof fullCommitHash === 'string' && fullCommitHash !== 'development'
			? fullCommitHash.substring(0, 7)
			: fullCommitHash
	return (
		<footer className="bg-muted/10 border-t">
			<div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
				<div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
					<div className="lg:col-span-2">
						<div className="flex items-center gap-2 mb-4">
							<NeulandLogo className="h-6 w-6" color="currentColor" />
							<span className="text-xl font-bold text-foreground">
								Neuland Next
							</span>
						</div>
						<p className="text-muted-foreground max-w-md">
							{t('footer.description')}
						</p>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							{t('footer.sections.links.title')}
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="https://github.com/neuland-ingolstadt"
									target="_blank"
									rel="noopener noreferrer"
									className="group text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<Github className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
									GitHub
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/company/neuland-ingolstadt/"
									target="_blank"
									rel="noopener noreferrer"
									className="group text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<Linkedin className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href="https://neuland-ingolstadt.de"
									target="_blank"
									rel="noopener noreferrer"
									className="group text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ExternalLink className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-1 group-hover:scale-110" />
									{t('footer.sections.links.website')}
								</a>
							</li>
						</ul>
					</div>

					<div>
						<h3 className="text-sm font-semibold text-foreground mb-4">
							{t('footer.sections.contact.title')}
						</h3>
						<ul className="space-y-2">
							<li>
								<a
									href="/legal/imprint"
									className="group text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ScrollText className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
									{t('footer.sections.contact.imprint')}
								</a>
							</li>
							<li>
								<a
									href="/legal/privacy"
									className="group text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ShieldCheck className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
									{t('footer.sections.contact.privacy')} App
								</a>
							</li>
							<li>
								<a
									href="https://neuland-ingolstadt.de/legal/datenschutz"
									target="_blank"
									rel="noopener noreferrer"
									className="group text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ShieldIcon className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:scale-110" />
									{t('footer.sections.contact.privacy')} Website
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 border-t pt-8">
					<div className="text-center text-sm text-muted-foreground">
						<p>{t('footer.copyright.text')}</p>
						<p>{t('footer.copyright.rights')}</p>
						<p className="text-xs text-muted-foreground/40 mt-2 font-mono">
							Build:{' '}
							{commitHash !== 'development' ? (
								<a
									href={`https://github.com/neuland-ingolstadt/neuland.app-docs/commit/${fullCommitHash}`}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-primary transition-colors duration-200 underline decoration-dotted underline-offset-2"
									title="View commit on GitHub"
								>
									{commitHash}
								</a>
							) : (
								<span title="Development build">{commitHash}</span>
							)}
						</p>
					</div>
				</div>
			</div>
		</footer>
	)
}
