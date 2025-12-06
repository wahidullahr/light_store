# Admin CMS Setup

Simple, clean admin system for Huslampe.

## Setup

### 1. Database Schema

Run `supabase/schema.sql` in Supabase SQL Editor. This creates:

- Products table with RLS
- Site content table with RLS
- Admin users table with proper RLS policies

### 2. Add Admin User

**IMPORTANT**: You must create the user in Supabase Auth FIRST, then add them to admin_users.

1. **Create user in Supabase Auth**:
   - Go to **Supabase Dashboard** → **Authentication** → **Users**
   - Click **"Add user"** or **"Create new user"**
   - Email: `kontakt@huslampe.no`
   - Password: (choose a secure password)
   - ✅ Check **"Auto Confirm User"** (so they can log in immediately)
   - Click **"Create user"**

2. **Run the setup script**:
   - Go to **Supabase Dashboard** → **SQL Editor**
   - Open `supabase/setup-admin.sql`
   - Copy the entire script and paste into SQL Editor
   - Click **"Run"** (or press Cmd/Ctrl + Enter)
   - The script automatically finds the user by email and adds them as admin
   - If your email is different, replace `'kontakt@huslampe.no'` in the script

3. **Verify**:
   - The script will show a verification query at the end
   - You should see: `✅ Admin user exists`

### 3. Login

- Go to `/admin/login`
- Use your Supabase Auth credentials
- You'll be redirected to `/admin` dashboard

## Features

- ✅ Simple authentication
- ✅ Product management (CRUD)
- ✅ Clean, minimal UI
- ✅ Proper RLS policies
- ✅ Type-safe API routes

## File Structure

```
src/
  app/
    admin/
      login/          # Login page
      products/       # Product list
      products/new/    # Create product
      products/[id]/  # Edit product
    api/
      products/       # Product API
  lib/
    auth.ts           # Authentication utilities
```

## RLS Policies

- **Products**: Public read, Admin write
- **Site Content**: Public read, Admin write
- **Admin Users**: Users can view own record, Admins can view all

All policies are set up in `supabase/schema.sql`.
