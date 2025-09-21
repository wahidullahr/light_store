import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import { notFound } from 'next/navigation';
import { locales } from '@/lib/i18n';
import '../globals.css';
import Navbar from '@/components/Navbar';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isNorwegian = locale === 'nb';

  return {
    title: isNorwegian
      ? 'Tindra - Håndlagde trelamper som lyser opp ditt hjem'
      : 'Tindra - Handcrafted wooden lamps that illuminate your home',
    description: isNorwegian
      ? 'Opplev Tindra sine unike, håndlagde trelamper som bringer varme og nordisk eleganse til hjemmet ditt. Hver lampe er et kunstverks skapt av bærekraftige norske tresorter.'
      : "Discover Tindra's unique handcrafted wooden lamps that bring warmth and Nordic elegance to your home. Each lamp is a work of art created from sustainable Norwegian wood.",
  };
}

interface IRootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function RootLayout({ children, params }: IRootLayoutProps) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  return (
    <html lang={locale} className="scroll-smooth">
      <body
        className={`${inter.variable} ${fraunces.variable} bg-[#0B0B0B] text-[#F6F3EC] antialiased`}
      >
        <Navbar locale={locale} />
        <main>{children}</main>
      </body>
    </html>
  );
}
