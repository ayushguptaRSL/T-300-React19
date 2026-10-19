/* eslint-disable react-refresh/only-export-components */
import { createContext, use, useState, useTransition, useOptimistic, type ReactNode } from 'react';
import type { Product } from '../types/product';

export interface CartContextType {
  cartCount: number;
  optimisticCount: number;
  isPending: boolean;
  pendingProductId: number | null;
  addToCart: (product: Product) => void;
  errorMessage: string | null;
  clearError: () => void;
  simulateFailure: boolean;
  setSimulateFailure: (value: boolean) => void;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartCount, setCartCount] = useState<number>(0);
  const [isPending, startTransition] = useTransition();
  const [pendingProductId, setPendingProductId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [simulateFailure, setSimulateFailure] = useState<boolean>(false);

  const [optimisticCount, setOptimisticCount] = useOptimistic(
    cartCount,
    (current: number, delta: number) => current + delta
  );

  const addToCart = (product: Product) => {
    setErrorMessage(null);
    setPendingProductId(product.id);

    startTransition(async () => {
      setOptimisticCount(1);

      try {
        await new Promise((resolve) => setTimeout(resolve, 800));

        if (simulateFailure) {
          throw new Error(`Failed to add "${product.title}" to cart (Simulated API Failure).`);
        }

        setCartCount((prev) => prev + 1);
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Failed to add item to cart.';
        setErrorMessage(message);
      } finally {
        setPendingProductId(null);
      }
    });
  };

  const clearError = () => setErrorMessage(null);

  return (
    <CartContext
      value={{
        cartCount,
        optimisticCount,
        isPending,
        pendingProductId,
        addToCart,
        errorMessage,
        clearError,
        simulateFailure,
        setSimulateFailure,
      }}
    >
      {children}
    </CartContext>
  );
}

export function useCart(): CartContextType {
  const context = use(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
