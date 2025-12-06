# Diagnose Admin Login Issue

If you've added the user to `admin_users` but still get "User is not an admin" error, follow these steps:

## Step 1: Verify User in admin_users Table

Run this in Supabase SQL Editor:

```sql
SELECT * FROM admin_users WHERE email = 'kontakt@huslampe.no';
```

**Expected result**: You should see one row with:
- `id`: UUID matching the user ID from auth.users
- `email`: 'kontakt@huslampe.no'
- `role`: 'admin'
- `is_active`: `true` (this is critical!)

**If `is_active` is `false` or `null`**, fix it:
```sql
UPDATE admin_users 
SET is_active = true 
WHERE email = 'kontakt@huslampe.no';
```

## Step 2: Verify RLS Policy Exists

Run this to check if the RLS policy is set up:

```sql
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'admin_users';
```

**Expected**: You should see a policy named "Users can view their own admin record"

**If missing**, create it:
```sql
CREATE POLICY "Users can view their own admin record" ON admin_users
  FOR SELECT USING (id = auth.uid());
```

## Step 3: Verify RLS is Enabled

```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename = 'admin_users';
```

**Expected**: `rowsecurity` should be `true`

**If false**, enable it:
```sql
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
```

## Step 4: Test the Query Directly

After logging in, open browser console (F12) and run:

```javascript
// Get your Supabase client (you'll need to import it)
const { supabase } = await import('/src/lib/supabase/client');

// Get current user
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);

// Try to query admin_users
const { data, error } = await supabase
  .from('admin_users')
  .select('*')
  .eq('id', user.id)
  .single();

console.log('Admin check result:', { data, error });
```

## Step 5: Common Issues

### Issue 1: User ID Mismatch
**Problem**: The ID in `admin_users` doesn't match the ID in `auth.users`

**Fix**:
```sql
-- Get correct user ID
SELECT id FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- Update admin_users with correct ID
UPDATE admin_users 
SET id = 'CORRECT_USER_ID_HERE'
WHERE email = 'kontakt@huslampe.no';
```

### Issue 2: is_active is false
**Problem**: User exists but `is_active` is `false`

**Fix**:
```sql
UPDATE admin_users 
SET is_active = true 
WHERE email = 'kontakt@huslampe.no';
```

### Issue 3: RLS Policy Missing
**Problem**: The RLS policy doesn't exist

**Fix**:
```sql
-- Drop old policy if exists
DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;

-- Create the correct policy
CREATE POLICY "Users can view their own admin record" ON admin_users
  FOR SELECT USING (id = auth.uid());
```

### Issue 4: Session Not Established
**Problem**: Session takes time to establish after login

**Solution**: Wait a few seconds after login, or refresh the page

## Step 6: Complete Verification Query

Run this complete check:

```sql
-- Check everything at once
WITH user_check AS (
  SELECT id, email FROM auth.users WHERE email = 'kontakt@huslampe.no'
),
admin_check AS (
  SELECT id, email, role, is_active FROM admin_users WHERE email = 'kontakt@huslampe.no'
)
SELECT 
  'Auth User' as source,
  uc.id as user_id,
  uc.email,
  NULL as role,
  NULL as is_active
FROM user_check uc
UNION ALL
SELECT 
  'Admin User' as source,
  ac.id as user_id,
  ac.email,
  ac.role::text,
  ac.is_active::text
FROM admin_check ac;
```

This will show you both records side by side so you can verify they match.

## Still Not Working?

1. **Clear browser cache and cookies**
2. **Try incognito/private browsing mode**
3. **Check browser console for detailed error messages**
4. **Verify environment variables are set correctly**
5. **Restart the development server**

