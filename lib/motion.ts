// Single source of truth for motion. Same constants are exposed as CSS vars
// in globals.css for CSS animations, and here for GSAP/Lenis programmatic use.

export const ease = {
  fluide: [0.65, 0.05, 0.36, 1] as const,
  drama: [0.85, 0, 0.15, 1] as const,
  soft: [0.4, 0, 0.2, 1] as const,
} as const;

export const cssEase = {
  fluide: "cubic-bezier(0.65, 0.05, 0.36, 1)",
  drama: "cubic-bezier(0.85, 0, 0.15, 1)",
  soft: "cubic-bezier(0.4, 0, 0.2, 1)",
} as const;

export const duration = {
  short: 0.6,
  base: 0.8,
  long: 1.0,
  xlong: 1.2,
} as const;

export const stagger = {
  tight: 0.04,
  base: 0.08,
  loose: 0.12,
} as const;
