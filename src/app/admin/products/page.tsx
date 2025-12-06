'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Product {
  id: string;
  product_id: string;
  name_nb: string;
  name_en: string;
  is_active: boolean;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const result = await response.json();
      if (result.success) {
        setProducts(result.data || []);
      }
    } catch (error) {
      console.error('Error loading products:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-4xl font-bold text-white">Products</h1>
        <Link
          href="/admin/products/new"
          className="rounded-lg bg-amber-600 px-4 py-2 font-semibold text-white hover:bg-amber-500"
        >
          Add Product
        </Link>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-900">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-800">
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">ID</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                Name (NO)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">
                Name (EN)
              </th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Status</th>
              <th className="px-6 py-3 text-left text-sm font-semibold text-slate-300">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => (
              <tr key={product.id} className="border-b border-slate-800">
                <td className="px-6 py-4 text-sm text-slate-300">{product.product_id}</td>
                <td className="px-6 py-4 text-sm text-white">{product.name_nb}</td>
                <td className="px-6 py-4 text-sm text-white">{product.name_en}</td>
                <td className="px-6 py-4 text-sm">
                  {product.is_active ? (
                    <span className="text-green-400">Active</span>
                  ) : (
                    <span className="text-red-400">Inactive</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm">
                  <Link
                    href={`/admin/products/${product.id}`}
                    className="text-amber-400 hover:text-amber-300"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}



