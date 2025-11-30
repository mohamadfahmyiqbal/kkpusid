// src/components/dashboard/TagihanSection.jsx

import React, { useCallback } from "react";
import { Card, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

// --- Data Mockup Tagihan ---
const mockBillingItems = [
  // Kunci navigasi diset ke 'InvoicePage' agar sesuai dengan nama file Anda
  {
    id: 1,
    label: "Simpanan Pokok",
    type: "Setoran",
    amount: 500000,
    pageKey: "InvoicePage",
  },
  {
    id: 2,
    label: "Simpanan Wajib",
    type: "Setoran",
    amount: 200000,
    pageKey: "InvoicePage",
  },
  {
    id: 3,
    label: "Hibah Koperasi",
    type: "Setoran",
    amount: 50000,
    pageKey: "InvoicePage",
  },
  {
    id: 4,
    label: "Angsuran Pinjaman",
    type: "Tagihan",
    amount: 1500000,
    pageKey: "InvoicePage",
  },
];

// Helper to format currency
const formatCurrency = (amount) => {
  return amount.toLocaleString("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  });
};

// Sub-component for a single billing card
const BillingCard = ({ item, handleNavigation }) => {
  return (
    <Col
      key={item.id}
      xs={6}
      className="flex-shrink-0 me-3"
      style={{ width: "45%" }}
    >
      <Card
        className="shadow-sm overflow-hidden"
        onClick={() => handleNavigation(item.pageKey)}
        style={{ cursor: "pointer" }}
      >
        {/* Header: Setoran + Simpanan Pokok (Dark Blue) */}
        <div className="p-2 text-white" style={{ backgroundColor: "#005a8d" }}>
          <small
            className="d-block mb-0 fw-light"
            style={{ fontSize: "0.8rem" }}
          >
            {item.type}
          </small>
          <strong className="d-block" style={{ fontSize: "1rem" }}>
            {item.label}
          </strong>
        </div>

        {/* Footer: Amount (Red) */}
        <div
          className="text-white p-2 text-center fw-bold"
          style={{ backgroundColor: "#dc3545", fontSize: "1.1rem" }}
        >
          {formatCurrency(item.amount)}.-
        </div>
      </Card>
    </Col>
  );
};

const TagihanSection = () => {
  const navigate = useNavigate();

  // PERBAIKAN: handleNavigation sekarang sudah mencakup returnKey secara internal
  const handleNavigation = useCallback(
    (pageKey) => {
      // Halaman kembali untuk Tagihan di Dashboard selalu 'dashboardPage'
      const RETURN_PAGE_KEY = "billingPage";

      if (pageKey) {
        const payload = {
          page: pageKey,
          return: RETURN_PAGE_KEY, // Menambahkan key kembali ke payload
        };
        const token = jwtEncode(payload);
        navigate(`/${token}`);
      } else {
        console.warn(`Page key untuk tagihan tidak ditemukan.`);
      }
    },
    [navigate]
  );

  return (
    <div className="mb-4">
      <h5 className="mb-3 mx-3">Tagihan</h5>

      {/* Wrapper Flex: Horizontal scroll container */}
      <div
        className="d-flex flex-nowrap overflow-x-auto text-center pb-2 ps-3"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {mockBillingItems.map((item) => (
          <BillingCard
            key={item.id}
            item={item}
            handleNavigation={handleNavigation}
          />
        ))}

        {/* Padding div at the end */}
        <div className="flex-shrink-0 pe-3" style={{ width: "0" }}></div>
      </div>
    </div>
  );
};

export default TagihanSection;
