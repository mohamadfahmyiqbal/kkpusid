// src/components/anggota/regsitrationForm/RegistrationSummary.jsx

import React, { useCallback } from "react";
import { Card, Button, Table, Row, Col, Alert } from "react-bootstrap";
// Import ikon yang diperlukan
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import ApprovalPlaceholder from "../../ui/ApprovalPlaceholder";
// 🚨 NEW: Import hook navigasi dan helper routing
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";


// Komponen Utama
export default function RegistrationSummary({
 data,
 onBackToDashboard,
 baseUrl,
 // onNavigateToBilling Dihapus dari prop
}) {
 // 🚨 NEW: Inisialisasi hook navigasi
 const navigate = useNavigate();

 // Data utama dari tabel member_registrations
 const {
  full_name,
  email,
  phone_number,
  nik_ktp,
  address_ktp,
  member_type,
  ktp_photo_path,
  selfie_photo_path,
  currentStep,
  final_status,
  registration_status,
  initial_bill_id
 } = data;
console.log(data);

 // 🚨 HANDLER NAVIGASI DIDEFINISIKAN DI SINI, MENGARAHKAN KE INVOICE PAGE
 const handleNavigateToInvoice = useCallback(() => {
  // Asumsi: Kita perlu meneruskan ID invoice atau ID pendaftaran (registrationId) ke InvoicePage.
  // Dalam contoh ini, kita asumsikan rute Anda menerima token yang mengandung 'page' dan 'invoiceId'.
  // Karena data tagihan spesifik (invoice ID) tidak ada di `data` prop, 
  // kita akan menggunakan placeholder rute: 'memberInvoice'
  const mockInvoiceId = data.registration_id || 'REG001'; // Gunakan ID registrasi sebagai placeholder

  const token = jwtEncode({
   page: "invoicePage", // 🚨 Rute tujuan: InvoicePage
   billId: initial_bill_id,
   return: "registrationPage" // Untuk navigasi kembali dari InvoicePage
  });

  navigate(`/${token}`);
  console.log(`Navigasi ke halaman Invoice ID: ${mockInvoiceId}`);
 }, [navigate, data]);


 // FIX: FUNGSI getFullImagePath DENGAN SAFEGURAD UNTUK MENCEGAH TypeError
 const getFullImagePath = (relativePath) => {
  if (!relativePath || typeof relativePath !== 'string') {
   return 'assets/images/no-image.png';
  }
  const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
  const cleanPath = relativePath.startsWith("/")
   ? relativePath.slice(1)
   : relativePath;
  return `${cleanBase}/${cleanPath}`;
 };

 // Logika Status
 let statusVariant;
 let statusText;
 switch (final_status) {
  case "APPROVED":
   statusVariant = "success";
   statusText = "Selamat! Pendaftaran Anda **telah disetujui penuh** dan akun Anda **telah aktif**.";
   break;
  case "REJECTED":
   statusVariant = "danger";
   statusText = "Maaf, pendaftaran Anda **telah ditolak**. Proses selesai.";
   break;
  case "IN_PROGRESS":
  default:
   statusVariant = "warning";
   statusText = `Pendaftaran sedang dalam proses persetujuan. Menunggu verifikasi di tahap: <b>${currentStep?.step_name || 'Tidak Diketahui'}</b>.`;
   break;
 }

 // Logika Approval
 const currentStepId = currentStep ? currentStep.approval_step_id : 0;
 const isPengawasApproved = currentStepId > 1 || final_status === 'APPROVED';
 const isKetuaApproved = final_status === 'APPROVED';

 // LOGIKA UNTUK TOMBOL BAYAR SEKARANG
 const showPayNowButton = final_status === 'APPROVED' && registration_status === 'aktif';

 return (
  <div className="container-fluid">
   {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
   <div className="row page-titles pt-3">
    <div className="col-12 align-self-center">
     <h3 className="text-themecolor mb-0 mt-0">
      <span
       role="button"
       onClick={onBackToDashboard}
       style={{ cursor: "pointer" }}
       className="me-3"
      >
       <FaArrowLeft className="me-2" />
      </span>
      Pendaftaran Anggota
     </h3>
     <ol className="breadcrumb">
      <li className="breadcrumb-item">Dashboard</li>
      <li className="breadcrumb-item active">Detail Pendaftaran</li>
     </ol>
    </div>
   </div>

   <Row>
    <Col lg={12}>
     <Card className="shadow-lg mb-4">
      <Card.Header className="bg-info text-white">
       <h5 className="mb-0">Detail Pendaftaran Anggota</h5>
      </Card.Header>
      <Card.Body className="p-0">

       {/* === 1. Personal Info === */}
       <div className="p-3 border-bottom">
        <h6 className="mt-0 mb-3 fw-bold">Personal Info</h6>
        <Table borderless size="sm" className="mb-0 registration-table">
         <tbody>
          <tr>
           <th style={{ width: "30%" }}>Nama</th>
           <td style={{ width: "70%" }} className="text-end">
            {full_name}
           </td>
          </tr>
          <tr>
           <th>Jenis Kelamin</th>
           <td className="text-end">Laki-Laki (Placeholder)</td>
          </tr>
          <tr>
           <th>NIK</th>
           <td className="text-end">{nik_ktp}</td>
          </tr>
          <tr>
           <th>Alamat</th>
           <td colSpan="2">{address_ktp}</td>
          </tr>
         </tbody>
        </Table>
       </div>

       {/* === 2. Foto Info === */}
       <div className="p-3 border-bottom">
        <h6 className="mt-0 mb-3 fw-bold">Foto Info</h6>
        <Row>
         <Col xs={6} className="text-center">
          <Card className="border">
           <Card.Body className="p-2">
            <p className="mb-1 fw-bold">Foto KTP</p>
            <img
             src={getFullImagePath(ktp_photo_path)}
             alt="Foto KTP"
             className="img-fluid rounded"
             style={{
              maxWidth: "100%",
              maxHeight: "150px",
              objectFit: "contain",
             }}
            />
           </Card.Body>
          </Card>
         </Col>
         <Col xs={6} className="text-center">
          <Card className="border">
           <Card.Body className="p-2">
            <p className="mb-1 fw-bold">Swafoto</p>
            <img
             src={getFullImagePath(selfie_photo_path)}
             alt="Foto Swafoto"
             className="img-fluid rounded"
             style={{
              maxWidth: "100%",
              maxHeight: "150px",
              objectFit: "contain",
             }}
            />
           </Card.Body>
          </Card>
         </Col>
        </Row>
       </div>

       {/* === 3. Account Info === */}
       <div className="p-3 border-bottom">
        <h6 className="mt-0 mb-3 fw-bold">Account Info</h6>
        <Table borderless size="sm" className="mb-0 registration-table">
         <tbody>
          <tr>
           <th style={{ width: "30%" }}>Tipe Anggota</th>
           <td style={{ width: "70%" }} className="text-end">
            {member_type}
           </td>
          </tr>
          <tr>
           <th>No Telepon</th>
           <td className="text-end">{phone_number}</td>
          </tr>
          <tr>
           <th>Email</th>
           <td className="text-end">{email}</td>
          </tr>
         </tbody>
        </Table>
       </div>

       {/* === 4. Approval Status & Placeholder === */}
       <div className="p-3">
        <h6 className="mt-0 mb-3 fw-bold">Approval</h6>

        {/* Alert Status */}
        <Alert variant={statusVariant} className="text-center p-2">
         <small dangerouslySetInnerHTML={{ __html: statusText }} />
        </Alert>

        <Row className="text-center">
         <Col xs={6}>
          <ApprovalPlaceholder role="Pengawas" isApproved={isPengawasApproved} />
         </Col>
         <Col xs={6}>
          <ApprovalPlaceholder role="Ketua" isApproved={isKetuaApproved} />
         </Col>
        </Row>
       </div>

       <div className="p-3 border-top">
        <Alert variant="secondary" className="mb-0">
         <small>
          Catatan: Detail data pekerjaan, bank, dan kontak darurat
          tersimpan, tetapi tidak ditampilkan di ringkasan ini.
         </small>
        </Alert>
       </div>
      </Card.Body>
     </Card>

     {/* === 5. Tombol Aksi === */}
     <div className="d-grid gap-2 mb-5">
      {/* Tampilkan Tombol Bayar Sekarang jika APPROVED penuh */}
      {showPayNowButton && (
       <Button onClick={handleNavigateToInvoice} variant="success" size="lg">
        <FaMoneyBillWave className="me-2" /> Bayar Sekarang (Tagihan Awal)
       </Button>
      )}

      {/* Tombol Kembali */}
      <Button onClick={onBackToDashboard} variant="primary">
       Kembali ke Dashboard
      </Button>
     </div>
    </Col>
   </Row>
  </div>
 );
}