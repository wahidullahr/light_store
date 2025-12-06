-- Add admin user to admin_users table
-- Replace 'USER_ID_HERE' with the actual user ID from auth.users

-- Step 1: Find the user ID
SELECT id, email, created_at 
FROM auth.users 
WHERE email = 'kontakt@huslampe.no';

-- Step 2: After you get the user ID from Step 1, run this INSERT statement
-- (Replace 'USER_ID_HERE' with the actual UUID from Step 1)
INSERT INTO admin_users (id, email, role, is_active)
VALUES (
  'USER_ID_HERE',  -- Replace with actual user ID from Step 1
  'kontakt@huslampe.no',
  'admin',
  true
)
ON CONFLICT (id) DO UPDATE 
SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();

-- Step 3: Verify the user was added
SELECT * FROM admin_users WHERE email = 'kontakt@huslampe.no';

