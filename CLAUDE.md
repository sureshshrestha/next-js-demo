# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.2 application created with `create-next-app` using:
- TypeScript for type safety
- Tailwind CSS v4 for styling
- ESLint for code quality
- App Router (Next.js 13+) architecture
- Turbopack for faster builds and development

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with Turbopack
npm run dev

# Build for production with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint

# Type checking
npx tsc --noEmit
```

## Project Structure

```
src/
  app/                 # App Router pages and layouts
    globals.css        # Global styles with Tailwind imports
    layout.tsx         # Root layout component
    page.tsx          # Home page component
    favicon.ico       # App favicon
public/              # Static assets (SVG icons)
```

## Key Technologies

- **React 19.1.0** - Latest React with concurrent features
- **Next.js 15.5.2** - App Router, Server Components, optimizations
- **TypeScript 5** - Type safety and better DX
- **Tailwind CSS v4** - Utility-first styling with PostCSS
- **ESLint** - Code linting with Next.js configuration

## Development Notes

- Uses `src/` directory structure for better organization
- Import alias `@/*` configured for cleaner imports from src/
- Turbopack enabled for faster development and builds
- Default page includes example Tailwind styling and Next.js patterns
- All components use TypeScript with proper typing