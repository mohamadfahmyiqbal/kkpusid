// src/components/layout/KeranjangDropdown.jsx

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
import { useProfile } from "../contexts";
import { sanitizeText, safeDateOnlyFormat } from "../../../utils/sanitization";
import { FONT_SIZES, MAX_HEIGHTS } from "../../../constants/layout";

// Styles injected once at module level - avoids invalid HTML inside <button>
const KERANJANG_STYLES = `
  @keyframes pulseBadge {
    0%, 100% { box-shadow: 0 0 0 2px rgba(255,255,255,0.3), 0 2px 6px rgba(239,68,68,0.4); }
    50% { box-shadow: 0 0 0 5px rgba(255,255,255,0.1), 0 2px 12px rgba(239,68,68,0.7); }
  }
  @keyframes dropdownSlideInKeranjang {
    from { opacity: 0; transform: scale(0.92) translateY(-8px); }
    to   { opacity: 1; transform: scale(1)   translateY(0); }
  }
`;

// Inject styles once into <head>
if (typeof document !== "undefined" && !document.getElementById("keranjang-dropdown-styles")) {
  const styleEl = document.createElement("style");
  styleEl.id = "keranjang-dropdown-styles";
  styleEl.textContent = KERANJANG_STYLES;
  document.head.appendChild(styleEl);
}

export default memo(function KeranjangDropdown() {
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
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
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

  const badgeStyle = {
    position: "absolute",
    top: -6,
    right: -8,
    minWidth: 18,
    height: 18,
    borderRadius: 9,
    background: overdueBills.length > 0 ? "#ef4444" : "#f59e0b",
    color: "#ffffff",
    fontSize: 10,
    fontWeight: 700,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 4px",
    animation: overdueBills.length > 0 ? "pulseBadge 2s infinite" : "none",
  };

  return (
    <li className="nav-item keranjang-dropdown" style={{ position: "relative" }}>
      <button
        ref={btnRef}
        className="btn btn-link p-0 border-0 text-white position-relative"
        onClick={handleToggle}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Tagihan"
        style={{ transition: "opacity 0.15s" }}
      >
        <FaFileInvoiceDollar size={18} />
        {safeBills.length > 0 && (
          <span style={badgeStyle}>
            {safeBills.length}
          </span>
        )}
      </button>

      {isDropdownOpen &&
        createPortal(
          <>
            {/* Backdrop */}
            <div
              style={{ position: "fixed", inset: 0, zIndex: 9999998, backgroundColor: "transparent" }}
              onClick={() => setIsDropdownOpen(false)}
            />

            {/* Panel */}
            <div
              style={{
                position: "fixed",
                top: dropdownPos.top,
                right: dropdownPos.right,
                width: dropdownPos.width,
                zIndex: 9999999,
                backgroundColor: "#ffffff",
                borderRadius: "16px",
                boxShadow: "0 20px 60px rgba(0,0,0,0.15), 0 4px 16px rgba(0,0,0,0.08)",
                border: "1px solid rgba(0,0,0,0.06)",
                overflow: "hidden",
                transformOrigin: "top right",
                animation: isAnimating ? "dropdownSlideInKeranjang 0.25s cubic-bezier(0.34,1.56,0.64,1)" : "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                style={{
                  background: "linear-gradient(135deg, #02113d 0%, #1e3a8a 100%)",
                  padding: "16px 20px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "10px",
                        background: "rgba(255,255,255,0.15)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaFileInvoiceDollar size={15} color="#ffffff" />
                    </div>
                    <div>
                      <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 14 }}>
                        Tagihan Pending
                      </div>
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
                        {safeBills.length > 0 ? `${safeBills.length} tagihan aktif` : "Tidak ada tagihan"}
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <button
                      onClick={handleNavigate}
                      style={{
                        background: "rgba(255,255,255,0.12)",
                        border: "1px solid rgba(255,255,255,0.2)",
                        borderRadius: "8px",
                        padding: "6px 12px",
                        color: "rgba(255,255,255,0.85)",
                        fontSize: 12,
                        fontWeight: 600,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        transition: "background 0.15s",
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.22)")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.12)")}
                    >
                      Semua
                    </button>
                    {safeBills.length > 0 && (
                      <button
                        onClick={handleNavigate}
                        style={{
                          background: "rgba(255,255,255,0.9)",
                          border: "1px solid rgba(255,255,255,0.3)",
                          borderRadius: "8px",
                          padding: "6px 12px",
                          color: "#02113d",
                          fontSize: 12,
                          fontWeight: 700,
                          cursor: "pointer",
                          display: "flex",
                          alignItems: "center",
                          gap: 5,
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = "#ffffff")}
                        onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.9)")}
                      >
                        Bayar <FaArrowRight size={10} />
                      </button>
                    )}
                  </div>
                </div>

                {/* Total amount pill */}
                {safeBills.length > 0 && (
                  <div
                    style={{
                      marginTop: 12,
                      background: "rgba(255,255,255,0.1)",
                      borderRadius: "10px",
                      padding: "10px 14px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <span style={{ color: "rgba(255,255,255,0.75)", fontSize: 12 }}>
                      Total Tagihan
                    </span>
                    <span style={{ color: "#ffffff", fontWeight: 800, fontSize: 16 }}>
                      {safeFormatIDR(totalAmount)}
                    </span>
                  </div>
                )}
              </div>

              {/* Overdue warning */}
              {overdueBills.length > 0 && (
                <div
                  style={{
                    background: "#fff5f5",
                    borderBottom: "1px solid #fecaca",
                    padding: "8px 16px",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <FaExclamationCircle size={13} color="#ef4444" />
                  <span style={{ fontSize: 12, color: "#dc2626", fontWeight: 600 }}>
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
                  <div
                    style={{
                      padding: "40px 20px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      gap: 12,
                    }}
                  >
                    <div
                      style={{
                        width: 64,
                        height: 64,
                        borderRadius: "50%",
                        background: "linear-gradient(135deg, #d1fae5, #a7f3d0)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaCheckCircle size={28} color="#059669" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, color: "#1e293b", fontSize: 14 }}>
                        Semua Tagihan Lunas! 🎉
                      </div>
                      <div style={{ color: "#64748b", fontSize: 12, marginTop: 4 }}>
                        Tidak ada tagihan yang perlu dibayar
                      </div>
                    </div>
                  </div>
                ) : (
                  safeBills.map((item) => {
                    const safeData = safeItemData(item);
                    const now = new Date();
                    const isOverdue = safeData.due_date && new Date(safeData.due_date) < now;
                    const isDueSoon = !isOverdue && safeData.due_date &&
                      new Date(safeData.due_date) <= new Date(Date.now() + 3 * 86400000);
                    return (
                      <button
                        key={safeData.id}
                        type="button"
                        onClick={handleNavigate}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          width: "100%",
                          padding: "12px 16px",
                          border: "none",
                          borderBottom: "1px solid #f1f5f9",
                          background: isOverdue ? "#fff5f5" : "#ffffff",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.background = "#f8fafc"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.background = isOverdue ? "#fff5f5" : "#ffffff"; }}
                      >
                        <div
                          style={{
                            width: 40,
                            height: 40,
                            borderRadius: "12px",
                            background: isOverdue
                              ? "linear-gradient(135deg, #fee2e2, #fecaca)"
                              : isDueSoon
                              ? "linear-gradient(135deg, #fef3c7, #fde68a)"
                              : "linear-gradient(135deg, #eff6ff, #dbeafe)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexShrink: 0,
                          }}
                        >
                          {isOverdue
                            ? <FaExclamationCircle size={16} color="#ef4444" />
                            : isDueSoon
                            ? <FaCalendarAlt size={16} color="#d97706" />
                            : <FaFileInvoiceDollar size={16} color="#3b82f6" />
                          }
                        </div>

                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div
                            style={{
                              fontSize: 13,
                              fontWeight: 600,
                              color: "#1e293b",
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {safeData.description}
                          </div>
                          {safeData.due_date && (
                            <div
                              style={{
                                fontSize: 11,
                                color: isOverdue ? "#ef4444" : isDueSoon ? "#d97706" : "#94a3b8",
                                marginTop: 2,
                                display: "flex",
                                alignItems: "center",
                                gap: 4,
                              }}
                            >
                              <FaCalendarAlt size={9} />
                              {isOverdue ? "Terlambat: " : "Jatuh tempo: "}
                              {safeDateOnlyFormat(safeData.due_date)}
                            </div>
                          )}
                        </div>

                        <div style={{ flexShrink: 0, textAlign: "right" }}>
                          <div style={{ fontWeight: 700, fontSize: 13, color: "#1e293b" }}>
                            {safeFormatIDR(safeData.amount)}
                          </div>
                          <FaChevronRight size={10} color="#cbd5e1" />
                        </div>
                      </button>
                    );
                  })
                )}
              </div>

              {/* Footer CTA */}
              <div
                style={{
                  padding: "12px 16px",
                  borderTop: "1px solid #f1f5f9",
                  background: "#fafafa",
                  display: "flex",
                  gap: 8,
                }}
              >
                {/* Tombol Semua — selalu tampil */}
                <button
                  onClick={handleNavigate}
                  style={{
                    flex: 1,
                    padding: "10px",
                    borderRadius: "10px",
                    border: "1.5px solid #e2e8f0",
                    background: "#ffffff",
                    color: "#334155",
                    fontWeight: 600,
                    fontSize: 13,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "#f1f5f9";
                    e.currentTarget.style.borderColor = "#cbd5e1";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "#ffffff";
                    e.currentTarget.style.borderColor = "#e2e8f0";
                  }}
                >
                  Semua Tagihan
                </button>

                {/* Tombol Bayar — hanya tampil jika ada tagihan */}
                {safeBills.length > 0 && (
                  <button
                    onClick={handleNavigate}
                    style={{
                      flex: 1,
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                      background: "linear-gradient(135deg, #02113d 0%, #1e3a8a 100%)",
                      color: "#ffffff",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      boxShadow: "0 4px 12px rgba(2,17,61,0.25)",
                      transition: "opacity 0.15s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.9")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
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
