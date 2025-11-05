import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaFile } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { jwtEncode } from "../../routes/helpers";
import UTransaksi from "../../utils/UTransaksi";
import moment from "moment";

export default function SukarelaScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nominal, setNominal] = useState(50000);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();

  const {
    title = "Simpanan Sukarela",
    data: token,
    back = "Simpanan",
  } = location.state || {};

  // 🔹 Callback perubahan user
  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  // 🔹 Ambil daftar transaksi sukarela
  const getSukarela = useCallback(async () => {
    if (!user) return;
    try {
      setLoading(true);
      setError(null);
      const res = await UTransaksi.findTransByJenis({
        jenis: "Simpanan Sukarela",
      });
      const data = res?.data?.data;
      setTransactions(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("❌ Gagal mengambil data:", err);
      setError("Gagal memuat data transaksi. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    getSukarela();
  }, [getSukarela]);

  // 🔹 Navigasi dan aksi
  const handleClick = useCallback(
    (action, data = null) => {
      switch (action) {
        case "back":
          navigate(`/${jwtEncode({ page: back })}`, { state: { token } });
          break;

        case "pay":
          if (!nominal || nominal < 50000) {
            alert("Minimal setoran adalah Rp 50.000");
            return;
          }
          navigate(`/${jwtEncode({ page: "invoice" })}`, {
            state: {
              data: null,
              selected: [
                {
                  name: "Simpanan Sukarela",
                  jumlah: nominal,
                },
              ],
              back: "Sukarela",
              jenis: { name: "Simpanan Sukarela" },
              type: "Setor",
              title: "Invoice Simpanan Sukarela",
            },
          });
          break;

        case "invoice":
          if (!data) return;
          navigate(`/${jwtEncode({ page: "invoice" })}`, {
            state: {
              title: "Invoice Simpanan Sukarela",
              data: data.invoice_id,
              selected: [
                {
                  id: data.invoice_id,
                  name: data.jenis_trans || "Simpanan Sukarela",
                  jumlah: Number(data.total_amount) || 0,
                },
              ],
              back: "Sukarela",
              jenis: { name: "Simpanan Sukarela" },
              type: "Setor",
            },
          });
          break;

        default:
          break;
      }
    },
    [navigate, back, token, nominal]
  );

  // 🔹 Buat daftar transaksi (selalu dipanggil)
  const transactionList = useMemo(() => {
    if (loading)
      return (
        <div className="text-center my-4">
          <Spinner animation="border" /> <span className="ms-2">Memuat...</span>
        </div>
      );

    if (!transactions.length)
      return (
        <div className="text-center text-muted py-3">
          Belum ada transaksi simpanan sukarela.
        </div>
      );

    return transactions.map((trx, i) => {
      const invoice = trx?.invoiceTrans || {};
      const status = trx?.payment_status || "Diproses";
      const amount = Number(invoice?.total_amount || 0);
      const date = invoice?.updatedAt
        ? new Date(invoice.updatedAt).toLocaleDateString("id-ID", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })
        : "-";

      return (
        <Row key={i} className="py-2 border-bottom align-items-center">
          <Col xs="auto">
            <Button
              variant="none"
              className="bg-primary text-white"
              size="lg"
              onClick={() => handleClick("invoice", invoice)}
            >
              <FaFile />
            </Button>
          </Col>
          <Col>
            <div className="fw-bold">{trx?.name || "Simpanan Sukarela"}</div>
            <div className="fw-semibold text-success">
              Rp {amount.toLocaleString("id-ID")}
            </div>
            <small className="text-muted">{date}</small>
          </Col>
          <Col xs="auto">
            <Button
              variant={status === "Pembayaran Berhasil" ? "success" : "warning"}
              size="sm"
              disabled
            >
              <FaCheck className="me-1" />
              {status}
            </Button>
          </Col>
        </Row>
      );
    });
  }, [transactions, loading, handleClick]);

  // 🔹 Render UI (hook sudah aman di atas)
  if (!user) {
    return (
      <div id="main-wrapper">
        <Header onUserChange={handleUserChange} />
        <Sidebar />
        <div
          className="page-wrapper d-flex justify-content-center align-items-center"
          style={{ height: "80vh" }}
        >
          <Spinner animation="border" />
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
          {/* 🔹 Header */}
          <Row className="border-bottom mb-3 align-items-center">
            <Col xs="auto">
              <Button
                variant="link"
                className="p-0 d-flex align-items-center text-decoration-none"
                onClick={() => handleClick("back")}
              >
                <FaArrowLeft size={16} className="me-1" />
              </Button>
            </Col>
            <Col>
              <h1 className="fw-bold mb-0">{title}</h1>
            </Col>
          </Row>

          {/* 🔹 Alert Error */}
          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {/* 🔹 Form Setoran Sukarela */}
          <Card className="shadow-sm border-0">
            <CardHeader className="bg-primary text-white rounded-top">
              <CardTitle className="mb-0">Setor Simpanan Sukarela</CardTitle>
            </CardHeader>

            <CardBody>
              <Form.Group controlId="nominal-sukarela">
                <Form.Label>Nominal Setoran</Form.Label>
                <Form.Control
                  type="number"
                  min={50000}
                  step={50000}
                  placeholder="Masukkan nominal setoran"
                  value={nominal}
                  onChange={(e) => setNominal(Number(e.target.value))}
                />
                <Form.Text className="text-muted">
                  Minimal setoran Rp 50.000
                </Form.Text>
              </Form.Group>
            </CardBody>

            <CardFooter>
              <Button
                variant="primary"
                size="lg"
                className="px-5 w-100"
                onClick={() => handleClick("pay")}
                disabled={loading}
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

          {/* 🔹 History Transaksi */}
          <Card className="shadow-sm border-0 mt-4">
            <CardHeader className="bg-primary text-white">
              <CardTitle>Riwayat Transaksi</CardTitle>
            </CardHeader>
            <CardBody>{transactionList}</CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}
