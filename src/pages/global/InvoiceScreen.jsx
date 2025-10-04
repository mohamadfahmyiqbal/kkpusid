import { useCallback, useEffect, useRef, useState } from "react";
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
import {
  mapMidtransStatusToLabel,
  getStatusVariant,
} from "../../utils/UStatus";

export default function InvoiceScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [invoiceData, setInvoiceData] = useState(null);
  const [error, setError] = useState(null);

  const invoiceRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { title, dataPendaftaran, back } = location.state || {};
  console.log(dataPendaftaran);

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

  // Terapkan fee saat metode dipilih
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

  // Update status pembayaran
  const handleResult = (status, result) => {
    const mappedStatus = mapMidtransStatusToLabel(status);
    setInvoiceData((prev) =>
      prev ? { ...prev, payment_status: mappedStatus } : prev
    );
  };

  // Proses pembayaran
  const handlePayment = useCallback(async () => {
    if (!invoiceData) return;
    setLoading(true);
    setError(null);

    invoiceRef.current = invoiceData;

    try {
      const res = await UInvoice.payInvoice({
        invoice_id: invoiceData.invoice_id,
        recipient_name: invoiceData.recipient_name,
        detailsInvoice: invoiceData.detailsInvoice,
        selected_method: invoiceData.selectedMethod,
      });

      const token = res?.data?.data?.token;
      if (!token) throw new Error("Gagal mendapatkan Snap token");

      if (!window.snap) {
        console.error("Midtrans Snap belum tersedia");
        setError("Midtrans Snap belum siap, coba refresh halaman");
        setLoading(false);
        return;
      }

      window.snap.pay(token, {
        onSuccess: (result) => handleResult("settlement", result),
        onPending: (result) => handleResult("pending", result),
        onError: (result) => handleResult("deny", result),
        onClose: () => handleResult("cancel"),
      });

      setLoading(false);
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat memproses pembayaran");
      setLoading(false);
    }
  }, [invoiceData]);

  // Handler click action
  const handleClick = useCallback(
    (action, payload) => {
      switch (action) {
        case "back":
          navigate(`/${jwtEncode({ page: back })}`, {
            state: { dataPendaftaran },
          });
          break;
        case "method":
          if (payload) applyFee(payload);
          break;
        case "pay":
          handlePayment();
          break;
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
                      {invoiceData.payment_status !== "Pembayaran Berhasil" && (
                        <PaymentMethods
                          paymentStatus={invoiceData.payment_status}
                          selectedMethod={invoiceData.selectedMethod}
                          onPay={(method) => handleClick("method", method)}
                          token={invoiceData.invoice_id}
                        />
                      )}
                      <div className="border-top border-bottom mt-2">
                        <InvoiceHeader invoiceData={invoiceData} />
                        <InvoiceDetail data={invoiceData.detailsInvoice} />
                        <Row className="fw-bold mt-2 mb-2">
                          <Col xs={6}>Status Pembayaran</Col>
                          <Col xs={6} className="text-end">
                            <Button
                              variant={getStatusVariant(
                                invoiceData.payment_status
                              )}
                              size="sm"
                              disabled
                              className="w-100"
                            >
                              {invoiceData.payment_status || "Belum dibayar"}
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-5">Tidak ada data</div>
                  )}
                </CardBody>
                <CardFooter>
                  {invoiceData?.payment_status !== "Pembayaran Berhasil" ? (
                    <Button
                      variant="primary"
                      size="lg"
                      className="px-5 w-100"
                      onClick={() => handleClick("pay")}
                      disabled={
                        loading ||
                        !invoiceData ||
                        invoiceData?.payment_status === "Pembayaran Berhasil"
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
                  ) : null}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
