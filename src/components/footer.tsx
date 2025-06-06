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
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<Github className="h-4 w-4" />
									GitHub
								</a>
							</li>
							<li>
								<a
									href="https://www.linkedin.com/company/neuland-ingolstadt/"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<Linkedin className="h-4 w-4" />
									LinkedIn
								</a>
							</li>
							<li>
								<a
									href="https://neuland-ingolstadt.de"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ExternalLink className="h-4 w-4" />
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
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ScrollText className="h-4 w-4" />
									{t('footer.sections.contact.imprint')}
								</a>
							</li>
							<li>
								<a
									href="/legal/privacy"
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ShieldCheck className="h-4 w-4" />
									{t('footer.sections.contact.privacy')} App
								</a>
							</li>
							<li>
								<a
									href="https://neuland-ingolstadt.de/legal/datenschutz"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-2"
								>
									<ShieldIcon className="h-4 w-4" />
									{t('footer.sections.contact.privacy')} Website
								</a>
							</li>
						</ul>
					</div>
				</div>

				<div className="mt-8 border-t pt-8">
					<p className="text-center text-sm text-muted-foreground">
						{t('footer.copyright.text')}
						<br />
						{t('footer.copyright.rights')}
						<br />
						<div className="text-xs text-muted-foreground/40 mt-2 font-mono">
							Build: <span title="Git commit hash">{commitHash}</span>
						</div>
					</p>
				</div>
			</div>
		</footer>
	)
}
