import { use } from 'react';
import type { ProductsResponse, Product } from '../../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  productsPromise: Promise<ProductsResponse>;
  selectedCategory?: string;
  statusFilter?: string;
  onAddToCart?: (product: Product) => void;
}

export function ProductList({
  productsPromise,
  selectedCategory = 'all',
  statusFilter = 'all',
  onAddToCart,
}: ProductListProps) {
  const data = use(productsPromise);

  const filteredProducts = data.products.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' ||
      product.category.toLowerCase() === selectedCategory.toLowerCase();

    const stock = product.stock ?? 15;
    const isOutOfStock = product.availabilityStatus === 'Out of Stock' || stock <= 0;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'in-stock' && !isOutOfStock) ||
      (statusFilter === 'out-of-stock' && isOutOfStock);

    return matchesCategory && matchesStatus;
  });

  return (
    <section aria-label="Products Section" className="w-full">
      {filteredProducts.length === 0 ? (
        <div className="bg-brand-card rounded-brand border border-gray-200 p-8 text-center text-brand-muted">
          No products found matching the selected filter.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-dashboard">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
          ))}
        </div>
      )}
    </section>
  );
}
