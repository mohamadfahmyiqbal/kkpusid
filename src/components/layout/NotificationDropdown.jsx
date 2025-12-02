import React, { useState, useCallback } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaBell, FaInfo } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import NotificationModal from "./NotificationModal";
// =========================================================
// MOCKUP DATA NOTIFIKASI
// (Kode Mockup Tetap Sama)
// =========================================================
const mockNotifications = [
  {
    id: 101,
    title: "Persetujuan Pinjaman",
    body: "Pinjaman Anda untuk program A telah disetujui. Detail lengkap pinjaman dan jadwal pembayaran tersedia di modal ini.",
    status: 1,
    created_at: "2025-11-30T08:00:00Z",
  },
  {
    id: 102,
    title: "Setoran Sukses",
    body: "Anda telah berhasil melakukan setoran Simpanan Wajib sebesar Rp 100.000.",
    status: 1,
    created_at: "2025-11-30T07:30:00Z",
  },
  {
    id: 103,
    title: "Perubahan Status Anggota",
    body: "Verifikasi dokumen selesai. Status keanggotaan Anda kini Aktif dan dapat mengajukan program.",
    status: 1,
    created_at: "2025-11-29T14:45:00Z",
  },
];
const filteredNotifikasi = mockNotifications.filter((n) => n.status === 1);
// =========================================================

export default function NotificationDropdown({ user }) {
  const navigate = useNavigate();
  const [notifikasi] = useState(filteredNotifikasi);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotifikasi(null);
  };

  const handleClick = useCallback(
    (type, data = null) => {
      if (type === "modal") {
        // Tipe Modal: Tampilkan detail notifikasi dalam Modal
        setSelectedNotifikasi(data);
        setShowModal(true);
      } else if (type === "page") {
        // Tipe Page: Navigasi ke halaman daftar notifikasi
        const token = jwtEncode({ page: "notificationPage" });
        navigate(`/${token}`);
      }
    },
    [navigate]
  );

  return (
    <NavDropdown
      as="li"
      title={
        <span
          className="nav-link text-white waves-effect waves-dark p-0"
          role="button"
        >
          <FaBell />
          {notifikasi.length > 0 && (
            <div className="notify">
              <span className="heartbit"></span>
              <span className="point"></span>
            </div>
          )}
        </span>
      }
      id="dropdown-notification"
      align="end"
      className="nav-item"
    >
      <div className="mailbox animated bounceInDown" style={{ minWidth: 300 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <div className="drop-title">
              Anda punya **{notifikasi.length}** Notifikasi Baru
            </div>
          </li>

          {/* List Notifikasi (Body) - Tidak ada perubahan di bagian ini */}
          <li>
            <div>
              <div
                className="message-center"
                style={{ overflowY: "auto", maxHeight: "250px" }}
              >
                {notifikasi.slice(0, 5).map((notif, index) => (
                  <React.Fragment key={index}>
                    {/* Item Notifikasi */}
                    <div
                      style={{
                        display: "flex",
                        padding: 10,
                        borderBottom: "1px solid #f0f0f0",
                      }}
                    >
                      <div className="btn btn-info btn-circle me-2">
                        <FaInfo />
                      </div>
                      <div className="mail-contnet">
                        <h6>{notif.title || "Notifikasi"}</h6>
                        <span className="mail-desc" style={{ fontSize: 13 }}>
                          {notif.body.substring(0, 50) + "..." || "-"}
                        </span>
                        <span
                          className="time"
                          style={{ fontSize: 11, color: "#888" }}
                        >
                          {notif.created_at
                            ? new Date(notif.created_at).toLocaleTimeString(
                                "id-ID",
                                { hour: "2-digit", minute: "2-digit" }
                              )
                            : ""}
                        </span>
                      </div>
                    </div>

                    {/* Tautan 'Lihat Detail' -> MEMBUKA MODAL */}
                    <div
                      className="p-1 px-3 d-flex justify-content-end"
                      style={{
                        borderBottom:
                          index < notifikasi.slice(0, 5).length - 1
                            ? "1px solid #e9ecef"
                            : "none",
                      }}
                    >
                      <a
                        href="#"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleClick("modal", notif);
                        }}
                        className="text-info"
                        style={{ fontSize: 12, textDecoration: "none" }}
                        role="button"
                      >
                        Lihat Detail (Modal) &nbsp;
                        <i className="fa fa-angle-right"></i>
                      </a>
                    </div>
                  </React.Fragment>
                ))}

                {notifikasi.length === 0 && (
                  <div className="p-3 text-center text-muted">
                    Tidak ada notifikasi baru.
                  </div>
                )}
              </div>
            </div>
          </li>

          {/* Bagian "Lihat Semua" -> NAVIGASI HALAMAN (PERBAIKAN VISIBILITAS) */}
          <li>
            <a
              // ✅ TAMBAHKAN CLASS 'text-primary' dan padding 'p-2'
              className="nav-link text-center text-primary p-2"
              onClick={(e) => {
                e.stopPropagation();
                e.preventDefault();
                handleClick("page");
              }}
              href="#"
              role="button"
              tabIndex={0}
              // Pertahankan borderTop
              style={{
                cursor: "pointer",
                borderTop: "1px solid #e9ecef",
                display: "block",
              }}
            >
              <strong>Lihat semua notifikasi</strong>
              <i className="fa fa-angle-right ms-1"></i>{" "}
              {/* Gunakan ms-1 untuk sedikit jarak */}
            </a>
          </li>
        </ul>
      </div>

      {/* Modal Notifikasi */}
      <NotificationModal
        show={showModal}
        onHide={handleCloseModal}
        notifikasi={selectedNotifikasi}
      />
    </NavDropdown>
  );
}
