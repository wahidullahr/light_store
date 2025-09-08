import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import '../globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isNorwegian = locale === 'nb';

  return {
    title: isNorwegian
      ? 'Tindra - Håndlagde trelamper som lyser opp ditt hjem'
      : 'Tindra - Handcrafted wooden lamps that illuminate your home',
    description: isNorwegian
      ? 'Opplev Tindra sine unike, håndlagde trelamper som bringer varme og nordisk eleganse til hjemmet ditt. Hver lampe er et kunstverks skapt av bærekraftige norske tresorter.'
      : "Discover Tindra's unique handcrafted wooden lamps that bring warmth and Nordic elegance to your home. Each lamp is a work of art created from sustainable Norwegian wood.",
  };
}

interface IRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: IRootLayoutProps) {
  const { locale } = await params;
  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${fraunces.variable} bg-[#0B0B0B] text-[#F6F3EC] antialiased`}
      >
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
                    className="bg-gradient-radial absolute top-6 left-6 h-12 w-12 from-yellow-200/50 via-amber-200/30 to-transparent opacity-60 transition-all duration-500 group-hover:opacity-80"
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
            </div>

            <div className="flex items-center space-x-8">
              <div className="hidden items-center space-x-8 md:flex">
                <a
                  href={`/${locale}`}
                  className="group font-fraunces relative text-lg font-light tracking-wide text-amber-50/90 transition-all duration-300 hover:scale-105 hover:text-amber-200"
                >
                  <span className="relative z-10">{locale === 'nb' ? 'Hjem' : 'Home'}</span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 group-hover:w-full"></div>
                  <div className="absolute inset-0 -z-10 rounded-lg bg-amber-500/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
                </a>
                <a
                  href={`/${locale}/products`}
                  className="group font-fraunces relative text-lg font-light tracking-wide text-amber-50/90 transition-all duration-300 hover:scale-105 hover:text-amber-200"
                >
                  <span className="relative z-10">
                    {locale === 'nb' ? 'Produkter' : 'Products'}
                  </span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 group-hover:w-full"></div>
                  <div className="absolute inset-0 -z-10 rounded-lg bg-amber-500/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
                </a>
                <a
                  href={`/${locale}/about`}
                  className="group font-fraunces relative text-lg font-light tracking-wide text-amber-50/90 transition-all duration-300 hover:scale-105 hover:text-amber-200"
                >
                  <span className="relative z-10">{locale === 'nb' ? 'Om oss' : 'About'}</span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 group-hover:w-full"></div>
                  <div className="absolute inset-0 -z-10 rounded-lg bg-amber-500/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
                </a>
                <a
                  href={`/${locale}/contact`}
                  className="group font-fraunces relative text-lg font-light tracking-wide text-amber-50/90 transition-all duration-300 hover:scale-105 hover:text-amber-200"
                >
                  <span className="relative z-10">{locale === 'nb' ? 'Kontakt' : 'Contact'}</span>
                  <div className="absolute -bottom-1 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-500 transition-all duration-300 group-hover:w-full"></div>
                  <div className="absolute inset-0 -z-10 rounded-lg bg-amber-500/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100"></div>
                </a>
              </div>

              {/* Single Language Toggle Button */}
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
                        d="M13 7l5 5m0 0l-5 5m5-5H6"
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
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
