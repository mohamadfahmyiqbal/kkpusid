import React from "react";

export default function Loading({
  size = "1.5rem",
  color = "#fff",
  className = "",
}) {
  return (
    <span
      className={`spinner-border ${className}`}
      style={{ width: size, height: size, color }}
      role="status"
      aria-hidden="true"
    ></span>
  );
}
