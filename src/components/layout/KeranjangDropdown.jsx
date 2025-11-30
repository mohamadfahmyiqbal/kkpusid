// components/layout/KeranjangDropdown.jsx

import React, { useCallback } from "react"; // Tambahkan import React dan useCallback
import { NavDropdown } from "react-bootstrap";
import { FaWallet, FaEye } from "react-icons/fa";
// ✅ Import useNavigate dan jwtEncode dari NotificationDropdown
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

// --- 1. DATA MOCKUP KERANJANG ---
const mockupTagihan = [
  {
    id: 101,
    description: "Tagihan Simpanan Pokok periode Maret 2024",
    amount: "Rp 200.000",
    detail: "Detail lengkap tagihan Simpanan Pokok bulan Maret.",
  },
  {
    id: 102,
    description: "Tagihan Simpanan Wajib periode April 2024",
    amount: "Rp 500.000",
    detail: "Detail lengkap tagihan Simpanan Wajib bulan April.",
  },
  {
    id: 103,
    description: "Tagihan Iuran Anggota Mei 2024",
    amount: "Rp 150.000",
    detail: "Detail lengkap tagihan Iuran Anggota bulan Mei.",
  },
];

// Hapus prop onNavigate karena navigasi dilakukan secara internal
export default function KeranjangDropdown({ user, onShowDetail }) {
  const navigate = useNavigate(); // ✅ Inisialisasi useNavigate

  // Asumsikan handleClick di sini hanya untuk navigasi ke halaman tagihan
  const handleClick = useCallback(
    (type, data = null) => {
      if (type === "page") {
        // Tipe Page: Navigasi ke halaman daftar tagihan ('billingPage' dari globalRoutes)
        const token = jwtEncode({ page: "billingPage" }); // ✅ Gunakan 'billingPage'
        navigate(`/${token}`);
      }
    },
    [navigate]
  );

  // Handler untuk menampilkan modal detail (tetap sama)
  const handleShowDetail = (tagihan) => {
    if (onShowDetail) {
      onShowDetail(tagihan);
    }
    console.log(
      `Lihat Detail Tagihan ID: ${tagihan.id} - ${tagihan.description}`
    );
  };

  return (
    <NavDropdown
      as="li"
      title={
        <span
          className="nav-link text-white waves-effect waves-dark p-0"
          role="button"
        >
          <FaWallet size={20} />
          {/* Badge Notifikasi/Dot */}
          <div className="notify">
            <span className="heartbit"></span>
            <span className="point"></span>
          </div>
        </span>
      }
      id="dropdown-billing-cart"
      align="end"
      className="nav-item"
    >
      <div className="mailbox animated bounceInDown" style={{ minWidth: 350 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <div className="drop-title">
              TAGIHAN TERTUNDA ({mockupTagihan.length})
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
                  overflow: "hidden",
                  width: "auto",
                  height: "250px",
                }}
              >
                {/* Looping Item Tagihan dari Data Mockup */}
                {mockupTagihan.map((item) => (
                  <div
                    className="d-flex align-items-center p-2 border-bottom"
                    key={item.id}
                  >
                    {/* Konten Tagihan */}
                    <div className="mail-contnet w-100 me-2">
                      <h6>{item.description}</h6>
                      <span className="mail-desc text-danger">
                        Wajib Dibayar
                      </span>
                      <strong className="time text-dark">{item.amount}</strong>
                    </div>

                    {/* 2. Tombol Lihat Detail */}
                    <div className="btn-group">
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={() => handleShowDetail(item)}
                      >
                        <FaEye /> Detail
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </li>

          {/* 3. Tautan Lihat Semua Tagihan */}
          <li>
            <a
              className="nav-link text-center d-block p-2 text-primary"
              onClick={(e) => {
                e.stopPropagation(); // Mencegah penutupan NavDropdown dari e.target
                e.preventDefault();
                handleClick("page"); // ✅ Panggil handleClick("page")
              }}
              href="#"
              role="button"
              style={{
                cursor: "pointer",
                borderTop: "1px solid #e9ecef",
              }}
            >
              <strong>Lihat Semua Tagihan</strong>
              <i className="fa fa-angle-right ms-2"></i>
            </a>
          </li>
        </ul>
      </div>
    </NavDropdown>
  );
}
