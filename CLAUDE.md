# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains a Next.js project located in the `kakeibo/` subdirectory. The project uses:

- Next.js 16.0.10 (App Router)
- React 19.2.1
- TypeScript 5
- Tailwind CSS 4
- ESLint 9

## Project Structure

The main application code is in `kakeibo/`:

- `app/` - Next.js App Router pages and layouts
- TypeScript path alias `@/*` maps to the project root

## Development Commands

All commands should be run from the `kakeibo/` directory:

```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build production bundle
npm start        # Start production server
npm run lint     # Run ESLint
```

## Design System

**IMPORTANT**: All UI components and styling MUST follow the design system defined in `kakeibo/.claude/design_system.md`.

Key requirements:

- Use Tailwind CSS utility classes only (no custom CSS)
- Follow WCAG accessibility standards (minimum 4.5:1 contrast ratio)
- Use the defined color palette (blue-500, gray-900, etc.)
- Apply proper spacing (8px base system)
- Ensure minimum 44px touch targets for interactive elements
- Add shadows to all interactive elements
- Use font-semibold or higher for button text
- Reference the design system file for detailed specifications on:
  - Color system and contrast requirements
  - Typography and font weights
  - Component patterns (buttons, cards, forms, etc.)
  - Spacing, borders, and shadows
  - Interaction states (hover, focus, active)
  - Responsive design breakpoints

## Tailwind CSS Setup

**IMPORTANT**: For Tailwind CSS v4 configuration, setup, and troubleshooting, refer to the comprehensive guide in `kakeibo/.claude/tailwind_document.md`.

**Critical Requirements**:

- **DO NOT** create `tailwind.config.js/ts` (v4 uses zero-configuration)
- **USE** `@import "tailwindcss"` in CSS files (NOT `@tailwind` directives)
- Use default Tailwind utility classes - avoid custom CSS definitions
- Configure PostCSS with `@tailwindcss/postcss` plugin only

Key topics covered in the Tailwind guide:

- Zero-configuration setup for v4
- Migration from v3 to v4 (breaking changes)
- PostCSS configuration
- Shadcn UI integration with v4
- Custom theming with `@theme inline` directive
- Common troubleshooting issues

## Supabase Database

**IMPORTANT**: For all Supabase-related tasks, including database setup, migrations, CRUD operations, RLS policies, and authentication integration, refer to the comprehensive guide in `kakeibo/.claude/spabase_document.md`.

**Development Environment**: This project uses **方法 1 (Method 1): クラウドベース (Cloud-based)** approach. Do NOT use Docker Desktop or local Supabase setup.

Key topics covered in the Supabase guide:

- Development environment setup (cloud-based and local Docker)
- Database design and migrations
- Supabase client implementation
- CRUD operations
- Row Level Security (RLS)
- Real-time features
- File storage
- Production deployment
- Troubleshooting

## Authentication, Subscription & Payment

**IMPORTANT**: For all authentication, subscription, and payment-related tasks, refer to the comprehensive guide in `kakeibo/.claude/clerk_document.md`.

Key topics covered in the Clerk guide:

- Authentication implementation with Clerk
- User management and profiles
- Subscription plans and pricing
- Payment processing integration
- Protected routes and middleware
- Webhook handling
- Role-based access control

## Clerk & Supabase Integration

**IMPORTANT**: For tasks involving both Clerk authentication and Supabase database access, especially Row Level Security (RLS) implementation, refer to the comprehensive integration guide in `kakeibo/.claude/clerk_superbase_integration_document.md`.

**Recommended Approach**: Use **Service Role Key with Server-Side Filtering** for most reliable implementation across all environments.

Key topics covered in the integration guide:

- RLS integration strategies (Custom Header vs JWT vs Service Role)
- Environment-specific implementations (Cloud-based vs Docker CLI)
- User ID format handling (Clerk String vs Supabase UUID)
- Security best practices for API Routes
- Troubleshooting common RLS issues
- Production deployment checklist

## Configuration

- `tsconfig.json` - TypeScript configuration with strict mode enabled, target ES2017
- `next.config.ts` - Next.js configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS
