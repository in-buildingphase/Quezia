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

  messages: defineTable({
    userId: v.string(), // User ID who sent the message
    text: v.string(), // Message content
    createdAt: v.number(), // Unix timestamp
    tags: v.array(v.string()), // Array of tags for filtering
  })
    .index("by_userId", ["userId"]) // Index for user's messages
    .index("by_createdAt", ["createdAt"]) // Index for chronological ordering
    .index("by_tags", ["tags"]), // Index for tag-based filtering

  tags: defineTable({
    tagId: v.string(), // Unique tag identifier (e.g., 'mathematics')
    label: v.string(), // Display name (e.g., 'Mathematics')
    icon: v.string(), // Icon name from lucide-react
    color: v.optional(v.string()), // Optional color override
    isActive: v.boolean(), // Whether tag is currently available
    sortOrder: v.number(), // Display order (lower numbers first)
    createdAt: v.number(), // Unix timestamp
  })
    .index("by_tagId", ["tagId"]) // Index for fast lookups by tag ID
    .index("by_active_order", ["isActive", "sortOrder"]), // Index for active tags in order
});
