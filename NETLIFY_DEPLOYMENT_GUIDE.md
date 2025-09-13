# Netlify Deployment Guide

This guide provides step-by-step instructions for deploying your Next.js 15 application to Netlify without errors.

## Prerequisites

1. A Netlify account (free or paid)
2. A Git repository (GitHub, GitLab, or Bitbucket) containing your application code
3. The application code must be in the root of the repository

## Deployment Steps

### 1. Push Code to Repository

Ensure your code is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Netlify deployment"
git push origin main
```

### 2. Connect Repository to Netlify

1. Log in to your Netlify account
2. Click "New site from Git"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Authorize Netlify to access your repositories if prompted
5. Select the repository containing your application

### 3. Configure Build Settings

Netlify should automatically detect the Next.js project and configure the following settings:

- **Build command**: `next build`
- **Publish directory**: `.next`

If these settings are not automatically detected, manually enter them.

### 4. Set Environment Variables

In the Netlify UI, go to "Site settings" > "Environment variables" and add the following:

```bash
NEXT_PUBLIC_SITE_URL=https://your-site-name.netlify.app
```

Replace `your-site-name` with your actual Netlify site name.

Optional environment variables for additional features:

```bash
GOOGLE_SITE_VERIFICATION=your-google-verification-code
PLAUSIBLE_DOMAIN=your-domain.com
NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://plausible.io
```

### 5. Deploy

1. Click "Deploy site"
2. Netlify will automatically start the build process
3. Wait for the build to complete (usually takes 2-5 minutes)
4. Once complete, your site will be live at `https://your-site-name.netlify.app`

## Configuration Details

### Internationalization (i18n)

Your application supports Norwegian (nb) and English (en) locales. The configuration includes:

- Automatic redirect from root path to `/nb` (Norwegian default)
- Proper handling of all localized routes
- Correct middleware configuration for locale detection

### Redirects

The following redirects are configured in `netlify.toml`:

- `/` → `/nb` (301 redirect)
- `/products` → `/nb/products` (301 redirect)
- `/about` → `/nb/about` (301 redirect)
- `/contact` → `/nb/contact` (301 redirect)
- `/test` → `/nb/test` (301 redirect)

### Headers

Security headers are configured in `public/_headers`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

### Caching

Optimal caching is configured for static assets:

- `_next/static/*`: 1 year (immutable)
- Images: 30 days

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Check the build logs in Netlify for specific error messages
2. Ensure all dependencies are correctly listed in `package.json`
3. Verify that the build command is `next build`
4. Make sure your TypeScript code compiles without errors locally:
   ```bash
   npm run build
   ```

### Routing Issues

If you experience routing problems:

1. Check that the `netlify.toml` file is in the root of your repository
2. Verify that redirects are properly configured
3. Ensure the middleware configuration in `middleware.ts` is correct

### Environment Variables

If environment variables are not working:

1. Check that they are correctly set in the Netlify UI
2. Verify that they are referenced correctly in the code with `process.env.VARIABLE_NAME`
3. Remember that only variables prefixed with `NEXT_PUBLIC_` are available in the browser

## Custom Domain

To use a custom domain:

1. In Netlify, go to "Site settings" > "Domain management"
2. Click "Add custom domain"
3. Enter your domain name
4. Follow the instructions to configure DNS records with your domain registrar
5. Enable HTTPS by clicking "Verify DNS configuration" once DNS is set up

## Performance Optimization

Your application is already optimized for performance:

- Server-side rendering with Next.js
- Optimized image loading with Next.js Image component
- Efficient caching strategies
- Minified CSS and JavaScript
- Precompressed assets

For additional optimization, consider:

1. Using Netlify's built-in analytics instead of external services
2. Enabling Netlify's Edge Functions for serverless functionality
3. Configuring Netlify's form handling for contact forms

## Monitoring and Maintenance

1. Monitor build status and site performance through the Netlify dashboard
2. Set up notifications for build failures
3. Regularly check the site for broken links using Netlify's built-in tools
4. Monitor bandwidth usage and upgrade your plan if necessary

## Support

For issues with deployment:

1. Check the [Netlify documentation](https://docs.netlify.com/)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Contact Netlify support through their website
4. For application-specific issues, review the project README.md
