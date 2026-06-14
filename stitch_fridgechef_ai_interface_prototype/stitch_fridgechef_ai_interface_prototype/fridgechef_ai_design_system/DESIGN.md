---
name: FridgeChef AI Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#3d4a3d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#6d7b6c'
  outline-variant: '#bccbb9'
  surface-tint: '#006e2f'
  primary: '#006e2f'
  on-primary: '#ffffff'
  primary-container: '#22c55e'
  on-primary-container: '#004b1e'
  inverse-primary: '#4ae176'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#565e74'
  on-tertiary: '#ffffff'
  tertiary-container: '#a4abc4'
  on-tertiary-container: '#383f54'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#6bff8f'
  primary-fixed-dim: '#4ae176'
  on-primary-fixed: '#002109'
  on-primary-fixed-variant: '#005321'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#dae2fd'
  tertiary-fixed-dim: '#bec6e0'
  on-tertiary-fixed: '#131b2e'
  on-tertiary-fixed-variant: '#3f465c'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '600'
    lineHeight: 38px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-md:
    fontFamily: Geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Geist
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.03em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 40px
  stack-sm: 8px
  stack-md: 16px
  stack-lg: 32px
---

## Brand & Style
The design system embodies a "Silicon Valley Premium" aesthetic—fusing the hyper-utilitarian clarity of Notion with the polished, depth-driven execution of Stripe and Linear. It is designed to feel like a high-end kitchen: organized, pristine, and technologically advanced.

The brand personality is **Intelligent, Fresh, and Effortless**. It targets health-conscious professionals who value time and culinary quality. The UI must evoke a sense of "culinary superpowers" through high-performance interactions, generous whitespace, and a sophisticated balance of organic colors and geometric precision. We utilize a mix of **Minimalism** for layout and **Glassmorphism** for interactive layers to suggest transparency and modern AI sophistication.

## Colors
The palette is rooted in nature but refined by technology. 
- **Primary (Fresh Green):** Used for growth, health, and primary "Success" actions. It represents the freshness of ingredients.
- **Secondary (Warm Orange):** Used for appetite stimulation, energy, and AI-driven "Magic" moments (like recipe generation).
- **Tertiary (Deep Slate):** Used for high-contrast typography and grounding elements to ensure the UI feels "Investor-ready" and stable.
- **Neutrals:** A scale of cool grays provides the structural scaffolding, ensuring the interface remains clean and readable.

## Typography
We use **Inter** for its systematic reliability and neutral, modern character across all core UI and body copy. To lean into the "Developer-polished" and "Technical" side of AI, **Geist** is introduced for labels, captions, and data points, providing a sharp, monospaced-adjacent precision to the nutritional data and ingredient lists.

Headlines should utilize tight letter-spacing and high font weights to command attention, while body text maintains a generous line height for maximum legibility during cooking tasks.

## Layout & Spacing
The layout follows a **Fixed Grid** philosophy on desktop to maintain a premium "magazine" feel, while transitioning to a highly fluid model on mobile devices. 

- **Desktop:** 12-column grid with a 1200px max-width.
- **Tablet:** 8-column grid with 24px margins.
- **Mobile:** 4-column grid with 16px margins.

Spacing follows an 8px linear scale. Large-scale whitespace (32px+) is preferred between functional sections to prevent the UI from feeling cluttered—an essential requirement for a cooking environment where cognitive load should be minimized.

## Elevation & Depth
This design system uses a combination of **Tonal Layers** and **Ambient Shadows** to create a sense of physical presence.

1.  **Base Layer:** White (#FFFFFF) for the main canvas.
2.  **Surface Layer:** Soft Gray (#F5F5F5) for secondary containers and background sections.
3.  **Raised Layer (Cards):** White background with a "Stripe-style" shadow: a dual-layered shadow consisting of a sharp, low-opacity 1px offset and a broad, diffused 20px blur.
4.  **Glass Layer (Overlays/Modals):** Semi-transparent white (opacity 80%) with a 20px backdrop blur (Apple-style) and a subtle 1px white inner border to define the edge.

Shadows should never be pure black; they are tinted with the Tertiary Slate color at 4-8% opacity to maintain a "clean" look.

## Shapes
We utilize a highly rounded, approachable shape language that feels organic and "friendly." 

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px).
- **Containers (Cards, Section Wrappers):** 1.5rem (24px) for the outer radius to create a "Premium App" feel.
- **Interactive Chips:** Fully pill-shaped (999px) to distinguish them as clickable, metadata-driven elements.

The use of 24px corners on large cards creates a distinctive, modern silhouette that contrasts beautifully against the rigid 8px grid.

## Components
- **Buttons:** Primary buttons use a solid Fresh Green fill with white text. "AI-Action" buttons (like "Generate Recipe") use a gradient from Fresh Green to Warm Orange. Use a subtle lift effect on hover.
- **Cards:** White background, 24px border radius, and a 1px border in #E2E8F0. No heavy shadows except on hover.
- **Input Fields:** Soft Gray (#F5F5F5) backgrounds with no border, transitioning to a white background with a 2px Fresh Green ring on focus.
- **Chips (Ingredients):** Pill-shaped with a subtle Fresh Green tint (#DCFCE7) and Dark Slate text for "In-stock" items; Warm Orange tint for "Missing" items.
- **Progressive Disclosure:** Use glassmorphic blurs for bottom sheets and mobile navigation bars to keep the content visible underneath.
- **AI Feedback:** A "shimmer" loading state using a subtle gradient animation to indicate AI processing.