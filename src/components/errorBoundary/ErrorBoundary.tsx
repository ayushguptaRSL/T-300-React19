import { Component, type ErrorInfo, type ReactNode } from 'react';
import './ErrorBoundary.css';

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
        <div className="error-box" role="alert">
          <title>Error | Mini E-Commerce Store</title>
          <meta
            name="description"
            content="An error occurred while loading products from Mini E-Commerce Store."
          />

          <h2>Failed to Load Products</h2>
          <p className="error-message">
            {this.state.error?.message || 'An unexpected error occurred while fetching product data.'}
          </p>
          <button type="button" onClick={this.handleReset} className="btn-retry">
            Try Again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
