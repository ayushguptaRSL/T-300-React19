import { Suspense, useState, useCallback, useEffect } from 'react';
import { preconnect } from 'react-dom';
import type { ProductsResponse, Product } from './types/product';
import { ProductList } from './components/product/ProductList';
import { LoadingFallback } from './components/loadingFallback/LoadingFallback';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { Header } from './components/layout/Header';
import { Sidebar } from './components/layout/Sidebar';
import { ComponentLibraryShowcase } from './library/showcase/ComponentLibraryShowcase';

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

  // View switcher: Exercise 2 (Component Library) vs Original Product Dashboard
  const [activeView, setActiveView] = useState<'library' | 'dashboard'>(() => {
    if (typeof window !== 'undefined') {
      const param = new URLSearchParams(window.location.search).get('view');
      if (param === 'dashboard') return 'dashboard';
    }
    return 'library';
  });

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('view', activeView);
    window.history.replaceState({}, '', url.toString());
  }, [activeView]);

  // Product Dashboard state (strictly separated)
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
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Navigation Switcher */}
      <nav className="bg-slate-900 text-white px-4 py-2.5 flex items-center border-b border-slate-800 z-50 sticky top-0 shadow-sm">
        <button
          type="button"
          onClick={() => setActiveView('dashboard')}
          className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
            activeView === 'dashboard'
              ? 'bg-blue-600 text-white shadow-sm'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Product Dashboard
        </button>

        <button
            type="button"
            onClick={() => setActiveView('library')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                activeView === 'library'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
        >
          Component Library (Vanilla Extract)
        </button>
      </nav>

      {/* Main Content Area */}
      {activeView === 'library' ? (
        <ComponentLibraryShowcase />
      ) : (
        /* Original Product Dashboard (completely unintegrated as requested) */
        <div className="min-h-screen bg-brand-bg text-brand-text flex flex-col md:flex-row flex-1">
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
      )}
    </div>
  );
}

export default App;
