import React from "react";
import { logger } from "../utils/logger";

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

    logger.error("Error Boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary-container text-center p-5">
          <div className="error-icon mb-3">
            <i
              className="bi bi-exclamation-triangle-fill text-danger"
              style={{ fontSize: "3rem" }}
            ></i>
          </div>
          <h3 className="text-danger mb-3">Terjadi Kesalahan</h3>
          <p className="text-muted mb-4">
            Maaf, terjadi kesalahan yang tidak terduga. Silakan refresh halaman
            atau coba lagi nanti.
          </p>
          <button
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Refresh Halaman
          </button>
          {import.meta.env.MODE === "development" && (
            <details className="mt-4 text-left">
              <summary className="text-muted">
                Detail Error (Development)
              </summary>
              <pre className="mt-2 p-3 bg-light rounded">
                {this.state.error && this.state.error.toString()}
                <br />
                {this.state.errorInfo?.componentStack}
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
