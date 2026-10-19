import { Suspense, useState, useCallback } from 'react';
import { preconnect } from 'react-dom';
import type { ProductsResponse, Product } from './types/product';
import { ProductList } from './components/product/ProductList';
import { ProductDetails } from './components/product/ProductDetails';
import { LoadingFallback } from './components/loadingFallback/LoadingFallback';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthProvider';
import { CartProvider, useCart } from './context/CartProvider';
import { RegisterForm } from './components/registrationForm/RegisterForm';
import './App.css';

const PRODUCTS_API_URL =
  'https://dummyjson.com/products?limit=30&select=title,price,category,thumbnail,images,description';

function fetchProducts(): Promise<ProductsResponse> {
  return fetch(PRODUCTS_API_URL).then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
    }
    return response.json();
  });
}

function MainDashboard() {
  const { user, logout } = useAuth();
  const {
    optimisticCount,
    isPending,
    errorMessage,
    clearError,
    simulateFailure,
    setSimulateFailure,
  } = useCart();

  const [showRegister, setShowRegister] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Preconnect to API and Image CDN origins
  preconnect('https://dummyjson.com');
  preconnect('https://cdn.dummyjson.com');

  const [productsPromise, setProductsPromise] = useState<Promise<ProductsResponse>>(() =>
    fetchProducts()
  );

  const handleRetry = useCallback(() => {
    setProductsPromise(fetchProducts());
  }, []);

  return (
    <div className="container">
      <title>Mini E-Commerce Store – Products</title>
      <meta
        name="description"
        content="Browse our collection of products with categories, images, prices, and descriptions at Mini E-Commerce Store."
      />

      <header className="header">
        <div>
          <h1>Mini E-Commerce Store – Products</h1>
          <p className="subtitle">Simple catalog, cart, and user registration</p>
        </div>

        <div className="header-actions">
          {/* Optimistic Cart Widget */}
          <div className="cart-widget">
            <span className="cart-badge" aria-live="polite">
              🛒 Cart: <strong>{optimisticCount}</strong>
              {isPending && <span className="cart-pending"> (updating...)</span>}
            </span>

            <label className="failure-toggle" title="Check this to simulate API failure when adding to cart">
              <input
                type="checkbox"
                checked={simulateFailure}
                onChange={(e) => setSimulateFailure(e.target.checked)}
              />
              Simulate Failure
            </label>
          </div>

          {/* User Nav */}
          <div className="user-nav">
            {user ? (
              <div className="user-profile">
                <span>
                  Hello, <strong>{user.name}</strong> ({user.email})
                </span>
                <button type="button" onClick={logout} className="btn-secondary">
                  Log Out
                </button>
              </div>
            ) : (
              <button
                type="button"
                className="btn-primary"
                onClick={() => setShowRegister((prev) => !prev)}
              >
                {showRegister ? 'Close Form' : 'Register'}
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Cart Error Banner */}
      {errorMessage && (
        <div className="cart-error-banner" role="alert">
          <span>⚠️ {errorMessage}</span>
          <button
            type="button"
            onClick={clearError}
            className="btn-dismiss-error"
            aria-label="Dismiss error"
          >
            ✕
          </button>
        </div>
      )}

      {showRegister && !user && (
        <RegisterForm
          onSuccess={() => setShowRegister(false)}
          onCancel={() => setShowRegister(false)}
        />
      )}

      {selectedProduct ? (
        <ProductDetails
          product={selectedProduct}
          onBack={() => setSelectedProduct(null)}
        />
      ) : (
        <ErrorBoundary onReset={handleRetry} resetKey={productsPromise}>
          <Suspense fallback={<LoadingFallback />}>
            <ProductList
              productsPromise={productsPromise}
              onSelectProduct={setSelectedProduct}
            />
          </Suspense>
        </ErrorBoundary>
      )}
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <MainDashboard />
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
