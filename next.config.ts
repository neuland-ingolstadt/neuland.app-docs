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
    // Use the raw assets instead of the Next.js image optimizer to avoid runtime breakage
    // (e.g., when proxies/CDNs don't forward _next/image correctly).
    unoptimized: true,
    loader: 'default',
  },
  // React Compiler currently breaks the landing page during SSR in production; keep it off.
  reactCompiler: false,

  experimental: {
    optimizePackageImports: [],
    webpackMemoryOptimizations: true,
  }
}))
