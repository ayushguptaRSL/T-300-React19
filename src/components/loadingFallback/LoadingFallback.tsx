import './LoadingFallback.css';

export function LoadingFallback() {
  return (
    <div>
      <title>Loading... | Mini E-Commerce Store</title>
      <meta
        name="description"
        content="Loading products from the Mini E-Commerce Store catalog..."
      />

      <p className="status-text">Loading products...</p>
      <div className="product-grid" aria-busy="true" aria-label="Loading products">
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="product-card skeleton-card">
            <div className="skeleton-image" />
            <div className="product-details">
              <div className="skeleton-line skeleton-badge" />
              <div className="skeleton-line skeleton-title" />
              <div className="skeleton-line skeleton-price" />
              <div className="skeleton-line skeleton-desc" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
