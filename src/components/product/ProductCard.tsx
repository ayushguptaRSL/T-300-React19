import React from 'react';
import type { Product } from '../../types/product';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';

export interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const stock = product.stock ?? 15;
  const isOutOfStock = product.availabilityStatus === 'Out of Stock' || stock <= 0;
  const statusLabel = isOutOfStock ? 'Out of Stock' : 'In Stock';

  return (
    <article className="group bg-brand-card rounded-brand border border-gray-200 shadow-sm p-card flex flex-col justify-between">
      <div className="h-48 w-full bg-gray-50 rounded-brand flex items-center justify-center overflow-hidden mb-3">
        <img
          src={product.thumbnail || product.images?.[0]}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain p-2 transition-transform duration-300 ease-out group-hover:scale-120"
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-medium uppercase tracking-wider text-brand-muted">
            {product.category}
          </span>
          <Badge variant={isOutOfStock ? 'danger' : 'success'}>
            {statusLabel}
          </Badge>
        </div>

        <h3 className="text-base font-semibold text-brand-text line-clamp-1" title={product.title}>
          {product.title}
        </h3>

        <div className="text-lg font-bold text-brand-text mt-1">
          ${product.price.toFixed(2)}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-gray-100">
        <Button
          type="button"
          variant="primary"
          disabled={isOutOfStock}
          onClick={() => onAddToCart?.(product)}
          className="w-full"
        >
          {isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </article>
  );
};
