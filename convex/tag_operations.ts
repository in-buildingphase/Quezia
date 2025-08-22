import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Bulk operations for tags
export const bulkUpdateTags = mutation({
  args: {
    operation: v.union(
      v.literal("activate_all"),
      v.literal("deactivate_all"),
      v.literal("reorder")
    ),
    tagIds: v.optional(v.array(v.id("tags"))),
    newOrder: v.optional(v.array(v.object({
      tagId: v.id("tags"),
      sortOrder: v.number()
    })))
  },
  handler: async (ctx, args) => {
    const { operation, tagIds, newOrder } = args;

    switch (operation) {
      case "activate_all":
        if (tagIds) {
          for (const tagId of tagIds) {
            await ctx.db.patch(tagId, { isActive: true });
          }
        } else {
          const allTags = await ctx.db.query("tags").collect();
          for (const tag of allTags) {
            await ctx.db.patch(tag._id, { isActive: true });
          }
        }
        break;

      case "deactivate_all":
        if (tagIds) {
          for (const tagId of tagIds) {
            await ctx.db.patch(tagId, { isActive: false });
          }
        } else {
          const allTags = await ctx.db.query("tags").collect();
          for (const tag of allTags) {
            await ctx.db.patch(tag._id, { isActive: false });
          }
        }
        break;

      case "reorder":
        if (newOrder) {
          for (const item of newOrder) {
            await ctx.db.patch(item.tagId, { sortOrder: item.sortOrder });
          }
        }
        break;
    }

    return { success: true };
  },
});

// Export tags to JSON for backup
export const exportTags = mutation({
  args: {},
  handler: async (ctx) => {
    const tags = await ctx.db.query("tags").collect();
    
    return {
      exportedAt: new Date().toISOString(),
      totalTags: tags.length,
      tags: tags.map(tag => ({
        tagId: tag.tagId,
        label: tag.label,
        icon: tag.icon,
        color: tag.color,
        isActive: tag.isActive,
        sortOrder: tag.sortOrder,
        createdAt: tag.createdAt
      }))
    };
  },
});

// Import tags from JSON backup
export const importTags = mutation({
  args: {
    tags: v.array(v.object({
      tagId: v.string(),
      label: v.string(),
      icon: v.string(),
      color: v.optional(v.string()),
      isActive: v.boolean(),
      sortOrder: v.number()
    })),
    replaceExisting: v.boolean()
  },
  handler: async (ctx, args) => {
    const { tags, replaceExisting } = args;
    
    if (replaceExisting) {
      // Delete all existing tags
      const existingTags = await ctx.db.query("tags").collect();
      for (const tag of existingTags) {
        await ctx.db.delete(tag._id);
      }
    }

    const insertedIds = [];
    
    for (const tag of tags) {
      // Check if tag already exists
      const existing = await ctx.db
        .query("tags")
        .withIndex("by_tagId", (q) => q.eq("tagId", tag.tagId))
        .first();

      if (!existing) {
        const id = await ctx.db.insert("tags", {
          ...tag,
          createdAt: Date.now()
        });
        insertedIds.push(id);
      } else if (replaceExisting) {
        // Update existing tag
        await ctx.db.patch(existing._id, {
          label: tag.label,
          icon: tag.icon,
          color: tag.color,
          isActive: tag.isActive,
          sortOrder: tag.sortOrder
        });
      }
    }

    return {
      success: true,
      importedCount: insertedIds.length,
      skippedCount: tags.length - insertedIds.length
    };
  },
});
