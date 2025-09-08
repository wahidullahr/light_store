'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { Leaf, Award, Hammer, TreePine } from 'lucide-react';

export default function Craft() {
  const t = useTranslations('common.sections.craft');

  const features = [
    {
      icon: TreePine,
      title: 'Norsk treverk',
      description: 'Fra bærekraftige skoger i Norge',
    },
    {
      icon: Hammer,
      title: 'Håndlaget',
      description: 'Formet med tradisjonelle teknikker',
    },
    {
      icon: Leaf,
      title: 'Miljøvennlig',
      description: 'Naturlige oljer og finish',
    },
    {
      icon: Award,
      title: 'Kvalitet',
      description: '2 års garanti på alle produkter',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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

  const iconVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.5,
        delay: 0.2,
      },
    },
  };

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0B0B0B] py-20 lg:py-28"
      aria-labelledby="craft-heading"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFB703' fill-opacity='0.1'%3E%3Cpath d='m0 40l40-40h-40v40zm40 0v-40h-40l40 40z'/%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <SectionHeader title={t('title')} subtitle={t('subtitle')} className="mb-16" />

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Content */}
            <motion.article variants={itemVariants} className="lg:pr-8">
              <motion.p
                variants={itemVariants}
                className="mb-8 text-lg leading-relaxed text-slate-300"
              >
                {t('content')}
              </motion.p>

              {/* Features Grid */}
              <motion.div variants={containerVariants} className="grid gap-6 sm:grid-cols-2">
                {features.map(feature => (
                  <motion.div
                    key={feature.title}
                    variants={itemVariants}
                    className="flex items-start gap-4 rounded-xl border border-slate-700/30 bg-[#1a1a1a]/50 p-4 transition-all duration-300 hover:border-[#FFB703]/30"
                  >
                    <motion.div
                      variants={iconVariants}
                      className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#FFB703]/10"
                    >
                      <feature.icon className="h-5 w-5 text-[#FFB703]" />
                    </motion.div>
                    <div>
                      <h3 className="mb-1 font-semibold text-[#F6F3EC]">{feature.title}</h3>
                      <p className="text-sm text-slate-300">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.article>

            {/* Visual Element */}
            <motion.figure variants={itemVariants} className="relative">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-slate-700/30 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a]">
                {/* Decorative wood grain pattern */}
                <div className="absolute inset-0 opacity-20">
                  <svg className="h-full w-full" viewBox="0 0 400 500" fill="none">
                    <path
                      d="M0 100 Q200 80 400 100 L400 120 Q200 140 0 120 Z"
                      fill="#FFB703"
                      opacity="0.1"
                    />
                    <path
                      d="M0 200 Q200 180 400 200 L400 220 Q200 240 0 220 Z"
                      fill="#FFB703"
                      opacity="0.15"
                    />
                    <path
                      d="M0 300 Q200 280 400 300 L400 320 Q200 340 0 320 Z"
                      fill="#FFB703"
                      opacity="0.1"
                    />
                    <path
                      d="M0 400 Q200 380 400 400 L400 420 Q200 440 0 420 Z"
                      fill="#FFB703"
                      opacity="0.12"
                    />
                  </svg>
                </div>

                {/* Centered lamp illustration */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative">
                    {/* Lamp base */}
                    <div className="h-40 w-32 rounded-lg bg-gradient-to-b from-[#8B4513] to-[#5D2F0A] shadow-2xl">
                      {/* Wood grain texture */}
                      <div className="absolute inset-0 opacity-30">
                        <div className="h-full w-full rounded-lg bg-gradient-to-r from-transparent via-[#A0522D] to-transparent"></div>
                      </div>
                    </div>

                    {/* Light glow */}
                    <div className="absolute -top-8 left-1/2 h-24 w-24 -translate-x-1/2 transform animate-pulse rounded-full bg-[#FFB703] opacity-20 blur-xl"></div>

                    {/* Light source */}
                    <div className="bg-gradient-radial absolute -top-4 left-1/2 h-12 w-12 -translate-x-1/2 transform rounded-full from-[#FFB703] to-[#E8A502] opacity-80 shadow-lg shadow-[#FFB703]/50"></div>
                  </div>
                </div>

                {/* Corner decorations */}
                <div className="absolute top-4 right-4 h-2 w-2 rounded-full bg-[#FFB703] opacity-40"></div>
                <div className="absolute bottom-4 left-4 h-1.5 w-1.5 rounded-full bg-[#FFB703] opacity-30"></div>
              </div>

              <figcaption className="sr-only">
                Illustration of handcrafted wooden lamp showcasing our artisanal approach
              </figcaption>
            </motion.figure>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
