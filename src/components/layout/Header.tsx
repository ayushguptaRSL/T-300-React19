import React from 'react';
import { Button } from '../common/Button';

export interface HeaderProps {
  title?: string;
  cartCount: number;
  onCartClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  title = 'Product Dashboard',
  cartCount,
  onCartClick,
}) => {
  return (
    <header className="bg-brand-card border-b border-gray-200 px-4 md:px-6 py-4 flex items-center justify-between">
      <h1 className="text-xl font-bold text-brand-text">
        {title}
      </h1>
      <Button type="button" variant="primary" onClick={onCartClick}>
        Cart ({cartCount})
      </Button>
    </header>
  );
};
