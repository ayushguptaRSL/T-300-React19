import { use } from 'react';
import { preload } from 'react-dom';
import type { ProductsResponse, Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  productsPromise: Promise<ProductsResponse>;
  onSelectProduct?: (product: Product) => void;
}

export function ProductList({ productsPromise, onSelectProduct }: ProductListProps) {
  const data = use(productsPromise);

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
          <ProductCard
            key={product.id}
            product={product}
            onSelect={onSelectProduct}
          />
        ))}
      </div>
    </>
  );
}
