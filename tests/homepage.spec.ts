import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should redirect to Norwegian locale by default', async ({ page }) => {
    await expect(page).toHaveURL(/.*\/nb$/);
  });

  test('should display the main hero section', async ({ page }) => {
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    await expect(page.getByRole('img').first()).toBeVisible();
  });

  test('should have working navigation', async ({ page }) => {
    // Test navigation brand link
    const brandLink = page.getByRole('link', { name: /nordlys/i });
    await expect(brandLink).toBeVisible();

    // Test navigation menu items
    await expect(page.getByRole('link', { name: 'Hjem' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Produkter' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Om oss' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kontakt' })).toBeVisible();
  });

  test('should display all main sections', async ({ page }) => {
    // Hero section
    await expect(page.locator('#home')).toBeVisible();
    
    // Products section
    await expect(page.locator('#produkter')).toBeVisible();
    
    // About section
    await expect(page.locator('#about')).toBeVisible();
    
    // Contact/CTA section
    await expect(page.locator('#bestill')).toBeVisible();
    
    // Footer
    await expect(page.locator('#contact')).toBeVisible();
  });

  test('should have working CTA buttons', async ({ page }) => {
    const primaryCTA = page.getByRole('link', { name: /bestill nå/i });
    const secondaryCTA = page.getByRole('link', { name: /se kolleksjonen/i });
    
    await expect(primaryCTA).toBeVisible();
    await expect(secondaryCTA).toBeVisible();
    
    // Test that CTAs have proper href attributes
    await expect(primaryCTA).toHaveAttribute('href', '#bestill');
    await expect(secondaryCTA).toHaveAttribute('href', '#produkter');
  });

  test('should display product grid', async ({ page }) => {
    await page.locator('#produkter').scrollIntoViewIfNeeded();
    
    // Should have at least 3 product cards
    const productCards = page.locator('[data-testid="product-card"], article').filter({ 
      has: page.locator('h3') 
    });
    
    await expect(productCards.first()).toBeVisible();
  });

  test('should have responsive design', async ({ page }) => {
    // Test desktop view
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('button', { name: /toggle navigation menu/i })).toBeHidden();
    
    // Test mobile view
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('button', { name: /toggle navigation menu/i })).toBeVisible();
  });

  test('should have working mobile menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.getByRole('button', { name: /toggle navigation menu/i });
    await menuButton.click();
    
    // Mobile menu should be visible
    await expect(page.locator('.md\\:hidden').filter({ has: page.getByText('Hjem') })).toBeVisible();
  });
});