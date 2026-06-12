import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaUserPlus,
  FaBell,
  FaFileInvoiceDollar,
  FaUserCog,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaFileSignature,
  FaChartLine,
  FaGraduationCap,
  FaHome,
  FaQuestionCircle,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
} from "react-icons/fa";
import { MdShoppingCart } from "react-icons/md";

/** Map of icon name strings → React components */
const ICON_MAP = {
  FaUserPlus,
  FaBell,
  FaFileInvoiceDollar,
  FaUserCog,
  FaPiggyBank,
  FaHandHoldingUsd,
  FaExchangeAlt,
  FaFileSignature,
  FaChartLine,
  FaGraduationCap,
  FaHome,
  FaUsers,
  FaClipboardList,
  FaCheckCircle,
  MdShoppingCart,
};

/**
 * Resolve icon prop: if it's a string, look up in ICON_MAP;
 * if it's already a React element, use it directly.
 */
const resolveIcon = (icon, size = 18) => {
  if (!icon) return null;
  if (React.isValidElement(icon)) return icon;
  if (typeof icon === "string") {
    const Component = ICON_MAP[icon];
    if (Component) return <Component size={size} />;
    console.warn(`[PageTitle] Unknown icon name: "${icon}"`);
    return <FaQuestionCircle size={size} />;
  }
  return null;
};

const PageTitle = ({
  title,
  subtitle,
  icon,
  showBackButton = true,
  customBackAction,
  className = "",
  breadcrumbs = [],
}) => {
  const navigate = useNavigate();

  const handleBack = () => {
    if (customBackAction) {
      customBackAction();
    } else {
      navigate(-1);
    }
  };

  const resolvedIcon = useMemo(() => resolveIcon(icon), [icon]);

  return (
    <div
      className={`page-header ${className}`}
      style={{
        paddingBottom: "16px",
        borderBottom: "1.5px solid #f1f5f9",
        marginBottom: "28px",
      }}
    >
      {/* Breadcrumbs */}
      {breadcrumbs.length > 0 && (
        <nav aria-label="breadcrumb" className="mb-2">
          <ol
            className="d-flex align-items-center list-unstyled p-0 m-0"
            style={{
              fontSize: "11px",
              fontWeight: "600",
              letterSpacing: "0.2px",
            }}
          >
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={index}>
                <li
                  className={
                    index === breadcrumbs.length - 1
                      ? "text-dark fw-bold"
                      : ""
                  }
                >
                  {index === breadcrumbs.length - 1 ? (
                    crumb.label
                  ) : (
                    <button
                      className="btn btn-link p-0 text-decoration-none text-primary fw-semibold"
                      style={{
                        fontSize: "11px",
                        border: "none",
                        background: "none",
                        verticalAlign: "baseline",
                        color: "#2563eb",
                      }}
                      onClick={() => navigate(crumb.path)}
                    >
                      {crumb.label}
                    </button>
                  )}
                </li>
                {index < breadcrumbs.length - 1 && (
                  <span
                    className="text-muted mx-2"
                    style={{ fontSize: "9px", opacity: 0.7 }}
                  >
                    {'>'}
                  </span>
                )}
              </React.Fragment>
            ))}
          </ol>
        </nav>
      )}

      <div className="d-flex align-items-center mt-3">
        {/* Back Button */}
        {showBackButton && (
          <button
            className="btn btn-outline-secondary btn-sm me-3 back-button d-flex align-items-center justify-content-center"
            onClick={handleBack}
            aria-label="Kembali"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "10px",
              border: "1.5px solid #e2e8f0",
              backgroundColor: "#ffffff",
              flexShrink: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.borderColor = "#cbd5e1";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.borderColor = "#e2e8f0";
            }}
          >
            <FaArrowLeft size={13} />
          </button>
        )}

        {/* Page Icon in circular badge */}
        {resolvedIcon && (
          <div
            className="rounded-circle d-flex align-items-center justify-content-center me-3 shadow-sm"
            style={{
              width: "48px",
              height: "48px",
              backgroundColor: "#eff6ff",
              color: "#2563eb",
              fontSize: "18px",
              flexShrink: 0,
              border: "1px solid #dbeafe",
            }}
          >
            {resolvedIcon}
          </div>
        )}

        <div className="flex-grow-1">
          <h1
            className="h4 mb-0 fw-bold"
            style={{
              color: "#02113d",
              fontWeight: "700",
              fontSize: "18px",
            }}
          >
            {title}
          </h1>
          {subtitle && (
            <p
              className="text-muted mb-0 mt-1"
              style={{ fontSize: "12px", lineHeight: "1.4" }}
            >
              {subtitle}
            </p>
          )}
        </div>

        {/* Action buttons slot */}
        <div className="page-actions">
          {/* Can be extended with action buttons */}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;