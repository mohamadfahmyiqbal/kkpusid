// pages/global/InvoicePage.jsx

import React, { useCallback, useMemo, useState, useEffect } from "react";
import { Card, Button, Spinner, Alert, Row, Col, Table } from "react-bootstrap";
// Import useParams untuk membaca token dari URL
import { useNavigate, useParams } from "react-router-dom";
// Tambah ikon FaMoneyBillWave dan FaCheckCircle
import { FaArrowLeft, FaMoneyBillWave, FaCheckCircle } from "react-icons/fa";
// Import jwtEncode (diperlukan untuk navigasi kembali)
import { jwtEncode } from "../../../routes/helpers";
// 🚨 Pastikan path ini benar
import UBilling from "../../../utils/api/UBilling";


// --- HELPER FUNCTIONS ---
/**
 * Helper untuk mendapatkan nilai dari token JWT di URL.
 * Catatan: Ini harus sama persis dengan helper di RegistrationSummary.jsx
 */
const getValueFromToken = (token, key) => {
 if (!token) return null;
 try {
  const [, payload] = token.split(".");
  // Logika decode base64url
  const json = decodeURIComponent(
   escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
  );
  const decodedPayload = JSON.parse(json);
  return decodedPayload?.[key] ?? null;
 } catch (err) {
  console.error("[getValueFromToken] Gagal decoding token:", err);
  return null;
 }
};


// --- KOMPONEN UTAMA ---
export default function InvoicePage() {
 const { token } = useParams();
 const navigate = useNavigate();

 // State untuk data dan proses
 const [invoiceDetail, setInvoiceDetail] = useState(null);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 // Ambil billId dan returnKey dari token
 const billId = useMemo(() => getValueFromToken(token, "billId"), [token]);
 const returnKey = useMemo(() => getValueFromToken(token, "return"), [token]);

 // 1. Fetch Invoice Detail dari API
 useEffect(() => {
  // 🚨 Cek Bill ID yang krusial
  if (!billId) {
   console.error("[InvoicePage] Bill ID tidak ditemukan di URL/Token.");
   setError("Bill ID tidak ditemukan di URL. Silakan kembali ke halaman status pendaftaran.");
   setLoading(false);
   return;
  }

  const fetchDetail = async () => {
   try {
    setLoading(true);
    // 🚨 PANGGIL API UNTUK MENDAPATKAN DETAIL TAGIHAN
    // Endpoint: GET /tagihan/{billId}
    const response = await UBilling.getInvoiceDetail(billId);
console.log(response);

    // Asumsi: data tagihan berada di response.data
    setInvoiceDetail(response.data);
   } catch (err) {
    console.error("Gagal memuat detail invoice:", err);
    const errorMessage = err.response?.data?.message || "Gagal memuat detail tagihan. Silakan coba lagi.";
    setError(errorMessage);
   } finally {
    setLoading(false);
   }
  };
  fetchDetail();
 }, [billId]);


 // Handler untuk kembali ke halaman sebelumnya
 const handleBack = useCallback(() => {
  // Navigasi kembali menggunakan returnKey yang didefinisikan di RegistrationSummary
  const backToken = jwtEncode({ page: returnKey || "dashboard" });
  navigate(`/${backToken}`);
 }, [navigate, returnKey]);


 // MIDTRANS PAYMENT HANDLER
 const handlePay = useCallback(async () => {
  if (!invoiceDetail || invoiceDetail.status.toUpperCase() === 'PAID' || invoiceDetail.status.toUpperCase() === 'EXPIRED') return;

  try {
   // 1. Panggil API backend untuk mendapatkan Snap Token
   // Endpoint: POST /midtrans/create-transaction (Body: { bill_id: '...' })
   const response = await UBilling.createMidtransTransaction(billId);
   console.log(response);

   // Asumsi Snap Token berada di response.data.snapToken
   const snapToken = response.data.snapToken;

   if (!snapToken) {
    alert("Gagal mendapatkan token pembayaran dari server.");
    return;
   }

   // 2. Buka Midtrans Snap Payment Modal (Memerlukan window.snap dari script eksternal)
   if (window.snap) {
    window.snap.pay(snapToken, {
     onSuccess: function () {
      alert("Pembayaran berhasil! Status tagihan akan diperbarui.");
      // Update UI langsung ke PAID/PENDING untuk pengalaman pengguna yang lebih baik
      setInvoiceDetail(prev => ({ ...prev, status: 'PAID' }));
     },
     onPending: function () {
      alert("Pembayaran tertunda. Silakan selesaikan pembayaran sesuai instruksi.");
      setInvoiceDetail(prev => ({ ...prev, status: 'PENDING' }));
     },
     onError: function () {
      alert("Terjadi kesalahan saat proses pembayaran.");
     },
     onClose: function () {
      console.log('Payment popup ditutup.');
     }
    });
   } else {
    alert("Midtrans Snap Script belum dimuat. Coba refresh halaman.");
   }

  } catch (error) {
   console.log(error);
   
   console.error("Error initiating Midtrans payment:", error);
   alert(error.response?.data?.message || "Gagal memulai proses pembayaran.");
  }
 }, [billId, invoiceDetail]);


 // --- TAMPILAN LOADING & ERROR ---
 if (loading) {
  return (
   <div className="container-sm py-5 text-center">
    <Spinner animation="border" variant="primary" />
    <p className="mt-2">Memuat detail tagihan...</p>
   </div>
  );
 }

 if (error) {
  return (
   <div className="container-sm py-4">
    <Alert variant="danger" className="text-center">
     {error}
     <div className="mt-3">
      <Button onClick={handleBack} variant="danger">
       <FaArrowLeft className="me-2" /> Kembali
      </Button>
     </div>
    </Alert>
   </div>
  );
 }

 // --- TAMPILAN INVOICE (Setelah Data Dimuat) ---

 // Destructuring data (pastikan nama field sesuai response API Anda)
 const {
  invoiceNumber,
  to,
  invoiceDate,
  expiredDate,
  status: statusApi, // Status dari API (UNPAID, PENDING, PAID, EXPIRED)
  totalAmount,
  items
 } = invoiceDetail;

 // Logika Status Display
 const statusUpper = String(statusApi).toUpperCase();
 const isPaid = statusUpper === 'PAID';
 const isPending = statusUpper === 'PENDING';
 const isUnpaid = statusUpper === 'UNPAID';

 const statusVariant = isPaid ? "success" : (isPending ? "warning" : "danger");
 const statusText = isPaid ? "LUNAS" : (isPending ? "MENUNGGU PEMBAYARAN" : "BELUM DIBAYAR");

 const pageTitle = `Detail Tagihan (Bill ID: ${billId})`;

 return (
  <div className="container-sm py-4">
   <Row className="justify-content-center">
    <Col md={8} lg={6}>
     <Button
      variant="light"
      onClick={handleBack}
      className="mb-3 text-primary"
     >
      <FaArrowLeft className="me-2" /> Kembali
     </Button>

     <Card className="shadow-lg mb-4">
      <Card.Header className="bg-primary text-white">
       <h5 className="mb-0">{pageTitle}</h5>
       <small className="text-white">
        No. Invoice: {invoiceNumber}
       </small>
      </Card.Header>
      <Card.Body>
       {/* Invoice Header */}
       <div className="mb-3">
        <div className="d-flex justify-content-between">
         <small className="text-muted">Kepada: {to}</small>
         <small className="text-muted">
          Tanggal: {invoiceDate}
         </small>
        </div>
        <div className="d-flex justify-content-between">
         <small className={`fw-bold text-${isPaid ? 'success' : 'danger'}`}>
          Jatuh Tempo: {expiredDate}
         </small>
         <small className={`fw-bold text-${isPaid ? 'success' : 'danger'}`}>
          {isPaid ? "Tagihan Lunas" : "Segera Lakukan Pembayaran!"}
         </small>
        </div>
       </div>

       {/* Item List */}
       <div className="table-responsive">
        <Table responsive striped borderless className="mb-0">
         <thead className="table-light">
          <tr>
           <th>Deskripsi</th>
           <th className="text-end" style={{ width: "30%" }}>
            Jumlah
           </th>
          </tr>
         </thead>
         <tbody>
          {items && items.map((item, index) => (
           <tr key={index}>
            <td>{item.description}</td>
            <td className="text-end">
             Rp {(item.amount ?? 0).toLocaleString("id-ID")}
            </td>
           </tr>
          ))}
         </tbody>
         <tfoot>
          <tr>
           <th className="text-end">TOTAL TAGIHAN</th>
           <th className="text-end text-danger fs-5">
            Rp {(totalAmount ?? 0).toLocaleString("id-ID")}
           </th>
          </tr>
         </tfoot>
        </Table>
       </div>

       {/* Payment Info */}
       <div className="mt-4 border-top pt-3">
        <div className="row">
         <Col xs={12}>
          <small className="text-muted d-block">Metode Pembayaran</small>
          <strong className="d-block mb-3 fs-5">
           Midtrans Payment Gateway (Multi Payment)
          </strong>
         </Col>
        </div>
        <div className="text-center mt-3">
         <span className={`badge bg-${statusVariant} text-dark p-2`}>
          {statusText}
         </span>
        </div>
       </div>
      </Card.Body>
      <Card.Footer className="text-center">

       {/* Tombol Bayar Midtrans */}
       {(isUnpaid || isPending) && (
        <Button onClick={handlePay} variant="success" size="lg">
         <FaMoneyBillWave className="me-2" /> Bayar Sekarang (Midtrans)
        </Button>
       )}

       {/* Tombol Jika Sudah Dibayar */}
       {isPaid && (
        <Button variant="outline-success" disabled>
         <FaCheckCircle className="me-2" /> Sudah Dibayar
        </Button>
       )}

       {/* Tombol Cetak/Bantuan */}
       <Button variant="info" className="ms-2">Cetak Invoice</Button>
       <Button variant="secondary" className="ms-2">Bantuan</Button>

      </Card.Footer>
     </Card>
    </Col>
   </Row>
  </div>
 );
}