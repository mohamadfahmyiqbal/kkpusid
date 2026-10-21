import React from 'react';
import { Button } from 'react-bootstrap';
import { FaExclamationCircle } from 'react-icons/fa';

/**
 * Reusable ErrorState component with optional retry action
 * @param {string} title - Error heading
 * @param {string} message - Error explanation message
 * @param {function} onRetry - Optional callback function for retry button
 * @param {string} retryText - Text for retry button (defaults to "Coba Lagi")
 * @param {string} minHeight - Minimum container height
 * @param {string} className - Additional CSS class names
 */
export const ErrorState = ({
  title = "Gagal Memuat Data",
  message = "Terjadi kesalahan saat memproses data. Silakan coba beberapa saat lagi.",
  onRetry,
  retryText = "Coba Lagi",
  minHeight = "200px",
  className = "",
}) => {
  return (
    <div
      className={`text-center py-5 d-flex flex-column align-items-center justify-content-center ${className}`}
      style={{ minHeight }}
    >
      <FaExclamationCircle
        className="text-danger mb-3"
        style={{ fontSize: "3rem" }}
      />
      <h5 className="fw-bold mb-2">{title}</h5>
      {message && <p className="text-muted mb-3 max-w-md">{message}</p>}
      {onRetry && (
        <Button variant="outline-primary" size="sm" onClick={onRetry} className="px-4">
          {retryText}
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
