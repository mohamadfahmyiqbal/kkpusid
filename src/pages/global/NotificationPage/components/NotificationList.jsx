import React from "react";
import { ListGroup } from "react-bootstrap";
import { FaBellSlash } from "react-icons/fa";

const NotificationList = ({ loading, notifications, children }) => {
  return (
    <ListGroup variant="flush" className="notification-list">
      {loading ? (
        <div className="notification-loading-state p-3">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="notification-skeleton mb-3 p-3 border rounded"
            >
              <div className="d-flex align-items-center">
                <div className="skeleton-icon me-3">
                  <div
                    className="bg-light rounded-circle"
                    style={{ width: "40px", height: "40px" }}
                  ></div>
                </div>
                <div className="flex-grow-1">
                  <div
                    className="bg-light rounded mb-2"
                    style={{ height: "16px", width: "60%" }}
                  ></div>
                  <div
                    className="bg-light rounded mb-2"
                    style={{ height: "14px", width: "90%" }}
                  ></div>
                  <div
                    className="bg-light rounded"
                    style={{ height: "12px", width: "40%" }}
                  ></div>
                </div>
                <div className="skeleton-action">
                  <div
                    className="bg-light rounded"
                    style={{ height: "32px", width: "80px" }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
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
