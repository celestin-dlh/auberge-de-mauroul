import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all menu blocs with their items
export const getMenuBlocs = query({
  args: {},
  handler: async (ctx) => {
    const menuBlocs = await ctx.db.query("menuBlocs").order("desc").collect();
    
    // Sort by order field manually
    const sortedBlocs = menuBlocs.sort((a, b) => a.order - b.order);
    
    // For each bloc, get its items
    const blocsWithItems = await Promise.all(
      sortedBlocs.map(async (bloc) => {
        const items = await ctx.db
          .query("menuItems")
          .filter((q) => q.eq(q.field("menuBlocId"), bloc._id))
          .collect();
        
        // Sort items by order manually
        const sortedItems = items.sort((a, b) => a.order - b.order);
        
        return {
          ...bloc,
          items: sortedItems
        };
      })
    );
    
    return blocsWithItems;
  },
});

// Create a new menu bloc
export const createMenuBloc = mutation({
  args: { 
    category: v.string(), 
    description: v.optional(v.string()),
    order: v.number() 
  },
  handler: async (ctx, args) => {
    // Get all existing blocs to reorder them
    const existingBlocs = await ctx.db.query("menuBlocs").collect();
    
    // If the new order position is occupied, shift other blocs
    const blocsToShift = existingBlocs.filter(bloc => bloc.order >= args.order);
    
    // Shift existing blocs up by 1
    for (const bloc of blocsToShift) {
      await ctx.db.patch(bloc._id, {
        order: bloc.order + 1,
        updatedAt: Date.now(),
      });
    }
    
    const now = Date.now();
    const id = await ctx.db.insert("menuBlocs", {
      category: args.category,
      description: args.description,
      order: args.order,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

// Update a menu bloc
export const updateMenuBloc = mutation({
  args: {
    id: v.id("menuBlocs"),
    category: v.string(),
    description: v.optional(v.string()),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    // Get current bloc and all other blocs
    const currentBloc = await ctx.db.get(args.id);
    if (!currentBloc) throw new Error("Bloc not found");
    
    const allBlocs = await ctx.db.query("menuBlocs").collect();
    const otherBlocs = allBlocs.filter(bloc => bloc._id !== args.id);
    
    // If order is changing, we need to reorder
    if (currentBloc.order !== args.order) {
      // If moving to a lower position (earlier in list)
      if (args.order < currentBloc.order) {
        // Shift blocs that are in the range [newOrder, oldOrder) up by 1
        const blocsToShift = otherBlocs.filter(bloc => 
          bloc.order >= args.order && bloc.order < currentBloc.order
        );
        
        for (const bloc of blocsToShift) {
          await ctx.db.patch(bloc._id, {
            order: bloc.order + 1,
            updatedAt: Date.now(),
          });
        }
      } else {
        // Moving to a higher position (later in list)
        // Shift blocs that are in the range (oldOrder, newOrder] down by 1
        const blocsToShift = otherBlocs.filter(bloc => 
          bloc.order > currentBloc.order && bloc.order <= args.order
        );
        
        for (const bloc of blocsToShift) {
          await ctx.db.patch(bloc._id, {
            order: bloc.order - 1,
            updatedAt: Date.now(),
          });
        }
      }
    }
    
    await ctx.db.patch(args.id, {
      category: args.category,
      description: args.description,
      order: args.order,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Delete a menu bloc and all its items
export const deleteMenuBloc = mutation({
  args: {
    id: v.id("menuBlocs"),
  },
  handler: async (ctx, args) => {
    // Get the bloc to delete
    const blocToDelete = await ctx.db.get(args.id);
    if (!blocToDelete) throw new Error("Bloc not found");
    
    // First delete all items in this bloc
    const items = await ctx.db
      .query("menuItems")
      .filter((q) => q.eq(q.field("menuBlocId"), args.id))
      .collect();
    
    for (const item of items) {
      await ctx.db.delete(item._id);
    }
    
    // Then delete the bloc
    await ctx.db.delete(args.id);
    
    // Reorder remaining blocs to fill the gap
    const remainingBlocs = await ctx.db.query("menuBlocs").collect();
    const blocsToReorder = remainingBlocs.filter(bloc => bloc.order > blocToDelete.order);
    
    for (const bloc of blocsToReorder) {
      await ctx.db.patch(bloc._id, {
        order: bloc.order - 1,
        updatedAt: Date.now(),
      });
    }
    
    return args.id;
  },
});

// Create a new menu item
export const createMenuItem = mutation({
  args: {
    menuBlocId: v.id("menuBlocs"),
    title: v.string(),
    description: v.string(),
    price: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    // Get all existing items in this bloc to reorder them
    const existingItems = await ctx.db
      .query("menuItems")
      .filter((q) => q.eq(q.field("menuBlocId"), args.menuBlocId))
      .collect();
    
    // If the new order position is occupied, shift other items
    const itemsToShift = existingItems.filter(item => item.order >= args.order);
    
    // Shift existing items up by 1
    for (const item of itemsToShift) {
      await ctx.db.patch(item._id, {
        order: item.order + 1,
        updatedAt: Date.now(),
      });
    }
    
    const now = Date.now();
    const id = await ctx.db.insert("menuItems", {
      menuBlocId: args.menuBlocId,
      title: args.title,
      description: args.description,
      price: args.price,
      order: args.order,
      createdAt: now,
      updatedAt: now,
    });
    return id;
  },
});

// Update a menu item
export const updateMenuItem = mutation({
  args: {
    id: v.id("menuItems"),
    title: v.string(),
    description: v.string(),
    price: v.string(),
    order: v.number(),
  },
  handler: async (ctx, args) => {
    // Get current item
    const currentItem = await ctx.db.get(args.id);
    if (!currentItem) throw new Error("Item not found");
    
    // Get all items in the same bloc
    const allItems = await ctx.db
      .query("menuItems")
      .filter((q) => q.eq(q.field("menuBlocId"), currentItem.menuBlocId))
      .collect();
    
    const otherItems = allItems.filter(item => item._id !== args.id);
    
    // If order is changing, we need to reorder
    if (currentItem.order !== args.order) {
      // If moving to a lower position (earlier in list)
      if (args.order < currentItem.order) {
        // Shift items that are in the range [newOrder, oldOrder) up by 1
        const itemsToShift = otherItems.filter(item => 
          item.order >= args.order && item.order < currentItem.order
        );
        
        for (const item of itemsToShift) {
          await ctx.db.patch(item._id, {
            order: item.order + 1,
            updatedAt: Date.now(),
          });
        }
      } else {
        // Moving to a higher position (later in list)
        // Shift items that are in the range (oldOrder, newOrder] down by 1
        const itemsToShift = otherItems.filter(item => 
          item.order > currentItem.order && item.order <= args.order
        );
        
        for (const item of itemsToShift) {
          await ctx.db.patch(item._id, {
            order: item.order - 1,
            updatedAt: Date.now(),
          });
        }
      }
    }
    
    await ctx.db.patch(args.id, {
      title: args.title,
      description: args.description,
      price: args.price,
      order: args.order,
      updatedAt: Date.now(),
    });
    
    return args.id;
  },
});

// Delete a menu item
export const deleteMenuItem = mutation({
  args: {
    id: v.id("menuItems"),
  },
  handler: async (ctx, args) => {
    // Get the item to delete
    const itemToDelete = await ctx.db.get(args.id);
    if (!itemToDelete) throw new Error("Item not found");
    
    // Delete the item
    await ctx.db.delete(args.id);
    
    // Reorder remaining items in the same bloc to fill the gap
    const remainingItems = await ctx.db
      .query("menuItems")
      .filter((q) => q.eq(q.field("menuBlocId"), itemToDelete.menuBlocId))
      .collect();
    
    const itemsToReorder = remainingItems.filter(item => item.order > itemToDelete.order);
    
    for (const item of itemsToReorder) {
      await ctx.db.patch(item._id, {
        order: item.order - 1,
        updatedAt: Date.now(),
      });
    }
    
    return args.id;
  },
});