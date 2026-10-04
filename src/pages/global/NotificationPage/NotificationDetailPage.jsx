import React, { useMemo, useEffect, useState, useCallback } from "react";
import { Button, Card, Badge, Spinner } from "react-bootstrap";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../../components/layout/contexts";
import { jwtEncode } from "../../../utils/helpers";
import UNotification from "../../../utils/api/UNotification";

const NotificationDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { socket } = useProfile();
  const [markingRead, setMarkingRead] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(decodedToken?.status || 1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const detail = useMemo(
    () => ({
      id: decodedToken?.id,
      title: decodedToken?.title || "Detail Notifikasi",
      body: decodedToken?.body || "-",
      type: decodedToken?.type || "-",
      type_id: decodedToken?.type_id || "-",
      status: currentStatus,
      createdAt: decodedToken?.created_at || null,
    }),
    [decodedToken, currentStatus],
  );

  // Type labels and icons configuration (synchronized with NotificationPage)
  const TYPE_CONFIG = {
    transaction: {
      icon: "fa-shopping-cart",
      color: "primary",
      label: "Transaksi",
    },
    payment: { icon: "fa-credit-card", color: "success", label: "Pembayaran" },
    system: { icon: "fa-cog", color: "warning", label: "Sistem" },
    promotion: { icon: "fa-tag", color: "info", label: "Promosi" },
    reminder: { icon: "fa-clock", color: "secondary", label: "Pengingat" },
    announcement: { icon: "fa-bullhorn", color: "dark", label: "Pengumuman" },
    // Legacy types for backward compatibility
    pinjaman_approval: {
      icon: "fa-check-circle",
      color: "success",
      label: "Persetujuan Pinjaman",
    },
    simpanan_success: {
      icon: "fa-check-circle",
      color: "info",
      label: "Simpanan Berhasil",
    },
    status_update: {
      icon: "fa-info-circle",
      color: "primary",
      label: "Update Status",
    },
    warning: {
      icon: "fa-exclamation-triangle",
      color: "warning",
      label: "Peringatan",
    },
    error: { icon: "fa-exclamation-triangle", color: "danger", label: "Error" },
  };

  const getNotificationIcon = (type) => {
    const config = TYPE_CONFIG[type] || TYPE_CONFIG.system;
    const iconClass = `fa ${config.icon} text-${config.color}`;
    return <i className={iconClass} />;
  };

  const getTypeLabel = (type) => {
    const config = TYPE_CONFIG[type] || TYPE_CONFIG.system;
    return config.label;
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

  const markAsRead = useCallback(async () => {
    if (detail.status !== 1 || markingRead) return;

    setMarkingRead(true);
    try {
      await UNotification.markAsRead(detail.id);

      // Emit socket event to update other clients
      if (socket?.connected) {
        socket.emit("notification:mark_read", { id: detail.id });
      }

      // Update local state
      setCurrentStatus(2);
    } catch (error) {
      console.error("Gagal menandai notifikasi dibaca:", error);
    } finally {
      setMarkingRead(false);
    }
  }, [detail, markingRead, socket]);

  // Validate decoded token and set loading state
  useEffect(() => {
    if (!decodedToken?.id) {
      setError("Notifikasi tidak ditemukan");
      setLoading(false);
    } else {
      setLoading(false);
    }
  }, [decodedToken]);

  // Auto mark as read when page loads
  useEffect(() => {
    if (detail.status === 1 && detail.id && !loading) {
      markAsRead();
    }
  }, [detail.id, detail.status, markAsRead, loading]);

  // Loading state
  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <Spinner animation="border" variant="primary" className="mb-3" />
          <p className="text-muted">Memuat detail notifikasi...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "400px" }}
      >
        <div className="text-center">
          <FaExclamationTriangle size={48} className="text-warning mb-3" />
          <h5 className="text-danger mb-2">Error</h5>
          <p className="text-muted mb-3">{error}</p>
          <Button variant="outline-primary" onClick={handleBack}>
            <FaArrowLeft className="me-2" />
            Kembali ke Notifikasi
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div>
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

      <Card className="shadow-sm notification-detail-card hover:shadow-lg transition-shadow duration-300">
        <Card.Header className="d-flex justify-content-between align-items-center py-3">
          <div className="d-flex align-items-center flex-wrap flex-grow-1">
            <div className="me-3">{getNotificationIcon(detail.type)}</div>
            <div className="min-w-0 flex-grow-1">
              <h5 className="mb-1 text-truncate">{detail.title}</h5>
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
          <div className="d-flex align-items-center gap-2 ms-2">
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
                  {getTypeLabel(detail.type)}
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

          <div className="mt-4 d-flex gap-2 flex-wrap">
            <Button
              variant="outline-primary"
              onClick={handleBack}
              className="hover:bg-primary hover:text-white transition-colors duration-200"
            >
              <FaArrowLeft className="me-2" />
              <span className="d-none d-sm-inline">Kembali ke Notifikasi</span>
              <span className="d-sm-none">Kembali</span>
            </Button>
            {detail.status === 1 && !markingRead && (
              <Button
                variant="primary"
                onClick={markAsRead}
                className="hover:scale-105 transition-transform duration-200"
              >
                <FaCheckCircle className="me-2" />
                <span className="d-none d-sm-inline">Tandai Dibaca</span>
                <span className="d-sm-none">Dibaca</span>
              </Button>
            )}
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default NotificationDetailPage;
