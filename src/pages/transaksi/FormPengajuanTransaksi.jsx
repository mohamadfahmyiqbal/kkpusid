// pages/transaksi/FormPengajuanPembelian.jsx (Disesuaikan dari FormPengajuanTransaksi.jsx)

import React, { useState, useCallback, useMemo, memo } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import DashboardLayout from "../../components/layout/DashboardLayout";

// --- FUNGSI HELPER (TETAP) ---
const getReturnPageKey = (token) => {
 if (!token) return "transaksiDashboard";
 try {
  const [, payload] = token.split(".");
  const json = decodeURIComponent(
   escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
  );
  return JSON.parse(json)?.return ?? "transaksiDashboard";
 } catch (err) {
  return "transaksiDashboard";
 }
};

const formatCurrency = (amount) => {
 return amount.toLocaleString("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
 });
};

const formatInputDisplay = (amount) => {
 const num = parseInt(amount || 0);
 return num.toLocaleString("id-ID").replace(/,00$/, "");
};

const TERMS_OPTIONS = [
 "1x Pembayaran",
 "3x Pembayaran",
 "6x Pembayaran",
 "12x Pembayaran",
];

function FormPengajuanPembelian() {
 const navigate = useNavigate();
 const { token } = useParams();
 const returnPageKey = getReturnPageKey(token);

 const [form, setForm] = useState({
  tipe: "Elektronik",
  nama: "Lenovo Ideapad 330",
  harga: "5000000",
  dp: "1000000",
  jumlahTerm: "3x Pembayaran",
 });

 // --- LOGIKA PERHITUNGAN KREDIT ---
 const { nominalKredit, estimasiAngsuran } = useMemo(() => {
  const totalHarga = parseInt(form.harga.replace(/\D/g, "") || 0);
  const totalDP = parseInt(form.dp.replace(/\D/g, "") || 0);
  const nominalKredit = totalHarga - totalDP;

  const termMatch = form.jumlahTerm.match(/^(\d+)x/);
  const totalTerm = termMatch ? parseInt(termMatch[1]) : 1;

  const estimasiAngsuran = totalTerm > 0 ? nominalKredit / totalTerm : 0;

  return {
   nominalKredit,
   estimasiAngsuran: Math.round(estimasiAngsuran),
  };
 }, [form.harga, form.dp, form.jumlahTerm]);

 const handleGoBack = useCallback(() => {
  const returnToken = jwtEncode({ page: returnPageKey });
  navigate(`/${returnToken}`);
 }, [navigate, returnPageKey]);

 const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
   ...prev,
   [name]: ["harga", "dp"].includes(name) ? value.replace(/\D/g, "") : value,
  }));
 };

 const handleSubmit = (e) => {
  e.preventDefault();

  if (nominalKredit <= 0) {
   alert("Nominal Kredit tidak valid. Harga harus lebih besar dari DP.");
   return;
  }

  // --- LOGIKA NAVIGASI KE DETAIL TRANSAKSI ---
  const payload = {
   page: "transactionDetailPage",
   return: returnPageKey,
   data: {
    invoiceNumber: `PNR-${Date.now()}`,
    status: "Menunggu Persetujuan",
    total: nominalKredit,
    tanggalPengajuan: new Date().toLocaleDateString("id-ID"),
    catatan: `Pengajuan Pembelian Barang: ${form.nama} (${form.tipe}) dengan tenor ${form.jumlahTerm}.`,
    details: [
     { description: `Harga Barang (${form.nama})`, amount: parseInt(form.harga.replace(/\D/g, "") || 0) },
     { description: `Uang Muka (DP)`, amount: -parseInt(form.dp.replace(/\D/g, "") || 0) },
     { description: `Nominal Kredit (untuk ${form.jumlahTerm})`, amount: nominalKredit },
    ],
    action: "purchaseDetail",
   },
  };

  const transactionToken = jwtEncode(payload);
  navigate(`/${transactionToken}`, {
   state: {
    transactionData: payload,
    returnPage: returnPageKey
   }
  });
 };

 return (
  <DashboardLayout>
   <div className="row page-titles pt-3">
    <div className="col-12 align-self-center">
     <h3 className="text-themecolor mb-0 mt-0">
      <Button
       variant="link"
       onClick={handleGoBack}
       className="p-0 me-2 text-dark"
      >
       <FaArrowLeft />
      </Button>{" "}
      Pengajuan Pembelian
     </h3>
    </div>
   </div>

   <Row className="mt-4 justify-content-center">
    <Col lg={10} md={12}>
     <Card className="shadow-sm mb-4">
      <Card.Header className="bg-primary text-white">
       <FaShoppingCart className="me-2" /> Formulir Pengajuan
      </Card.Header>
      <Card.Body>
       <Form onSubmit={handleSubmit}>
        {/* Tipe */}
        <Form.Group className="mb-3">
         <Form.Label>Tipe</Form.Label>
         <Form.Control
          type="text"
          name="tipe"
          value={form.tipe}
          onChange={handleChange}
          placeholder="Contoh: Elektronik, Kendaraan"
          required
         />
        </Form.Group>

        {/* Nama */}
        <Form.Group className="mb-3">
         <Form.Label>Nama</Form.Label>
         <Form.Control
          type="text"
          name="nama"
          value={form.nama}
          onChange={handleChange}
          placeholder="Contoh: Lenovo Ideapad 330"
          required
         />
        </Form.Group>

        {/* Harga */}
        <Form.Group className="mb-3">
         <Form.Label>Harga</Form.Label>
         <div className="input-group">
          <span className="input-group-text">Rp.</span>
          <Form.Control
           type="text"
           name="harga"
           value={formatInputDisplay(form.harga)}
           onChange={handleChange}
           placeholder="Contoh: 5.000.000"
           required
          />
         </div>
        </Form.Group>

        {/* DP */}
        <Form.Group className="mb-3">
         <Form.Label>DP</Form.Label>
         <div className="input-group">
          <span className="input-group-text">Rp.</span>
          <Form.Control
           type="text"
           name="dp"
           value={formatInputDisplay(form.dp)}
           onChange={handleChange}
           placeholder="Contoh: 1.000.000"
           required
          />
         </div>
        </Form.Group>

        {/* Jumlah term yang diambil */}
        <Form.Group className="mb-4">
         <Form.Label>Jumlah term yang diambil</Form.Label>
         <Form.Select
          name="jumlahTerm"
          value={form.jumlahTerm}
          onChange={handleChange}
          required
         >
          {TERMS_OPTIONS.map((term) => (
           <option key={term} value={term}>
            {term}
           </option>
          ))}
         </Form.Select>
        </Form.Group>

        {/* Summary Detail Credit */}
        <h5 className="mt-4">Summary Detail Credit</h5>
        <Row className="mb-3">
         <Col>
          <small className="text-muted d-block">Nominal</small>
          <p className="mb-0 fw-bold">
           {formatCurrency(nominalKredit)}
          </p>
         </Col>
         <Col className="text-end">
          <small className="text-muted d-block">
           Estimasi Angsuran
          </small>
          <p className="mb-0 fw-bold">
           {formatCurrency(estimasiAngsuran)}
          </p>
         </Col>
        </Row>

        {/* Akad (Contoh Text) */}
        <h5 className="mt-4">Akad</h5>
        <p className="text-secondary small">
         Lorem Ipsum adalah contoh teks atau dummy dalam industri percetakan
         dan penataan huruf atau typesetting. Lorem Ipsum telah menjadi
         standar contoh teks sejak tahun 1500an, saat seorang tukang cetak
         yang tidak dikenal mengambil sebuah kumpulan teks dan
         mengacaknya...
        </p>

        <div className="text-center mt-4">
         <Button
          variant="primary"
          type="submit"
          className="fw-bold px-5"
         >
          Proses
         </Button>
        </div>
       </Form>
      </Card.Body>
     </Card>
    </Col>
   </Row>
  </DashboardLayout>
 );
}

export default memo(FormPengajuanPembelian);