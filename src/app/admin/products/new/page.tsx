'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MultiImageUpload from '@/components/admin/MultiImageUpload';

export default function NewProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_id: '',
    name_nb: '',
    name_en: '',
    wood_type_nb: '',
    wood_type_en: '',
    price: '',
    description_nb: '',
    description_en: '',
    category_nb: '',
    category_en: '',
    is_active: true,
    display_order: 0,
    images: [] as { src: string; alt: string }[],
    detail_images: [] as { src: string; alt: string }[],
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    const requiredFields = {
      product_id: 'Product ID',
      name_nb: 'Name (Norwegian)',
      name_en: 'Name (English)',
      price: 'Price',
    };

    const missingFields = Object.entries(requiredFields)
      .filter(([key]) => !formData[key as keyof typeof formData])
      .map(([, label]) => label);

    if (missingFields.length > 0) {
      alert(`Please fill in the following mandatory fields:\n\n${missingFields.join('\n')}`);
      return;
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        price: formData.price ? parseFloat(formData.price) : null,
        display_order: parseInt(String(formData.display_order)) || 0,
        features_nb: [], // Can be added later
        features_en: [], // Can be added later
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (result.success) {
        router.push('/admin/products');
      } else {
        alert(result.error || 'Failed to create product');
        setLoading(false);
      }
    } catch {
      alert('Error creating product');
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-6 text-4xl font-bold text-white">New Product</h1>

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
                value={formData.product_id}
                onChange={e => setFormData({ ...formData, product_id: e.target.value })}
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
                value={formData.display_order}
                onChange={e =>
                  setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })
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
                value={formData.name_nb}
                onChange={e => setFormData({ ...formData, name_nb: e.target.value })}
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
                value={formData.name_en}
                onChange={e => setFormData({ ...formData, name_en: e.target.value })}
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
            images={formData.images}
            onChange={newImages => setFormData({ ...formData, images: newImages })}
          />

          <MultiImageUpload
            bucket="products"
            path="details"
            label="Detail Images"
            images={formData.detail_images}
            onChange={newImages => setFormData({ ...formData, detail_images: newImages })}
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
                value={formData.wood_type_nb}
                onChange={e => setFormData({ ...formData, wood_type_nb: e.target.value })}
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
                value={formData.wood_type_en}
                onChange={e => setFormData({ ...formData, wood_type_en: e.target.value })}
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
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
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
                value={formData.category_nb}
                onChange={e => setFormData({ ...formData, category_nb: e.target.value })}
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
                value={formData.category_en}
                onChange={e => setFormData({ ...formData, category_en: e.target.value })}
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
              value={formData.description_nb}
              onChange={e => setFormData({ ...formData, description_nb: e.target.value })}
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
              value={formData.description_en}
              onChange={e => setFormData({ ...formData, description_en: e.target.value })}
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
              checked={formData.is_active}
              onChange={e => setFormData({ ...formData, is_active: e.target.checked })}
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
            disabled={loading}
            className="rounded-lg bg-amber-600 px-8 py-3 font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
          >
            {loading ? 'Creating...' : 'Create Product'}
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
