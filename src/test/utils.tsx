import React, { ReactElement } from 'react';
import { render, RenderOptions } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

// Mock messages for testing
const mockMessages = {
  common: {
    navigation: {
      home: 'Home',
      products: 'Products',
      about: 'About',
      contact: 'Contact',
      languageSwitch: 'English',
    },
    sections: {
      products: {
        title: 'Our lamps',
        subtitle: 'Each lamp is uniquely handcrafted',
      },
      craft: {
        title: 'Craft and materials',
        subtitle: 'Sustainable wood from Norwegian forests',
        content: 'We use only first-class wood from sustainable forestry.',
      },
      testimonials: {
        title: 'What customers say',
      },
      gallery: {
        title: 'Gallery',
        subtitle: 'See our lamps in different environments',
      },
      process: {
        title: 'Our process',
        steps: [
          { title: 'Selection', description: 'We select the finest wood' },
          { title: 'Shaping', description: 'Each lamp is hand-shaped' },
          { title: 'Finishing', description: 'Natural oils provide durability' },
        ],
      },
      faq: {
        title: 'Frequently asked questions',
      },
      cta: {
        title: 'Ready to light up your home?',
        subtitle: 'Get in touch for a consultation',
        button: 'Contact us',
      },
    },
    footer: {
      company: 'Nordlys Woodlight',
      description: 'Handcrafted wooden lamps',
      links: {
        about: 'About',
        products: 'Products',
        contact: 'Contact',
        privacy: 'Privacy',
        terms: 'Terms',
      },
      copyright: '© 2024 Nordlys Woodlight. All rights reserved.',
    },
  },
  hero: {
    aria: 'Introduction',
    title: 'Handcrafted wooden lamps',
    subtitle: 'Unique craftsmanship and sustainable materials',
    actions: 'Primary actions',
    ctaPrimary: 'Order now',
    ctaSecondary: 'View collection',
  },
  products: [
    {
      id: 'fjord-01',
      name: 'Fjord',
      wood: 'Oak',
      colorTempK: 2700,
      size: 'Ø 30 cm',
      priceRange: 'NOK 3,900–5,500',
      images: [{ src: '/test-image.jpg', alt: 'Test lamp', width: 400, height: 300 }],
      description: 'Beautiful oak lamp',
    },
  ],
  testimonials: [
    { quote: 'Amazing quality', name: 'John', location: 'Oslo' },
  ],
  faq: [
    { q: 'Delivery time?', a: '3-4 weeks usually' },
  ],
};

interface AllTheProvidersProps {
  children: React.ReactNode;
  locale?: string;
}

const AllTheProviders = ({ children, locale = 'en' }: AllTheProvidersProps) => {
  return (
    <NextIntlClientProvider locale={locale} messages={mockMessages}>
      {children}
    </NextIntlClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'> & { locale?: string }
) => {
  const { locale, ...renderOptions } = options || {};
  
  return render(ui, {
    wrapper: ({ children }) => (
      <AllTheProviders locale={locale}>{children}</AllTheProviders>
    ),
    ...renderOptions,
  });
};

export * from '@testing-library/react';
export { customRender as render };