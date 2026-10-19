import React, { useState } from 'react';
import type { Product } from '../../types/product';
import { useCart } from '../../context/CartProvider';
import './ProductDetails.css';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

const FALLBACK_IMAGE =
  'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="200" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f3f4f6"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" fill="%239ca3af" font-family="sans-serif" font-size="14"%3ENo Image Available%3C/text%3E%3C/svg%3E';

export const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const images = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail || FALLBACK_IMAGE];

  const [activeImage, setActiveImage] = useState<string>(images[0]);
  const { addToCart, pendingProductId } = useCart();
  const isAdding = pendingProductId === product.id;

  const detailsContainerRef = (node: HTMLElement | null) => {
    if (!node) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onBack();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  };

  return (
    <article ref={detailsContainerRef} className="product-details-container">
      <title>{`${product.title} – Mini E-Commerce Store`}</title>
      <meta name="description" content={product.description} />

      <button type="button" onClick={onBack} className="btn-secondary back-button">
        ← Back to Products (Esc)
      </button>

      <div className="product-details-content">
        <div className="product-images-section">
          <div className="main-image-container">
            <img
              src={activeImage}
              alt={product.title}
              className="main-image"
              onError={() => setActiveImage(FALLBACK_IMAGE)}
            />
          </div>

          {images.length > 1 && (
            <div className="thumbnails-row">
              {images.map((img, index) => (
                <button
                  type="button"
                  key={index}
                  className={`thumbnail-button ${img === activeImage ? 'active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={img}
                    alt={`${product.title} thumbnail ${index + 1}`}
                    className="thumbnail-img"
                    onError={(e) => {
                      e.currentTarget.src = FALLBACK_IMAGE;
                    }}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="product-info-section">
          <span className="product-category">{product.category}</span>
          <h2 className="details-title">{product.title}</h2>
          <p className="details-price">${product.price.toFixed(2)}</p>

          <button
            type="button"
            className="btn-primary btn-add-cart-details"
            disabled={isAdding}
            onClick={() => addToCart(product)}
          >
            {isAdding ? 'Adding to Cart...' : 'Add to Cart'}
          </button>

          <div className="details-description-box">
            <h3>Description</h3>
            <p className="details-description">{product.description}</p>
          </div>
        </div>
      </div>
    </article>
  );
};
