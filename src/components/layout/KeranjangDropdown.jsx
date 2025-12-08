// src/components/layout/KeranjangDropdown.jsx (FINAL & LENGKAP)

import React, { useState, useEffect, useCallback } from "react";
import { NavDropdown } from "react-bootstrap";
import { FaWallet, FaEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
// ✅ Import Utility API untuk Billing
import UBilling from "../../utils/api/UBilling";

// Path terenkripsi ke halaman utama tagihan
const BILLING_PAGE_PATH = `/${jwtEncode({ page: "billingPage" })}`;

export default function KeranjangDropdown({ user, onShowDetail }) {
  const navigate = useNavigate();

  // --- STATE ---
  const [tagihan, setTagihan] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Fungsi Fetching Data Tagihan (Pending)
   */
  const fetchTagihan = useCallback(async () => {
    // ✅ GUARD CLAUSE: Menggunakan user.member_no
    if (!user || !user.member_no) {
      setTagihan([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Mengambil 3 tagihan pending teratas
      const response = await UBilling.getPendingBills({
        member_no: user.member_no, // Mengirim member_no ke backend
        limit: 3,
      });

      // Asumsi: response.data.list berisi array tagihan
      setTagihan(response.data.list || []);
    } catch (err) {
      console.error("Gagal memuat tagihan:", err);
      setError("Gagal memuat tagihan. Coba lagi.");
      setTagihan([]);
    } finally {
      setLoading(false);
    }
  }, [user]); // Dependensi pada objek user

  // Efek untuk memuat data saat komponen dimuat atau user berubah
  useEffect(() => {
    fetchTagihan();
  }, [fetchTagihan]);

  /**
   * Handler Navigasi
   * @param {string} type - 'page' untuk navigasi ke halaman billing
   */
  const handleClick = useCallback(
    (type) => {
      // Navigasi ke halaman billing terenkripsi
      if (type === "page") {
        navigate(BILLING_PAGE_PATH);
      }
    },
    [navigate]
  );

  /**
   * Handler untuk menampilkan detail tagihan
   * @param {Object} item - Objek tagihan yang dipilih
   */
  const handleShowDetail = useCallback(
    (item) => {
      if (onShowDetail) {
        onShowDetail(item);
      }
      // Logika opsional: Navigasi ke detail tagihan jika tidak ada modal
      // else {
      //   navigate(`/${jwtEncode({ page: "billingDetail", id: item.id })}`);
      // }
    },
    [onShowDetail]
  );

  return (
    <NavDropdown
      title={
        <>
          {/* Ikon Keranjang */}
          <i className="fa fa-shopping-cart fa-fw"></i>
          {/* Badge Jumlah Tagihan */}
          {tagihan.length > 0 && (
            <span className="badge rounded-pill bg-danger ms-1">
              {tagihan.length}
            </span>
          )}
        </>
      }
      id="keranjang-dropdown"
      align="end"
      className="nav-item"
    >
      <div className="mailbox">
        <ul className="list-unstyled">
          {/* 1. Header Dropdown */}
          <li>
            <div className="drop-title bg-light p-3 border-bottom">
              <h5 className="mb-0">
                <FaWallet className="me-2" /> Tagihan Tertunda
              </h5>
            </div>
          </li>

          {/* 2. List Tagihan / Status */}
          <li className="p-3">
            <div
              className="message-center"
              style={{ maxHeight: "300px", overflowY: "auto" }}
            >
              {loading && (
                <div className="p-3 text-center">
                  <div
                    className="spinner-border spinner-border-sm text-primary"
                    role="status"
                  ></div>
                  <span className="ms-2">Memuat tagihan...</span>
                </div>
              )}

              {!loading && error && (
                <div className="p-3 text-center text-danger small">{error}</div>
              )}

              {/* ✅ KONDISI KOSONG */}
              {!loading && !error && tagihan.length === 0 && (
                <div className="p-3 text-center text-muted small">
                  Tidak ada tagihan tertunda saat ini.
                </div>
              )}

              {/* ✅ LIST TAGIHAN (Maksimal 3 item) */}
              {!loading &&
                !error &&
                tagihan.map((item) => (
                  <div
                    key={item.id}
                    className="d-flex align-items-center justify-content-between p-2 mb-2 border-bottom"
                  >
                    {/* Kiri: Deskripsi Tagihan */}
                    <div className="me-3" style={{ flexGrow: 1 }}>
                      <h6 className="mb-1 text-info">{item.description}</h6>
                      <span className="mail-desc text-danger small">
                        Jatuh Tempo: {item.due_date}
                      </span>
                    </div>

                    {/* Kanan: Jumlah dan Tombol */}
                    <div className="d-flex flex-column align-items-end justify-content-between">
                      <strong className="time text-dark mb-2">
                        {item.amount}
                      </strong>
                      <button
                        className="btn btn-sm btn-outline-info"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleShowDetail(item);
                        }}
                      >
                        <FaEye /> Detail
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </li>

          {/* 3. Tautan Lihat Semua Tagihan */}
          {tagihan.length > 0 && (
            <li>
              <a
                className="nav-link text-center d-block p-2 text-primary"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  handleClick("page");
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
          )}
        </ul>
      </div>
    </NavDropdown>
  );
}
