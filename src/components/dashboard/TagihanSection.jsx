import React, { useCallback, useEffect, useState } from "react";
import { Card, Col, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import UBilling from "../../utils/api/UBilling";

// Helper untuk format mata uang
const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

// Sub-komponen untuk kartu tagihan satuan
const BillingCard = ({ item, handleNavigation }) => {
  return (
    <Col xs={6} className="flex-shrink-0 me-3" style={{ width: "45%" }}>
      <Card
        className="shadow-sm overflow-hidden"
        onClick={() => handleNavigation(item.bill_id)}
        style={{ cursor: "pointer" }}
      >
        <div className="p-2 text-white" style={{ backgroundColor: "#005a8d" }}>
          <small
            className="d-block mb-0 fw-light"
            style={{ fontSize: "0.75rem" }}
          >
            {item.billType?.tx_type || "TAGIHAN"}
          </small>
          <strong
            className="d-block text-truncate"
            style={{ fontSize: "0.85rem" }}
          >
            {item.billType?.type_name || "Pembayaran"}
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
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBills = useCallback(async () => {
    try {
      setLoading(true);
      const response = await UBilling.getPendingBills();

      if (response.data && response.data.status) {
        setBills(response.data.data);
      }
    } catch (err) {
      console.error("Fetch Bills Error:", err);
      setError("Gagal memuat daftar tagihan.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBills();
  }, [fetchBills]);

  const handleNavigation = useCallback(
    (billId) => {
      const payload = {
        page: "invoicePage",
        billId: billId,
        return: "dashboard",
      };
      const token = jwtEncode(payload);
      navigate(`/${token}`);
    },
    [navigate]
  );

  if (loading)
    return (
      <div className="p-3 text-center">
        <Spinner size="sm" />
      </div>
    );

  if (error)
    return (
      <div className="mx-3">
        <Alert variant="danger" className="py-2 small">
          {error}
        </Alert>
      </div>
    );

  return (
    <div className="mb-4">
      <h5 className="mb-3 mx-3">Tagihan Perlu Dibayar</h5>

      {/* MODIFIKASI DISINI: Cek jika ada tagihan atau tidak */}
      {bills.length > 0 ? (
        <div
          className="d-flex flex-nowrap overflow-x-auto text-center pb-2 ps-3"
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
        /* Tampilan saat tagihan kosong */
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
