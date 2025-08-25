import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Query to get all active tags in display order
export const getActiveTags = query({
  args: {},
  handler: async (ctx) => {
    const tags = await ctx.db
      .query("tags")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .collect();

    return tags;
  },
});

// Query to get all tags (for admin)
export const getAllTags = query({
  args: {},
  handler: async (ctx) => {
    const tags = await ctx.db
      .query("tags")
      .order("asc")
      .collect();

    return tags;
  },
});

// Mutation to create a new tag
export const createTag = mutation({
  args: {
    tagId: v.string(),
    label: v.string(),
    icon: v.string(),
    color: v.optional(v.string()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { tagId, label, icon, color, sortOrder } = args;

    // Check if tag ID already exists
    const existingTag = await ctx.db
      .query("tags")
      .withIndex("by_tagId", (q) => q.eq("tagId", tagId))
      .first();

    if (existingTag) {
      throw new Error(`Tag with ID "${tagId}" already exists`);
    }

    // Get the highest sort order for new tags if not provided
    const allTags = await ctx.db.query("tags").collect();
    const maxSortOrder = Math.max(...allTags.map(t => t.sortOrder), 0);

    const id = await ctx.db.insert("tags", {
      tagId,
      label,
      icon,
      color,
      isActive: true,
      sortOrder: sortOrder ?? maxSortOrder + 1,
      createdAt: Date.now(),
    });

    return id;
  },
});

// Mutation to update a tag
export const updateTag = mutation({
  args: {
    id: v.id("tags"),
    label: v.optional(v.string()),
    icon: v.optional(v.string()),
    color: v.optional(v.string()),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    const tag = await ctx.db.get(id);
    if (!tag) {
      throw new Error("Tag not found");
    }

    await ctx.db.patch(id, updates);
    return { success: true };
  },
});

// Mutation to delete a tag
export const deleteTag = mutation({
  args: {
    id: v.id("tags"),
  },
  handler: async (ctx, args) => {
    const { id } = args;

    const tag = await ctx.db.get(id);
    if (!tag) {
      throw new Error("Tag not found");
    }

    await ctx.db.delete(id);
    return { success: true };
  },
});

// Mutation to swap sort orders of two tags atomically
export const swapTagOrder = mutation({
  args: {
    id1: v.id("tags"),
    id2: v.id("tags"),
  },
  handler: async (ctx, args) => {
    const { id1, id2 } = args;

    // Get both tags
    const tag1 = await ctx.db.get(id1);
    const tag2 = await ctx.db.get(id2);

    if (!tag1 || !tag2) {
      throw new Error("One or both tags not found");
    }

    // Swap their sort orders atomically
    const tempOrder = tag1.sortOrder;
    await ctx.db.patch(id1, { sortOrder: tag2.sortOrder });
    await ctx.db.patch(id2, { sortOrder: tempOrder });

    return { success: true };
  },
});