# Quezia Authentication Setup Guide

This guide will help you set up Clerk authentication and Convex database integration for your Quezia startup platform.

## Prerequisites

- Node.js 18+ installed
- A Clerk account (https://clerk.com)
- A Convex account (https://convex.dev)

## 1. Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```bash
# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here
CLERK_SECRET_KEY=sk_test_your_clerk_secret_key_here

# Convex Database
NEXT_PUBLIC_CONVEX_URL=https://your-project.convex.cloud

# Optional: Clerk Webhook Secret (for production)
CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
```

## 2. Clerk Setup

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Create a new application
3. Copy your publishable key and secret key
4. In your Clerk dashboard, go to "User & Authentication" → "Email, Phone, Username"
5. Enable email, phone, and username fields
6. Go to "Paths" and set:
   - Sign-in path: `/sign-in`
   - Sign-up path: `/sign-up`
   - After sign-in path: `/dashboard`
   - After sign-up path: `/dashboard`

## 3. Convex Setup

1. Go to [Convex Dashboard](https://dashboard.convex.dev)
2. Create a new project
3. Copy your project URL
4. Run the following commands in your terminal:

```bash
# Install Convex CLI globally
npm install -g convex

# Login to Convex
npx convex auth

# Deploy your schema and functions
npx convex dev
```

## 4. Project Structure

The authentication system includes:

- **`convex/schema.ts`** - Database schema with users table
- **`convex/users.ts`** - User-related database operations
- **`src/app/sign-in/page.tsx`** - Sign-in page
- **`src/app/sign-up/page.tsx`** - Sign-up page
- **`src/app/dashboard/page.tsx`** - Protected dashboard
- **`src/lib/use-user-sync.ts`** - Hook for syncing Clerk users to Convex
- **`src/middleware.ts`** - Route protection middleware

## 5. How It Works

1. **User signs up** through Clerk's `<SignUp />` component
2. **Clerk creates user** in their system
3. **useUserSync hook** detects new user and calls Convex `createUser` mutation
4. **Convex stores user data** with idempotency (no duplicates)
5. **User is redirected** to dashboard
6. **Dashboard displays** both Clerk and Convex user data

## 6. Key Features

- **Idempotent user creation** - Prevents duplicate users
- **Automatic data sync** - Clerk → Convex synchronization
- **Protected routes** - Middleware-based authentication
- **Real-time updates** - Convex provides live data
- **Type safety** - Full TypeScript support

## 7. Testing the Setup

1. Start your development server: `npm run dev`
2. Visit `/sign-up` to create a new account
3. Check the dashboard to see user data synced to Convex
4. Verify the user appears in your Convex dashboard

## 8. Production Deployment

1. Update environment variables with production keys
2. Deploy to your hosting platform (Vercel, Netlify, etc.)
3. Set up Clerk webhooks for production events
4. Configure Convex production environment

## 9. Customization

- **User fields**: Modify the schema in `convex/schema.ts`
- **UI styling**: Update the sign-in/sign-up pages
- **Additional data**: Extend the `createUser` mutation
- **Validation**: Add field validation in Convex functions

## 10. Troubleshooting

### Common Issues:

1. **"Convex client not found"** - Ensure Convex provider is wrapping your app
2. **"Clerk not initialized"** - Check environment variables and provider setup
3. **"User not syncing"** - Check browser console for errors
4. **"Route protected"** - Verify middleware configuration

### Debug Steps:

1. Check browser console for errors
2. Verify environment variables are loaded
3. Check Convex dashboard for function logs
4. Verify Clerk user creation in their dashboard

## Support

If you encounter issues:
1. Check the [Clerk documentation](https://clerk.com/docs)
2. Check the [Convex documentation](https://docs.convex.dev)
3. Review the browser console and Convex function logs
4. Ensure all environment variables are properly set
