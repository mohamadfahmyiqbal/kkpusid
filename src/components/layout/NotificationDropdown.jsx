import React from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import { FaBell, FaCircle, FaEnvelopeOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import { jwtEncode } from "../../routes/helpers";

export default function NotificationDropdown() {
  const { notifications } = useProfile();
  const navigate = useNavigate();

  const unreadCount = notifications.filter((n) => n.status === 1).length;

  const handleNavigate = (page) => {
    const token = jwtEncode({ page });
    navigate(`/${token}`);
  };

  return (
    <NavDropdown
      align="end"
      title={
        <div className="position-relative text-white">
          <FaBell size={18} />
          {unreadCount > 0 && (
            <Badge
              bg="warning"
              pill
              className="position-absolute top-0 start-100 translate-middle text-dark"
              style={{ fontSize: "0.6rem" }}
            >
              {unreadCount}
            </Badge>
          )}
        </div>
      }
    >
      <div style={{ width: "320px" }}>
        <div className="p-3 bg-light border-bottom d-flex justify-content-between align-items-center">
          <span className="fw-bold text-dark">Notifikasi</span>
          <button
            className="btn btn-link btn-sm p-0 text-decoration-none fw-bold"
            style={{ fontSize: "0.75rem" }}
            onClick={() => handleNavigate("notificationPage")}
          >
            Lihat Semua
          </button>
        </div>
        <div style={{ maxHeight: "350px", overflowY: "auto" }}>
          {notifications.length === 0 ? (
            <div className="p-4 text-center text-muted small">
              Tidak ada notifikasi baru
            </div>
          ) : (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className={`p-3 border-bottom d-flex align-items-start ${
                  notif.status === 1 ? "bg-light" : ""
                }`}
                style={{ cursor: "pointer" }}
                onClick={() => handleNavigate("notificationPage")}
              >
                <div className="me-3 mt-1">
                  {notif.status === 1 ? (
                    <FaCircle className="text-warning" size={8} />
                  ) : (
                    <FaEnvelopeOpen className="text-muted" size={14} />
                  )}
                </div>
                <div className="overflow-hidden">
                  <div className="fw-bold small text-dark">{notif.title}</div>
                  <div
                    className="text-muted small text-truncate-2"
                    style={{ fontSize: "0.75rem", lineHeight: "1.3" }}
                  >
                    {notif.body}
                  </div>
                  <div
                    className="text-muted mt-1"
                    style={{ fontSize: "0.65rem" }}
                  >
                    {notif.sent_at}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </NavDropdown>
  );
}
