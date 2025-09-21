import { useTranslations } from 'next-intl'; // eslint-disable-line @typescript-eslint/no-unused-vars
import Image from 'next/image';
import Link from 'next/link';

interface IPageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: IPageProps) {
  const { locale } = await params;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section - Luxury Modern Classic Design */}
      <section className="relative flex min-h-screen items-center overflow-hidden">
        {/* Sophisticated Background Layers */}
        <div className="absolute inset-0">
          {/* Primary gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

          {/* Radial glow effects */}
          <div className="bg-gradient-radial absolute top-1/4 -left-1/4 h-96 w-96 rounded-full from-amber-500/10 to-transparent blur-3xl"></div>
          <div className="bg-gradient-radial absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full from-amber-600/8 to-transparent blur-3xl"></div>

          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.015'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          ></div>
        </div>

        <div className="relative container mx-auto px-4 py-16">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center xl:gap-20">
            {/* Left Side - Premium Typography & Content */}
            <div className="order-2 space-y-8 lg:order-1">
              {/* Elegant Artisan Badge */}
              <div className="group inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-600/5 px-6 py-3 backdrop-blur-sm transition-all duration-500 hover:border-amber-400/30 hover:shadow-lg hover:shadow-amber-500/10">
                <div className="relative">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-30"></div>
                </div>
                <span className="text-sm font-medium tracking-wide text-amber-200 transition-colors duration-300 group-hover:text-amber-100">
                  {locale === 'nb'
                    ? 'Håndlaget av norske håndverkere'
                    : 'Handcrafted by Norwegian artisans'}
                </span>
              </div>

              {/* Sophisticated Main Headline */}
              <div className="space-y-6">
                <h1 className="font-fraunces text-5xl leading-[1.1] font-light tracking-tight text-slate-50 md:text-6xl lg:text-7xl xl:text-8xl">
                  {locale === 'nb' ? (
                    <>
                      <span className="block font-extralight text-slate-200">Eksklusivt</span>
                      <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text font-normal text-transparent">
                        nordisk design
                      </span>
                      <span className="mt-2 block text-4xl font-extralight text-slate-300 md:text-5xl lg:text-6xl xl:text-7xl">
                        for ditt hjem
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block font-extralight text-slate-200">Exclusive</span>
                      <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text font-normal text-transparent">
                        Nordic design
                      </span>
                      <span className="mt-2 block text-4xl font-extralight text-slate-300 md:text-5xl lg:text-6xl xl:text-7xl">
                        for your home
                      </span>
                    </>
                  )}
                </h1>

                <p className="max-w-2xl text-xl leading-relaxed font-light tracking-wide text-slate-400 lg:text-2xl">
                  {locale === 'nb'
                    ? 'Unikke håndlagde trelamper som bringer varm, nordisk atmosfære til hjemmet ditt. Hver lampe er et håndverkskunst som forteller sin egen historie.'
                    : 'Unique handcrafted wooden lamps that bring warm, Nordic atmosphere to your home. Each lamp is a work of art with its own story to tell.'}
                </p>
              </div>

              {/* Refined Feature Points */}
              <div className="space-y-4">
                {[
                  locale === 'nb' ? 'Bærekraftig norsk tre' : 'Sustainable Norwegian wood',
                  locale === 'nb' ? 'Unik design for hver lampe' : 'Unique design for each lamp',
                  locale === 'nb' ? 'Levetid på 20+ år' : 'Lifetime of 20+ years',
                ].map((feature, index) => (
                  <div key={index} className="group flex items-center gap-4">
                    <div className="relative">
                      <div className="h-1 w-1 rounded-full bg-amber-400 transition-all duration-300 group-hover:h-2 group-hover:w-2"></div>
                      <div className="absolute inset-0 h-1 w-1 rounded-full bg-amber-400 opacity-30 blur-sm transition-all duration-300 group-hover:-inset-0.5 group-hover:h-3 group-hover:w-3"></div>
                    </div>
                    <span className="font-light tracking-wide text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* Premium CTA Buttons */}
              <div className="flex flex-col gap-4 pt-4 sm:flex-row">
                <Link
                  href={`/${locale}/contact`}
                  className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-10 py-5 font-medium text-slate-950 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20 focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-300 to-amber-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <span className="relative font-semibold tracking-wide">
                    {locale === 'nb' ? 'Kontakt meg for pris' : 'Contact me for pricing'}
                  </span>
                  <div className="absolute inset-0 -translate-x-full rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"></div>
                </Link>

                <Link
                  href={`/${locale}/products`}
                  className="group rounded-2xl border border-slate-700/50 bg-slate-800/30 px-10 py-5 font-medium text-slate-200 backdrop-blur-xl transition-all duration-500 hover:border-amber-500/50 hover:bg-slate-700/40 hover:text-white focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950 focus:outline-none"
                >
                  <span className="tracking-wide transition-colors duration-300">
                    {locale === 'nb' ? 'Se kolleksjonen' : 'View collection'}
                  </span>
                </Link>
              </div>

              {/* Elegant Contact Info */}
              <div className="mt-8 border-t border-slate-800/50 pt-8">
                <p className="leading-relaxed font-light tracking-wide text-slate-500">
                  {locale === 'nb'
                    ? 'Kontakt meg direkte for tilpassede design og spesielle ønsker'
                    : 'Contact me directly for custom designs and special requests'}
                </p>
              </div>
            </div>

            {/* Right Side - Stunning Product Showcase */}
            <div className="order-1 lg:order-2">
              <div className="group relative">
                {/* Main Image Container with Sophisticated Effects */}
                <div className="relative mx-auto max-w-lg xl:max-w-xl">
                  {/* Glow Effect Behind Image */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-80"></div>

                  {/* Image Frame */}
                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-1 backdrop-blur-sm">
                    <div className="overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-slate-700/30 to-slate-800/30">
                      <Image
                        src="/home/hero-lamp.jpg"
                        alt={
                          locale === 'nb'
                            ? 'Håndlaget artikulert trelampe'
                            : 'Handcrafted articulated wooden lamp'
                        }
                        width={600}
                        height={750}
                        className="h-[750px] w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  </div>

                  {/* Floating Premium Badges */}
                  <div className="absolute -top-2 -right-2 rotate-3 transform rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-sm font-bold text-slate-950 shadow-2xl shadow-amber-500/30 transition-transform duration-300 hover:rotate-0">
                    {locale === 'nb' ? 'Premium' : 'Premium'}
                  </div>

                  <div className="absolute -bottom-2 -left-2 -rotate-3 transform rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 px-4 py-2 text-sm font-bold text-slate-950 shadow-2xl shadow-amber-500/30 transition-transform duration-300 hover:rotate-0">
                    {locale === 'nb' ? 'Håndlaget' : 'Handmade'}
                  </div>
                </div>

                {/* Elegant Stats Cards */}
                <div className="mt-8 grid grid-cols-2 gap-4">
                  <div className="group rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10">
                    <div className="mb-2 text-3xl font-light text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
                      20+
                    </div>
                    <div className="text-sm font-light tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                      {locale === 'nb' ? 'År erfaring' : 'Years experience'}
                    </div>
                  </div>
                  <div className="group rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/30 to-slate-900/30 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-amber-500/30 hover:shadow-lg hover:shadow-amber-500/10">
                    <div className="mb-2 text-3xl font-light text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
                      100%
                    </div>
                    <div className="text-sm font-light tracking-wide text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                      {locale === 'nb' ? 'Bærekraftig' : 'Sustainable'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 transform">
          <div className="animate-bounce">
            <div className="flex h-10 w-6 justify-center rounded-full border-2 border-slate-600">
              <div className="mt-2 h-3 w-1 animate-pulse rounded-full bg-slate-500"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Product Highlights */}
      <section className="relative overflow-hidden py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="bg-gradient-radial absolute top-0 left-1/2 h-96 w-96 -translate-x-1/2 transform rounded-full from-amber-500/5 to-transparent blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="font-fraunces mb-6 text-4xl font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {locale === 'nb' ? (
                <>
                  <span className="text-slate-300">Hvorfor velge</span>{' '}
                  <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    våre lamper
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-300">Why choose</span>{' '}
                  <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    our lamps
                  </span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-400">
              {locale === 'nb'
                ? 'Tre grunner til at våre trelamper skiller seg ut fra resten'
                : 'Three reasons why our wooden lamps stand out from the rest'}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3 lg:gap-12">
            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/0 via-amber-400/10 to-amber-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="relative mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="h-8 w-8 text-slate-950"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-amber-400 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40"></div>
                </div>
                <h3 className="mb-6 text-2xl font-light text-slate-100 transition-colors duration-300 group-hover:text-white">
                  {locale === 'nb' ? 'Håndlaget kvalitet' : 'Handcrafted Quality'}
                </h3>
                <p className="leading-relaxed font-light text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {locale === 'nb'
                    ? 'Hver lampe er unikt formet for hånd med tradisjonelle teknikker og årevis med erfaring.'
                    : 'Each lamp is uniquely hand-shaped using traditional techniques and years of experience.'}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/0 via-amber-400/10 to-amber-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="relative mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="h-8 w-8 text-slate-950"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 104 0 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-amber-400 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40"></div>
                </div>
                <h3 className="mb-6 text-2xl font-light text-slate-100 transition-colors duration-300 group-hover:text-white">
                  {locale === 'nb' ? 'Bærekraftige materialer' : 'Sustainable Materials'}
                </h3>
                <p className="leading-relaxed font-light text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {locale === 'nb'
                    ? 'Vi bruker kun førsteklasses treverk fra bærekraftig skogbruk i Norge.'
                    : 'We use only premium wood from sustainable forestry in Norway.'}
                </p>
              </div>
            </div>

            <div className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/0 via-amber-400/10 to-amber-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
              <div className="relative">
                <div className="relative mb-8">
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                    <svg
                      className="h-8 w-8 text-slate-950"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <div className="absolute inset-0 h-16 w-16 rounded-2xl bg-amber-400 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40"></div>
                </div>
                <h3 className="mb-6 text-2xl font-light text-slate-100 transition-colors duration-300 group-hover:text-white">
                  {locale === 'nb' ? '2 års garanti' : '2 Year Warranty'}
                </h3>
                <p className="leading-relaxed font-light text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                  {locale === 'nb'
                    ? 'Vi står bak kvaliteten på våre produkter med full garanti i 2 år.'
                    : 'We stand behind the quality of our products with a full 2-year warranty.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Craft Section */}
      <section className="relative overflow-hidden py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="bg-gradient-radial absolute right-1/3 bottom-0 h-96 w-96 rounded-full from-amber-500/8 to-transparent blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-fraunces text-4xl leading-[1.1] font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
                  {locale === 'nb' ? (
                    <>
                      <span className="block font-extralight text-slate-300">Tradisjonelt</span>
                      <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                        håndverk
                      </span>
                      <span className="mt-2 block text-3xl font-extralight text-slate-300 md:text-4xl lg:text-5xl">
                        møter moderne design
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block font-extralight text-slate-300">Traditional</span>
                      <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                        craftsmanship
                      </span>
                      <span className="mt-2 block text-3xl font-extralight text-slate-300 md:text-4xl lg:text-5xl">
                        meets modern design
                      </span>
                    </>
                  )}
                </h2>
                <p className="max-w-2xl text-xl leading-relaxed font-light text-slate-400">
                  {locale === 'nb'
                    ? 'Våre trelamper kombinerer århundregamle håndverksteknikker med moderne nordisk design. Hver lampe er unikt formet og ferdigstilt med naturlige oljer som fremhever trevirkets naturlige skjønnhet.'
                    : 'Our wooden lamps combine centuries-old craftsmanship techniques with modern Nordic design. Each lamp is uniquely shaped and finished with natural oils that highlight the natural beauty of the wood.'}
                </p>
              </div>
              <div className="space-y-4">
                {[
                  {
                    text:
                      locale === 'nb' ? 'Håndutvelgte tresorter' : 'Hand-selected wood varieties',
                  },
                  {
                    text:
                      locale === 'nb'
                        ? 'Miljøvennlig produksjon'
                        : 'Environmentally friendly production',
                  },
                  {
                    text:
                      locale === 'nb'
                        ? 'Unik design for hver lampe'
                        : 'Unique design for each lamp',
                  },
                ].map((item, index) => (
                  <div key={index} className="group flex items-center gap-4">
                    <div className="relative">
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-lg shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                        <svg
                          className="h-4 w-4 text-slate-950"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <div className="absolute inset-0 h-8 w-8 rounded-xl bg-amber-400 opacity-20 blur-md transition-opacity duration-300 group-hover:opacity-40"></div>
                    </div>
                    <span className="text-lg font-light tracking-wide text-slate-300 transition-colors duration-300 group-hover:text-slate-200">
                      {item.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="group relative">
              <div className="relative">
                <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-amber-500/15 via-amber-400/25 to-amber-600/15 opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-90"></div>
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-1 backdrop-blur-sm">
                  <div className="overflow-hidden rounded-[1.4rem] bg-gradient-to-br from-slate-700/20 to-slate-800/20">
                    <Image
                      src="/home/craft-section.jpg"
                      alt={
                        locale === 'nb'
                          ? 'Tradisjonelt håndverk og moderne design'
                          : 'Traditional craftsmanship and modern design'
                      }
                      width={800}
                      height={750}
                      className="h-[750px] w-full transform object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                </div>
                <div className="absolute -top-4 -right-4 rotate-2 transform rounded-2xl bg-gradient-to-r from-amber-400 to-amber-500 px-6 py-3 text-sm font-bold text-slate-950 shadow-2xl shadow-amber-500/30 backdrop-blur-sm transition-transform duration-300 hover:rotate-0">
                  {locale === 'nb' ? 'Håndverk' : 'Handcraft'}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Premium Contact Section */}
      <section className="relative overflow-hidden py-40">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>
        <div className="bg-gradient-radial absolute top-1/4 left-1/4 h-96 w-96 rounded-full from-amber-500/6 to-transparent blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-20 text-center">
              <h2 className="font-fraunces mb-8 text-4xl font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
                {locale === 'nb' ? (
                  <>
                    <span className="block font-extralight text-slate-300">Interessert i en</span>
                    <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                      unik lampe?
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block font-extralight text-slate-300">Interested in a</span>
                    <span className="block bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                      unique lamp?
                    </span>
                  </>
                )}
              </h2>
              <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-400">
                {locale === 'nb'
                  ? 'Kontakt meg for å diskutere ditt prosjekt. Jeg lager tilpassede design som passer perfekt til ditt hjem og stil.'
                  : 'Contact me to discuss your project. I create custom designs that fit perfectly with your home and style.'}
              </p>
            </div>

            <div className="mb-16 grid gap-8 md:grid-cols-3">
              {[
                {
                  icon: 'M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z',
                  title: locale === 'nb' ? 'Ring meg' : 'Call me',
                  subtitle:
                    locale === 'nb'
                      ? 'Direkte kontakt for rådgivning'
                      : 'Direct contact for consultation',
                  contact: '+47 123 45 678',
                },
                {
                  icon: 'M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z',
                  title: locale === 'nb' ? 'Send e-post' : 'Send email',
                  subtitle: locale === 'nb' ? 'Beskriv ditt prosjekt' : 'Describe your project',
                  contact: 'kontakt@lamper.no',
                },
                {
                  icon: 'M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z',
                  title: locale === 'nb' ? 'Møt meg' : 'Meet me',
                  subtitle: locale === 'nb' ? 'Besøk verkstedet' : 'Visit the workshop',
                  contact: locale === 'nb' ? 'Bergen, Norge' : 'Bergen, Norway',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="group relative overflow-hidden rounded-3xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10"
                >
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-amber-500/0 via-amber-400/10 to-amber-500/0 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
                  <div className="relative text-center">
                    <div className="relative mx-auto mb-6">
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 shadow-2xl shadow-amber-500/30 transition-transform duration-300 group-hover:scale-110">
                        <svg
                          className="h-8 w-8 text-slate-950"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d={item.icon} />
                        </svg>
                      </div>
                      <div className="absolute inset-0 mx-auto h-16 w-16 rounded-2xl bg-amber-400 opacity-20 blur-lg transition-opacity duration-300 group-hover:opacity-40"></div>
                    </div>
                    <h3 className="mb-4 text-xl font-light text-slate-100 transition-colors duration-300 group-hover:text-white">
                      {item.title}
                    </h3>
                    <p className="mb-4 font-light text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                      {item.subtitle}
                    </p>
                    <p className="font-medium tracking-wide text-amber-400 transition-colors duration-300 group-hover:text-amber-300">
                      {item.contact}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
