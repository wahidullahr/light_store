'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { IProduct } from '@/lib/types';

export default function ProductsContent({
  locale,
  allProducts,
}: {
  locale: string;
  allProducts: IProduct[];
}) {
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);

  // Handle product card click
  const handleProductClick = (product: IProduct) => {
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
    if (selectedProduct?.detailImages && selectedProduct.detailImages.length > 0) {
      setCurrentImageIndex(prev =>
        prev === 0 ? selectedProduct.detailImages!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (selectedProduct?.detailImages && selectedProduct.detailImages.length > 0) {
      setCurrentImageIndex(prev =>
        prev === selectedProduct.detailImages!.length - 1 ? 0 : prev + 1
      );
    }
  };

  // Carousel images for hero section - use product images if available, or fallbacks
  const carouselImages =
    allProducts.length > 0
      ? allProducts.slice(0, 6).map(p => p.image || p.images[0]?.src || '/placeholder.jpg')
      : [
          '/products/lamp1/1.jpg',
          '/products/lamp2/1.jpg',
          '/products/lamp3/1.jpg',
          '/products/lamp4/1.jpg',
          '/products/lamp5/1.jpg',
          '/products/lamp6/1.jpg',
        ];

  // Rotate carousel images every 4 seconds
  useEffect(() => {
    if (carouselImages.length === 0) return;
    const interval = setInterval(() => {
      setCarouselIndex(prev => (prev + 1) % carouselImages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Display products
  const displayProducts = allProducts;

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
                <div className="relative mx-auto w-full max-w-none">
                  {/* Glow Effect */}
                  <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-amber-500/25 via-amber-400/35 to-amber-600/25 opacity-70 blur-2xl transition-opacity duration-700 group-hover:opacity-90"></div>

                  {/* Image Carousel Container */}
                  <div className="carousel relative h-[700px] overflow-hidden rounded-3xl bg-gradient-to-br from-slate-800/40 to-slate-900/40 p-0 backdrop-blur-sm">
                    {/* Rotating Images - Multiple high-quality wood images */}
                    <div className="carousel-slide relative h-full w-full overflow-hidden rounded-2xl">
                      {carouselImages.map((image, index) => (
                        <div
                          key={index}
                          className={`absolute inset-0 h-full w-full rounded-2xl transition-opacity duration-1000 ${
                            index === carouselIndex ? 'opacity-100' : 'opacity-0'
                          }`}
                        >
                          <Image
                            src={image}
                            alt={`Carousel image ${index + 1}`}
                            fill
                            className="h-full w-full rounded-2xl object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Carousel Indicators */}
                  <div className="absolute -bottom-8 left-1/2 flex -translate-x-1/2 transform space-x-2">
                    {carouselImages.map((_, index) => (
                      <div
                        key={index}
                        className={`h-2 w-2 rounded-full transition-all duration-300 ${
                          index === carouselIndex
                            ? 'scale-125 bg-amber-400'
                            : 'bg-amber-400/40 hover:bg-amber-400/80'
                        }`}
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
                className="group relative cursor-pointer overflow-hidden"
              >
                {/* Product Image with consistent aspect ratio */}
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-slate-900/50">
                  <Image
                    src={product.image || product.images[0]?.src || '/placeholder.jpg'}
                    alt={product.name}
                    width={400}
                    height={500}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                {/* Product Info - Optimized for 3-column layout */}
                <div className="pt-4">
                  <h3 className="mb-3 line-clamp-1 text-xl font-light text-slate-100 transition-colors duration-300 group-hover:text-white">
                    {product.name}
                  </h3>
                  <p className="mb-4 line-clamp-2 text-sm leading-relaxed font-light text-slate-400 transition-colors duration-300 group-hover:text-slate-300">
                    {product.description}
                  </p>

                  {/* Features with better spacing */}
                  {product.features && (
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
                  )}

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
                <div className="relative overflow-hidden rounded-2xl bg-slate-950">
                  <div
                    className="relative overflow-hidden"
                    style={{ height: '700px', width: '100%' }}
                  >
                    <Image
                      src={
                        (selectedProduct.detailImages && selectedProduct.detailImages.length > 0
                          ? selectedProduct.detailImages[currentImageIndex]
                          : selectedProduct.image) || '/placeholder.jpg'
                      }
                      alt={`${selectedProduct.name} - Image ${currentImageIndex + 1}`}
                      fill
                      className="h-full w-full object-contain"
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
                  </div>
                </div>

                {/* Image Thumbnails */}
                {selectedProduct.detailImages && selectedProduct.detailImages.length > 1 && (
                  <div className="flex justify-center gap-3 overflow-x-auto py-2">
                    {selectedProduct.detailImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={e => {
                          e.stopPropagation();
                          setCurrentImageIndex(index);
                        }}
                        className={`relative h-[60px] w-[80px] overflow-hidden rounded-lg border-2 transition-all duration-300 ${
                          index === currentImageIndex
                            ? 'border-amber-500'
                            : 'border-transparent opacity-70 hover:opacity-100'
                        }`}
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
                {selectedProduct.category && (
                  <div className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2">
                    <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                    <span className="text-sm font-medium text-amber-300">
                      {selectedProduct.category}
                    </span>
                  </div>
                )}

                {/* Product Name */}
                <h2 className="font-fraunces text-3xl leading-tight font-light text-slate-100 md:text-4xl">
                  {selectedProduct.name}
                </h2>

                {/* Price */}
                <div className="text-2xl font-medium text-amber-400">{selectedProduct.price}</div>

                {/* Detailed Description */}
                <div className="space-y-4">
                  <p className="leading-relaxed text-slate-300">
                    {selectedProduct.description}
                  </p>
                </div>

                {/* Features */}
                {selectedProduct.features && selectedProduct.features.length > 0 && (
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
                )}

                {/* Contact CTA */}
                <div className="space-y-4 pt-4">
                  <Link
                    href={`/${locale}/contact`}
                    className="block w-full rounded-xl bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 px-6 py-4 font-medium text-slate-950 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/25"
                  >
                    <span className="flex items-center justify-center gap-2">
                      <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {locale === 'nb'
                        ? 'Kontakt for tilpasset design'
                        : 'Contact for Custom Design'}
                    </span>
                  </Link>
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



