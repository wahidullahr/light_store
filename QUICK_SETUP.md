# Quick Admin Setup Guide

## Step 1: Create User in Supabase Auth

1. Go to **Supabase Dashboard** → **Authentication** → **Users**
2. Click **"Add user"** or **"Create new user"**
3. Fill in:
   - **Email**: `kontakt@huslampe.no`
   - **Password**: (choose a secure password)
   - **Auto Confirm User**: ✅ Check this box (so they can log in immediately)
4. Click **"Create user"**

## Step 2: Add User to Admin Table

1. Go to **Supabase Dashboard** → **SQL Editor**
2. Open `supabase/setup-admin.sql`
3. Copy the entire script
4. Paste into SQL Editor
5. Click **"Run"** (or press Cmd/Ctrl + Enter)

The script will:

- ✅ Automatically find the user by email
- ✅ Add them to `admin_users` table
- ✅ Show verification that it worked

## Step 3: Test Login

1. Go to: `http://localhost:3000/admin/login`
2. Enter:
   - Email: `kontakt@huslampe.no`
   - Password: (the password you set in Step 1)
3. Click **"Sign In"**

You should be redirected to the admin dashboard!

## Troubleshooting

**If login fails:**

- Make sure user exists in `auth.users` (check Authentication → Users)
- Make sure user exists in `admin_users` (run the SQL script)
- Check browser console (F12) for error messages

**If SQL script fails:**

- Make sure the user exists in `auth.users` first
- Check that the email matches exactly (case-sensitive)



