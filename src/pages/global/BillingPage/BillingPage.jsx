// 📁 src/pages/anggota/BillingPage.jsx
import React, { useState, useEffect } from "react";
import { Container, Card, Form, Button, Spinner, Row, Col, ListGroup, Badge } from "react-bootstrap";
import { FaArrowLeft, FaHistory, FaCheckCircle, FaClock, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UBilling from "../../../utils/api/UBilling";
import USimpanan from "../../../utils/api/USimpanan";
import UAuth from "../../../utils/api/UAuth"; // ✅ Mengambil data rekening dari profil
import { jwtEncode } from "../../../routes/helpers";

const BillingPage = ({ decodedToken }) => {
 const navigate = useNavigate();

 // Data dari token (dikirim saat klik card simpanan)
 const {
  setoranType = "Simpanan",
  isWithdraw = false,
  maxAmount = 0
 } = decodedToken || {};

 const [displayAmount, setDisplayAmount] = useState("");
 const [rawAmount, setRawAmount] = useState(0);
 const [loading, setLoading] = useState(false);
 const [history, setHistory] = useState([]);
 const [loadingData, setLoadingData] = useState(false);

 // State Form sesuai Mockup Gambar
 const [formData, setFormData] = useState({
  metode: "Transfer Bank",
  noRekening: "",
  bank: "",
  namaNasabah: ""
 });

 useEffect(() => {
  const fetchData = async () => {
   setLoadingData(true);
   try {
    // 1. Ambil Histori Transaksi Simpanan
    const resHistory = await USimpanan.getSavingsHistory({ category: setoranType });
    if (resHistory.data?.status) setHistory(resHistory.data.data || []);

    // 2. Ambil Profil Anggota (Auto-fill data Bank)
    if (isWithdraw) {
     const resProfile = await UAuth.getProfile();
     
     if (resProfile?.status) {
      const profile = resProfile.data.data;
      console.log(profile);
      setFormData(prev => ({
       ...prev,
       noRekening: profile?.bank_info?.bank_account_no || "",
       bank: profile?.bank_info?.bank_name || "",
       namaNasabah: profile.full_name || ""
      }));
     }
    }
   } catch (err) {
    console.error("Gagal memuat data:", err);
   } finally {
    setLoadingData(false);
   }
  };

  fetchData();
 }, [setoranType, isWithdraw]);

 const handleAmountChange = (e) => {
  const value = e.target.value.replace(/\D/g, "");
  const numberValue = value ? parseInt(value, 10) : 0;

  if (isWithdraw && numberValue > maxAmount) {
   alert(`Saldo tidak mencukupi. Maksimal penarikan: Rp ${maxAmount.toLocaleString("id-ID")}`);
   return;
  }

  setRawAmount(numberValue);
  setDisplayAmount(value ? numberValue.toLocaleString("id-ID") : "");
 };

 const handleProses = async () => {
  if (rawAmount <= 0) return alert("Masukkan nominal yang valid");

  setLoading(true);
  try {
   let res;
   if (isWithdraw) {
    // Alur Request Pencairan
    res = await USimpanan.requestWithdrawal({
     amount: rawAmount,
     category: setoranType,
     withdrawal_method: formData.metode,
     account_number: formData.noRekening,
     bank_name: formData.bank,
     account_holder: formData.namaNasabah
    });
   } else {
    // Alur Setoran Simpanan
    res = await UBilling.processSavingsPayment({
     amount: rawAmount,
     category: setoranType,
    });
   }

   if (res.data?.status) {
    if (isWithdraw) {
     alert("Permintaan pencairan berhasil dikirim. Menunggu persetujuan admin.");
     navigate(-1);
    } else {
     // Arahkan ke halaman Invoice Midtrans
     const token = jwtEncode({
      page: "invoicePage",
      billId: res.data.billId,
      return: "simpananPage"
     });
     navigate(`/${token}`);
    }
   } else {
    alert(res.data.message || "Gagal memproses permintaan");
   }
  } catch (err) {
   alert("Terjadi kesalahan sistem");
  } finally {
   setLoading(false);
  }
 };

 return (
  <div className="bg-light min-vh-100 pb-5">
   {/* HEADER NAVBAR */}
   <div className="bg-white p-3 shadow-sm d-flex align-items-center mb-3 sticky-top">
    <Button variant="link" className="text-dark p-0 me-3 shadow-none" onClick={() => navigate(-1)}>
     <FaArrowLeft size={18} />
    </Button>
    <h6 className="mb-0 fw-bold">{isWithdraw ? "Pencairan" : `Setoran ${setoranType}`}</h6>
   </div>

   <Container>
    <Row className="justify-content-center">
     <Col md={8} lg={6}>

      {/* CARD FORM UTAMA */}
      <Card className="border-0 shadow-sm mb-4" style={{ borderRadius: "12px" }}>
       <Card.Header className="bg-primary text-white py-2 border-0">
        <small className="fw-bold">
         {isWithdraw ? "SILAHKAN MASUKAN NOMINAL PENCAIRAN" : "SILAHKAN MASUKAN NOMINAL SIMPANAN"}
        </small>
       </Card.Header>
       <Card.Body className="p-4">
        <Form>
         {/* INPUT NOMINAL */}
         <Form.Group className="mb-4 text-center">
          <Form.Label className="fw-bold small text-muted">Nominal</Form.Label>
          <Form.Control
           type="text"
           placeholder="Rp.0"
           value={displayAmount ? `Rp.${displayAmount}` : ""}
           onChange={handleAmountChange}
           className="text-center fw-bold fs-3 border-0 border-bottom rounded-0 shadow-none px-0"
           style={{ borderBottom: "2px solid #005a8d !important" }}
          />
          {isWithdraw && (
           <div className="small text-muted mt-2">
            Tersedia: <span className="text-primary fw-bold">Rp {maxAmount.toLocaleString("id-ID")}</span>
           </div>
          )}
         </Form.Group>

         {/* FORM PENCAIRAN (Hanya muncul jika mode withdraw) */}
         {isWithdraw && (
          <div className="p-3 bg-light rounded-3 mb-3 border">
           <Form.Group className="mb-3">
            <Form.Label className="fw-bold small mb-1">Metode Pencairan</Form.Label>
            <Form.Select
             size="sm"
             value={formData.metode}
             onChange={(e) => setFormData({ ...formData, metode: e.target.value })}
             className="shadow-none border-secondary"
            >
             <option value="Transfer Bank">Transfer Bank (Non-Tunai)</option>
             <option value="Tunai">Tunai (Ambil di Kantor)</option>
            </Form.Select>
           </Form.Group>

           {formData.metode === "Transfer Bank" && (
            <Row>
             <Col xs={12} className="mb-2">
              <Form.Label className="fw-bold small mb-1">No Rekening</Form.Label>
              <Form.Control
               size="sm"
               type="text"
               value={formData.noRekening}
               onChange={(e) => setFormData({ ...formData, noRekening: e.target.value })}
               placeholder="Input No Rekening"
              />
             </Col>
             <Col xs={12} className="mb-2">
              <Form.Label className="fw-bold small mb-1">Bank</Form.Label>
              <Form.Control
               size="sm"
               type="text"
               value={formData.bank}
               onChange={(e) => setFormData({ ...formData, bank: e.target.value })}
               placeholder="Input Nama Bank"
              />
             </Col>
            </Row>
           )}

           <Form.Group className="mb-0">
            <Form.Label className="fw-bold small mb-1">Nama Nasabah</Form.Label>
            <Form.Control
             size="sm"
             type="text"
             value={formData.namaNasabah}
             readOnly
             className="bg-white border-secondary"
            />
           </Form.Group>
          </div>
         )}

         <Button
          variant="primary"
          className="w-100 fw-bold py-2 mt-2 shadow-sm border-0"
          style={{ borderRadius: "25px", backgroundColor: "#005a8d" }}
          onClick={handleProses}
          disabled={loading || !rawAmount}
         >
          {loading ? <Spinner size="sm" className="me-2" /> : null}
          {isWithdraw ? "AJUKAN PENCAIRAN" : "PROSES PEMBAYARAN"}
         </Button>
        </Form>
       </Card.Body>
      </Card>

      {/* CARD HISTORY */}
      <Card className="border-0 shadow-sm" style={{ borderRadius: "12px" }}>
       <Card.Header className="bg-white py-3 border-bottom d-flex align-items-center">
        <FaHistory className="text-primary me-2" />
        <h6 className="mb-0 fw-bold small">Riwayat Transaksi Terakhir</h6>
       </Card.Header>
       <Card.Body className="p-0">
        {loadingData ? (
         <div className="text-center p-4"><Spinner size="sm" variant="primary" /></div>
        ) : history.length > 0 ? (
         <ListGroup variant="flush">
          {history.slice(0, 5).map((item, idx) => (
           <ListGroup.Item key={idx} className="px-4 py-3 border-light">
            <div className="d-flex justify-content-between align-items-center">
             <div>
              <div className="fw-bold small text-dark mb-1">
               {item.category || item.bill?.billType?.type_name || "Simpanan"}
              </div>
              <small className="text-muted d-block" style={{ fontSize: '10px' }}>
               {new Date(item.created_at).toLocaleString("id-ID")}
              </small>
             </div>
             <div className="text-end">
              <div className="fw-bold text-primary small mb-1">
               Rp {parseFloat(item.amount).toLocaleString("id-ID")}
              </div>
              <Badge bg={item.status === "PAID" || item.status === "COMPLETED" ? "success" : "warning"} className="small px-2 py-1" style={{ fontSize: '9px' }}>
               {item.status === "PAID" || item.status === "COMPLETED" ? "BERHASIL" : "PENDING"}
              </Badge>
             </div>
            </div>
           </ListGroup.Item>
          ))}
         </ListGroup>
        ) : (
         <div className="text-center p-5 text-muted small">
          <FaExclamationTriangle className="mb-2 d-block mx-auto" size={20} />
          Belum ada riwayat transaksi.
         </div>
        )}
       </Card.Body>
       {history.length > 0 && (
        <div className="text-center py-2 border-top">
         <Button variant="link" className="text-decoration-none small p-0 fw-bold" onClick={() => navigate("/riwayat")}>
          Lihat Semua
         </Button>
        </div>
       )}
      </Card>
     </Col>
    </Row>
   </Container>
  </div>
 );
};

export default BillingPage;