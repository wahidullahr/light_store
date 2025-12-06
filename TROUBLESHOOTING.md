# Troubleshooting Guide

## Login Issues

### "User is not an admin" Error

**Problem**: You can sign in with Supabase Auth, but get "User is not an admin" error.

**Solution - Easiest Method**:
1. Go to: `http://localhost:3000/admin/add-admin`
2. Enter the email of the user you just created
3. Click "Add Admin User"
4. The user will be automatically added to the `admin_users` table
5. Go back to login and sign in again

**Solution - Manual Method (SQL)**:
1. Make sure you've run the updated `supabase/schema.sql` which includes the fixed RLS policy
2. Verify the user exists in `admin_users` table:
   ```sql
   SELECT * FROM admin_users WHERE email = 'your-email@huslampe.no';
   ```
3. If the user doesn't exist, add them:
   ```sql
   -- Get user ID from auth.users
   SELECT id, email FROM auth.users WHERE email = 'your-email@huslampe.no';
   
   -- Then insert into admin_users (replace 'user-id-here' with actual ID)
   INSERT INTO admin_users (id, email, role, is_active)
   VALUES ('user-id-here', 'your-email@huslampe.no', 'admin', true);
   ```

### "Invalid login credentials" Error

**Problem**: Email/password combination doesn't work.

**Solutions**:
1. Verify the user exists in Supabase Auth:
   - Go to Supabase Dashboard > Authentication > Users
   - Check if your email is listed
2. Reset password if needed:
   - Use Supabase Dashboard to reset password
   - Or use the password reset flow
3. Make sure you're using the correct email (case-sensitive)

### RLS Policy Issues

**Problem**: Can't query admin_users table even after login.

**Solution**: 
1. Make sure you've run the updated schema.sql with the new RLS policy:
   ```sql
   -- This policy allows users to check their own admin status
   CREATE POLICY "Users can view their own admin record" ON admin_users
     FOR SELECT USING (id = auth.uid());
   ```
2. If you already ran the old schema, drop and recreate the policy:
   ```sql
   DROP POLICY IF EXISTS "Admins can view admin users" ON admin_users;
   
   CREATE POLICY "Users can view their own admin record" ON admin_users
     FOR SELECT USING (id = auth.uid());
   ```

### Database Connection Issues

**Problem**: "Missing Supabase server environment variables" error.

**Solution**:
1. Check `.env.local` file exists in project root
2. Verify it contains:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```
3. Restart the development server after adding/updating `.env.local`

### First Admin User Setup

**Problem**: Can't create the first admin user.

**Solution**:
1. Use the setup page: `http://localhost:3000/admin/setup`
2. Or use the API endpoint:
   ```bash
   curl -X POST http://localhost:3000/api/admin/setup \
     -H "Content-Type: application/json" \
     -d '{"email":"admin@huslampe.no","password":"secure-password"}'
   ```
3. Or manually via Supabase Dashboard + SQL (see CMS_SETUP_GUIDE.md)

## Common Issues

### Images Not Uploading

**Problem**: Image upload fails with permission error.

**Solutions**:
1. Verify Storage bucket `images` exists
2. Check bucket is public or has proper RLS policies
3. For public bucket: Go to Storage > images > Settings > Make public
4. For RLS: Create policy allowing authenticated users to upload

### Products Not Showing

**Problem**: Products page is empty or shows errors.

**Solutions**:
1. Check if products table exists: `SELECT * FROM products LIMIT 1;`
2. Verify RLS policies allow public read:
   ```sql
   SELECT * FROM products WHERE is_active = true;
   ```
3. Check browser console for errors
4. Verify API routes are working: `http://localhost:3000/api/admin/products`

### TypeScript Errors

**Problem**: Build fails with TypeScript errors.

**Solutions**:
1. Run `npm run build` to see specific errors
2. Check that all Supabase types are properly imported
3. Verify database schema matches TypeScript types in `src/lib/supabase/types.ts`

## Debugging Tips

### Check Supabase Connection

Visit: `http://localhost:3000/api/supabase/test`

This will test if Supabase is properly configured.

### Check Admin Status

Open browser console and run:
```javascript
// After logging in
const { data: { user } } = await supabase.auth.getUser();
console.log('User:', user);

const { data: admin } = await supabase
  .from('admin_users')
  .select('*')
  .eq('id', user.id)
  .single();
console.log('Admin record:', admin);
```

### View Database Tables

In Supabase Dashboard > Table Editor, verify:
- `products` table exists and has data
- `admin_users` table exists and has your user
- `site_content` table exists

## Getting Help

If you're still having issues:
1. Check browser console for errors
2. Check terminal/server logs
3. Verify all setup steps in CMS_SETUP_GUIDE.md
4. Check Supabase Dashboard for any errors or warnings

