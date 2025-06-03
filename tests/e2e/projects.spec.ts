import { test, expect } from '@playwright/test';

test.describe('Projects', () => {
  test('should load the projects index page correctly', async ({ page }) => {
    // Navigate to the projects index page
    await page.goto('/projects');
    
    // Check that the page title is correct
    await expect(page).toHaveTitle(/Projects - OneLiteFeather.net/);
    
    // Check that the projects header is visible
    const projectsHeader = page.locator('h1').first();
    await expect(projectsHeader).toBeVisible();
    
    // Check that there are projects listed
    const projects = page.locator('.grid > div');
    await expect(projects).toHaveCount({ min: 1 });
    
    // Check that each project has a name
    const firstProject = projects.first();
    await expect(firstProject.locator('h3')).toBeVisible();
  });

  test('should navigate to a project and display its details', async ({ page }) => {
    // Navigate to the projects index page
    await page.goto('/projects');
    
    // Click on the first project
    const firstProjectLink = page.locator('.grid > div a').first();
    const projectName = await firstProjectLink.locator('h3').textContent();
    await firstProjectLink.click();
    
    // Wait for the project page to load
    await page.waitForLoadState('networkidle');
    
    // Check that the page title contains the project name
    await expect(page).toHaveTitle(new RegExp(projectName || ''));
    
    // Check that the project content is visible
    const projectContent = page.locator('article, .project-content');
    await expect(projectContent).toBeVisible();
    
    // Check that the project has a title that matches the one we clicked
    const projectTitleOnPage = page.locator('h1').first();
    await expect(projectTitleOnPage).toHaveText(new RegExp(projectName || ''));
    
    // Check for project details
    // Description
    const description = page.locator('p.description, .project-description');
    await expect(description).toBeVisible();
    
    // Check for GitHub link if it exists
    const githubLink = page.locator('a[href*="github.com"]');
    if (await githubLink.count() > 0) {
      await expect(githubLink).toBeVisible();
    }
    
    // Check for project status
    const status = page.locator('.status, .project-status');
    if (await status.count() > 0) {
      await expect(status).toBeVisible();
    }
  });

  test('should display project authors if they exist', async ({ page }) => {
    // Navigate to the projects index page
    await page.goto('/projects');
    
    // Click on the first project
    const firstProjectLink = page.locator('.grid > div a').first();
    await firstProjectLink.click();
    
    // Wait for the project page to load
    await page.waitForLoadState('networkidle');
    
    // Check for project authors
    const authors = page.locator('.authors, .project-authors, .team-members');
    if (await authors.count() > 0) {
      await expect(authors).toBeVisible();
      
      // Check that at least one author is displayed
      const authorItems = authors.locator('li, .author-item, .team-member');
      if (await authorItems.count() > 0) {
        await expect(authorItems.first()).toBeVisible();
      }
    }
  });

  test('should have working language switcher on projects', async ({ page }) => {
    // Navigate to the projects index page
    await page.goto('/projects');
    
    // Find the language switcher
    const languageSwitcher = page.locator('[aria-label="Language Switcher"]').first();
    await expect(languageSwitcher).toBeVisible();
    
    // Click the language switcher
    await languageSwitcher.click();
    
    // Find and click the English option (assuming default is German)
    const englishOption = page.getByRole('link', { name: /english/i });
    if (await englishOption.isVisible()) {
      await englishOption.click();
      await page.waitForLoadState('networkidle');
      
      // Check that we're on the English version
      await expect(page).toHaveURL(/\/en\/projects/);
      
      // Check that the content is in English
      const projectsHeader = page.locator('h1').first();
      await expect(projectsHeader).not.toHaveText(/Projekte/);
    } else {
      // If English is already selected, find and click the German option
      const germanOption = page.getByRole('link', { name: /deutsch/i });
      await germanOption.click();
      await page.waitForLoadState('networkidle');
      
      // Check that we're on the German version
      await expect(page).toHaveURL(/\/de\/projects|\/projects/);
    }
  });
});