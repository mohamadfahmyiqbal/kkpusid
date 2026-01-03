// components/dashboard/RegistrationCard.jsx

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowRight, FaUserShield } from "react-icons/fa";

const RegistrationCard = ({
  user,
  title = "Silahkan Daftar Anggota",
  description = "Untuk dapat mengakses keseluruhan fitur. (*Mengacu pada UU No 4 Tahun 2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi)",
  pageKey = "registrationPage",
}) => {
  const navigate = useNavigate();

  // Navigasi terenkripsi ke halaman pendaftaran
  const handleRegister = useCallback(() => {
    if (!user) return;
    const token = jwtEncode({ page: pageKey });
    navigate(`/${token}`);
  }, [navigate, pageKey, user]);

  // Status anggota
  // status_id:
  // 0 / 1 = Calon Anggota
  // >1    = Anggota Tetap
  const statusId = parseInt(user?.status_id, 10) || 0;
  const isCandidate = statusId <= 1;

  // Jika sudah anggota tetap, kartu tidak ditampilkan
  if (!user || !isCandidate) {
    return null;
  }

  return (
    <div
      className="card bg-blueGrad text-white mb-4 shadow border-0 overflow-hidden"
      onClick={handleRegister}
      style={{ cursor: "pointer", borderRadius: "12px" }}
    >
      <div className="card-body p-4 position-relative">
        <div
          className="d-flex align-items-center justify-content-between position-relative"
          style={{ zIndex: 2 }}
        >
          <div className="me-3">
            <h4 className="card-title text-white mb-2 fw-bold">
              <FaUserShield className="me-2" />
              {title}
            </h4>

            <p
              className="card-text mb-0 opacity-90"
              style={{ fontSize: "0.85rem", lineHeight: "1.5" }}
            >
              {description}
            </p>
          </div>

          <div className="text-white flex-shrink-0 animate-arrow">
            <FaArrowRight size={28} />
          </div>
        </div>

        {/* Ornamen Background */}
        <div
          className="position-absolute"
          style={{
            right: "-15px",
            top: "-15px",
            opacity: 0.15,
            fontSize: "80px",
            zIndex: 1,
            transform: "rotate(-15deg)",
          }}
        >
          <FaUserShield />
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;
