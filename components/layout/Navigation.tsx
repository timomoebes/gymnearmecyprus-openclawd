'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { cities } from '@/lib/data';
import { createClient } from '@/lib/supabase/browser';
import { checkAdminStatus } from '@/lib/actions/auth';

export const Navigation: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isCitiesDropdownOpen, setIsCitiesDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        checkAdminStatus().then(({ isAdmin }) => setIsAdmin(isAdmin));
      } else {
        setIsAdmin(false);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        const { isAdmin: adminStatus } = await checkAdminStatus();
        setIsAdmin(adminStatus);
      } else {
        setIsAdmin(false);
      }
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await createClient().auth.signOut();
    
    // If user is on a claim page, redirect to the corresponding gym listing page
    const claimPageMatch = pathname?.match(/^\/claim\/(.+)$/);
    if (claimPageMatch) {
      const gymSlug = decodeURIComponent(claimPageMatch[1]);
      router.push(`/gyms/${gymSlug}`);
      router.refresh();
      return;
    }
    
    router.refresh();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only apply "click outside" behavior on desktop.
      // On mobile, this was closing the dropdown before links could navigate.
      if (typeof window !== 'undefined' && window.innerWidth < 768) {
        return;
      }

      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsCitiesDropdownOpen(false);
      }
    };

    if (isCitiesDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCitiesDropdownOpen]);

  return (
    <nav className="bg-[#1a1a2e] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-40 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0">
            <Image
              src="/logo1.png"
              alt="Gym Near Me Cyprus Logo"
              width={500}
              height={250}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-6 absolute left-1/2 transform -translate-x-1/2">
            <Link
              href="/"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Home
            </Link>
            
            {/* Browse Cities Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-200 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsCitiesDropdownOpen(!isCitiesDropdownOpen)}
              >
                Browse Cities
                <ChevronDown className={`w-4 h-4 ml-1 transition-transform ${isCitiesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {/* Dropdown Menu */}
              {isCitiesDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 py-3 z-50 max-h-[500px] overflow-y-auto">
                  {/* View All Cities Link */}
                  <Link
                    href="/cities"
                    className="block px-4 py-2 text-sm text-blue-600 font-medium hover:bg-gray-50 transition-colors"
                    onClick={() => setIsCitiesDropdownOpen(false)}
                  >
                    View All Cities →
                  </Link>
                  
                  {/* Divider */}
                  <div className="border-t border-gray-200 my-2"></div>
                  
                  {/* Cities List - Two Columns */}
                  <div className="max-h-[400px] overflow-y-auto px-2">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {cities.map((city) => (
                        <Link
                          key={city.id}
                          href={`/cities/${city.slug}`}
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-colors rounded"
                          onClick={() => setIsCitiesDropdownOpen(false)}
                        >
                          {city.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <Link
              href="/advertise-with-us"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Advertise With Us
            </Link>
            <Link
              href="/about"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              Contact
            </Link>
            
            {/* + Add Your Gym Button - Next to Contact */}
            <Link href="/add-gym">
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/50">
                + Add Your Gym
              </button>
            </Link>
          </div>

          {/* Right Side: Auth */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0 ml-auto">
            {user ? (
              <>
                <Link
                  href={isAdmin ? '/admin' : '/dashboard'}
                  className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" aria-hidden />
                  Dashboard
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-gray-200 hover:text-white transition-colors text-sm font-medium rounded-full border border-gray-600 hover:border-gray-500"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  Sign out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
                >
                  Log In
                </Link>
                <Link href="/signup">
                  <button className="px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-full text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50">
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-200"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden border-t border-gray-700 bg-[#1a1a2e]">
          <div className="px-4 pt-4 pb-6 space-y-3">
            <Link
              href="/"
              className="block py-2 text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            
            {/* Mobile Browse Cities Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-200 hover:text-white transition-colors"
                onClick={() => setIsCitiesDropdownOpen(!isCitiesDropdownOpen)}
              >
                <span>Browse Cities</span>
                <ChevronDown className={`w-4 h-4 transition-transform ${isCitiesDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isCitiesDropdownOpen && (
                <div className="pl-4 mt-2 space-y-1 border-l-2 border-gray-700">
                  <Link
                    href="/cities"
                    className="block w-full text-left py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={() => {
                      setIsOpen(false);
                      setIsCitiesDropdownOpen(false);
                    }}
                  >
                    View All Cities →
                  </Link>
                  {cities.map((city) => (
                    <Link
                      key={city.id}
                      href={`/cities/${city.slug}`}
                      className="block w-full text-left py-2 text-sm text-gray-300 hover:text-white transition-colors"
                      onClick={() => {
                        setIsOpen(false);
                        setIsCitiesDropdownOpen(false);
                      }}
                    >
                      {city.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            <Link
              href="/advertise-with-us"
              className="block py-2 text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Advertise With Us
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            
            <div className="pt-4 border-t border-gray-700 space-y-3">
              <Link
                href="/add-gym"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full text-sm shadow-lg shadow-blue-500/50">
                  + Add Your Gym
                </button>
              </Link>
              {user ? (
                <>
                  <Link
                    href={isAdmin ? '/admin' : '/dashboard'}
                    className="flex items-center gap-2 py-2 text-gray-200 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" /> Dashboard
                  </Link>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-gray-200 hover:text-white transition-colors text-sm font-medium rounded-full border border-gray-600"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" /> Sign out
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-200 hover:text-white transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/signup"
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-full text-sm shadow-lg shadow-blue-500/50">
                      Sign Up
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

