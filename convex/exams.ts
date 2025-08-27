import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const getActiveExams = query({
  args: {},
  handler: async (ctx) => {
    const exams = await ctx.db
      .query("exams")
      .withIndex("by_active_order", (q) => q.eq("isActive", true))
      .order("asc")
      .collect();
    
    return exams;
  },
});

export const getAllExams = query({
  args: {},
  handler: async (ctx) => {
    const exams = await ctx.db
      .query("exams")
      .withIndex("by_active_order")
      .order("asc")
      .collect();
    
    return exams;
  },
});

export const createExam = mutation({
  args: {
    examId: v.string(),
    name: v.string(),
    shortName: v.string(),
    description: v.string(),
    iconPath: v.string(),
    price: v.number(),
    isActive: v.boolean(),
    sortOrder: v.number(),
  },
  handler: async (ctx, args) => {
    // Check if exam with this ID already exists
    const existingExam = await ctx.db
      .query("exams")
      .withIndex("by_examId", (q) => q.eq("examId", args.examId))
      .first();
    
    if (existingExam) {
      throw new Error(`Exam with ID '${args.examId}' already exists`);
    }

    const examId = await ctx.db.insert("exams", {
      ...args,
      createdAt: Date.now(),
    });

    return examId;
  },
});

export const updateExam = mutation({
  args: {
    id: v.id("exams"),
    examId: v.optional(v.string()),
    name: v.optional(v.string()),
    shortName: v.optional(v.string()),
    description: v.optional(v.string()),
    iconPath: v.optional(v.string()),
    price: v.optional(v.number()),
    isActive: v.optional(v.boolean()),
    sortOrder: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    
    // If examId is being updated, check for conflicts
    if (updates.examId !== undefined) {
      const existingExam = await ctx.db
        .query("exams")
        .withIndex("by_examId", (q) => q.eq("examId", updates.examId!))
        .first();
      
      if (existingExam && existingExam._id !== id) {
        throw new Error(`Exam with ID '${updates.examId}' already exists`);
      }
    }

    await ctx.db.patch(id, updates);
    return id;
  },
});

export const deleteExam = mutation({
  args: { id: v.id("exams") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return args.id;
  },
});

export const initializeDefaultExams = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if exams already exist
    const existingExams = await ctx.db.query("exams").collect();
    if (existingExams.length > 0) {
      return { message: "Exams already initialized" };
    }

    const defaultExams = [
      {
        examId: "jee",
        name: "Joint Entrance Examination",
        shortName: "JEE",
        description: "India's premier engineering entrance exam for admission to top engineering colleges including IITs and NITs.",
        iconPath: "/assets/images/jeeIcon.svg",
        price: 499,
        isActive: true,
        sortOrder: 1,
        createdAt: Date.now(),
      },
      {
        examId: "neet",
        name: "National Eligibility Entrance Test",
        shortName: "NEET",
        description: "National level medical entrance exam for admission to medical and dental colleges across India.",
        iconPath: "/assets/images/neetIcon.svg",
        price: 599,
        isActive: true,
        sortOrder: 2,
        createdAt: Date.now(),
      },
      {
        examId: "cuet",
        name: "Common University Entrance Test",
        shortName: "CUET",
        description: "Common entrance test for admission to undergraduate programs in central universities and colleges.",
        iconPath: "/assets/images/cuetIcon.svg",
        price: 399,
        isActive: true,
        sortOrder: 3,
        createdAt: Date.now(),
      },
      {
        examId: "sat",
        name: "Scholastic Assessment Test",
        shortName: "SAT",
        description: "Standardized test for college admissions in the United States and international universities.",
        iconPath: "/assets/images/satIcon.svg",
        price: 799,
        isActive: true,
        sortOrder: 4,
        createdAt: Date.now(),
      },
    ];

    // Insert all exams
    for (const exam of defaultExams) {
      await ctx.db.insert("exams", exam);
    }

    return { message: "Default exams initialized successfully" };
  },
});
