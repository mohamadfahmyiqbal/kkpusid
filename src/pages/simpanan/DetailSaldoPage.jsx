import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import {
  Card,
  Button,
  Table,
  Spinner,
  Alert,
  Badge,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaDownload,
  FaSearch,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaExchangeAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { useProfile } from "../../contexts/ProfileContext";
import USimpanan from "../../utils/api/USimpanan";
import { jwtEncode } from "../../routes/helpers";
import InformasiRekeningCard from "../../components/shared/InformasiRekeningCard";
import { formatRupiah } from "../../utils/helper/formatRupiah";

const DetailSaldoPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const abortControllerRef = useRef(new AbortController());

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [balanceSummary, setBalanceSummary] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [dateRange, setDateRange] = useState({
    start: moment().subtract(1, "month").format("YYYY-MM-DD"),
    end: moment().format("YYYY-MM-DD"),
  });
  const [transactionType, setTransactionType] = useState("ALL");

  const { categoryCode, displayName, returnPage } = useMemo(() => {
    return {
      categoryCode: decodedToken?.category || "SS_SUKARELA",
      displayName: decodedToken?.displayName || "Simpanan Sukarela",
      returnPage: decodedToken?.return || "simpananPage",
    };
  }, [decodedToken]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const signal = abortControllerRef.current.signal;

      const [balanceRes, historyRes] = await Promise.all([
        USimpanan.getAccountDetail(categoryCode, { signal }),
        USimpanan.getSavingsHistory(
          {
            category: categoryCode,
            start_date: dateRange.start,
            end_date: dateRange.end,
          },
          { signal }
        ),
      ]);

      if (balanceRes.data?.status) {
        setBalanceSummary(balanceRes.data.data);
      }

      if (historyRes.data?.status) {
        setTransactions(historyRes.data.data || []);
      }
    } catch (err) {
      if (err.name !== "AbortError") {
        console.error("Error fetching detail saldo:", err);
        setError(err.response?.data?.message || "Gagal memuat data transaksi");
      }
    } finally {
      setLoading(false);
    }
  }, [categoryCode, dateRange]);

  useEffect(() => {
    const controller = abortControllerRef.current;
    fetchData();

    return () => {
      controller.abort();
    };
  }, [fetchData]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (transactionType !== "ALL" && transaction.type !== transactionType) {
        return false;
      }

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        return (
          transaction.description?.toLowerCase().includes(searchLower) ||
          transaction.reference_no?.toLowerCase().includes(searchLower) ||
          transaction.amount?.toString().includes(searchTerm)
        );
      }

      return true;
    });
  }, [transactions, searchTerm, transactionType]);

  const summary = useMemo(() => {
    let totalDeposit = 0;
    let totalWithdrawal = 0;

    transactions.forEach((transaction) => {
      if (transaction.type === "DEPOSIT") {
        totalDeposit += parseFloat(transaction.amount || 0);
      } else if (transaction.type === "WITHDRAWAL") {
        totalWithdrawal += parseFloat(transaction.amount || 0);
      }
    });

    return { totalDeposit, totalWithdrawal };
  }, [transactions]);

  const handleBack = useCallback(() => {
    try {
      const token = jwtEncode({ page: returnPage });
      navigate(`/${token}`);
    } catch (error) {
      console.error("Back navigation error:", error);
      const fallbackPages = ["simpananPage", "dashboard", "landingPage"];
      for (const page of fallbackPages) {
        try {
          const fallbackToken = jwtEncode({ page });
          navigate(`/${fallbackToken}`);
          break;
        } catch {
          continue;
        }
      }
    }
  }, [returnPage, navigate]);

  const handleExport = useCallback(() => {
    alert("Fitur export akan segera tersedia");
  }, []);

  const handleTransactionClick = useCallback(
    (transaction) => {
      try {
        const token = jwtEncode({
          page: "transactionDetailPage",
          transactionId: transaction.id,
          return: "detailSaldoPage",
          category: categoryCode,
        });
        navigate(`/${token}`);
      } catch (error) {
        console.error("Transaction detail navigation error:", error);
        alert("Tidak dapat membuka detail transaksi. Silakan coba lagi.");
      }
    },
    [categoryCode, navigate]
  );

  const handlePenarikanClick = useCallback(() => {
    try {
      const token = jwtEncode({
        page: "penarikanSimpananPage",
        category: categoryCode,
        displayName: displayName,
        return: "detailSaldoPage",
      });
      navigate(`/${token}`);
    } catch (error) {
      console.error("Penarikan navigation error:", error);
      alert("Tidak dapat membuka halaman penarikan.");
    }
  }, [categoryCode, displayName, navigate]);

  const handleSetoranClick = useCallback(() => {
    try {
      const token = jwtEncode({
        page: "billingPage",
        category: categoryCode,
        displayName: displayName,
        return: "detailSaldoPage",
      });
      navigate(`/${token}`);
    } catch (error) {
      console.error("Setoran navigation error:", error);
      alert("Tidak dapat membuka halaman setoran.");
    }
  }, [categoryCode, displayName, navigate]);

  if (loading) {
    return (
      <div className="vh-100 d-flex flex-column justify-content-center align-items-center bg-white">
        <Spinner animation="border" variant="primary" />
        <p className="mt-2 text-muted small">Memuat detail saldo...</p>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Button
            variant="light"
            onClick={handleBack}
            className="rounded-circle me-3 shadow-sm"
          >
            <FaArrowLeft />
          </Button>
          <div>
            <h5 className="fw-bold mb-0">Detail Saldo</h5>
            <small className="text-muted">{displayName}</small>
          </div>
        </div>
        <Button
          variant="outline-primary"
          onClick={handleExport}
          className="d-flex align-items-center"
        >
          <FaDownload className="me-2" />
          Export
        </Button>
      </div>

      {error && (
        <Alert variant="danger" className="rounded-4 shadow-sm border-0 mb-4">
          {error}
        </Alert>
      )}

      <Row className="mb-4">
        <Col lg={8}>
          <InformasiRekeningCard
            activeType={categoryCode}
            displayName={displayName}
            variant="primary"
            showActions={false}
          />
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm h-100 rounded-4">
            <Card.Body className="p-4">
              <h6 className="fw-bold mb-4 text-muted">Ringkasan Periode</h6>

              <div className="mb-3">
                <small className="text-muted d-block">Total Setoran</small>
                <h4 className="text-success fw-bold">
                  Rp {formatRupiah(summary.totalDeposit.toString())}
                </h4>
              </div>

              <div className="mb-3">
                <small className="text-muted d-block">Total Penarikan</small>
                <h4 className="text-danger fw-bold">
                  Rp {formatRupiah(summary.totalWithdrawal.toString())}
                </h4>
              </div>

              <div className="mb-3">
                <small className="text-muted d-block">Jumlah Transaksi</small>
                <h4 className="text-primary fw-bold">
                  {transactions.length} Transaksi
                </h4>
              </div>

              {balanceSummary && (
                <div className="mt-4 pt-3 border-top">
                  <small className="text-muted d-block">Saldo Akhir</small>
                  <h3 className="fw-bold text-dark">
                    Rp {formatRupiah(balanceSummary.balance?.toString() || "0")}
                  </h3>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Card className="border-0 shadow-sm mb-4 rounded-4">
        <Card.Body className="p-3">
          <Row className="align-items-center">
            <Col md={4}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <FaSearch />
                </InputGroup.Text>
                <Form.Control
                  placeholder="Cari transaksi..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={dateRange.start}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, start: e.target.value })
                  }
                />
              </InputGroup>
            </Col>
            <Col md={3}>
              <InputGroup>
                <InputGroup.Text className="bg-white">
                  <FaCalendarAlt />
                </InputGroup.Text>
                <Form.Control
                  type="date"
                  value={dateRange.end}
                  onChange={(e) =>
                    setDateRange({ ...dateRange, end: e.target.value })
                  }
                />
              </InputGroup>
            </Col>
            <Col md={2}>
              <Form.Select
                value={transactionType}
                onChange={(e) => setTransactionType(e.target.value)}
              >
                <option value="ALL">Semua Tipe</option>
                <option value="DEPOSIT">Setoran</option>
                <option value="WITHDRAWAL">Penarikan</option>
                <option value="INTEREST">Bunga</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm rounded-4">
        <Card.Header className="bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <h6 className="fw-bold mb-0">Riwayat Transaksi</h6>
            <Badge bg="light" text="dark" className="px-3 py-2">
              {filteredTransactions.length} transaksi ditemukan
            </Badge>
          </div>
        </Card.Header>
        <Card.Body className="p-0">
          {filteredTransactions.length === 0 ? (
            <div className="text-center py-5">
              <FaMoneyBillWave size={48} className="text-muted mb-3" />
              <p className="text-muted">Tidak ada transaksi ditemukan</p>
              <Button
                variant="outline-primary"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setTransactionType("ALL");
                }}
              >
                Reset Filter
              </Button>
            </div>
          ) : (
            <div className="table-responsive">
              <Table hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="ps-4">Tanggal</th>
                    <th>Keterangan</th>
                    <th>No. Referensi</th>
                    <th>Jenis</th>
                    <th className="text-end pe-4">Jumlah</th>
                    <th className="text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <tr
                      key={index}
                      onClick={() => handleTransactionClick(transaction)}
                      style={{ cursor: "pointer" }}
                      className="hover-bg-light"
                    >
                      <td className="ps-4">
                        {moment(transaction.created_at).format("DD/MM/YYYY")}
                      </td>
                      <td>
                        <div className="fw-semibold">
                          {transaction.description || "Transaksi"}
                        </div>
                        <small className="text-muted">
                          {transaction.notes}
                        </small>
                      </td>
                      <td>
                        <code>{transaction.reference_no || "-"}</code>
                      </td>
                      <td>
                        <Badge
                          bg={
                            transaction.type === "DEPOSIT"
                              ? "success"
                              : transaction.type === "WITHDRAWAL"
                              ? "danger"
                              : "warning"
                          }
                          className="px-3 py-1"
                        >
                          {transaction.type === "DEPOSIT"
                            ? "Setoran"
                            : transaction.type === "WITHDRAWAL"
                            ? "Penarikan"
                            : "Bunga"}
                        </Badge>
                      </td>
                      <td className="text-end pe-4 fw-bold">
                        <span
                          className={
                            transaction.type === "DEPOSIT"
                              ? "text-success"
                              : "text-danger"
                          }
                        >
                          {transaction.type === "DEPOSIT" ? "+" : "-"} Rp{" "}
                          {formatRupiah(transaction.amount?.toString() || "0")}
                        </span>
                      </td>
                      <td className="text-center">
                        <Badge
                          bg={
                            transaction.status === "SUCCESS"
                              ? "success"
                              : transaction.status === "PENDING"
                              ? "warning"
                              : "secondary"
                          }
                          className="px-3"
                        >
                          {transaction.status || "PENDING"}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="bg-white border-0 py-3">
          <div className="d-flex justify-content-between align-items-center">
            <small className="text-muted">
              Menampilkan {filteredTransactions.length} dari{" "}
              {transactions.length} transaksi
            </small>
            <div className="d-flex gap-2">
              <Button variant="outline-secondary" size="sm">
                Sebelumnya
              </Button>
              <Button variant="outline-primary" size="sm">
                Selanjutnya
              </Button>
            </div>
          </div>
        </Card.Footer>
      </Card>

      <Row className="mt-4">
        <Col md={4}>
          <Button
            variant="outline-primary"
            className="w-100 d-flex align-items-center justify-content-center py-3"
            onClick={handlePenarikanClick}
            disabled={!balanceSummary?.balance || balanceSummary.balance <= 0}
          >
            <FaExchangeAlt className="me-2" />
            Ajukan Penarikan
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="primary"
            className="w-100 d-flex align-items-center justify-content-center py-3"
            onClick={handleSetoranClick}
          >
            <FaMoneyBillWave className="me-2" />
            Setoran Baru
          </Button>
        </Col>
        <Col md={4}>
          <Button
            variant="light"
            className="w-100 d-flex align-items-center justify-content-center py-3"
            onClick={fetchData}
          >
            Refresh Data
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default DetailSaldoPage;
