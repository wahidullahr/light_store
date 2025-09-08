'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { ITestimonial } from '@/lib/types';
import { Star } from 'lucide-react';

export default function Testimonials() {
  const t = useTranslations('common.sections.testimonials');
  const testimonials = useTranslations('testimonials');

  // Parse testimonials from translations - use try/catch for safety
  let testimonialList: ITestimonial[] = [];
  try {
    testimonialList = JSON.parse(testimonials.raw(''));
  } catch (error) {
    console.error('Failed to parse testimonials:', error);
    // Fallback to sample data if parsing fails
    testimonialList = [
      { quote: 'Varmt lys og nydelig håndverk.', name: 'Hilde', location: 'Oslo' },
    ];
  }

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

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <section
      className="bg-gradient-to-b from-[#1a1a1a] to-[#0B0B0B] py-20 lg:py-28"
      aria-labelledby="testimonials-heading"
    >
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <SectionHeader title={t('title')} className="mb-16" />

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {testimonialList.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.name}-${index}`}
                variants={cardVariants}
                className="rounded-2xl border border-slate-700/30 bg-[#1a1a1a] p-8 shadow-lg transition-all duration-300 hover:border-[#FFB703]/30 hover:shadow-xl hover:shadow-[#FFB703]/5"
              >
                {/* Stars */}
                <div className="mb-6 flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FFB703] text-[#FFB703]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="mb-6 text-lg leading-relaxed text-[#F6F3EC]">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <footer className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#FFB703] to-[#E8A502]">
                    <span className="text-sm font-semibold text-[#0B0B0B]">
                      {testimonial.name[0]}
                    </span>
                  </div>
                  <div>
                    <cite className="font-medium text-[#F6F3EC] not-italic">
                      {testimonial.name}
                    </cite>
                    {testimonial.location && (
                      <p className="text-sm text-slate-400">{testimonial.location}</p>
                    )}
                  </div>
                </footer>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
