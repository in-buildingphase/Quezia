import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Mutation to send a new message
export const sendMessage = mutation({
  args: {
    userId: v.string(),
    text: v.string(),
    tags: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, text, tags } = args;

    // Insert the message into the database
    const messageId = await ctx.db.insert("messages", {
      userId,
      text,
      tags,
      createdAt: Date.now(),
    });

    return messageId;
  },
});

// Query to get messages with optional tag filtering
export const getMessages = query({
  args: {
    tags: v.optional(v.array(v.string())), // Optional array of tags to filter by
    limit: v.optional(v.number()), // Optional limit for pagination
  },
  handler: async (ctx, args) => {
    const { tags, limit = 50 } = args;

    let messages = await ctx.db
      .query("messages")
      .order("desc")
      .take(limit * 2); // Get more messages to account for filtering

    // If tags are provided, filter messages that contain any of the specified tags
    if (tags && tags.length > 0) {
      messages = messages.filter(message => 
        tags.some(tag => message.tags.includes(tag))
      );
      
      // Apply limit after filtering
      messages = messages.slice(0, limit);
    }

    return messages;
  },
});

// Query to get messages by user ID
export const getMessagesByUser = query({
  args: {
    userId: v.string(),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { userId, limit = 50 } = args;

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .order("desc")
      .take(limit);

    return messages;
  },
});

// Mutation to delete a message (for admin or user who sent it)
export const deleteMessage = mutation({
  args: {
    messageId: v.id("messages"),
    userId: v.string(), // User requesting deletion
  },
  handler: async (ctx, args) => {
    const { messageId, userId } = args;

    // Get the message to check ownership
    const message = await ctx.db.get(messageId);
    
    if (!message) {
      throw new Error("Message not found");
    }

    // Only allow deletion by the message sender
    if (message.userId !== userId) {
      throw new Error("Not authorized to delete this message");
    }

    await ctx.db.delete(messageId);
    return { success: true };
  },
});
