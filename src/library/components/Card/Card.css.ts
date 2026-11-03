import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { mediaQueries } from '../../tokens/breakpoints';

export const cardRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: vars.radii.md,
    color: vars.colors.textPrimary,
    fontFamily: vars.typography.fontFamily.sans,
    backgroundColor: vars.colors.surface,
  },

  variants: {
    variant: {
      elevated: {
        backgroundColor: vars.colors.surfaceElevated,
        border: `1px solid ${vars.colors.borderSubtle}`,
        boxShadow: vars.shadows.md,
        padding: vars.space.lg,
        '@media': {
          [mediaQueries.mobileOnly]: {
            padding: vars.space.md,
          },
        },
      },
      outlined: {
        backgroundColor: vars.colors.surface,
        border: `1px solid ${vars.colors.borderDefault}`,
        boxShadow: vars.shadows.none,
        padding: vars.space.md,
        '@media': {
          [mediaQueries.mobileOnly]: {
            padding: vars.space.sm,
          },
        },
      },
      flat: {
        backgroundColor: vars.colors.secondary,
        border: '1px solid transparent',
        boxShadow: vars.shadows.none,
        padding: vars.space.sm,
      },
    },

    interactive: {
      true: {
        cursor: 'pointer',
        ':hover': {
          boxShadow: vars.shadows.lg,
          borderColor: vars.colors.borderStrong,
        },
      },
      false: {
        cursor: 'default',
      },
    },
  },

  defaultVariants: {
    variant: 'elevated',
    interactive: false,
  },
});

export const cardHeaderStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.sm,
  paddingBottom: vars.space.sm,
  borderBottom: `1px solid ${vars.colors.borderSubtle}`,
  marginBottom: vars.space.sm,
});

export const cardTitleStyle = style({
  margin: 0,
  fontSize: vars.typography.fontSize.md,
  fontWeight: vars.typography.fontWeight.semibold,
  color: vars.colors.textPrimary,
});

export const cardSubtitleStyle = style({
  margin: 0,
  marginTop: vars.space.xs,
  fontSize: vars.typography.fontSize.xs,
  color: vars.colors.textMuted,
});

export const cardBodyStyle = style({
  flex: 1,
  fontSize: vars.typography.fontSize.sm,
  color: vars.colors.textSecondary,
  lineHeight: vars.typography.lineHeight.normal,
});

export const cardFooterStyle = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.space.sm,
  paddingTop: vars.space.sm,
  borderTop: `1px solid ${vars.colors.borderSubtle}`,
  marginTop: vars.space.sm,
});
