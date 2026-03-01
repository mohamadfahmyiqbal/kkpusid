import React from "react";
import { Button, Col, ListGroup, Row, Badge } from "react-bootstrap";
import {
  FaEnvelope,
  FaEnvelopeOpen,
  FaBell,
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const NotificationItem = ({ notif, onDetailClick }) => {
  const isUnread = notif.status === 1;

  // Get icon based on notification type
  const getNotificationIcon = (type) => {
    switch (type) {
      case "pinjaman_approval":
        return <FaCheckCircle className="text-success" />;
      case "simpanan_success":
        return <FaCheckCircle className="text-info" />;
      case "status_update":
        return <FaInfoCircle className="text-primary" />;
      case "warning":
      case "error":
        return <FaExclamationTriangle className="text-warning" />;
      default:
        return <FaBell className="text-secondary" />;
    }
  };

  // Get status badge color
  const getStatusBadge = () => {
    if (isUnread) {
      return (
        <Badge bg="danger" pill className="ms-2">
          Baru
        </Badge>
      );
    }
    return null;
  };

  return (
    <ListGroup.Item
      className={`notification-item border-0 mb-3 p-0 ${isUnread ? "notification-unread" : "notification-read"}`}
    >
      <div className="notification-card p-3">
        <Row className="align-items-center g-3">
          <Col xs="auto" className="notification-icon">
            <div
              className={`icon-wrapper ${isUnread ? "icon-unread" : "icon-read"}`}
            >
              {isUnread ? (
                <FaEnvelope size={20} className="text-primary" />
              ) : (
                <FaEnvelopeOpen size={20} className="text-muted" />
              )}
            </div>
          </Col>

          <Col className="notification-content">
            <div className="d-flex align-items-start justify-content-between">
              <div className="flex-grow-1">
                <h6 className="mb-2 fw-semibold notification-title">
                  {notif.title}
                  {getStatusBadge()}
                </h6>
                <p className="mb-2 text-muted notification-body">
                  {notif.body || "Tidak ada deskripsi."}
                </p>
                <div className="d-flex align-items-center text-muted small notification-meta">
                  <FaBell size={12} className="me-1" />
                  {new Date(notif.created_at).toLocaleString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </div>
              </div>

              <Col xs="auto" className="notification-actions">
                <Button
                  variant={isUnread ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => onDetailClick(notif)}
                  className="notification-action-btn"
                >
                  {isUnread ? "Baca" : "Detail"}
                </Button>
              </Col>
            </div>
          </Col>
        </Row>
      </div>
    </ListGroup.Item>
  );
};

export default NotificationItem;
