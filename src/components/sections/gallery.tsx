'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Container from '@/components/ui/container';
import SectionHeader from '@/components/ui/section-header';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

export interface IGalleryProps {
  images: { src: string; alt: string; width: number; height: number }[];
}

export default function Gallery({ images }: IGalleryProps) {
  const t = useTranslations('common.sections.gallery');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

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

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  return (
    <section className="bg-[#0B0B0B] py-20 lg:py-28" aria-labelledby="gallery-heading">
      <Container>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={containerVariants}
        >
          <SectionHeader title={t('title')} subtitle={t('subtitle')} className="mb-16" />

          {/* Gallery Grid */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {images.map((image, index) => (
              <motion.figure
                key={index}
                variants={imageVariants}
                className={`group relative cursor-pointer overflow-hidden rounded-2xl ${
                  index === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={image.width}
                  height={image.height}
                  className={`w-full object-cover transition-transform duration-500 group-hover:scale-110 ${
                    index === 0 ? 'h-96 lg:h-full' : 'h-48'
                  }`}
                  sizes={
                    index === 0
                      ? '(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw'
                      : '(max-width: 768px) 100vw, (max-width: 1024px) 25vw, 25vw'
                  }
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Expand indicator */}
                <div className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full bg-[#FFB703]/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <svg
                    className="h-4 w-4 text-[#FFB703]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
                    />
                  </svg>
                </div>

                <figcaption className="sr-only">{image.alt}</figcaption>
              </motion.figure>
            ))}
          </div>
        </motion.div>
      </Container>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-h-full max-w-5xl">
            <Image
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              width={images[selectedImage].width}
              height={images[selectedImage].height}
              className="max-h-full max-w-full object-contain"
              onClick={e => e.stopPropagation()}
            />

            {/* Navigation */}
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFB703]/20 transition-colors duration-200 hover:bg-[#FFB703]/40"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-6 w-6 text-[#FFB703]" />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-4 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-[#FFB703]/20 transition-colors duration-200 hover:bg-[#FFB703]/40"
              aria-label="Next image"
            >
              <ChevronRight className="h-6 w-6 text-[#FFB703]" />
            </button>

            {/* Close button */}
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB703]/20 transition-colors duration-200 hover:bg-[#FFB703]/40"
              aria-label="Close gallery"
            >
              <X className="h-5 w-5 text-[#FFB703]" />
            </button>
          </div>
        </motion.div>
      )}
    </section>
  );
}
