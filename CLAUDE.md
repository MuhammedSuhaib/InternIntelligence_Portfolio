# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. It showcases the developer's skills, projects, and expertise in React, Next.js, TypeScript, and Python. The portfolio features animated cursor interactions, smooth page transitions, and modern responsive design.

## Tech Stack

- Next.js (App Router) version 14.2.15
- TypeScript
- Tailwind CSS with shadcn/ui components
- Lucide React for icons
- Formspree for contact form handling
- SweetAlert2 for form submission alerts
- Motion library for animations
- Cursify for cursor animations

## Architecture

### Directory Structure
- `/app` - Contains Next.js App Router pages and layouts
- `/components` - Reusable React components including UI components
- `/public` - Static assets like images and favicons
- `/types` - TypeScript type definitions
- `/utils` - Utility functions

### Key Components
- Layout in `app/layout.tsx` includes header and bubble cursor effect
- Main page in `app/page.tsx` orchestrates the home screen components
- Components include Hero, Projects, Technologies, Header, and custom UI elements
- BubbleCursor provides the animated cursor effect

## Development Commands

```bash
# Install dependencies
pnpm install

# Run development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint
```

## Key Features

- Animated cursor interactions using BubbleCursor component
- Responsive design with Tailwind CSS
- Contact form with Formspree integration
- Project showcase section
- Technology stack visualization
- Social media links integration

## Environment Considerations

- Uses Next.js App Router with TypeScript
- Implements SEO best practices with proper metadata
- Has Google Site Verification
- Deployed on Netlify
- Uses Google Fonts and local fonts