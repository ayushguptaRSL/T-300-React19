import { style } from '@vanilla-extract/css';
import { recipe } from '@vanilla-extract/recipes';
import { vars } from '../../tokens/theme.css';
import { mediaQueries } from '../../tokens/breakpoints';

export const iconSlotStyle = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1em',
  lineHeight: 1,
});

export const buttonRecipe = recipe({
  base: {
    boxSizing: 'border-box',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vars.space.xs,
    fontFamily: vars.typography.fontFamily.sans,
    fontWeight: vars.typography.fontWeight.medium,
    lineHeight: vars.typography.lineHeight.normal,
    textAlign: 'center',
    whiteSpace: 'nowrap',
    cursor: 'pointer',
    userSelect: 'none',
    border: '1px solid transparent',
    borderRadius: vars.radii.sm,
    transition: `background-color ${vars.transitions.fast}, border-color ${vars.transitions.fast}`,
    outline: 'none',

    ':focus-visible': {
      outline: `2px solid ${vars.colors.focusRing}`,
      outlineOffset: '2px',
    },

    ':disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      pointerEvents: 'none',
    },
  },

  variants: {
    variant: {
      primary: {
        backgroundColor: vars.colors.primary,
        color: vars.colors.primaryText,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.colors.primaryHover,
          },
          '&:active:not(:disabled)': {
            backgroundColor: vars.colors.primaryActive,
          },
        },
      },
      secondary: {
        backgroundColor: vars.colors.secondary,
        color: vars.colors.secondaryText,
        borderColor: vars.colors.borderDefault,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.colors.secondaryHover,
          },
          '&:active:not(:disabled)': {
            backgroundColor: vars.colors.secondaryActive,
          },
        },
      },
      danger: {
        backgroundColor: vars.colors.danger,
        color: vars.colors.dangerText,
        selectors: {
          '&:hover:not(:disabled)': {
            backgroundColor: vars.colors.dangerHover,
          },
          '&:active:not(:disabled)': {
            backgroundColor: vars.colors.dangerActive,
          },
        },
      },
    },

    size: {
      small: {
        height: '28px',
        paddingLeft: vars.space.sm,
        paddingRight: vars.space.sm,
        fontSize: vars.typography.fontSize.xs,
        borderRadius: vars.radii.sm,
      },
      medium: {
        height: '36px',
        paddingLeft: vars.space.md,
        paddingRight: vars.space.md,
        fontSize: vars.typography.fontSize.sm,
        borderRadius: vars.radii.md,
      },
      large: {
        height: '44px',
        paddingLeft: vars.space.lg,
        paddingRight: vars.space.lg,
        fontSize: vars.typography.fontSize.md,
        borderRadius: vars.radii.md,
        '@media': {
          [mediaQueries.mobileOnly]: {
            height: '38px',
            paddingLeft: vars.space.md,
            paddingRight: vars.space.md,
            fontSize: vars.typography.fontSize.sm,
          },
        },
      },
    },

    fullWidth: {
      true: {
        width: '100%',
      },
      false: {
        width: 'auto',
      },
    },
  },

  defaultVariants: {
    variant: 'primary',
    size: 'medium',
    fullWidth: false,
  },
});
