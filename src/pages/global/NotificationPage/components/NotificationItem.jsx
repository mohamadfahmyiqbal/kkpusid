import React from "react";
import { Button, Col, ListGroup, Row, Badge, Form } from "react-bootstrap";
import { FaEnvelope, FaEnvelopeOpen, FaBell, FaTag } from "react-icons/fa";

const NotificationItem = ({
  notif,
  onDetailClick,
  isSelected,
  onSelect,
  showSelection,
}) => {
  const isUnread = notif.status === 1;

  // Type labels configuration (moved here to avoid circular dependency)
  const TYPE_LABELS = {
    transaction: "Transaksi",
    payment: "Pembayaran",
    system: "Sistem",
    promotion: "Promosi",
    reminder: "Pengingat",
    announcement: "Pengumuman",
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

  // Get category badge
  const getCategoryBadge = () => {
    if (!notif.type) return null;

    const categoryColors = {
      transaction: "primary",
      payment: "success",
      system: "warning",
      promotion: "info",
      reminder: "secondary",
      announcement: "dark",
    };

    const color = categoryColors[notif.type] || "light";
    const label = TYPE_LABELS[notif.type] || notif.type;

    return (
      <Badge bg={color} pill className="me-2">
        <FaTag className="me-1" size={10} />
        {label}
      </Badge>
    );
  };

  return (
    <ListGroup.Item
      className={`notification-item border-0 mb-3 p-0 ${isUnread ? "notification-unread" : "notification-read"} transition-all duration-300 ease-in-out`}
      role="article"
      aria-label={`Notifikasi: ${notif.title}`}
    >
      <div className="notification-card p-3 p-sm-3 hover:shadow-md transition-shadow duration-200 cursor-pointer">
        <Row className="align-items-start g-2 g-sm-3">
          {/* Selection Checkbox */}
          {showSelection && (
            <Col xs="auto" className="notification-checkbox">
              <Form.Check
                type="checkbox"
                checked={isSelected}
                onChange={() => onSelect(notif.id)}
                className="notification-select-checkbox"
                id={`notification-check-${notif.id}`}
                aria-label={`Pilih notifikasi: ${notif.title}`}
              />
            </Col>
          )}

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
              <div className="flex-grow-1 min-w-0">
                <div className="d-flex align-items-center mb-2 flex-wrap">
                  {getCategoryBadge()}
                  <h6 className="mb-0 fw-semibold notification-title me-2">
                    {notif.title}
                  </h6>
                  {getStatusBadge()}
                </div>
                <p className="mb-2 text-muted notification-body">
                  {notif.body || "Tidak ada deskripsi."}
                </p>
                <div className="d-flex align-items-center text-muted small notification-meta">
                  <FaBell size={12} className="me-1 flex-shrink-0" />
                  <span className="text-truncate">
                    {new Date(notif.created_at).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>

              <Col xs="auto" className="notification-actions ms-2">
                <Button
                  variant={isUnread ? "primary" : "outline-primary"}
                  size="sm"
                  onClick={() => onDetailClick(notif)}
                  className="notification-action-btn transform transition-transform duration-200 hover:scale-105"
                  aria-label={`${isUnread ? "Baca" : "Detail"} notifikasi: ${notif.title}`}
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
