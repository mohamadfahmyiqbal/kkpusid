// src/pages/anggota/RegistrationPage.jsx (FINAL STRUCTURE)

import React, { useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft, FaFileAlt } from "react-icons/fa";
// ✅ HAPUS: Tidak perlu mengimpor DashboardLayout lagi

export default function RegistrationPage() {
  const navigate = useNavigate();

  // Handler untuk kembali ke Dashboard
  const handleBackToDashboard = useCallback(() => {
    // Navigasi ke rute 'dashboard' yang terenkripsi
    const token = jwtEncode({ page: "dashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  // Handler untuk tombol "Isi Form Permohonan Menjadi Anggota"
  const handleFillForm = useCallback(() => {
    // Navigasi ke rute formulir detail pendaftaran
    const token = jwtEncode({ page: "registrationFormDetail" });
    navigate(`/${token}`);
  }, [navigate]);

  return (
    // ✅ KONSISTENSI: Hanya merender konten di dalam container-fluid
    // DashboardLayout sudah disediakan oleh DashboardLayoutProvider di tingkat router.
    <div className="container-fluid">
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBackToDashboard}
              style={{ cursor: "pointer" }}
              className="me-3"
            >
              <FaArrowLeft className="me-2" />
            </span>
            Pendaftaran Anggota
          </h3>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item active">Pendaftaran Anggota</li>
          </ol>
        </div>
      </div>

      {/* Konten Utama */}
      <div className="row">
        <div className="col-lg-12">
          {/* Card: Action Button */}
          <Card className="shadow-lg mb-4 bg-primary text-white">
            <Card.Body>
              <h5 className="mb-3">Mulai Proses Pendaftaran Anda</h5>
              <p>
                Anda selangkah lagi untuk menjadi Anggota Penuh. Silakan klik
                tombol **Isi Form Permohonan Menjadi Anggota** di bawah ini:
              </p>
              <Button
                variant="light"
                className="w-100 py-2 text-primary"
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
                Menengah Republik Indonesia Nomor 10/Per/M.KUKM/IX/2015, syarat
                untuk menjadi anggota koperasi sebagai berikut :
              </p>
              <ol className="ms-3">
                <li>Warga Negara Indonesia</li>
                <li>Melengkapi Dokumen Permohonan menjadi Anggota Koperasi</li>
                <li>
                  Melunasi kewajiban Anggota yang ditentukan pada Anggaran Dasar
                  / Anggaran Dasar Rumah Tangga (Simpanan Pokok & Wajib)
                </li>
              </ol>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
    // Penutup container-fluid
  );
}
