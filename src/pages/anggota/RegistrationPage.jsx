// src/pages/anggota/RegistrationPage.jsx

import React, { useCallback } from "react";
import { Card, Button } from "react-bootstrap"; // Hanya Card & Button yang diperlukan
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft, FaFileAlt } from "react-icons/fa"; // Mengganti FaSave dengan FaFileAlt
import DashboardLayout from "../../components/layout/DashboardLayout";

export default function RegistrationPage() {
  const navigate = useNavigate();

  // Handler untuk kembali ke Dashboard (landingPage)
  const handleBackToDashboard = useCallback(() => {
    const token = jwtEncode({ page: "landingPage" });
    navigate(`/${token}`);
  }, [navigate]);

  // Handler untuk tombol "Isi Form Permohonan Menjadi Anggota"
  const handleFillForm = useCallback(() => {
    // ✅ PERUBAHAN: Arahkan ke rute baru untuk formulir detail
    const token = jwtEncode({ page: "registrationFormDetail" });
    navigate(`/${token}`);
  }, [navigate]);

  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBackToDashboard}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Pendaftaran Anggota
          </h3>
        </div>
      </div>

      {/* --- KONTEN HALAMAN PENDAFTARAN --- */}
      <div className="row">
        {/* Menggunakan mx-auto untuk memusatkan card di layar lebar */}
        <div className="col-lg-10 col-xl-8 mx-auto">
          {/* Card: Pendaftaran Anggota (Deskripsi dan Tombol) */}
          <Card className="shadow-lg mb-4">
            <Card.Header className="bg-primary text-white">
              Pendaftaran Anggota
            </Card.Header>
            <Card.Body>
              <p>
                Pendaftaran menjadi calon anggota dapat dilakukan dengan cara
                mengunjungi kantor layanan terdekat atau secara daring (online)
                melalui aplikasi ini.
              </p>
              <p className="mb-4">
                Jika Anda berminat untuk mendaftar sebagai anggota, silahkan
                klik tombol **Isi Form Permohonan Menjadi Anggota**:
              </p>
              <Button
                variant="primary"
                className="w-100 py-2" // Tombol full width
                onClick={handleFillForm}
              >
                <FaFileAlt className="me-2" /> Isi Form Permohonan Menjadi
                Anggota
              </Button>
            </Card.Body>
          </Card>

          {/* Card: Ketentuan Pendaftaran Anggota */}
          <Card className="shadow-lg mb-4">
            <Card.Header className="bg-white text-dark">
              Ketentuan Pendaftaran Anggota
            </Card.Header>
            <Card.Body>
              <p>
                Mengacu pada Peraturan Menteri Koperasi dan Usaha Kecil dan
                Menengah Republik Indonesia Nomor 10/Per/M.KUKM/IX/2015 syarat
                untuk menjadi anggota koperasi sebagai berikut :
              </p>
              <ol className="ms-3">
                {" "}
                {/* Menambahkan margin kiri untuk list */}
                <li>Warga Negara Indonesia</li>
                <li>Melengkapi Dokumen Permohonan menjadi Anggota Koperasi</li>
                <li>
                  Melunasi kewajiban Anggota yang ditentukan pada Anggaran Dasar
                  / Anggaran Dasar Rumah Tangga
                </li>
              </ol>
            </Card.Body>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
