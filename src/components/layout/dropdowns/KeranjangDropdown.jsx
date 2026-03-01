// src/components/layout/KeranjangDropdown.jsx

import React, { memo, useCallback, useMemo, useRef, useEffect } from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import {
  FaShoppingCart,
  FaWallet,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigation } from "../../../hooks/useNavigation";
import { useProfile } from "../contexts";
import { sanitizeText, safeDateOnlyFormat } from "../../../utils/sanitization";
import {
  DROPDOWN_WIDTHS,
  FONT_SIZES,
  MAX_HEIGHTS,
} from "../../../constants/layout";

export default memo(function KeranjangDropdown() {
  const { bills } = useProfile();
  const { navigateTo } = useNavigation();
  const dropdownRef = useRef(null);

  // Memoize safe bills to prevent recalculation
  const safeBills = useMemo(() => {
    return Array.isArray(bills) ? bills : [];
  }, [bills]);

  // Memoize format function to prevent recreation
  const formatIDR = useCallback(
    (val) =>
      new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
      }).format(val || 0),
    [],
  );

  const handleNavigate = useCallback(() => {
    navigateTo("billingPage");
  }, [navigateTo]);

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && dropdownRef.current) {
        dropdownRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <NavDropdown
      as="li"
      id="dropdown-keranjang"
      align="end"
      className="nav-item keranjang-dropdown"
      ref={dropdownRef}
      title={
        <div className="position-relative text-white">
          <FaShoppingCart size={18} />
          {safeBills.length > 0 && (
            <Badge
              bg="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: FONT_SIZES.BADGE }}
              aria-label={`${safeBills.length} pending bills`}
            >
              {safeBills.length}
            </Badge>
          )}
        </div>
      }
    >
      <div
        className="keranjang-dropdown-content"
        style={{ width: DROPDOWN_WIDTHS.KERANJANG }}
      >
        <div className="p-3 bg-light border-bottom fw-bold text-dark">
          <FaWallet className="me-2" /> Tagihan Pending
        </div>
        <div
          style={{ maxHeight: MAX_HEIGHTS.KERANJANG_LIST, overflowY: "auto" }}
        >
          {safeBills.length === 0 ? (
            <div className="p-4 text-center">
              <FaCheckCircle className="text-success mb-2" size={24} />
              <p className="text-muted small mb-0">Semua tagihan lunas!</p>
            </div>
          ) : (
            safeBills.map((item) => (
              <button
                key={item.bill_item_id || item.id}
                type="button"
                className="p-3 border-bottom d-flex justify-content-between align-items-start w-100 text-start border-0 bg-transparent keranjang-item transition-all duration-200"
                onClick={handleNavigate}
                aria-label={`View bill: ${sanitizeText(item.description)} - ${formatIDR(item.amount)}`}
              >
                <div className="flex-grow-1 pe-3">
                  <div className="fw-bold small text-dark text-truncate">
                    {sanitizeText(item.description)}
                  </div>
                  <small
                    className="text-danger"
                    style={{ fontSize: FONT_SIZES.TINY }}
                  >
                    {safeDateOnlyFormat(item.due_date)}
                  </small>
                </div>
                <div className="flex-shrink-0 fw-bold text-primary small">
                  {formatIDR(item.amount)}
                </div>
              </button>
            ))
          )}
        </div>
        {safeBills.length > 0 && (
          <div className="p-2 border-top text-center">
            <button
              className="btn btn-link btn-sm text-decoration-none fw-bold text-primary hover:text-primary-dark transition-colors duration-200"
              onClick={handleNavigate}
              aria-label="View all pending bills"
            >
              Lihat Semua <FaChevronRight size={10} />
            </button>
          </div>
        )}
      </div>
    </NavDropdown>
  );
});
