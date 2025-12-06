'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { signOutAdmin } from '@/lib/admin/auth';
import { useState } from 'react';

export default function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // Don't show navbar on login page
  if (pathname === '/admin/login') {
    return null;
  }

  const handleSignOut = async () => {
    setLoading(true);
    await signOutAdmin();
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { href: '/admin', label: 'Dashboard', icon: '📊' },
    { href: '/admin/products', label: 'Products', icon: '💡' },
    { href: '/admin/content', label: 'Content', icon: '📝' },
    { href: '/admin/images', label: 'Images', icon: '🖼️' },
  ];

  return (
    <nav className="border-b border-slate-800 bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link href="/admin" className="text-xl font-bold text-white">
              Huslampe Admin
            </Link>
            <div className="hidden md:flex md:space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-amber-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <span className="mr-2">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/"
              target="_blank"
              className="text-sm text-slate-400 hover:text-white"
            >
              View Site
            </Link>
            <button
              onClick={handleSignOut}
              disabled={loading}
              className="rounded-lg bg-slate-800 px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:bg-slate-700 disabled:opacity-50"
            >
              {loading ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

