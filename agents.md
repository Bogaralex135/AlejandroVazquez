# Agents.md - Alejandro Vázquez Portfolio

This file provides guidance for AI agents working on this Next.js portfolio project.

## Project Overview

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Package Manager**: npm
- **Internationalization**: Built-in Next.js i18n with `[locale]` routing

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run typecheck
```

## Project Structure

```
src/
├── app/
│   ├── [locale]/          # Internationalized routes
│   │   ├── layout.tsx     # Root layout with locale providers
│   │   └── page.tsx       # Home page
│   ├── globals.css        # Global styles + Tailwind imports
│   ├── icon.svg           # Favicon
│   ├── sitemap.ts         # Sitemap generation
│   └── robots.ts          # Robots.txt generation
├── components/
│   ├── navigation.tsx     # Navigation component
│   ├── portfolio-image.tsx # Portfolio project images
│   ├── truckflow-card.tsx # TruckFlow project card
│   ├── whatsapp-link.tsx  # WhatsApp contact link
│   └── icon.tsx           # Icon components
├── lib/
│   ├── assets.ts          # Asset utilities
│   └── content.ts         # Content/data management
public/
├── images/                # Static images
└── ...
```

## Key Guidelines for AI Agents

### 1. Code Style
- Use TypeScript with strict type checking
- Follow Next.js 16 App Router conventions
- Use Server Components by default, Client Components only when needed
- Use Tailwind CSS v4 syntax (CSS-first configuration)

### 2. Internationalization
- All user-facing text should be in `src/lib/content.ts` or locale-specific files
- Use the `[locale]` route segment for all pages
- Support locales: `es` (Spanish), `en` (English)

### 3. Components
- Prefer composition over inheritance
- Use `class-variance-authority` or Tailwind for variant styling
- Keep components small and focused
- Use proper accessibility attributes (ARIA labels, semantic HTML)

### 4. Styling
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Use CSS variables for theming (defined in `globals.css`)
- Avoid custom CSS when Tailwind utilities suffice

### 5. Performance
- Use Next.js Image component for images
- Leverage static generation where possible
- Minimize client-side JavaScript
- Use proper caching headers

### 6. Testing
- No test framework currently configured
- Manual testing via `npm run dev`
- Playwright screenshots in `output/playwright/` for visual regression

## Common Tasks

### Adding a New Portfolio Project
1. Add images to `public/images/`
2. Update `src/lib/content.ts` with project data
3. Create/update component in `src/components/` if needed
4. Update locale content files

### Modifying Navigation
1. Edit `src/components/navigation.tsx`
2. Update locale-specific labels in content files

### Changing Styles
1. Modify `src/app/globals.css` for global styles
2. Use Tailwind classes in components
3. Check `postcss.config.mjs` for PostCSS plugins

## Context7 Usage

When working with libraries (Next.js, React, Tailwind, etc.), use Context7 MCP to fetch current documentation:

1. `resolve-library-id` with library name
2. `query-docs` with specific question

Example:
```
resolve-library-id: "Next.js", "app router data fetching"
query-docs: "/vercel/next.js", "How to fetch data in Server Components with Next.js 16"
```

## Environment

- Node.js 22+
- npm 10+
- Windows (PowerShell preferred)

## Git

This project is not currently a git repository. Initialize with `git init` if needed.