---
name: expert-github-pages
description: Advanced guide for deploying Vite/React applications to GitHub Pages with custom domains and GitHub Actions.
---

# Expert GitHub Pages Deployment

This skill covers the best practices for deploying modern web applications (specifically Vite/React) to GitHub Pages.

## Core Configuration (Vite)

For a root domain (e.g., `kancio.com`) or a `.github.io` user/org page, ensure your `vite.config.ts` has the correct `base` path:

```typescript
export default defineConfig({
  base: '/', // Use '/' for root domains or organization pages
  build: {
    outDir: '../dist', // Ensure this matches your deployment action
    emptyOutDir: true,
  }
})
```

## Public Assets & Directory Structure

- **`src/public`**: By default, Vite uses `src/public` (or `public` in the root if not configured otherwise).
- **Static Files**: Place `CNAME`, `ads.txt`, and `robots.txt` in the `public` directory.
- **Dynamic Content**: If using scripts to generate indices (like blog posts), ensure they write to the `public` directory that Vite is configured to use.

## Custom Domain (CNAME)

To use a custom domain (e.g., `kancio.com`):
1. Create a file named `CNAME` in your `public` directory containing only the domain name.
2. In GitHub Repository Settings > Pages:
   - **Custom Domain**: Enter your domain.
   - **Enforce HTTPS**: Always enable this.

## Deployment via GitHub Actions

Using GitHub Actions is preferred over the `gh-pages` branch for more control and cleaner history.

### Workflow Configuration (`.github/workflows/deploy.yml`)

1. **Permissions**: Ensure `pages: write` and `id-token: write`.
2. **Branch**: Set the `push` trigger to your primary branch (usually `master` or `main`).
3. **Action**: Use `actions/setup-node@v4` for Node.js setup.
4. **Environment**: Set the environment to `github-pages`.

### GitHub Settings

> [!IMPORTANT]
> In your repository settings under **Pages**, you MUST set the **Source** under **Build and deployment** to **GitHub Actions**. If it is set to "Deploy from a branch", your custom action will run but will not actually update the site.

## Troubleshooting

- **404 on Refresh**: Ensure you have a `404.html` in your public folder that redirects or handles the routing for Single Page Applications (SPA).
- **Assets not loading**: Check the `base` configuration in `vite.config.ts`.
- **Action Fails on Build**: Ensure all environment variables (Secrets) are correctly added to GitHub Repository Settings > Secrets and variables > Actions.
