# Lay Day Hostels - Design System

## 1. Typography Scale
We use two primary fonts:
- **Heading Font:** `Bebas Neue` (Bold, blocky, vintage-surf aesthetic).
- **Body Font:** `Inter` (Clean, legible sans-serif).

### Scale
- **H1:** 5rem (80px), uppercase, tracking-wider, `Bebas Neue`
- **H2:** 3rem (48px), uppercase, tracking-wide, `Bebas Neue`
- **H3:** 1.5rem (24px), uppercase, tracking-wide, `Bebas Neue`
- **Paragraph:** 1rem (16px), leading-relaxed, `Inter`
- **Small Text:** 0.875rem (14px), font-medium, `Inter`
- **Tiny/Labels:** 0.75rem (12px), font-bold, uppercase, tracking-widest, `Inter`

## 2. Color Palette
- **Background:** `#EBE6D8` (Cream/Off-white) - Used for page backgrounds.
- **Text (Primary):** `#083248` (Dark Blue/Teal) - Used for all typography.
- **Accent (Primary):** `#EE5B2B` (Lay Day Orange) - Used for CTA buttons, borders, highlights.
- **Secondary Background:** `#FFFFFF` (White) - Used for cards and banners.
- **Neutral/Gray:** `rgba(8, 50, 72, 0.6)` - Used for secondary text.

## 3. Spacing Scale
Based on Tailwind's default spacing:
- **xs:** `0.5rem` (8px)
- **sm:** `1rem` (16px)
- **md:** `1.5rem` (24px)
- **lg:** `2rem` (32px)
- **xl:** `3rem` (48px)
- **2xl:** `5rem` (80px)
- **Section Padding:** `py-16` or `py-20` (64px - 80px)

## 4. Button Styles
- **Primary:** Background `#EE5B2B`, Text `White`, Hover `#d64e22`. Uppercase, tracking-widest, bold text.
- **Secondary:** Background `White`, Text `#083248`, Border `2px solid #083248`.
- **Ghost:** Transparent background, Text `#083248` or `White`. Hover effect adds slight background opacity.
- **Outline:** Transparent background, Border `2px solid #EE5B2B`, Text `#EE5B2B`.

## 5. Card Styles
- **Hotel Cards:** Square/aspect-ratio images, 2px solid `#083248` borders. Hover effect scales the image (`scale-105`) while the container remains fixed.
- **Deal Cards:** White background, no border, simple flex layout with image on top.

## 6. Input Styles
- Pill-shaped (`rounded-full`), white or cream background, no border, text `#083248`.
- Padding: `px-6 py-3`.

## 7. Shadows and Border Radius
- **Border Radius:** We use sharp corners (`rounded-none`) for a raw/blocky feel, except for specific pill-shaped inputs (`rounded-full`).
- **Shadows:** Minimal shadows. We rely on thick borders (`border-4`, `border-2`) and offset colored borders to create depth.

## 8. Motion Principles
- **Page Transitions:** Fade in/out (`duration: 0.4s`).
- **Scroll Reveal:** Elements slide up slightly (`translate-y-4` to `0`) and fade in. Staggered children (delay: `0.1s`).
- **Hover Transitions:** Smooth image scaling (`duration-700 ease-in-out`).

## 9. Layout Grid Rules
- Max container width: `max-w-6xl` (1152px).
- Columns: 12-column grid system (via Tailwind `grid-cols-12`) or simple 1, 3, 4 col grids (`grid-cols-3`).
- Gaps: Standard gap is `gap-6` (24px) or `gap-12` (48px).

## 10. Responsive Breakpoints
- **Mobile:** Default (`< 768px`)
- **Tablet (md):** `768px`
- **Desktop (lg):** `1024px`
- **Large Desktop (xl):** `1280px`

## 11. Component Usage Guidelines
- Always use `shadcn/ui` components for interactive elements (Dialog, Sheet, Accordion).
- Wrap components in `framer-motion` `<motion.div>` for enter animations.
