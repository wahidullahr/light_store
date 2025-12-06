import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from '@/lib/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,

  // Don't prefix the default locale (optional, depending on preference)
  // localePrefix: 'as-needed' 
});

export const config = {
  // Match only internationalized pathnames
  // Skip internal paths: _next, api, admin, etc.
  matcher: ['/((?!api|_next|admin|.*\\..*).*)']
};




