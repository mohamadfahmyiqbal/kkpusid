import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const PageTitle = ({
  title,
  subtitle,
  showBackButton = true,
  customBackAction,
  className = "",
  breadcrumbs = [],
}) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      navigate(-1);
    }
  };

  return (
    <div className={`page-header ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            {breadcrumbs.map((crumb, index) => (
              <li
                key={index}
                className={`breadcrumb-item ${index === breadcrumbs.length - 1 ? "active" : ""}`}
              >
                {index === breadcrumbs.length - 1 ? (
                  crumb.label
                ) : (
                  <button
                    className="btn btn-link p-0 text-decoration-none"
                    onClick={() => navigate(crumb.path)}
                  >
                    {crumb.label}
                  </button>
                )}
              </li>
            ))}
          </ol>
        </nav>
      )}

      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          {showBackButton && (
            <button
              className="btn btn-outline-secondary btn-sm me-3 back-button d-flex align-items-center justify-content-center"
              onClick={handleBack}
              aria-label="Kembali"
            >
              <FaArrowLeft size={14} />
            </button>
          )}

          <div>
            <h1 className="h3 mb-1 fw-bold">{title}</h1>
            {subtitle && <p className="text-muted mb-0">{subtitle}</p>}
          </div>
        </div>

        {/* Optional: Action buttons slot */}
        <div className="page-actions">
          {/* Can be extended with action buttons */}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
