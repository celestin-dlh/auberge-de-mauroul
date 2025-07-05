import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createReservation = mutation({
  args: {
    date: v.string(),
    time: v.string(),
    guests: v.string(),
    name: v.string(),
    phone: v.string(),
    email: v.string(),
    message: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const reservation = await ctx.db.insert("reservations", {
      date: args.date,
      time: args.time,
      guests: args.guests,
      name: args.name,
      phone: args.phone,
      email: args.email,
      message: args.message || "",
      status: "pending",
      createdAt: Date.now(),
    });

    return reservation;
  },
});
