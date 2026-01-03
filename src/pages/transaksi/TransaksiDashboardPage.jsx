// src/pages/transaksi/TransaksiDashboardPage.jsx

import React, { useState, useEffect, useCallback } from "react";
import { Button, Spinner, Container, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaHandshake } from "react-icons/fa";

// Helpers & Context
import { jwtEncode } from "../../routes/helpers";
import { useProfile } from "../../contexts/ProfileContext";
import UTransaksi from "../../utils/api/UTransaksi";

// Components
import InformasiRekeningCard from "../../components/shared/InformasiRekeningCard";

const TransaksiDashboardPage = () => {
  const navigate = useNavigate();
  const { userData } = useProfile();

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchTransactionData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UTransaksi.getGeneralTransactionHistory();
      if (
        response.data &&
        response.data.status &&
        response.data.data.length > 0
      ) {
        setTransactions(response.data.data);
      } else {
        setTransactions([]);
      }
    } catch (err) {
      setTransactions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTransactionData();
  }, [fetchTransactionData]);

  // --- HANDLER NAVIGASI KE FORM PEMBELIAN ---
  const handleGoToFormPembelian = useCallback(() => {
    const token = jwtEncode({
      page: "formPengajuanTransaksi", // Sesuai dengan route tujuan Anda
      return: "transaksiPage", // Agar saat kembali di form, user balik ke sini
    });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3 text-muted fw-bold">Sinkronisasi Data...</p>
      </div>
    );
  }

  return (
    <div
      className="container-fluid py-3"
      style={{ backgroundColor: "#f8f9fa", minHeight: "100vh" }}
    >
      {/* 1. Header Navigation */}
      <div className="mx-2 mb-3">
        <Button
          variant="link"
          className="p-0 text-decoration-none text-muted fw-bold d-flex align-items-center"
          onClick={() => navigate(`/${jwtEncode({ page: "dashboard" })}`)}
        >
          <FaArrowLeft className="me-2" /> Kembali ke Dashboard
        </Button>
      </div>

      <Container fluid>
        <Row className="justify-content-center">
          <Col xs={12} md={10} lg={8} xl={6}>
            <div className="animate__animated animate__fadeIn mt-2">
              {transactions.length > 0 ? (
                /* --- STATE 1: JIKA ADA DATA --- */
                <InformasiRekeningCard
                  activeType="TRANSAKSI_AKTIF"
                  displayName={`Saldo ${userData?.full_name || "Anggota"}`}
                  summaryData={transactions[0]}
                />
              ) : (
                /* --- STATE 2: KOSONG (CARD MERAH) --- */
                <Card
                  className="border-0 shadow-lg text-white text-center p-4"
                  style={{
                    background:
                      "linear-gradient(180deg, #e52d27 0%, #b31217 100%)",
                    borderRadius: "24px",
                  }}
                >
                  <Card.Body className="py-5">
                    <h2 className="fw-bold mb-2">Informasi Rekening</h2>
                    <p
                      className="opacity-90 mb-5"
                      style={{ fontSize: "1.1rem" }}
                    >
                      Anda belum memiliki transaksi
                    </p>

                    <div className="d-flex justify-content-center gap-4">
                      <div className="text-center">
                        <Button
                          variant="light"
                          className="shadow-sm d-flex align-items-center justify-content-center mb-2"
                          style={{
                            width: "75px",
                            height: "75px",
                            borderRadius: "18px",
                            border: "none",
                          }}
                          onClick={handleGoToFormPembelian} // Mengarah ke FormPengajuanPembelian
                        >
                          <FaHandshake size={35} className="text-danger" />
                        </Button>
                        <span
                          className="fw-bold text-white d-block"
                          style={{ fontSize: "13px" }}
                        >
                          Pengajuan
                        </span>
                      </div>
                    </div>
                  </Card.Body>
                </Card>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TransaksiDashboardPage;
