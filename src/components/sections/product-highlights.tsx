'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { IProduct } from '@/lib/types';

export default function ProductHighlights() {
  const t = useTranslations('common.sections.products');
  const products = useTranslations('products');

  // Parse products from translations - use try/catch for safety
  let productList: IProduct[] = [];
  try {
    productList = JSON.parse(products.raw(''));
  } catch (error) {
    console.error('Failed to parse products:', error);
    // Fallback to sample data if parsing fails
    productList = [
      {
        id: 'fjord-01',
        name: 'Fjord',
        wood: 'Eik',
        colorTempK: 2700,
        size: 'Ø 30 cm',
        priceRange: '3 900–5 500 NOK',
        images: [
          {
            src: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0',
            alt: 'Lampeskjerm i eik',
            width: 1600,
            height: 1200,
          },
        ],
        description: 'Mykt, varmt lys fremhever årringer i eik.',
      },
    ];
  }

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

  return (
    <section
      id="produkter"
      className="bg-gradient-to-b from-[#0B0B0B] to-[#1a1a1a] py-20 lg:py-28"
      aria-labelledby="products-heading"
    >
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
                <motion.div
                  variants={hoverVariants}
                  className="overflow-hidden rounded-2xl border border-slate-700/30 bg-[#1a1a1a] shadow-lg transition-all duration-300 hover:border-[#FFB703]/30 hover:shadow-xl hover:shadow-[#FFB703]/10"
                >
                  {/* Product Image */}
                  <div className="relative overflow-hidden">
                    <Image
                      src={product.images[0].src}
                      alt={product.images[0].alt}
                      width={product.images[0].width}
                      height={product.images[0].height}
                      className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />

                    {/* Glow overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                    {/* Light bloom effect */}
                    <div className="absolute top-4 right-4 h-8 w-8 rounded-full bg-[#FFB703] opacity-20 blur-sm transition-opacity duration-300 group-hover:opacity-40" />
                  </div>

                  {/* Product Details */}
                  <div className="p-6">
                    <header className="mb-4">
                      <h3 className="font-fraunces mb-2 text-xl font-bold text-[#F6F3EC]">
                        {product.name}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span>{product.wood}</span>
                        <span>•</span>
                        <span>{product.size}</span>
                        <span>•</span>
                        <span>{product.colorTempK}K</span>
                      </div>
                    </header>

                    <p className="mb-4 text-sm leading-relaxed text-slate-300">
                      {product.description}
                    </p>

                    <footer className="flex items-center justify-between">
                      <span className="text-lg font-semibold text-[#FFB703]">
                        {product.priceRange}
                      </span>

                      <div className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-400">
                        E27 LED
                      </div>
                    </footer>
                  </div>
                </motion.div>
              </motion.article>
            ))}
          </div>

          {/* View All Products CTA */}
          <motion.div variants={cardVariants} className="mt-12 text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 font-medium text-[#FFB703] transition-colors duration-200 hover:text-[#E8A502]"
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
