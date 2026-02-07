// 📁 src/pages/billing/BillingPage.jsx
import React, { useState, useEffect, useMemo, useCallback } from "react";
import {
  Card,
  Button,
  ListGroup,
  Form,
  Spinner,
  InputGroup,
  Badge,
} from "react-bootstrap";
import {
  FaArrowLeft,
  FaExclamationTriangle,
  FaFileInvoiceDollar,
  FaCheckCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import UBilling from "../../../utils/api/UBilling";
import { jwtEncode } from "../../../routes/helpers";
import useSocketListener from "../../../utils/helper/SocketListener";

/**
 * HELPER: Mengubah angka menjadi format ribuan (10.000)
 */
const formatRupiah = (value) => {
  if (!value) return "";
  const numberString = value.toString().replace(/[^,\d]/g, "");
  const split = numberString.split(",");
  const sisa = split[0].length % 3;
  let rupiah = split[0].substr(0, sisa);
  const ribuan = split[0].substr(sisa).match(/\d{3}/gi);

  if (ribuan) {
    const separator = sisa ? "." : "";
    rupiah += separator + ribuan.join(".");
  }

  return split[1] !== undefined ? rupiah + "," + split[1] : rupiah;
};

const BillingPage = ({ decodedToken }) => {
  const navigate = useNavigate();

  // --- STATE MANAGEMENT ---
  const [bills, setBills] = useState([]);
  const [history, setHistory] = useState([]);
  const [selectedBills, setSelectedBills] = useState([]);
  const [loadingData, setLoadingData] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customAmount, setCustomAmount] = useState("");
  console.log(bills);

  // --- EKSTRAKSI DATA DARI TOKEN ---
  const {
    returnPage,
    registrationId,
    filterParams,
    categoryName,
    isSukarela,
    displayName,
  } = useMemo(() => {
    const category =
      decodedToken?.category || decodedToken?.setoranType || null;
    return {
      returnPage: decodedToken?.return || "dashboard",
      registrationId:
        decodedToken?.registration_id || decodedToken?.registrationId || null,
      categoryName: category,
      displayName: decodedToken?.displayName || "Simpanan",
      isSukarela: category?.toUpperCase().includes("SUKARELA"),
      filterParams: {
        ...(decodedToken?.filter || {}),
        category: category,
      },
    };
  }, [decodedToken]);

  // --- OPTIMASI: HITUNG TOTAL TERPILIH ---
  const totalAmount = useMemo(() => {
    // Memastikan bills adalah array sebelum filter
    const safeBills = Array.isArray(bills) ? bills : [];
    return safeBills
      .filter((bill) => selectedBills.includes(bill.bill_item_id))
      .reduce((sum, bill) => sum + parseFloat(bill.amount || 0), 0);
  }, [selectedBills, bills]);

  // --- FETCH DATA DENGAN SORTING ---
  const loadInitialData = useCallback(async () => {
    setLoadingData(true);
    try {
      const [resPending, resHistory] = await Promise.all([
        !isSukarela
          ? UBilling.getPendingBills(filterParams)
          : Promise.resolve({ data: { status: true, data: [] } }),
        UBilling.getBillingHistory(filterParams),
      ]);

      if (resPending.data?.status) {
        // Validasi Array: Mencegah TypeError jika API mengirim non-array
        const rawData = resPending.data.data;
        const dataArray = Array.isArray(rawData) ? rawData : [];

        const sorted = dataArray.sort(
          (a, b) =>
            new Date(a.due_date || a.createdAt) -
            new Date(b.due_date || b.createdAt)
        );
        setBills(sorted);
      } else {
        setBills([]);
      }

      if (resHistory.data?.status) {
        setHistory(
          Array.isArray(resHistory.data.data) ? resHistory.data.data : []
        );
      }
    } catch (err) {
      console.error("Gagal memuat data billing:", err);
      setBills([]);
      setHistory([]);
    } finally {
      setLoadingData(false);
    }
  }, [filterParams, isSukarela]);

  useEffect(() => {
    loadInitialData();
  }, [loadInitialData]);

  // SOCKET LISTENER
  useSocketListener((payload) => {
    if (
      payload.entityRef === "member_registration" ||
      payload.entityRef === "billing"
    ) {
      loadInitialData();
    }
  });

  // --- HANDLERS ---
  const handleSelectAll = () => {
    // Validasi Array sebelum akses length
    const safeBills = Array.isArray(bills) ? bills : [];
    if (selectedBills.length === safeBills.length) {
      setSelectedBills([]);
    } else {
      setSelectedBills(safeBills.map((b) => b.bill_item_id));
    }
  };

  const handleNavigateToInvoice = async () => {
    setIsSubmitting(true);
    try {
      if (isSukarela) {
        const cleanAmount = parseFloat(customAmount.replace(/\./g, ""));
        if (!cleanAmount || cleanAmount < 1000) {
          alert("Nominal setoran minimal Rp 1.000");
          setIsSubmitting(false);
          return;
        }

        const response = await UBilling.createVoluntaryBill({
          category: categoryName,
          amount: cleanAmount,
        });

        if (response.data?.status) {
          const itemIds = response.data.data.bill_item_ids;
          const token = jwtEncode({
            page: "invoicePage",
            billItemIds: Array.isArray(itemIds) ? itemIds : [itemIds],
            return: "billingPage",
          });
          navigate(`/${token}`);
        }
      } else {
        if (selectedBills.length === 0) return;
        const token = jwtEncode({
          page: "invoicePage",
          billItemIds: selectedBills,
          registrationId: registrationId,
          return: "billingPage",
        });
        navigate(`/${token}`);
      }
    } catch (err) {
      alert("Gagal memproses transaksi.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container-fluid py-3 bg-light min-vh-100">
      <div className="d-flex align-items-center mb-3 px-2">
        <FaArrowLeft
          onClick={() => navigate(-1)}
          className="me-3 text-secondary"
          style={{ cursor: "pointer" }}
        />
        <h5 className="mb-0 fw-bold">
          {isSukarela ? `Setoran ${displayName}` : `Tagihan ${displayName}`}
        </h5>
      </div>

      <Card className="border-0 shadow-sm rounded-3 mb-4 overflow-hidden">
        <Card.Header className="bg-primary text-white py-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold" style={{ fontSize: "14px" }}>
            {isSukarela ? "Input Nominal" : "Daftar Tagihan"}
          </span>
          {/* Pengecekan aman terhadap array */}
          {!isSukarela && Array.isArray(bills) && bills.length > 0 && (
            <Form.Check
              type="checkbox"
              label={<small className="fw-bold">Pilih Semua</small>}
              checked={selectedBills.length === bills.length}
              onChange={handleSelectAll}
            />
          )}
        </Card.Header>
        <Card.Body className={isSukarela ? "p-4" : "p-0"}>
          {loadingData ? (
            <div className="p-5 text-center">
              <Spinner animation="border" variant="primary" />
            </div>
          ) : isSukarela ? (
            <div>
              <Form.Group className="mb-3">
                <Form.Label className="small fw-bold text-secondary text-uppercase">
                  Jumlah Setoran
                </Form.Label>
                <InputGroup size="lg">
                  <InputGroup.Text className="bg-white border-end-0 fw-bold text-primary">
                    Rp
                  </InputGroup.Text>
                  <Form.Control
                    type="text"
                    inputMode="numeric"
                    placeholder="0"
                    className="border-start-0 fw-bold"
                    value={customAmount}
                    onChange={(e) =>
                      setCustomAmount(
                        formatRupiah(e.target.value.replace(/\./g, ""))
                      )
                    }
                  />
                </InputGroup>
              </Form.Group>
              <Button
                variant="primary"
                className="w-100 fw-bold py-3 rounded-3 shadow-sm"
                onClick={handleNavigateToInvoice}
                disabled={!customAmount || isSubmitting}
              >
                {isSubmitting ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Lanjutkan Ke Pembayaran"
                )}
              </Button>
            </div>
          ) : Array.isArray(bills) && bills.length > 0 ? (
            <>
              <div style={{ maxHeight: "350px", overflowY: "auto" }}>
                <ListGroup variant="flush">
                  {bills.map((bill) => (
                    <ListGroup.Item
                      key={bill.bill_item_id}
                      className="py-3 px-3 border-bottom border-light"
                    >
                      <div className="d-flex align-items-start">
                        <Form.Check
                          className="me-3 mt-1"
                          checked={selectedBills.includes(bill.bill_item_id)}
                          onChange={() => {
                            setSelectedBills((prev) =>
                              prev.includes(bill.bill_item_id)
                                ? prev.filter((id) => id !== bill.bill_item_id)
                                : [...prev, bill.bill_item_id]
                            );
                          }}
                        />
                        <div className="w-100">
                          <div className="fw-bold text-dark small">
                            {bill.description || bill.type?.type_name}
                          </div>
                          <div className="text-primary fw-bold">
                            Rp{" "}
                            {parseFloat(bill.amount || 0).toLocaleString(
                              "id-ID"
                            )}
                          </div>
                          {bill.due_date && (
                            <div
                              className="text-muted"
                              style={{ fontSize: "11px" }}
                            >
                              Jatuh tempo:{" "}
                              {new Date(bill.due_date).toLocaleDateString(
                                "id-ID",
                                { month: "short", year: "numeric" }
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
              <div className="p-3 bg-white border-top shadow-sm">
                <div className="d-flex justify-content-between mb-2">
                  <span className="small text-muted">
                    Total Terpilih ({selectedBills.length}):
                  </span>
                  <span className="fw-bold text-primary">
                    Rp {totalAmount.toLocaleString("id-ID")}
                  </span>
                </div>
                <Button
                  variant="primary"
                  className="w-100 fw-bold py-2 rounded-pill"
                  onClick={handleNavigateToInvoice}
                  disabled={selectedBills.length === 0 || isSubmitting}
                >
                  {isSubmitting ? (
                    <Spinner animation="border" size="sm" />
                  ) : (
                    "Bayar Sekarang"
                  )}
                </Button>
              </div>
            </>
          ) : (
            <div className="p-5 text-center text-muted small">
              <FaExclamationTriangle className="mb-2 opacity-50" size={24} />
              <p className="mb-0">Tidak ada tagihan tertunda.</p>
            </div>
          )}
        </Card.Body>
      </Card>

      <Card className="border-0 shadow-sm rounded-3 overflow-hidden">
        <Card.Header
          className="bg-dark text-white py-2 fw-bold"
          style={{ fontSize: "14px" }}
        >
          Histori Transaksi
        </Card.Header>
        <Card.Body className="p-0">
          {Array.isArray(history) && history.length > 0 ? (
            <div style={{ maxHeight: "300px", overflowY: "auto" }}>
              <ListGroup variant="flush">
                {history.map((item, idx) => (
                  <ListGroup.Item
                    key={idx}
                    className="p-3 border-bottom border-light"
                  >
                    <div className="d-flex align-items-center">
                      <div className="bg-light p-2 rounded me-3">
                        <FaCheckCircle className="text-success" size={18} />
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold text-dark small">
                          {item.description}
                        </div>
                        <div className="text-success fw-bold small">
                          Rp{" "}
                          {parseFloat(item.amount || 0).toLocaleString("id-ID")}
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "10px" }}
                        >
                          {item.createdAt &&
                            new Date(item.createdAt).toLocaleDateString(
                              "id-ID",
                              {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              }
                            )}
                        </div>
                      </div>
                      <Badge bg="success" className="fw-normal">
                        Lunas
                      </Badge>
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          ) : (
            <div className="p-4 text-center text-muted small">
              Belum ada transaksi.
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default BillingPage;
