'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Search, Hammer, Sparkles } from 'lucide-react';

export default function Process() {
  const t = useTranslations('common.sections.process');

  const processSteps = [
    {
      icon: Search,
      step: '01',
      title: t('steps.0.title'),
      description: t('steps.0.description'),
    },
    {
      icon: Hammer,
      step: '02',
      title: t('steps.1.title'),
      description: t('steps.1.description'),
    },
    {
      icon: Sparkles,
      step: '03',
      title: t('steps.2.title'),
      description: t('steps.2.description'),
    },
  ];

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

  const stepVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  const lineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8,

        delay: 0.5,
      },
    },
  };

  return (
    <section
      className="relative overflow-hidden bg-gradient-to-b from-[#0B0B0B] to-[#1a1a1a] py-20 lg:py-28"
      aria-labelledby="process-heading"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <svg className="h-full w-full" viewBox="0 0 400 400" fill="none">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFB703" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <SectionHeader title={t('title')} className="mb-20" />

          <div className="relative">
            {/* Process Steps */}
            <div className="grid gap-12 lg:grid-cols-3 lg:gap-8">
              {processSteps.map((step, index) => (
                <motion.article
                  key={step.step}
                  variants={stepVariants}
                  className="relative flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#FFB703] to-[#E8A502] shadow-lg shadow-[#FFB703]/20">
                      <step.icon className="h-8 w-8 text-[#0B0B0B]" />
                    </div>
                    <div className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#FFB703] bg-[#0B0B0B]">
                      <span className="text-sm font-bold text-[#FFB703]">{step.step}</span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-fraunces mb-4 text-xl font-bold text-[#F6F3EC]">
                      {step.title}
                    </h3>
                    <p className="leading-relaxed text-slate-300">{step.description}</p>
                  </div>

                  {/* Connection Line (Desktop) */}
                  {index < processSteps.length - 1 && (
                    <motion.div
                      variants={lineVariants}
                      className="absolute top-10 left-full hidden h-px w-8 origin-left bg-gradient-to-r from-[#FFB703] to-transparent lg:block"
                      style={{ transform: 'translateX(1rem)' }}
                    />
                  )}
                </motion.article>
              ))}
            </div>

            {/* Decorative elements */}
            <div className="absolute top-1/2 left-1/4 h-3 w-3 animate-pulse rounded-full bg-[#FFB703] opacity-20" />
            <div className="absolute right-1/3 bottom-1/4 h-2 w-2 animate-pulse rounded-full bg-[#FFB703] opacity-30 delay-1000" />
          </div>

          {/* Bottom CTA */}
          <motion.div variants={stepVariants} className="mt-16 text-center">
            <p className="mb-6 text-slate-300">Vil du vite mer om hvordan vi lager lampene dine?</p>
            <a
              href="#kontakt"
              className="inline-flex items-center gap-2 rounded-xl border border-[#FFB703]/30 bg-[#FFB703]/10 px-6 py-3 font-medium text-[#FFB703] transition-all duration-200 hover:border-[#FFB703]/50 hover:bg-[#FFB703]/20"
            >
              Kontakt oss
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
