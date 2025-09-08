"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

export interface ILocaleSwitcherProps {
  label: string;
}

export default function LocaleSwitcher({ label }: ILocaleSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const switchLocale = () => {
    const newLocale = locale === 'nb' ? 'en' : 'nb';
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={switchLocale}
      className="text-[#F6F3EC] hover:text-[#FFB703] hover:bg-[#FFB703]/10 transition-colors"
      aria-label={`Switch to ${locale === 'nb' ? 'English' : 'Norwegian'}`}
    >
      <Globe className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
}