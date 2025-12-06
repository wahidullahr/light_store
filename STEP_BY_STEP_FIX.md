# Step-by-Step Fix - Admin Login Issue

## The Problem

You can't log in because the RLS (Row Level Security) policy is blocking the query to `admin_users` table.

## The Solution (3 Simple Steps)

### ✅ Step 1: Fix RLS Policy in Supabase

1. **Go to Supabase Dashboard**
   - Open: https://supabase.com/dashboard
   - Select your project

2. **Open SQL Editor**
   - Click "SQL Editor" in the left sidebar
   - Click "New query"

3. **Run the Fix Script**
   - Open file: `supabase/VERIFY_AND_FIX.sql`
   - Copy the **ENTIRE** script (all 150+ lines)
   - Paste into Supabase SQL Editor
   - Click "Run" button (or press Cmd/Ctrl + Enter)

4. **Check Results**
   - You should see multiple result tables
   - Look for "Final Check" - it should show: ✅ EVERYTHING IS CORRECT!

### ✅ Step 2: Clear Browser Cache

1. **Clear cookies and cache**
   - Chrome/Edge: Settings → Privacy → Clear browsing data → Cookies and cached images
   - Firefox: Settings → Privacy → Clear Data → Cookies and Cache
   - Safari: Develop → Empty Caches (enable Develop menu first)

2. **Or use Incognito/Private mode**
   - This ensures no cached data interferes

### ✅ Step 3: Test Login

1. **Go to login page**
   - URL: http://localhost:3000/admin/login

2. **Enter credentials**
   - Email: `kontakt@huslampe.no`
   - Password: `Adelajan786`

3. **Click "Sign In"**

4. **Check browser console (F12)**
   - You should see: `[isAdminClient] ✅ Admin verified`
   - If you see errors, they will be detailed now

## What the SQL Script Does

The script (`supabase/VERIFY_AND_FIX.sql`) will:

1. ✅ Check if RLS is enabled
2. ✅ Check if policies exist
3. ✅ Check if your user exists
4. ✅ Check if IDs match
5. ✅ **Fix the RLS policy automatically**
6. ✅ Verify everything is correct

## If Login Still Fails After Running SQL

### Check 1: Verify User Exists

Run in Supabase SQL Editor:

```sql
SELECT
  au.id as admin_users_id,
  au.email,
  au.is_active,
  u.id as auth_users_id,
  CASE
    WHEN au.id = u.id THEN '✅ IDs match'
    ELSE '❌ IDs DO NOT match'
  END as status
FROM admin_users au
JOIN auth.users u ON au.email = u.email
WHERE au.email = 'kontakt@huslampe.no';
```

### Check 2: Verify RLS Policy Exists

Run in Supabase SQL Editor:

```sql
SELECT policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'admin_users';
```

You should see: `"Users can view their own admin record"`

### Check 3: Fix User ID Mismatch (if needed)

If IDs don't match:

```sql
-- Get correct ID
SELECT id FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- Update admin_users (replace 'CORRECT-ID' with the ID from above)
UPDATE admin_users
SET id = 'CORRECT-ID-HERE'
WHERE email = 'kontakt@huslampe.no';
```

### Check 4: Add User to admin_users (if missing)

If user doesn't exist in admin_users:

```sql
INSERT INTO admin_users (id, email, role, is_active)
SELECT id, email, 'admin', true
FROM auth.users
WHERE email = 'kontakt@huslampe.no';
```

## Expected Console Output (After Fix)

When login works, you should see in browser console (F12):

```
[signInAdmin] Attempting login for: kontakt@huslampe.no
[signInAdmin] ✅ Auth successful, user ID: [user-id]
[signInAdmin] ✅ Session established
[signInAdmin] Checking admin status...
[isAdminClient] ✅ Admin verified: { userId: '...', email: '...', role: 'admin' }
[signInAdmin] ✅ Login successful, user is admin
```

## Still Having Issues?

1. **Run the diagnostic test page** (after logging in):
   - http://localhost:3000/admin/test
   - Click "Run Diagnostic Tests"
   - Review the detailed results

2. **Check browser console** (F12):
   - Look for detailed error messages
   - Copy the error and check what it says

3. **Verify SQL was run**:
   - Go to Supabase Dashboard → Authentication → Policies
   - You should see the policy listed

## The Most Important Step

**RUN THE SQL SCRIPT FIRST!** (`supabase/VERIFY_AND_FIX.sql`)

This fixes 99% of the issues. The script is designed to be safe - it checks everything before making changes.



