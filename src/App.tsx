import { Suspense, useState, useCallback } from 'react';
import { preconnect } from 'react-dom';
import type { ProductsResponse } from './types/product';
import { ProductList } from './components/product/ProductList';
import { LoadingFallback } from './components/loadingFallback/LoadingFallback';
import { ErrorBoundary } from './components/errorBoundary/ErrorBoundary';
import { AuthProvider, useAuth } from './context/AuthProvider';
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
  const [showRegister, setShowRegister] = useState(false);

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
          <p className="subtitle">Simple catalog and user registration</p>
        </div>

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
      </header>

      {showRegister && !user && (
        <RegisterForm
          onSuccess={() => setShowRegister(false)}
          onCancel={() => setShowRegister(false)}
        />
      )}

      <ErrorBoundary onReset={handleRetry} resetKey={productsPromise}>
        <Suspense fallback={<LoadingFallback />}>
          <ProductList productsPromise={productsPromise} />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export function App() {
  return (
    <AuthProvider>
      <MainDashboard />
    </AuthProvider>
  );
}

export default App;
