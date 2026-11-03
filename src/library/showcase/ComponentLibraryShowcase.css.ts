import { style } from '@vanilla-extract/css';
import { vars } from '../tokens/theme.css';
import { mediaQueries } from '../tokens/breakpoints';

export const showcaseContainer = style({
  minHeight: '100vh',
  backgroundColor: vars.colors.background,
  color: vars.colors.textPrimary,
  fontFamily: vars.typography.fontFamily.sans,
  padding: `${vars.space.md} ${vars.space.sm}`,
  boxSizing: 'border-box',
  '@media': {
    [mediaQueries.tabletUp]: {
      padding: `${vars.space.xl} ${vars.space.md}`,
    },
  },
});

export const showcaseInner = style({
  maxWidth: '1080px',
  margin: '0 auto',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xl,
});

export const heroSection = style({
  textAlign: 'center',
  paddingTop: vars.space.sm,
  paddingBottom: vars.space.sm,
});

export const heroTitle = style({
  margin: 0,
  textAlign: 'center',
  fontSize: vars.typography.fontSize.xl,
  fontWeight: vars.typography.fontWeight.bold,
  color: vars.colors.textPrimary,
});

export const sectionBlock = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
});

export const sectionTitle = style({
  fontSize: vars.typography.fontSize.lg,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.textPrimary,
  margin: 0,
});

export const sectionDescription = style({
  margin: 0,
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.textSecondary,
});

export const componentGrid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.space.md,
  '@media': {
    [mediaQueries.tabletUp]: {
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
    },
  },
});

export const row = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  alignItems: 'center',
});

export const column = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const tokenSwatch = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.space.sm,
  padding: vars.space.xs,
  borderRadius: vars.radii.sm,
  border: `1px solid ${vars.colors.borderSubtle}`,
  backgroundColor: vars.colors.surface,
});

export const colorBox = style({
  width: '24px',
  height: '24px',
  borderRadius: vars.radii.sm,
  border: `1px solid ${vars.colors.borderDefault}`,
  flexShrink: 0,
});

export const tokenLabel = style({
  fontSize: vars.typography.fontSize.xs,
  fontFamily: vars.typography.fontFamily.mono,
  color: vars.colors.textSecondary,
});

export const codeBox = style({
  backgroundColor: vars.colors.secondary,
  padding: vars.space.sm,
  borderRadius: vars.radii.sm,
  fontFamily: vars.typography.fontFamily.mono,
  fontSize: vars.typography.fontSize.xs,
  color: vars.colors.textPrimary,
  overflowX: 'auto',
  border: `1px solid ${vars.colors.borderDefault}`,
  lineHeight: 1.5,
});
