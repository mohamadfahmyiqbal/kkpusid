// 📁 src/pages/global/BillingPage/components/BillList.jsx
import React from "react";
import { Card, ListGroup, Form, Button, Spinner } from "react-bootstrap";
import { FaExclamationTriangle } from "react-icons/fa";

const BillList = ({
  bills,
  selectedBills,
  setSelectedBills,
  totalAmount,
  handleNavigateToInvoice,
  isSubmitting,
  loadingData,
  disabledBills = [],
}) => {
  const handleSelectAll = () => {
    // Validasi Array sebelum akses length
    const safeBills = Array.isArray(bills) ? bills : [];
    if (selectedBills.length === safeBills.length) {
      setSelectedBills([]);
    } else {
      setSelectedBills(safeBills.map((b) => b.bill_item_id));
    }
  };

  if (loadingData) {
    return (
      <>
        <Card.Header className="bg-primary text-white py-2 d-flex justify-content-between align-items-center">
          <span className="fw-bold" style={{ fontSize: "14px" }}>
            Daftar Tagihan
          </span>
        </Card.Header>
        <Card.Body>
          <div className="p-5 text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        </Card.Body>
      </>
    );
  }

  return (
    <>
      <Card.Header className="bg-primary text-white py-2 d-flex justify-content-between align-items-center">
        <span className="fw-bold" style={{ fontSize: "14px" }}>
          Daftar Tagihan
        </span>
        {/* Pengecekan aman terhadap array */}
        {Array.isArray(bills) && bills.length > 0 && (
          <Form.Check
            type="checkbox"
            label={<small className="fw-bold">Pilih Semua</small>}
            checked={selectedBills.length === bills.length}
            onChange={handleSelectAll}
          />
        )}
      </Card.Header>
      <Card.Body className="p-0">
        {Array.isArray(bills) && bills.length > 0 ? (
          <>
            <div style={{ maxHeight: "350px", overflowY: "auto" }}>
              <ListGroup variant="flush">
                {bills.map((bill) => (
                  <ListGroup.Item
                    key={bill.bill_item_id}
                    className="py-3 px-3 border-bottom border-light"
                  >
                    <Form.Check
                      className="d-flex align-items-start"
                      checked={selectedBills.includes(bill.bill_item_id)}
                      disabled={disabledBills.includes(bill.bill_item_id)}
                      onChange={() => {
                        setSelectedBills((prev) =>
                          prev.includes(bill.bill_item_id)
                            ? prev.filter((id) => id !== bill.bill_item_id)
                            : [...prev, bill.bill_item_id],
                        );
                      }}
                      label={
                        <div
                          className="ms-3 w-100"
                          onClick={() => {
                            if (!disabledBills.includes(bill.bill_item_id)) {
                              setSelectedBills((prev) =>
                                prev.includes(bill.bill_item_id)
                                  ? prev.filter(
                                      (id) => id !== bill.bill_item_id,
                                    )
                                  : [...prev, bill.bill_item_id],
                              );
                            }
                          }}
                          style={{
                            cursor: disabledBills.includes(bill.bill_item_id)
                              ? "not-allowed"
                              : "pointer",
                          }}
                        >
                          <div className="fw-bold text-dark small">
                            {bill.description || bill.type?.type_name}
                          </div>
                          <div className="text-primary fw-bold">
                            Rp{" "}
                            {parseFloat(bill.amount || 0).toLocaleString(
                              "id-ID",
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
                                { month: "short", year: "numeric" },
                              )}
                            </div>
                          )}
                        </div>
                      }
                    />
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
    </>
  );
};

export default BillList;
