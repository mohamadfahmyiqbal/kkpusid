// pages/program/arisan/ArisanDetailPage.jsx (Detail Pengajuan Arisan Baru)

import React, { useCallback, useMemo } from 'react';
import { Card, Button, Container, Row, Col } from 'react-bootstrap';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

import DashboardLayout from '../../../components/layout/DashboardLayout';
import { jwtEncode } from '../../../routes/helpers';
import ApprovalPlaceholder from '../../../components/ui/ApprovalPlaceholder'; 
// Asumsi ApprovalPlaceholder diimpor dari PinjamanDetailPage.jsx

// --- FUNGSI LOKAL UNTUK DEKODE PAYLOAD TOKEN ---
const decodeTokenPayload = (token) => {
 if (!token) return null;
 try {
  const [, payload] = token.split(".");
  const json = decodeURIComponent(
   escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
  );
  return JSON.parse(json);
 } catch (err) {
  return null;
 }
};

// --- APPROVAL CHAIN (Sama seperti di PinjamanDetailPage) ---
const APPROVAL_CHAIN = [
 { role: "Pengawas" },
 { role: "Ketua" },
 { role: "Bendahara" }
];

// --- MOCK DATA (Gantikan dengan data dari token jika data dari form dikirim) ---
const MOCK_ARISAN_DETAIL = {
 namaProgram: "Arisan Haji Batch 1",
 target: "50.000.000",
 jumlahTerm: "12x Pembayaran",
 periode: "Jan 2025 - Des 2025",
 
 // Summary Detail Arisan
 biayaPerjalanan: "Rp. 25.200.000",
 jumlahKeberangkatan: "2 Orang",
 targetSummary: "Rp. 50.400.000",
 termSummary: "36 Bulan",
 bulanan: "Rp. 1.400.000",
 iuran: "Rp. 700.000",
};


export default function ArisanDetailPage() {
 const navigate = useNavigate();
 const { token } = useParams();

 // Gunakan data dari token jika ada, jika tidak, gunakan mockup
 const detailData = useMemo(() => {
  const payload = decodeTokenPayload(token);
  // Ganti MOCK_ARISAN_DETAIL dengan data dari payload jika payload.data ada
  return payload?.data || MOCK_ARISAN_DETAIL; 
 }, [token]);


 // Fungsi untuk kembali ke Halaman Arisan (ArisanPage)
 const handleBack = useCallback(() => {
  const token = jwtEncode({ page: "arisanPage" });
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
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Detail Pengajuan</h3> {/* Sesuai Arisan_Detail.png */}
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      <Card className="shadow-lg border-0">
       <Card.Body className="p-4">
        
        {/* BAGIAN DETAIL PENGAJUAN (Header) */}
        <h5 className="fw-bold mb-3 text-primary">Detail Pengajuan</h5>
        <Row className="mb-4 small">
         <Col xs={12} className="mb-2 d-flex justify-content-between">
          <span className="small text-muted">Nama Program</span>
          <span className="fw-bold">{detailData.namaProgram || MOCK_ARISAN_DETAIL.namaProgram}</span>
         </Col>
         <Col xs={12} className="mb-2 d-flex justify-content-between">
          <span className="small text-muted">Target</span>
          <span className="fw-bold">{detailData.target || MOCK_ARISAN_DETAIL.target}</span>
         </Col>
         <Col xs={12} className="mb-2 d-flex justify-content-between">
          <span className="small text-muted">Jumlah Term</span>
          <span className="fw-bold">{detailData.jumlahTerm || MOCK_ARISAN_DETAIL.jumlahTerm}</span>
         </Col>
         <Col xs={12} className="d-flex justify-content-between">
          <span className="small text-muted">Periode</span>
          <span className="fw-bold">{detailData.periode || MOCK_ARISAN_DETAIL.periode}</span>
         </Col>
        </Row>
        <hr />

        {/* BAGIAN SUMMARY DETAIL (Summary Detail) */}
        <h5 className="fw-bold mb-3 text-primary">Summary Detail</h5>
        
        {/* Mapping data Summary Detail dari MOCK_ARISAN_DETAIL */}
        <div className="d-flex justify-content-between align-items-center mb-2">
         <span className="small text-muted">Biaya Perjalanan</span>
         <span className="fw-bold">{MOCK_ARISAN_DETAIL.biayaPerjalanan}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
         <span className="small text-muted">Jumlah Keberangkatan</span>
         <span className="fw-bold">{MOCK_ARISAN_DETAIL.jumlahKeberangkatan}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
         <span className="small text-muted">Target</span>
         <span className="fw-bold">{MOCK_ARISAN_DETAIL.targetSummary}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
         <span className="small text-muted">Term</span>
         <span className="fw-bold">{MOCK_ARISAN_DETAIL.termSummary}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-2">
         <span className="small text-muted">Bulanan</span>
         <span className="fw-bold">{MOCK_ARISAN_DETAIL.bulanan}</span>
        </div>
        <div className="d-flex justify-content-between align-items-center mb-4">
         <span className="small text-muted">Iuran</span>
         <span className="fw-bold">{MOCK_ARISAN_DETAIL.iuran}</span>
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