-- Setup Supabase Storage for Products
-- Run this in Supabase SQL Editor

-- 1. Create a storage bucket for products
INSERT INTO storage.buckets (id, name, public)
VALUES ('products', 'products', true)
ON CONFLICT (id) DO NOTHING;

-- 2. Set up security policies for the 'products' bucket

-- Policy: Public can view images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'products' );

-- Policy: Admins can upload/update/delete images
CREATE POLICY "Admins can insert product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' AND
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' AND
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' AND
  EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE id = auth.uid() AND is_active = true
  )
);

