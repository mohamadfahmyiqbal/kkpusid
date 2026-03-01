import React, { useMemo, useEffect, useState } from "react";
import { Button, Card, Badge, Spinner } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaInfoCircle,
  FaExclamationTriangle,
  FaBell,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../components/layout/contexts";
import { jwtEncode } from "../../../utils/helpers";
import UNotification from "../../../utils/api/UNotification";

const NotificationDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { socket } = useProfile();
  const [loading, setLoading] = useState(false);
  const [markingRead, setMarkingRead] = useState(false);

  const detail = useMemo(
    () => ({
      id: decodedToken?.id,
      title: decodedToken?.title || "Detail Notifikasi",
      body: decodedToken?.body || "-",
      type: decodedToken?.type || "-",
      type_id: decodedToken?.type_id || "-",
      status: decodedToken?.status || 1,
      createdAt: decodedToken?.created_at || null,
    }),
    [decodedToken],
  );

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

  const getStatusBadge = () => {
    if (detail.status === 1) {
      return (
        <Badge bg="danger" pill>
          Baru
        </Badge>
      );
    }
    return (
      <Badge bg="secondary" pill>
        Dibaca
      </Badge>
    );
  };

  const handleBack = () => {
    const token = jwtEncode({ page: "notificationPage" });
    navigate(`/${token}`);
  };

  const markAsRead = async () => {
    if (detail.status !== 1 || markingRead) return;

    setMarkingRead(true);
    try {
      await UNotification.markAsRead(detail.id);

      // Emit socket event to update other clients
      if (socket?.connected) {
        socket.emit("notification:mark_read", { id: detail.id });
      }

      // Update local state
      detail.status = 2;
    } catch (error) {
      console.error("Gagal menandai notifikasi dibaca:", error);
    } finally {
      setMarkingRead(false);
    }
  };

  // Auto mark as read when page loads
  useEffect(() => {
    if (detail.status === 1 && detail.id) {
      markAsRead();
    }
  }, [detail.id, detail.status]);

  return (
    <div className="container-fluid">
      <div className="row page-titles">
        <div className="col-md-8 col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBack}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Detail Notifikasi
          </h3>
        </div>
      </div>

      <Card className="shadow-sm notification-detail-card">
        <Card.Header className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <div className="me-3">{getNotificationIcon(detail.type)}</div>
            <div>
              <h5 className="mb-1">{detail.title}</h5>
              <div className="small text-muted">
                {detail.createdAt
                  ? new Date(detail.createdAt).toLocaleString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "-"}
              </div>
            </div>
          </div>
          <div className="d-flex align-items-center gap-2">
            {getStatusBadge()}
            {markingRead && (
              <Spinner animation="border" size="sm" variant="primary" />
            )}
          </div>
        </Card.Header>
        <Card.Body>
          <div className="notification-detail-body mb-4">
            <p className="mb-3 fs-6">{detail.body}</p>
          </div>

          <div className="notification-detail-meta">
            <h6 className="text-muted mb-3">Informasi Detail</h6>
            <div className="row">
              <div className="col-md-4 col-sm-6 mb-2">
                <small className="text-muted d-block">ID Notifikasi</small>
                <span className="fw-semibold">{detail.id ?? "-"}</span>
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                <small className="text-muted d-block">Tipe</small>
                <span className="fw-semibold text-capitalize">
                  {detail.type?.replace(/_/g, " ") || "-"}
                </span>
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                <small className="text-muted d-block">Referensi</small>
                <span className="fw-semibold">{detail.type_id || "-"}</span>
              </div>
              <div className="col-md-4 col-sm-6 mb-2">
                <small className="text-muted d-block">Status</small>
                <div>{getStatusBadge()}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <Button variant="outline-primary" onClick={handleBack}>
              <FaArrowLeft className="me-2" />
              Kembali ke Notifikasi
            </Button>
            {detail.status === 1 && !markingRead && (
              <Button variant="primary" onClick={markAsRead}>
                <FaCheckCircle className="me-2" />
                Tandai Dibaca
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotificationDetailPage;
