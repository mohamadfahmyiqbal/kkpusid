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
  Form,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft, FaCheck, FaFile, FaMoneyBillWave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { jwtEncode } from "../../routes/helpers";
import UTransaksi from "../../utils/UTransaksi";
import USimpanan from "../../utils/USimpanan";

export default function PencairanSimpananScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [nominal, setNominal] = useState(50000);
  const [error, setError] = useState(null);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  const location = useLocation();
  const {
    title = "Pencairan Simpanan Sukarela",
    data: token,
    back = "Simpanan",
  } = location.state || {};

  /** 🔹 Callback update user */
  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  /** 🔹 Ambil daftar transaksi sukarela */
  const getSukarela = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    setError(null);

    try {
      const res = await UTransaksi.findTransByJenis({
        jenis: "Simpanan Sukarela",
      });

      if (res?.data?.data && Array.isArray(res.data.data)) {
        setTransactions(res.data.data);
      } else {
        setTransactions([]);
      }
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

  /** 🔹 Aksi Navigasi dan Transaksi */
  const handleClick = useCallback(
    async (action, data) => {
      switch (action) {
        case "back":
          navigate(`/${jwtEncode({ page: back })}`, { state: { token } });
          break;

        /** 🔴 Penarikan: koperasi membayar ke anggota */
        case "withdraw":
          if (!nominal || nominal < 50000) {
            alert("Minimal pencairan adalah Rp 50.000");
            return;
          }
          const res = await USimpanan.reqPencairanSimpanan({
            title: "Resi Pencairan Sukarela",
            selected: [
              {
                id: `Pencairan${Date.now()}`,
                name: "Pencairan Simpanan Sukarela",
                jumlah: nominal,
              },
            ],
            back: "Pencairan",
            jenis: { name: "Simpanan Sukarela" },
            type: "Tarik",
          });

          navigate(`/${jwtEncode({ page: "resi" })}`, {
            state: {
              title: "Resi Pencairan Sukarela",
              selected: [
                {
                  id: `PENARIKAN${Date.now()}`,
                  name: "Pencairan Simpanan Sukarela",
                  jumlah: nominal,
                },
              ],
              back: "Pencairan",
              jenis: { name: "Simpanan Sukarela" },
              type: "Tarik",
            },
          });
          break;

        /** 📄 Lihat detail invoice */
        case "invoice":
          if (!data) return;
          navigate(`/${jwtEncode({ page: "invoice" })}`, {
            state: {
              title: `Invoice Pencairan Sukarela`,
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
              type: "Penarikan",
            },
          });
          break;

        default:
          break;
      }
    },
    [navigate, back, token, nominal]
  );

  /** 🔹 Loading user */
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

          {error && (
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          {/* 🔹 Form Pencairan */}
          <Card className="shadow-sm border-0">
            <CardHeader className="bg-primary text-white rounded-top">
              <CardTitle className="mb-0">
                Formulir Pencairan Sukarela
              </CardTitle>
            </CardHeader>
            <CardBody>
              <Form.Group controlId="nominal" className="mb-3">
                <Form.Label>Nominal Pencairan</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Masukkan nominal pencairan"
                  min={50000}
                  step={50000}
                  value={nominal}
                  onChange={(e) => setNominal(Number(e.target.value))}
                />
              </Form.Group>

              <Form.Group controlId="nama-nasabah" className="mb-3">
                <Form.Label>Nama Anggota</Form.Label>
                <Form.Control type="text" value={user?.nama} readOnly />
              </Form.Group>

              <Form.Group controlId="bank" className="mb-3">
                <Form.Label>Bank</Form.Label>
                <Form.Control
                  type="text"
                  value={user?.bankAnggota?.bank || "-"}
                  readOnly
                />
              </Form.Group>

              <Form.Group controlId="no-rekening" className="mb-3">
                <Form.Label>Nomor Rekening</Form.Label>
                <Form.Control
                  type="text"
                  value={user?.bankAnggota?.no_rekening || "-"}
                  readOnly
                />
              </Form.Group>
            </CardBody>

            <CardFooter className="d-flex">
              <Button
                variant="success"
                size="lg"
                className="flex-fill d-flex align-items-center justify-content-center"
                onClick={() => handleClick("withdraw")}
                disabled={loading}
              >
                <FaMoneyBillWave className="me-2" />
                Ajukan Pencairan
              </Button>
            </CardFooter>
          </Card>

          {/* 🔹 History Transaksi */}
          <Card className="shadow-sm border-0 mt-4">
            <CardHeader className="bg-primary text-white">
              <CardTitle>Riwayat Pencairan</CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="text-center my-4">
                  <Spinner animation="border" />{" "}
                  <span className="ms-2">Memuat...</span>
                </div>
              ) : transactions.length > 0 ? (
                transactions
                  .filter((trx) => trx.type === "Penarikan")
                  .map((trx, i) => (
                    <Row
                      key={i}
                      className="py-2 border-bottom align-items-center"
                    >
                      <Col xs="auto">
                        <Button
                          variant="outline-primary"
                          size="sm"
                          onClick={() =>
                            handleClick("invoice", trx.invoiceTrans)
                          }
                        >
                          <FaFile />
                        </Button>
                      </Col>
                      <Col>
                        <div className="fw-bold">
                          {trx?.name || "Pencairan Simpanan Sukarela"}
                        </div>
                        <div className="fw-semibold text-danger">
                          - Rp.{" "}
                          {Number(
                            trx.invoiceTrans?.total_amount || 0
                          ).toLocaleString("id-ID")}
                        </div>
                        <small className="text-muted">
                          {new Date(
                            trx.invoiceTrans?.updatedAt
                          ).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          })}
                        </small>
                      </Col>
                      <Col xs="auto">
                        <Button
                          variant={
                            trx.payment_status === "Pembayaran Selesai"
                              ? "success"
                              : "warning"
                          }
                          size="sm"
                          disabled
                        >
                          <FaCheck className="me-1" />
                          {trx.payment_status || "Diproses"}
                        </Button>
                      </Col>
                    </Row>
                  ))
              ) : (
                <div className="text-center text-muted py-3">
                  Belum ada data pencairan sukarela.
                </div>
              )}
            </CardBody>
          </Card>
        </Container>
      </div>
    </div>
  );
}
