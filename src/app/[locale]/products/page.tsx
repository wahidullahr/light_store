'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Product {
  id: number;
  name: string;
  category: string;
  price: string;
  image: string;
  description: string;
  features: string[];
  detailImages?: string[];
  detailDescription?: string;
}

interface IProductsPageProps {
  params: { locale: string };
}

export default function ProductsPage({ params }: IProductsPageProps) {
  const { locale } = params;

  // All products including extended collection (wood1-wood12)
  const allProducts = [
    // Original products (wood1-wood6)
    {
      id: 1,
      name: locale === 'nb' ? 'Nordisk Eleganse' : 'Nordic Elegance',
      category: locale === 'nb' ? 'Taklampe' : 'Ceiling Lamp',
      price: locale === 'nb' ? 'Fra 2.890 kr' : 'From 2,890 NOK',
      image: '/wood1.jpg',
      description:
        locale === 'nb'
          ? 'Håndlaget taklampe i ek med varm, diffus belysning'
          : 'Handcrafted oak ceiling lamp with warm, diffused lighting',
      features:
        locale === 'nb'
          ? ['Norsk eik', 'LED-integrert', 'Dimmbar', '2 års garanti']
          : ['Norwegian oak', 'LED integrated', 'Dimmable', '2-year warranty'],
      detailImages: ['/wood1.jpg', '/wood1.jpg', '/wood1.jpg'],
      detailDescription:
        locale === 'nb'
          ? 'Denne eksklusive taklampen er håndlaget av erfarne norske håndverkere fra premium norsk eik. Hver lampe er unikt formet og behandlet med naturlige oljer for å fremheve trestrukturen. Den integrerte LED-teknologien gir perfekt lys for ethvert rom, mens den dimmbare funksjonen lar deg tilpasse stemningen.'
          : 'This exclusive ceiling lamp is handcrafted by experienced Norwegian artisans from premium Norwegian oak. Each lamp is uniquely shaped and treated with natural oils to highlight the wood grain. The integrated LED technology provides perfect lighting for any room, while the dimmable function lets you adjust the ambiance.',
    },
    {
      id: 2,
      name: locale === 'nb' ? 'Fjord Mystikk' : 'Fjord Mystique',
      category: locale === 'nb' ? 'Bordlampe' : 'Table Lamp',
      price: locale === 'nb' ? 'Fra 1.690 kr' : 'From 1,690 NOK',
      image: '/wood2.jpg',
      description:
        locale === 'nb'
          ? 'Skulpturell bordlampe inspirert av norske fjorder'
          : 'Sculptural table lamp inspired by Norwegian fjords',
      features:
        locale === 'nb'
          ? ['Bjørk tre', 'Håndformet', 'Naturlig olje', 'Unikt design']
          : ['Birch wood', 'Hand-shaped', 'Natural oil', 'Unique design'],
      detailImages: ['/wood2.jpg', '/wood2.jpg', '/wood2.jpg'],
      detailDescription:
        locale === 'nb'
          ? 'Inspirert av de majestætiske norske fjordene, denne skulpturelle bordlampen er håndformet fra norsk bjørk. Den organiske formen gjenspeiler naturens egne kurver og former, mens det varme lyset skaper en intim atmosfære i ethvert rom.'
          : "Inspired by the majestic Norwegian fjords, this sculptural table lamp is hand-shaped from Norwegian birch. The organic form reflects nature's own curves and shapes, while the warm light creates an intimate atmosphere in any room.",
    },
    {
      id: 3,
      name: locale === 'nb' ? 'Aurora Borealis' : 'Northern Lights',
      category: locale === 'nb' ? 'Gulvlampe' : 'Floor Lamp',
      price: locale === 'nb' ? 'Fra 3.490 kr' : 'From 3,490 NOK',
      image: '/wood3.jpg',
      description:
        locale === 'nb'
          ? 'Spektakulær gulvlampe som skaper magiske lyseffekter'
          : 'Spectacular floor lamp creating magical light effects',
      features:
        locale === 'nb'
          ? ['Furu tre', 'RGB LED', 'Smart kontroll', 'Atmosfærelys']
          : ['Pine wood', 'RGB LED', 'Smart control', 'Ambient light'],
      detailImages: ['/wood3.jpg', '/wood3.jpg', '/wood3.jpg'],
      detailDescription:
        locale === 'nb'
          ? 'Denne spektakulære gulvlampen kombinerer tradisjonelt håndverk med moderne teknologi. Den RGB LED-teknologien lar deg skape nordlys-lignende effekter i ditt eget hjem, mens den smarte kontrollen gir deg full kontroll over farger og intensitet.'
          : 'This spectacular floor lamp combines traditional craftsmanship with modern technology. The RGB LED technology lets you create northern lights-like effects in your own home, while smart control gives you full control over colors and intensity.',
    },
    {
      id: 4,
      name: locale === 'nb' ? 'Vintage Vikingskip' : 'Viking Vessel Vintage',
      category: locale === 'nb' ? 'Vegglampe' : 'Wall Lamp',
      price: locale === 'nb' ? 'Fra 2.190 kr' : 'From 2,190 NOK',
      image: '/wood4.jpg',
      description:
        locale === 'nb'
          ? 'Historisk inspirert vegglampe med moderne funktionalitet'
          : 'Historically inspired wall lamp with modern functionality',
      features:
        locale === 'nb'
          ? ['Gammel furu', 'Antikk finish', 'Justerbar arm', 'Vintage LED']
          : ['Aged pine', 'Antique finish', 'Adjustable arm', 'Vintage LED'],
      detailImages: ['/wood4.jpg', '/wood4.jpg', '/wood4.jpg'],
      detailDescription:
        locale === 'nb'
          ? 'En hyllest til vårt maritime arv, denne vegglampen kombinerer historisk design med moderne LED-teknologi. Den justerbare armen lar deg rette lyset akkurat dit du trenger det.'
          : 'A tribute to our maritime heritage, this wall lamp combines historical design with modern LED technology. The adjustable arm lets you direct light exactly where you need it.',
    },
    {
      id: 5,
      name: locale === 'nb' ? 'Minimalistisk Midnight' : 'Minimalist Midnight',
      category: locale === 'nb' ? 'Pendant' : 'Pendant',
      price: locale === 'nb' ? 'Fra 2.290 kr' : 'From 2,290 NOK',
      image: '/wood5.jpg',
      description:
        locale === 'nb'
          ? 'Ren, moderne pendant med skandinavisk design'
          : 'Clean, modern pendant with Scandinavian design',
      features:
        locale === 'nb'
          ? ['Valnøtt tre', 'Minimal design', 'Energieffektiv', 'Tidsløs stil']
          : ['Walnut wood', 'Minimal design', 'Energy efficient', 'Timeless style'],
      detailImages: ['/wood5.jpg', '/wood5.jpg', '/wood5.jpg'],
    },
    {
      id: 6,
      name: locale === 'nb' ? 'Arktisk Glød' : 'Arctic Glow',
      category: locale === 'nb' ? 'Dekorlampe' : 'Decorative Lamp',
      price: locale === 'nb' ? 'Fra 1.890 kr' : 'From 1,890 NOK',
      image: '/wood6.jpg',
      description:
        locale === 'nb'
          ? 'Kunstnerisk lampe som skaper stemningsfulle skygger'
          : 'Artistic lamp creating atmospheric shadows',
      features:
        locale === 'nb'
          ? ['Bambus', 'Perforert design', 'Varmt lys', 'Håndskåret']
          : ['Bamboo', 'Perforated design', 'Warm light', 'Hand-carved'],
      detailImages: ['/wood6.jpg', '/wood6.jpg', '/wood6.jpg'],
    },
    // Extended collection (wood7-wood12)
    {
      id: 7,
      name: locale === 'nb' ? 'Skandi Harmoni' : 'Scandinavian Harmony',
      category: locale === 'nb' ? 'Taklampe' : 'Ceiling Lamp',
      price: locale === 'nb' ? 'Fra 3.190 kr' : 'From 3,190 NOK',
      image: '/wood7.jpg',
      description:
        locale === 'nb'
          ? 'Elegant taklampe med perfekt balanse mellom form og funksjon'
          : 'Elegant ceiling lamp with perfect balance between form and function',
      features:
        locale === 'nb'
          ? ['Ask tre', 'Dimmerkompatibel', 'Nordisk design', 'Miljøvennlig']
          : ['Ash wood', 'Dimmer compatible', 'Nordic design', 'Eco-friendly'],
      detailImages: ['/wood7.jpg', '/wood7.jpg', '/wood7.jpg'],
    },
    {
      id: 8,
      name: locale === 'nb' ? 'Fjell Silhuett' : 'Mountain Silhouette',
      category: locale === 'nb' ? 'Bordlampe' : 'Table Lamp',
      price: locale === 'nb' ? 'Fra 2.490 kr' : 'From 2,490 NOK',
      image: '/wood8.jpg',
      description:
        locale === 'nb'
          ? 'Inspirert av norske fjellformasjoner, håndskåret i heltre'
          : 'Inspired by Norwegian mountain formations, hand-carved from solid wood',
      features:
        locale === 'nb'
          ? ['Eik tre', 'Håndskåret', 'Unikt mønster', 'Varm belysning']
          : ['Oak wood', 'Hand-carved', 'Unique pattern', 'Warm lighting'],
      detailImages: ['/wood8.jpg', '/wood8.jpg', '/wood8.jpg'],
    },
    {
      id: 9,
      name: locale === 'nb' ? 'Norröna Kraft' : 'Northern Strength',
      category: locale === 'nb' ? 'Gulvlampe' : 'Floor Lamp',
      price: locale === 'nb' ? 'Fra 4.290 kr' : 'From 4,290 NOK',
      image: '/wood9.jpg',
      description:
        locale === 'nb'
          ? 'Kraftfull gulvlampe som kombinerer rustikk sjarm med moderne teknologi'
          : 'Powerful floor lamp combining rustic charm with modern technology',
      features:
        locale === 'nb'
          ? ['Furu stamme', 'Smart LED', 'Fjernkontroll', 'Robust design']
          : ['Pine trunk', 'Smart LED', 'Remote control', 'Robust design'],
      detailImages: ['/wood9.jpg', '/wood9.jpg', '/wood9.jpg'],
    },
    {
      id: 10,
      name: locale === 'nb' ? 'Coastal Breeze' : 'Coastal Breeze',
      category: locale === 'nb' ? 'Vegglampe' : 'Wall Lamp',
      price: locale === 'nb' ? 'Fra 1.990 kr' : 'From 1,990 NOK',
      image: '/wood10.jpg',
      description:
        locale === 'nb'
          ? 'Luftig vegglampe som fanger essensen av norsk kystlinje'
          : 'Airy wall lamp capturing the essence of Norwegian coastline',
      features:
        locale === 'nb'
          ? ['Driftved', 'Naturlig form', 'Saltvann behandlet', 'Unik tekstur']
          : ['Driftwood', 'Natural form', 'Saltwater treated', 'Unique texture'],
      detailImages: ['/wood10.jpg', '/wood10.jpg', '/wood10.jpg'],
    },
    {
      id: 11,
      name: locale === 'nb' ? 'Boreal Eleganse' : 'Boreal Elegance',
      category: locale === 'nb' ? 'Pendant' : 'Pendant',
      price: locale === 'nb' ? 'Fra 2.790 kr' : 'From 2,790 NOK',
      image: '/wood11.jpg',
      description:
        locale === 'nb'
          ? 'Sofistikert pendant inspirert av nordlige skoger'
          : 'Sophisticated pendant inspired by northern forests',
      features:
        locale === 'nb'
          ? ['Gran tre', 'Naturlig harpiks', 'Organisk form', 'Dempet lys']
          : ['Spruce wood', 'Natural resin', 'Organic form', 'Diffused light'],
      detailImages: ['/wood11.jpg', '/wood11.jpg', '/wood11.jpg'],
    },
    {
      id: 12,
      name: locale === 'nb' ? 'Midnight Sun' : 'Midnight Sun',
      category: locale === 'nb' ? 'Dekorlampe' : 'Decorative Lamp',
      price: locale === 'nb' ? 'Fra 3.590 kr' : 'From 3,590 NOK',
      image: '/wood12.jpg',
      description:
        locale === 'nb'
          ? 'Spektakulær dekorlampe som simulerer midnattssolen'
          : 'Spectacular decorative lamp simulating the midnight sun',
      features:
        locale === 'nb'
          ? ['Bjørk burl', 'RGB spektrum', 'App kontroll', 'Kunstnerisk']
          : ['Birch burl', 'RGB spectrum', 'App control', 'Artistic'],
      detailImages: ['/wood12.jpg', '/wood12.jpg', '/wood12.jpg'],
    },
  ];

  return <ProductsContent locale={locale} allProducts={allProducts} />;
}

// Client component for interactive functionality
function ProductsContent({ locale, allProducts }: { locale: string; allProducts: Product[] }) {
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Handle product card click
  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0); // Reset to first image
    setIsModalOpen(true);
  };

  // Handle modal close
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentImageIndex(0);
    setTimeout(() => setSelectedProduct(null), 300); // Delay clearing product for smooth animation
  };

  // Handle image navigation
  const handlePreviousImage = () => {
    if (selectedProduct?.detailImages) {
      setCurrentImageIndex(prev =>
        prev === 0 ? selectedProduct.detailImages!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProduct?.detailImages) {
      setCurrentImageIndex(prev =>
        prev === selectedProduct.detailImages!.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Initial products to show (first 6)
  const initialProducts = allProducts.slice(0, 6);
  const additionalProducts = allProducts.slice(6);
  const displayProducts = showAllProducts ? allProducts : initialProducts;

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      {/* Hero Section with Image Carousel */}
      <section className="relative overflow-hidden py-16 lg:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

        {/* Background Effects */}
        <div className="bg-gradient-radial absolute top-1/4 -left-1/4 h-96 w-96 rounded-full from-amber-500/10 to-transparent blur-3xl"></div>
        <div className="bg-gradient-radial absolute -right-1/4 bottom-1/4 h-96 w-96 rounded-full from-amber-600/8 to-transparent blur-3xl"></div>

        <div className="relative container mx-auto px-4">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center xl:gap-20">
            {/* Left Side - Content */}
            <div className="space-y-8">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 rounded-full border border-amber-500/20 bg-gradient-to-r from-amber-500/5 via-amber-500/10 to-amber-600/5 px-6 py-3 backdrop-blur-sm">
                <div className="relative">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-amber-400"></div>
                  <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-amber-400 opacity-30"></div>
                </div>
                <span className="text-sm font-medium tracking-wide text-amber-200">
                  {locale === 'nb' ? 'Vår eksklusive kolleksjon' : 'Our Exclusive Collection'}
                </span>
              </div>

              {/* Main Heading */}
              <div className="space-y-6">
                <h1 className="font-fraunces text-4xl leading-[1.1] font-light tracking-tight text-slate-50 md:text-5xl lg:text-6xl xl:text-7xl">
                  {locale === 'nb' ? (
                    <>
                      <span className="block font-extralight text-slate-200">Oppdagelse</span>
                      <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text font-normal text-transparent">
                        vår kolleksjon
                      </span>
                      <span className="mt-2 block text-3xl font-extralight text-slate-300 md:text-4xl lg:text-5xl xl:text-6xl">
                        av håndlagde lamper
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="block font-extralight text-slate-200">Discover</span>
                      <span className="block bg-gradient-to-r from-amber-300 via-amber-400 to-amber-500 bg-clip-text font-normal text-transparent">
                        our collection
                      </span>
                      <span className="mt-2 block text-3xl font-extralight text-slate-300 md:text-4xl lg:text-5xl xl:text-6xl">
                        of handcrafted lamps
                      </span>
                    </>
                  )}
                </h1>

                <p className="max-w-2xl text-xl leading-relaxed font-light tracking-wide text-slate-400 lg:text-2xl">
                  {locale === 'nb'
                    ? 'Fra minimalistiske design til skulpturelle kunstverker - hver lampe er unikt håndlaget og forteller sin egen historie av nordisk håndverk.'
                    : 'From minimalist designs to sculptural artworks - each lamp is uniquely handcrafted and tells its own story of Nordic craftsmanship.'}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8">
                {[
                  { number: '50+', label: locale === 'nb' ? 'Unike design' : 'Unique designs' },
                  { number: '100%', label: locale === 'nb' ? 'Håndlaget' : 'Handcrafted' },
                  { number: '2 år', label: locale === 'nb' ? 'Garanti' : 'Warranty' },
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="mb-2 text-3xl font-light text-amber-400">{stat.number}</div>
                    <div className="text-sm font-light tracking-wide text-slate-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Image Carousel */}
            <div className="relative">
              <div className="group relative">
                {/* Main Image Container */}
                <div className="relative mx-auto max-w-lg xl:max-w-xl">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-600/20 opacity-60 blur-2xl transition-opacity duration-700 group-hover:opacity-80"></div>

                  {/* Image Carousel Container */}
                  <div className="carousel relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-1 backdrop-blur-sm">
                    <div className="carousel-inner overflow-hidden rounded-[1.3rem] bg-gradient-to-br from-slate-700/30 to-slate-800/30">
                      {/* Rotating Images - Multiple high-quality wood images */}
                      <div className="carousel-slide relative">
                        <Image
                          src="/wood1.jpg"
                          alt="Nordic Elegance Ceiling Lamp"
                          width={800}
                          height={600}
                          className="animate-carousel h-[600px] w-full object-cover transition-all duration-1000"
                          style={{ animationDelay: '0s' }}
                        />
                        <Image
                          src="/wood3.jpg"
                          alt="Aurora Borealis Floor Lamp"
                          width={800}
                          height={600}
                          className="animate-carousel absolute inset-0 h-[600px] w-full object-cover opacity-0 transition-all duration-1000"
                          style={{ animationDelay: '2s' }}
                        />
                        <Image
                          src="/wood5.jpg"
                          alt="Minimalist Midnight Pendant"
                          width={800}
                          height={600}
                          className="animate-carousel absolute inset-0 h-[600px] w-full object-cover opacity-0 transition-all duration-1000"
                          style={{ animationDelay: '4s' }}
                        />
                        <Image
                          src="/wood7.jpg"
                          alt="Scandinavian Harmony Ceiling"
                          width={800}
                          height={600}
                          className="animate-carousel absolute inset-0 h-[600px] w-full object-cover opacity-0 transition-all duration-1000"
                          style={{ animationDelay: '6s' }}
                        />
                        <Image
                          src="/wood9.jpg"
                          alt="Northern Strength Floor Lamp"
                          width={800}
                          height={600}
                          className="animate-carousel absolute inset-0 h-[600px] w-full object-cover opacity-0 transition-all duration-1000"
                          style={{ animationDelay: '8s' }}
                        />
                        <Image
                          src="/wood11.jpg"
                          alt="Boreal Elegance Pendant"
                          width={800}
                          height={600}
                          className="animate-carousel absolute inset-0 h-[600px] w-full object-cover opacity-0 transition-all duration-1000"
                          style={{ animationDelay: '10s' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
                    {[1, 2, 3, 4, 5, 6].map((_, index) => (
                      <div
                        key={index}
                        className="h-2 w-2 rounded-full bg-amber-400/40 transition-all duration-300 hover:bg-amber-400/80"
                        style={{
                          animation: `pulse 2s ease-in-out infinite`,
                          animationDelay: `${index * 2}s`,
                        }}
                      ></div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Product Collection Section */}
      <section className="relative py-24 lg:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950"></div>

        <div className="relative container mx-auto px-4">
          {/* Section Header */}
          <div className="mb-20 text-center">
            <h2 className="font-fraunces mb-6 text-4xl font-light tracking-tight text-slate-100 md:text-5xl lg:text-6xl">
              {locale === 'nb' ? (
                <>
                  <span className="text-slate-300">Vår</span>{' '}
                  <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    kolleksjon
                  </span>
                </>
              ) : (
                <>
                  <span className="text-slate-300">Our</span>{' '}
                  <span className="bg-gradient-to-r from-amber-300 to-amber-500 bg-clip-text text-transparent">
                    collection
                  </span>
                </>
              )}
            </h2>
            <p className="mx-auto max-w-3xl text-xl leading-relaxed font-light text-slate-400">
              {locale === 'nb'
                ? 'Hver lampe er et unikt kunstverks designet og laget for hånd av erfarne norske håndverkere'
                : 'Each lamp is a unique artwork designed and crafted by hand by experienced Norwegian artisans'}
            </p>
          </div>

          {/* Product Grid - 3 Cards Per Row */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {displayProducts.map(product => (
              <div
                key={product.id}
                onClick={() => handleProductClick(product)}
                className="group relative cursor-pointer overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-800/20 to-slate-900/40 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-amber-500/30 hover:shadow-2xl hover:shadow-amber-500/10"
              >
                {/* Product Image with consistent aspect ratio */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={400}
                    height={300}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-60"></div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-slate-950 backdrop-blur-sm">
                    {product.category}
                  </div>
                </div>

                {/* Product Info - Optimized for 3-column layout */}
                <div className="p-6">
                  <h3 className="mb-3 line-clamp-1 text-xl font-light text-slate-100 transition-colors duration-300 group-hover:text-white">
                    {product.name}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed font-light text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {product.description}
                  </p>

                  {/* Features with better spacing */}
                  <div className="mb-5 flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature: string, featureIndex: number) => (
                      <span
                        key={featureIndex}
                        className="rounded-full border border-amber-500/20 bg-amber-500/10 px-3 py-1 text-xs font-light text-amber-300"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="rounded-full bg-slate-600/20 px-3 py-1 text-xs font-light text-slate-400">
                        +{product.features.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Price and CTA with better spacing */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-amber-400">{product.price}</span>
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        handleProductClick(product);
                      }}
                      className="rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 px-4 py-2 text-sm font-medium text-slate-950 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                    >
                      {locale === 'nb' ? 'Detaljer' : 'Details'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Show More / Show Less Button */}
          <div className="mt-12 text-center">
            {!showAllProducts ? (
              <button
                onClick={() => setShowAllProducts(true)}
                className="group relative overflow-hidden rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-8 py-4 font-medium text-slate-950 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-amber-500/20"
              >
                <span className="relative flex items-center gap-2 font-semibold tracking-wide">
                  {locale === 'nb' ? 'Se alle produkter' : 'View all products'}
                  <span className="text-sm opacity-75">
                    ({additionalProducts.length} {locale === 'nb' ? 'flere' : 'more'})
                  </span>
                </span>
              </button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-slate-400">
                  {locale === 'nb'
                    ? `Viser alle ${allProducts.length} produkter i vår kolleksjon`
                    : `Showing all ${allProducts.length} products in our collection`}
                </p>
                <button
                  onClick={() => setShowAllProducts(false)}
                  className="rounded-2xl border border-slate-700/50 bg-slate-800/30 px-8 py-4 font-medium text-slate-200 backdrop-blur-xl transition-all duration-500 hover:border-amber-500/50 hover:bg-slate-700/40"
                >
                  {locale === 'nb' ? 'Vis færre produkter' : 'Show fewer products'}
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {isModalOpen && selectedProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-4 backdrop-blur-sm"
          onClick={handleCloseModal}
        >
          <div
            className="relative max-h-[95vh] w-full max-w-7xl scale-100 transform overflow-y-auto rounded-3xl border border-slate-700/50 bg-gradient-to-br from-slate-800/95 to-slate-900/95 shadow-2xl backdrop-blur-xl transition-all duration-300"
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={e => {
                e.stopPropagation();
                handleCloseModal();
              }}
              aria-label={locale === 'nb' ? 'Lukk produktdetaljer' : 'Close product details'}
              className="group absolute top-6 right-6 z-10 rounded-full bg-slate-800/80 p-2 transition-colors duration-300 hover:bg-slate-700/80"
            >
              <svg
                className="h-6 w-6 text-slate-300 transition-colors group-hover:text-white"
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

            <div className="grid grid-cols-1 gap-8 p-8 lg:grid-cols-12">
              {/* Left Side - Large Image with Navigation */}
              <div className="space-y-6 lg:col-span-8">
                {/* Main Large Image with Navigation */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-700/30 to-slate-800/30 p-1">
                  <div
                    className="relative overflow-hidden rounded-xl"
                    style={{ height: '700px', width: '100%' }}
                  >
                    <Image
                      src={
                        selectedProduct.detailImages?.[currentImageIndex] || selectedProduct.image
                      }
                      alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="h-full w-full object-cover transition-all duration-500"
                    />

                    {/* Navigation Arrows */}
                    {selectedProduct.detailImages && selectedProduct.detailImages.length > 1 && (
                      <>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            handlePreviousImage();
                          }}
                          aria-label={locale === 'nb' ? 'Forrige bilde' : 'Previous image'}
                          className="absolute top-1/2 left-4 z-10 -translate-y-1/2 rounded-full bg-slate-900/80 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-slate-800/90"
                        >
                          <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            e.preventDefault();
                            handleNextImage();
                          }}
                          aria-label={locale === 'nb' ? 'Neste bilde' : 'Next image'}
                          className="absolute top-1/2 right-4 z-10 -translate-y-1/2 rounded-full bg-slate-900/80 p-3 text-white transition-all duration-300 hover:scale-110 hover:bg-slate-800/90"
                        >
                          <svg
                            className="h-6 w-6"
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
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {selectedProduct.detailImages && selectedProduct.detailImages.length > 1 && (
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-slate-900/80 px-3 py-1 text-sm text-white">
                        {currentImageIndex + 1} / {selectedProduct.detailImages.length}
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
                  </div>
                </div>

                {/* Image Thumbnails */}
                {selectedProduct.detailImages && selectedProduct.detailImages.length > 1 && (
                  <div className="flex justify-center gap-3">
                    {selectedProduct.detailImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={e => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`relative overflow-hidden rounded-lg transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'scale-105 ring-2 ring-amber-400'
                            : 'opacity-70 hover:scale-105 hover:opacity-100'
                        }`}
                        style={{ width: '80px', height: '60px' }}
                      >
                        <Image
                          src={image}
                          alt={`${selectedProduct.name} thumbnail ${index + 1}`}
                          fill
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Side - Product Details */}
              <div className="space-y-6 lg:col-span-4">
                {/* Category Badge */}
                <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
                  <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                  <span className="text-sm font-medium text-amber-300">
                    {selectedProduct.category}
                  </span>
                </div>

                {/* Product Name */}
                <h2 className="font-fraunces text-3xl leading-tight font-light text-slate-100 md:text-4xl">
                  {selectedProduct.name}
                </h2>

                {/* Price */}
                <div className="text-2xl font-medium text-amber-400">{selectedProduct.price}</div>

                {/* Detailed Description */}
                <div className="space-y-4">
                  <p className="leading-relaxed text-slate-300">
                    {selectedProduct.detailDescription || selectedProduct.description}
                  </p>
                </div>

                {/* Features */}
                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-slate-200">
                    {locale === 'nb' ? 'Egenskaper' : 'Features'}
                  </h3>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedProduct.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-amber-400"></div>
                        <span className="text-sm text-slate-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact CTA */}
                <div className="space-y-4 pt-4">
                  <button className="w-full rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-4 font-medium text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25">
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {locale === 'nb'
                        ? 'Kontakt for tilpasset design'
                        : 'Contact for Custom Design'}
                    </span>
                  </button>
                  <p className="text-center text-sm text-slate-400">
                    {locale === 'nb'
                      ? 'Alle lamper kan tilpasses dine spesifikke behov og ønsker'
                      : 'All lamps can be customized to your specific needs and preferences'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
