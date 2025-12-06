# Domain Setup Guide for huslampe.no

This guide will help you connect your custom domain `huslampe.no` from one.com to your Vercel deployment.

## Step 1: Add Domain to Vercel

### Option A: Via Vercel Dashboard (Recommended)

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project: **light-store**
3. Navigate to **Settings** → **Domains**
4. Click **Add Domain**
5. Enter: `huslampe.no`
6. Click **Add**
7. Vercel will provide you with DNS configuration instructions

### Option B: Via Vercel CLI

```bash
vercel domains add huslampe.no
```

## Step 2: Configure DNS in one.com

After adding the domain in Vercel, you'll receive DNS records to configure. Here's how to set them up in one.com:

### Access DNS Settings in one.com

1. Log in to your one.com control panel
2. Navigate to **Domain** → **DNS Settings** (or **DNS Management**)
3. Select your domain: `huslampe.no`

### DNS Records to Add

Vercel will provide you with specific DNS records. Typically, you'll need:

#### For Root Domain (huslampe.no):

**Option 1: A Record (IPv4)**

- **Type**: A
- **Name**: @ (or leave blank for root domain)
- **Value**: `76.76.21.21` (Vercel's IP - verify in Vercel dashboard)
- **TTL**: 3600 (or default)

**Option 2: CNAME Record (Recommended)**

- **Type**: CNAME
- **Name**: @ (or leave blank for root domain)
- **Value**: `cname.vercel-dns.com` (verify in Vercel dashboard)
- **TTL**: 3600 (or default)

**Note**: Some registrars don't support CNAME for root domains. If one.com doesn't support CNAME for root domain, use the A record method.

#### For WWW Subdomain (www.huslampe.no):

- **Type**: CNAME
- **Name**: www
- **Value**: `cname.vercel-dns.com` (verify in Vercel dashboard)
- **TTL**: 3600 (or default)

### Important Notes for one.com

1. **DNS Propagation**: Changes can take 24-48 hours to propagate globally
2. **Remove Existing Records**: Remove any conflicting A, AAAA, or CNAME records for the root domain
3. **Verify Values**: Always use the exact DNS values provided by Vercel in your project settings

## Step 3: Verify Domain in Vercel

1. After adding DNS records in one.com, return to Vercel dashboard
2. Go to **Settings** → **Domains**
3. Vercel will automatically detect and verify your domain
4. SSL certificate will be automatically provisioned (can take a few minutes)

## Step 4: Test Your Domain

Once DNS has propagated (usually within a few hours):

1. Visit `https://huslampe.no` in your browser
2. Visit `https://www.huslampe.no` (if configured)
3. Verify SSL certificate is active (green padlock in browser)

## Troubleshooting

### Domain Not Resolving

- **Check DNS Propagation**: Use [dnschecker.org](https://dnschecker.org) to verify DNS propagation globally
- **Verify DNS Records**: Double-check the records in one.com match exactly what Vercel provided
- **Wait for Propagation**: DNS changes can take up to 48 hours

### SSL Certificate Issues

- Vercel automatically provisions SSL certificates via Let's Encrypt
- If SSL is not working, wait 10-15 minutes after DNS verification
- Check Vercel dashboard for SSL certificate status

### Common one.com Issues

- **CNAME for Root Domain**: If one.com doesn't support CNAME for root domain, use A record pointing to Vercel's IP
- **DNS Management Location**: In one.com, DNS settings might be under "Domain Settings" or "Advanced DNS"
- **TTL Settings**: Lower TTL (300-600) can help with faster propagation during setup

## Current Configuration

- **Domain**: huslampe.no
- **Environment Variable**: `NEXT_PUBLIC_SITE_URL` is set to `https://huslampe.no` in `vercel.json`
- **Project**: light-store on Vercel

## Support Resources

- [Vercel Domain Documentation](https://vercel.com/docs/concepts/projects/domains)
- [one.com DNS Help](https://help.one.com/hc/en-us/articles/115005588249-How-do-I-edit-DNS-records-)
- [Vercel Support](https://vercel.com/support)
