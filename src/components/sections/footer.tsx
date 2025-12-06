"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Container from "@/components/ui/container";
import { Instagram, Mail, Phone } from "lucide-react";

export default function Footer() {
  const t = useTranslations("common.footer");
  const locale = useLocale();

  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { href: `/${locale}#about`, label: t("links.about") },
    { href: `/${locale}#products`, label: t("links.products") },
    { href: `/${locale}#contact`, label: t("links.contact") },
    { href: `/${locale}/privacy`, label: t("links.privacy") },
    { href: `/${locale}/terms`, label: t("links.terms") },
  ];

  const socialLinks = [
    {
      href: "https://instagram.com/yourbrand",
      icon: Instagram,
      label: "Instagram",
    },
    {
      href: "mailto:hei@nordlystrelys.no",
      icon: Mail,
      label: "Email",
    },
    {
      href: "tel:+4740000000",
      icon: Phone,
      label: "Phone",
    },
  ];

  return (
    <footer 
      id="contact"
      className="bg-[#1a1a1a] border-t border-slate-700/30"
      role="contentinfo"
    >
      <Container>
        <div className="py-16">
          <div className="grid gap-12 lg:grid-cols-4">
            {/* Brand */}
            <div className="lg:col-span-2">
              <Link 
                href={`/${locale}`}
                className="text-2xl font-bold text-[#F6F3EC] hover:text-[#FFB703] transition-colors font-fraunces"
              >
                {t("company")}
              </Link>
              <p className="mt-4 text-slate-300 max-w-md leading-relaxed">
                {t("description")}
              </p>
              
              {/* Contact Info */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-300">
                  <Mail className="w-4 h-4 text-[#FFB703]" />
                  <a 
                    href="mailto:hei@huslampe.no"
                    className="hover:text-[#FFB703] transition-colors"
                  >
                    hei@huslampe.no
                  </a>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-[#FFB703]" />
                  <a 
                    href="tel:+4746582208"
                    className="hover:text-[#FFB703] transition-colors"
                  >
                    +47 465 82 208
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold text-[#F6F3EC] mb-6">
                Lenker
              </h3>
              <nav>
                <ul className="space-y-3">
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-slate-300 hover:text-[#FFB703] transition-colors"
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
              <h3 className="text-lg font-semibold text-[#F6F3EC] mb-6">
                Følg oss
              </h3>
              
              {/* Social Links */}
              <div className="flex items-center gap-4 mb-8">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 bg-[#FFB703]/10 hover:bg-[#FFB703]/20 rounded-full flex items-center justify-center text-[#FFB703] hover:text-[#E8A502] transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* Quality Badges */}
              <div className="space-y-2">
                <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                  🌲 Bærekraftig treverk
                </div>
                <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                  🇳🇴 Håndlaget i Norge
                </div>
                <div className="text-xs text-slate-400 bg-slate-800/50 px-3 py-2 rounded-lg">
                  ⚡ 2 års garanti
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-700/30 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-400 text-sm">
              {t("copyright").replace("2024", currentYear.toString())}
            </p>
            
            {/* Additional Legal Links */}
            <div className="flex items-center gap-6 text-sm text-slate-400">
              <Link 
                href={`/${locale}/privacy`}
                className="hover:text-[#FFB703] transition-colors"
              >
                Personvern
              </Link>
              <Link 
                href={`/${locale}/terms`}
                className="hover:text-[#FFB703] transition-colors"
              >
                Vilkår
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
}