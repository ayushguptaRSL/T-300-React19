import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartProvider';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onSelect?: (product: Product) => void;
}

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="14"%3ENo Image Available%3C/text%3E%3C/svg%3E';

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const initialImage = product.thumbnail || product.images?.[0] || FALLBACK_IMAGE;
  const [imgSrc, setImgSrc] = useState(initialImage);
  const { addToCart, pendingProductId } = useCart();
  const isAdding = pendingProductId === product.id;

  return (
    <article
      className={`product-card ${onSelect ? 'clickable' : ''}`}
      onClick={() => onSelect?.(product)}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      onKeyDown={(e) => {
        if (onSelect && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault();
          onSelect(product);
        }
      }}
    >
      <div className="product-image-container">
        <img
          src={imgSrc}
          alt={product.title}
          className="product-image"
          onError={() => setImgSrc(FALLBACK_IMAGE)}
          loading="lazy"
        />
      </div>

      <div className="product-details">
        <span className="product-category">{product.category}</span>
        <h3 className="product-name">{product.title}</h3>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-description">{product.description}</p>

        <div className="card-actions">
          {onSelect && (
            <button
              type="button"
              className="btn-secondary btn-view-details"
              onClick={(e) => {
                e.stopPropagation();
                onSelect(product);
              }}
            >
              View Details
            </button>
          )}

          <button
            type="button"
            className="btn-primary btn-add-cart"
            disabled={isAdding}
            onClick={(e) => {
              e.stopPropagation();
              addToCart(product);
            }}
          >
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </article>
  );
};
