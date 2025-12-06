'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Package, Activity, Plus, ExternalLink } from 'lucide-react';

interface DashboardStats {
  products: {
    total: number;
    active: number;
  };
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch('/api/admin/stats');
        const result = await response.json();
        if (result.success) {
          setStats(result.data);
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-8 text-4xl font-bold text-white">Dashboard</h1>

      {/* Stats Grid */}
      <div className="mb-12 grid gap-6 md:grid-cols-2">
        {/* Products Card */}
        <Link
          href="/admin/products"
          className="group relative overflow-hidden rounded-lg border border-slate-800 bg-slate-900 p-6 transition-all hover:border-amber-500/50"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">Total Products</p>
              <h3 className="mt-2 text-3xl font-bold text-white">
                {loading ? '-' : stats?.products.total}
              </h3>
            </div>
            <div className="rounded-full bg-slate-800 p-3 text-amber-500 group-hover:bg-amber-500/10">
              <Package className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm text-slate-400">
            <Activity className="mr-1 h-4 w-4 text-green-400" />
            <span className="text-green-400">{loading ? '-' : stats?.products.active}</span>
            <span className="ml-1">active on site</span>
          </div>
        </Link>

        {/* View Website Card */}
        <Link
          href="/"
          target="_blank"
          className="group relative overflow-hidden rounded-lg border border-slate-800 bg-gradient-to-br from-amber-600/20 to-amber-500/10 p-6 transition-all hover:border-amber-500"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400">View Website</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Go to Site</h3>
            </div>
            <div className="rounded-full bg-amber-600/20 p-3 text-amber-500 group-hover:bg-amber-600/30">
              <ExternalLink className="h-6 w-6" />
            </div>
          </div>
          <div className="mt-4 text-sm text-amber-400">Open in new tab</div>
        </Link>
      </div>

      {/* Quick Actions */}
      <h2 className="mb-6 text-xl font-semibold text-white">Quick Actions</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Link
          href="/admin/products/new"
          className="flex items-center justify-center gap-3 rounded-lg border border-dashed border-slate-700 bg-slate-800/50 p-6 text-slate-300 transition-all hover:border-amber-500 hover:bg-slate-800 hover:text-white"
        >
          <Plus className="h-5 w-5" />
          <span>Add New Product</span>
        </Link>
      </div>
    </div>
  );
}
