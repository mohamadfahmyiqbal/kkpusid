import React, { memo, useCallback, useMemo, useRef, useEffect } from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import { FaBell, FaCircle, FaEnvelopeOpen } from "react-icons/fa";
import { useNavigation } from "../../../hooks/useNavigation";
import { useProfile, useSocket } from "../contexts";
import { sanitizeText, safeDateFormat } from "../../../utils/sanitization";
import {
  DROPDOWN_WIDTHS,
  FONT_SIZES,
  MAX_HEIGHTS,
  ACCESSIBILITY_LABELS,
} from "../../../constants/layout";

export default memo(function NotificationDropdown() {
  const { notifications } = useProfile();
  const { socket } = useSocket();
  const { navigateTo } = useNavigation();
  const dropdownRef = useRef(null);

  // Memoize safe notifications and unread count to prevent recalculation
  const { safeNotifications, unreadCount } = useMemo(() => {
    const safeNotifs = Array.isArray(notifications) ? notifications : [];
    const unread = safeNotifs.filter((n) => n.status === 1).length;
    return {
      safeNotifications: safeNotifs,
      unreadCount: unread,
    };
  }, [notifications]);

  const handleNavigate = useCallback(
    (page) => {
      navigateTo(page);
    },
    [navigateTo],
  );

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

  // Socket listener for real-time notifications
  useEffect(() => {
    if (!socket) return;

    const handleNewNotification = (data) => {
      console.log("🔔 New notification received:", data);
      // The ProfileContext handles notifications:update event
      // This component just needs to listen for debugging
    };

    socket.on("notifications:update", handleNewNotification);

    return () => {
      socket.off("notifications:update", handleNewNotification);
    };
  }, [socket]);

  return (
    <NavDropdown
      as="li"
      id="dropdown-notification"
      align="end"
      className="nav-item notification-dropdown"
      ref={dropdownRef}
      title={
        <div className="position-relative text-white">
          <FaBell size={18} />
          {unreadCount > 0 && (
            <Badge
              bg="warning"
              pill
              className="position-absolute top-0 start-100 translate-middle text-dark"
              style={{ fontSize: FONT_SIZES.BADGE }}
              aria-label={`${unreadCount} unread notifications`}
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      }
    >
      <div
        className="notification-dropdown-content"
        style={{ width: DROPDOWN_WIDTHS.NOTIFICATION }}
      >
        <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <span className="fw-bold text-dark">Notifikasi</span>
          <button
            className="btn btn-link btn-sm p-0 text-decoration-none fw-bold text-primary hover:text-primary-dark transition-colors duration-200"
            style={{ fontSize: FONT_SIZES.SMALL }}
            onClick={() => handleNavigate("notificationPage")}
            aria-label="View all notifications"
          >
            Lihat Semua
          </button>
        </div>
        <div
          style={{
            maxHeight: MAX_HEIGHTS.NOTIFICATION_LIST,
            overflowY: "auto",
          }}
        >
          {safeNotifications.length === 0 ? (
            <div className="p-4 text-center text-muted small">
              Tidak ada notifikasi baru
            </div>
          ) : (
            safeNotifications.map((notif) => (
              <button
                key={notif.id}
                type="button"
                className={`p-3 border-bottom d-flex align-items-start w-100 text-start border-0 bg-transparent notification-item transition-all duration-200 ${
                  notif.status === 1 ? "bg-light" : ""
                }`}
                onClick={() => handleNavigate("notificationPage")}
                aria-label={`Read notification: ${sanitizeText(notif.title)}`}
              >
                <div className="me-3 mt-1">
                  {notif.status === 1 ? (
                    <FaCircle className="text-warning" size={8} />
                  ) : (
                    <FaEnvelopeOpen className="text-muted" size={14} />
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="fw-bold small text-dark">
                    {sanitizeText(notif.title)}
                  </div>
                  <div
                    className="text-muted small text-truncate-2"
                    style={{
                      fontSize: FONT_SIZES.EXTRA_SMALL,
                      lineHeight: "1.3",
                    }}
                  >
                    {sanitizeText(notif.body)}
                  </div>
                  <div
                    className="text-muted mt-1"
                    style={{ fontSize: FONT_SIZES.TINY }}
                  >
                    {safeDateFormat(notif.sent_at)}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </NavDropdown>
  );
});
