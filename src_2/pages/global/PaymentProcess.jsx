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
  Table,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import moment from "moment";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";
import UInvoice from "../../utils/UInvoice";

// Utility format Rupiah
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);

export default function PaymentProcess() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  const { title, payload } = location.state || {};
  const cardTitle = title ?? "Invoice";

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  // Auto-generate invoice sekali saat payload ada
  useEffect(() => {
    const generateInvoice = async () => {
      if (!payload) return;

      try {
        setLoading(true);
        const res = await UInvoice.generateInvoice({
          token: payload.token,
          type: payload.type,
        });

        setInvoiceData(res?.data.data || null);
      } catch (error) {
        console.error("Generate Invoice Error:", error);
      } finally {
        setLoading(false);
      }
    };

    generateInvoice();
  }, [payload]);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container fluid>
          {/* Header */}
          <Row className="border-bottom mb-3 align-items-center">
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

          {/* Jika payload kosong */}
          {!payload && (
            <Alert variant="warning">Tidak ada data pendaftaran.</Alert>
          )}

          {/* Jika ada payload */}
          {payload && (
            <Row className="mt-4">
              <Col md={12}>
                <Card className="shadow-sm border-0">
                  <CardHeader className="bg-primary text-white rounded-top">
                    <CardTitle className="mb-0">{cardTitle}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {loading ? (
                      <div className="text-center py-5">
                        <Spinner animation="border" role="status" />
                        <p className="mt-2">Sedang memproses invoice...</p>
                      </div>
                    ) : invoiceData ? (
                      <>
                        {/* Header Invoice */}
                        <Row className="mb-4">
                          <Col xs={6}>
                            <h3 className="fw-bold">INVOICE</h3>
                          </Col>
                          <Col xs={6} className="text-end">
                            <h5 className="fw-bold">
                              #{invoiceData?.invoice_id}
                            </h5>
                          </Col>
                        </Row>

                        {/* Info penerima & tanggal */}
                        <Row className="mb-4">
                          <Col xs={6}>
                            <p className="mb-1 fw-bold">To:</p>
                            <p>{invoiceData?.recipient_name}</p>
                          </Col>
                          <Col xs={6} className="text-end">
                            <p className="mb-1 fw-bold">Invoice Date</p>
                            <p className="mb-0">
                              Start:{" "}
                              {moment(invoiceData?.invoice_date).format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                            <p>
                              End:{" "}
                              {moment(invoiceData?.expired_date).format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                          </Col>
                        </Row>

                        {/* Tabel rincian invoice */}
                        <Table bordered hover responsive className="mb-4">
                          <thead className="table-light">
                            <tr>
                              <th>Description</th>
                              <th className="text-end">Amount</th>
                            </tr>
                          </thead>
                          <tbody>
                            {console.log(invoiceData)}
                            {invoiceData?.detailsInvoice?.map((inv, idx) => (
                              <tr key={idx}>
                                <td>{inv.name}</td>
                                <td className="text-end">
                                  {formatRupiah(inv.ammount)}
                                </td>
                              </tr>
                            ))}
                            <tr className="table-active fw-bold">
                              <td>Total</td>
                              <td className="text-end">
                                {formatRupiah(invoiceData?.total_amount)}
                              </td>
                            </tr>
                          </tbody>
                        </Table>

                        {/* Info pembayaran */}
                        <Row>
                          <Col xs={6}>
                            <p className="mb-1 fw-bold">Bank Name</p>
                            <p>{invoiceData?.bank_name}</p>
                          </Col>
                          <Col xs={6} className="text-end">
                            <p className="mb-1 fw-bold">Virtual Account</p>
                            <p>{invoiceData?.virtual_account}</p>
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col xs={12} className="text-center">
                            <Button
                              variant={
                                invoiceData?.payment_status === "PAID"
                                  ? "success"
                                  : "danger"
                              }
                              size="lg"
                              className="px-5"
                            >
                              {invoiceData?.payment_status}
                            </Button>
                          </Col>
                        </Row>
                      </>
                    ) : (
                      <Alert variant="danger">
                        ❌ Gagal membuat invoice. Silakan coba lagi.
                      </Alert>
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
