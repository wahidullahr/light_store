-- Test RLS Policy for admin_users
-- Run this AFTER you've logged in to test if RLS is working

-- This should return your admin record if RLS is working correctly
SELECT * FROM admin_users WHERE id = auth.uid();

-- If the above returns nothing, the RLS policy might not be working
-- Check if the policy exists:
SELECT 
  policyname,
  cmd,
  qual
FROM pg_policies 
WHERE tablename = 'admin_users' 
AND policyname = 'Users can view their own admin record';

-- If policy doesn't exist or is wrong, recreate it:
DROP POLICY IF EXISTS "Users can view their own admin record" ON admin_users;

CREATE POLICY "Users can view their own admin record" ON admin_users
  FOR SELECT 
  USING (id = auth.uid());

