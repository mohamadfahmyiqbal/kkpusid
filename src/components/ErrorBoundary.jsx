import React from "react";
import { Container,  Button } from "react-bootstrap";
import Alert from "./ui/SwalAlert";


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

    // Log error untuk debugging (hanya di development)
    if (process.env.NODE_ENV === "development") {
      console.error("Error caught by boundary:", error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <Container className="d-flex align-items-center justify-content-center min-vh-100">
          <div className="text-center">
            <Alert variant="danger" className="mb-4">
              <Alert.Heading>Terjadi Kesalahan</Alert.Heading>
              <p>
                Halaman mengalami kesalahan tak terduga. Silakan muat ulang
                halaman.
              </p>
              {import.meta.env.MODE === "development" && this.state.error && (
                <details className="mt-3 text-start">
                  <summary>Detail Error (Development Only)</summary>
                  <pre className="mt-2 p-3 bg-light rounded">
                    {this.state.error && this.state.error.toString()}
                    <br />
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </Alert>
            <Button variant="primary" onClick={this.handleRetry}>
              Coba Lagi
            </Button>
          </div>
        </Container>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
