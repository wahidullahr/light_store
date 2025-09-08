import type { Metadata } from 'next';

interface SEOConfig {
  title: string;
  description: string;
  url: string;
  siteName: string;
  locale: string;
  alternateLocales?: string[];
  images?: {
    url: string;
    width: number;
    height: number;
    alt: string;
  }[];
  keywords?: string[];
  category?: string;
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    url,
    siteName,
    locale,
    alternateLocales = [],
    images = [],
    keywords = [],
    category = 'business',
  } = config;

  return {
    title,
    description,
    keywords: keywords.join(', '),
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
    category,

    // Basic metadata
    metadataBase: new URL(url),
    alternates: {
      canonical: url,
      languages: {
        [locale]: url,
        ...alternateLocales.reduce(
          (acc, loc) => {
            acc[loc] = url.replace(`/${locale}`, `/${loc}`);
            return acc;
          },
          {} as Record<string, string>
        ),
      },
    },

    // Open Graph
    openGraph: {
      type: 'website',
      locale,
      url,
      title,
      description,
      siteName,
      images: images.map(img => ({
        url: img.url,
        width: img.width,
        height: img.height,
        alt: img.alt,
      })),
    },

    // Twitter
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: images.map(img => img.url),
    },

    // Additional
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },

    // Verification
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
  };
}

export function generateJsonLd(locale: string) {
  const isNorwegian = locale === 'nb';

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: isNorwegian ? 'Nordlys Trelys' : 'Nordlys Woodlight',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nordlystrelys.no',
    logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nordlystrelys.no'}/logo.png`,
    description: isNorwegian
      ? 'Håndlagde trelamper med varmt, nordisk uttrykk. Bærekraftige materialer og unikt håndverk.'
      : 'Handcrafted wooden lamps with a warm Nordic feel. Sustainable materials and unique craftsmanship.',
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+47-40-00-00-00',
      contactType: 'customer service',
      email: isNorwegian ? 'hei@nordlystrelys.no' : 'hello@nordlyswoodlight.com',
      availableLanguage: ['Norwegian', 'English'],
    },
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'NO',
      addressRegion: 'Norge',
    },
    foundingDate: '2024',
    keywords: isNorwegian
      ? 'trelamper, håndlaget, nordisk design, bærekraftig, Norge'
      : 'wooden lamps, handcrafted, Nordic design, sustainable, Norway',
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: isNorwegian ? 'Nordlys Trelys' : 'Nordlys Woodlight',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://nordlystrelys.no',
    description: isNorwegian
      ? 'Opplev våre håndlagde trelamper med varmt, nordisk uttrykk'
      : 'Discover our handcrafted wooden lamps with warm Nordic design',
    inLanguage: locale,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://nordlystrelys.no'}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  };

  const productSchemas = [
    {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Fjord',
      description: isNorwegian
        ? 'Mykt, varmt lys fremhever årringer i eik'
        : 'Soft, warm light accentuates oak grain',
      brand: {
        '@type': 'Brand',
        name: isNorwegian ? 'Nordlys Trelys' : 'Nordlys Woodlight',
      },
      material: isNorwegian ? 'Eik' : 'Oak',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'NOK',
        price: '3900-5500',
        availability: 'https://schema.org/InStock',
        seller: {
          '@type': 'Organization',
          name: isNorwegian ? 'Nordlys Trelys' : 'Nordlys Woodlight',
        },
      },
      category: isNorwegian ? 'Belysning' : 'Lighting',
      image: 'https://images.unsplash.com/photo-1504208434309-cb69f4fe52b0',
    },
  ];

  return {
    organization: organizationSchema,
    website: websiteSchema,
    products: productSchemas,
  };
}
