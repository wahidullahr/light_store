export interface ISite {
  name: string;
  tagline: string;
  localeDefault: 'nb' | 'en';
  ctaPrimary: { label: string; href: string };
  ctaSecondary?: { label: string; href: string };
  socials?: { label: string; href: string }[];
  contact: { email: string; phone?: string; address?: string };
  badges?: string[];
}

export interface IProduct {
  id: string | number;
  name: string;
  wood: string;
  priceRange: string;
  images: { src: string; alt: string; width: number; height: number }[];
  description: string;
  badges?: string[];
  // Extended properties for product details page compatibility
  category?: string;
  price?: string;
  image?: string;
  features?: string[];
  detailImages?: string[];
}

export interface ITestimonial {
  quote: string;
  name: string;
  location?: string;
}

export interface IFAQ {
  q: string;
  a: string;
}

export interface IImages {
  hero: { src: string; alt: string; width: number; height: number };
  gallery: { src: string; alt: string; width: number; height: number }[];
}

export interface IHero {
  aria: string;
  title: string;
  subtitle: string;
  actions: string;
  ctaPrimary: string;
  ctaSecondary: string;
}

export interface INavigation {
  home: string;
  products: string;
  about: string;
  contact: string;
  languageSwitch: string;
}

export interface ICommon {
  navigation: INavigation;
  sections: {
    products: {
      title: string;
      subtitle: string;
    };
    craft: {
      title: string;
      subtitle: string;
      content: string;
    };
    testimonials: {
      title: string;
    };
    gallery: {
      title: string;
      subtitle: string;
    };
    process: {
      title: string;
      steps: Array<{
        title: string;
        description: string;
      }>;
    };
    faq: {
      title: string;
      header: string;
    };
    cta: {
      title: string;
      subtitle: string;
      button: string;
    };
  };
  footer: {
    company: string;
    description: string;
    links: {
      about: string;
      products: string;
      contact: string;
      privacy: string;
      terms: string;
    };
    copyright: string;
  };
}
