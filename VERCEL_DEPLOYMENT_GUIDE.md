# Vercel Deployment Guide

This guide provides step-by-step instructions for deploying your Next.js 15 application to Vercel without errors.

## Prerequisites

1. A Vercel account (free or paid)
2. A Git repository (GitHub, GitLab, or Bitbucket) containing your application code
3. The application code must be in the root of the repository

## Deployment Steps

### 1. Push Code to Repository

Ensure your code is pushed to a Git repository:

```bash
git add .
git commit -m "Prepare for Vercel deployment"
git push origin main
```

### 2. Connect Repository to Vercel

1. Log in to your Vercel account at [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your Git provider (GitHub, GitLab, or Bitbucket)
4. Import the repository containing your application

### 3. Configure Project Settings

Vercel should automatically detect the Next.js project and configure the following settings:

- **Framework Preset**: Next.js
- **Build Command**: `next build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

If these settings are not automatically detected, manually enter them.

### 4. Set Environment Variables

In the Vercel UI, go to your project settings > Environment Variables and add the following:

```bash
NEXT_PUBLIC_SITE_URL=https://your-project-name.vercel.app
```

Replace `your-project-name` with your actual Vercel project name.

Optional environment variables for additional features:

```bash
GOOGLE_SITE_VERIFICATION=your-google-verification-code
PLAUSIBLE_DOMAIN=your-domain.com
NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://plausible.io
```

### 5. Deploy

1. Click "Deploy"
2. Vercel will automatically start the build process
3. Wait for the build to complete (usually takes 2-5 minutes)
4. Once complete, your site will be live at `https://your-project-name.vercel.app`

## Configuration Details

### Vercel Configuration File

This project includes a `vercel.json` file that configures:

- Build settings for the Next.js application
- Security headers for all routes
- Environment variables for deployment
- File inclusion rules for the build process

### Internationalization (i18n)

Your application supports Norwegian (nb) and English (en) locales. The configuration includes:

- Automatic redirect from root path to `/nb` (Norwegian default)
- Proper handling of all localized routes
- Correct middleware configuration for locale detection

### Redirects

The following redirects are configured in your Next.js middleware:

- Root path redirects to `/nb` (Norwegian default)
- All routes properly handle locale prefixes

### Headers

Security headers are configured in both `next.config.ts` and `vercel.json`:

- X-Frame-Options: DENY
- X-Content-Type-Options: nosniff
- Referrer-Policy: strict-origin-when-cross-origin
- Strict-Transport-Security: max-age=63072000; includeSubDomains; preload

## Troubleshooting

### Build Issues

If you encounter build issues:

1. Check the build logs in Vercel for specific error messages
2. Ensure all dependencies are correctly listed in `package.json`
3. Verify that the build command is `next build`
4. Make sure your TypeScript code compiles without errors locally:
   ```bash
   npm run build
   ```

### Routing Issues

If you experience routing problems:

1. Check that your middleware configuration in `middleware.ts` is correct
2. Verify that internationalized routes are properly handled
3. Ensure that all content files exist for both locales

### Environment Variables

If environment variables are not working:

1. Check that they are correctly set in the Vercel project settings
2. Verify that they are referenced correctly in the code with `process.env.VARIABLE_NAME`
3. Remember that only variables prefixed with `NEXT_PUBLIC_` are available in the browser

## Custom Domain

To use a custom domain:

1. In Vercel, go to your project settings > Domains
2. Add your custom domain
3. Follow the instructions to configure DNS records with your domain registrar
4. Vercel will automatically provision an SSL certificate for your domain

## Performance Optimization

Your application is already optimized for performance:

- Server-side rendering with Next.js
- Optimized image loading with Next.js Image component
- Efficient caching strategies
- Minified CSS and JavaScript
- Automatic static optimization where possible

For additional optimization, consider:

1. Using Vercel Analytics for performance monitoring
2. Enabling Vercel Speed Insights
3. Configuring Vercel Edge Functions for serverless functionality

## Monitoring and Maintenance

1. Monitor build status and site performance through the Vercel dashboard
2. Set up notifications for build failures
3. Regularly check the site for broken links using Vercel's built-in tools
4. Monitor bandwidth usage and upgrade your plan if necessary

## Support

For issues with deployment:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the [Next.js documentation](https://nextjs.org/docs)
3. Contact Vercel support through their website
4. For application-specific issues, review the project README.md
