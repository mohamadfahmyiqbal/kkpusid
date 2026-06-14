// 📁 src/pages/global/BillingPage/components/BillList.jsx
import React, { useCallback, useMemo, useState } from "react";
import { Card, ListGroup, Form, Button, Spinner, Pagination } from "react-bootstrap";
import { FaExclamationTriangle, FaCheckCircle } from "react-icons/fa";

const BillList = ({
  bills,
  selectedBills = [],
  setSelectedBills,
  totalAmount,
  handleNavigateToInvoice,
  isSubmitting,
  loadingData,
  disabledBills = [],
}) => {
  const safeBills = useMemo(
    () => (Array.isArray(bills) ? bills : []),
    [bills],
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(safeBills.length / itemsPerPage);

  const currentBills = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return safeBills.slice(startIndex, startIndex + itemsPerPage);
  }, [safeBills, currentPage]);

  const allSelected = safeBills.length > 0 && selectedBills.length === safeBills.length;

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleToggleBill = useCallback(
    (billId) => {
      if (disabledBills.includes(billId)) return;
      setSelectedBills((prev) =>
        prev.includes(billId)
          ? prev.filter((id) => id !== billId)
          : [...prev, billId],
      );
    },
    [disabledBills, setSelectedBills],
  );

  const handleSelectAll = useCallback(() => {
    if (allSelected) {
      setSelectedBills([]);
    } else {
      setSelectedBills(safeBills.map((b) => b.bill_item_id));
    }
  }, [allSelected, safeBills, setSelectedBills]);

  if (loadingData) {
    return (
      <>
        <Card.Header className="bg-primary text-white py-3 px-4 d-flex align-items-center">
          <span className="fw-bold" style={{ fontSize: "15px" }}>
            Daftar Tagihan
          </span>
        </Card.Header>
        <Card.Body className="p-5 text-center">
          <Spinner animation="border" variant="primary" />
          <p className="text-muted mt-3 small">Memuat tagihan...</p>
        </Card.Body>
      </>
    );
  }

  return (
    <>
      <Card.Header className="bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center">
        <span className="fw-bold" style={{ fontSize: "15px" }}>
          Daftar Tagihan
        </span>
        {safeBills.length > 0 && (
          <Form.Check
            type="checkbox"
            id="select-all-bills"
            label={<span className="fw-bold small text-white">Pilih Semua</span>}
            checked={allSelected}
            onChange={handleSelectAll}
            className="mb-0"
          />
        )}
      </Card.Header>
      <Card.Body className="p-0">
        {safeBills.length > 0 ? (
          <>
            <div className="bp-bill-scroll" style={{ maxHeight: "350px", overflowY: "auto" }}>
              <ListGroup variant="flush">
                {currentBills.map((bill) => {
                  const isDisabled = disabledBills.includes(bill.bill_item_id);
                  const isChecked = selectedBills.includes(bill.bill_item_id);
                  return (
                    <ListGroup.Item
                      key={bill.bill_item_id}
                      className={`py-3 px-4 border-bottom border-light bp-bill-item ${isChecked ? "bp-bill-selected" : ""}`}
                      action={!isDisabled}
                      onClick={() => handleToggleBill(bill.bill_item_id)}
                      disabled={isDisabled}
                    >
                      <div className="d-flex align-items-center gap-3">
                        <Form.Check
                          type="checkbox"
                          id={`bill-${bill.bill_item_id}`}
                          checked={isChecked}
                          disabled={isDisabled}
                          onChange={() => handleToggleBill(bill.bill_item_id)}
                          className="mb-0"
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div className="flex-grow-1 min-w-0">
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
                        {isChecked && (
                          <FaCheckCircle className="text-success flex-shrink-0" size={16} />
                        )}
                      </div>
                    </ListGroup.Item>
                  );
                })}
              </ListGroup>
            </div>

            {totalPages > 1 && (
              <div className="d-flex justify-content-center mt-3 mb-2">
                <Pagination size="sm" className="mb-0">
                  <Pagination.Prev
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                  />
                  {[...Array(totalPages)].map((_, idx) => (
                    <Pagination.Item
                      key={idx + 1}
                      active={idx + 1 === currentPage}
                      onClick={() => handlePageChange(idx + 1)}
                    >
                      {idx + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                  />
                </Pagination>
              </div>
            )}

            {/* Footer Total + Bayar */}
            <div className="p-4 bg-white border-top shadow-sm">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted fw-semibold" style={{ fontSize: "13px" }}>
                  Total Terpilih ({selectedBills.length}):
                </span>
                <span className="fw-bold text-primary" style={{ fontSize: "18px" }}>
                  Rp {(totalAmount || 0).toLocaleString("id-ID")}
                </span>
              </div>
              <Button
                variant="primary"
                className="w-100 fw-bold py-2 rounded-12 shadow-sm"
                onClick={handleNavigateToInvoice}
                disabled={selectedBills.length === 0 || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Memproses...
                  </>
                ) : (
                  "Bayar Sekarang"
                )}
              </Button>
            </div>
          </>
        ) : (
          <div className="p-5 text-center text-muted">
            <FaExclamationTriangle className="mb-2 opacity-50" size={28} />
            <p className="mb-0 small">Tidak ada tagihan tertunda.</p>
          </div>
        )}
      </Card.Body>
    </>
  );
};

export default React.memo(BillList);