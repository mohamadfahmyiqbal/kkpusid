// 📁 pages/member/PenarikanSimpananPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  Button,
  Form,
  Row,
  Col,
  InputGroup,
  Spinner,
  ListGroup,
  Alert,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaDownload,
  FaFileInvoice,
  FaUniversity,
  FaMoneyBillWave,
  FaExclamationTriangle,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import { useProfile } from "../../contexts/ProfileContext";
import USimpanan from "../../utils/api/USimpanan";
import { jwtEncode } from "../../routes/helpers";

/**
 * Helper format rupiah
 */
const formatRupiah = (value) => {
  if (!value) return "";
  const raw = value.toString().replace(/[^0-9]/g, ""); // Hanya angka
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

const PenarikanSimpananPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { userData, loading: loadingProfile } = useProfile();

  // State Lokal
  const [currentMaxAmount, setCurrentMaxAmount] = useState(
    decodedToken?.maxAmount || 0
  );
  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [loadingBalance, setLoadingBalance] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  const [errorBalance, setErrorBalance] = useState(null);
  const [errorHistory, setErrorHistory] = useState(null); // State untuk handle error 500

  /** ✅ METODE PENCAIRAN */
  const [method, setMethod] = useState("TRANSFER");

  /** FIELD TUNAI */
  const [cashName, setCashName] = useState("");
  const [cashTime, setCashTime] = useState("");
  const [cashLocation, setCashLocation] = useState("");

  /**
   * DATA DARI TOKEN
   */
  const { returnPage, categoryCode, displayName } = useMemo(() => {
    return {
      returnPage: decodedToken?.return || "dashboard",
      categoryCode: decodedToken?.category || "SS_SUKARELA",
      displayName: decodedToken?.displayName || "Simpanan Sukarela",
    };
  }, [decodedToken]);

  /**
   * AMBIL SALDO TERBARU
   */
  const fetchBalance = useCallback(async () => {
    setLoadingBalance(true);
    setErrorBalance(null);
    try {
      const res = await USimpanan.getAccountDetail(categoryCode);
      if (res.data?.status) {
        setCurrentMaxAmount(res.data.data?.balance || 0);
      }
    } catch (err) {
      console.error("Fetch Balance Error:", err);
      setErrorBalance("Gagal menyinkronkan saldo terbaru.");
    } finally {
      setLoadingBalance(false);
    }
  }, [categoryCode]);

  /**
   * LOAD RIWAYAT KHUSUS PENARIKAN (Withdrawals)
   * Dilengkapi penanganan error untuk mendeteksi ERR_BAD_RESPONSE
   */
  const loadHistory = useCallback(async () => {
    setLoadingHistory(true);
    setErrorHistory(null);
    try {
      const res = await USimpanan.getWithdrawalHistory({
        category: categoryCode,
      });
      if (res.data?.status) {
        setHistory(res.data.data || []);
      }
    } catch (err) {
      console.error("Fetch History Error:", err);
      setErrorHistory(
        err.response?.data?.message ||
          "Internal Server Error (500): Gagal memuat riwayat."
      );
    } finally {
      setLoadingHistory(false);
    }
  }, [categoryCode]);

  useEffect(() => {
    fetchBalance();
    loadHistory();
  }, [fetchBalance, loadHistory]);

  /**
   * BANK PROFILE DARI CONTEXT
   */
  const bankAccount = useMemo(() => {
    if (!userData?.bank_info) return null;
    return {
      bankName: userData.bank_info.bank_name,
      accountNo: userData.bank_info.bank_account_no,
      accountHolder: userData.bank_info.account_holder,
    };
  }, [userData]);

  /**
   * HANDLERS
   */
  const handleBack = () => {
    const token = jwtEncode({ page: returnPage });
    navigate(`/${token}`);
  };

  const handleAmountChange = (e) => {
    const raw = e.target.value.replace(/\./g, "");
    if (!isNaN(raw)) {
      setCustomAmount(formatRupiah(raw));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const amount = Number(customAmount.replace(/\./g, ""));

    if (!amount || amount < 10000) {
      alert("Minimal penarikan Rp 10.000");
      return;
    }

    if (amount > currentMaxAmount) {
      alert("Saldo tidak mencukupi untuk nominal tersebut.");
      return;
    }

    if (method === "TRANSFER" && !bankAccount) {
      alert("Data rekening bank Anda belum lengkap di profil.");
      return;
    }

    if (method === "TUNAI" && (!cashName || !cashTime || !cashLocation)) {
      alert("Mohon lengkapi detail rencana pengambilan tunai.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        amount,
        category: categoryCode,
        method: method,
        ...(method === "TRANSFER" && {
          bank_name: bankAccount.bankName,
          bank_account_no: bankAccount.accountNo,
          account_holder: bankAccount.accountHolder,
        }),
        ...(method === "TUNAI" && {
          cash_name: cashName,
          cash_time: cashTime,
          cash_location: cashLocation,
        }),
      };

      const res = await USimpanan.requestWithdrawal(payload);

      if (res.data?.status) {
        const token = jwtEncode({
          page: "transactionDetailPage",
          withdrawalId: res.data.data.withdrawal_id,
          return: "simpananPage",
        });
        navigate(`/${token}`);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Terjadi kesalahan saat pengajuan.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loadingProfile || loadingBalance) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted small">Sinkronisasi Saldo...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex align-items-center mb-4">
        <Button
          variant="light"
          onClick={handleBack}
          className="rounded-circle me-3 shadow-sm"
        >
          <FaArrowLeft />
        </Button>
        <h5 className="fw-bold mb-0">Pencairan {displayName}</h5>
      </div>

      {errorBalance && (
        <Alert variant="danger" className="rounded-4 shadow-sm border-0 mb-4">
          <FaExclamationTriangle className="me-2" /> {errorBalance}
        </Alert>
      )}

      <Row className="justify-content-center">
        <Col lg={12}>
          <Card className="border-0 shadow-sm mb-4 rounded-4">
            <Card.Body className="p-4">
              <div className="mb-4 p-4 bg-primary text-white rounded-4 shadow-sm d-flex justify-content-between align-items-center">
                <div>
                  <small className="opacity-75 text-uppercase fw-bold">
                    Saldo Tersedia
                  </small>
                  <h2 className="fw-bold mb-0 mt-1">
                    Rp {currentMaxAmount.toLocaleString("id-ID")}
                  </h2>
                </div>
                <FaMoneyBillWave size={40} className="opacity-50" />
              </div>

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold small text-muted">
                    METODE PENCAIRAN
                  </Form.Label>
                  <Form.Select
                    size="lg"
                    className="rounded-3 border-2"
                    value={method}
                    onChange={(e) => setMethod(e.target.value)}
                  >
                    <option value="TRANSFER">Transfer Bank</option>
                    <option value="TUNAI">Tunai / Cash</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label className="fw-bold small text-muted">
                    NOMINAL PENARIKAN
                  </Form.Label>
                  <InputGroup size="lg">
                    <InputGroup.Text className="bg-white border-2 border-end-0">
                      Rp
                    </InputGroup.Text>
                    <Form.Control
                      className="border-2 border-start-0 fw-bold text-primary"
                      placeholder="0"
                      value={customAmount}
                      onChange={handleAmountChange}
                      disabled={isSubmitting || currentMaxAmount <= 0}
                      required
                    />
                  </InputGroup>
                  <small className="text-muted mt-2 d-block italic">
                    * Minimal penarikan Rp 10.000
                  </small>
                </Form.Group>

                {method === "TRANSFER" && (
                  <Card className="bg-light border-0 rounded-4 mb-4">
                    <Card.Body>
                      <div className="d-flex align-items-center mb-3">
                        <FaUniversity className="text-primary me-2" />
                        <span className="fw-bold">Tujuan Rekening</span>
                      </div>
                      {bankAccount ? (
                        <div className="ps-4 border-start border-primary border-3">
                          <div className="fw-bold text-uppercase">
                            {bankAccount.bankName}
                          </div>
                          <div className="h5 fw-bold my-1 text-primary">
                            {bankAccount.accountNo}
                          </div>
                          <div className="text-muted small">
                            a/n {bankAccount.accountHolder}
                          </div>
                        </div>
                      ) : (
                        <Alert
                          variant="warning"
                          className="py-2 small border-0"
                        >
                          <FaExclamationTriangle /> Data rekening belum diisi di
                          profil.
                        </Alert>
                      )}
                    </Card.Body>
                  </Card>
                )}

                {method === "TUNAI" && (
                  <div className="p-3 bg-light rounded-4 mb-4">
                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">
                        Nama Penerima / Kuasa
                      </Form.Label>
                      <Form.Control
                        className="rounded-3"
                        value={cashName}
                        placeholder="Nama Lengkap"
                        onChange={(e) => setCashName(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold">
                            Rencana Waktu
                          </Form.Label>
                          <Form.Control
                            type="datetime-local"
                            className="rounded-3"
                            value={cashTime}
                            onChange={(e) => setCashTime(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6}>
                        <Form.Group className="mb-3">
                          <Form.Label className="small fw-bold">
                            Lokasi / Kantor Cabang
                          </Form.Label>
                          <Form.Control
                            className="rounded-3"
                            placeholder="Contoh: Kantor Pusat"
                            value={cashLocation}
                            onChange={(e) => setCashLocation(e.target.value)}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </div>
                )}

                <div className="d-flex align-items-start mb-4 text-muted small bg-white p-3 rounded-3 border">
                  <FaInfoCircle className="me-2 mt-1 text-primary" />
                  <span>
                    Setiap pengajuan pencairan akan melalui proses verifikasi
                    admin sebelum dana dicairkan.
                  </span>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-100 fw-bold py-3 rounded-4 shadow"
                  disabled={
                    isSubmitting || !customAmount || currentMaxAmount <= 0
                  }
                >
                  {isSubmitting ? (
                    <>
                      <Spinner size="sm" className="me-2" /> Memproses...
                    </>
                  ) : (
                    <>
                      <FaDownload className="me-2" /> Ajukan Pencairan Sekarang
                    </>
                  )}
                </Button>
              </Form>
            </Card.Body>
          </Card>

          {/* RIWAYAT PENCAIRAN */}
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Header className="bg-dark text-white fw-bold py-3 border-0">
              Riwayat Pengajuan
            </Card.Header>
            <Card.Body className="p-0">
              {loadingHistory ? (
                <div className="p-5 text-center">
                  <Spinner size="sm" animation="grow" />
                </div>
              ) : errorHistory ? (
                <div className="p-4 text-center">
                  <Alert variant="danger" className="border-0 shadow-sm small">
                    <FaExclamationTriangle className="me-2" /> {errorHistory}
                    <div className="mt-2">
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={loadHistory}
                      >
                        Coba Lagi
                      </Button>
                    </div>
                  </Alert>
                </div>
              ) : history.length ? (
                <ListGroup variant="flush">
                  {history.map((item, i) => (
                    <ListGroup.Item key={i} className="p-3">
                      <div className="d-flex justify-content-between align-items-center">
                        <div className="d-flex align-items-center">
                          <div className="bg-light p-2 rounded-3 me-3">
                            <FaFileInvoice className="text-danger" />
                          </div>
                          <div>
                            <div className="fw-bold">
                              {item.description || `Pencairan ${displayName}`}
                            </div>
                            <small className="text-muted">
                              {new Date(
                                item.created_at || item.createdAt
                              ).toLocaleDateString("id-ID", {
                                dateStyle: "long",
                              })}
                            </small>
                          </div>
                        </div>
                        <div className="text-end">
                          <div className="fw-bold text-danger">
                            - Rp {Number(item.amount).toLocaleString("id-ID")}
                          </div>
                          <span
                            className={`badge ${
                              item.status === "APPROVED"
                                ? "bg-success"
                                : item.status === "REJECTED"
                                ? "bg-danger"
                                : "bg-warning"
                            } fw-normal`}
                          >
                            {item.status || "WAITING"}
                          </span>
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              ) : (
                <div className="p-5 text-center text-muted small">
                  <FaInfoCircle size={30} className="mb-2 opacity-25" />
                  <p className="mb-0">Belum ada riwayat pengajuan pencairan.</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default PenarikanSimpananPage;
