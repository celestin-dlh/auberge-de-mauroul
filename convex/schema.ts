import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Reservations table
  reservations: defineTable({
    date: v.string(),
    time: v.string(),
    guests: v.string(),
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    message: v.optional(v.string()),
    status: v.string(),
    createdAt: v.number(),
  }),

  // Menu blocs table (categories)
  menuBlocs: defineTable({
    category: v.string(),
    description: v.optional(v.string()),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),

  // Menu items table
  menuItems: defineTable({
    menuBlocId: v.id("menuBlocs"),
    title: v.string(),
    description: v.string(),
    price: v.string(),
    order: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  }),
});
