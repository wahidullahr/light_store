-- ============================================
-- COMPLETE FIX FOR ADMIN RLS ISSUES
-- Run this ENTIRE script in Supabase SQL Editor
-- ============================================

-- Step 1: Ensure RLS is enabled on admin_users table
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies on admin_users (start fresh)
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;
DROP POLICY IF EXISTS "Admins can view all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Step 3: Create the CRITICAL policy that allows users to check their own admin status
-- This is REQUIRED for login verification to work
CREATE POLICY "Users can view their own admin record" ON admin_users
  FOR SELECT 
  USING (id = auth.uid());

-- Step 4: Create policy for admins to view all admin users (optional but useful)
CREATE POLICY "Admins can view all admin users" ON admin_users
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM admin_users
      WHERE admin_users.id = auth.uid()
      AND admin_users.is_active = true
    )
  );

-- Step 5: Verify the policies were created
SELECT 
  policyname,
  cmd as command,
  qual as using_expression
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;

-- Step 6: Verify RLS is enabled
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';

-- Step 7: Test query (will only work when authenticated)
-- Replace 'your-user-id-here' with actual user ID from auth.users
-- This should return 1 row if RLS is working correctly
-- SELECT COUNT(*) FROM admin_users WHERE id = auth.uid();

-- ============================================
-- VERIFICATION QUERIES
-- Run these to verify your setup
-- ============================================

-- Check if user exists in auth.users
-- SELECT id, email FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- Check if user exists in admin_users
-- SELECT id, email, role, is_active FROM admin_users WHERE email = 'kontakt@huslampe.no';

-- Verify IDs match (they MUST match!)
-- SELECT 
--   au.id as admin_users_id,
--   au.email,
--   au.is_active,
--   u.id as auth_users_id,
--   CASE 
--     WHEN au.id = u.id THEN '✅ IDs match'
--     ELSE '❌ IDs DO NOT match - FIX THIS!'
--   END as status
-- FROM admin_users au
-- JOIN auth.users u ON au.email = u.email
-- WHERE au.email = 'kontakt@huslampe.no';
