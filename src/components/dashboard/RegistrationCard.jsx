// components/dashboard/RegistrationCard.jsx

import React, { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

const RegistrationCard = ({
  user,
  title = "Silahkan Daftar Anggota",
  description = "Untuk dapat mengakses keseluruhan fitur. Layanan ini bersifat inclusive loop, hanya diperuntukan untuk Anggota Koperasi",
  pageKey = "registrationPage",
}) => {
  const navigate = useNavigate();

  const handleRegister = useCallback(() => {
    const token = jwtEncode({ page: pageKey });
    navigate(`/${token}`);
  }, [navigate, pageKey]);

  // 💡 PERBAIKAN UTAMA: Logika kondisional diubah.
  // Kartu ini seharusnya TAMPIL jika role adalah 1 (Calon Anggota).
  // Kartu ini seharusnya TIDAK TAMPIL jika role adalah 2, 3, dst (Anggota Penuh).
  const isRegisteredMember = user && user.role > 1;

  if (isRegisteredMember) {
    // Jika role > 1, pengguna dianggap sudah terdaftar penuh, sembunyikan kartu.
    return null;
  }

  // --- Rendering ---
  return (
    // Card: Silahkan Daftar Anggota (Akan muncul jika role <= 1)
    <div
      className="card bg-blueGrad text-white p-3 mb-4 shadow"
      onClick={handleRegister}
      style={{ cursor: "pointer" }}
    >
      <div className="card-body d-flex align-items-center justify-content-between p-2">
        <div className="me-3">
          <h4 className="card-title text-white mb-1">{title}</h4>
          <p className="card-text mb-0" style={{ fontSize: "0.9rem" }}>
            {description}
          </p>
        </div>

        <div className="text-white flex-shrink-0" style={{ fontSize: "2rem" }}>
          <i className="fa fa-arrow-right"></i>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCard;
