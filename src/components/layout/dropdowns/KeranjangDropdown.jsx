// src/components/layout/dropdowns/KeranjangDropdown.jsx

import React, {
  memo,
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Spinner } from "react-bootstrap";
import {
  FaFileInvoiceDollar,
  FaCheckCircle,
  FaChevronRight,
  FaExclamationTriangle,
  FaArrowRight,
  FaCalendarAlt,
  FaExclamationCircle,
} from "react-icons/fa";
import { useNavigation } from "../../../hooks/useNavigation";
import { useProfile } from "../contexts/ProfileContext";
import { sanitizeText, safeDateOnlyFormat } from "../../../utils/sanitization";
import { MAX_HEIGHTS } from "../../../constants/layout";
import "./KeranjangDropdown.css";

const KeranjangDropdown = memo(function KeranjangDropdown() {
  const { bills, loading } = useProfile();
  const { navigateTo } = useNavigation();
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 70, right: 0, width: 340 });
  const [isAnimating, setIsAnimating] = useState(false);
  const btnRef = useRef(null);

  const safeBills = useMemo(() => Array.isArray(bills) ? bills : [], [bills]);

  const formatIDR = useMemo(() => new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }), []);

  const safeFormatIDR = useCallback(
    (val) => {
      try { return formatIDR.format(val || 0); }
      catch { return "Rp 0"; }
    },
    [formatIDR],
  );

  const safeItemData = useCallback((item) => {
    if (!item || typeof item !== "object") {
      return { id: "unknown", description: "Data tidak tersedia", amount: 0, due_date: null };
    }
    return {
      id: item.bill_item_id || item.id || `unknown-${Date.now()}`,
      description: sanitizeText(item.description) || "Tanpa deskripsi",
      amount: Number(item.amount) || 0,
      due_date: item.due_date,
    };
  }, []);

  useEffect(() => {
    if (error && Array.isArray(bills)) setError(null);
  }, [bills, error]);

  const handleNavigate = useCallback(() => {
    setIsDropdownOpen(false);
    navigateTo("billingPage");
  }, [navigateTo]);

  const handleToggle = useCallback(() => {
    if (!isDropdownOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = Math.min(340, window.innerWidth - 24);
      setDropdownPos({
        top: rect.bottom + 8,
        right: Math.max(12, window.innerWidth - rect.right - 4),
        width: dropdownWidth,
      });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    setIsDropdownOpen((prev) => !prev);
  }, [isDropdownOpen]);

  useEffect(() => {
    if (!isDropdownOpen) return;
    
    const onKey = (e) => { if (e.key === "Escape") setIsDropdownOpen(false); };
    
    const updatePos = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const dropdownWidth = Math.min(340, window.innerWidth - 24);
        setDropdownPos({
          top: rect.bottom + 8,
          right: Math.max(12, window.innerWidth - rect.right - 4),
          width: dropdownWidth,
        });
      }
    };

    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    document.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
      document.removeEventListener("keydown", onKey);
    };
  }, [isDropdownOpen]);

  const { overdueBills } = useMemo(() => {
    const now = new Date();
    const overdue = safeBills.filter((b) => b.due_date && new Date(b.due_date) < now);
    return { overdueBills: overdue };
  }, [safeBills]);

  const totalAmount = useMemo(
    () => safeBills.reduce((sum, b) => sum + (Number(b.amount) || 0), 0),
    [safeBills],
  );

  return (
    <li className="nav-item keranjang-dropdown-container">
      <button
        ref={btnRef}
        className="btn btn-link p-0 border-0 text-white keranjang-btn"
        onClick={handleToggle}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Tagihan"
      >
        <FaFileInvoiceDollar size={18} />
        {safeBills.length > 0 && (
          <span className={`kd-badge ${overdueBills.length > 0 ? "kd-badge-danger" : "kd-badge-warning"}`}>
            {safeBills.length}
          </span>
        )}
      </button>

      {isDropdownOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              style={{ position: "fixed", inset: 0, zIndex: 1040, backgroundColor: "transparent" }}
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Panel */}
            <div
              className={`kd-panel ${isAnimating ? "animating-in" : ""}`}
              style={{
                top: dropdownPos.top,
                right: dropdownPos.right,
                width: dropdownPos.width,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="kd-header">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div className="kd-header-icon-wrap">
                      <FaFileInvoiceDollar size={15} color="#ffffff" />
                    </div>
                    <div>
                      <div className="kd-header-title">Tagihan Pending</div>
                      <div className="kd-header-subtitle">
                        {safeBills.length > 0 ? `${safeBills.length} tagihan aktif` : "Tidak ada tagihan"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button onClick={handleNavigate} className="kd-btn-outline">
                      Semua
                    </button>
                    {safeBills.length > 0 && (
                      <button onClick={handleNavigate} className="kd-btn-solid">
                        Bayar <FaArrowRight size={10} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Total amount pill */}
                {safeBills.length > 0 && (
                  <div className="kd-total-pill">
                    <span className="kd-total-label">Total Tagihan</span>
                    <span className="kd-total-value">{safeFormatIDR(totalAmount)}</span>
                  </div>
                )}
              </div>

              {/* Overdue warning */}
              {overdueBills.length > 0 && (
                <div className="kd-warning-bar">
                  <FaExclamationCircle size={13} color="#ef4444" />
                  <span className="kd-warning-text">
                    {overdueBills.length} tagihan sudah melewati jatuh tempo!
                  </span>
                </div>
              )}

              {/* List */}
              <div style={{ maxHeight: MAX_HEIGHTS.KERANJANG_LIST, overflowY: "auto" }}>
                {loading ? (
                  <div style={{ padding: "32px 20px", textAlign: "center" }}>
                    <Spinner animation="border" size="sm" className="me-2" />
                    <span style={{ color: "#64748b", fontSize: 13 }}>Memuat tagihan...</span>
                  </div>
                ) : error ? (
                  <div style={{ padding: "32px 20px", textAlign: "center" }}>
                    <FaExclamationTriangle color="#f59e0b" size={28} />
                    <p style={{ color: "#64748b", fontSize: 13, margin: "8px 0" }}>{error}</p>
                    <button
                      onClick={() => setError(null)}
                      style={{
                        border: "1px solid #e2e8f0",
                        borderRadius: "8px",
                        padding: "6px 16px",
                        background: "#fff",
                        cursor: "pointer",
                        fontSize: 13,
                        color: "#475569",
                      }}
                    >
                      Coba lagi
                    </button>
                  </div>
                ) : safeBills.length === 0 ? (
                  <div className="kd-empty-state">
                    <div className="kd-empty-icon">
                      <FaCheckCircle size={28} color="#059669" />
                    </div>
                    <div>
                      <div className="kd-empty-title">Semua Tagihan Lunas! 🎉</div>
                      <div className="kd-empty-subtitle">Tidak ada tagihan yang perlu dibayar</div>
                    </div>
                  </div>
                ) : (
                  safeBills.map((item) => {
                    const safeData = safeItemData(item);
                    const now = new Date();
                    const isOverdue = safeData.due_date && new Date(safeData.due_date) < now;
                    const isDueSoon = !isOverdue && safeData.due_date &&
                      new Date(safeData.due_date) <= new Date(Date.now() + 3 * 86400000);
                    
                    let iconClass = "default";
                    let dateClass = "default";
                    if (isOverdue) {
                      iconClass = "danger";
                      dateClass = "danger";
                    } else if (isDueSoon) {
                      iconClass = "warning";
                      dateClass = "warning";
                    }

                    return (
                      <button
                        key={safeData.id}
                        type="button"
                        onClick={handleNavigate}
                        className={`kd-item ${isOverdue ? "overdue" : ""}`}
                      >
                        <div className={`kd-item-icon ${iconClass}`}>
                          {isOverdue
                            ? <FaExclamationCircle size={16} color="#ef4444" />
                            : isDueSoon
                            ? <FaCalendarAlt size={16} color="#d97706" />
                            : <FaFileInvoiceDollar size={16} color="#3b82f6" />
                          }
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div className="kd-item-title">{safeData.description}</div>
                          {safeData.due_date && (
                            <div className={`kd-item-date ${dateClass}`}>
                              <FaCalendarAlt size={9} />
                              {isOverdue ? "Terlambat: " : "Jatuh tempo: "}
                              {safeDateOnlyFormat(safeData.due_date)}
                            </div>
                          )}
                        </div>

                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <div className="kd-item-amount">{safeFormatIDR(safeData.amount)}</div>
                          <FaChevronRight size={10} color="#cbd5e1" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer CTA */}
              <div className="kd-footer">
                <button onClick={handleNavigate} className="kd-footer-btn-secondary">
                  Semua Tagihan
                </button>
                {safeBills.length > 0 && (
                  <button onClick={handleNavigate} className="kd-footer-btn-primary">
                    Bayar Sekarang <FaArrowRight size={11} />
                  </button>
                )}
              </div>
            </div>
          </>,
          document.body,
        )}
    </li>
  );
});

export default KeranjangDropdown;
