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
  const {
    title,
    data: token,
    selected,
    back,
    jenis,
    type,
  } = location.state || {};

  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  // Ambil atau buat invoice dari data pendaftaran / selected transaksi
  const getInvoice = useCallback(async () => {
    if (!user) return;

    setLoading(true);
    setError(null);

    try {
      let invData = null;

      if (token) {
        // --- Case: Cek invoice existing berdasarkan token ---
        const res = await UInvoice.cekInvoiceByToken({ token });
        invData = res?.data?.data || null;

        if (!invData) {
          // Buat invoice baru dari token
          const create = await UInvoice.createInvoiceFromPendaftaran({
            pendaftaran_id: token?.id,
            anggota: token?.anggota,
          });
          invData = create?.data?.data || null;
        }
      } else if (selected?.length > 0) {
        // --- Case: Generate invoice manual dari selected transaksi ---
        const generatedId = `REG${Date.now()}`;
        const detailsInvoice = [];
        let total_amount = 0;

        selected.forEach((trx) => {
          const ammount = Number(trx?.jumlah || 0);
          detailsInvoice.push({
            invoice_id: trx?.id,
            name: trx?.name || "Transaksi",
            ammount: String(ammount),
            type: "item", // tandai sebagai item, bukan fee
          });
          total_amount += ammount;
        });

        invData = {
          invoice_id: generatedId,
          recipient_id: user?.nik,
          recipient_name: user?.nama,
          invoice_date: new Date().toISOString(),
          expiration_date: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ).toISOString(),
          method: null,
          jenis: jenis?.name || "-",
          type: type,
          payment_status: "Belum dibayar",
          total_amount: String(total_amount),
          order_id: `${generatedId}-BATCH`,
          payment_desc: `Pembayaran ${jenis?.name || "-"}`,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          detailsInvoice,
          selectedMethod: null,
        };
      }

      if (invData) {
        // Pastikan total_amount selalu dihitung dari detailsInvoice
        const total = (invData.detailsInvoice || []).reduce(
          (sum, item) => sum + Number(item.ammount || 0),
          0
        );
        invData = {
          ...invData,
          total_amount: String(total),
          selectedMethod: invData.method || invData.selectedMethod || null,
        };
      }

      setInvoiceData(invData);
    } catch (err) {
      setError(err?.message || "Gagal memuat invoice");
    } finally {
      setLoading(false);
    }
  }, [token, selected, user, jenis, type]);

  useEffect(() => {
    if (user) getInvoice();
  }, [user, getInvoice]);

  // Terapkan fee tanpa menambahkannya ke detailsInvoice
  const applyFee = useCallback((method) => {
    setInvoiceData((prev) => {
      if (!prev) return null;
      const total = (prev.detailsInvoice || []).reduce(
        (sum, item) => sum + Number(item.ammount || 0),
        0
      );

      const fee =
        method.fee_type === "percentage"
          ? Math.round((total * method.fee_value) / 100)
          : Number(method.fee_value);

      return {
        ...prev,
        selectedMethod: {
          name: `${method.payment_method}`,
          ammount: fee,
          desc: `Biaya ${method.payment_method}`,
        },
      };
    });
  }, []);

  const handleResult = (status, result) => {
    const mappedStatus = mapMidtransStatusToLabel(status);
    setInvoiceData((prev) =>
      prev ? { ...prev, payment_status: mappedStatus } : prev
    );
  };

  const handlePayment = useCallback(async () => {
    if (!invoiceData) return;

    setLoading(true);
    setError(null);
    invoiceRef.current = invoiceData;

    try {
      const res = await UInvoice.payInvoice(invoiceData);
      const token = res?.data?.data?.token;
      if (!token) throw new Error("Gagal mendapatkan Snap token");

      if (!window.snap) throw new Error("Midtrans Snap belum siap");

      window.snap.pay(token, {
        onSuccess: (result) => handleResult("settlement", result),
        onPending: (result) => handleResult("pending", result),
        onError: (result) => handleResult("deny", result),
        onClose: () => handleResult("cancel"),
      });
    } catch (err) {
      setError(err?.message || "Terjadi kesalahan saat memproses pembayaran");
    } finally {
      setLoading(false);
    }
  }, [invoiceData]);

  const handleClick = useCallback(
    (action, payload) => {
      switch (action) {
        case "back":
          navigate(
            `/${jwtEncode({ page: back || "detailPendaftaranAnggota" })}`,
            {
              state: { token },
            }
          );
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
    [applyFee, handlePayment, navigate, back, token]
  );

  if (!user) {
    return (
      <div id="main-wrapper">
        <Header onUserChange={handleUserChange} />
        <Sidebar user={user} />
        <div
          className="page-wrapper d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" />{" "}
          <span className="ms-2">Menunggu data user...</span>
        </div>
      </div>
    );
  }

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
              <h1 className="fw-bold mb-0">{title || "Invoice"}</h1>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12}>
              <Card className="shadow-sm border-0">
                <CardHeader className="bg-primary text-white rounded-top">
                  <CardTitle className="mb-0">Detail Invoice</CardTitle>
                </CardHeader>
                <CardBody>
                  {loading ? (
                    <div className="text-center py-5">
                      <Spinner animation="border" role="status" />
                      <p className="mt-2">Sedang memproses invoice...</p>
                    </div>
                  ) : error ? (
                    <div className="text-center text-danger py-5">
                      {error}
                      <div className="mt-3">
                        <Button onClick={getInvoice}>Coba Lagi</Button>
                      </div>
                    </div>
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
                        <InvoiceDetail data={invoiceData} />
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
                  {invoiceData?.payment_status !== "Pembayaran Berhasil" && (
                    <Button
                      variant="primary"
                      size="lg"
                      className="px-5 w-100"
                      onClick={() => handleClick("pay")}
                      disabled={
                        loading || !invoiceData || !invoiceData.selectedMethod
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
                  )}
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
