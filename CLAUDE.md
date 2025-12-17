# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This repository contains **Money Tracker** (家計簿アプリ), a minimalist expense tracking application with the concept: **"3つの機能だけ。続けられる家計簿"** (Only 3 features. An expense tracker you can stick with).

### Application Concept

A simple expense tracking app focused on three core features:
1. **Expense Recording** - Quick input with amount, category, and date
2. **Category Classification** - 9 fixed categories (no customization)
3. **Dashboard** - Free tier shows totals, Premium tier includes detailed analytics with charts

### Target Users

- People who have failed with complex expense tracking apps
- Users who want simple expense recording
- Individuals aged 20s-40s

### Tech Stack

- Next.js 16.0.10 (App Router)
- React 19.2.1
- TypeScript 5
- Tailwind CSS 4
- ESLint 9
- Supabase (PostgreSQL database)
- Clerk (authentication + billing)
- Recharts (premium charts)
- react-hook-form (forms)
- date-fns (date handling)
- lucide-react (icons)

## Project Structure

The main application code is in `kakeibo/`:

```
app/
├── (auth)/              # Authentication pages
│   ├── sign-in/[[...sign-in]]/page.tsx
│   └── sign-up/[[...sign-up]]/page.tsx
├── (public)/            # Public pages
│   ├── page.tsx         # Landing page
│   └── pricing/page.tsx # Pricing page with Clerk PricingTable
├── dashboard/           # Protected dashboard
│   └── page.tsx
├── api/                 # API routes
│   ├── expenses/
│   │   ├── route.ts     # GET (list), POST (create)
│   │   └── [id]/route.ts # PATCH (update), DELETE
│   └── analytics/       # Premium features
│       ├── summary/route.ts
│       └── chart-data/route.ts
├── layout.tsx
└── globals.css

components/
├── ui/                  # Shadcn UI components
├── expenses/            # Expense-related components
│   ├── expense-form.tsx
│   ├── expense-list.tsx
│   └── expense-item.tsx
├── analytics/           # Premium analytics components
│   ├── period-selector.tsx
│   ├── summary-cards.tsx
│   └── charts/
├── layout/              # Layout components
│   ├── header.tsx
│   └── footer.tsx
└── premium/
    └── premium-gate.tsx # Premium access control

lib/
├── supabase.ts          # Supabase client utilities
├── utils.ts             # General utilities
├── constants.ts         # Fixed categories & constants
└── types.ts             # TypeScript type definitions
```

TypeScript path alias `@/*` maps to the project root

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

## Application Features

### Free Tier
- Unlimited expense recording
- Weekly and monthly total display
- Expense history viewing and editing
- Fixed 9 categories (cannot be customized)

### Premium Tier ($10/month)
- All free tier features
- Advanced analytics dashboard
- Period switching (daily/weekly/monthly)
- Historical comparison (today vs yesterday, this week vs last week, etc.)
- Category-wise detailed graphs (pie chart, bar chart)
- Spending trend visualization
- Premium UI with animations and gradients

### Fixed Categories (Non-customizable)

The app uses exactly 9 fixed expense categories:

1. 食費 (Food)
2. 日用品 (Daily necessities)
3. 交通費 (Transportation)
4. 娯楽 (Entertainment)
5. 衣服・美容 (Clothing & Beauty)
6. 医療・健康 (Medical & Health)
7. 住居費 (Housing)
8. 通信費 (Communication)
9. その他 (Others)

**IMPORTANT**: These categories are fixed and cannot be added, removed, or modified by users. Always use this exact list.

## Database Schema

### expenses table

```sql
CREATE TABLE expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,              -- Clerk user ID (string format)
  amount NUMERIC NOT NULL,             -- Expense amount
  category TEXT NOT NULL,              -- One of the 9 fixed categories
  date DATE NOT NULL,                  -- Date of expense
  note TEXT,                           -- Optional note
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_expenses_user_id ON expenses(user_id);
CREATE INDEX idx_expenses_date ON expenses(date);
CREATE INDEX idx_expenses_category ON expenses(category);

-- RLS policies (Row Level Security)
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Users can only access their own expenses
-- Implementation uses Service Role Key with server-side filtering
```

## Development Workflow

### Important Implementation Rules

**DO**:
- ✅ Use Service Role Key with server-side filtering for RLS (recommended approach)
- ✅ Create user records on first expense entry (not via Clerk webhooks)
- ✅ Use Clerk's `has()` function to check premium subscription status
- ✅ Set premium plan slug as "premium" in Clerk Billing
- ✅ Keep categories fixed - no user customization
- ✅ Use Server Components by default, Client Components only when needed
- ✅ Follow the design system strictly (`.claude/design_system.md`)
- ✅ Keep expense recording under 1 second response time

**DON'T**:
- ❌ Don't use Clerk webhooks for user management
- ❌ Don't allow users to add/modify categories
- ❌ Don't use Docker Desktop for Supabase (use cloud-based approach)
- ❌ Don't write tests (this is an MVP project)
- ❌ Don't create custom CSS (use Tailwind utilities only)
- ❌ Don't use `tailwind.config.js` (Tailwind v4 is zero-config)
- ❌ Don't over-engineer - keep it simple and focused

### Environment Variables

Required environment variables in `.env.local`:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

### Premium Feature Implementation

To check if a user has premium access:

```typescript
import { auth } from '@clerk/nextjs';

// In Server Component or API Route
const { has } = await auth();
const isPremium = has({ permission: 'org:premium' }) || has({ role: 'premium' });

// Or using Clerk's plan checking
const isPremium = await auth().then(({ userId }) =>
  // Check via Clerk's billing API or has() function
);
```

Wrap premium features with access control:
- Show upgrade CTA for free users
- Display analytics and charts only for premium users
- Use `<PremiumGate>` component for conditional rendering

## Development Plan

For a comprehensive development roadmap, see `.claude/development_plan.md`. The plan includes:

- **Phase 1-3**: Setup, database, and core infrastructure
- **Phase 4-7**: Public pages, expense recording, and basic dashboard
- **Phase 8-10**: Premium analytics, UI polish, and billing
- **Phase 11-12**: Testing and deployment

### Using the Development Plan

**IMPORTANT**: When working on tasks, always update the TODO list in `.claude/development_plan.md`:

1. **Mark as WIP**: Change `- [ ]` to `- [WIP]` when you start working on a task
2. **Mark as complete**: Change `- [WIP]` to `- [x]` when the task is finished
3. **Track progress**: This helps maintain clear visibility of what's done, in-progress, and remaining

Example workflow:
```markdown
# Not started
- [ ] Install Clerk SDK for authentication

# Working on it
- [WIP] Install Clerk SDK for authentication

# Completed
- [x] Install Clerk SDK for authentication
```

**Benefits**:
- Clear progress tracking across all phases
- Easy to see what's actively being worked on
- Easy to resume work after breaks
- Provides accountability and transparency

## Configuration

- `tsconfig.json` - TypeScript configuration with strict mode enabled, target ES2017
- `next.config.ts` - Next.js configuration
- `eslint.config.mjs` - ESLint configuration
- `postcss.config.mjs` - PostCSS configuration for Tailwind CSS

## Reference Documentation

- **Requirements**: `.claude/requirment.md` - Complete feature specifications
- **Development Plan**: `.claude/development_plan.md` - Phase-by-phase implementation guide
- **Design System**: `.claude/design_system.md` - UI/UX guidelines
- **Tailwind Guide**: `.claude/tailwind_document.md` - Tailwind CSS v4 setup
- **Supabase Guide**: `.claude/spabase_document.md` - Database operations
- **Clerk Guide**: `.claude/clerk_document.md` - Authentication & billing
- **Integration Guide**: `.claude/clerk_superbase_integration_document.md` - Clerk + Supabase RLS
