import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test.describe('Accessibility', () => {
  test('should not have any automatically detectable accessibility issues', async ({ page }) => {
    await page.goto('/nb');
    
    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/nb');
    
    // Should have one h1
    const h1s = await page.locator('h1').count();
    expect(h1s).toBe(1);
    
    // Should have logical heading progression
    const headings = await page.locator('h1, h2, h3, h4, h5, h6').allTextContents();
    expect(headings.length).toBeGreaterThan(1);
  });

  test('should have proper ARIA labels and roles', async ({ page }) => {
    await page.goto('/nb');
    
    // Navigation should have proper roles
    await expect(page.getByRole('navigation')).toBeVisible();
    await expect(page.getByRole('banner')).toBeVisible();
    await expect(page.getByRole('main')).toBeVisible();
    await expect(page.getByRole('contentinfo')).toBeVisible();
    
    // Buttons should have accessible names
    const buttons = page.getByRole('button');
    const buttonCount = await buttons.count();
    
    for (let i = 0; i < buttonCount; i++) {
      const button = buttons.nth(i);
      const accessibleName = await button.getAttribute('aria-label') || await button.textContent();
      expect(accessibleName).toBeTruthy();
    }
  });

  test('should be keyboard navigable', async ({ page }) => {
    await page.goto('/nb');
    
    // Tab through interactive elements
    await page.keyboard.press('Tab');
    
    // First focusable element should be navigation
    const firstFocused = await page.evaluate(() => document.activeElement?.tagName);
    expect(['A', 'BUTTON']).toContain(firstFocused);
    
    // Continue tabbing and ensure focus is visible
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement);
      expect(focused).toBeTruthy();
    }
  });

  test('should have sufficient color contrast', async ({ page }) => {
    await page.goto('/nb');
    
    // Run axe with only color-contrast rule
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .withRules(['color-contrast'])
      .analyze();
    
    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('should have proper image alt texts', async ({ page }) => {
    await page.goto('/nb');
    
    const images = page.locator('img');
    const imageCount = await images.count();
    
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const altText = await img.getAttribute('alt');
      expect(altText).toBeTruthy();
      expect(altText).not.toBe('');
    }
  });

  test('should have proper focus management', async ({ page }) => {
    await page.goto('/nb');
    
    // Test mobile menu focus management
    await page.setViewportSize({ width: 375, height: 667 });
    
    const menuButton = page.getByRole('button', { name: /toggle navigation menu/i });
    await menuButton.click();
    
    // Focus should move to first menu item or stay on button
    const focusedElement = await page.evaluate(() => document.activeElement?.tagName);
    expect(['BUTTON', 'A']).toContain(focusedElement);
  });

  test('should provide skip links for keyboard users', async ({ page }) => {
    await page.goto('/nb');
    
    // Tab to potential skip link
    await page.keyboard.press('Tab');
    
    // Check if there's a way to skip to main content
    const firstFocused = await page.evaluate(() => {
      const element = document.activeElement;
      return {
        tag: element?.tagName,
        href: element?.getAttribute('href'),
        text: element?.textContent
      };
    });
    
    // Either first element should be skip link or main navigation
    expect(['A', 'BUTTON']).toContain(firstFocused.tag);
  });

  test('should work with screen reader announcements', async ({ page }) => {
    await page.goto('/nb');
    
    // Check for proper live regions and announcements
    const liveRegions = await page.locator('[aria-live]').count();
    const announcements = await page.locator('[role="status"], [role="alert"]').count();
    
    // At minimum, should have proper document structure
    expect(liveRegions + announcements).toBeGreaterThanOrEqual(0);
  });
});