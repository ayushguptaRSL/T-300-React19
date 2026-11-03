import { Suspense, useState, useCallback } from 'react';
import { preconnect } from 'react-dom';
import type { ProductsResponse, Product } from './types/product';
import { ProductList } from './components/product/ProductList';
import { LoadingFallback } from './components/loadingFallback/LoadingFallback';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';

const PRODUCTS_API_URL =
  'https://dummyjson.com/products?limit=30&select=title,price,category,thumbnail,images,description,stock,availabilityStatus';

function fetchProducts(): Promise<ProductsResponse> {
  return fetch(PRODUCTS_API_URL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

const CATEGORIES = [
  { id: 'all', label: 'All Items' },
  { id: 'beauty', label: 'Beauty' },
  { id: 'fragrances', label: 'Fragrances' },
  { id: 'furniture', label: 'Furniture' },
  { id: 'groceries', label: 'Groceries' },
];

export function App() {
  preconnect('https://dummyjson.com');
  preconnect('https://cdn.dummyjson.com');

  const [productsPromise, setProductsPromise] = useState<Promise<ProductsResponse>>(() =>
    fetchProducts()
  );

  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const handleRetry = useCallback(() => {
    setProductsPromise(fetchProducts());
  }, []);

  const handleAddToCart = useCallback((product: Product) => {
    setCartItems((prev) => [...prev, product]);
  }, []);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col md:flex-row">
      <Sidebar
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        statusFilter={statusFilter}
        onSelectStatus={setStatusFilter}
        categories={CATEGORIES}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title="Product Dashboard"
          cartCount={cartItems.length}
        />

        <main className="flex-1 p-4 md:p-dashboard max-w-7xl w-full mx-auto">
          <ErrorBoundary onReset={handleRetry} resetKey={productsPromise}>
            <Suspense fallback={<LoadingFallback />}>
              <ProductList
                productsPromise={productsPromise}
                selectedCategory={selectedCategory}
                statusFilter={statusFilter}
                onAddToCart={handleAddToCart}
              />
            </Suspense>
          </ErrorBoundary>
        </main>
      </div>
    </div>
  );
}

export default App;
