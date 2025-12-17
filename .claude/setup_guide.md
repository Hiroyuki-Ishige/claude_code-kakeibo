# Money Tracker - Setup Guide

This guide will walk you through setting up Supabase and Clerk for the Money Tracker application.

---

## Part 1: Supabase Setup (Database)

### Step 1: Create a Supabase Account

1. Go to [https://supabase.com](https://supabase.com)
2. Click **"Start your project"** or **"Sign In"**
3. Sign up with:
   - GitHub (recommended)
   - Google
   - Or email

### Step 2: Create a New Project

1. Once logged in, click **"New Project"**
2. Fill in the project details:
   - **Name**: `money-tracker` (or any name you prefer)
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose the closest region to your users
     - For Japan: `Northeast Asia (Tokyo)`
     - For US: `West US (North California)` or `East US (North Virginia)`
   - **Pricing Plan**: Select **Free** tier for development

3. Click **"Create new project"**
4. Wait 2-3 minutes for the project to initialize

### Step 3: Get Your Supabase API Keys

1. In your project dashboard, click the **"Settings"** icon (gear icon) in the left sidebar
2. Go to **"API"** section
3. You'll see the following information:

   **Project URL**
   ```
   https://xxxxxxxxxxxxx.supabase.co
   ```
   → Copy this to `NEXT_PUBLIC_SUPABASE_URL` in your `.env.local`

   **API Keys** section:
   - **anon/public** key (starts with `eyJhbG...`)
     → Copy to `NEXT_PUBLIC_SUPABASE_ANON_KEY`

   - **service_role** key (starts with `eyJhbG...`)
     → Click "Reveal" then copy to `SUPABASE_SERVICE_ROLE_KEY`
     → ⚠️ **IMPORTANT**: Keep this secret! Never commit to git!

### Step 4: Update .env.local with Supabase Keys

Open `/Users/hiroyuki_ishige/Programing/claude_code/kakeibo/.env.local` and replace:

```bash
# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3M...
```

---

## Part 2: Clerk Setup (Authentication)

### Step 1: Create a Clerk Account

1. Go to [https://clerk.com](https://clerk.com)
2. Click **"Start building for free"** or **"Sign In"**
3. Sign up with:
   - GitHub (recommended)
   - Google
   - Or email

### Step 2: Create a New Application

1. Once logged in, you'll see the dashboard
2. Click **"+ Create application"**
3. Fill in the application details:
   - **Application name**: `Money Tracker` (or any name)
   - **How will users sign in?**: Select:
     - ✅ **Email address**
     - ✅ **Google** (optional but recommended)
     - You can add more later
   - Click **"Create application"**

### Step 3: Get Your Clerk API Keys

1. After creation, you'll be taken to the **Quickstart** page
2. Or go to **"API Keys"** in the left sidebar
3. You'll see:

   **Publishable key** (starts with `pk_test_...` or `pk_live_...`)
   ```
   pk_test_xxxxxxxxxxxxx
   ```
   → Copy to `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

   **Secret key** (starts with `sk_test_...` or `sk_live_...`)
   - Click "Copy" button
   ```
   sk_test_xxxxxxxxxxxxx
   ```
   → Copy to `CLERK_SECRET_KEY`
   → ⚠️ **IMPORTANT**: Keep this secret! Never commit to git!

### Step 4: Configure Clerk Settings

1. Go to **"Configure"** → **"Paths"** in the left sidebar
2. Set the following paths (should already be set):
   - **Sign-in page**: `/sign-in`
   - **Sign-up page**: `/sign-up`
   - **After sign-in**: `/dashboard`
   - **After sign-up**: `/dashboard`

3. Go to **"Configure"** → **"Email, Phone, Username"**
4. Ensure **Email address** is set as required

### Step 5: Update .env.local with Clerk Keys

Open `/Users/hiroyuki_ishige/Programing/claude_code/kakeibo/.env.local` and replace:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxx
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
```

---

## Part 3: Configure Clerk Billing (For Premium Features)

⚠️ **Note**: This can be done later in Phase 10. For now, you can skip this and come back to it.

### Step 1: Set Up Billing in Clerk

1. In Clerk dashboard, go to **"Billing"** in the left sidebar (under "Configure")
2. If you don't see "Billing", you may need to:
   - Upgrade your Clerk plan to Pro or higher
   - Or use Clerk's organization features with roles

### Step 2: Alternative - Use Clerk Organizations with Roles

For the free tier, you can use Clerk's organization features:

1. Go to **"Configure"** → **"Organizations"**
2. Enable organizations
3. Add a "premium" role
4. Users with this role will have access to premium features

### Step 3: Alternative - Use Metadata (Simplest for MVP)

For the simplest approach during development:

1. Use Clerk's user metadata to store subscription status
2. We'll implement this in Phase 8 when building premium features

---

## Part 4: Verify Your Setup

### Check 1: Verify .env.local File

Your `.env.local` should now look like this (with actual values):

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_Y2xlcmsuY2xvdWR3b3JrcGxhY2UuZGV2JA
CLERK_SECRET_KEY=sk_test_bG9jYWxob3N0OjMwMDAkJDQ5ZjM
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase Database
NEXT_PUBLIC_SUPABASE_URL=https://abcdefghijk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDAwMDAwMDAsImV4cCI6MjAxNTU3NjAwMH0.abcdefghijklmnop
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFiY2RlZmdoaWprIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcwMDAwMDAwMCwiZXhwIjoyMDE1NTc2MDAwfQ.abcdefghijklmnop
```

### Check 2: No Placeholder Values

Make sure there are NO values like:
- ❌ `your_clerk_publishable_key_here`
- ❌ `your_supabase_project_url_here`

All values should be actual keys from your dashboards.

### Check 3: File is Not Committed to Git

Run this command to verify `.env.local` is ignored:

```bash
git status
```

You should NOT see `.env.local` in the list. If you do:
1. Make sure `.gitignore` contains `.env*`
2. If it was already committed, remove it from git:
   ```bash
   git rm --cached .env.local
   ```

---

## Troubleshooting

### Supabase Issues

**"Can't find my API keys"**
- Make sure you're in the correct project
- Go to Settings (gear icon) → API
- Scroll down to find Project URL and API Keys

**"Service role key is hidden"**
- Click the "Reveal" or "Copy" button next to it
- You may need to re-authenticate

### Clerk Issues

**"Can't find secret key"**
- Make sure you're viewing the correct environment (Development vs Production)
- The key is on the "API Keys" page
- Click "Copy" to reveal and copy it

**"Application not found"**
- Make sure you created an application (not just an account)
- Click "Create application" if you haven't

---

## Next Steps

Once you've completed this setup:

1. ✅ Verify all environment variables in `.env.local` are filled
2. ✅ Test that the values are correct (we'll do this in Phase 3)
3. ✅ Document your credentials in a secure password manager
4. ✅ Ready to proceed to **Phase 2: Database Design & Setup**

---

## Security Reminders

- ⚠️ **NEVER** commit `.env.local` to git
- ⚠️ **NEVER** share your `CLERK_SECRET_KEY` or `SUPABASE_SERVICE_ROLE_KEY`
- ⚠️ Only share the `NEXT_PUBLIC_*` keys if absolutely necessary
- ⚠️ Rotate keys immediately if they are exposed
- ⚠️ Use different keys for development and production

---

## Quick Reference

### Supabase Dashboard URLs
- Main Dashboard: https://supabase.com/dashboard
- Project Settings: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api

### Clerk Dashboard URLs
- Main Dashboard: https://dashboard.clerk.com/
- API Keys: https://dashboard.clerk.com/last-active?path=api-keys
- Configure Paths: https://dashboard.clerk.com/last-active?path=paths

---

**Need help?** If you encounter any issues during setup, let me know and I can help troubleshoot!
