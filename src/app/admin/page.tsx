'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminClient } from '@/lib/admin/auth';
import Link from 'next/link';

export default function AdminDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [stats, setStats] = useState({
    products: 0,
    activeProducts: 0,
    contentItems: 0,
  });

  useEffect(() => {
    checkAuth();
    loadStats();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const admin = await isAdminClient();
    if (!admin) {
      router.push('/admin/login');
      return;
    }
    setIsAdmin(true);
    setLoading(false);
  };

  const loadStats = async () => {
    try {
      const [productsResponse, contentResponse] = await Promise.all([
        fetch('/api/admin/products'),
        fetch('/api/admin/content'),
      ]);

      const productsResult = await productsResponse.json();
      const contentResult = await contentResponse.json();

      const products = (productsResult.data || []) as Array<{ id: string; is_active: boolean }>;

      setStats({
        products: products.length || 0,
        activeProducts: products.filter((p) => p.is_active).length || 0,
        contentItems: contentResult.data?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-white">Dashboard</h1>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-2 text-sm text-slate-400">Total Products</div>
          <div className="text-3xl font-bold text-white">{stats.products}</div>
          <Link
            href="/admin/products"
            className="mt-4 inline-block text-sm text-amber-500 hover:text-amber-400"
          >
            Manage Products →
          </Link>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-2 text-sm text-slate-400">Active Products</div>
          <div className="text-3xl font-bold text-white">{stats.activeProducts}</div>
        </div>

        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6">
          <div className="mb-2 text-sm text-slate-400">Content Items</div>
          <div className="text-3xl font-bold text-white">{stats.contentItems}</div>
          <Link
            href="/admin/content"
            className="mt-4 inline-block text-sm text-amber-500 hover:text-amber-400"
          >
            Manage Content →
          </Link>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900 p-6">
        <h2 className="mb-4 text-xl font-semibold text-white">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-2">
          <Link
            href="/admin/products/new"
            className="rounded-lg border border-amber-600 bg-amber-600/10 p-4 text-center text-amber-400 transition-colors hover:bg-amber-600/20"
          >
            ➕ Add New Product
          </Link>
          <Link
            href="/admin/images"
            className="rounded-lg border border-slate-700 bg-slate-800/50 p-4 text-center text-slate-300 transition-colors hover:bg-slate-800"
          >
            🖼️ Upload Images
          </Link>
        </div>
      </div>
    </div>
  );
}

