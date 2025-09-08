import { test, expect } from '@playwright/test';

test.describe('Internationalization', () => {
  test('should switch between Norwegian and English', async ({ page }) => {
    // Start with Norwegian (default)
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/nb$/);
    
    // Check Norwegian content
    await expect(page.getByRole('heading', { level: 1 })).toContainText('trelamper');
    
    // Switch to English
    const languageSwitcher = page.getByRole('button').filter({ has: page.locator('svg') });
    await languageSwitcher.click();
    
    // Should be on English page
    await expect(page).toHaveURL(/.*\/en/);
    
    // Check English content
    await expect(page.getByRole('heading', { level: 1 })).toContainText('wooden lamps');
  });

  test('should maintain navigation state when switching languages', async ({ page }) => {
    // Go to Norwegian products section
    await page.goto('/nb#produkter');
    
    // Switch language
    const languageSwitcher = page.getByRole('button').filter({ has: page.locator('svg') });
    await languageSwitcher.click();
    
    // Should maintain the section anchor
    await expect(page).toHaveURL(/.*\/en#produkter/);
  });

  test('should have proper language attributes', async ({ page }) => {
    // Test Norwegian
    await page.goto('/nb');
    await expect(page.locator('html')).toHaveAttribute('lang', 'nb');
    
    // Test English
    await page.goto('/en');
    await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  });

  test('should display localized navigation items', async ({ page }) => {
    // Norwegian navigation
    await page.goto('/nb');
    await expect(page.getByRole('link', { name: 'Hjem' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Produkter' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Om oss' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Kontakt' })).toBeVisible();
    
    // English navigation
    await page.goto('/en');
    await expect(page.getByRole('link', { name: 'Home' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Products' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'About' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Contact' })).toBeVisible();
  });

  test('should have localized content in all sections', async ({ page }) => {
    // Test Norwegian content
    await page.goto('/nb');
    
    // Hero section
    await expect(page.getByText(/håndlagde/i)).toBeVisible();
    
    // Product section
    await page.locator('#produkter').scrollIntoViewIfNeeded();
    await expect(page.getByText(/våre lamper/i)).toBeVisible();
    
    // Test English content
    await page.goto('/en');
    
    // Hero section
    await expect(page.getByText(/handcrafted/i)).toBeVisible();
    
    // Product section
    await page.locator('#produkter').scrollIntoViewIfNeeded();
    await expect(page.getByText(/our lamps/i)).toBeVisible();
  });

  test('should handle direct locale URLs correctly', async ({ page }) => {
    // Direct Norwegian URL
    await page.goto('/nb');
    await expect(page).toHaveURL(/.*\/nb$/);
    
    // Direct English URL
    await page.goto('/en');
    await expect(page).toHaveURL(/.*\/en$/);
    
    // Root URL should redirect to Norwegian
    await page.goto('/');
    await expect(page).toHaveURL(/.*\/nb$/);
  });
});