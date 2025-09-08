'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import { Button } from '@/components/ui/button';

export default function CTA() {
  const t = useTranslations('common.sections.cta');

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      id="bestill"
      className="relative overflow-hidden bg-gradient-to-br from-[#1a1a1a] via-[#0B0B0B] to-[#1a1a1a] py-20 lg:py-28"
      aria-labelledby="cta-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 h-32 w-32 animate-pulse rounded-full bg-[#FFB703] blur-3xl" />
        <div className="absolute right-20 bottom-20 h-24 w-24 animate-pulse rounded-full bg-[#FFB703] blur-2xl delay-1000" />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h2
            id="cta-heading"
            variants={itemVariants}
            className="font-fraunces mb-6 text-3xl font-bold text-[#F6F3EC] sm:text-4xl lg:text-5xl"
          >
            {t('title')}
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-slate-300"
          >
            {t('subtitle')}
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <Button
              size="lg"
              className="bg-[#FFB703] px-8 py-4 text-lg font-semibold text-[#0B0B0B] shadow-lg transition-all duration-200 hover:bg-[#E8A502] hover:shadow-xl hover:shadow-[#FFB703]/20"
              asChild
            >
              <a href="mailto:hei@nordlystrelys.no">{t('button')}</a>
            </Button>

            <div className="flex items-center gap-4 text-slate-300">
              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#FFB703]"
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
                <span className="text-sm">+47 40 00 00 00</span>
              </div>

              <span className="text-slate-500">eller</span>

              <div className="flex items-center gap-2">
                <svg
                  className="h-5 w-5 text-[#FFB703]"
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
                <span className="text-sm">hei@nordlystrelys.no</span>
              </div>
            </div>
          </motion.div>

          {/* Features badges */}
          <motion.div
            variants={itemVariants}
            className="mt-12 flex flex-wrap items-center justify-center gap-4"
          >
            {['Gratis konsultasjon', 'Tilpassede mål', 'Rask levering', '2 års garanti'].map(
              badge => (
                <div
                  key={badge}
                  className="rounded-full border border-[#FFB703]/20 bg-[#FFB703]/10 px-4 py-2 text-sm text-[#FFB703]"
                >
                  {badge}
                </div>
              )
            )}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
