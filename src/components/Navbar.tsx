'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface NavbarProps {
  locale: string;
}

export default function Navbar({ locale }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Close menu when resizing to larger screens
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { href: `/${locale}`, label: locale === 'nb' ? 'Hjem' : 'Home' },
    { href: `/${locale}/products`, label: locale === 'nb' ? 'Produkter' : 'Products' },
    { href: `/${locale}/about`, label: locale === 'nb' ? 'Om oss' : 'About' },
    { href: `/${locale}/contact`, label: locale === 'nb' ? 'Kontakt' : 'Contact' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-700 bg-[#0B0B0B]/80 backdrop-blur-md">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-4">
          {/* Modern Pendant Lamp Logo - Different Style */}
          <div className="group relative">
            <div className="relative">
              {/* Outer magical glow ring */}
              <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-amber-400/25 via-amber-300/35 to-amber-500/25 opacity-60 blur-lg transition-all duration-700 group-hover:scale-110 group-hover:opacity-90"></div>

              <svg
                className="h-12 w-12 transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                viewBox="0 0 48 48"
                fill="none"
              >
                {/* Ceiling mount */}
                <rect x="20" y="2" width="8" height="4" fill="#374151" rx="2" />
                <circle cx="24" cy="4" r="3" fill="#D97706" />
                <circle cx="24" cy="4" r="2" fill="#F59E0B" />

                {/* Hanging cord/cable */}
                <rect x="23.5" y="6" width="1" height="12" fill="#6B7280" />
                <rect x="23.2" y="6" width="1.6" height="12" fill="#4B5563" opacity="0.7" />

                {/* Modern pendant shade - elegant bulb shape */}
                <ellipse
                  cx="24"
                  cy="32"
                  rx="12"
                  ry="16"
                  fill="url(#pendantGradient)"
                  stroke="#D97706"
                  strokeWidth="1.2"
                />
                <ellipse cx="24" cy="32" rx="10" ry="14" fill="url(#pendantInnerGradient)" />
                <ellipse
                  cx="24"
                  cy="32"
                  rx="8"
                  ry="12"
                  fill="url(#pendantCoreGradient)"
                  opacity="0.8"
                />

                {/* Brilliant light source inside */}
                <ellipse cx="24" cy="30" rx="6" ry="8" fill="#FFFFFF" opacity="0.95" />
                <ellipse cx="24" cy="30" rx="5" ry="6" fill="#FEF3C7" opacity="0.9" />
                <ellipse cx="24" cy="30" rx="4" ry="5" fill="#FCD34D" opacity="0.8" />
                <ellipse cx="24" cy="30" rx="3" ry="4" fill="#F59E0B" />
                <ellipse cx="24" cy="30" rx="2" ry="3" fill="#FFFFFF" opacity="0.9" />
                <circle cx="24" cy="30" r="1" fill="#FBBF24" />

                {/* Light emanating downward */}
                <ellipse cx="24" cy="45" rx="8" ry="2" fill="#FEF3C7" opacity="0.4" />
                <ellipse cx="24" cy="44" rx="6" ry="1.5" fill="#FCD34D" opacity="0.3" />

                {/* Gradient definitions for pendant lamp */}
                <defs>
                  <radialGradient id="pendantGradient" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#6B7280" />
                    <stop offset="50%" stopColor="#4B5563" />
                    <stop offset="100%" stopColor="#374151" />
                  </radialGradient>
                  <radialGradient id="pendantInnerGradient" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#9CA3AF" />
                    <stop offset="100%" stopColor="#6B7280" />
                  </radialGradient>
                  <radialGradient id="pendantCoreGradient" cx="50%" cy="30%">
                    <stop offset="0%" stopColor="#D1D5DB" />
                    <stop offset="100%" stopColor="#9CA3AF" />
                  </radialGradient>
                </defs>
              </svg>

              {/* Spectacular light projection from pendant */}
              <div
                className="bg-gradient-radial absolute top-8 left-4 h-16 w-16 from-amber-200/60 via-amber-300/40 to-transparent opacity-75 transition-all duration-700 group-hover:opacity-90"
                style={{
                  borderRadius: '50%',
                  filter: 'blur(1px)',
                }}
              ></div>

              {/* Secondary light glow */}
              <div
                className="bg-gradient-radial absolute top-6 left-6 h-12 w-12 from-yellow-200/30 via-amber-200/20 to-transparent opacity-75 blur-xl"
                style={{ borderRadius: '50%' }}
              ></div>

              {/* Core brilliant glow */}
              <div
                className="bg-gradient-radial absolute top-7 left-8 h-8 w-8 from-amber-100/70 via-white/30 to-transparent opacity-80 transition-all duration-500 group-hover:opacity-95"
                style={{ borderRadius: '50%' }}
              ></div>
            </div>
          </div>

          {/* Larger Tindra Text Only - No Subtitle */}
          <Link href={`/${locale}`} className="block">
            <div className="relative">
              {/* Epic ambient glow layers */}
              <div className="bg-gradient-radial absolute -top-4 -left-8 h-18 w-40 from-amber-300/35 via-amber-400/25 to-transparent opacity-90 blur-2xl transition-all duration-700 group-hover:opacity-100"></div>
              <div className="bg-gradient-radial absolute -top-2 -left-6 h-14 w-36 from-yellow-200/30 via-amber-300/20 to-transparent opacity-75 blur-xl"></div>
              <div className="bg-gradient-radial absolute top-0 -left-4 h-10 w-32 from-amber-100/25 to-transparent opacity-85 blur-lg"></div>
              <div className="bg-gradient-radial absolute top-1 -left-2 h-6 w-28 from-amber-50/20 to-transparent opacity-70 blur-md"></div>

              {/* Larger premium brand text */}
              <div className="relative z-10">
                <h1 className="font-fraunces relative text-3xl font-bold tracking-tight transition-all duration-500 group-hover:scale-105">
                  {/* Multiple shadow layers for depth */}
                  <span className="absolute inset-0 text-amber-400/40 blur-lg">Tindra</span>
                  <span className="absolute inset-0 text-amber-300/35 blur-md">Tindra</span>
                  <span className="absolute inset-0 text-amber-200/25 blur-sm">Tindra</span>

                  {/* Main illuminated text with complex gradient */}
                  <span className="relative bg-gradient-to-r from-amber-50 via-amber-50 via-white to-amber-50 bg-clip-text text-transparent drop-shadow-xl filter">
                    Tindra
                  </span>

                  {/* Intense warm light overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-100/60 via-amber-50/35 via-yellow-100/45 to-amber-100/30 bg-clip-text text-transparent">
                    Tindra
                  </span>

                  {/* Brilliant highlight core */}
                  <span className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-50/25 via-white/35 to-transparent bg-clip-text text-transparent">
                    Tindra
                  </span>

                  {/* Electric highlight edge */}
                  <span className="absolute inset-0 bg-gradient-to-r from-amber-50/30 via-white/20 to-amber-50/30 bg-clip-text text-transparent">
                    Tindra
                  </span>
                </h1>

                {/* Dynamic light connection beams from pendant lamp */}
                <div className="absolute top-4 -left-12 h-1.5 w-12 bg-gradient-to-r from-amber-300/80 via-amber-200/60 to-amber-100/30 opacity-85 blur-sm transition-all duration-500 group-hover:w-14 group-hover:opacity-95"></div>
                <div className="absolute top-4 -left-12 h-1 w-12 bg-gradient-to-r from-amber-400/90 via-amber-300/70 to-amber-200/40 opacity-90 transition-all duration-500 group-hover:w-14"></div>
                <div className="absolute top-4 -left-12 h-0.5 w-12 bg-gradient-to-r from-amber-100/85 via-white/50 to-amber-100/25 opacity-80 transition-all duration-500 group-hover:w-14"></div>

                {/* Magical particle effects */}
                <div className="absolute -inset-3 rounded-xl bg-gradient-to-r from-transparent via-amber-200/10 to-transparent opacity-75 transition-opacity duration-500 group-hover:opacity-90"></div>
                <div className="absolute -inset-2 rounded-lg bg-gradient-to-r from-amber-100/8 via-amber-50/15 to-amber-100/8 opacity-60 transition-opacity duration-500 group-hover:opacity-80"></div>
              </div>
            </div>
          </Link>
        </div>

        {/* Desktop Navigation - hidden on mobile */}
        <div className="hidden items-center space-x-8 md:flex">
          {navItems.map(item => (
            <a
              key={item.href}
              href={item.href}
              className="group font-fraunces relative text-lg font-light tracking-wide text-amber-50/90 transition-all duration-300 hover:scale-105 hover:text-amber-200"
            >
              <span className="relative z-10">{item.label}</span>
              <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 group-hover:w-full"></div>
              <div className="absolute inset-0 -z-10 rounded-lg bg-amber-500/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
            </a>
          ))}

          {/* Language Toggle Button */}
          <div className="relative">
            <a
              href={locale === 'nb' ? '/en' : '/nb'}
              className="group relative flex items-center space-x-2 rounded-xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 px-4 py-2 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/50 hover:from-amber-500/20 hover:via-amber-400/25 hover:to-amber-500/20 hover:shadow-lg hover:shadow-amber-500/20"
            >
              {/* Language Icon */}
              <svg
                className="h-4 w-4 text-amber-300 transition-colors duration-300 group-hover:text-amber-200"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M7 2a1 1 0 011 1v1h3a1 1 0 110 2H9.578a18.87 18.87 0 01-1.724 4.78c.29.354.596.696.914 1.026a1 1 0 11-1.44 1.389c-.188-.196-.373-.396-.554-.6a19.098 19.098 0 01-3.107 3.567 1 1 0 01-1.334-1.49 17.087 17.087 0 003.13-3.733 18.992 18.992 0 01-1.487-2.494 1 1 0 111.79-.89c.234.47.489.928.764 1.372.417-.934.752-1.913.997-2.927H3a1 1 0 110-2h3V3a1 1 0 011-1zm6 6a1 1 0 01.894.553l2.991 5.982a.869.869 0 01.02.037l.99 1.98a1 1 0 11-1.79.895L15.383 16h-4.764l-.724 1.447a1 1 0 11-1.788-.894l.99-1.98.019-.038 2.99-5.982A1 1 0 0113 8zm-1.382 6h2.764L13 11.236 11.618 14z"
                  clipRule="evenodd"
                />
              </svg>

              {/* Current and Next Language */}
              <div className="flex items-center space-x-1">
                <span className="font-fraunces text-sm font-medium text-amber-200 transition-colors duration-300 group-hover:text-amber-100">
                  {locale === 'nb' ? 'NO' : 'EN'}
                </span>
                <svg
                  className="h-3 w-3 text-amber-400 transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-amber-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
                <span className="font-fraunces text-sm font-light text-amber-300/80 transition-colors duration-300 group-hover:text-amber-200/90">
                  {locale === 'nb' ? 'EN' : 'NO'}
                </span>
              </div>

              {/* Subtle glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </a>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="group relative z-50 rounded-xl border border-amber-500/20 bg-gradient-to-r from-amber-500/10 via-amber-400/15 to-amber-500/10 p-3 text-amber-200 backdrop-blur-sm transition-all duration-300 hover:border-amber-400/40 hover:from-amber-500/20 hover:via-amber-400/25 hover:to-amber-500/20 hover:shadow-lg hover:shadow-amber-500/20 focus:ring-2 focus:ring-amber-400/30 focus:outline-none"
            aria-label="Toggle menu"
          >
            <div className="relative h-6 w-6">
              {/* Hamburger Icon */}
              <span
                className={`absolute top-1 left-0 h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'translate-y-2 rotate-45' : ''
                }`}
              />
              <span
                className={`absolute top-3 left-0 h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`absolute top-5 left-0 h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-translate-y-2 -rotate-45' : ''
                }`}
              />
            </div>

            {/* Subtle glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/5 via-amber-400/10 to-amber-500/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black md:hidden" onClick={() => setIsMenuOpen(false)}>
          <div className="flex h-full flex-col bg-black">
            {/* Menu Header - Close Button Only */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setIsMenuOpen(false)}
                className="group rounded-xl border border-amber-500 bg-amber-600 p-2 text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/20 focus:outline-none"
                aria-label="Close menu"
              >
                <svg
                  className="h-6 w-6 transition-transform duration-300 group-hover:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Content - All in One Box */}
            <div className="mx-6 mb-6 flex-1">
              <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6">
                {/* Navigation Items */}
                <div className="mb-6 space-y-3">
                  {navItems.map(item => (
                    <a
                      key={item.href}
                      href={item.href}
                      className="group flex items-center justify-between rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 transition-all duration-300 hover:border-amber-500 hover:bg-slate-600 hover:shadow-lg hover:shadow-amber-500/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="h-2 w-2 rounded-full bg-amber-400 transition-all duration-300 group-hover:scale-125"></div>
                        <span className="font-fraunces text-lg font-light tracking-wide text-slate-100 transition-colors duration-300 group-hover:text-amber-200">
                          {item.label}
                        </span>
                      </div>
                      <svg
                        className="h-4 w-4 text-slate-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </a>
                  ))}
                </div>

                {/* Language Toggle - Single Button */}
                <div className="mb-6">
                  <h3 className="font-fraunces mb-3 text-lg font-medium text-slate-200">
                    {locale === 'nb' ? 'Språk' : 'Language'}
                  </h3>
                  <a
                    href={locale === 'nb' ? '/en' : '/nb'}
                    className="group flex items-center justify-between rounded-xl border border-amber-500 bg-amber-600 px-4 py-3 text-white transition-all duration-300 hover:border-amber-400 hover:bg-amber-500 hover:shadow-lg hover:shadow-amber-500/20"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <div className="flex items-center space-x-3">
                      <svg
                        className="h-5 w-5 transition-colors duration-300 group-hover:text-amber-100"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12.87 15.07l-2.54-2.51.03-.03c1.74-1.94 2.98-4.17 3.71-6.53H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z" />
                      </svg>
                      <div className="text-left">
                        <div className="font-fraunces font-medium">
                          {locale === 'nb' ? 'Norsk' : 'English'}
                        </div>
                        <div className="text-xs opacity-75">
                          {locale === 'nb'
                            ? 'Klikk for å bytte til English'
                            : 'Click to switch to Norsk'}
                        </div>
                      </div>
                    </div>
                    <div className="font-fraunces text-sm">{locale === 'nb' ? 'EN →' : 'NB →'}</div>
                  </a>
                </div>

                {/* Contact Info */}
                <div>
                  <h3 className="font-fraunces mb-3 text-lg font-medium text-slate-200">
                    {locale === 'nb' ? 'Kontakt oss' : 'Contact us'}
                  </h3>
                  <div className="space-y-2">
                    <a
                      href="mailto:kontakt@tindra.no"
                      className="group flex items-center space-x-3 rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 transition-all duration-300 hover:border-amber-500 hover:bg-slate-600 hover:shadow-lg hover:shadow-amber-500/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="h-4 w-4 text-slate-400 transition-colors duration-300 group-hover:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <div>
                        <div className="text-sm font-medium text-slate-100">kontakt@tindra.no</div>
                        <div className="text-xs text-slate-400">
                          {locale === 'nb' ? 'E-post' : 'E-mail'}
                        </div>
                      </div>
                    </a>
                    <a
                      href="tel:+4798765432"
                      className="group flex items-center space-x-3 rounded-xl border border-slate-600 bg-slate-700 px-4 py-3 transition-all duration-300 hover:border-amber-500 hover:bg-slate-600 hover:shadow-lg hover:shadow-amber-500/10"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg
                        className="h-4 w-4 text-slate-400 transition-colors duration-300 group-hover:text-amber-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                      <div>
                        <div className="text-sm font-medium text-slate-100">+47 987 65 432</div>
                        <div className="text-xs text-slate-400">
                          {locale === 'nb' ? 'Telefon' : 'Phone'}
                        </div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
