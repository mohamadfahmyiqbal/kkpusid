// pages/program/FormPengajuanPinjaman.jsx (Final & Integrated)

import React, { useState, useCallback } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";
import DashboardLayout from "../../../components/layout/DashboardLayout";

// --- Komponen Pembantu (Dihilangkan untuk brevity, asumsikan berada di sini) ---
const FormInputField = ({ label, value, name, type = "text", readOnly = false, onChange, placeholder = "" }) => (
 // ... (JSX for FormInputField)
 <Form.Group className="mb-3">
  <Form.Label className="small mb-0 text-muted">{label}</Form.Label>
  <Form.Control
   type={type}
   name={name}
   defaultValue={value}
   placeholder={placeholder}
   readOnly={readOnly}
   onChange={onChange}
   className="fw-bold border-0 border-bottom rounded-0 px-0"
  />
 </Form.Group>
);

const SummaryDetailCredit = ({ nominal, angsuran, akad }) => (
 // ... (JSX for SummaryDetailCredit)
 <Card className="shadow-sm border-0 mt-4">
  <Card.Body>
   <h5 className="fw-bold mb-3 text-primary">Summary Detail Credit</h5>
   {/* ... details ... */}
  </Card.Body>
 </Card>
);

const FileUploadField = () => (
 // ... (JSX for FileUploadField)
 <Form.Group className="mb-4">
  <Form.Label className="fw-bold">Upload Evidence (Maks. 5MB)</Form.Label>
  <div className="border border-dashed border-secondary text-center p-5 text-muted hover-shadow">
   **Drag & Drop File** atau **Klik untuk Memilih**
  </div>
 </Form.Group>
);
// -----------------------------------------------------------------------------

export default function FormPengajuanPinjaman() {
 const navigate = useNavigate();
 const [formData, setFormData] = useState({
  nominalPinjaman: "3000000",
  termPembayaran: "3",
 });

 const handleInputChange = useCallback((e) => {
  const value = e.target.type === 'number' ? e.target.value : e.target.value;
  setFormData(prev => ({ ...prev, [e.target.name]: value }));
 }, []);

 const handleProses = useCallback(() => {
  if (parseInt(formData.nominalPinjaman) <= 0 || parseInt(formData.termPembayaran) <= 0) {
   alert("Nominal dan Term Pembayaran harus lebih dari nol.");
   return;
  }

  // Navigasi ke Halaman Detail Pinjaman (Key Baru)
  const token = jwtEncode({ page: "pinjamanDetailPage" });
  navigate(`/${token}`);

  console.log("Navigasi ke Halaman Detail Pinjaman.");

 }, [formData, navigate]);

 const handleBack = useCallback(() => {
  const token = jwtEncode({ page: "programPage" });
  navigate(`/${token}`);
 }, [navigate]);

 // --- Kalkulasi untuk Summary ---
 const nominal = parseInt(formData.nominalPinjaman) || 0;
 const tenor = parseInt(formData.termPembayaran) || 1;
 const estimasiAngsuran = (nominal / tenor);

 const formattedNominal = `Rp. ${nominal.toLocaleString('id-ID')} / ${tenor} Bulan`;
 const formattedAngsuran = `Rp. ${estimasiAngsuran.toLocaleString('id-ID', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;

 const akadText = "Berdasarkan akad Qardh Hasan (Pinjaman Kebajikan), di mana nasabah hanya mengembalikan pokok pinjaman tanpa tambahan imbalan/bunga. Estimasi angsuran dihitung rata per bulan.";

 return (
  <DashboardLayout>
   <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
    <div className="col-12 align-self-center d-flex align-items-center">
     <Button variant="link" onClick={handleBack} className="text-dark p-0 me-3">
      <FaArrowLeft size={24} />
     </Button>
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Pengajuan Pinjaman Lunak</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>
      <Form onSubmit={(e) => { e.preventDefault(); handleProses(); }}>
       <Card className="shadow-sm p-3 mb-4 border-0">
        <Card.Body>

         {/* DATA NASABAH (Read Only) */}
         <FormInputField label="Jenis Pinjaman" value="BBN" readOnly />
         <FormInputField label="Metode Pencairan" value="Non Tunai" readOnly />
         <FormInputField label="No Rekening Tujuan" value="2342342342423424" readOnly />
         <FormInputField label="Bank Tujuan" value="Bank Mandiri Syariah" readOnly />
         <FormInputField label="Nama Nasabah" value="Avhan Hadi" readOnly />

         {/* INPUT USER */}
         <hr className="my-4" />

         <FormInputField
          label="Nominal Pinjaman (Rp)"
          name="nominalPinjaman"
          value={formData.nominalPinjaman}
          onChange={handleInputChange}
          type="number"
          placeholder="Masukkan nominal pinjaman"
         />

         <FormInputField
          label="Pilih Term Pembayaran (Bulan)"
          name="termPembayaran"
          value={formData.termPembayaran}
          onChange={handleInputChange}
          type="number"
          placeholder="Contoh: 12"
         />

         {/* Upload Evidence */}
         <FileUploadField />
        </Card.Body>
       </Card>

       {/* Bagian Summary Detail Credit */}
       <SummaryDetailCredit
        nominal={formattedNominal}
        angsuran={formattedAngsuran}
        akad={akadText}
       />

       {/* Tombol Proses */}
       <div className="d-grid gap-2 mt-5 mb-5">
        <Button
         variant="primary"
         type="submit"
         size="lg"
         className="fw-bold py-3"
         disabled={nominal <= 0 || tenor <= 0}
        >
         Proses Pengajuan
        </Button>
       </div>
      </Form>
     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}