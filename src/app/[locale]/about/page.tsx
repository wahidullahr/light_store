import Image from 'next/image';

export default async function AboutPage(props: PageProps<'/[locale]/about'>) {
  const { locale } = await props.params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

        {/* Background Effects */}
        <div className="bg-gradient-radial absolute top-1/4 -left-1/4 h-96 w-96 rounded-full from-amber-500/10 to-transparent blur-3xl"></div>
        <div className="bg-gradient-radial absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full from-amber-600/8 to-transparent blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center xl:gap-20">
            {/* Left Side - Content */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-600/5 px-6 py-3 backdrop-blur-sm">
                <div className="relative">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-30"></div>
                </div>
                <span className="text-sm font-medium tracking-wide text-amber-200">
                  {locale === 'nb' ? 'Vår historie' : 'Our Story'}
                </span>
              </div>

              <div className="space-y-6">
                <h1 className="font-fraunces text-4xl leading-[1.1] font-light tracking-tight text-slate-50 md:text-5xl lg:text-6xl xl:text-7xl">
                  {locale === 'nb' ? (
                    <>
                      <span className="block font-extralight text-slate-200">Oppdag</span>
                      <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text font-normal text-transparent">
                        vår historie
                      </span>
                      <span className="mt-2 block text-3xl font-extralight text-slate-300 md:text-4xl lg:text-5xl xl:text-6xl">
                        og verdier
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block font-extralight text-slate-200">Discover</span>
                      <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text font-normal text-transparent">
                        our story
                      </span>
                      <span className="mt-2 block text-3xl font-extralight text-slate-300 md:text-4xl lg:text-5xl xl:text-6xl">
                        and values
                      </span>
                    </>
                  )}
                </h1>

                <p className="max-w-2xl text-xl leading-relaxed font-light tracking-wide text-slate-400 lg:text-2xl">
                  {locale === 'nb'
                    ? 'Med over 20 år av håndverkserfaring og lidenskap for nordisk design, skaper vi unike trelykter som kombinerer tradisjonell håndverkskunst med moderne estetikk.'
                    : 'With over 20 years of craftsmanship experience and passion for Nordic design, we create unique wooden lamps that combine traditional handcraft with modern aesthetics.'}
                </p>
              </div>
            </div>

            {/* Right Side - Image */}
            <div className="relative">
              <div className="group relative">
                <div className="relative mx-auto max-w-lg xl:max-w-xl">
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-80"></div>

                  <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-1 backdrop-blur-sm">
                    <div className="overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-slate-700/30 to-slate-800/30">
                      <Image
                        src="/wood1.jpg"
                        alt={locale === 'nb' ? 'Vår håndverksstudio' : 'Our craft studio'}
                        width={600}
                        height={500}
                        className="h-[500px] w-full object-cover transition-transform duration-1000"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        <div className="relative container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="font-fraunces mb-6 text-4xl font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {locale === 'nb' ? 'Våre' : 'Our'}{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {locale === 'nb' ? 'verdier' : 'values'}
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-400">
              {locale === 'nb'
                ? 'Våre grunnleggende prinsipper som former hver lampe vi lager'
                : 'Our fundamental principles that shape every lamp we create'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Craftsmanship */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 p-4">
                <svg
                  className="h-8 w-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-light text-slate-100">
                {locale === 'nb' ? 'Håndverk' : 'Craftsmanship'}
              </h3>
              <p className="text-slate-400">
                {locale === 'nb'
                  ? 'Hver lampe er unikt håndlaget av erfarne norske håndverkere med over 20 år erfaring.'
                  : 'Each lamp is uniquely handcrafted by experienced Norwegian artisans with over 20 years of experience.'}
              </p>
            </div>

            {/* Sustainability */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 p-4">
                <svg
                  className="h-8 w-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-light text-slate-100">
                {locale === 'nb' ? 'Bærekraft' : 'Sustainability'}
              </h3>
              <p className="text-slate-400">
                {locale === 'nb'
                  ? 'Vi bruker kun bærekraftig norsk tre og miljøvennlige materialer i våre produkter.'
                  : 'We use only sustainable Norwegian wood and eco-friendly materials in our products.'}
              </p>
            </div>

            {/* Design */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 p-4">
                <svg
                  className="h-8 w-8 text-amber-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              </div>
              <h3 className="mb-4 text-2xl font-light text-slate-100">
                {locale === 'nb' ? 'Design' : 'Design'}
              </h3>
              <p className="text-slate-400">
                {locale === 'nb'
                  ? 'Nordisk designestetikk møter moderne funksjonalitet for tidløse interiører.'
                  : 'Nordic design aesthetics meet modern functionality for timeless interiors.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        <div className="relative container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="font-fraunces mb-6 text-4xl font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {locale === 'nb' ? 'Vårt' : 'Our'}{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {locale === 'nb' ? 'team' : 'team'}
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-400">
              {locale === 'nb'
                ? 'Møt de talentfulle håndverkerne bak Tindra'
                : 'Meet the talented artisans behind Tindra'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Team Member 1 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="mb-6 flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-700/50">
                    <svg
                      className="h-16 w-16 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 text-center text-2xl font-light text-slate-100">
                {locale === 'nb' ? 'Erik Nordmann' : 'Erik Nordmann'}
              </h3>
              <p className="mb-4 text-center text-amber-400">
                {locale === 'nb' ? 'Gründer & Mestermaker' : 'Founder & Master Craftsman'}
              </p>
              <p className="text-center text-slate-400">
                {locale === 'nb'
                  ? 'Med over 25 år erfaring i trehåndverk, leder Erik vårt kreative team med lidenskap og presisjon.'
                  : 'With over 25 years of experience in woodworking, Erik leads our creative team with passion and precision.'}
              </p>
            </div>

            {/* Team Member 2 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="mb-6 flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-700/50">
                    <svg
                      className="h-16 w-16 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 text-center text-2xl font-light text-slate-100">
                {locale === 'nb' ? 'Ingrid Solberg' : 'Ingrid Solberg'}
              </h3>
              <p className="mb-4 text-center text-amber-400">
                {locale === 'nb' ? 'Designer & Innovatør' : 'Designer & Innovator'}
              </p>
              <p className="text-center text-slate-400">
                {locale === 'nb'
                  ? 'Ingrid bringer nytt liv til tradisjonell trehåndverk med moderne design og innovative teknikker.'
                  : 'Ingrid brings new life to traditional woodworking with modern design and innovative techniques.'}
              </p>
            </div>

            {/* Team Member 3 */}
            <div className="group relative overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 p-8 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10">
              <div className="mb-6 flex justify-center">
                <div className="relative h-32 w-32 overflow-hidden rounded-full">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-400/20 to-amber-600/20"></div>
                  <div className="relative flex h-full w-full items-center justify-center rounded-full bg-slate-700/50">
                    <svg
                      className="h-16 w-16 text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
              <h3 className="mb-2 text-center text-2xl font-light text-slate-100">
                {locale === 'nb' ? 'Lars Hansen' : 'Lars Hansen'}
              </h3>
              <p className="mb-4 text-center text-amber-400">
                {locale === 'nb' ? 'Mestermaker & Mentor' : 'Master Craftsman & Mentor'}
              </p>
              <p className="text-center text-slate-400">
                {locale === 'nb'
                  ? 'Lars deler sin kunnskap med neste generasjon håndverkere og sikrer kvaliteten i hvert verk.'
                  : 'Lars shares his knowledge with the next generation of artisans and ensures quality in every piece.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950"></div>

        <div className="relative container mx-auto px-4">
          <div className="mb-20 text-center">
            <h2 className="font-fraunces mb-6 text-4xl font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {locale === 'nb' ? 'Vår' : 'Our'}{' '}
              <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                {locale === 'nb' ? 'verksted' : 'workshop'}
              </span>
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-400">
              {locale === 'nb'
                ? 'En kikk inn i vår kreative verden hvor tre blir til kunst'
                : 'A glimpse into our creative world where wood transforms into art'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[2, 3, 4, 5, 6, 7].map(index => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-1 backdrop-blur-sm transition-all duration-500 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 via-amber-400/5 to-amber-600/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                  <Image
                    src={`/wood${index + 1}.jpg`}
                    alt={`${locale === 'nb' ? 'Verkstedsbilde' : 'Workshop image'} ${index + 1}`}
                    width={400}
                    height={320}
                    className="h-80 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
