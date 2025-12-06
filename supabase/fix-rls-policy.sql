-- Fix RLS Policy for admin_users table
-- Run this in Supabase SQL Editor

-- Step 1: Drop existing policies (if any)
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;

-- Step 2: Ensure RLS is enabled
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Step 3: Create the policy that allows users to check their own admin status
-- This is critical for login verification
CREATE POLICY "Users can view their own admin record" ON admin_users
  FOR SELECT 
  USING (id = auth.uid());

-- Step 4: Verify the policy was created
SELECT 
  policyname,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'admin_users';

-- Step 5: Test the policy (this should work after you're logged in)
-- Note: You need to be authenticated to test this
-- SELECT * FROM admin_users WHERE id = auth.uid();

