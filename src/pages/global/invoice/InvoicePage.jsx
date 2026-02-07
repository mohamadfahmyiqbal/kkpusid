// 📁 src/pages/member/InvoicePage.jsx
import React, {
  useCallback,
  useMemo,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Card,
  Button,
  Spinner,
  Alert,
  Row,
  Col,
  Table,
  Container,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import {
  FaArrowLeft,
  FaMoneyBillWave,
  FaPrint,
  FaCheckCircle,
  FaRegFileAlt,
} from "react-icons/fa";
import UBilling from "../../../utils/api/UBilling";
import { jwtDecodePage, jwtEncode } from "../../../routes/helpers";

export default function InvoicePage() {
  const navigate = useNavigate();
  const { token } = useParams();
  const pollingRef = useRef(null);

  // 1. Dekode data dari JWT (Bill IDs & Jalur Kembali)
  const { billItemIds, returnPage, category } = useMemo(() => {
    const payload = token ? jwtDecodePage(token) : {};
    let ids = payload.billItemIds || payload.billIds || [];
    return {
      billItemIds: Array.isArray(ids) ? ids : [ids],
      returnPage: payload.return || "dashboard",
      category: payload.category || "GENERAL",
    };
  }, [token]);

  const [billData, setBillData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);

  // 2. Fungsi Fetch Detail Tagihan
  const fetchBillDetail = useCallback(
    async (isPolling = false) => {
      try {
        if (billItemIds.length === 0) return;
        const response = await UBilling.getInvoiceDetail(billItemIds);

        if (response.data?.status) {
          const newData = response.data.data;
          setBillData(newData);

          // Jika status sudah PAID, hentikan polling & loading
          if (newData.status === "PAID") {
            setIsProcessing(false);
            stopPolling();
          }
        }
      } catch (err) {
        console.error("Fetch invoice error:", err);
      } finally {
        if (!isPolling) setLoading(false);
      }
    },
    [billItemIds]
  );

  const startPolling = () => {
    if (pollingRef.current) return;
    pollingRef.current = setInterval(() => fetchBillDetail(true), 5000);
  };

  const stopPolling = () => {
    if (pollingRef.current) {
      clearInterval(pollingRef.current);
      pollingRef.current = null;
    }
  };

  useEffect(() => {
    fetchBillDetail();
    return () => stopPolling();
  }, [fetchBillDetail]);

  const totalAmount = useMemo(
    () =>
      billData?.details?.reduce(
        (sum, item) => sum + Number(item.amount || 0),
        0
      ) || 0,
    [billData]
  );

  // 3. Navigasi Kembali Dinamis
  const handleBack = () => {
    // Navigasi berdasarkan returnPage yang dikirim dari payload origin
    const validPages = ["simpananPage", "transaksiPage", "billingPage"];
    const targetPage = validPages.includes(returnPage)
      ? returnPage
      : "dashboard";

    navigate(`/${jwtEncode({ page: targetPage })}`);
  };

  // 4. Proses Pembayaran Snap Midtrans
  const handlePay = async () => {
    if (!window.snap)
      return alert("Sistem pembayaran belum siap. Mohon refresh halaman.");

    setIsProcessing(true);
    try {
      const response = await UBilling.createMidtransTransaction({
        bill_item_ids: billItemIds,
        tx_category:
          category === "SUKARELA" ? "SAVINGS_DEPOSIT" : "MEMBER_REGISTRATION",
      });

      if (response.data?.status) {
        startPolling(); // Pantau perubahan status di background

        window.snap.pay(response.data.data.snapToken, {
          onSuccess: () => {
            fetchBillDetail();
            stopPolling();
          },
          onPending: () => {
            fetchBillDetail();
          },
          onClose: () => {
            setIsProcessing(false);
            // Jangan stop polling di sini jika user menutup snap tapi sudah bayar (nunggu webhook)
            fetchBillDetail();
          },
          onError: () => {
            setIsProcessing(false);
            stopPolling();
          },
        });
      }
    } catch (err) {
      console.error("Payment error:", err);
      setIsProcessing(false);
      stopPolling();
    }
  };

  if (loading)
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-2 text-muted">Menyiapkan Invoice...</p>
        </div>
      </div>
    );

  const isPaid = billData?.status === "PAID";

  return (
    <Container className="py-5">
      {/* Header Navigasi */}
      <div className="d-flex justify-content-between align-items-center mb-4 d-print-none">
        <Button
          variant="white"
          className="rounded-3 shadow-sm border"
          onClick={handleBack}
        >
          <FaArrowLeft className="me-2" /> Kembali
        </Button>
        <Button
          variant="outline-dark"
          className="rounded-3 shadow-sm"
          onClick={() => window.print()}
        >
          <FaPrint className="me-2" /> Cetak
        </Button>
      </div>

      <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
        {/* Banner Status */}
        <div
          className={`text-center py-4 ${
            isPaid ? "bg-success" : "bg-primary"
          } text-white`}
        >
          {isPaid ? (
            <>
              <FaCheckCircle size={50} className="mb-2" />
              <h4 className="fw-bold mb-0">TRANSAKSI BERHASIL</h4>
            </>
          ) : (
            <>
              <FaRegFileAlt size={50} className="mb-2" />
              <h4 className="fw-bold mb-0">DETAIL TAGIHAN</h4>
            </>
          )}
        </div>

        <Card.Body className="p-4 p-md-5">
          <Row className="mb-5">
            <Col xs={7}>
              <small className="text-uppercase text-muted fw-bold">
                Diterbitkan Untuk:
              </small>
              <h5 className="fw-bold mt-1 mb-1">
                {billData?.full_name || "Anggota"}
              </h5>
              <p className="text-muted small">
                {billData?.member_no || "ID Registrasi"}
              </p>
            </Col>
            <Col xs={5} className="text-end">
              <small className="text-uppercase text-muted fw-bold">
                Nomor Invoice:
              </small>
              <p className="fw-bold mt-1 mb-1">
                #{billData?.invoice_no || "INV/2024/000"}
              </p>
              <small className="text-muted d-block">
                {new Date(billData?.createdAt).toLocaleDateString("id-ID", {
                  dateStyle: "long",
                })}
              </small>
            </Col>
          </Row>

          {/* Tabel Rincian */}
          <Table responsive borderless className="align-middle mb-4">
            <thead className="bg-light text-muted small">
              <tr>
                <th className="py-3 px-3 rounded-start">DESKRIPSI ITEM</th>
                <th className="py-3 px-3 text-end rounded-end">SUBTOTAL</th>
              </tr>
            </thead>
            <tbody>
              {billData?.details?.map((item, index) => (
                <tr key={index} className="border-bottom border-light">
                  <td className="py-4 px-3 fw-semibold text-dark">
                    {item.description}
                  </td>
                  <td className="py-4 px-3 text-end fw-bold h5">
                    Rp {Number(item.amount).toLocaleString("id-ID")}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row className="justify-content-end text-end mt-4">
            <Col md={6}>
              <div className="p-4 rounded-4 bg-light border border-dashed">
                <p className="text-muted mb-1 fw-bold small text-uppercase">
                  Total Pembayaran
                </p>
                <h2 className="fw-bold text-primary mb-0">
                  Rp {totalAmount.toLocaleString("id-ID")}
                </h2>
              </div>
            </Col>
          </Row>
        </Card.Body>

        {/* Footer Aksi */}
        <Card.Footer className="bg-white p-4 p-md-5 border-top d-print-none">
          {!isPaid ? (
            <div className="text-center">
              <Button
                variant="primary"
                size="lg"
                className="w-100 py-3 fw-bold rounded-4 shadow-sm mb-3"
                onClick={handlePay}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />{" "}
                    Memproses...
                  </>
                ) : (
                  <>
                    <FaMoneyBillWave className="me-2" /> BAYAR SEKARANG
                  </>
                )}
              </Button>
              <small className="text-muted">
                Klik tombol di atas untuk memilih metode pembayaran melalui
                Midtrans.
              </small>
            </div>
          ) : (
            <Alert
              variant="success"
              className="rounded-4 py-4 mb-0 text-center border-0 shadow-sm"
            >
              <FaCheckCircle className="me-2 h4 mb-0" />
              <div className="fw-bold">Transaksi ini telah dibayar lunas.</div>
              <small>
                Saldo akan otomatis bertambah ke akun simpanan Anda.
              </small>
            </Alert>
          )}
        </Card.Footer>
      </Card>
    </Container>
  );
}
