-- Simple script to add admin user
-- Replace 'kontakt@huslampe.no' with your actual email if different

-- This script automatically gets the user ID from auth.users
-- and inserts it into admin_users table

INSERT INTO admin_users (id, email, role, is_active)
SELECT 
  id,
  email,
  'admin'::text,
  true
FROM auth.users
WHERE email = 'kontakt@huslampe.no'
ON CONFLICT (id) DO UPDATE 
SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = true,
  updated_at = NOW();

-- Verify the admin user was created/updated
SELECT 
  au.id,
  au.email,
  au.role,
  au.is_active,
  au.created_at,
  CASE 
    WHEN au.id IS NOT NULL THEN '✅ Admin user exists'
    ELSE '❌ Admin user not found'
  END as status
FROM admin_users au
WHERE au.email = 'kontakt@huslampe.no';
