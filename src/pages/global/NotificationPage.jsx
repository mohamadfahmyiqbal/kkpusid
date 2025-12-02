// pages/NotificationPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Card, Spinner, ListGroup, Button, Row, Col } from "react-bootstrap";
// Import FaArrowLeft untuk tombol kembali
import { FaArrowLeft, FaCheckCircle, FaEnvelopeOpen } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "../../components/layout/DashboardLayout";
// Sesuaikan jalur impor ini
import UNotification from "../../utils/api/UNotification";
import { jwtEncode } from "../../routes/helpers";

// =========================================================
// 🔔 DATA MOCKUP NOTIFIKASI
// =========================================================
const MOCK_NOTIFICATIONS = [
  {
    id: 101,
    title: "Persetujuan Pinjaman Disetujui",
    body: "Permintaan Pinjaman Anda sebesar Rp 10.000.000 telah disetujui. Silakan cek detail angsuran.",
    status: 1, // 1 = Belum Dibaca
    type: "pinjaman_approval",
    type_id: "PID-20250101",
    created_at: "2025-11-30T09:00:00Z",
  },
  {
    id: 102,
    title: "Setoran Simpanan Wajib Berhasil",
    body: "Setoran Simpanan Wajib sebesar Rp 100.000 pada bulan November 2025 telah berhasil diproses.",
    status: 1, // 1 = Belum Dibaca
    type: "simpanan_success",
    type_id: "SID-20251101",
    created_at: "2025-11-30T07:30:00Z",
  },
  {
    id: 103,
    title: "Status Keanggotaan Berubah",
    body: "Verifikasi dokumen selesai. Status keanggotaan Anda kini 'Aktif' dan dapat mengajukan program.",
    status: 2, // 2 = Sudah Dibaca
    type: "status_update",
    type_id: "UID-54321",
    created_at: "2025-11-29T14:45:00Z",
  },
];
// =========================================================

const NotificationPage = ({ user, logout }) => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const handleDetailClick = useCallback(
    (notif) => {
      const token = jwtEncode({
        page: "notifikasi/detail",
        id: notif.id,
        type: notif.type,
        type_id: notif.type_id,
      });
      navigate(`/${token}`);
    },
    [navigate]
  );

  // Fungsi untuk kembali ke dashboard utama
  const handleBackToDashboard = () => {
    const token = jwtEncode({ page: "dashboard" });

    navigate(`/${token}`);
  };

  const fetchNotifications = useCallback(
    async (page) => {
      if (!user || !user.no_anggota) {
        setNotifications(MOCK_NOTIFICATIONS);
        setTotalPages(1);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const filter = {
          no_anggota: user.no_anggota,
          page: page,
          limit: itemsPerPage,
        };
        const res = await UNotification.getNotificationByNik(filter);

        if (res && res.data && Array.isArray(res.data.data)) {
          setNotifications(res.data.data);
          setTotalPages(res.data.total_pages || 1);
        } else {
          // FALLBACK KE MOCKUP JIKA RESPONSE TIDAK VALID
          setNotifications(MOCK_NOTIFICATIONS);
          setTotalPages(1);
        }
      } catch (error) {
        console.error("Gagal mengambil daftar notifikasi dari API:", error);
        // FALLBACK KE MOCKUP JIKA TERJADI ERROR API
        setNotifications(MOCK_NOTIFICATIONS);
        setTotalPages(1);
      } finally {
        setLoading(false);
      }
    },
    [user, itemsPerPage]
  );

  const markAllAsRead = async () => {
    const unreadIds = notifications
      .filter((n) => n.status === 1)
      .map((n) => n.id);
    if (unreadIds.length === 0) return;

    try {
      await UNotification.markAsRead(unreadIds);
      setNotifications((prev) =>
        prev.map((notif) => ({ ...notif, status: 2 }))
      );
    } catch (error) {
      console.error("Gagal menandai semua dibaca:", error);
      // Jika API gagal, set status di UI secara lokal (untuk demo mockup)
      if (notifications.length > 0) {
        setNotifications((prev) =>
          prev.map((notif) => ({ ...notif, status: 2 }))
        );
      }
    }
  };

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [fetchNotifications, currentPage]);

  const NotificationItem = ({ notif }) => {
    const isUnread = notif.status === 1;
    const itemClasses = isUnread ? "bg-light-info fw-bold" : "text-dark";

    return (
      <ListGroup.Item
        className={`p-3 border-bottom ${itemClasses}`}
        key={notif.id}
      >
        <Row className="align-items-center">
          <Col xs="auto" className="me-3">
            {isUnread ? (
              <FaArrowLeft size={20} className="text-danger" />
            ) : (
              <FaEnvelopeOpen size={20} className="text-success" />
            )}
          </Col>
          <Col>
            <h6 className="mb-1">{notif.title}</h6>
            <p
              className="mb-1 text-truncate"
              style={{ fontSize: "0.9em", maxWidth: "90%" }}
            >
              {notif.body || "Tidak ada deskripsi."}
            </p>
            <small className="text-primary">
              {new Date(notif.created_at).toLocaleString("id-ID")}
            </small>
          </Col>
          <Col xs="auto">
            <Button
              variant="outline-info"
              size="sm"
              onClick={() => handleDetailClick(notif)}
            >
              Lihat Detail
            </Button>
          </Col>
        </Row>
      </ListGroup.Item>
    );
  };

  return (
    // Membungkus seluruh konten dengan DashboardLayout
    <DashboardLayout user={user} logout={logout}>
      <div className="container-fluid">
        {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
        <div className="row page-titles">
          <div className="col-md-6 col-4 align-self-center">
            <h3 className="text-themecolor mb-0 mt-0">
              <span
                role="button"
                onClick={handleBackToDashboard} // Handler kembali ke dashboard
                className="me-3 text-primary"
                style={{ cursor: "pointer" }}
              >
                <FaArrowLeft className="me-2" />
              </span>
              Daftar Notifikasi
            </h3>
          </div>
        </div>

        <Card className="shadow-sm">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h5>Kotak Masuk Notifikasi</h5>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={markAllAsRead}
              disabled={
                loading ||
                notifications.filter((n) => n.status === 1).length === 0
              }
            >
              <FaCheckCircle className="me-1" /> Tandai Semua Dibaca
            </Button>
          </Card.Header>

          <ListGroup variant="flush">
            {loading ? (
              <div className="text-center p-5">
                <Spinner animation="border" role="status" className="me-2" />
                Memuat notifikasi...
              </div>
            ) : notifications.length > 0 ? (
              notifications.map((notif) => (
                <NotificationItem key={notif.id} notif={notif} />
              ))
            ) : (
              <div className="text-center p-5 text-muted">
                🎉 Tidak ada notifikasi yang ditemukan. Semua aman!
              </div>
            )}
          </ListGroup>

          {/* Pagination Controls */}
          {!loading && totalPages > 1 && (
            <Card.Footer className="d-flex justify-content-center">
              <Button
                variant="light"
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                &laquo; Sebelumnya
              </Button>
              <span className="mx-3 align-self-center">
                Halaman {currentPage} dari {totalPages}
              </span>
              <Button
                variant="light"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={currentPage === totalPages}
              >
                Berikutnya &raquo;
              </Button>
            </Card.Footer>
          )}
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default NotificationPage;
