// pages/simpanan/PenarikanSimpananPage.jsx

import React, { useState, useCallback, useMemo } from "react";
import { Card, Button, Form, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaCheckCircle,
  FaFileInvoice,
} from "react-icons/fa";

// Import helper untuk encoding JWT
import { jwtEncode } from "../../routes/helpers";
import DashboardLayout from "../../components/layout/DashboardLayout";

// --- FUNGSI HELPER UNTUK MENDAPATKAN KUNCI KEMBALI DINAMIS ---
const getReturnPageKey = (token) => {
  if (!token) return "dashboardPage";
  try {
    const [, payload] = token.split(".");
    const json = decodeURIComponent(
      escape(atob(payload.replace(/-/g, "+").replace(/_/g, "/")))
    );
    // Mengambil key 'return' dari payload, default ke 'dashboardPage'
    return JSON.parse(json)?.return ?? "dashboardPage";
  } catch (err) {
    return "dashboardPage";
  }
};

// --- DATA MOCKUP RIWAYAT TRANSAKSI ---
const mockHistory = [
  {
    id: 1,
    date: "23-03-2025 10:00",
    title: "Pencairan Simpanan Sukarela",
    status: "Approved",
    amount: "Rp 200.000",
  },
  {
    id: 2,
    date: "23-03-2025 10:00",
    title: "Pencairan Simpanan Sukarela",
    status: "Approved",
    amount: "Rp 200.000",
  },
];

// --- DATA MOCKUP INVOICE PENARIKAN (DETAIL TRANSAKSI) ---
// Digunakan sebagai template dasar untuk payload navigasi
const mockInvoicePenarikanTemplate = {
  invoiceNumber: "INV-C-20250423-001",
  status: "Menunggu Persetujuan",
  catatan:
    "Dana akan diproses dalam 1x24 jam setelah persetujuan. Mohon menunggu konfirmasi.",
  tanggalPengajuan: new Date().toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }),
};

export default function PenarikanSimpananPage() {
  const navigate = useNavigate();
  const { token } = useParams();

  // State untuk data form pencairan
  const [formData, setFormData] = useState({
    nominal: "200000",
    metodePencairan: "Transfer Bank",
    noRekening: "1231313123123",
    bank: "Bank Mandiri Syariah",
    namaNasabah: "Avhan Hadi Bijaksana",
  });

  // Tentukan Dynamic Return Path
  const returnPageKey = useMemo(() => getReturnPageKey(token), [token]);

  const handleChange = useCallback((e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  // Handler Navigasi Kembali Dinamis
  const handleBack = useCallback(() => {
    const nextToken = jwtEncode({ page: returnPageKey });
    navigate(`/${nextToken}`);
  }, [navigate, returnPageKey]);

  // Handler Submit: Navigasi ke TransactionDetailPage
  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      const nominal = parseFloat(formData.nominal) || 0;
      const biayaAdmin = 5000;
      const totalDiproses = nominal + biayaAdmin;

      const transactionData = {
        // Navigasi ke page baru
        page: "transactionDetailPage",
        action: "withdrawalDetail",
        transactionId: mockInvoicePenarikanTemplate.invoiceNumber,

        // Data detail yang akan ditampilkan
        data: {
          ...mockInvoicePenarikanTemplate,
          details: [
            { description: "Pencairan Simpanan Sukarela", amount: nominal },
            { description: "Biaya Administrasi Pencairan", amount: biayaAdmin },
          ],
          total: totalDiproses,
        },
        // Kunci untuk kembali ke halaman PenarikanSimpananPage
        return: "penarikanSimpananPage",
      };

      const nextToken = jwtEncode(transactionData);
      navigate(`/${nextToken}`);
    },
    [formData, navigate]
  );

  // --- Render Component ---
  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBack}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Pencairan Simpanan Sukarela
          </h3>
        </div>
      </div>

      <div className="row justify-content-center">
        <Col lg={8} md={10}>
          {/* Bagian 1: Form Pencairan - Background Biru Gelap */}
          <Card
            className="mb-4 text-white"
            style={{ backgroundColor: "#005a8d" }}
          >
            <Card.Body>
              <h5 className="fw-bold mb-3">
                Silahkan Masukkan Nominal Pencairan
              </h5>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Nominal</Form.Label>
                  <Form.Control
                    type="number"
                    name="nominal"
                    value={formData.nominal}
                    onChange={handleChange}
                    placeholder="0"
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Metode Pencairan</Form.Label>
                  <Form.Control
                    type="text"
                    name="metodePencairan"
                    value={formData.metodePencairan}
                    onChange={handleChange}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">No Rekening</Form.Label>
                  <Form.Control
                    type="text"
                    name="noRekening"
                    value={formData.noRekening}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="mb-0">Bank</Form.Label>
                  <Form.Control
                    type="text"
                    name="bank"
                    value={formData.bank}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="mb-0">Nama Nasabah</Form.Label>
                  <Form.Control
                    type="text"
                    name="namaNasabah"
                    value={formData.namaNasabah}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button variant="primary" type="submit" className="fw-bold">
                    Proses <FaDownload className="ms-1" />
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Bagian 2: Histori Transaksi - Background Putih */}
          <Card>
            <Card.Header className="bg-primary text-white">
              <FaCheckCircle className="me-2" /> Histori Transaksi
            </Card.Header>
            <Card.Body>
              {mockHistory.map((transaksi) => (
                <Row
                  key={transaksi.id}
                  className="d-flex align-items-center border-bottom py-3"
                >
                  <Col xs={2} className="text-center">
                    <FaFileInvoice size={30} className="text-muted" />
                  </Col>
                  <Col xs={10}>
                    <h6 className="mb-0 fw-bold">{transaksi.title}</h6>
                    <small className="text-muted d-block">
                      {transaksi.date}
                    </small>
                    <span className="fw-bold me-2 d-block text-danger">
                      {transaksi.amount}
                    </span>
                    <span className={`badge bg-success`}>
                      {transaksi.status}
                    </span>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </div>
    </DashboardLayout>
  );
}
