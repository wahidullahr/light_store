# Complete CMS Fix Guide - Admin Login Issue

## What Was Fixed

1. ✅ **Simplified admin authentication** - Removed broken API dependency
2. ✅ **Fixed RLS policy SQL script** - Complete fix for admin_users table
3. ✅ **Improved error logging** - Better debugging information
4. ✅ **Fixed session management** - Proper timing and verification
5. ✅ **Updated test page** - Removed broken API endpoint

## Step-by-Step Fix Instructions

### Step 1: Fix RLS Policy in Supabase

**CRITICAL**: This is the most important step!

1. Go to Supabase Dashboard → SQL Editor
2. Open the file: `supabase/fix-admin-rls-complete.sql`
3. Copy the **ENTIRE** script
4. Paste it into Supabase SQL Editor
5. Click "Run" to execute
6. Verify you see the policies listed in the results

**What this does:**

- Enables RLS on `admin_users` table
- Drops old policies (if any)
- Creates the critical policy: "Users can view their own admin record"
- This policy allows: `id = auth.uid()` which is REQUIRED for login

### Step 2: Verify User Setup

Run these queries in Supabase SQL Editor to verify your user:

```sql
-- 1. Check user exists in auth.users
SELECT id, email, created_at
FROM auth.users
WHERE email = 'kontakt@huslampe.no';

-- 2. Check user exists in admin_users
SELECT id, email, role, is_active, created_at
FROM admin_users
WHERE email = 'kontakt@huslampe.no';

-- 3. CRITICAL: Verify IDs match (they MUST be the same!)
SELECT
  au.id as admin_users_id,
  au.email,
  au.is_active,
  u.id as auth_users_id,
  CASE
    WHEN au.id = u.id THEN '✅ IDs match - GOOD!'
    ELSE '❌ IDs DO NOT match - THIS IS THE PROBLEM!'
  END as status
FROM admin_users au
JOIN auth.users u ON au.email = u.email
WHERE au.email = 'kontakt@huslampe.no';
```

**If IDs don't match:**

```sql
-- Get the correct ID from auth.users
SELECT id FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- Update admin_users with the correct ID (replace 'correct-id-here')
UPDATE admin_users
SET id = 'correct-id-from-auth-users-above'
WHERE email = 'kontakt@huslampe.no';
```

### Step 3: Test the Login

1. **Clear browser cache/cookies** (important!)
2. Go to: http://localhost:3000/admin/login
3. Enter credentials:
   - Email: `kontakt@huslampe.no`
   - Password: `Adelajan786`
4. Click "Sign In"
5. **Open browser console (F12)** to see detailed logs

### Step 4: Run Diagnostic Tests

If login still fails:

1. Go to: http://localhost:3000/admin/test
2. Click "Run Diagnostic Tests"
3. Review the results:
   - ✅ Green checkmarks = Working
   - ❌ Red X = Problem detected
4. Check the detailed error messages

## Common Issues and Solutions

### Issue 1: "PGRST116" Error Code

**Meaning**: RLS policy is blocking the query

**Solution**:

- Run `supabase/fix-admin-rls-complete.sql` again
- Make sure the policy "Users can view their own admin record" exists
- Verify RLS is enabled: `SELECT rowsecurity FROM pg_tables WHERE tablename = 'admin_users';`

### Issue 2: "User ID mismatch"

**Meaning**: The ID in `auth.users` doesn't match `admin_users.id`

**Solution**:

- Run the verification queries in Step 2
- Update `admin_users.id` to match `auth.users.id`

### Issue 3: "No session found"

**Meaning**: Session not established after login

**Solution**:

- Clear browser cookies
- Try logging in again
- Wait a moment after clicking "Sign In"
- Check browser console for session errors

### Issue 4: "User is not an admin"

**Meaning**: User exists but `is_active = false` or user not in `admin_users`

**Solution**:

```sql
-- Check if user exists and is active
SELECT id, email, role, is_active
FROM admin_users
WHERE email = 'kontakt@huslampe.no';

-- If user exists but is_active = false:
UPDATE admin_users
SET is_active = true
WHERE email = 'kontakt@huslampe.no';

-- If user doesn't exist, add them:
-- First get the ID from auth.users:
SELECT id FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- Then insert (replace 'user-id-here' with actual ID):
INSERT INTO admin_users (id, email, role, is_active)
VALUES ('user-id-here', 'kontakt@huslampe.no', 'admin', true);
```

## Files Changed

- ✅ `src/lib/admin/auth.ts` - Completely rewritten, simplified, better error handling
- ✅ `supabase/fix-admin-rls-complete.sql` - Complete RLS fix script
- ✅ `src/app/admin/test/page.tsx` - Updated to remove broken API dependency
- ❌ `src/app/api/admin/verify/route.ts` - Removed (was causing errors)

## How It Works Now

1. **Login Flow**:
   - User enters email/password
   - `signInAdmin()` calls Supabase Auth
   - Waits for session to be established
   - Calls `isAdminClient()` to verify admin status
   - `isAdminClient()` queries `admin_users` table
   - RLS policy allows query if `id = auth.uid()`

2. **Admin Check**:
   - Gets current user from Supabase Auth
   - Gets session to verify it's established
   - Queries `admin_users` table with user's ID
   - RLS policy checks: `id = auth.uid()`
   - Returns true if user exists and `is_active = true`

## Verification Checklist

After running the fix, verify:

- [ ] RLS is enabled: `SELECT rowsecurity FROM pg_tables WHERE tablename = 'admin_users';` returns `t`
- [ ] Policy exists: `SELECT policyname FROM pg_policies WHERE tablename = 'admin_users';` shows the policy
- [ ] User exists in `auth.users` with correct email
- [ ] User exists in `admin_users` with matching ID
- [ ] `is_active = true` in `admin_users`
- [ ] IDs match between `auth.users` and `admin_users`
- [ ] Can log in successfully
- [ ] Browser console shows "✅ Admin verified" message

## Still Having Issues?

1. **Check browser console (F12)** - Look for detailed error messages
2. **Run diagnostic tests** - http://localhost:3000/admin/test
3. **Verify SQL was run** - Check Supabase Dashboard → Authentication → Policies
4. **Check user data** - Run verification queries in Step 2
5. **Clear everything** - Clear browser cache, cookies, and try again

## Key Points

- **RLS Policy is CRITICAL** - Without it, users cannot query their own admin record
- **IDs MUST match** - `auth.users.id` must equal `admin_users.id`
- **Session must be established** - Wait time is included in the code
- **is_active must be true** - Check this in the database

The system is now simplified and should work reliably. The main issue was the RLS policy not being set correctly.



