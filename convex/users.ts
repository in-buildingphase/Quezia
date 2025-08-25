import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

/**
 * Create a new user in the database
 * This mutation is idempotent - if a user with the same clerkId already exists,
 * it will not create a duplicate entry
 */
export const createUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    grade: v.string(),
    dob: v.string(),
    phone: v.string(),
  },
  handler: async (ctx, args) => {
    // Check if user already exists with this clerkId
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      // User already exists, return the existing user ID
      console.log(`User with clerkId ${args.clerkId} already exists`);
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      ...args,
      onboarded: false,
      createdAt: Date.now(),
    });

    console.log(`Created new user with ID: ${userId}`);
    return userId;
  },
});

/**
 * Get user by Clerk ID
 */
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

export const updateOnboarding = mutation({
  args: {
    clerkId: v.string(),
    country: v.string(),
    examPreference: v.union(
      v.literal("JEE"),
      v.literal("SAT"),
      v.literal("CUET")
    ),
    ageGroup: v.union(
      v.literal("Under 13"),
      v.literal("13–15"),
      v.literal("16–18"),
      v.literal("19–22"),
      v.literal("23+")
    ),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();
    if (!user) throw new Error("User not found");
    await ctx.db.patch(user._id, {
      country: args.country,
      examPreference: args.examPreference,
      ageGroup: args.ageGroup,
      onboarded: true,
    });
    return user._id;
  },
});

/**
 * Get user by email
 */
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

/**
 * Get user by username
 */
export const getUserByUsername = query({
  args: { username: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", args.username))
      .first();
  },
});
