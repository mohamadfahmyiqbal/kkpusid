// components/transaksi/QuickActionButtons.jsx

import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FaMoneyBillWave, FaPlusCircle } from "react-icons/fa";

/**
 * Komponen untuk menampilkan tombol aksi Setoran dan Pencairan.
 */
export default function QuickActionButtons({ handleSetoran, handlePencairan }) {
  return (
    <Row className="mb-4 g-3">
      <Col md={6}>
        <Button
          variant="success"
          className="w-100 fw-bold py-3"
          onClick={handleSetoran}
        >
          <FaMoneyBillWave className="me-2" /> Setor/Bayar Tagihan
        </Button>
      </Col>
      <Col md={6}>
        <Button
          variant="primary"
          className="w-100 fw-bold py-3"
          onClick={handlePencairan}
        >
          <FaPlusCircle className="me-2" /> Ajukan Pencairan
        </Button>
      </Col>
    </Row>
  );
}
