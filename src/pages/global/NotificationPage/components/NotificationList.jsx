import React from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { FaInbox, FaBellSlash } from "react-icons/fa";

const NotificationList = ({ loading, notifications, children }) => {
  return (
    <ListGroup variant="flush" className="notification-list">
      {loading ? (
        <div className="notification-loading-state text-center p-5">
          <Spinner
            animation="border"
            variant="primary"
            role="status"
            className="mb-3"
          />
          <p className="text-muted mb-0">Memuat notifikasi...</p>
        </div>
      ) : notifications.length > 0 ? (
        <div className="notification-items">{children}</div>
      ) : (
        <div className="notification-empty-state text-center p-5">
          <FaBellSlash size={48} className="text-muted mb-3" />
          <h6 className="text-muted mb-2">Tidak Ada Notifikasi</h6>
          <p className="text-muted small mb-0">
            Anda tidak memiliki notifikasi baru. Semua aman dan terkendali.
          </p>
        </div>
      )}
    </ListGroup>
  );
};

export default NotificationList;
