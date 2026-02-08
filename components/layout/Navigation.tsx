'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Menu, X, ChevronDown, LayoutDashboard, LogOut } from 'lucide-react';
import { cities } from '@/lib/data';
import { createClient } from '@/lib/supabase/browser';
import { LanguageFlag } from '@/components/icons/FlagIcons';
import { useLocale } from '@/components/providers/LocaleProvider';

const LANGUAGES = [
  { code: 'en' as const, label: 'English' },
  { code: 'el' as const, label: 'Ελληνικά' },
] as const;

export const Navigation: React.FC = () => {
  const router = useRouter();
  const { locale, setLocale, t } = useLocale();
  const [isOpen, setIsOpen] = useState(false);
  const [isCitiesDropdownOpen, setIsCitiesDropdownOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langTriggerRef = useRef<HTMLButtonElement>(null);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const [langMenuPosition, setLangMenuPosition] = useState<{ top: number; left: number } | null>(null);

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => setUser(session?.user ?? null));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    await createClient().auth.signOut();
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

  // Update portaled dropdown position from trigger button
  const updateLangMenuPosition = useCallback(() => {
    const btn = langTriggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    const menuWidth = 160;
    setLangMenuPosition({
      top: rect.bottom + 8,
      left: Math.max(8, rect.right - menuWidth),
    });
  }, []);

  // When language dropdown opens, position it and listen for scroll/resize; when closed, clear position
  useEffect(() => {
    if (!isLangDropdownOpen) {
      setLangMenuPosition(null);
      return;
    }
    const id = requestAnimationFrame(() => {
      updateLangMenuPosition();
    });
    window.addEventListener('scroll', updateLangMenuPosition, true);
    window.addEventListener('resize', updateLangMenuPosition);
    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('scroll', updateLangMenuPosition, true);
      window.removeEventListener('resize', updateLangMenuPosition);
    };
  }, [isLangDropdownOpen, updateLangMenuPosition]);

  // Close language dropdown when clicking outside (desktop only; trigger and menu can be separate in DOM)
  useEffect(() => {
    if (!isLangDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth < 768) return;
      const target = e.target as Node;
      const inTrigger = langTriggerRef.current?.contains(target);
      const inMenu = langMenuRef.current?.contains(target);
      if (!inTrigger && !inMenu) {
        setIsLangDropdownOpen(false);
        setLangMenuPosition(null);
      }
    };
    const t = setTimeout(() => document.addEventListener('mousedown', handleClickOutside), 0);
    return () => {
      clearTimeout(t);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isLangDropdownOpen]);

  const openLangDropdown = useCallback(() => {
    const btn = langTriggerRef.current;
    if (!btn) return;
    const rect = btn.getBoundingClientRect();
    setLangMenuPosition({
      top: rect.bottom + 8,
      left: Math.max(8, rect.right - 160),
    });
    setIsLangDropdownOpen(true);
  }, []);

  const closeLangDropdown = useCallback(() => {
    setIsLangDropdownOpen(false);
    setLangMenuPosition(null);
  }, []);

  return (
    <>
    <nav className="bg-[#1a1a2e] sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-40 py-2">
          {/* Logo */}
          <Link href="/" className="flex items-center hover:opacity-80 transition-opacity flex-shrink-0">
            <Image
              src="/logo1.png"
              alt="GymNearMe Cyprus Logo"
              width={500}
              height={250}
              className="h-20 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation Links - Shifted left to make room for language selector */}
          <div className="hidden md:flex items-center space-x-6 absolute left-[calc(50%-44px)] transform -translate-x-1/2">
            <Link
              href="/"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              {t('nav.home')}
            </Link>
            
            {/* Browse Cities Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className="flex items-center text-gray-200 hover:text-white transition-colors text-sm font-medium"
                onClick={() => setIsCitiesDropdownOpen(!isCitiesDropdownOpen)}
              >
                {t('nav.browseCities')}
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
                    {t('nav.viewAllCities')}
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
              {t('nav.advertiseWithUs')}
            </Link>
            <Link
              href="/about"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              {t('nav.aboutUs')}
            </Link>
            <Link
              href="/contact"
              className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
            >
              {t('nav.contact')}
            </Link>
            
            {/* + Add Your Gym Button - Next to Contact */}
            <Link href="/add-gym">
              <button className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full text-sm hover:opacity-90 transition-opacity shadow-lg shadow-blue-500/50">
                {t('nav.addYourGym')}
              </button>
            </Link>
          </div>

          {/* Right Side: Language selector + Auth */}
          <div className="hidden md:flex items-center space-x-4 flex-shrink-0 ml-auto">
            {/* Language switcher - dropdown is portaled to body so it always shows */}
            <div className="relative" ref={langDropdownRef}>
              <button
                ref={langTriggerRef}
                type="button"
                className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors text-sm font-medium p-1.5 rounded border border-transparent hover:border-gray-500 cursor-pointer"
                aria-label="Change language"
                aria-expanded={isLangDropdownOpen}
                aria-haspopup="listbox"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  if (isLangDropdownOpen) {
                    closeLangDropdown();
                  } else {
                    openLangDropdown();
                  }
                }}
              >
                <LanguageFlag code={locale} className="w-6 h-auto rounded-sm flex-shrink-0 pointer-events-none" />
                <ChevronDown className={`w-4 h-4 transition-transform flex-shrink-0 pointer-events-none ${isLangDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
            </div>
            {user ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-1.5 text-gray-200 hover:text-white transition-colors text-sm font-medium"
                >
                  <LayoutDashboard className="w-4 h-4" aria-hidden />
                  {t('nav.dashboard')}
                </Link>
                <button
                  type="button"
                  onClick={handleSignOut}
                  className="flex items-center gap-1.5 px-4 py-2.5 text-gray-200 hover:text-white transition-colors text-sm font-medium rounded-full border border-gray-600 hover:border-gray-500"
                >
                  <LogOut className="w-4 h-4" aria-hidden />
                  {t('nav.signOut')}
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-gray-200 hover:text-white transition-colors text-sm font-medium"
                >
                  {t('nav.logIn')}
                </Link>
                <Link href="/signup">
                  <button className="px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-full text-sm hover:bg-blue-600 transition-colors shadow-lg shadow-blue-500/50">
                    {t('nav.signUp')}
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
                {t('nav.home')}
              </Link>
            
            {/* Mobile Browse Cities Dropdown */}
            <div>
              <button
                className="flex items-center justify-between w-full py-2 text-gray-200 hover:text-white transition-colors"
                onClick={() => setIsCitiesDropdownOpen(!isCitiesDropdownOpen)}
              >
                <span>{t('nav.browseCities')}</span>
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
                    {t('nav.viewAllCities')}
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
              {t('nav.advertiseWithUs')}
            </Link>
            <Link
              href="/about"
              className="block py-2 text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.aboutUs')}
            </Link>
            <Link
              href="/contact"
              className="block py-2 text-gray-200 hover:text-white transition-colors"
              onClick={() => setIsOpen(false)}
            >
              {t('nav.contact')}
            </Link>
            
            <div className="pt-4 border-t border-gray-700 space-y-3">
              <Link
                href="/add-gym"
                className="block"
                onClick={() => setIsOpen(false)}
              >
                <button className="w-full px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold rounded-full text-sm shadow-lg shadow-blue-500/50">
                  {t('nav.addYourGym')}
                </button>
              </Link>
              {/* Mobile: Language */}
              <div className="flex items-center gap-2 py-2">
                <span className="text-gray-400 text-sm">Language</span>
                <div className="flex gap-2">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      type="button"
                      className={`p-2 rounded transition-opacity ${locale === lang.code ? 'ring-2 ring-white/50 opacity-100' : 'opacity-60 hover:opacity-100'}`}
                      onClick={() => setLocale(lang.code)}
                      title={lang.label}
                      aria-label={lang.label}
                    >
                      <LanguageFlag code={lang.code} className="w-6 h-auto rounded-sm" />
                    </button>
                  ))}
                </div>
              </div>
              {user ? (
                <>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 py-2 text-gray-200 hover:text-white transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    <LayoutDashboard className="w-4 h-4" /> {t('nav.dashboard')}
                  </Link>
                  <button
                    type="button"
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-gray-200 hover:text-white transition-colors text-sm font-medium rounded-full border border-gray-600"
                    onClick={() => {
                      handleSignOut();
                      setIsOpen(false);
                    }}
                  >
                    <LogOut className="w-4 h-4" /> {t('nav.signOut')}
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="block py-2 text-gray-200 hover:text-white transition-colors text-center"
                    onClick={() => setIsOpen(false)}
                  >
                    {t('nav.logIn')}
                  </Link>
                  <Link
                    href="/signup"
                    className="block"
                    onClick={() => setIsOpen(false)}
                  >
                    <button className="w-full px-5 py-2.5 bg-blue-500 text-white font-semibold rounded-full text-sm shadow-lg shadow-blue-500/50">
                      {t('nav.signUp')}
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
    {/* Language dropdown: fixed so it's never clipped; position from trigger button */}
    {isLangDropdownOpen && langMenuPosition && (
      <div
        ref={langMenuRef}
        role="listbox"
        aria-label="Select language"
        style={{
          position: 'fixed',
          top: langMenuPosition.top,
          left: langMenuPosition.left,
          width: '160px',
          zIndex: 99999,
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.2), 0 4px 6px -2px rgba(0,0,0,0.1)',
          border: '1px solid #e5e7eb',
          padding: '8px 0',
        }}
      >
        {LANGUAGES.map((lang) => (
          <button
            key={lang.code}
            type="button"
            role="option"
            aria-selected={locale === lang.code}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              width: '100%',
              padding: '8px 16px',
              fontSize: '14px',
              textAlign: 'left',
              border: 'none',
              background: locale === lang.code ? '#f3f4f6' : 'transparent',
              color: locale === lang.code ? '#111827' : '#374151',
              cursor: 'pointer',
              fontFamily: 'inherit',
            }}
            onClick={() => {
              setLocale(lang.code);
              closeLangDropdown();
            }}
          >
            <LanguageFlag code={lang.code} className="w-5 h-auto rounded-sm flex-shrink-0" />
            {lang.label}
          </button>
        ))}
      </div>
    )}
  </>
  );
};

