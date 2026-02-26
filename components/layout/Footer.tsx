import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Mail } from 'lucide-react';
import { cities } from '@/lib/data';
import { specialties } from '@/lib/data';

export const Footer: React.FC = () => {
  const majorCities = cities.slice(0, 6);
  const majorSpecialties = specialties.slice(0, 6);

  const footerLink =
    'text-[#94a3b8] hover:text-[#f5f0e8] transition-colors text-sm';
  const footerLinkAccent =
    'text-[#94a3b8] hover:text-[#f5f0e8] transition-colors text-sm font-medium';

  return (
    <footer className="bg-[#151b28] border-t border-[rgba(184,168,138,0.25)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div>
            <Link href="/" className="flex items-center mb-4 hover:opacity-90 transition-opacity">
              <Image
                src="/logo1.png"
                alt="Gym Near Me Cyprus Logo"
                width={400}
                height={200}
                className="h-20 w-auto object-contain"
              />
            </Link>
            <p className="text-[#94a3b8] text-sm mb-4">
              The #1 fitness directory for the best gyms across Cyprus.
            </p>
            <div className="space-y-2 text-sm text-[#94a3b8]">
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4 text-[rgba(184,168,138,0.6)]" />
                <span>gymnearmecyprus@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Cities Column */}
          <div>
            <h3 className="text-[#f5f0e8] font-semibold mb-4 pb-1 border-b border-[rgba(184,168,138,0.2)] w-fit">
              Cities
            </h3>
            <ul className="space-y-2">
              {majorCities.map((city) => (
                <li key={city.id}>
                  <Link href={`/cities/${city.slug}`} className={footerLink}>
                    {city.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/cities" className={footerLinkAccent}>
                  View All Cities →
                </Link>
              </li>
            </ul>
          </div>

          {/* Specialties Column */}
          <div>
            <h3 className="text-[#f5f0e8] font-semibold mb-4 pb-1 border-b border-[rgba(184,168,138,0.2)] w-fit">
              Specialties
            </h3>
            <ul className="space-y-2">
              {majorSpecialties.map((specialty) => (
                <li key={specialty.id}>
                  <Link
                    href={`/specialties/${specialty.slug}`}
                    className={footerLink}
                  >
                    {specialty.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/specialties" className={footerLinkAccent}>
                  View All Specialties →
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="text-[#f5f0e8] font-semibold mb-4 pb-1 border-b border-[rgba(184,168,138,0.2)] w-fit">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/guides" className={footerLinkAccent}>
                  Expert Fitness Guides
                </Link>
              </li>
              <li>
                <Link href="/add-gym" className={footerLink}>
                  List Your Gym
                </Link>
              </li>
              <li>
                <Link href="/advertise-with-us" className={footerLink}>
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className={footerLink}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className={footerLink}>
                  Owner Dashboard
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-[rgba(184,168,138,0.2)] flex flex-col md:flex-row justify-between items-center">
          <p className="text-[#64748b] text-sm">
            © {new Date().getFullYear()} Gym Near Me Cyprus. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link
              href="/privacy"
              className={footerLink}
              aria-label="Privacy policy"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className={footerLink}
              aria-label="Terms of Service"
            >
              Terms
            </Link>
            <Link
              href="/imprint"
              className={footerLink}
              aria-label="Imprint"
            >
              Imprint
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

