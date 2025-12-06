# Add Admin User - Quick Guide

Your user `kontakt@huslampe.no` exists in Supabase Auth but needs to be added to the `admin_users` table.

## Quick Steps:

### Option 1: Using Supabase Dashboard (Easiest)

1. **Go to Supabase Dashboard** → SQL Editor
2. **Run this query to get your user ID:**
   ```sql
   SELECT id, email FROM auth.users WHERE email = 'kontakt@huslampe.no';
   ```
3. **Copy the `id` (UUID) from the result**
4. **Run this INSERT statement** (replace `'YOUR_USER_ID_HERE'` with the actual ID):
   ```sql
   INSERT INTO admin_users (id, email, role, is_active)
   VALUES (
     'YOUR_USER_ID_HERE',
     'kontakt@huslampe.no',
     'admin',
     true
   );
   ```
5. **Verify it worked:**
   ```sql
   SELECT * FROM admin_users WHERE email = 'kontakt@huslampe.no';
   ```

### Option 2: One-Step SQL (If you know the user exists)

If you're sure the user exists in `auth.users`, you can use this single query:

```sql
INSERT INTO admin_users (id, email, role, is_active)
SELECT 
  id,
  email,
  'admin',
  true
FROM auth.users
WHERE email = 'kontakt@huslampe.no'
ON CONFLICT (id) DO UPDATE 
SET 
  email = EXCLUDED.email,
  role = EXCLUDED.role,
  is_active = EXCLUDED.is_active,
  updated_at = NOW();
```

### After Adding:

1. Go back to: `http://localhost:3000/admin/login`
2. Sign in with:
   - Email: `kontakt@huslampe.no`
   - Password: `Adelajan786`
3. You should now have access to the admin dashboard!

## Troubleshooting

If you get an error that the user doesn't exist in `auth.users`:
1. Go to Supabase Dashboard → Authentication → Users
2. Check if `kontakt@huslampe.no` is listed
3. If not, create the user first, then add to `admin_users`

