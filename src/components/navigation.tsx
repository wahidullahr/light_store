"use client";

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import Container from '@/components/ui/container';
import LocaleSwitcher from '@/components/ui/locale-switcher';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('common.navigation');
  const locale = useLocale();

  const navItems = [
    { href: `/${locale}#home`, label: t('home') },
    { href: `/${locale}#products`, label: t('products') },
    { href: `/${locale}#about`, label: t('about') },
    { href: `/${locale}#contact`, label: t('contact') },
  ];

  return (
    <nav className="bg-[#0B0B0B]/95 backdrop-blur-sm border-b border-slate-600/20 sticky top-0 z-50">
      <Container>
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            href={`/${locale}`}
            className="text-xl font-bold text-[#F6F3EC] hover:text-[#FFB703] transition-colors"
          >
            Nordlys
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#F6F3EC] hover:text-[#FFB703] transition-colors text-sm font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <LocaleSwitcher label={t('languageSwitch')} />
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-[#F6F3EC]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-slate-600/20">
            <div className="flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#F6F3EC] hover:text-[#FFB703] transition-colors text-sm font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-slate-600/20">
                <LocaleSwitcher label={t('languageSwitch')} />
              </div>
            </div>
          </div>
        )}
      </Container>
    </nav>
  );
}