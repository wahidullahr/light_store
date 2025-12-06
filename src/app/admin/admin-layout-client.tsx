'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { isAdmin, signOut } from '@/lib/auth';

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  const checkAuth = useCallback(async () => {
    const admin = await isAdmin();
    if (!admin) {
      router.push('/admin/login');
    }
  }, [router]);

  useEffect(() => {
    setMounted(true);
    if (pathname !== '/admin/login') {
      checkAuth();
    }
  }, [pathname, checkAuth]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  // Render content based on auth state
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  if (!mounted) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-950">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950">
      <nav className="border-b border-slate-800 bg-slate-900">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            <Link href="/admin" className="text-xl font-bold text-white">
              Huslampe Admin
            </Link>
            <div className="flex items-center gap-4">
              <Link
                href="/admin/products"
                className={`px-3 py-2 text-sm ${
                  pathname.startsWith('/admin/products') ? 'text-amber-400' : 'text-slate-300'
                }`}
              >
                Products
              </Link>
              <Link
                href="/"
                target="_blank"
                className="flex items-center gap-2 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-amber-500"
              >
                <span>View Website</span>
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </Link>
              <button
                onClick={handleSignOut}
                className="rounded-lg bg-slate-800 px-4 py-2 text-sm text-slate-300 hover:bg-slate-700"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}


