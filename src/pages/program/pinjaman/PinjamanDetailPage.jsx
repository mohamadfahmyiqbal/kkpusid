// pages/program/pinjaman/PinjamanDetailPage.jsx (Final Code)

import React, { useCallback } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

// Perhatikan path relative yang diubah (naik 3 tingkat)
import DashboardLayout from '../../../components/layout/DashboardLayout';
import { jwtEncode } from '../../../routes/helpers';
import ApprovalPlaceholder from '../../../components/ui/ApprovalPlaceholder'; // <-- IMPORT DARI COMPONENTS/UI

// MOCK DATA (Untuk simulasi tampilan detail pengajuan)
const MOCK_DETAIL_DATA = {
 jenis: "Pinjaman Lunak",
 jumlahPinjaman: "Rp 5.000.000",
 jumlahTerm: "3x Pembayaran",
 nominal: "Rp. 5.000.000 / 3 Bulan",
 estimasiAngsuran: "Rp. 1.666.666",
 akad: "Telah disetujui",
 syaratKetentuan: "Telah disetujui"
};

// Approval Chain (Digunakan untuk mapping komponen ApprovalPlaceholder)
const APPROVAL_CHAIN = [
 { role: "Pengawas" },
 { role: "Ketua" },
 { role: "Bendahara" }
];

export default function PinjamanDetailPage() {
 const navigate = useNavigate();
 const detailData = MOCK_DETAIL_DATA;

 // Fungsi untuk kembali ke Halaman Program
 const handleBack = useCallback(() => {
  const token = jwtEncode({ page: "programPage" });
  navigate(`/${token}`);
 }, [navigate]);

 return (
  <DashboardLayout>
   {/* HEADER JUDUL DENGAN TOMBOL KEMBALI */}
   <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
    <div className="col-12 align-self-center d-flex align-items-center">
     <Button variant="link" onClick={handleBack} className="text-dark p-0 me-3">
      <FaArrowLeft size={24} />
     </Button>
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Detail Pengajuan Pinjaman</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      <Card className="shadow-lg border-0">
       <Card.Body className="p-4">
        {/* BAGIAN DETAIL PENGAJUAN */}
        <h5 className="fw-bold mb-3 text-primary">Detail Pengajuan</h5>
        <Row className="mb-4 small">
         <Col xs={6}>
          <small className="d-block text-muted">Jenis</small>
          <h6 className="fw-bold">{detailData.jenis}</h6>
         </Col>
         <Col xs={6}>
          <small className="d-block text-muted">Jumlah Pinjaman</small>
          <h6 className="fw-bold">{detailData.jumlahPinjaman}</h6>
         </Col>
         <Col xs={12} className="mt-3">
          <small className="d-block text-muted">Jumlah Term</small>
          <h6 className="fw-bold">{detailData.jumlahTerm}</h6>
         </Col>
        </Row>
        <hr />

        {/* BAGIAN SUMMARY DETAIL */}
        <h5 className="fw-bold mb-3 text-primary">Summary Detail</h5>
        <div className="d-flex justify-content-between align-items-center mb-2">
         <span className="small text-muted">Nominal</span>
         <span className="fw-bold">{detailData.nominal}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
         <span className="small text-muted">Estimasi Angsuran</span>
         <span className="fw-bold text-success">{detailData.estimasiAngsuran}</span>
        </div>
        <hr />

        {/* BAGIAN AKAD DAN SYARAT & KETENTUAN */}
        <h5 className="fw-bold mb-3 text-primary">Akad dan Syarat & Ketentuan</h5>
        <div className="form-check mb-2">
         <input className="form-check-input" type="checkbox" checked readOnly id="checkAkad" />
         <label className="form-check-label" htmlFor="checkAkad">Akad</label>
        </div>
        <div className="form-check mb-4">
         <input className="form-check-input" type="checkbox" checked readOnly id="checkSyarat" />
         <label className="form-check-label" htmlFor="checkSyarat">Syarat & Ketentuan</label>
        </div>
        <hr />

        {/* BAGIAN APPROVAL (Menggunakan ApprovalPlaceholder) */}
        <h5 className="fw-bold mb-3 text-primary">Approval</h5>
        <Row className="text-center">
         {APPROVAL_CHAIN.map((approval, index) => (
          <Col xs={4} key={index}>
           <ApprovalPlaceholder role={approval.role} />
          </Col>
         ))}
        </Row>
       </Card.Body>
       <Card.Footer className="text-center bg-white border-0">
        <Button
         variant="secondary"
         className="fw-bold"
         onClick={handleBack}
        >
         Selesai
        </Button>
       </Card.Footer>
      </Card>
     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}