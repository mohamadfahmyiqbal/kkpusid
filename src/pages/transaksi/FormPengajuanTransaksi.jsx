import React, { useState, useCallback, useMemo, memo } from "react";
import { Card, Button, Form, Row, Col, Container } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

// Helpers
import { jwtEncode } from "../../routes/helpers";
import UTransaksi from "../../utils/api/UTransaksi";

/* =======================
   HELPER FUNCTIONS
======================= */
const getReturnPageKey = (token) => {
  if (!token) return "transaksiPage";
  try {
    const [, payload] = token.split(".");
    const json = decodeURIComponent(
      escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    );
    return JSON.parse(json)?.return ?? "transaksiPage";
  } catch {
    return "transaksiPage";
  }
};

const formatCurrency = (amount) =>
  amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });

const formatInputDisplay = (amount) =>
  parseInt(amount || 0).toLocaleString("id-ID");

/* =======================
   CONSTANTS
======================= */
const TIPE_OPTIONS = ["Elektronik", "Kendaraan", "Property"];
const TERMS_OPTIONS = [
  "1x Pembayaran",
  "3x Pembayaran",
  "6x Pembayaran",
  "12x Pembayaran",
];

/* =======================
   COMPONENT
======================= */
function FormPengajuanTransaksi() {
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

  /* =======================
     CREDIT CALCULATION
  ======================= */
  const { nominalKredit, estimasiAngsuran } = useMemo(() => {
    const harga = parseInt(form.harga || 0);
    const dp = parseInt(form.dp || 0);
    const kredit = harga - dp;

    const termMatch = form.jumlahTerm.match(/^(\d+)x/);
    const totalTerm = termMatch ? parseInt(termMatch[1]) : 1;

    const angsuran = kredit > 0 && totalTerm > 0 ? kredit / totalTerm : 0;

    return {
      nominalKredit: kredit,
      estimasiAngsuran: Math.round(angsuran),
    };
  }, [form]);

  /* =======================
     HANDLERS
  ======================= */
  const handleGoBack = useCallback(() => {
    navigate(`/${jwtEncode({ page: returnPageKey })}`);
  }, [navigate, returnPageKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "harga" || name === "dp" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (nominalKredit <= 0) {
      alert("Harga harus lebih besar dari DP");
      return;
    }

    try {
      const payload = {
        tipe: form.tipe,
        nama: form.nama,
        harga: parseInt(form.harga),
        dp: parseInt(form.dp),
        nominalKredit: nominalKredit,
        estimasiAngsuran: estimasiAngsuran,
        jumlahTerm: form.jumlahTerm,
      };

      const response = await UTransaksi.submitPengajuan(payload);

      if (response.data.status) {
        // ✅ PENYESUAIAN: Kirim financingId agar detail ambil dari DB
        const detailToken = jwtEncode({
          page: "transactionDetailPage",
          financingId: response.data.data.financing_id, // KUNCI: Harus financingId
          return: returnPageKey,
        });

        navigate(`/${detailToken}`);
      }
    } catch (error) {
      console.error("Gagal mengirim pengajuan:", error);
      alert("Terjadi kesalahan saat mengirim pengajuan.");
    }
  };

  /* =======================
     RENDER
  ======================= */
  return (
    <div style={{ minHeight: "100vh" }}>
      {/* HEADER */}
      <div className="">
        <Container fluid="sm" className="d-flex align-items-center py-3">
          <Button
            variant="link"
            className="p-0 me-3 text-dark"
            onClick={handleGoBack}
          >
            <FaArrowLeft size={20} />
          </Button>
          <h6 className="mb-0 fw-bold">Pengajuan Pembelian</h6>
        </Container>
      </div>

      <Container fluid="sm" className="px-3 py-3">
        <Card className="shadow-sm border-0">
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {/* TIPE */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">
                  Tipe
                </Form.Label>
                <Form.Select
                  name="tipe"
                  value={form.tipe}
                  onChange={handleChange}
                >
                  {TIPE_OPTIONS.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* NAMA */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">
                  Nama
                </Form.Label>
                <Form.Control
                  name="nama"
                  value={form.nama}
                  onChange={handleChange}
                />
              </Form.Group>

              {/* HARGA */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">
                  Harga
                </Form.Label>
                <div className="input-group">
                  <span className="input-group-text">Rp</span>
                  <Form.Control
                    name="harga"
                    className="text-end"
                    value={formatInputDisplay(form.harga)}
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {/* DP */}
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-muted">DP</Form.Label>
                <div className="input-group">
                  <span className="input-group-text">Rp</span>
                  <Form.Control
                    name="dp"
                    className="text-end"
                    value={formatInputDisplay(form.dp)}
                    onChange={handleChange}
                    isInvalid={parseInt(form.dp) >= parseInt(form.harga)}
                  />
                </div>
                <Form.Control.Feedback type="invalid">
                  DP tidak boleh lebih besar dari harga
                </Form.Control.Feedback>
              </Form.Group>

              {/* TERM */}
              <Form.Group className="mb-4">
                <Form.Label className="small fw-bold text-muted">
                  Jumlah Term
                </Form.Label>
                <Form.Select
                  name="jumlahTerm"
                  value={form.jumlahTerm}
                  onChange={handleChange}
                >
                  {TERMS_OPTIONS.map((term) => (
                    <option key={term} value={term}>
                      {term}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              {/* SUMMARY */}
              <Card className="mb-4 border-0 bg-light">
                <Card.Body>
                  <h6 className="fw-bold mb-3">Summary Detail Credit</h6>
                  <Row>
                    <Col xs={6}>
                      <small className="text-muted">Nominal Kredit</small>
                      <div className="fw-bold text-primary">
                        {formatCurrency(nominalKredit)}
                      </div>
                    </Col>
                    <Col xs={6} className="text-end">
                      <small className="text-muted">Estimasi / Term</small>
                      <div className="fw-bold text-success">
                        {formatCurrency(estimasiAngsuran)}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* AKAD */}
              <details className="mb-4">
                <summary className="fw-bold">Akad</summary>
                <p className="small text-muted mt-2 text-justify">
                  Lorem Ipsum adalah contoh teks atau dummy dalam industri
                  percetakan dan penataan huruf.
                </p>
              </details>

              {/* SUBMIT */}
              <div className="position-sticky bottom-0 bg-white pt-3 pb-4">
                <Button
                  type="submit"
                  className="w-100 fw-bold"
                  disabled={nominalKredit <= 0}
                  style={{
                    backgroundColor: "#1c5b7a",
                    borderColor: "#1c5b7a",
                    borderRadius: "20px",
                  }}
                >
                  Proses
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default memo(FormPengajuanTransaksi);
