import { use } from 'react';
import { preload } from 'react-dom';
import type { ProductsResponse } from '../../types/product.ts';
import { ProductCard } from './ProductCard.tsx';

interface ProductListProps {
  productsPromise: Promise<ProductsResponse>;
}

export function ProductList({ productsPromise }: ProductListProps) {
  const data = use(productsPromise);

  // Preload
  data.products.slice(0, 4).forEach((product) => {
    const imgUrl = product.thumbnail || product.images?.[0];
    if (imgUrl) {
      preload(imgUrl, { as: 'image' });
    }
  });

  return (
    <>
      <title>Mini E-Commerce Store – Products</title>
      <meta
        name="description"
        content={`Browse our catalog of ${data.products.length} products with prices, categories, and descriptions.`}
      />

      <div className="product-grid">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
