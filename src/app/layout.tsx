import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'Tindra - Håndlagde trelamper som lyser opp ditt hjem',
  description: 'Opplev Tindra sine unike, håndlagde trelamper som bringer varme og nordisk eleganse til hjemmet ditt. Hver lampe er et kunstverks skapt av bærekraftige norske tresorter.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb" className="scroll-smooth">
      <body className={`${inter.variable} ${fraunces.variable} bg-[#0B0B0B] text-[#F6F3EC] antialiased`}>
        {children}
      </body>
    </html>
  );
}