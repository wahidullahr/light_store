'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { isAdminClient } from '@/lib/admin/auth';
import type { Product } from '@/lib/supabase/types';

export default function ProductsPage() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const checkAuth = async () => {
    const admin = await isAdminClient();
    if (!admin) {
      router.push('/admin/login');
    }
  };

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/admin/products');
      const result = await response.json();

      if (result.success) {
        setProducts(result.data || []);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch(`/api/admin/products/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Delete failed');
      loadProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const toggleActive = async (product: Product) => {
    try {
      const response = await fetch(`/api/admin/products/${product.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_active: !product.is_active }),
      });

      if (!response.ok) throw new Error('Update failed');
      loadProducts();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-500"
        >
          + Add Product
        </Link>
      </div>

      <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">
                Product ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase text-slate-400">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {products.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-6 py-8 text-center text-slate-400">
                  No products found. Create your first product!
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product.id} className="hover:bg-slate-800/50">
                  <td className="px-6 py-4 text-sm text-slate-300">{product.product_id}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">
                    {product.name_nb} / {product.name_en}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-300">
                    {product.price_min && product.price_max
                      ? `${product.price_min} - ${product.price_max} NOK`
                      : 'Not set'}
                  </td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleActive(product)}
                      className={`rounded-full px-3 py-1 text-xs font-medium ${
                        product.is_active
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {product.is_active ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <Link
                        href={`/admin/products/${product.id}`}
                        className="text-amber-500 hover:text-amber-400"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(product.id)}
                        className="text-red-500 hover:text-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

