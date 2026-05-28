import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('loads without console errors and shows the Hero', async ({ page }) => {
    const errors: string[] = [];
    page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

    await page.goto('/');

    await expect(page.locator('h1')).toContainText('A group of brands');
    await expect(page.locator('h1')).toContainText('legacy');
    await expect(page.getByRole('link', { name: /Enter the Group/i })).toBeVisible();

    expect(errors, `Console errors:\n${errors.join('\n')}`).toEqual([]);
  });

  test('CTA scrolls to #ethos', async ({ page }) => {
    await page.goto('/');
    const ethosY = await page.locator('#ethos').evaluate(el => el.getBoundingClientRect().top + window.scrollY);
    await page.getByRole('link', { name: /Enter the Group/i }).click();
    await page.waitForTimeout(1500);
    const scrollY = await page.evaluate(() => window.scrollY);
    expect(scrollY).toBeGreaterThan(ethosY - 50);
  });

  test('JSON-LD Organization schema is present', async ({ page }) => {
    await page.goto('/');
    const ld = await page.locator('script[type="application/ld+json"]').textContent();
    expect(ld).toBeTruthy();
    const parsed = JSON.parse(ld!);
    expect(parsed['@type']).toBe('Organization');
    expect(parsed.subOrganization).toHaveLength(5);
  });
});
