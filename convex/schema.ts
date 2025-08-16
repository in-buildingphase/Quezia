import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    username: v.string(),
    grade: v.string(),
    dob: v.string(), // Using string for flexibility, can be ISO date string
    phone: v.string(),
    createdAt: v.number(), // Unix timestamp
  })
    .index("by_clerkId", ["clerkId"]) // Index for fast lookups by Clerk ID
    .index("by_email", ["email"]) // Index for email lookups
    .index("by_username", ["username"]), // Index for username lookups
});
