import React, { useState, useCallback, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Alert,
  Button,
  Spinner,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";
import UInvoice from "../../utils/UInvoice";

// Komponen menerima data pendaftaran dari state router
export default function InvoiceScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Ambil data pendaftaran dari location.state
  // Ambil data dari location.state dengan struktur {title: 'Invoice', data: {...}}
  const { title, payload } = location.state || {};
  // const payload = data;
  const cardTitle = title ?? "Invoice";

  // Debug: log data yang diterima
  useEffect(() => {
    console.log("InvoiceScreen - location.state:", location.state);
    console.log("InvoiceScreen - payload:", payload);
  }, [location.state, payload]);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  // Fungsi generate invoice (belum diimplementasi)
  const generateInvoice = async () => {
    if (!payload) return;

    try {
      setLoading(true);
      const res = await UInvoice.generateInvoice(payload);
      console.log(res);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (payload) {
      generateInvoice();
    }
  }, [payload]);
  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2 text-decoration-none"
                onClick={() => navigate(-1)}
              >
                <FaArrowLeft size={15} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">{cardTitle}</h1>
            </Col>
          </Row>

          {!payload && (
            <Row>
              <Col>
                <Alert variant="warning">
                  Tidak ada data pendaftaran untuk ditampilkan.
                </Alert>
              </Col>
            </Row>
          )}

          {payload && (
            <Row className="mt-4">
              <Col md={12}>
                <Card>
                  <CardHeader className="bg-blue700 text-white">
                    <CardTitle>{cardTitle}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {loading ? (
                      <div className="text-center">
                        <Spinner animation="border" role="status">
                          <span className="visually-hidden">Loading...</span>
                        </Spinner>
                        <p className="mt-2">Sedang memproses invoice...</p>
                      </div>
                    ) : (
                      <>
                        <Alert variant="success" className="mb-3">
                          <strong>✅ Data Berhasil Diterima!</strong> Data
                          pendaftaran telah berhasil dikirim dari halaman
                          sebelumnya.
                        </Alert>

                        <div className="mb-4">
                          <h6 className="fw-bold text-primary">
                            Informasi Umum:
                          </h6>
                          <Row>
                            <Col md={6}>
                              <p>
                                <strong>Nama:</strong>{" "}
                                {payload?.requester?.nama || "-"}
                              </p>
                              <p>
                                <strong>NIK:</strong>{" "}
                                {payload?.requester?.nikKtp || "-"}
                              </p>
                            </Col>
                            <Col md={6}>
                              <p>
                                <strong>Email:</strong>{" "}
                                {payload?.akun?.email || "-"}
                              </p>
                              <p>
                                <strong>Tipe Anggota:</strong>{" "}
                                {payload?.akun?.tipe_anggota || "-"}
                              </p>
                            </Col>
                          </Row>
                        </div>

                        <div className="mb-3">
                          <h6 className="fw-bold text-primary">
                            Detail Data Lengkap (JSON):
                          </h6>
                          <div
                            className="bg-light p-3 rounded border"
                            style={{
                              fontSize: "12px",
                              maxHeight: "400px",
                              overflow: "auto",
                            }}
                          >
                            <pre className="mb-0">
                              {JSON.stringify(payload, null, 2)}
                            </pre>
                          </div>
                        </div>

                        <div className="text-center mt-4">
                          <Button
                            variant="primary"
                            size="lg"
                            onClick={() => {
                              // Di sini bisa ditambahkan logika untuk generate invoice yang sebenarnya
                              alert(
                                "Fitur generate invoice akan diimplementasikan selanjutnya"
                              );
                            }}
                          >
                            Generate Invoice
                          </Button>
                        </div>
                      </>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
        <Footer />
      </div>
    </div>
  );
}
