'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { isAdminClient } from '@/lib/admin/auth';
import type { Product } from '@/lib/supabase/types';
import ProductForm from '@/components/admin/ProductForm';

export default function EditProductPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
    if (id !== 'new') {
      loadProduct();
    } else {
      setLoading(false);
    }
  }, [id]);

  const checkAuth = async () => {
    const admin = await isAdminClient();
    if (!admin) {
      router.push('/admin/login');
    }
  };

  const loadProduct = async () => {
    try {
      const response = await fetch(`/api/admin/products/${id}`);
      const result = await response.json();

      if (result.success) {
        setProduct(result.data);
      } else {
        throw new Error(result.error);
      }
    } catch (error) {
      console.error('Error loading product:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-4xl">
      <h1 className="mb-8 text-4xl font-bold text-white">
        {id === 'new' ? 'Create Product' : 'Edit Product'}
      </h1>
      <ProductForm product={product} onSuccess={() => router.push('/admin/products')} />
    </div>
  );
}

