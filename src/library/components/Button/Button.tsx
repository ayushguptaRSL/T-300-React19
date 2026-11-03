import { forwardRef } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { buttonRecipe, iconSlotStyle } from './Button.css';

export type ButtonVariants = NonNullable<RecipeVariants<typeof buttonRecipe>>;

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    ButtonVariants {
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = 'primary',
    size = 'medium',
    fullWidth = false,
    leftIcon,
    rightIcon,
    disabled = false,
    className,
    children,
    ...props
  },
  ref
) {
  const classes = [
    buttonRecipe({ variant, size, fullWidth }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      ref={ref}
      type="button"
      className={classes}
      disabled={disabled}
      aria-disabled={disabled}
      {...props}
    >
      {leftIcon && <span className={iconSlotStyle}>{leftIcon}</span>}
      <span>{children}</span>
      {rightIcon && <span className={iconSlotStyle}>{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';
