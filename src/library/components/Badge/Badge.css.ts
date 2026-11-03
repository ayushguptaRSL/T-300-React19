import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';

export const badgeRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: vars.typography.fontFamily.sans,
    fontWeight: vars.typography.fontWeight.semibold,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    userSelect: 'none',
    borderRadius: vars.radii.full,
    transition: `background-color ${vars.transitions.fast}, color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,
  },

  variants: {
    variant: {
      success: {
        backgroundColor: vars.colors.successLight,
        color: vars.colors.successText,
        border: `1px solid ${vars.colors.successBorder}`,
      },
      warning: {
        backgroundColor: vars.colors.warningLight,
        color: vars.colors.warningText,
        border: `1px solid ${vars.colors.warningBorder}`,
      },
      error: {
        backgroundColor: vars.colors.errorLight,
        color: vars.colors.errorText,
        border: `1px solid ${vars.colors.errorBorder}`,
      },
    },

    size: {
      small: {
        paddingTop: vars.space.xs,
        paddingBottom: vars.space.xs,
        paddingLeft: vars.space.sm,
        paddingRight: vars.space.sm,
        fontSize: vars.typography.fontSize.xs,
      },
      medium: {
        paddingTop: vars.space.xs,
        paddingBottom: vars.space.xs,
        paddingLeft: vars.space.md,
        paddingRight: vars.space.md,
        fontSize: vars.typography.fontSize.sm,
      },
      large: {
        paddingTop: vars.space.sm,
        paddingBottom: vars.space.sm,
        paddingLeft: vars.space.lg,
        paddingRight: vars.space.lg,
        fontSize: vars.typography.fontSize.md,
      },
    },
  },

  defaultVariants: {
    variant: 'success',
    size: 'medium',
  },
});
