import React from "react";
import { Spinner as BSpinner } from "react-bootstrap";
import { colors } from "../../theme/tokens";

/**
 * Spinner standar (ME-03).
 * @param {string} size - "sm" | "md" | "lg"
 * @param {string} variant - "primary" (submit) | "secondary" (fetch) | "light"
 * @param {boolean} reducedMotion - jika true, animasi dinonaktifkan
 * @param {string} message - teks di bawah spinner (opsional)
 * @param {boolean} inline - jika true, render inline
 */
export default function Spinner({
  size = "md",
  variant = "primary",
  reducedMotion = false,
  message,
  inline = false,
  className = "",
}) {
  const ariaLabel = message || "Memuat...";

  if (inline) {
    return (
      <span className={`d-inline-flex align-items-center gap-2 ${className}`}>
        <BSpinner
          animation={reducedMotion ? undefined : "border"}
          size={size === "sm" ? "sm" : undefined}
          variant={variant}
          role="status"
          aria-label={ariaLabel}
        />
        {message && <span className="visually-hidden">{message}</span>}
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
      style={{ minHeight: "200px" }}
    >
      <BSpinner
        animation={reducedMotion ? undefined : "border"}
        variant={variant}
        style={spinnerStyle}
        role="status"
        aria-label={ariaLabel}
      />
      {message && (
        <p className="mt-3 text-muted mb-0 small">{message}</p>
      )}
    </div>
  );
}
