import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load the homepage correctly', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/OneLiteFeather.net/);
    
    // Check that the main components are visible
    // Carousel
    await expect(page.locator('div:has-text("HomeCarousel")').first()).toBeVisible();
    
    // Timeline
    const timeline = page.locator('div:has-text("HomeTimeline")').first();
    await expect(timeline).toBeVisible();
    
    // Activities
    const activities = page.locator('div:has-text("HomeActivities")').first();
    await expect(activities).toBeVisible();
    
    // Featured Projects (if any)
    const featuredProjects = page.locator('div:has-text("HomeFeaturedProjects")');
    if (await featuredProjects.count() > 0) {
      await expect(featuredProjects.first()).toBeVisible();
    }
  });

  test('should have working navigation', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Check that the navigation bar is visible
    const navbar = page.locator('nav').first();
    await expect(navbar).toBeVisible();
    
    // Check that the navigation links are visible
    const blogLink = page.getByRole('link', { name: /blog/i });
    await expect(blogLink).toBeVisible();
    
    const projectsLink = page.getByRole('link', { name: /projects/i });
    await expect(projectsLink).toBeVisible();
    
    const teamLink = page.getByRole('link', { name: /team/i });
    await expect(teamLink).toBeVisible();
    
    // Test navigation to the blog page
    await blogLink.click();
    await page.waitForURL('**/blog');
    await expect(page).toHaveURL(/.*\/blog/);
    
    // Navigate back to homepage
    await page.goto('/');
    
    // Test navigation to the projects page
    await projectsLink.click();
    await page.waitForURL('**/projects');
    await expect(page).toHaveURL(/.*\/projects/);
    
    // Navigate back to homepage
    await page.goto('/');
    
    // Test navigation to the team page
    await teamLink.click();
    await page.waitForURL('**/team');
    await expect(page).toHaveURL(/.*\/team/);
  });

  test('should have working language switcher', async ({ page }) => {
    // Navigate to the homepage
    await page.goto('/');
    
    // Find the language switcher
    const languageSwitcher = page.locator('[aria-label="Language Switcher"]').first();
    await expect(languageSwitcher).toBeVisible();
    
    // Click the language switcher
    await languageSwitcher.click();
    
    // Find and click the English option (assuming default is German)
    const englishOption = page.getByRole('link', { name: /english/i });
    if (await englishOption.isVisible()) {
      await englishOption.click();
      await page.waitForURL('**/en');
      await expect(page).toHaveURL(/.*\/en/);
    } else {
      // If English is already selected, find and click the German option
      const germanOption = page.getByRole('link', { name: /deutsch/i });
      await germanOption.click();
      await page.waitForURL(/^\/$|^\/de/); // Either root or /de
    }
  });
});