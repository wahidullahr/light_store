-- Verification script to check if admin user is set up correctly
-- Run this in Supabase SQL Editor to diagnose issues

-- Step 1: Check if user exists in auth.users
SELECT 
  id,
  email,
  created_at,
  email_confirmed_at,
  confirmed_at
FROM auth.users 
WHERE email = 'kontakt@huslampe.no';

-- Step 2: Check if user exists in admin_users table
SELECT 
  id,
  email,
  role,
  is_active,
  created_at,
  updated_at
FROM admin_users 
WHERE email = 'kontakt@huslampe.no';

-- Step 3: Verify RLS policies exist
SELECT 
  schemaname,
  tablename,
  policyname,
  permissive,
  roles,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'admin_users';

-- Step 4: Test if RLS allows the query (run this as the authenticated user)
-- This simulates what the client does
-- Note: You need to be authenticated as the user to test this
SELECT 
  id,
  email,
  is_active
FROM admin_users 
WHERE id = auth.uid();

-- Step 5: If user exists but query fails, check if RLS is enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';

-- Step 6: If RLS is blocking, you can temporarily disable it to test (NOT RECOMMENDED FOR PRODUCTION)
-- ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
-- Then re-enable after testing:
-- ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

