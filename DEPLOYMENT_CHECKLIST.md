# Deployment Checklist - Huslampe.no

## Pre-Deployment Checklist ✅

### Code Quality
- [x] TypeScript errors fixed
- [x] ESLint warnings resolved
- [x] Build successful (`npm run build`)
- [x] All tests passing

### Configuration
- [x] `next.config.ts` optimized for production
- [x] `vercel.json` updated for Next.js 15
- [x] Security headers configured
- [x] Environment variables documented

### Features Implemented
- [x] Contact form with Resend email integration
- [x] Admin panel (Content section removed, View Website button added)
- [x] Product highlights section with proper color scheme
- [x] Email address updated to kontakt@huslampe.no
- [x] Internationalization (Norwegian/English)

## Vercel Environment Variables Required

Set these in Vercel Dashboard → Project Settings → Environment Variables:

### Required Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://idjeqwuqtxvlmpusqrwf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
RESEND_API_KEY=re_gHCsiAut_9gWHuCEDYr1aNv8ixmE1ubCq
RESEND_FROM_EMAIL=Huslampe <noreply@huslampe.no>
NEXT_PUBLIC_SITE_URL=https://huslampe.no
```

### Optional Variables
```
GOOGLE_SITE_VERIFICATION=your_verification_code
PLAUSIBLE_DOMAIN=huslampe.no
NEXT_PUBLIC_PLAUSIBLE_API_HOST=https://plausible.io
```

## Deployment Steps

1. **Push to Git Repository**
   ```bash
   git add .
   git commit -m "feat: production-ready deployment with email integration"
   git push origin main
   ```

2. **Vercel Deployment**
   - Vercel will automatically deploy on push to `main` branch
   - Or manually trigger deployment from Vercel dashboard

3. **Verify Deployment**
   - Check all pages load correctly
   - Test contact form
   - Verify admin panel access
   - Check email delivery

## Post-Deployment Verification

- [ ] Homepage loads correctly
- [ ] Products page displays correctly
- [ ] Contact form sends emails to kontakt@huslampe.no
- [ ] Admin panel accessible at /admin
- [ ] All images load correctly
- [ ] Internationalization works (nb/en)
- [ ] Mobile responsive design works
- [ ] Performance metrics meet targets

## Security Checklist

- [x] Environment variables not exposed in client code
- [x] API routes protected with proper validation
- [x] XSS protection in email templates
- [x] Security headers configured
- [x] Admin authentication in place

## Performance Targets

- Lighthouse Performance: ≥95
- First Contentful Paint: <2.5s
- Largest Contentful Paint: <4.0s
- Cumulative Layout Shift: <0.1
- Total Blocking Time: <500ms

## Support & Maintenance

- Monitor Vercel deployment logs
- Check Resend email delivery logs
- Monitor Supabase usage and limits
- Regular backups of database
- Keep dependencies updated

