'use client';

import { motion } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { IFAQ } from '@/lib/types';

export default function FAQ() {
  const t = useTranslations('common.sections.faq');
  const faq = useTranslations('faq');

  // Parse FAQ from translations - use try/catch for safety
  let faqList: IFAQ[] = [];
  try {
    faqList = JSON.parse(faq.raw(''));
  } catch (error) {
    console.error('Failed to parse FAQ:', error);
    // Fallback to sample data if parsing fails
    faqList = [
      { q: 'Hva er leveringstiden?', a: 'Som regel 3–4 uker. Spesialmål kan ta litt lengre tid.' },
    ];
  }

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
        duration: 0.5,
      },
    },
  };

  return (
    <section className="bg-[#0B0B0B] py-20 lg:py-28" aria-labelledby="faq-heading">
      <Container size="md">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <SectionHeader title={t('title')} className="mb-16" />

          <motion.div variants={itemVariants}>
            <Accordion type="single" collapsible className="space-y-4">
              {faqList.map((item, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="rounded-2xl border border-slate-700/30 bg-[#1a1a1a] px-6 transition-all duration-300 hover:border-[#FFB703]/30"
                >
                  <AccordionTrigger className="py-6 text-left font-medium text-[#F6F3EC] hover:text-[#FFB703] [&[data-state=open]]:text-[#FFB703]">
                    {item.q}
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 leading-relaxed text-slate-300">
                    {item.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>

          {/* Additional help */}
          <motion.div
            variants={itemVariants}
            className="mt-12 rounded-2xl border border-slate-700/30 bg-[#1a1a1a] p-8 text-center"
          >
            <h3 className="mb-3 text-lg font-semibold text-[#F6F3EC]">
              Finner du ikke svaret du leter etter?
            </h3>
            <p className="mb-6 text-slate-300">
              Vi hjelper deg gjerne! Ta kontakt så finner vi en løsning sammen.
            </p>
            <a
              href="mailto:hei@nordlystrelys.no"
              className="inline-flex items-center gap-2 rounded-xl bg-[#FFB703] px-6 py-3 font-semibold text-[#0B0B0B] shadow-lg transition-all duration-200 hover:bg-[#E8A502] hover:shadow-xl hover:shadow-[#FFB703]/20"
            >
              Send e-post
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </a>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  );
}
