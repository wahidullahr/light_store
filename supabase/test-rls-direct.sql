-- Test RLS Policy Directly
-- Run this in Supabase SQL Editor while logged in as the admin user
-- This will help diagnose if RLS is working correctly

-- Step 1: Check if RLS is enabled
SELECT 
  tablename, 
  rowsecurity as rls_enabled
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';

-- Step 2: List all policies on admin_users
SELECT 
  policyname,
  cmd as command,
  qual as using_expression,
  with_check
FROM pg_policies 
WHERE tablename = 'admin_users'
ORDER BY policyname;

-- Step 3: Test what auth.uid() returns (should return your user ID when authenticated)
-- Note: This will only work in the context of an authenticated request
SELECT 
  auth.uid() as current_user_id,
  auth.email() as current_user_email;

-- Step 4: Try to query admin_users as the current user
-- This should work if RLS policy is correct
SELECT 
  id,
  email,
  role,
  is_active,
  created_at
FROM admin_users
WHERE id = auth.uid();

-- Step 5: Check if your user exists in admin_users
-- Replace 'kontakt@huslampe.no' with your actual email
SELECT 
  au.id,
  au.email,
  au.role,
  au.is_active,
  au.created_at,
  CASE 
    WHEN au.id = auth.uid() THEN '✅ Matches auth.uid()'
    ELSE '❌ Does NOT match auth.uid()'
  END as uid_match
FROM admin_users au
WHERE au.email = 'kontakt@huslampe.no';

-- Step 6: Verify user exists in auth.users
SELECT 
  id,
  email,
  created_at
FROM auth.users
WHERE email = 'kontakt@huslampe.no';

-- Step 7: Compare IDs (they should match!)
SELECT 
  au.id as admin_users_id,
  au.email as admin_users_email,
  au.is_active,
  u.id as auth_users_id,
  u.email as auth_users_email,
  CASE 
    WHEN au.id = u.id THEN '✅ IDs match'
    ELSE '❌ IDs DO NOT match - this is the problem!'
  END as id_match
FROM admin_users au
FULL OUTER JOIN auth.users u ON au.id = u.id
WHERE au.email = 'kontakt@huslampe.no' OR u.email = 'kontakt@huslampe.no';




