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

    // Create new user with default free subscription
    const userId = await ctx.db.insert("users", {
      ...args,
      subscriptionType: "free" as const,
      courseEnrolled: undefined,
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

/**
 * Delete user by Clerk ID
 * This will remove the user from the Convex database
 */
export const deleteUser = mutation({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    // Find the user first
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Delete all user's messages first (cascade delete)
    const userMessages = await ctx.db
      .query("messages")
      .withIndex("by_userId", (q) => q.eq("userId", args.clerkId))
      .collect();

    for (const message of userMessages) {
      await ctx.db.delete(message._id);
    }

    // Delete the user
    await ctx.db.delete(user._id);

    console.log(`Deleted user with clerkId ${args.clerkId} and ${userMessages.length} messages`);
    return { success: true, deletedMessages: userMessages.length };
  },
});

/**
 * Update user profile information
 */
export const updateUser = mutation({
  args: {
    clerkId: v.string(),
    username: v.optional(v.string()),
    grade: v.optional(v.string()),
    dob: v.optional(v.string()),
    phone: v.optional(v.string()),
    subscriptionType: v.optional(v.union(v.literal("free"), v.literal("premium"))),
    courseEnrolled: v.optional(v.union(v.literal("JEE"), v.literal("NEET"), v.literal("CUET"), v.literal("SAT"))),
  },
  handler: async (ctx, args) => {
    const { clerkId, ...updates } = args;
    
    // Find the user first
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Update only the provided fields
    const updateData = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(user._id, updateData);

    console.log(`Updated user with clerkId ${clerkId}:`, updateData);
    return user._id;
  },
});

/**
 * Upgrade user to premium and enroll in a course
 */
export const upgradeUserToPremium = mutation({
  args: {
    clerkId: v.string(),
    courseEnrolled: v.union(v.literal("JEE"), v.literal("NEET"), v.literal("CUET"), v.literal("SAT")),
  },
  handler: async (ctx, args) => {
    // Find the user first
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    // Update to premium with course enrollment
    await ctx.db.patch(user._id, {
      subscriptionType: "premium" as const,
      courseEnrolled: args.courseEnrolled,
    });

    console.log(`Upgraded user ${args.clerkId} to premium with course: ${args.courseEnrolled}`);
    return user._id;
  },
});

/**
 * Get users by subscription type
 */
export const getUsersBySubscription = query({
  args: { subscriptionType: v.union(v.literal("free"), v.literal("premium")) },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_subscriptionType", (q) => q.eq("subscriptionType", args.subscriptionType))
      .collect();
  },
});
