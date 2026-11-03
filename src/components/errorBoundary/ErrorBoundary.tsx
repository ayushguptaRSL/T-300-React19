import { Component, type ErrorInfo, type ReactNode } from 'react';
import { Button } from '../common/Button';

interface ErrorBoundaryProps {
  children: ReactNode;
  onReset?: () => void;
  resetKey?: unknown;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught error:', error, errorInfo);
  }

  componentDidUpdate(prevProps: ErrorBoundaryProps) {
    if (this.state.hasError && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ hasError: false, error: null });
    }
  }

  handleReset = () => {
    this.props.onReset?.();
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          className="w-full my-8 p-6 max-w-md mx-auto bg-brand-card rounded-brand border border-red-200 shadow-sm text-center"
        >
          <h2 className="text-lg font-bold text-brand-text mb-2">
            Failed to Load Products
          </h2>
          <p className="text-sm text-brand-muted mb-4">
            {this.state.error?.message || 'An error occurred while loading products.'}
          </p>
          <Button type="button" variant="primary" onClick={this.handleReset}>
            Try Again
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
