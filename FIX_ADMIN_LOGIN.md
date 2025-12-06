# Fix Admin Login Issue - Complete Guide

## What I've Done

I've implemented a comprehensive solution to diagnose and fix the admin login issue:

### 1. **Server-Side Verification API** (`/api/admin/verify`)

- More reliable than client-side checks
- Properly handles RLS policies
- Returns detailed debug information

### 2. **Improved Admin Check Function**

- Now tries server-side API first (more reliable)
- Falls back to client-side check if needed
- Better error logging and diagnostics

### 3. **Diagnostic Test Page** (`/admin/test`)

- Run comprehensive tests to identify the exact issue
- Shows detailed results about authentication, session, and RLS
- Provides specific SQL fixes if RLS issues are detected

### 4. **SQL Fix Scripts**

- `supabase/fix-admin-rls-complete.sql` - Complete fix for RLS policies
- `supabase/test-rls-direct.sql` - Test RLS policies directly

## How to Fix the Issue

### Step 1: Run the Complete Fix SQL

1. Go to Supabase Dashboard → SQL Editor
2. Open `supabase/fix-admin-rls-complete.sql`
3. Copy and paste the entire script into SQL Editor
4. Click "Run" to execute
5. Verify you see the policies listed in the results

### Step 2: Test the Fix

1. Go to: http://localhost:3000/admin/test
2. Click "Run Diagnostic Tests"
3. Review the results:
   - ✅ All green = Everything is working!
   - ❌ Red items = Issues detected (see recommendations)

### Step 3: Try Logging In

1. Go to: http://localhost:3000/admin/login
2. Enter your credentials:
   - Email: `kontakt@huslampe.no`
   - Password: `Adelajan786`
3. Check browser console (F12) for detailed logs
4. If it still fails, check the diagnostic test results

## Common Issues and Solutions

### Issue: "PGRST116" Error Code

**Meaning**: RLS policy is blocking the query

**Fix**: Run `supabase/fix-admin-rls-complete.sql` in Supabase SQL Editor

### Issue: "No session found"

**Meaning**: Session not established properly

**Fix**:

- Clear browser cookies/cache
- Try logging in again
- Wait a moment after login before checking admin status

### Issue: "User ID mismatch"

**Meaning**: The user ID in `auth.users` doesn't match `admin_users.id`

**Fix**:

```sql
-- Check if IDs match
SELECT
  au.id as admin_users_id,
  u.id as auth_users_id,
  au.email,
  CASE WHEN au.id = u.id THEN '✅ Match' ELSE '❌ Mismatch' END
FROM admin_users au
JOIN auth.users u ON au.email = u.email
WHERE au.email = 'kontakt@huslampe.no';

-- If they don't match, fix it:
-- 1. Get the correct ID from auth.users
SELECT id FROM auth.users WHERE email = 'kontakt@huslampe.no';

-- 2. Update admin_users with the correct ID
UPDATE admin_users
SET id = 'correct-id-from-auth-users'
WHERE email = 'kontakt@huslampe.no';
```

## Debugging Tools

### 1. Diagnostic Test Page

- URL: http://localhost:3000/admin/test
- Runs comprehensive tests
- Shows exactly what's wrong

### 2. Browser Console

- Press F12 → Console tab
- Look for detailed error messages
- Check for "ADMIN CHECK ERROR" sections

### 3. API Verification Endpoint

- URL: http://localhost:3000/api/admin/verify
- Returns JSON with debug information
- Can be called directly or via the test page

## Verification Checklist

After running the fix, verify:

- [ ] RLS is enabled on `admin_users` table
- [ ] Policy "Users can view their own admin record" exists
- [ ] User exists in `auth.users` table
- [ ] User exists in `admin_users` table
- [ ] IDs match between `auth.users` and `admin_users`
- [ ] `is_active = true` in `admin_users`
- [ ] Diagnostic tests all pass (green checkmarks)
- [ ] Can log in successfully

## Still Having Issues?

1. **Check the diagnostic test page**: http://localhost:3000/admin/test
2. **Check browser console**: F12 → Console tab
3. **Verify SQL was run**: Check Supabase Dashboard → Authentication → Policies
4. **Check user data**: Run the SQL queries in `supabase/test-rls-direct.sql`

## Files Changed

- `src/lib/admin/auth.ts` - Improved admin check with API fallback
- `src/app/api/admin/verify/route.ts` - New verification endpoint
- `src/app/admin/test/page.tsx` - New diagnostic test page
- `src/app/admin/login/page.tsx` - Added link to test page
- `supabase/fix-admin-rls-complete.sql` - Complete RLS fix script
- `supabase/test-rls-direct.sql` - RLS testing queries



