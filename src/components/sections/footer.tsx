'use client';

import { useTranslations } from 'next-intl';
import { useLocale } from 'next-intl';
import Link from 'next/link';
import Container from '@/components/ui/container';
import { Instagram, Mail, Phone } from 'lucide-react';

export default function Footer() {
  const t = useTranslations('common.footer');
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: `/${locale}#about`, label: t('links.about') },
    { href: `/${locale}#products`, label: t('links.products') },
    { href: `/${locale}#contact`, label: t('links.contact') },
    { href: `/${locale}/privacy`, label: t('links.privacy') },
    { href: `/${locale}/terms`, label: t('links.terms') },
  ];

  const socialLinks = [
    {
      href: 'https://instagram.com/yourbrand',
      icon: Instagram,
      label: 'Instagram',
    },
    {
      href: 'mailto:hei@nordlystrelys.no',
      icon: Mail,
      label: 'Email',
    },
    {
      href: 'tel:+4740000000',
      icon: Phone,
      label: 'Phone',
    },
  ];

  return (
    <footer id="contact" className="border-t border-slate-700/30 bg-[#1a1a1a]" role="contentinfo">
      <Container>
        <div className="py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link
                href={`/${locale}`}
                className="font-fraunces text-2xl font-bold text-[#F6F3EC] transition-colors hover:text-[#FFB703]"
              >
                {t('company')}
              </Link>
              <p className="mt-4 max-w-md leading-relaxed text-slate-300">{t('description')}</p>

              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="h-4 w-4 text-[#FFB703]" />
                  <a
                    href="mailto:hei@huslampe.no"
                    className="transition-colors hover:text-[#FFB703]"
                  >
                    hei@huslampe.no
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="h-4 w-4 text-[#FFB703]" />
                  <a href="tel:+4746582208" className="transition-colors hover:text-[#FFB703]">
                    +47 465 82 208
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-6 text-lg font-semibold text-[#F6F3EC]">Lenker</h3>
              <nav>
                <ul className="space-y-3">
                  {footerLinks.map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-300 transition-colors hover:text-[#FFB703]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Social & Newsletter */}
            <div>
              <h3 className="mb-6 text-lg font-semibold text-[#F6F3EC]">Følg oss</h3>

              {/* Social Links */}
              <div className="mb-8 flex items-center gap-4">
                {socialLinks.map(social => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FFB703]/10 text-[#FFB703] transition-colors hover:bg-[#FFB703]/20 hover:text-[#E8A502]"
                    aria-label={social.label}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>

              {/* Quality Badges */}
              <div className="space-y-2">
                <div className="rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-slate-400">
                  🌲 Bærekraftig treverk
                </div>
                <div className="rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-slate-400">
                  🇳🇴 Håndlaget i Norge
                </div>
                <div className="rounded-lg bg-slate-800/50 px-3 py-2 text-xs text-slate-400">
                  ⚡ 2 års garanti
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/30 py-8">
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-sm text-slate-400">
              {t('copyright').replace('2024', currentYear.toString())}
            </p>

            {/* Additional Legal Links */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link href={`/${locale}/privacy`} className="transition-colors hover:text-[#FFB703]">
                Personvern
              </Link>
              <Link href={`/${locale}/terms`} className="transition-colors hover:text-[#FFB703]">
                Vilkår
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
