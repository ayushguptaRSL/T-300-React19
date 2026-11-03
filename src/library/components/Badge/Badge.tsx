import { forwardRef } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import { badgeRecipe } from './Badge.css';

export type BadgeVariants = NonNullable<RecipeVariants<typeof badgeRecipe>>;

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    BadgeVariants {}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'success',
    size = 'medium',
    className,
    children,
    ...props
  },
  ref
) {
  const classes = [
    badgeRecipe({ variant, size }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <span ref={ref} className={classes} {...props}>
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';
