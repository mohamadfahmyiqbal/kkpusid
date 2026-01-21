import React, { useCallback } from "react";
import { Card, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { useProfile } from "../../contexts/ProfileContext";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

const BillingCard = ({ item, handleNavigation }) => {
  return (
    <Col xs={6} className="flex-shrink-0 me-3" style={{ width: "45%" }}>
      <Card
        className="shadow-sm border-0 overflow-hidden"
        onClick={() => handleNavigation(item.bill_id)}
        style={{ cursor: "pointer" }}
      >
        <div className="p-2 text-white" style={{ backgroundColor: "#005a8d" }}>
          <small
            className="d-block mb-0 fw-light"
            style={{ fontSize: "0.75rem" }}
          >
            {item.tx_type || "TAGIHAN"}
          </small>
          <strong
            className="d-block text-truncate"
            style={{ fontSize: "0.85rem" }}
          >
            {item.description || "Pembayaran"}
          </strong>
        </div>
        <div
          className="text-white p-2 text-center fw-bold"
          style={{ backgroundColor: "#dc3545", fontSize: "1rem" }}
        >
          {formatCurrency(item.amount)}
        </div>
      </Card>
    </Col>
  );
};

const TagihanSection = () => {
  const navigate = useNavigate();
  const { bills, loading } = useProfile();

  const handleNavigation = useCallback(
    (billId) => {
      const token = jwtEncode({
        page: "invoicePage",
        billId: billId,
        return: "dashboard",
      });
      navigate(`/${token}`);
    },
    [navigate]
  );

  if (loading) {
    return (
      <div className="p-3 text-center">
        <Spinner animation="border" size="sm" variant="primary" />
      </div>
    );
  }

  return (
    <div className="mb-4">
      <h5 className="mb-3 mx-3 fw-bold">Tagihan Perlu Dibayar</h5>

      {bills && bills.length > 0 ? (
        <div
          className="d-flex flex-nowrap overflow-x-auto pb-2 ps-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {bills.map((item, index) => (
            <BillingCard
              key={item.bill_id ?? `bill-${index}`}
              item={item}
              handleNavigation={handleNavigation}
            />
          ))}
          <div className="flex-shrink-0 pe-3" style={{ width: "0" }}></div>
        </div>
      ) : (
        <div className="mx-3">
          <Card className="border-0 shadow-sm bg-light">
            <Card.Body className="text-center py-4">
              <p className="text-muted mb-0 small">
                Anda belum memiliki tagihan saat ini.
              </p>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
};

export default TagihanSection;
