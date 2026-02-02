/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Avoid bundling Supabase into vendor chunks (fixes MODULE_NOT_FOUND for vendor-chunks on server)
  serverExternalPackages: ['@supabase/ssr', '@supabase/supabase-js'],
}

module.exports = nextConfig

