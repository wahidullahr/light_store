import createMiddleware from 'next-intl/middleware';
import { locales } from './src/lib/i18n';

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'nb',

  // Always show locale prefix to avoid conflicts
  localePrefix: 'always',
});

export const config = {
  // Match only internationalized pathnames - exclude API routes, static files, and internal Next.js paths
  matcher: ['/((?!api|_next|_vercel|favicon.ico|.*\\.).*)'],
};
