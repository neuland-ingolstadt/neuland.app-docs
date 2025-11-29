import nextra from 'nextra'

const withNextra = nextra({
  defaultShowCopyCode: true,
  staticImage: false,
  contentDirBasePath: '/',
  unstable_shouldAddLocaleToLinks: true
})
 
export default (withNextra({
  reactStrictMode: false,
  i18n: {
    locales: ['de', 'en'],
    defaultLocale: 'en'
  },
  output: 'standalone',
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'github.com'
      }
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
    unoptimized: false,
    loader: 'default',
  },
      reactCompiler: true,

  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react'],
    webpackMemoryOptimizations: true,
  }
}))