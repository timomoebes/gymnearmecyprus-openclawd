import type { Metadata } from 'next';
import { Inter, Poppins } from 'next/font/google';
import './globals.css';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { generateOrganizationSchema, generateWebSiteSchema } from '@/lib/utils/schema';

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
  description: 'Gym directory for Cyprus—find and compare gyms, fitness centers, and 24/7 gyms by city or specialty.',
  keywords: 'gyms cyprus, fitness centers cyprus, gym limassol, gym nicosia, gym paphos',
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
        {/* Critical fallback so page is readable if Tailwind is delayed or fails */}
        <style dangerouslySetInnerHTML={{ __html: `
          body{background-color:#0A0E27;color:#fff;}
          .min-h-screen{min-height:100vh;}
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
      </body>
    </html>
  );
}

