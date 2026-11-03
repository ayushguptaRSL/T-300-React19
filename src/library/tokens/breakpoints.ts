export const breakpoints = {
  sm: '640px',
  md: '768px',
} as const;

export const mediaQueries = {
  mobileOnly: `screen and (max-width: ${breakpoints.sm})`,
  tabletUp: `screen and (min-width: ${breakpoints.md})`,
} as const;
