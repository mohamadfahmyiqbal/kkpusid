import React, { memo, useCallback, useMemo, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import NotificationDetailModal from "./NotificationDetailModal";
import { useNavigation } from "../../../hooks/useNavigation";
import { useProfile } from "../contexts/ProfileContext";
import { MAX_HEIGHTS } from "../../../constants/layout";
import NotificationBadge from "./NotificationBadge";
import NotificationItem from "./NotificationItem";
import { FaBell, FaArrowRight } from "react-icons/fa";
import "./NotificationDropdown.css";

const NotificationDropdown = memo(function NotificationDropdown() {
  const { notifications, markNotificationAsRead } = useProfile();
  const { navigateTo } = useNavigation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownPos, setDropdownPos] = useState({ top: 70, right: 0, width: 360 });
  const [isAnimating, setIsAnimating] = useState(false);
  const [selectedNotif, setSelectedNotif] = useState(null);
  const [showModal, setShowModal] = useState(false);
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
    
    // Auto update position on resize/scroll to prevent detachment
    const updatePos = () => {
      if (btnRef.current) {
        const rect = btnRef.current.getBoundingClientRect();
        const dropdownWidth = Math.min(360, window.innerWidth - 24);
        const rightOffset = window.innerWidth - rect.right;
        setDropdownPos({
          top: rect.bottom + 8,
          right: Math.max(12, rightOffset - 4),
          width: dropdownWidth,
        });
      }
    };
    
    const onOutside = (e) => {
      if (!e.target.closest(".notification-dropdown") &&
          !e.target.closest(".nd-panel")) {
        setIsDropdownOpen(false);
      }
    };

    window.addEventListener("scroll", updatePos, true);
    window.addEventListener("resize", updatePos);
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onOutside);
    return () => {
      window.removeEventListener("scroll", updatePos, true);
      window.removeEventListener("resize", updatePos);
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onOutside);
    };
  }, [isDropdownOpen]);


  return (
    <li className="nav-item notification-dropdown-container">
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

      {isDropdownOpen && createPortal(
        <>
          {/* Backdrop */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 1040, backgroundColor: "transparent" }}
            onClick={() => setIsDropdownOpen(false)}
          />
          <div
            className={`nd-panel ${isAnimating ? "animating-in" : ""}`}
            style={{
              position: "fixed",
              top: dropdownPos.top,
              right: dropdownPos.right,
              width: dropdownPos.width,
              zIndex: 1050
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
          <div className="nd-header">
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="nd-header-icon">
                <FaBell size={15} color="#ffffff" />
              </div>
              <div>
                <div className="nd-header-title">Notifikasi</div>
                {unreadCount > 0 && (
                  <div className="nd-header-subtitle">
                    {unreadCount} belum dibaca
                  </div>
                )}
              </div>
            </div>
            <button className="nd-header-btn" onClick={handleNavigate}>
              Semua <FaArrowRight size={10} />
            </button>
          </div>

          {/* Unread count bar */}
          {unreadCount > 0 && (
            <div className="nd-unread-bar">
              <div className="nd-unread-dot" />
              <span className="nd-unread-text">
                {unreadCount} notifikasi baru menunggu
              </span>
            </div>
          )}

          {/* List */}
          <div style={{ maxHeight: MAX_HEIGHTS.NOTIFICATION_LIST, overflowY: "auto" }}>
            {safeNotifications.length === 0 ? (
              <div className="nd-empty-state">
                <div className="nd-empty-icon-wrap">
                  <FaBell size={24} color="#cbd5e1" />
                </div>
                <div>
                  <div className="nd-empty-title">Tidak ada notifikasi</div>
                  <div className="nd-empty-subtitle">
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
                    if (notif.status === 1) {
                      markNotificationAsRead(notif.id || notif.notification_id);
                    }
                    setSelectedNotif(notif);
                    setShowModal(true);
                    setIsDropdownOpen(false);
                  }}
                />
              ))
            )}
          </div>

          {/* Footer */}
          {safeNotifications.length > 0 && (
            <div className="nd-footer">
              <button className="nd-footer-btn" onClick={handleNavigate}>
                Lihat Semua Notifikasi <FaArrowRight size={11} />
              </button>
            </div>
          )}
        </div>
        </>,
        document.body
      )}
      {/* Detail Modal */}
      <NotificationDetailModal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        notif={selectedNotif} 
      />
    </li>
  );
});

export default NotificationDropdown;
