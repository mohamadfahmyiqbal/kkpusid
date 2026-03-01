import React from "react";
import { Button, Card, Spinner, Badge } from "react-bootstrap";
import { FaCheckCircle, FaBell, FaFilter } from "react-icons/fa";

const NotificationCard = ({
  loading,
  notifications,
  onMarkAllAsRead,
  unreadCount,
  children,
}) => {
  return (
    <Card className="notification-main-card border-0 shadow-sm">
      <Card.Header className="notification-header bg-white border-bottom">
        <div className="d-flex justify-content-between align-items-center">
          <div className="notification-header-left">
            <div className="d-flex align-items-center">
              <FaBell className="text-primary me-2" size={18} />
              <h5 className="mb-0 fw-semibold">Kotak Masuk Notifikasi</h5>
              {unreadCount > 0 && (
                <Badge bg="danger" pill className="ms-2 notification-badge">
                  {unreadCount} Baru
                </Badge>
              )}
            </div>
          </div>

          <div className="notification-header-right">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onMarkAllAsRead}
              disabled={loading || unreadCount === 0}
              className="notification-action-header-btn"
            >
              <FaCheckCircle className="me-1" />
              Tandai Semua Dibaca
            </Button>
          </div>
        </div>
      </Card.Header>

      <Card.Body className="notification-body p-0">
        {loading ? (
          <div className="notification-loading text-center p-5">
            <Spinner
              animation="border"
              variant="primary"
              role="status"
              className="mb-3"
            />
            <p className="text-muted mb-0">Memuat notifikasi...</p>
          </div>
        ) : (
          children
        )}
      </Card.Body>
    </Card>
  );
};

export default NotificationCard;
