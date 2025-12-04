// pages/program/arisan/ArisanJoinPage.jsx (Dioptimasi - Sesuai Arisan_List.png)

import React, { useCallback } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft, FaUsers, FaFileSignature } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../../../components/layout/DashboardLayout';
import { jwtEncode } from '../../../routes/helpers';

// --- MOCK DATA DAFTAR ARISAN ---
const MOCK_ARISAN_LIST = [
 {
  batch: "Batch 1",
  kategori: "Arisan Haji/Umroh Skema 1",
  peserta: "6/6 Peserta",
  targetNominal: "Rp. 50.400.000",
  term: "36 Bulan",
  setoranPerBulan: "Rp. 1.400.000",
  periodeAngsuran: "Jan 2025 - Des 2028",
  status: "Tutup", // Penuh
 },
 {
  batch: "Batch 2",
  kategori: "Arisan Haji/Umroh Skema 1",
  peserta: "5/30 Peserta",
  targetNominal: "Rp. 50.400.000",
  term: "36 Bulan",
  setoranPerBulan: "Rp. 1.400.000",
  periodeAngsuran: "Jan 2025 - Des 2028",
  status: "Buka", // Tersedia
 },
 // ... data lain
];

// --- KOMPONEN ITEM ARISAN ---
const ArisanListItem = React.memo(({ arisan, handleJoin, handleWaitlist }) => {
 const isFull = arisan.status === "Tutup";

 return (
  <Card className="shadow-sm mb-3 border-0">
   <Card.Body className="p-3">
    {/* Judul dan Batch */}
    <h6 className="fw-bold text-dark mb-2">{arisan.kategori}</h6>
    <p className="text-primary fw-bold mb-3">{arisan.batch}</p>

    {/* Detail */}
    <Row className="small">
     <Col xs={6} className="mb-2">
      <small className="d-block text-muted">Kategori</small>
      <span className="fw-bold">{arisan.kategori}</span>
     </Col>
     <Col xs={6} className="mb-2">
      <small className="d-block text-muted">Peserta</small>
      <span className="fw-bold">{arisan.peserta}</span>
     </Col>
     <Col xs={6} className="mb-2">
      <small className="d-block text-muted">Target Nominal</small>
      <span className="fw-bold">{arisan.targetNominal}</span>
     </Col>
     <Col xs={6} className="mb-2">
      <small className="d-block text-muted">Term</small>
      <span className="fw-bold">{arisan.term}</span>
     </Col>
     <Col xs={6} className="mb-2">
      <small className="d-block text-muted">Setoran per bulan</small>
      <span className="fw-bold text-success">{arisan.setoranPerBulan}</span>
     </Col>
     <Col xs={6} className="mb-2">
      <small className="d-block text-muted">Periode Angsuran</small>
      <span className="fw-bold">{arisan.periodeAngsuran}</span>
     </Col>
    </Row>

    {/* TOMBOL AKSI */}
    <div className="d-grid gap-2 mt-3 pt-3 border-top">
     {isFull ? (
      <>
       {/* Jika Penuh: Daftar Sekarang disabled, Daftar Tunggu aktif (sesuai mockup) */}
       <Button
        variant="primary"
        className="fw-bold"
        disabled
        style={{ opacity: 0.65 }}
       >
        <FaUsers className="me-2" /> Daftar Sekarang
       </Button>
       <Button
        variant="secondary"
        className="fw-bold"
        onClick={() => handleWaitlist(arisan)}
       >
        <FaFileSignature className="me-2" /> Daftar Tunggu
       </Button>
      </>
     ) : (
      // Jika Buka: hanya tampilkan Daftar Sekarang
      <Button
       variant="primary"
       className="fw-bold"
       onClick={() => handleJoin(arisan)}
      >
       <FaUsers className="me-2" /> Daftar Sekarang
      </Button>
     )}
    </div>
   </Card.Body>
  </Card>
 );
});


export default function ArisanJoinPage() {
 const navigate = useNavigate();

 const handleBack = useCallback(() => {
  const token = jwtEncode({ page: "arisanPage" });
  navigate(`/${token}`);
 }, [navigate]);

 const handleJoin = useCallback((arisan) => {
  const token = jwtEncode({
   page: "formPengajuanArisan",
   arisan: arisan
  });
  navigate(`/${token}`);
 }, [navigate]);

 const handleWaitlist = useCallback((arisan) => {
  alert(`Anda masuk daftar tunggu untuk Grup Arisan ${arisan.batch}.`);
 }, []);

 return (
  <DashboardLayout>
   {/* HEADER JUDUL DENGAN TOMBOL KEMBALI */}
   <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
    <div className="col-12 align-self-center d-flex align-items-center">
     <Button variant="link" onClick={handleBack} className="text-dark p-0 me-3">
      <FaArrowLeft size={24} />
     </Button>
     {/* JUDUL SESUAI MOCKUP */}
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Arisan</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      {MOCK_ARISAN_LIST.map((arisan, index) => (
       <ArisanListItem
        key={index}
        arisan={arisan}
        handleJoin={handleJoin}
        handleWaitlist={handleWaitlist}
       />
      ))}
     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}