// src/pages/invoice/InvoiceScreen.jsx
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
import PaymentMethods from "../../comp/global/payment/PaymentMethods";

// Utility format Rupiah
const formatRupiah = (value) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value || 0);

export default function InvoiceScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [paying, setPaying] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { title, payload } = location.state || {};
  const cardTitle = title ?? "Invoice";

  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  // Generate invoice otomatis
  useEffect(() => {
    if (!payload) return;

    const generateInvoice = async () => {
      try {
        setLoading(true);
        const res = await UInvoice.generateInvoice({
          token: payload.token,
          type: payload.type,
        });
        console.log(res.data);

        if (res?.data?.data) {
          setInvoiceData({
            ...res.data.data,
            base_amount: res.data.data.total_amount, // simpan total asli
            selected_method: null,
            paymentDetails: res.data.data.paymentDetails || [],
          });
        }
      } catch (error) {
        console.error("Generate Invoice Error:", error);
      } finally {
        setLoading(false);
      }
    };

    generateInvoice();
  }, [payload]);

  // Bayar invoice
  const handlePayment = async (method) => {
    if (!invoiceData) return;

    try {
      setPaying(true);

      // Hitung fee
      let feeAmount = 0;
      if (method.fee_value) {
        if (method.fee_type === "percentage") {
          feeAmount =
            (invoiceData.base_amount * parseFloat(method.fee_value)) / 100;
        } else {
          feeAmount = parseFloat(method.fee_value);
        }
      }

      // Update invoiceData untuk preview
      const updatedInvoice = {
        ...invoiceData,
        selected_method: method.payment_method,
        paymentDetails: [
          ...(invoiceData.originalDetails || invoiceData.paymentDetails || []),
          { name: method.description, ammount: feeAmount },
        ],
        invoices_detail: { name: method.description, ammount: feeAmount },
        total_amount: invoiceData.base_amount + feeAmount,
      };

      // Simpan original details sekali saja
      if (!invoiceData.originalDetails) {
        updatedInvoice.originalDetails = invoiceData.paymentDetails || [];
      }

      setInvoiceData(updatedInvoice);

      // Panggil API backend untuk create transaksi
      const res = await UInvoice.payInvoice(updatedInvoice);

      if (res?.data?.data?.snap_token) {
        const snapToken = res.data.data.snap_token;

        // 🔥 Trigger Midtrans Snap
        window.snap.pay(snapToken, {
          onSuccess: function (result) {
            // console.log("✅ Payment Success:", result);
            setInvoiceData((prev) => ({
              ...prev,
              payment_status: "Berhasil",
            }));
          },
          onPending: function (result) {
            // console.log("⏳ Payment Pending:", result);
            setInvoiceData((prev) => ({
              ...prev,
              payment_status: "Menunggu Pembayaran",
            }));
          },
          onError: function (result) {
            // console.error("❌ Payment Error:", result);
            alert("Terjadi kesalahan saat pembayaran.");
          },
          onClose: function () {
            // console.log("❌ Payment popup ditutup tanpa transaksi");
          },
        });
      } else {
        alert("Gagal mendapatkan Snap Token");
      }
    } catch (error) {
      console.error("Payment Error:", error);
      alert("Gagal melakukan pembayaran. Silakan coba lagi.");
    } finally {
      setPaying(false);
    }
  };

  const renderInvoiceDetails = () => {
    if (!invoiceData) return null;
    const { paymentDetails = [], total_amount } = invoiceData;

    return (
      <Table bordered hover responsive className="mb-4">
        <thead className="table-light">
          <tr>
            <th>Description</th>
            <th className="text-end">Amount</th>
          </tr>
        </thead>
        <tbody>
          {paymentDetails.map((item, idx) => (
            <tr key={idx}>
              <td>{item.name}</td>
              <td className="text-end">{formatRupiah(item.ammount)}</td>
            </tr>
          ))}
          <tr className="table-active fw-bold">
            <td>Total</td>
            <td className="text-end">{formatRupiah(total_amount)}</td>
          </tr>
        </tbody>
      </Table>
    );
  };

  const renderPaymentStatus = () => {
    const status = invoiceData?.payment_status ?? "Menunggu Pembayaran";
    return (
      <Row className="mt-3">
        <Col xs={12} className="text-center">
          <Button
            variant={status === "Menunggu Pembayaran" ? "success" : "danger"}
            size="lg"
            className="px-5"
          >
            {status}
          </Button>
        </Col>
      </Row>
    );
  };

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
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

          {!payload && (
            <Alert variant="warning">Tidak ada data pendaftaran.</Alert>
          )}

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
                        {/* Payment Methods pakai react-select */}
                        <PaymentMethods
                          paymentStatus={invoiceData?.payment_status}
                          selectedMethod={invoiceData?.selected_method}
                          onPay={handlePayment}
                          token={payload?.token}
                        />

                        {/* Header Invoice */}
                        <Row className="mb-4 mt-4">
                          <Col xs={6}>
                            <h3 className="fw-bold">INVOICE</h3>
                          </Col>
                          <Col xs={6} className="text-end">
                            <h5 className="fw-bold">
                              #{invoiceData.invoice_id}
                            </h5>
                          </Col>
                        </Row>

                        {/* Info penerima & tanggal */}
                        <Row className="mb-4">
                          <Col xs={6}>
                            <p className="mb-1 fw-bold">To:</p>
                            <p>{invoiceData.recipient_name}</p>
                          </Col>
                          <Col xs={6} className="text-end">
                            <p className="mb-1 fw-bold">Invoice Date</p>
                            <p className="mb-0">
                              Start:{" "}
                              {moment(invoiceData.invoice_date).format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                            <p>
                              End:{" "}
                              {moment(invoiceData.expired_date).format(
                                "DD-MM-YYYY"
                              )}
                            </p>
                          </Col>
                        </Row>

                        {/* Rincian invoice */}
                        {renderInvoiceDetails()}

                        {/* Tombol Proses Pembayaran */}
                        {invoiceData?.payment_status ===
                          "Menunggu Pembayaran" &&
                          invoiceData?.selected_method && (
                            <Row className="mt-3">
                              <Col xs={12} className="text-center">
                                <Button
                                  variant="primary"
                                  size="lg"
                                  className="px-5"
                                  onClick={() =>
                                    handlePayment(
                                      invoiceData.available_payment_methods.find(
                                        (m) =>
                                          m.payment_method ===
                                          invoiceData.selected_method
                                      )
                                    )
                                  }
                                  disabled={paying}
                                >
                                  {paying ? (
                                    <>
                                      <Spinner
                                        as="span"
                                        animation="border"
                                        size="sm"
                                        role="status"
                                        aria-hidden="true"
                                      />{" "}
                                      Memproses...
                                    </>
                                  ) : (
                                    "Proses Pembayaran"
                                  )}
                                </Button>
                              </Col>
                            </Row>
                          )}

                        {/* Info pembayaran */}
                        <Row className="mt-4">
                          <Col xs={6}>
                            <p className="mb-1 fw-bold">Bank Name</p>
                            <p>{invoiceData.bank_name || "-"}</p>
                          </Col>
                          <Col xs={6} className="text-end">
                            <p className="mb-1 fw-bold">Virtual Account</p>
                            <p>{invoiceData.virtual_account || "-"}</p>
                          </Col>
                        </Row>

                        {/* Status pembayaran */}
                        {renderPaymentStatus()}
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
