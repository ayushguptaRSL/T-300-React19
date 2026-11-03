import { forwardRef } from 'react';
import type { RecipeVariants } from '@vanilla-extract/recipes';
import {
  cardRecipe,
  cardHeaderStyle,
  cardTitleStyle,
  cardSubtitleStyle,
  cardBodyStyle,
  cardFooterStyle,
} from './Card.css';

export type CardVariants = NonNullable<RecipeVariants<typeof cardRecipe>>;

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    CardVariants {}

export type CardHeaderProps = React.HTMLAttributes<HTMLDivElement>;
export type CardTitleProps = React.HTMLAttributes<HTMLHeadingElement>;
export type CardSubtitleProps = React.HTMLAttributes<HTMLParagraphElement>;
export type CardBodyProps = React.HTMLAttributes<HTMLDivElement>;
export type CardFooterProps = React.HTMLAttributes<HTMLDivElement>;

export const CardHeader = forwardRef<HTMLDivElement, CardHeaderProps>(
  function CardHeader({ className, children, ...props }, ref) {
    const classes = [cardHeaderStyle, className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
CardHeader.displayName = 'CardHeader';

export const CardTitle = forwardRef<HTMLHeadingElement, CardTitleProps>(
  function CardTitle({ className, children, ...props }, ref) {
    const classes = [cardTitleStyle, className].filter(Boolean).join(' ');
    return (
      <h3 ref={ref} className={classes} {...props}>
        {children}
      </h3>
    );
  }
);
CardTitle.displayName = 'CardTitle';

export const CardSubtitle = forwardRef<HTMLParagraphElement, CardSubtitleProps>(
  function CardSubtitle({ className, children, ...props }, ref) {
    const classes = [cardSubtitleStyle, className].filter(Boolean).join(' ');
    return (
      <p ref={ref} className={classes} {...props}>
        {children}
      </p>
    );
  }
);
CardSubtitle.displayName = 'CardSubtitle';

export const CardBody = forwardRef<HTMLDivElement, CardBodyProps>(
  function CardBody({ className, children, ...props }, ref) {
    const classes = [cardBodyStyle, className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
CardBody.displayName = 'CardBody';

export const CardFooter = forwardRef<HTMLDivElement, CardFooterProps>(
  function CardFooter({ className, children, ...props }, ref) {
    const classes = [cardFooterStyle, className].filter(Boolean).join(' ');
    return (
      <div ref={ref} className={classes} {...props}>
        {children}
      </div>
    );
  }
);
CardFooter.displayName = 'CardFooter';

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  {
    variant = 'elevated',
    interactive = false,
    className,
    children,
    ...props
  },
  ref
) {
  const classes = [
    cardRecipe({ variant, interactive }),
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={ref} className={classes} {...props}>
      {children}
    </div>
  );
});

Card.displayName = 'Card';
