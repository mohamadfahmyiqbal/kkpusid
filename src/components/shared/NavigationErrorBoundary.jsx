import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { FaExclamationTriangle, FaHome, FaRedo } from "react-icons/fa";
import { jwtEncode } from "../../utils/helpers";

class NavigationErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error("Navigation Error:", error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    window.location.reload();
  };

  handleGoHome = () => {
    try {
      const token = jwtEncode({ page: "dashboard" });
      window.location.href = `/${token}`;
    } catch {
      window.location.href = "/";
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="container-fluid py-5 bg-light min-vh-100 d-flex align-items-center justify-content-center">
          <Card
            className="border-0 shadow-sm rounded-4"
            style={{ maxWidth: "500px" }}
          >
            <Card.Body className="p-4 text-center">
              <div className="mb-4">
                <div className="bg-danger bg-opacity-10 d-inline-flex p-4 rounded-circle">
                  <FaExclamationTriangle size={48} className="text-danger" />
                </div>
              </div>
              <h4 className="fw-bold mb-3">Terjadi Kesalahan</h4>
              <p className="text-muted mb-4">
                Sistem mengalami gangguan navigasi. Silakan coba kembali atau
                hubungi admin.
              </p>

              <div className="d-grid gap-2">
                <Button
                  variant="primary"
                  onClick={this.handleReset}
                  className="d-flex align-items-center justify-content-center py-2"
                >
                  <FaRedo className="me-2" /> Coba Lagi
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={this.handleGoHome}
                  className="d-flex align-items-center justify-content-center py-2"
                >
                  <FaHome className="me-2" /> Kembali ke Dashboard
                </Button>
              </div>

              {import.meta.env.MODE === "development" && (
                <div className="mt-4 text-start">
                  <small className="text-muted d-block">Debug Info:</small>
                  <code className="small text-danger d-block mt-1">
                    {this.state.error?.toString()}
                  </code>
                </div>
              )}
            </Card.Body>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

export default NavigationErrorBoundary;
