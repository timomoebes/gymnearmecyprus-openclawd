import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/utils/schema';
import { GoogleAnalyticsClient } from '@/components/analytics/GoogleAnalyticsClient';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-poppins',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Gym Near Me Cyprus | Gyms & Fitness Directory',
  description: 'Find gyms near me in Cyprus. Compare fitness centers, open gyms, and 24/7 gyms by city or specialty. Ratings, hours, amenities — free directory.',
  keywords: 'gym near me, gyms near me, fitness near me, open gyms near me, gyms cyprus, fitness centers cyprus, gym limassol, gym nicosia, gym paphos',
  verification: {
    google: 'oDKi7ktL5Vx8VI8PdNDjfXUu8K2q6rFs0QIE40J1-Zs',
  },
};

export const viewport = { width: 'device-width', initialScale: 1 };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`} suppressHydrationWarning>
      <body className="bg-background-dark text-text-white antialiased">
        {/* Google Analytics 4 (only if measurement ID is configured) */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga4-init"
              strategy="afterInteractive"
            >{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}', {
                send_page_view: true
              });
            `}</Script>
          </>
        )}
        {/* Critical fallback + CTA buttons — exclusive palette (inline so they always load) */}
        <style dangerouslySetInnerHTML={{ __html: `
          body{background-color:#0A0E27;color:#fff;}
          .min-h-screen{min-height:100vh;}
          .btn-cta-primary{background:linear-gradient(135deg,#151b28 0%,#1e2836 100%)!important;color:#f5f0e8!important;border:1px solid rgba(184,168,138,.45)!important;box-shadow:0 2px 12px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.04);transition:border-color .25s ease,box-shadow .25s ease,transform .25s ease;}
          .btn-cta-primary:hover{border-color:rgba(212,196,160,.7)!important;box-shadow:0 6px 20px rgba(0,0,0,.3),inset 0 1px 0 rgba(255,255,255,.06);transform:translateY(-1px);}
          .btn-cta-primary:focus{outline:none;box-shadow:0 0 0 2px #0a0e27,0 0 0 4px rgba(184,168,138,.5);}
          .btn-cta-secondary{background:linear-gradient(135deg,#1f1a24 0%,#2a2432 100%)!important;color:#ede8e0!important;border:1px solid rgba(120,113,108,.4)!important;box-shadow:0 2px 12px rgba(0,0,0,.25),inset 0 1px 0 rgba(255,255,255,.03);transition:border-color .25s ease,box-shadow .25s ease,transform .25s ease;}
          .btn-cta-secondary:hover{border-color:rgba(168,162,158,.5)!important;box-shadow:0 6px 20px rgba(0,0,0,.35),inset 0 1px 0 rgba(255,255,255,.05);transform:translateY(-1px);}
          .btn-cta-secondary:focus{outline:none;box-shadow:0 0 0 2px #0a0e27,0 0 0 4px rgba(120,113,108,.45);}
          .btn-cta-outline{background:transparent!important;border:1px solid #475569;color:#cbd5e1;transition:background-color .25s ease,border-color .25s ease,color .25s ease,box-shadow .25s ease;}
          .btn-cta-outline:hover{background:rgba(71,85,105,.08)!important;border-color:#64748b;color:#e2e8f0;}
          .btn-cta-outline:focus{outline:none;box-shadow:0 0 0 2px #0a0e27,0 0 0 4px rgba(71,85,105,.5);}
          .badge-elegant-featured,.badge-elegant{background:linear-gradient(135deg,#151b28 0%,#1e2836 100%)!important;color:#f5f0e8!important;border:1px solid rgba(184,168,138,.5)!important;box-shadow:0 1px 6px rgba(0,0,0,.2);}
          .nav-cta-primary{background:linear-gradient(135deg,#151b28 0%,#1e2836 100%)!important;color:#f5f0e8!important;border:1px solid rgba(184,168,138,.45)!important;box-shadow:0 2px 10px rgba(0,0,0,.25);padding:.5rem 1.25rem;border-radius:9999px;font-size:.875rem;font-weight:600;transition:border-color .25s ease,box-shadow .25s ease,transform .25s ease;}
          .nav-cta-primary:hover{border-color:rgba(212,196,160,.7)!important;box-shadow:0 4px 16px rgba(0,0,0,.3);transform:translateY(-1px);}
          .nav-cta-outline{border:1px solid rgba(120,113,108,.5)!important;color:#e2e8f0!important;background:transparent!important;padding:.5rem 1rem;border-radius:9999px;font-size:.875rem;font-weight:500;transition:border-color .25s ease,color .25s ease;}
          .nav-cta-outline:hover{border-color:rgba(184,168,138,.5)!important;color:#f5f0e8;}
        ` }} />
        {/* Schema.org JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <Header />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Suspense fallback={null}>
          <GoogleAnalyticsClient />
        </Suspense>
      </body>
    </html>
  );
}

