'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export interface IHeroProps {
  image: { src: string; alt: string; width: number; height: number };
}

export default function Hero({ image }: IHeroProps) {
  const t = useTranslations('hero');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
      },
    },
  };

  return (
    <header
      id="home"
      aria-label={t('aria')}
      className="relative isolate overflow-hidden bg-[#0B0B0B] pt-16 pb-20 lg:pt-24 lg:pb-28"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0B0B0B] via-[#1a1a1a] to-[#0B0B0B] opacity-80" />

      <Container>
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="grid items-center gap-y-12 lg:grid-cols-12 lg:gap-12"
        >
          {/* Text Content */}
          <motion.section variants={itemVariants} className="lg:col-span-6 lg:pr-8">
            <motion.h1
              variants={itemVariants}
              className="font-fraunces text-4xl font-bold tracking-tight text-[#F6F3EC] sm:text-5xl lg:text-6xl"
            >
              {t('title')}
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="mt-6 max-w-prose text-lg leading-relaxed text-slate-300"
            >
              {t('subtitle')}
            </motion.p>

            <motion.nav
              variants={itemVariants}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row"
              aria-label={t('actions')}
            >
              <Button
                size="lg"
                className="bg-[#FFB703] px-8 py-4 text-base font-semibold text-[#0B0B0B] shadow-lg transition-all duration-200 hover:bg-[#E8A502] hover:shadow-xl hover:shadow-[#FFB703]/20"
                asChild
              >
                <a href="#bestill">{t('ctaPrimary')}</a>
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-slate-600 px-8 py-4 text-base text-[#F6F3EC] transition-all duration-200 hover:border-[#FFB703] hover:bg-[#FFB703]/10 hover:text-[#FFB703]"
                asChild
              >
                <a href="#produkter">{t('ctaSecondary')}</a>
              </Button>
            </motion.nav>
          </motion.section>

          {/* Hero Image */}
          <motion.figure variants={imageVariants} className="lg:col-span-6">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-[#FFB703]/20 via-transparent to-transparent" />

              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                priority
                className="aspect-[4/3] h-auto w-full object-cover lg:aspect-[3/4]"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 40vw"
              />

              {/* Light bloom overlay */}
              <div className="bg-gradient-radial absolute inset-0 from-[#FFB703]/10 via-transparent to-transparent opacity-60" />
            </div>

            <figcaption className="sr-only">{image.alt}</figcaption>
          </motion.figure>
        </motion.div>
      </Container>

      {/* Floating particles effect */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-2 w-2 animate-pulse rounded-full bg-[#FFB703] opacity-20" />
        <div className="absolute top-3/4 right-1/3 h-1 w-1 animate-pulse rounded-full bg-[#F6F3EC] opacity-30 delay-1000" />
        <div className="absolute bottom-1/3 left-2/3 h-1.5 w-1.5 animate-pulse rounded-full bg-[#FFB703] opacity-25 delay-500" />
      </div>
    </header>
  );
}
