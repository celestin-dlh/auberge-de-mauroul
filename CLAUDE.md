# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Development Commands

### Development Server
```bash
# Start frontend development server (port 3000)
npm run dev

# Start Convex backend (required for database operations)
npx convex dev
```

### Build
```bash
# Build for production
npm run build
```

### Database Operations
```bash
# Import sample data
npx convex import sampleData.jsonl

# Deploy backend functions
npx convex deploy
```

## Architecture Overview

This is a **full-stack React application** using modern React 19 with TanStack ecosystem:

- **Frontend**: React 19 + TanStack Router (file-based routing) + TanStack Query
- **Backend**: Convex (Backend-as-a-Service) 
- **Build Tool**: Vite 7 + TanStack Start (SSR framework)
- **Styling**: Tailwind CSS 4
- **Language**: TypeScript throughout

### Key Architecture Patterns

1. **File-based Routing**: Routes are defined in `src/routes/` with automatic route tree generation
2. **Backend Integration**: Convex handles database queries/mutations with React Query integration
3. **Type Safety**: Auto-generated types for both routes (`routeTree.gen.ts`) and Convex API
4. **SSR Ready**: TanStack Start provides server-side rendering capabilities
5. **CSS-in-JS**: Tailwind CSS 4 with Vite plugin integration

### Project Structure

```
src/
├── routes/           # File-based routing (auto-generates route tree)
├── router.tsx        # Router configuration with Convex/React Query setup
├── styles/           # Tailwind CSS and global styles
└── routeTree.gen.ts  # Auto-generated (don't edit)

convex/
├── tasks.ts          # Database queries/mutations
└── _generated/       # Auto-generated Convex types
```

## Environment Setup

- **Required**: `VITE_CONVEX_URL` environment variable for Convex backend connection
- **Development**: Both `npm run dev` and `npx convex dev` must be running simultaneously

## Development Notes

- Route tree is auto-generated - modify files in `src/routes/` directory
- Convex types are auto-generated - define functions in `convex/` directory  
- No testing framework is currently configured
- Uses ES modules (`"type": "module"` in package.json)
- Vite dev server runs on port 3000

## Convex Backend

The backend uses Convex for database operations. Database queries are defined in `convex/tasks.ts` and accessed via React Query integration in the frontend router setup.