import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Query to get all active action dock features
export const getActiveFeatures = query({
  args: {},
  handler: async (ctx) => {
    const features = await ctx.db
      .query("actionDockFeatures")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .collect();
    
    return features;
  },
});

// Query to get a specific feature by ID
export const getFeatureById = query({
  args: { featureId: v.string() },
  handler: async (ctx, args) => {
    const feature = await ctx.db
      .query("actionDockFeatures")
      .withIndex("by_featureId", (q) => q.eq("featureId", args.featureId))
      .first();
    
    return feature;
  },
});

// Mutation to create a new action dock feature
export const createFeature = mutation({
  args: {
    featureId: v.string(),
    heading: v.string(),
    showInfo: v.optional(v.boolean()),
    type: v.union(v.literal("number"), v.literal("text"), v.literal("select")),
    placeholder: v.optional(v.string()),
    defaultValue: v.union(v.string(), v.number()),
    min: v.optional(v.number()),
    max: v.optional(v.number()),
    options: v.optional(v.array(v.string())),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    // Check if feature already exists
    const existingFeature = await ctx.db
      .query("actionDockFeatures")
      .withIndex("by_featureId", (q) => q.eq("featureId", args.featureId))
      .first();

    if (existingFeature) {
      throw new Error(`Feature with ID ${args.featureId} already exists`);
    }

    // Get the highest sort order for new features
    const features = await ctx.db.query("actionDockFeatures").collect();
    const maxSortOrder = Math.max(...features.map(f => f.sortOrder), 0);

    const featureId = await ctx.db.insert("actionDockFeatures", {
      featureId: args.featureId,
      heading: args.heading,
      showInfo: args.showInfo ?? false,
      type: args.type,
      placeholder: args.placeholder,
      defaultValue: args.defaultValue,
      min: args.min,
      max: args.max,
      options: args.options,
      isActive: args.isActive ?? true,
      sortOrder: args.sortOrder ?? maxSortOrder + 1,
      createdAt: Date.now(),
    });

    return featureId;
  },
});

// Mutation to update an existing feature
export const updateFeature = mutation({
  args: {
    featureId: v.string(),
    heading: v.optional(v.string()),
    showInfo: v.optional(v.boolean()),
    type: v.optional(v.union(v.literal("number"), v.literal("text"), v.literal("select"))),
    placeholder: v.optional(v.string()),
    defaultValue: v.optional(v.union(v.string(), v.number())),
    min: v.optional(v.number()),
    max: v.optional(v.number()),
    options: v.optional(v.array(v.string())),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const feature = await ctx.db
      .query("actionDockFeatures")
      .withIndex("by_featureId", (q) => q.eq("featureId", args.featureId))
      .first();

    if (!feature) {
      throw new Error(`Feature with ID ${args.featureId} not found`);
    }

    const updateData: any = {};
    if (args.heading !== undefined) updateData.heading = args.heading;
    if (args.showInfo !== undefined) updateData.showInfo = args.showInfo;
    if (args.type !== undefined) updateData.type = args.type;
    if (args.placeholder !== undefined) updateData.placeholder = args.placeholder;
    if (args.defaultValue !== undefined) updateData.defaultValue = args.defaultValue;
    if (args.min !== undefined) updateData.min = args.min;
    if (args.max !== undefined) updateData.max = args.max;
    if (args.options !== undefined) updateData.options = args.options;
    if (args.isActive !== undefined) updateData.isActive = args.isActive;
    if (args.sortOrder !== undefined) updateData.sortOrder = args.sortOrder;

    await ctx.db.patch(feature._id, updateData);
    return feature._id;
  },
});

// Mutation to delete a feature
export const deleteFeature = mutation({
  args: { featureId: v.string() },
  handler: async (ctx, args) => {
    const feature = await ctx.db
      .query("actionDockFeatures")
      .withIndex("by_featureId", (q) => q.eq("featureId", args.featureId))
      .first();

    if (!feature) {
      throw new Error(`Feature with ID ${args.featureId} not found`);
    }

    await ctx.db.delete(feature._id);
    return feature._id;
  },
});

// Mutation to initialize default features (run once)
export const initializeDefaultFeatures = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if features already exist
    const existingFeatures = await ctx.db.query("actionDockFeatures").collect();
    if (existingFeatures.length > 0) {
      return { message: "Features already initialized" };
    }

    // Create default feature
    await ctx.db.insert("actionDockFeatures", {
      featureId: "numQuestions",
      heading: "No. of questions",
      showInfo: true,
      type: "number",
      placeholder: "10",
      defaultValue: 10,
      min: 1,
      max: 100,
      isActive: true,
      sortOrder: 1,
      createdAt: Date.now(),
    });

    return { message: "Default features initialized successfully" };
  },
});
