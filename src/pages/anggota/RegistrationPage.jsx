// src/pages/anggota/RegistrationPage.jsx (FINAL DENGAN CEK STATUS & SUMMARY)

import React, { useCallback, useState, useEffect } from "react";
import { Card, Button, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft, FaFileAlt } from "react-icons/fa";
import UAnggota from "../../utils/api/UAnggota"; // <-- Menggunakan utility yang Anda sediakan
import RegistrationSummary from "../../components/anggota/regsitrationForm/RegistrationSummary"; // <-- Import komponen baru

export default function RegistrationPage() {
 const navigate = useNavigate();
 // State untuk status dan data pendaftaran
 const [isRegistered, setIsRegistered] = useState(false);
 const [registrationData, setRegistrationData] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 // Asumsi base URL untuk gambar, mungkin perlu disesuaikan dengan env Anda
 const BASE_URL = "/public";

 // Handler untuk kembali ke Dashboard
 const handleBackToDashboard = useCallback(() => {
  const token = jwtEncode({ page: "dashboard" });
  navigate(`/${token}`);
 }, [navigate]);

 // Handler untuk tombol "Isi Form Permohonan Menjadi Anggota"
 const handleFillForm = useCallback(() => {
  const token = jwtEncode({ page: "registrationFormDetail" });
  navigate(`/${token}`);
 }, [navigate]);

 // LOGIKA CEK STATUS PENDAFTARAN
 useEffect(() => {
  const fetchRegistrationStatus = async () => {
   try {
    // PERHATIAN: Tambahkan method getRegistrationStatus() ke UAnggota.jsx
    // Asumsi method baru di UAnggota.jsx menggunakan endpoint '/anggota/registration/status'
    const response = await UAnggota.getRegistrationStatus();

    if (
     response.data.status === true &&
     response.data.is_registration_done
    ) {
     // Pendaftaran ditemukan
     setIsRegistered(true);
     setRegistrationData(response.data.data); // Memuat data summary dari backend
    } else {
     // Pendaftaran belum ada atau belum lengkap
     setIsRegistered(false);
     setRegistrationData(null);
    }
   } catch (err) {
    console.error("Error fetching registration status:", err);
    setError("Gagal memuat status pendaftaran. Silakan coba lagi.");
   } finally {
    setLoading(false);
   }
  };

  fetchRegistrationStatus();
 }, []);

 // LOGIKA RENDERING BERDASARKAN STATUS

 // 1. Loading
 if (loading) {
  return (
   <div className="text-center py-5">
    <Spinner animation="border" role="status" variant="primary" />
    <p className="mt-2">Memuat status pendaftaran...</p>
   </div>
  );
 }

 // 2. Error
 if (error) {
  return <Alert variant="danger">{error}</Alert>;
 }

 // 3. JIKA SUDAH MENDAFTAR, TAMPILKAN SUMMARY (STEP 8)
 if (isRegistered && registrationData) {
  return (
   <RegistrationSummary
    data={registrationData}
    onBackToDashboard={handleBackToDashboard}
    baseUrl={BASE_URL}
   />
  );
 }

 // 4. JIKA BELUM MENDAFTAR (Default View)
 return (
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
 );
}
