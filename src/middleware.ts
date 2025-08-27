import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublic = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/onboarding(.*)',
  '/api(.*)',
  '/_next(.*)'
])

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // If user is signed in and tries to access the landing page, redirect to dashboard
  if (userId && req.nextUrl.pathname === '/') {
    const url = new URL('/dashboard', req.url)
    return Response.redirect(url)
  }

  // If user is not signed in and tries to access protected routes, Clerk will handle it
  // We also allow public routes above
  if (isPublic(req)) {
    return;
  }
})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}
