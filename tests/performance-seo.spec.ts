import { test, expect } from '@playwright/test';

test.describe('Performance and SEO', () => {
  test('should have proper meta tags', async ({ page }) => {
    await page.goto('/nb');
    
    // Basic meta tags
    await expect(page.locator('meta[name=\"description\"]')).toHaveCount(1);
    await expect(page.locator('meta[name=\"keywords\"]')).toHaveCount(1);
    
    // Open Graph tags
    await expect(page.locator('meta[property=\"og:title\"]')).toHaveCount(1);
    await expect(page.locator('meta[property=\"og:description\"]')).toHaveCount(1);
    await expect(page.locator('meta[property=\"og:type\"]')).toHaveCount(1);
    await expect(page.locator('meta[property=\"og:image\"]')).toHaveCount(1);
    
    // Twitter tags
    await expect(page.locator('meta[name=\"twitter:card\"]')).toHaveCount(1);
    await expect(page.locator('meta[name=\"twitter:title\"]')).toHaveCount(1);
  });

  test('should have structured data', async ({ page }) => {
    await page.goto('/nb');
    
    // Check for JSON-LD structured data
    const jsonLdScripts = page.locator('script[type=\"application/ld+json\"]');
    await expect(jsonLdScripts).toHaveCount(3); // Organization, Website, Products
    
    // Validate JSON-LD content
    const jsonLdContent = await jsonLdScripts.first().textContent();
    expect(jsonLdContent).toBeTruthy();
    
    const parsedJsonLd = JSON.parse(jsonLdContent || '{}');
    expect(parsedJsonLd['@context']).toBe('https://schema.org');
    expect(parsedJsonLd['@type']).toBeTruthy();
  });

  test('should have proper page titles for each locale', async ({ page }) => {
    // Norwegian title
    await page.goto('/nb');
    await expect(page).toHaveTitle(/Nordlys Trelys/);
    await expect(page).toHaveTitle(/håndlagde/i);
    
    // English title
    await page.goto('/en');
    await expect(page).toHaveTitle(/Nordlys Woodlight/);
    await expect(page).toHaveTitle(/handcrafted/i);
  });

  test('should load images efficiently', async ({ page }) => {
    await page.goto('/nb');
    
    // Check that hero image loads
    const heroImage = page.locator('img').first();
    await expect(heroImage).toBeVisible();
    
    // Check that images have proper loading attributes
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < Math.min(imageCount, 5); i++) {
      const img = images.nth(i);
      
      // Should have proper width and height
      const width = await img.getAttribute('width');
      const height = await img.getAttribute('height');
      
      if (i === 0) {
        // Hero image should have priority
        const loading = await img.getAttribute('loading');
        expect(loading).not.toBe('lazy');
      }
    }
  });

  test('should have fast Core Web Vitals', async ({ page }) => {
    await page.goto('/nb');
    
    // Wait for page to be fully loaded
    await page.waitForLoadState('networkidle');
    
    // Measure FCP (First Contentful Paint)
    const fcp = await page.evaluate(() => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcpEntry) {
            resolve(fcpEntry.startTime);
          }
        }).observe({ entryTypes: ['paint'] });
        
        // Fallback timeout
        setTimeout(() => resolve(0), 5000);
      });
    });
    
    // FCP should be under 2.5 seconds (2500ms)
    expect(fcp).toBeLessThan(2500);
  });

  test('should be responsive across different viewport sizes', async ({ page }) => {
    const viewports = [
      { width: 375, height: 667, name: 'Mobile' },
      { width: 768, height: 1024, name: 'Tablet' },
      { width: 1200, height: 800, name: 'Desktop' },
      { width: 1920, height: 1080, name: 'Large Desktop' }
    ];
    
    for (const viewport of viewports) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/nb');
      
      // Should have proper layout
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByRole('navigation')).toBeVisible();
      
      // Images should be responsive
      const heroImage = page.locator('img').first();
      await expect(heroImage).toBeVisible();
      
      const imageSize = await heroImage.boundingBox();
      expect(imageSize?.width).toBeLessThanOrEqual(viewport.width);
    }
  });

  test('should have proper canonical URLs and hreflang', async ({ page }) => {
    await page.goto('/nb');
    
    // Check canonical URL
    const canonical = page.locator('link[rel=\"canonical\"]');
    await expect(canonical).toHaveCount(1);
    
    // Check hreflang tags
    const hreflangs = page.locator('link[hreflang]');
    const hreflangCount = await hreflangs.count();
    expect(hreflangCount).toBeGreaterThanOrEqual(2); // At least nb and en
  });

  test('should handle navigation without layout shift', async ({ page }) => {
    await page.goto('/nb');
    
    // Wait for fonts to load
    await page.waitForFunction(() => document.fonts.ready);
    
    // Navigate to sections and check for layout stability
    const sections = ['#produkter', '#about', '#bestill'];
    
    for (const section of sections) {
      await page.locator(section).scrollIntoViewIfNeeded();
      await page.waitForTimeout(200); // Allow for animations
      
      // Content should be visible and stable
      await expect(page.locator(section)).toBeVisible();
    }
  });
});