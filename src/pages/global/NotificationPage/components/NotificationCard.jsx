import React from "react";
import { Button, Card, Spinner, Badge } from "react-bootstrap";
import { FaCheckCircle, FaBell } from "react-icons/fa";

const NotificationCard = ({
  loading,
  notifications,
  onMarkAllAsRead,
  unreadCount,
  children,
}) => {
  return (
    <Card className="notification-main-card border-0 shadow-sm hover:shadow-lg transition-shadow duration-300">
      <Card.Header className="notification-header bg-white border-bottom py-3">
        <div className="d-flex justify-content-between align-items-center">
          <div className="notification-header-left flex-grow-1">
            <div className="d-flex align-items-center flex-wrap">
              <FaBell className="text-primary me-2" size={18} />
              <h5 className="mb-0 fw-semibold me-2">Kotak Masuk</h5>
              {unreadCount > 0 && (
                <Badge
                  bg="danger"
                  pill
                  className="notification-badge animate-pulse"
                >
                  {unreadCount} Baru
                </Badge>
              )}
            </div>
          </div>

          <div className="notification-header-right ms-2">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={onMarkAllAsRead}
              disabled={loading || unreadCount === 0}
              className="notification-action-header-btn hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <FaCheckCircle className="me-1 d-none d-sm-inline" />
              <span className="d-sm-none">✓</span>
              <span className="d-none d-md-inline"> Tandai Semua Dibaca</span>
              <span className="d-md-none"> Semua</span>
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
