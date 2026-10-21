import { useEffect, useRef, useState } from "react";
import { Button, NavDropdown } from "react-bootstrap";
import { FaBell, FaInbox, FaInfo, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";
import UNotification from "../../../utils/UNotification";
import NotificationModal from "../NotificationModal";

export default function NotificationDropdown({ user }) {
  const navigate = useNavigate();
  const [notifikasi, setNotifikasi] = useState([]);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);
  const [showModal, setShowModal] = useState(false);
  // Handler untuk navigasi ke halaman notifikasi
  const handleClick = (link, data) => {
    if (link === "modal") {
      setSelectedNotifikasi(data);
      setShowModal(true);
    } else {
      const token = jwtEncode({ page: "notifikasi" });
      navigate(`/${token}`);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotifikasi(null);
  };

  // Ambil notifikasi dari server
  const getNotif = async () => {
    if (!user || !user.nik) return;
    setLoading(true);
    try {
      const res = await UNotification.getNotificationByNik({ status: [1] });
      if (res && res.data && Array.isArray(res.data.data)) {
        setNotifikasi(res.data.data);
      } else {
        setNotifikasi([]);
      }
    } catch (error) {
      setNotifikasi([]);
      // Bisa tambahkan toast atau log error di sini
    } finally {
      setLoading(false);
    }
  };

  // Ambil notifikasi setiap 1 menit sekali
  useEffect(() => {
    getNotif();
    intervalRef.current = setInterval(getNotif, 60000);
    return () => {
      clearInterval(intervalRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user && user.nik]);

  // Hitung jumlah notifikasi belum dibaca
  const unreadCount = notifikasi.filter((n) => !n.is_read).length;

  return (
    <NavDropdown
      as="li"
      title={
        <span
          className="nav-link text-white waves-effect waves-dark p-0"
          role="button"
        >
          <FaBell />
          {unreadCount > 0 && (
            <div className="notify">
              <span className="heartbit"></span>
              <span className="point"></span>
            </div>
          )}
        </span>
      }
      id="dropdown-messages"
      align="end"
      className="nav-item"
    >
      <div className="mailbox animated bounceInDown" style={{ minWidth: 300 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <div className="drop-title">
              Notifikasi{" "}
              {loading && <span style={{ fontSize: 12 }}>(memuat...)</span>}
            </div>
          </li>
          <li>
            <div
              className="slimScrollDiv"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "auto",
                height: "250px",
              }}
            >
              <div
                className="message-center"
                style={{
                  overflow: "auto",
                  width: "auto",
                  height: "250px",
                }}
              >
                {notifikasi.length === 0 && !loading && (
                  <div className="text-center text-muted py-4">
                    Tidak ada notifikasi
                  </div>
                )}
                {notifikasi.map((notif, idx) => (
                  <div
                    onClick={(e) => handleClick("modal", notif)}
                    key={notif.id || idx}
                    style={{
                      background: notif.is_read ? "#fff" : "#f5f5f5",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      padding: "10px 15px",
                      textDecoration: "none",
                      cursor: "pointer",
                    }}
                  >
                    <Button className="btn-circle me-2">
                      <FaInfo />
                    </Button>
                    <div className="mail-contnet">
                      <h6
                        style={{
                          margin: 0,
                          fontWeight: notif.is_read ? 400 : 600,
                        }}
                      >
                        {notif.title || "Notifikasi"}
                      </h6>
                      <span className="mail-desc" style={{ fontSize: 13 }}>
                        {notif.body || "-"}
                      </span>
                      <br />
                      <span
                        className="time"
                        style={{ fontSize: 11, color: "#888" }}
                      >
                        {notif.created_at
                          ? new Date(notif.created_at).toLocaleString("id-ID", {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "2-digit",
                              month: "2-digit",
                              year: "2-digit",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>
          <li>
            <div
              className="nav-link text-center"
              onClick={(e) => handleClick("detail")}
              role="button"
              tabIndex={0}
              style={{ cursor: "pointer" }}
            >
              <strong>Lihat semua notifikasi</strong>
              <i className="fa fa-angle-right"></i>
            </div>
          </li>
        </ul>
      </div>
      {/* ✅ Gunakan komponen modal terpisah */}
      <NotificationModal
        show={showModal}
        onHide={handleCloseModal}
        notifikasi={selectedNotifikasi}
      />
    </NavDropdown>
  );
}
