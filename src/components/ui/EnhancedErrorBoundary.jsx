import React, { Component } from "react";
import { FaExclamationTriangle, FaSync, FaHome } from "react-icons/fa";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorId: null,
      retryCount: 0,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      errorInfo,
    });

    // Log error to monitoring service
    this.logError(error, errorInfo);
  }

  logError = (error, errorInfo) => {
    const { errorId } = this.state;

    const errorData = {
      errorId,
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.getUserId(),
      sessionId: this.getSessionId(),
    };

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.error("Error Boundary caught an error:", errorData);
    }

    // Send to monitoring service (you can replace with your service)
    this.sendToMonitoring(errorData);
  };

  getUserId = () => {
    try {
      const user = JSON.parse(localStorage.getItem("userData") || "{}");
      return user.id || user.member_id || "anonymous";
    } catch {
      return "anonymous";
    }
  };

  getSessionId = () => {
    let sessionId = sessionStorage.getItem("sessionId");
    if (!sessionId) {
      sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      sessionStorage.setItem("sessionId", sessionId);
    }
    return sessionId;
  };

  sendToMonitoring = async (errorData) => {
    try {
      // Replace with your monitoring service endpoint
      // await fetch('/api/errors', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(errorData),
      // });

      // For now, store in localStorage for debugging
      const errors = JSON.parse(localStorage.getItem("errorLogs") || "[]");
      errors.push(errorData);

      // Keep only last 50 errors
      if (errors.length > 50) {
        errors.splice(0, errors.length - 50);
      }

      localStorage.setItem("errorLogs", JSON.stringify(errors));
    } catch (err) {
      console.error("Failed to send error to monitoring:", err);
    }
  };

  handleRetry = () => {
    const { retryCount } = this.state;
    const { maxRetries = 3 } = this.props;

    if (retryCount < maxRetries) {
      this.setState((prevState) => ({
        hasError: false,
        error: null,
        errorInfo: null,
        retryCount: prevState.retryCount + 1,
      }));
    }
  };

  handleGoHome = () => {
    window.location.href = "/dashboard";
  };

  render() {
    const { hasError, error, errorId, retryCount } = this.state;
    const { children, fallback, maxRetries = 3 } = this.props;

    if (hasError) {
      if (fallback) {
        return fallback({
          error,
          errorId,
          retry: this.handleRetry,
          goHome: this.handleGoHome,
        });
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
          <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 text-center">
            <div className="mb-4">
              <FaExclamationTriangle className="mx-auto text-5xl text-red-500 dark:text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Terjadi Kesalahan
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Maaf, terjadi kesalahan yang tidak terduga. Tim kami telah
              diberitahu tentang masalah ini.
            </p>

            <div className="bg-gray-100 dark:bg-gray-700 rounded p-3 mb-6 text-left">
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>ID Error:</strong> {errorId}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-1">
                <strong>Waktu:</strong> {new Date().toLocaleString("id-ID")}
              </p>
              {retryCount > 0 && (
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  <strong>Percobaan:</strong> {retryCount}/{maxRetries}
                </p>
              )}
            </div>

            {import.meta.env.MODE === "development" && error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Detail Error (Development)
                </summary>
                <pre className="text-xs bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-300 p-2 rounded overflow-auto max-h-32">
                  {error.toString()}
                  {error.stack}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3">
              {retryCount < maxRetries && (
                <button
                  onClick={this.handleRetry}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  <FaSync className="text-sm" />
                  Coba Lagi
                </button>
              )}

              <button
                onClick={this.handleGoHome}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
              >
                <FaHome className="text-sm" />
                ke Dashboard
              </button>
            </div>

            <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
              Jika masalah berlanjut, hubungi tim support dengan ID Error di
              atas.
            </div>
          </div>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
