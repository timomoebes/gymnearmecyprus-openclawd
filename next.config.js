/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_DISABLE_HCAPTCHA: process.env.NEXT_PUBLIC_DISABLE_HCAPTCHA,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  experimental: {
    // Avoid bundling Supabase into vendor chunks (fixes MODULE_NOT_FOUND for vendor-chunks on server)
    serverComponentsExternalPackages: ['@supabase/ssr', '@supabase/supabase-js'],
  },
}

module.exports = nextConfig

