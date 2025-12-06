'use client';

import { useState } from 'react';
import type { Product, ImageData } from '@/lib/supabase/types';
import ImageUpload from './ImageUpload';

interface ProductFormProps {
  product: Product | null;
  onSuccess: () => void;
}

export default function ProductForm({ product, onSuccess }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    product_id: product?.product_id || '',
    name_nb: product?.name_nb || '',
    name_en: product?.name_en || '',
    wood_type_nb: product?.wood_type_nb || '',
    wood_type_en: product?.wood_type_en || '',
    color_temp_k: product?.color_temp_k || 2700,
    size: product?.size || '',
    price_min: product?.price_min || 0,
    price_max: product?.price_max || 0,
    description_nb: product?.description_nb || '',
    description_en: product?.description_en || '',
    detail_description_nb: product?.detail_description_nb || '',
    detail_description_en: product?.detail_description_en || '',
    category_nb: product?.category_nb || '',
    category_en: product?.category_en || '',
    features_nb: product?.features_nb || [],
    features_en: product?.features_en || [],
    images: (product?.images || []) as ImageData[],
    detail_images: (product?.detail_images || []) as ImageData[],
    is_active: product?.is_active ?? true,
    display_order: product?.display_order || 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (product) {
        // Update
        const response = await fetch(`/api/admin/products/${product.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Update failed');
      } else {
        // Create
        const response = await fetch('/api/admin/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        if (!response.ok) throw new Error('Create failed');
      }

      onSuccess();
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    } finally {
      setLoading(false);
    }
  };


  return (
    <form onSubmit={handleSubmit} className="space-y-6 rounded-lg border border-slate-800 bg-slate-900 p-6">
      {/* Basic Info */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Product ID *</label>
          <input
            type="text"
            required
            value={formData.product_id}
            onChange={(e) => setFormData({ ...formData, product_id: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Display Order</label>
          <input
            type="number"
            value={formData.display_order}
            onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Names */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Name (Norwegian) *</label>
          <input
            type="text"
            required
            value={formData.name_nb}
            onChange={(e) => setFormData({ ...formData, name_nb: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Name (English) *</label>
          <input
            type="text"
            required
            value={formData.name_en}
            onChange={(e) => setFormData({ ...formData, name_en: e.target.value })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Prices */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Min Price (NOK)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price_min}
            onChange={(e) => setFormData({ ...formData, price_min: parseFloat(e.target.value) })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">Max Price (NOK)</label>
          <input
            type="number"
            step="0.01"
            value={formData.price_max}
            onChange={(e) => setFormData({ ...formData, price_max: parseFloat(e.target.value) })}
            className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2 text-white"
          />
        </div>
      </div>

      {/* Images */}
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Product Images</label>
        <ImageUpload
          images={formData.images}
          onImagesChange={(images) => setFormData({ ...formData, images })}
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-300">Detail Images</label>
        <ImageUpload
          images={formData.detail_images}
          onImagesChange={(images) => setFormData({ ...formData, detail_images: images })}
        />
      </div>

      {/* Active Status */}
      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="is_active"
          checked={formData.is_active}
          onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
          className="h-4 w-4 rounded border-slate-700 bg-slate-800 text-amber-600"
        />
        <label htmlFor="is_active" className="text-sm text-slate-300">
          Product is active
        </label>
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={loading}
          className="rounded-lg bg-amber-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-amber-500 disabled:opacity-50"
        >
          {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
        </button>
      </div>
    </form>
  );
}

