# Lay Day Hostels - Architecture

## 1. High-Level Project Overview
This project is a Next.js 15 (App Router) web application designed to clone and enhance the Stay Lay Day website. It uses React Server Components for fast initial loads, Framer Motion for animations, and `shadcn/ui` (Tailwind CSS) for the component system.

## 2. Folder Structure Explanation
- `/src/app`: Contains the App Router definitions. Each folder represents a route.
- `/src/components`: Reusable UI components.
  - `/ui`: Base `shadcn/ui` components.
  - `/home`: Page-specific sections for the homepage.
  - `/layout`: Global layout components (Navbar, Footer).
- `/public`: Static assets, separated by hostel folders for dynamic loading.
- `/docs`: Project documentation.

## 3. Routing Strategy (App Router)
- `/`: Home page (static/server-rendered).
- `/hotel/view/[id]/[slug]`: Dynamic route for specific hostels.
- `/search`: Search results page (Client-side filtering or Server Actions).
- `/api/search`: Next.js Route Handler for handling search queries.

## 4. Data Flow Strategy
- Static data (Hostel descriptions, amenities) is currently mocked via constant objects.
- Image assets are dynamically read from the server filesystem (`fs.readdirSync`) within Server Components to automatically populate galleries.
- Form submissions and filters will utilize Next.js Server Actions or API routes for validation.

## 5. Search/Filter Implementation Strategy
- **Endpoint:** `/api/search`
- **Validation:** `zod` schema to validate query parameters (`destination`, `priceMin`, `priceMax`, `amenities`, `rating`).
- **State:** URL query parameters (`useSearchParams`) to keep the UI state shareable and SSR-friendly.
- **Components:** `FilterSidebar` pushes changes to the router, triggering a re-fetch of data.

## 6. State Management Explanation
- Global state is minimized. We rely heavily on React Server Components for initial state.
- Local component state (`useState`) is used for UI toggles (e.g., mobile menu, accordion state, gallery active image).
- URL state is used for search filters to allow deep-linking.

## 7. Component Structure Rules
- Components should be modular and export a single default or named function.
- `shadcn/ui` components are strictly used for interactive logic (Dialogs, Tabs, Carousels).
- Avoid `use client` unless the component strictly requires interactivity (hooks, event listeners, framer-motion).

## 8. Reusability Patterns
- Reusable UI blocks are abstracted to `/src/components`.
- Layout components (Navbar, Footer) wrap the main children in `layout.tsx`.

## 9. How to add a new hotel/property
1. Create a new folder in `/public` with the hostel's images.
2. Update the `HOSTEL_DATA` object (or database equivalent) with the new hostel ID, assigning the correct folder name, location, amenities, and price.
3. The dynamic route `/hotel/view/[id]/[slug]` will automatically generate the page and map the images.

## 10. How to add a new page
1. Create a new folder in `/src/app`, e.g., `/src/app/about`.
2. Create a `page.tsx` file exporting a default React component.
3. Add the link to `src/components/layout/Navbar.tsx`.

## 11. How to deploy (Vercel recommended)
1. Push the code to a GitHub repository.
2. Import the project into Vercel.
3. Vercel will automatically detect the Next.js framework and configure the build settings (`npm run build`).
4. Ensure environment variables (if any) are added to the Vercel dashboard.
