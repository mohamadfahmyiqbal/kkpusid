import React from "react";

const SkeletonLoader = ({ size = "small", className = "" }) => {
  const sizeClasses = {
    small: "skeleton-loader-small",
    medium: "skeleton-loader-medium",
    large: "skeleton-loader-large",
  };

  return (
    <div
      className={`skeleton-loader ${sizeClasses[size]} ${className}`}
      role="presentation"
      aria-hidden="true"
    />
  );
};

export default SkeletonLoader;
