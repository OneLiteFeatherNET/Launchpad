import { test, expect } from '@playwright/test';

test.describe('Blog', () => {
  test('should load the blog index page correctly', async ({ page }) => {
    // Navigate to the blog index page
    await page.goto('/blog');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Blog - OneLiteFeather.net/);
    
    // Check that the blog header is visible
    const blogHeader = page.locator('h1:has-text("Blog")').first();
    await expect(blogHeader).toBeVisible();
    
    // Check that there are blog posts listed
    const blogPosts = page.locator('article');
    await expect(blogPosts).toHaveCount({ min: 1 });
    
    // Check that each blog post has a title and date
    const firstPost = blogPosts.first();
    await expect(firstPost.locator('h2')).toBeVisible();
    await expect(firstPost.locator('time')).toBeVisible();
  });

  test('should navigate to a blog post and display its content', async ({ page }) => {
    // Navigate to the blog index page
    await page.goto('/blog');
    
    // Click on the first blog post
    const firstPostLink = page.locator('article a').first();
    const postTitle = await firstPostLink.locator('h2').textContent();
    await firstPostLink.click();
    
    // Wait for the blog post page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page title contains the blog post title
    await expect(page).toHaveTitle(new RegExp(postTitle || ''));
    
    // Check that the blog post content is visible
    const postContent = page.locator('article');
    await expect(postContent).toBeVisible();
    
    // Check that the blog post has a title that matches the one we clicked
    const postTitleOnPage = page.locator('h1').first();
    await expect(postTitleOnPage).toHaveText(new RegExp(postTitle || ''));
    
    // Check that the blog post has a publication date
    const pubDate = page.locator('time');
    await expect(pubDate).toBeVisible();
    
    // Check that the blog post has content
    const contentRenderer = page.locator('.ContentRenderer');
    await expect(contentRenderer).toBeVisible();
    
    // Check that social media sharing buttons are visible
    const socialMediaShare = page.locator('div:has-text("SocialMediaShare")');
    await expect(socialMediaShare).toBeVisible();
  });

  test('should filter blog posts by category if categories exist', async ({ page }) => {
    // Navigate to the blog index page
    await page.goto('/blog');
    
    // Check if there are category filters
    const categoryFilters = page.locator('.category-filter');
    
    if (await categoryFilters.count() > 0) {
      // Click on the first category filter
      const firstCategory = categoryFilters.first();
      const categoryName = await firstCategory.textContent();
      await firstCategory.click();
      
      // Wait for the filtered results
      await page.waitForLoadState('networkidle');
      
      // Check that the URL contains the category parameter
      await expect(page).toHaveURL(new RegExp(`category=${categoryName?.trim().toLowerCase()}`));
      
      // Check that the filtered blog posts are displayed
      const blogPosts = page.locator('article');
      await expect(blogPosts).toHaveCount({ min: 1 });
    }
  });

  test('should have working language switcher on blog posts', async ({ page }) => {
    // Navigate to the blog index page
    await page.goto('/blog');
    
    // Click on the first blog post
    const firstPostLink = page.locator('article a').first();
    await firstPostLink.click();
    
    // Wait for the blog post page to load
    await page.waitForLoadState('networkidle');
    
    // Find the language switcher
    const languageSwitcher = page.locator('[aria-label="Language Switcher"]').first();
    await expect(languageSwitcher).toBeVisible();
    
    // Click the language switcher
    await languageSwitcher.click();
    
    // Find and click the English option (assuming default is German)
    const englishOption = page.getByRole('link', { name: /english/i });
    if (await englishOption.isVisible()) {
      // Get the current URL to check if there's a translation
      const currentUrl = page.url();
      
      await englishOption.click();
      await page.waitForLoadState('networkidle');
      
      // Check if we're on a different URL (translation exists)
      const newUrl = page.url();
      if (currentUrl !== newUrl) {
        // If translation exists, check that we're on the English version
        await expect(page).toHaveURL(/\/en\//);
      }
    } else {
      // If English is already selected, find and click the German option
      const germanOption = page.getByRole('link', { name: /deutsch/i });
      if (await germanOption.isVisible()) {
        // Get the current URL to check if there's a translation
        const currentUrl = page.url();
        
        await germanOption.click();
        await page.waitForLoadState('networkidle');
        
        // Check if we're on a different URL (translation exists)
        const newUrl = page.url();
        if (currentUrl !== newUrl) {
          // If translation exists, check that we're on the German version
          await expect(page).toHaveURL(/\/de\/|^\//);
        }
      }
    }
  });
});