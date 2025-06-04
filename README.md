# OneLiteFeather Blog

A multilingual blog platform built with Nuxt 3, featuring content in both German and English.

## Project Overview

This project serves as the official blog for OneLiteFeather.net, providing articles and information in multiple languages. It's built with modern web technologies to ensure fast loading times, SEO optimization, and a great user experience.

## Features

- Multilingual content (German and English)
- Responsive design with Tailwind CSS
- SEO optimized with meta tags, sitemap, and robots.txt
- Content management using Nuxt Content
- Social media preview images
- Structured data for better search engine visibility
- Project showcase with GitHub integration
- Team member profiles with Minecraft avatar support
- Cross-referencing between blog posts, projects, and team members
- BStats integration for Minecraft plugins

## Roadmap

This project is intended to become the normal/official site for OneLiteFeather.net. Future plans include:

- Expanding content categories
- Enhancing user experience
- Improving performance metrics
- Adding more interactive elements
- Integrating with other OneLiteFeather services

## Technologies Used

- [Nuxt 3](https://nuxt.com/) - Vue.js framework
- [Nuxt Content](https://content.nuxtjs.org/) - Content management
- [Nuxt i18n](https://i18n.nuxtjs.org/) - Internationalization
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Nuxt SEO](https://nuxtseo.com/) - SEO optimization

## Project Structure

- `content/` - Blog posts and other content (organized by language)
- `components/` - Vue components
- `layouts/` - Page layouts
- `pages/` - Application pages
- `public/` - Static assets
- `i18n/` - Internationalization configuration
- `docs/` - Project documentation

## Documentation

The project includes comprehensive documentation to help developers understand and contribute to the codebase:

- [Component Design Guide](docs/component-design-guide.md) - Guidelines for creating and maintaining components
- [Accessibility Guide](docs/accessibility-guide.md) - Best practices for ensuring the site is accessible to all users
- [Canonical URLs Guide](docs/canonical-urls.md) - How to handle multilingual content and canonical URLs

## Setup

Make sure to install dependencies:

```bash
# Using pnpm (recommended)
pnpm install

# Using npm
npm install

# Using yarn
yarn install

# Using bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# Using pnpm (recommended)
pnpm dev

# Using npm
npm run dev

# Using yarn
yarn dev

# Using bun
bun run dev
```

## Production

Build the application for production:

```bash
# Using pnpm (recommended)
pnpm build

# Using npm
npm run build

# Using yarn
yarn build

# Using bun
bun run build
```

Locally preview production build:

```bash
# Using pnpm (recommended)
pnpm preview

# Using npm
npm run preview

# Using yarn
yarn preview

# Using bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

## Testing

### End-to-End Testing

This project uses Playwright for end-to-end testing. The tests are located in the `tests/e2e` directory and cover the main user flows:

- Homepage navigation
- Blog post viewing
- Projects page navigation
- Team member viewing

To run the tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run all tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests in debug mode
pnpm test:debug

# Show test report after running tests
pnpm test:report
```

The tests are configured to run against a local development server, which will be automatically started when the tests run.

### Browser Compatibility

This project is also tested with BrowserStack for cross-browser compatibility.

## Troubleshooting

### Sharp Module Installation Issues

If you encounter errors related to the sharp module not self-registering, such as:

```
[500] [IPX_ERROR] 
Something went wrong installing the "sharp" module
Module did not self-register: '.../sharp/build/Release/sharp-darwin-x64.node'.
```

Try one of these solutions:

1. **Run the provided install:sharp script**:
   ```bash
   pnpm run install:sharp
   ```
   This script installs sharp with platform-specific options for macOS.

2. **Install manually with platform-specific options**:
   ```bash
   # For macOS (darwin-x64)
   pnpm install --platform=darwin --arch=x64 sharp

   # For other platforms, adjust accordingly
   # pnpm install --platform=<platform> --arch=<architecture> sharp
   ```

3. **Install with verbose logging to diagnose issues**:
   ```bash
   pnpm install --ignore-scripts=false --foreground-scripts --verbose sharp
   ```

4. **Check the sharp documentation** for more troubleshooting tips:
   [Sharp Installation Guide](https://sharp.pixelplumbing.com/install)
