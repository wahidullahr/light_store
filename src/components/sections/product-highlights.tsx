'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { IProduct } from '@/lib/types';

export default function ProductHighlights({ products = [] }: { products?: IProduct[] }) {
  const t = useTranslations('common.sections.products');
  const [isMounted, setIsMounted] = useState(false);

  // Fix hydration mismatch by ensuring client-only rendering for motion components
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Use provided products or empty array
  const productList = products;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const hoverVariants = {
    hover: {
      y: -8,
      transition: {
        duration: 0.3,
      },
    },
  };

  // Only render if we have products
  if (!productList || productList.length === 0) {
    return null;
  }

  if (!isMounted) {
    return (
      <section
        id="produkter"
        className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28"
        aria-labelledby="products-heading"
      >
        <div className="bg-gradient-radial absolute right-1/4 top-1/4 h-96 w-96 rounded-full from-amber-500/8 to-transparent blur-3xl"></div>
        <Container>
          <SectionHeader title={t('title')} subtitle={t('subtitle')} className="mb-16" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productList.map(product => (
              <article key={product.id} className="group relative">
                <Link href={`/products`} className="block h-full">
                  <div className="h-full overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/20">
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.images[0]?.src || product.image || '/placeholder.jpg'}
                        alt={product.images[0]?.alt || product.name}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Light bloom effect */}
                      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-amber-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <header className="mb-4">
                        <h3 className="font-fraunces mb-2 text-xl font-light text-slate-100">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{product.wood}</span>
                        </div>
                      </header>

                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-300">
                        {product.description}
                      </p>

                      <footer className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-semibold text-amber-400">
                          {product.priceRange || product.price}
                        </span>

                        <div className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                          LED
                        </div>
                      </footer>
                    </div>
                  </div>
                </Link>
              </article>
            ))}
          </div>

          {/* View All Products CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-medium text-amber-400 transition-colors duration-200 hover:text-amber-300"
            >
              Se hele kolleksjonen
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      id="produkter"
      className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 py-20 lg:py-28"
      aria-labelledby="products-heading"
    >
      <div className="bg-gradient-radial absolute right-1/4 top-1/4 h-96 w-96 rounded-full from-amber-500/8 to-transparent blur-3xl"></div>
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <SectionHeader title={t('title')} subtitle={t('subtitle')} className="mb-16" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {productList.map(product => (
              <motion.article
                key={product.id}
                variants={cardVariants}
                whileHover="hover"
                className="group relative"
              >
                <Link href={`/products`} className="block h-full">
                  <motion.div
                    variants={hoverVariants}
                    className="h-full overflow-hidden rounded-2xl border border-slate-800/50 bg-gradient-to-br from-slate-900/50 to-slate-800/30 shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-amber-500/50 hover:shadow-xl hover:shadow-amber-500/20"
                  >
                    {/* Product Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={product.images[0]?.src || product.image || '/placeholder.jpg'}
                        alt={product.images[0]?.alt || product.name}
                        width={800}
                        height={600}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />

                      {/* Glow overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                      {/* Light bloom effect */}
                      <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-amber-500 opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
                    </div>

                    {/* Product Details */}
                    <div className="p-6">
                      <header className="mb-4">
                        <h3 className="font-fraunces mb-2 text-xl font-light text-slate-100">
                          {product.name}
                        </h3>
                        <div className="flex items-center gap-4 text-sm text-slate-400">
                          <span>{product.wood}</span>
                        </div>
                      </header>

                      <p className="mb-4 line-clamp-2 text-sm leading-relaxed text-slate-300">
                        {product.description}
                      </p>

                      <footer className="mt-auto flex items-center justify-between">
                        <span className="text-lg font-semibold text-amber-400">
                          {product.priceRange || product.price}
                        </span>

                        <div className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                          LED
                        </div>
                      </footer>
                    </div>
                  </motion.div>
                </Link>
              </motion.article>
            ))}
          </div>

          {/* View All Products CTA */}
          <motion.div variants={cardVariants} className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-medium text-amber-400 transition-colors duration-200 hover:text-amber-300"
            >
              Se hele kolleksjonen
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
