-- Fix Infinite Recursion in RLS Policies
-- Run this in Supabase SQL Editor

-- 1. Create a secure function to check admin status
-- SECURITY DEFINER allows this function to run with owner privileges, bypassing RLS
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.admin_users
    WHERE id = auth.uid()
    AND is_active = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Drop existing storage policies to replace them
DROP POLICY IF EXISTS "Admins can insert product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can update product images" ON storage.objects;
DROP POLICY IF EXISTS "Admins can delete product images" ON storage.objects;

-- 3. Re-create storage policies using the helper function
CREATE POLICY "Admins can insert product images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'products' AND
  (auth.role() = 'authenticated' AND public.is_admin())
);

CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'products' AND
  (auth.role() = 'authenticated' AND public.is_admin())
);

CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'products' AND
  (auth.role() = 'authenticated' AND public.is_admin())
);

-- 4. Optional: Optimize other table policies using the function (prevents future recursion issues)

-- Products
DROP POLICY IF EXISTS "Admins can manage products" ON products;
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (auth.role() = 'authenticated' AND public.is_admin());

-- Site Content
DROP POLICY IF EXISTS "Admins can manage content" ON site_content;
CREATE POLICY "Admins can manage content" ON site_content
  FOR ALL USING (auth.role() = 'authenticated' AND public.is_admin());

-- Admin Users
-- Note: We keep the specific self-view policy for admin_users, but update the manage policy
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
CREATE POLICY "Admins can view all admin users" ON admin_users
  FOR SELECT USING (auth.role() = 'authenticated' AND public.is_admin());

