import React from 'react';
import { Spinner } from 'react-bootstrap';

/**
 * Reusable LoadingState component
 * @param {string} message - Optional text to display beneath the spinner
 * @param {string} size - Spinner size ('sm', 'md', 'lg')
 * @param {string} variant - Bootstrap variant color (primary, success, light, etc.)
 * @param {string|number} minHeight - Minimum container height (e.g. '200px', '50vh')
 * @param {string} className - Additional CSS class names
 */
export const LoadingState = ({
  message = "Memuat data...",
  size = "md",
  variant = "primary",
  minHeight = "200px",
  className = "",
  inline = false,
}) => {
  if (inline) {
    return (
      <span className={`d-inline-flex align-items-center gap-2 ${className}`}>
        <Spinner animation="border" size="sm" variant={variant} role="status" />
        {message && <span>{message}</span>}
      </span>
    );
  }

  const spinnerStyle =
    size === "lg"
      ? { width: "3rem", height: "3rem" }
      : size === "sm"
      ? { width: "1.25rem", height: "1.25rem" }
      : { width: "2rem", height: "2rem" };

  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center py-4 ${className}`}
      style={{ minHeight }}
    >
      <Spinner
        animation="border"
        variant={variant}
        style={spinnerStyle}
        role="status"
      />
      {message && <p className="mt-3 text-muted mb-0 small">{message}</p>}
    </div>
  );
};

export default LoadingState;
