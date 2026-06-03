import React, { memo, useCallback, useMemo, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigation } from "../../../hooks/useNavigation";
import { useProfile } from "../contexts/ProfileContext";
import { MAX_HEIGHTS } from "../../../constants/layout";
import NotificationBadge from "./NotificationBadge";
import NotificationItem from "./NotificationItem";
import { FaBell, FaArrowRight } from "react-icons/fa";

// Inject keyframes once into <head>
if (typeof document !== "undefined" && !document.getElementById("notification-dropdown-styles")) {
  const styleEl = document.createElement("style");
  styleEl.id = "notification-dropdown-styles";
  styleEl.textContent = `
    @keyframes dropdownSlideIn {
      from { opacity: 0; transform: scale(0.92) translateY(-8px); }
      to   { opacity: 1; transform: scale(1)   translateY(0); }
    }
  `;
  document.head.appendChild(styleEl);
}

const NotificationDropdown = memo(function NotificationDropdown() {
  const { notifications } = useProfile();
  const { navigateTo } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 70, right: 0, width: 360 });
  const [isAnimating, setIsAnimating] = useState(false);
  const btnRef = useRef(null);

  const { safeNotifications, unreadCount } = useMemo(() => {
    const safeNotifs = Array.isArray(notifications) ? notifications : [];
    const unread = safeNotifs.filter((n) => n.status === 1).length;
    return { safeNotifications: safeNotifs, unreadCount: unread };
  }, [notifications]);

  const handleToggle = useCallback(() => {
    if (!isDropdownOpen && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dropdownWidth = Math.min(360, window.innerWidth - 24);
      const rightOffset = window.innerWidth - rect.right;
      setDropdownPos({
        top: rect.bottom + 8,
        right: Math.max(12, rightOffset - 4),
        width: dropdownWidth,
      });
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
    setIsDropdownOpen((prev) => !prev);
  }, [isDropdownOpen]);

  const handleNavigate = useCallback(() => {
    setIsDropdownOpen(false);
    navigateTo("notificationPage");
  }, [navigateTo]);

  useEffect(() => {
    if (!isDropdownOpen) return;
    const onKey = (e) => { if (e.key === "Escape") setIsDropdownOpen(false); };
    const onOutside = (e) => {
      if (!e.target.closest(".notification-dropdown") &&
          !e.target.closest(".nd-panel")) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [isDropdownOpen]);


  return (
    <li className="nav-item notification-dropdown" style={{ position: "relative" }}>
      <button
        ref={btnRef}
        className="btn btn-link p-0 border-0 text-white position-relative shadow-none"
        onClick={handleToggle}
        aria-expanded={isDropdownOpen}
        aria-haspopup="true"
        aria-label="Notifikasi"
        style={{ transition: "opacity 0.15s" }}
      >
        <NotificationBadge unreadCount={unreadCount} ariaExpanded={isDropdownOpen} />
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
              className="nd-panel"
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
                animation: isAnimating ? "dropdownSlideIn 0.25s cubic-bezier(0.34,1.56,0.64,1)" : "none",
              }}
              onClick={(e) => e.stopPropagation()}
            >


              {/* Header */}
              <div
                style={{
                  background: "linear-gradient(135deg, #02113d 0%, #1e3a8a 100%)",
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
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
                    <FaBell size={15} color="#ffffff" />
                  </div>
                  <div>
                    <div style={{ color: "#ffffff", fontWeight: 700, fontSize: 14 }}>
                      Notifikasi
                    </div>
                    {unreadCount > 0 && (
                      <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 11 }}>
                        {unreadCount} belum dibaca
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={handleNavigate}
                  style={{
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.2)",
                    borderRadius: "8px",
                    padding: "6px 12px",
                    color: "#ffffff",
                    fontSize: 12,
                    fontWeight: 600,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    transition: "background 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.25)")}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "rgba(255,255,255,0.15)")}
                >
                  Semua <FaArrowRight size={10} />
                </button>
              </div>

              {/* Unread count bar */}
              {unreadCount > 0 && (
                <div
                  style={{
                    background: "#eff6ff",
                    borderBottom: "1px solid #bfdbfe",
                    padding: "8px 20px",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: "50%",
                      background: "#3b82f6",
                      boxShadow: "0 0 0 3px rgba(59,130,246,0.2)",
                    }}
                  />
                  <span style={{ fontSize: 12, color: "#1e40af", fontWeight: 600 }}>
                    {unreadCount} notifikasi baru menunggu
                  </span>
                </div>
              )}

              {/* List */}
              <div style={{ maxHeight: MAX_HEIGHTS.NOTIFICATION_LIST, overflowY: "auto" }}>
                {safeNotifications.length === 0 ? (
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
                        background: "#f1f5f9",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <FaBell size={24} color="#cbd5e1" />
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, color: "#475569", fontSize: 14 }}>
                        Tidak ada notifikasi
                      </div>
                      <div style={{ color: "#94a3b8", fontSize: 12, marginTop: 4 }}>
                        Semua notifikasi sudah dibaca
                      </div>
                    </div>
                  </div>
                ) : (
                  safeNotifications.map((notif) => (
                    <NotificationItem
                      key={notif.id}
                      notif={notif}
                      onClick={() => {
                        setIsDropdownOpen(false);
                        navigateTo("notificationPage");
                      }}
                    />
                  ))
                )}
              </div>

              {/* Footer */}
              {safeNotifications.length > 0 && (
                <div
                  style={{
                    padding: "12px 20px",
                    borderTop: "1px solid #f1f5f9",
                    background: "#fafafa",
                  }}
                >
                  <button
                    onClick={handleNavigate}
                    style={{
                      width: "100%",
                      padding: "10px",
                      borderRadius: "10px",
                      border: "1.5px solid #e2e8f0",
                      background: "#ffffff",
                      color: "#2563eb",
                      fontWeight: 700,
                      fontSize: 13,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: 6,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "#eff6ff";
                      e.currentTarget.style.borderColor = "#93c5fd";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "#ffffff";
                      e.currentTarget.style.borderColor = "#e2e8f0";
                    }}
                  >
                    Lihat Semua Notifikasi <FaArrowRight size={11} />
                  </button>
                </div>
              )}
            </div>
          </>,
          document.body,
        )}
    </li>
  );
});

export default NotificationDropdown;
