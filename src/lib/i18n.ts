import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

// Define our supported locales
export const locales = ['nb', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as Locale)) notFound();

  return {
    locale,
    messages: (await import(`../../content/${locale}/index.ts`)).default,
  };
});
