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
    country: v.optional(v.string()),
    examPreference: v.optional(v.union(
      v.literal("JEE"),
      v.literal("SAT"),
      v.literal("CUET")
    )),
    ageGroup: v.optional(v.union(
      v.literal("Under 13"),
      v.literal("13–15"),
      v.literal("16–18"),
      v.literal("19–22"),
      v.literal("23+")
    )),
    onboarded: v.optional(v.boolean()),
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
    actionDockSettings: v.optional(v.any()), // ActionDock configuration values (dynamic based on features)
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

  actionDockFeatures: defineTable({
    featureId: v.string(), // Unique feature identifier (e.g., 'numQuestions')
    heading: v.string(), // Display name (e.g., 'No. of questions')
    showInfo: v.optional(v.boolean()), // Whether to show info icon
    type: v.union(v.literal("number"), v.literal("text"), v.literal("select")), // Input type
    placeholder: v.optional(v.string()), // Input placeholder
    defaultValue: v.union(v.string(), v.number()), // Default value
    min: v.optional(v.number()), // Minimum value for number type
    max: v.optional(v.number()), // Maximum value for number type
    options: v.optional(v.array(v.string())), // Options for select type (e.g., ["Easy", "Medium", "Hard"])
    isActive: v.boolean(), // Whether feature is currently available
    sortOrder: v.number(), // Display order (lower numbers first)
    createdAt: v.number(), // Unix timestamp
  })
    .index("by_featureId", ["featureId"]) // Index for fast lookups by feature ID
    .index("by_active_order", ["isActive", "sortOrder"]), // Index for active features in order

  exams: defineTable({
    examId: v.string(), // Unique exam identifier (e.g., 'jee', 'neet', 'cuet', 'sat')
    name: v.string(), // Full exam name (e.g., 'Joint Entrance Examination')
    shortName: v.string(), // Short name for display (e.g., 'JEE', 'NEET')
    description: v.string(), // Brief description of the exam
    iconPath: v.string(), // Path to the exam icon (e.g., '/assets/images/jeeIcon.svg')
    price: v.number(), // Price in your currency (e.g., 299, 499, 0 for free)
    isActive: v.boolean(), // Whether exam is currently available
    sortOrder: v.number(), // Display order (lower numbers first)
    createdAt: v.number(), // Unix timestamp
  })
    .index("by_examId", ["examId"]) // Index for fast lookups by exam ID
    .index("by_active_order", ["isActive", "sortOrder"]), // Index for active exams in order
});
