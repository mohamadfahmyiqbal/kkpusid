// src/components/layout/KeranjangDropdown.jsx

import React from "react";
import { NavDropdown, Badge } from "react-bootstrap";
import {
  FaShoppingCart,
  FaWallet,
  FaCheckCircle,
  FaChevronRight,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../contexts/ProfileContext";
import { jwtEncode } from "../../routes/helpers";

export default function KeranjangDropdown() {
  const { bills } = useProfile();
  const navigate = useNavigate();

  // Helper untuk memastikan kita selalu bekerja dengan Array
  const safeBills = Array.isArray(bills) ? bills : [];

  const formatIDR = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(val || 0);

  const handleNavigate = () => {
    const token = jwtEncode({ page: "billingPage" });
    navigate(`/${token}`);
  };

  return (
    <NavDropdown
      align="end"
      title={
        <div className="position-relative text-white">
          <FaShoppingCart size={18} />
          {safeBills.length > 0 && (
            <Badge
              bg="danger"
              pill
              className="position-absolute top-0 start-100 translate-middle"
              style={{ fontSize: "0.6rem" }}
            >
              {safeBills.length}
            </Badge>
          )}
        </div>
      }
    >
      <div style={{ width: "300px" }}>
        <div className="p-3 bg-light border-bottom fw-bold text-dark">
          <FaWallet className="me-2" /> Tagihan Pending
        </div>
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          {safeBills.length === 0 ? (
            <div className="p-4 text-center">
              <FaCheckCircle className="text-success mb-2" size={24} />
              <p className="text-muted small mb-0">Semua tagihan lunas!</p>
            </div>
          ) : (
            safeBills.map((item) => (
              <div
                key={item.bill_item_id || item.id}
                className="p-3 border-bottom d-flex justify-content-between"
                style={{ cursor: "pointer" }}
                onClick={handleNavigate}
              >
                <div style={{ maxWidth: "70%" }}>
                  <div className="fw-bold small text-dark text-truncate">
                    {item.description}
                  </div>
                  <small className="text-danger" style={{ fontSize: "10px" }}>
                    {item.due_date
                      ? new Date(item.due_date).toLocaleDateString("id-ID")
                      : "-"}
                  </small>
                </div>
                <div className="fw-bold text-primary small">
                  {formatIDR(item.amount)}
                </div>
              </div>
            ))
          )}
        </div>
        {safeBills.length > 0 && (
          <div className="p-2 border-top text-center">
            <button
              className="btn btn-link btn-sm text-decoration-none fw-bold"
              onClick={handleNavigate}
            >
              Lihat Semua <FaChevronRight size={10} />
            </button>
          </div>
        )}
      </div>
    </NavDropdown>
  );
}
