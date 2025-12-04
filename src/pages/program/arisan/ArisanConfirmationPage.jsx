// pages/program/arisan/ArisanConfirmationPage.jsx (Dioptimasi)

import React, { useCallback, useMemo } from 'react';
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { FaArrowLeft, FaCheckCircle } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardLayout from '../../../components/layout/DashboardLayout';
import { jwtEncode } from '../../../routes/helpers';

// --- FUNGSI LOKAL UNTUK DEKODE PAYLOAD TOKEN ---
// Fungsi ini digunakan untuk mengambil data 'arisan' dari payload token URL.
const decodeTokenPayload = (token) => {
 if (!token) return null;
 try {
  // Parsing sederhana untuk mengambil payload bagian tengah
  const [, payload] = token.split(".");
  // Base64 decode, membersihkan URL-safe characters, dan parsing JSON
  const json = decodeURIComponent(
   escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
  );
  return JSON.parse(json);
 } catch (err) {
  // Penanganan error jika token tidak valid
  return null;
 }
};

export default function ArisanConfirmationPage() {
 const navigate = useNavigate();
 const { token } = useParams(); // Mengambil token dari URL parameter

 // Dekode data arisan hanya sekali menggunakan useMemo
 const arisanData = useMemo(() => {
  const payload = decodeTokenPayload(token);
  return payload?.arisan || {}; // Mengambil objek 'arisan' dari payload
 }, [token]);

 const handleBack = useCallback(() => {
  // Kembali ke halaman daftar grup arisan
  const backToken = jwtEncode({ page: "arisanJoinPage" }); //
  navigate(`/${backToken}`);
 }, [navigate]);

 const handleConfirm = useCallback(() => {
  alert(`Konfirmasi gabung Grup Arisan ${arisanData.batch} berhasil! Menunggu persetujuan.`);

  // Navigasi ke halaman detail transaksi/pengajuan Arisan yang baru
  const detailToken = jwtEncode({
   page: "transactionDetailPage", // Target halaman
   action: "arisanEnrollment",
   data: {
    ...arisanData,
    invoiceNumber: "INV-ARS-2025001", // Tambahkan invoice number mock
    status: "Menunggu Persetujuan", // Status awal
    tanggalPengajuan: new Date().toLocaleDateString('id-ID'),
    total: arisanData.setoranPerBulan, // Total adalah setoran pertama
    details: [{
     description: `Setoran Pertama Grup ${arisanData.batch}`,
     amount: arisanData.setoranPerBulan
    }]
   },
   return: "arisanPage"
  });
  navigate(`/${detailToken}`);
 }, [arisanData, navigate]);

 // Pengecekan jika data arisan tidak valid (misal, token rusak)
 if (!arisanData || !arisanData.batch) {
  return (
   <DashboardLayout title="Konfirmasi Arisan">
    <Container className="mt-5 text-center">
     <Alert variant="danger">Data grup arisan tidak ditemukan.</Alert>
     <Button variant="secondary" onClick={handleBack}>Kembali</Button>
    </Container>
   </DashboardLayout>
  );
 }

 return (
  <DashboardLayout>
   {/* HEADER JUDUL DENGAN TOMBOL KEMBALI */}
   <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
    <div className="col-12 align-self-center d-flex align-items-center">
     <Button variant="link" onClick={handleBack} className="text-dark p-0 me-3">
      <FaArrowLeft size={24} />
     </Button>
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Konfirmasi Gabung Grup Arisan</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={8} md={10}>
      <Alert variant="info" className="text-center">
       Pastikan detail arisan di bawah ini sudah benar sebelum mengklik **Konfirmasi Gabung**.
      </Alert>
      <Card className="shadow-lg border-0">
       <Card.Body className="p-4">
        <h5 className="fw-bold mb-3 text-primary">{`Detail Arisan ${arisanData.batch}`}</h5>

        <Row className="mb-4 small">
         <Col xs={6} className="mb-3">
          <small className="d-block text-muted">Kategori</small>
          <h6 className="fw-bold">{arisanData.kategori}</h6>
         </Col>
         <Col xs={6} className="mb-3">
          <small className="d-block text-muted">Target Nominal</small>
          <h6 className="fw-bold text-success">{arisanData.targetNominal}</h6>
         </Col>
         <Col xs={6} className="mb-3">
          <small className="d-block text-muted">Setoran Bulanan</small>
          <h6 className="fw-bold text-success">{arisanData.setoranPerBulan}</h6>
         </Col>
         <Col xs={6} className="mb-3">
          <small className="d-block text-muted">Term/Durasi</small>
          <h6 className="fw-bold">{arisanData.term}</h6>
         </Col>
         <Col xs={12} className="mb-3">
          <small className="d-block text-muted">Periode Angsuran</small>
          <h6 className="fw-bold">{arisanData.periodeAngsuran}</h6>
         </Col>
        </Row>

        <hr />

        <div className="d-grid mt-4">
         <Button
          variant="primary"
          size="lg"
          className="fw-bold py-3"
          onClick={handleConfirm}
         >
          <FaCheckCircle className="me-2" /> Konfirmasi Gabung
         </Button>
        </div>
       </Card.Body>
      </Card>
     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}