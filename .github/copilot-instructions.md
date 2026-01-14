# Copilot Instructions for Bashkeveprimi Website

## Project Overview
A humanitarian organization website for **Bashkeveprimi** ("Together") in Kosovo. React 19 + TypeScript frontend with Vite, Tailwind CSS v4, and React Router v7. A Django backend is planned but not yet implemented.

## Tech Stack & Commands
- **Dev server**: `npm run dev` → runs on `localhost:5174`
- **Build**: `npm run build` (TypeScript compile + Vite build)
- **Lint**: `npm run lint`
- **Node**: v22.12.0 (use `nvm install && nvm use`)

## Architecture

### Page Structure Pattern
Each page follows a consistent composition pattern with `Header` + content components + `Footer`:
```tsx
// Example from src/pages/Home.tsx
<Header />
<main className="min-h-screen mt-1">
  <PeriodicActions />      // Auto-sliding carousel
  <BashkeveprimiFeatures />
  <OrganizationRecentFeatures />
  <BashkeveprimiInfo />
</main>
<Footer />
```

### Routing
- Routes defined in [src/constants/router.tsx](src/constants/router.tsx) using `createBrowserRouter`
- App.tsx serves as layout shell with `<Outlet />` for child routes
- Menu items in [src/constants/menuitems.ts](src/constants/menuitems.ts) drive navbar links
- Route paths use kebab-case (e.g., `/about-us`, `/orphans`)

### Key Directories
- `src/components/` - Reusable UI components (presentational)
- `src/pages/` - Route-level page components (compose components)
- `src/constants/` - Router config and menu items
- `src/utils/` - Helper functions (`toKebabCase`, `moveToFooterSmoothly`)
- `src/assets/{icons,images,videos}/` - Static assets as SVG/image imports

## Styling Conventions

### Tailwind CSS v4
- Import via `@import "tailwindcss"` in [src/index.css](src/index.css)
- Custom utilities defined in `@layer utilities` block
- **Brand color**: `#00CFD0` (teal) - used for CTAs, accents
- **Background**: `#F3F2E7` (cream/beige) - used for cards, header

### Component Styling Patterns
```tsx
// Card pattern
<div className="bg-[#F3F2E7] p-4 rounded-2xl">

// CTA button pattern
<button className="bg-[#00CFD0] text-black font-medium py-3 px-6 rounded-md hover:bg-[#00b6b7] transition">

// Hide scrollbar utility
<div className="no-scrollbar overflow-x-auto">
```

## Component Patterns

### Data-Driven Components
Components like `PeriodicActions` embed data arrays directly and use `useRef` + `useEffect` for auto-sliding behavior (3-second intervals).

### Navigation
- `Navbar` receives `menuitems` prop and renders `NavLink` components
- Uses `toKebabCase()` utility to convert menu titles to route paths
- Active state styling via React Router's `isActive` callback

### Smooth Scrolling
Footer has `id="footer-id"` for programmatic scrolling via `moveToFooterSmoothly()` utility.

## File Naming
- Components: PascalCase (e.g., `BashkeveprimiFeatures.tsx`)
- Utilities: camelCase (e.g., `toKebabCase.ts`)
- Assets: kebab-case (e.g., `little-orphan.svg`)

## Incomplete/Planned Features
- `src/pages/Requests.tsx` - Empty, pending implementation
- Django backend integration (see [DJANGO_BACKEND_SETUP.md](DJANGO_BACKEND_SETUP.md))
- Mobile responsiveness improvements (some components use fixed widths)
- Contact form submission logic not implemented

## Important Notes
- Data is currently hardcoded in components (no API integration yet)
- Use `clsx` package (installed) for conditional class composition
- Avoid inline style objects; prefer Tailwind utility classes
