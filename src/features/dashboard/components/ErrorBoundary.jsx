import React from "react";

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
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-fluid p-5 text-center">
          <div
            className="card border-0 shadow-sm"
            style={{ maxWidth: "600px", margin: "0 auto" }}
          >
            <div className="card-body p-4">
              <div className="text-danger mb-3">
                <i className="fas fa-exclamation-triangle fa-3x"></i>
              </div>
              <h5 className="card-title text-danger">Terjadi Kesalahan</h5>
              <p className="card-text text-muted">
                Dashboard mengalami masalah teknis. Silakan coba lagi atau
                hubungi admin.
              </p>
              <div className="d-flex gap-2 justify-content-center">
                <button className="btn btn-primary" onClick={this.handleRetry}>
                  Coba Lagi
                </button>
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => window.location.reload()}
                >
                  Refresh Halaman
                </button>
              </div>
              {import.meta.env.MODE === "development" && (
                <details className="mt-3 text-start">
                  <summary>Detail Error (Development Only)</summary>
                  <pre className="text-danger small">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
