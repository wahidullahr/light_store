# Quick Fix Guide - Admin Login Issue

## The Problem

You're getting `[isAdminClient] Query error: {}` which means the RLS (Row Level Security) policy is blocking the query.

## The Solution

Run this SQL script in Supabase SQL Editor:

### Step 1: Open Supabase SQL Editor

1. Go to your Supabase Dashboard
2. Click on "SQL Editor" in the left sidebar
3. Click "New query"

### Step 2: Run the Fix Script

1. Open the file: `supabase/VERIFY_AND_FIX.sql`
2. Copy the **ENTIRE** script
3. Paste it into Supabase SQL Editor
4. Click "Run" (or press Cmd/Ctrl + Enter)

### Step 3: Check the Results

The script will show you:

- ✅ If RLS is enabled
- ✅ If policies exist
- ✅ If your user exists
- ✅ If IDs match
- ✅ Final status

### Step 4: Test Login

1. Clear browser cache/cookies
2. Go to: http://localhost:3000/admin/login
3. Log in with:
   - Email: `kontakt@huslampe.no`
   - Password: `Adelajan786`
4. Check browser console (F12) for detailed logs

## What the Script Does

1. **Verifies** your current setup
2. **Fixes** the RLS policy
3. **Verifies** the fix worked
4. **Shows** you exactly what's wrong (if anything)

## Common Issues

### Issue: "IDs DO NOT MATCH"

**Fix**: The script will show you the correct ID. Update admin_users:

```sql
UPDATE admin_users
SET id = 'correct-id-from-auth-users'
WHERE email = 'kontakt@huslampe.no';
```

### Issue: "User not found in admin_users"

**Fix**: Add the user:

```sql
INSERT INTO admin_users (id, email, role, is_active)
SELECT id, email, 'admin', true
FROM auth.users
WHERE email = 'kontakt@huslampe.no';
```

### Issue: "User is not active"

**Fix**: Activate the user:

```sql
UPDATE admin_users
SET is_active = true
WHERE email = 'kontakt@huslampe.no';
```

## After Running the Script

The script will automatically:

- ✅ Enable RLS on admin_users table
- ✅ Drop old policies
- ✅ Create the correct policy: `"Users can view their own admin record"`
- ✅ Verify everything is correct

**Then try logging in again!**



