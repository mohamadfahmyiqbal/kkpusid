import { useCallback, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { jwtEncode } from "../../routes/helpers";
import UInvoice from "../../utils/UInvoice";
import PaymentMethods from "../../comp/global/payment/PaymentMethods";
import InvoiceHeader from "./InvoiceHeader";
import InvoiceDetail from "./InvoiceDetail";
import PaymentModal from "./InvoiceSnap";

export default function InvoiceScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [snapToken, setSnapToken] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { title, dataPendaftaran } = location.state || {};

  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  // Ambil invoice
  const getInvoice = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await UInvoice.cekInvoiceByToken({
        token: dataPendaftaran?.token,
      });
      const data = res?.data?.data || null;
      if (data) data.selectedMethod = data.selectedMethod || null;
      setInvoiceData(data);
    } catch (err) {
      setError(err?.msg || "Gagal memuat invoice");
    } finally {
      setLoading(false);
    }
  }, [dataPendaftaran?.token]);

  useEffect(() => {
    getInvoice();
  }, [getInvoice]);

  // Terapkan fee dan simpan selectedMethod
  const applyFee = useCallback(
    (method) => {
      if (!invoiceData) return;

      const filteredDetails = (invoiceData.detailsInvoice || []).filter(
        (item) => item.type !== "fee"
      );

      const totalAmount = filteredDetails.reduce(
        (sum, item) => sum + (Number(item.ammount) || 0),
        0
      );

      const feeAmount =
        method.fee_type === "percentage"
          ? Math.round((totalAmount * method.fee_value) / 100)
          : Number(method.fee_value);

      setInvoiceData((prev) => ({
        ...prev,
        selectedMethod: method.payment_method,
        detailsInvoice: [
          ...filteredDetails,
          {
            name: `Biaya ${method.payment_method}`,
            ammount: feeAmount,
            type: "fee",
          },
        ],
      }));
    },
    [invoiceData]
  );

  // Proses pembayaran
  const handlePayment = useCallback(async () => {
    if (!invoiceData) return;
    setLoading(true);
    setError(null);

    try {
      const res = await UInvoice.payInvoice({
        invoice_id: invoiceData.invoice_id,
        recipient_name: invoiceData.recipient_name,
        detailsInvoice: invoiceData.detailsInvoice,
        selected_method: invoiceData.selectedMethod,
      });

      const token = res?.data?.data?.token;
      if (!token) throw new Error("Gagal mendapatkan Snap token");

      setSnapToken(token);
      setShowModal(true);
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat memproses pembayaran");
    } finally {
      setLoading(false);
    }
  }, [invoiceData]);

  const handleClick = useCallback(
    (action, payload) => {
      switch (action) {
        case "back": {
          const token = jwtEncode({ page: "detailPendaftaranAnggota" });
          navigate(`/${token}`, { state: { dataPendaftaran } });
          break;
        }
        case "method": {
          if (payload) applyFee(payload);
          break;
        }
        case "pay": {
          handlePayment();
          break;
        }
        default:
          break;
      }
    },
    [applyFee, handlePayment, navigate, dataPendaftaran]
  );

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 d-flex align-items-center"
                onClick={() => handleClick("back")}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">Invoice Screen</h1>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <Card className="shadow-sm border-0">
                <CardHeader className="bg-primary text-white rounded-top">
                  <CardTitle className="mb-0">{title}</CardTitle>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" role="status" />
                      <p className="mt-2">Sedang memproses invoice...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-danger py-5">{error}</div>
                  ) : invoiceData ? (
                    <>
                      <PaymentMethods
                        paymentStatus={invoiceData.payment_status}
                        selectedMethod={invoiceData.selectedMethod}
                        onPay={(method) => handleClick("method", method)}
                        token={invoiceData.invoice_id}
                      />
                      <div className="border-top border-bottom mt-2">
                        <InvoiceHeader invoiceData={invoiceData} />
                        <InvoiceDetail data={invoiceData.detailsInvoice} />
                        {console.log(invoiceData)}
                        {/* Status Pembayaran */}
                        <div className="mt-3">
                          <strong>Status Pembayaran: </strong>
                          {invoiceData.payment_status === "PAID" && (
                            <span className="text-success">Lunas</span>
                          )}
                          {invoiceData.payment_status ===
                            "Menunggu Pembayaran" && (
                            <span className="text-warning">
                              Menunggu Pembayaran
                            </span>
                          )}
                          {invoiceData.payment_status === "FAILED" && (
                            <span className="text-danger">Gagal</span>
                          )}
                          {!invoiceData.payment_status && (
                            <span className="text-secondary">
                              Belum dibayar
                            </span>
                          )}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-5">Tidak ada data</div>
                  )}
                </CardBody>
                <CardFooter>
                  <Button
                    variant="primary"
                    size="lg"
                    className="px-5 w-100"
                    onClick={() => handleClick("pay")}
                    disabled={
                      loading ||
                      !invoiceData ||
                      invoiceData.payment_status === "PAID"
                    }
                  >
                    {loading ? (
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
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>

        <PaymentModal
          show={showModal}
          onClose={() => setShowModal(false)}
          token={snapToken} // 🔹 pakai token, bukan redirect_url
        />
      </div>
    </div>
  );
}
