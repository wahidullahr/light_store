import { getRequestConfig } from 'next-intl/server';

// Define our supported locales
export const locales = ['nb', 'en'] as const;
export const defaultLocale = 'nb';
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ requestLocale }) => {
  // This corresponds to the [locale] segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = defaultLocale;
  }

  try {
    const messages = (await import(`../content/${locale}/index.ts`)).default;
    return {
      locale,
      messages,
    };
  } catch (error) {
    console.error(`Failed to load messages for locale: ${locale}`, error);
    // Return empty messages as fallback to prevent crash
    return {
      locale,
      messages: {},
    };
  }
});
