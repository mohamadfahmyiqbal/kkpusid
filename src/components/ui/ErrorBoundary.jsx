import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });

    // Log error to monitoring service in production
    console.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="d-flex flex-column align-items-center justify-content-center p-5">
          <FaExclamationTriangle className="text-warning mb-3" size={48} />
          <h4 className="text-danger mb-3">Terjadi Kesalahan</h4>
          <p className="text-muted text-center mb-3">
            Komponen mengalami error. Silakan refresh halaman atau hubungi
            administrator.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Halaman
          </button>
          {process.env.NODE_ENV === "development" && (
            <details className="mt-3 text-start">
              <summary>Error Details</summary>
              <pre className="mt-2 p-2 bg-light rounded">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
