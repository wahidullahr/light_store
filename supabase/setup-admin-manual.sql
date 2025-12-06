-- Manual setup script (if automatic one doesn't work)
-- Step 1: Get user ID from auth.users
SELECT id, email FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- Step 2: Copy the UUID from step 1 and replace 'YOUR-UUID-HERE' below
-- Then run this:
/*
INSERT INTO admin_users (id, email, role, is_active)
VALUES ('YOUR-UUID-HERE', 'kontakt@huslampe.no', 'admin', true)
ON CONFLICT (id) DO UPDATE 
SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = true,
  updated_at = NOW();
*/




