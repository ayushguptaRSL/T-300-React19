import React from 'react';

export type BadgeVariant = 'success' | 'danger' | 'neutral' | 'primary';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className = '',
}) => {
  const variantClasses: Record<BadgeVariant, string> = {
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    neutral: 'bg-gray-100 text-gray-700',
    primary: 'bg-blue-100 text-blue-800',
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-brand ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  );
};
