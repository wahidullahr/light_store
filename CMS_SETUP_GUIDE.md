# CMS Dashboard Setup Guide

This guide will help you set up and use the Huslampe CMS Dashboard.

## Prerequisites

1. Supabase project configured
2. Database schema created (run `supabase/schema.sql` in Supabase SQL Editor)
3. Supabase Storage bucket named `images` created

## Step 1: Create Database Schema

1. Go to your Supabase Dashboard
2. Navigate to SQL Editor
3. Copy and paste the contents of `supabase/schema.sql`
4. Run the SQL script

## Step 2: Create Storage Bucket

1. Go to Storage in Supabase Dashboard
2. Click "Create bucket"
3. Name: `images`
4. Make it public (or configure RLS policies)
5. Click "Create bucket"

## Step 3: Create Admin User

### Option A: Using Setup Page (Easiest - Recommended)

1. Navigate to: `http://localhost:3000/admin/setup`
2. Enter your email and password
3. Click "Create Admin User"
4. You'll be redirected to the login page
5. Sign in with your new credentials

**Note**: This only works for the first admin user. After that, use Option B or C.

### Option B: Using Supabase Dashboard

1. Go to Authentication > Users in Supabase Dashboard
2. Click "Add user"
3. Enter email and password
4. Create the user
5. Copy the user's UUID
6. Go to SQL Editor and run:

```sql
INSERT INTO admin_users (id, email, role, is_active)
VALUES ('user-uuid-from-step-4', 'your-email@huslampe.no', 'admin', true);
```

### Option C: Using API

Use the setup API endpoint:

```bash
curl -X POST http://localhost:3000/api/admin/setup \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@huslampe.no","password":"your-password"}'
```

## Step 4: Access Admin Dashboard

1. Start your development server: `npm run dev`
2. **First time setup**: Navigate to `http://localhost:3000/admin/setup` to create your first admin user
3. **After setup**: Navigate to `http://localhost:3000/admin/login`
4. Sign in with your admin credentials

## Features

### Dashboard (`/admin`)
- Overview statistics
- Quick actions
- Recent activity

### Products Management (`/admin/products`)
- View all products
- Create new products
- Edit existing products
- Delete products
- Toggle active/inactive status
- Upload product images

### Content Management (`/admin/content`)
- Manage site-wide content
- Edit text content for different locales
- Update hero sections, taglines, etc.

### Image Upload (`/admin/images`)
- Upload images to Supabase Storage
- Organize images by folder
- Get public URLs for use in products

## Database Schema

### Products Table
- `id`: UUID (primary key)
- `product_id`: Unique identifier (e.g., "fjord-01")
- `name_nb`, `name_en`: Product names in both languages
- `price_min`, `price_max`: Price range
- `images`: JSON array of image objects
- `is_active`: Boolean for visibility
- `display_order`: Integer for sorting

### Site Content Table
- `id`: UUID (primary key)
- `content_key`: Unique key (e.g., "hero_title")
- `locale`: "nb" or "en"
- `content_type`: "text", "json", or "html"
- `content_value`: The actual content

### Admin Users Table
- `id`: UUID (references auth.users)
- `email`: Admin email
- `role`: "admin" or "editor"
- `is_active`: Boolean

## Security

- Row Level Security (RLS) is enabled
- Only authenticated admin users can modify data
- Public read access for products and content
- Admin routes protected by authentication check

## API Endpoints

- `GET /api/admin/products` - List all products
- `POST /api/admin/products` - Create product
- `GET /api/admin/products/[id]` - Get single product
- `PUT /api/admin/products/[id]` - Update product
- `DELETE /api/admin/products/[id]` - Delete product
- `POST /api/admin/upload` - Upload image

## Troubleshooting

### "User is not an admin" error
- Make sure user exists in `admin_users` table
- Check that `is_active` is `true`

### Image upload fails
- Verify Storage bucket `images` exists
- Check bucket permissions
- Ensure RLS policies allow uploads

### Database errors
- Verify schema is created correctly
- Check RLS policies are set up
- Ensure admin user has proper permissions

## Next Steps

1. Create your first admin user
2. Upload product images
3. Create products in the dashboard
4. Update site content
5. Test the frontend to see changes

