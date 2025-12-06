'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

interface Product {
  id: string;
  product_id: string;
  name_nb: string;
  name_en: string;
  wood_type_nb?: string;
  wood_type_en?: string;
  price?: number;
  description_nb?: string;
  description_en?: string;
  category_nb?: string;
  category_en?: string;
  is_active: boolean;
  display_order: number;
  images: { src: string; alt: string }[];
  detail_images: { src: string; alt: string }[];
}

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/products/${id}`);
      const result = await response.json();
      if (result.success) {
        // Ensure images arrays exist
        setProduct({
          ...result.data,
          images: result.data.images || [],
          detail_images: result.data.detail_images || [],
        });
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    // Validation
    const requiredFields = {
      product_id: 'Product ID',
      name_nb: 'Name (Norwegian)',
      name_en: 'Name (English)',
      price: 'Price',
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !product[key as keyof typeof product])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      alert(`Please fill in the following mandatory fields:\n\n${missingFields.join('\n')}`);
      return;
    }

    setSaving(true);
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/products');
      } else {
        alert(result.error || 'Failed to update product');
        setSaving(false);
      }
    } catch {
      alert('Error updating product');
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-white">Product not found</div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold text-white">Edit Product</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-8 rounded-lg border border-slate-800 bg-slate-900 p-6"
      >
        {/* Basic Info */}
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-slate-200">Basic Information</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label htmlFor="product_id" className="mb-2 block text-sm font-medium text-slate-300">
                Product ID *
              </label>
              <input
                id="product_id"
                type="text"
                value={product.product_id}
                onChange={e => setProduct({ ...product, product_id: e.target.value })}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="display_order"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Display Order
              </label>
              <input
                id="display_order"
                type="number"
                value={product.display_order}
                onChange={e =>
                  setProduct({ ...product, display_order: parseInt(e.target.value) || 0 })
                }
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="name_nb" className="mb-2 block text-sm font-medium text-slate-300">
                Name (Norwegian) *
              </label>
              <input
                id="name_nb"
                type="text"
                value={product.name_nb}
                onChange={e => setProduct({ ...product, name_nb: e.target.value })}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="name_en" className="mb-2 block text-sm font-medium text-slate-300">
                Name (English) *
              </label>
              <input
                id="name_en"
                type="text"
                value={product.name_en}
                onChange={e => setProduct({ ...product, name_en: e.target.value })}
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Images */}
        <div className="space-y-6 border-t border-slate-800 pt-6">
          <h2 className="text-xl font-semibold text-slate-200">Images</h2>

          <MultiImageUpload
            bucket="products"
            path="main"
            label="Product Images (Main)"
            images={product.images}
            onChange={newImages => setProduct({ ...product, images: newImages })}
          />

          <MultiImageUpload
            bucket="products"
            path="details"
            label="Detail Images"
            images={product.detail_images}
            onChange={newImages => setProduct({ ...product, detail_images: newImages })}
          />
        </div>

        {/* Details */}
        <div className="space-y-6 border-t border-slate-800 pt-6">
          <h2 className="text-xl font-semibold text-slate-200">Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="wood_type_nb"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Wood Type (NO)
              </label>
              <input
                id="wood_type_nb"
                type="text"
                value={product.wood_type_nb || ''}
                onChange={e => setProduct({ ...product, wood_type_nb: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="wood_type_en"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Wood Type (EN)
              </label>
              <input
                id="wood_type_en"
                type="text"
                value={product.wood_type_en || ''}
                onChange={e => setProduct({ ...product, wood_type_en: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-medium text-slate-300">
                Price *
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                value={product.price || ''}
                onChange={e =>
                  setProduct({ ...product, price: parseFloat(e.target.value) || undefined })
                }
                required
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="category_nb"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Category (NO)
              </label>
              <input
                id="category_nb"
                type="text"
                value={product.category_nb || ''}
                onChange={e => setProduct({ ...product, category_nb: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="category_en"
                className="mb-2 block text-sm font-medium text-slate-300"
              >
                Category (EN)
              </label>
              <input
                id="category_en"
                type="text"
                value={product.category_en || ''}
                onChange={e => setProduct({ ...product, category_en: e.target.value })}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Descriptions */}
        <div className="space-y-6 border-t border-slate-800 pt-6">
          <h2 className="text-xl font-semibold text-slate-200">Descriptions</h2>

          <div>
            <label
              htmlFor="description_nb"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Description (NO)
            </label>
            <textarea
              id="description_nb"
              value={product.description_nb || ''}
              onChange={e => setProduct({ ...product, description_nb: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="description_en"
              className="mb-2 block text-sm font-medium text-slate-300"
            >
              Description (EN)
            </label>
            <textarea
              id="description_en"
              value={product.description_en || ''}
              onChange={e => setProduct({ ...product, description_en: e.target.value })}
              rows={3}
              className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Status */}
        <div className="border-t border-slate-800 pt-6">
          <div className="flex items-center gap-3 rounded-lg border border-slate-700 bg-slate-800/50 p-4">
            <input
              type="checkbox"
              id="is_active"
              checked={product.is_active}
              onChange={e => setProduct({ ...product, is_active: e.target.checked })}
              className="h-5 w-5 rounded border-slate-600 bg-slate-700 text-amber-600 focus:ring-amber-500"
            />
            <label htmlFor="is_active" className="font-medium text-slate-200">
              Active Product (Visible on site)
            </label>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4 border-t border-slate-800 pt-6">
          <button
            type="submit"
            disabled={saving}
            className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
          >
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="rounded-lg border border-slate-700 bg-transparent px-8 py-3 font-semibold text-slate-300 transition-colors hover:bg-slate-800 hover:text-white"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
