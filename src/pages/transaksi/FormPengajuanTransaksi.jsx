// pages/transaksi/FormPengajuanTransaksi.jsx (Final Optimized)

import React, { useState, useCallback, useMemo, memo } from "react";
import { Card, Button, Form, Row, Col, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaDownload,
  FaCheckCircle,
  FaFileInvoice,
  FaMoneyCheckAlt,
} from "react-icons/fa";

import { jwtEncode } from "../../routes/helpers";
import DashboardLayout from "../../components/layout/DashboardLayout";

// --- FUNGSI HELPER UNTUK MENDAPATKAN KUNCI KEMBALI DINAMIS ---
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

// --- DATA MOCKUP ---
const MOCK_BALANCE = 5000000;
const MOCK_ACCOUNT_NUMBER = "1234567890";
const MOCK_ACCOUNT_BANK = "Bank Syariah";
const MOCK_ACCOUNT_NAME = "Avhan Hadi";

const mockHistory = [
  {
    id: 1,
    date: "23-03-2025 10:00",
    title: "Pencairan Dana Pendidikan",
    amount: "Rp 500.000",
    status: "Disetujui",
    statusVariant: "success",
  },
  {
    id: 2,
    date: "10-04-2025 15:30",
    title: "Pencairan Dana Pensiun",
    amount: "Rp 1.000.000",
    status: "Menunggu Approval",
    statusVariant: "warning text-dark",
  },
];

const formatBalance = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

function FormPengajuanTransaksi() {
  const navigate = useNavigate();
  const { token } = useParams();
  const returnPageKey = getReturnPageKey(token);

  const [form, setForm] = useState({
    jumlah: "",
    kebutuhan: "",
  });

  const handleGoBack = useCallback(() => {
    const returnToken = jwtEncode({ page: returnPageKey });
    navigate(`/${returnToken}`);
  }, [navigate, returnPageKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "jumlah" ? value.replace(/\D/g, "") : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const amount = parseInt(form.jumlah);

    if (!amount || amount <= 0) {
      alert("Jumlah pencairan harus diisi.");
      return;
    }
    if (amount > MOCK_BALANCE) {
      alert("Jumlah pencairan melebihi saldo yang tersedia!");
      return;
    }

    alert(
      `Pengajuan pencairan sebesar ${formatBalance(
        amount
      )} telah dikirim untuk diverifikasi.`
    );

    const payload = {
      page: "transactionDetailPage",
      return: returnPageKey,
      data: {
        invoiceNumber: `PNR-${Date.now()}`,
        status: "Menunggu Persetujuan",
        total: amount,
        tanggalPengajuan: new Date().toLocaleDateString("id-ID"),
        catatan: `Pengajuan dana untuk ${form.kebutuhan}`,
        details: [
          { description: `Penarikan Simpanan Sukarela`, amount: amount },
        ],
        action: "withdrawalDetail",
      },
    };
    const transactionToken = jwtEncode(payload);
    navigate(`/${transactionToken}`);
  };

  const handleViewHistoryDetail = useCallback(
    (transaksi) => {
      const payload = {
        page: "transactionDetailPage",
        return: returnPageKey,
        data: {
          status: transaksi.status,
          type: "Pencairan",
          invoiceId: transaksi.id,
        },
      };
      navigate(`/transactionDetailPage/${jwtEncode(payload)}`);
    },
    [navigate, returnPageKey]
  );

  const formattedBalance = useMemo(() => formatBalance(MOCK_BALANCE), []);
  const formattedJumlah = useMemo(
    () => formatBalance(parseInt(form.jumlah) || 0),
    [form.jumlah]
  );

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
            Pengajuan Pencairan Dana
          </h3>
        </div>
      </div>

      <Row className="mt-4 justify-content-center">
        <Col lg={10} md={12}>
          {/* Bagian 1: Informasi Saldo dan Rekening Tujuan */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-primary text-white">
              <FaMoneyCheckAlt className="me-2" /> Informasi Saldo & Tujuan
            </Card.Header>
            <Card.Body>
              <Row className="mb-3">
                <Col md={6}>
                  <small className="text-muted d-block">
                    Saldo Simpanan Sukarela
                  </small>
                  <h4 className="text-success fw-bold">{formattedBalance}</h4>
                </Col>
                <Col md={6}>
                  <small className="text-muted d-block">Rekening Tujuan</small>
                  <p className="mb-0 fw-bold">{MOCK_ACCOUNT_NUMBER}</p>
                  <small className="text-secondary">
                    {MOCK_ACCOUNT_BANK} a.n. {MOCK_ACCOUNT_NAME}
                  </small>
                </Col>
              </Row>
              <Alert variant="info" className="p-2 text-center">
                Batas minimum penarikan adalah **Rp 100.000**.
              </Alert>
            </Card.Body>
          </Card>

          {/* Bagian 2: Form Pengajuan */}
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-success text-white">
              <FaDownload className="me-2" /> Formulir Pengajuan
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Jumlah Pencairan (Rp)</Form.Label>
                  <Form.Control
                    type="text"
                    name="jumlah"
                    value={form.jumlah.replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                    onChange={handleChange}
                    placeholder="Masukkan jumlah pencairan"
                    required
                  />
                  <small className="text-muted">
                    Nominal yang diajukan: **{formattedJumlah}**
                  </small>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Kebutuhan (Tujuan Pencairan)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    name="kebutuhan"
                    value={form.kebutuhan}
                    onChange={handleChange}
                    placeholder="Contoh: Biaya pendidikan anak atau modal usaha"
                    required
                  />
                </Form.Group>

                <div className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    className="fw-bold px-5"
                  >
                    Proses Pengajuan <FaDownload className="ms-1" />
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>

          {/* Bagian 3: Histori Transaksi Pencairan */}
          <Card className="shadow-sm">
            <Card.Header className="bg-secondary text-white">
              <FaCheckCircle className="me-2" /> Riwayat Pencairan Dana
            </Card.Header>
            <Card.Body>
              {mockHistory.map((transaksi) => (
                <Row
                  key={transaksi.id}
                  className="d-flex align-items-center border-bottom py-3"
                  role="button"
                  onClick={() => handleViewHistoryDetail(transaksi)}
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
                    <span className={`badge bg-${transaksi.statusVariant}`}>
                      {transaksi.status}
                    </span>
                  </Col>
                </Row>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </DashboardLayout>
  );
}

export default memo(FormPengajuanTransaksi);
