'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
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
                <Image
                  src="/home/craft-section.jpg"
                  alt="Handcrafted wooden lamp workshop showing traditional craftsmanship"
                  width={400}
                  height={500}
                  className="h-full w-full object-cover"
                  priority
                />

                {/* Overlay for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
              </div>

              <figcaption className="sr-only">
                Real workshop image showcasing our handcrafted wooden lamp creation process
              </figcaption>
            </motion.figure>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
