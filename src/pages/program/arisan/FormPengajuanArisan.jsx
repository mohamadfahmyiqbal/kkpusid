// pages/program/arisan/FormPengajuanArisan.jsx (Contoh Kode Baru)

import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";
import DashboardLayout from "../../../components/layout/DashboardLayout";

// --- Komponen Pembantu (Asumsikan FormInputField & SummaryDetailCredit ada) ---
// (Menggunakan FormInputField dari FormPengajuanPinjaman.jsx)
const FormInputField = ({ label, value, name, type = "text", readOnly = false, onChange, placeholder = "" }) => (
 <Form.Group className="mb-3">
  <Form.Label className="small mb-0 text-muted">{label}</Form.Label>
  <Form.Control
   type={type}
   name={name}
   value={value}
   placeholder={placeholder}
   readOnly={readOnly}
   onChange={onChange}
   className="fw-bold border-0 border-bottom rounded-0 px-0"
  />
 </Form.Group>
);

const SummaryDetail = ({ summaryData }) => (
 <Card className="shadow-sm border-0 mt-4">
  <Card.Body>
   <h5 className="fw-bold mb-3 text-primary">Summary Detail</h5>
   <Row className="small">
    {Object.entries(summaryData).map(([key, value]) => (
     <Col xs={12} className="d-flex justify-content-between mb-2" key={key}>
      <span className="text-muted">{key}</span>
      <span className="fw-bold text-dark">{value}</span>
     </Col>
    ))}
   </Row>
  </Card.Body>
 </Card>
);
// -----------------------------------------------------------------------------

export default function FormPengajuanArisan() {
 const navigate = useNavigate();
 
 // State untuk menampung input user
 const [formData, setFormData] = useState({
  namaAnggota: "Avhan Hadi", // Nama default
  namaPeserta2: "Maria",
  keterangan: "",
 });

 const handleInputChange = useCallback((e) => {
  setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
 }, []);

 const handleProses = useCallback(() => {
  // Logic validasi di sini...
  
  // Navigasi ke halaman detail/transaksi setelah proses pengajuan
  const token = jwtEncode({ page: "arisanDetailPage", data: formData });
  navigate(`/${token}`);
  console.log("Navigasi ke Halaman Detail Pengajuan Arisan Baru.");

 }, [formData, navigate]);

 const handleBack = useCallback(() => {
  // Kembali ke halaman ArisanPage
  const token = jwtEncode({ page: "arisanPage" });
  navigate(`/${token}`);
 }, [navigate]);
 
 // --- Data Statis/Mockup Sesuai Arisan_Pengajuan.png ---
 const programName = "Arisan Haji Batch 1";
 const periodeAngsuran = "Januari 2025 - Desember 2028";
 
 const summaryData = {
  "Biaya Perjalanan": "Rp. 25.200.000",
  "Jumlah Keberangkatan": "2 Orang",
  "Target": "Rp. 50.400.000",
  "Term": "36 Bulan",
  "Bulanan": "Rp. 1.400.000",
  "Iuran": "Rp. 700.000",
 };

 const akadText = "Lorem Ipsum adalah contoh teks atau dummy";

 return (
  <DashboardLayout>
   {/* HEADER JUDUL DENGAN TOMBOL KEMBALI */}
   <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
    <div className="col-12 align-self-center d-flex align-items-center">
     <Button variant="link" onClick={handleBack} className="text-dark p-0 me-3">
      <FaArrowLeft size={24} />
     </Button>
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Arisan</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      <Form onSubmit={(e) => { e.preventDefault(); handleProses(); }}>
       <Card className="shadow-sm p-3 mb-4 border-0">
        <Card.Body>

         {/* INPUT FORM SESUAI MOCKUP */}
         <FormInputField
          label="Nama Anggota"
          name="namaAnggota"
          value={formData.namaAnggota}
          onChange={handleInputChange}
          readOnly // Anggota 1 mungkin read-only (nasabah sendiri)
         />
         <FormInputField
          label="Nama Peserta ke-2"
          name="namaPeserta2"
          value={formData.namaPeserta2}
          onChange={handleInputChange}
          placeholder="Masukkan nama peserta kedua"
         />
         
         <FormInputField label="Nama Program" value={programName} readOnly />
         <FormInputField label="Periode Angsuran" value={periodeAngsuran} readOnly />
         
         <Form.Group className="mb-4">
          <Form.Label className="small mb-0 text-muted">Keterangan pembukaan arisan</Form.Label>
          <Form.Control 
           as="textarea"
           rows={3}
           name="keterangan"
           value={formData.keterangan}
           onChange={handleInputChange}
           placeholder="Opsional: Tambahkan keterangan..."
          />
         </Form.Group>
        </Card.Body>
       </Card>

       {/* Bagian Summary Detail */}
       <SummaryDetail summaryData={summaryData} />
       
       {/* Bagian Akad */}
       <Card className="shadow-sm border-0 mt-4">
        <Card.Body>
         <h5 className="fw-bold mb-3 text-primary">Akad</h5>
         <p className="small text-muted">{akadText}</p>
        </Card.Body>
       </Card>

       {/* Tombol Proses */}
       <div className="d-grid gap-2 mt-5 mb-5">
        <Button
         variant="primary"
         type="submit"
         size="lg"
         className="fw-bold py-3"
         // disabled={/* Tambahkan logika disable jika perlu */}
        >
         Proses
        </Button>
       </div>
      </Form>
     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}