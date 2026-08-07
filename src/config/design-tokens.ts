export const designTokens = {
  breakpoints: { sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 },
  containers: { reading: "44rem", content: "72rem", wide: "87.5rem" },
  durations: { fast: 0.15, normal: 0.25, slow: 0.4 },
  easing: {
    standard: [0.2, 0, 0, 1],
    entrance: [0, 0, 0.2, 1],
    exit: [0.4, 0, 1, 1],
  },
  zIndex: {
    dropdown: 1000,
    sticky: 1100,
    overlay: 1200,
    modal: 1300,
    toast: 1400,
    tooltip: 1500,
  },
  grid: { columns: 12, gutter: { mobile: "1rem", desktop: "1.5rem" } },
} as const;
