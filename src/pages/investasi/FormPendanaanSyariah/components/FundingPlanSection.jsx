import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { formatCurrency } from "./formHelpers";

export default function FundingPlanSection({
  formData,
  errors,
  loading,
  onChange,
  onCurrencyChange,
}) {
  return (
    <>
      <Col md={12} className="mb-4 mt-5">
        <hr className="my-5 opacity-10" />
        <div className="d-flex align-items-center mb-4">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm"
            style={{ width: "36px", height: "36px" }}
          >
            2
          </div>
          <h4 className="fw-bold mb-0 text-dark">Rencana Pendanaan</h4>
        </div>
      </Col>

      <Col md={12} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="tujuan">
          Tujuan Penggunaan Dana
        </Form.Label>
        <Form.Control
          id="tujuan"
          as="textarea"
          rows={3}
          name="tujuanPendanaan"
          value={formData.tujuanPendanaan}
          onChange={onChange}
          placeholder="Contoh: Penambahan modal kerja untuk membeli stok bahan baku menjelang Idul Fitri"
          className="p-3 bg-light border-0"
          isInvalid={!!errors.tujuanPendanaan}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.tujuanPendanaan}
        </Form.Control.Feedback>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="target">
          Target Dana yang Dibutuhkan
        </Form.Label>
        <Form.Control
          id="target"
          type="text"
          value={
            formData.targetDana
              ? `Rp ${formatCurrency(formData.targetDana)}`
              : ""
          }
          onChange={(e) => onCurrencyChange("targetDana", e)}
          placeholder="Min. Rp 5.000.000"
          className="p-3 bg-light border-0 fw-bold text-primary"
          isInvalid={!!errors.targetDana}
          disabled={loading}
          inputMode="numeric"
        />
        <Form.Control.Feedback type="invalid">
          {errors.targetDana}
        </Form.Control.Feedback>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="periode">
          Periode Pengembalian Modal
        </Form.Label>
        <Form.Select
          id="periode"
          name="periodeModal"
          value={formData.periodeModal}
          onChange={onChange}
          className="p-3 bg-light border-0"
          disabled={loading}
        >
          {[6, 12, 18, 24, 36].map((periode) => (
            <option key={periode} value={periode}>
              {periode} Bulan
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="omset-kerjasama">
          Estimasi Omset Selama Periode Pendanaan (Bulanan)
        </Form.Label>
        <Form.Control
          id="omset-kerjasama"
          type="text"
          value={
            formData.omsetKerjasama
              ? `Rp ${formatCurrency(formData.omsetKerjasama)}`
              : ""
          }
          onChange={(e) => onCurrencyChange("omsetKerjasama", e)}
          placeholder="Cth: Rp 5.000.000"
          className="p-3 bg-light border-0"
          disabled={loading}
          inputMode="numeric"
        />
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="bagi-hasil">
          Tawaran Bagi Hasil Investor (%)
        </Form.Label>
        <Form.Control
          id="bagi-hasil"
          type="number"
          name="bagiHasil"
          value={formData.bagiHasil}
          onChange={onChange}
          placeholder="Contoh: 15"
          className="p-3 bg-light border-0 fw-bold text-success"
          isInvalid={!!errors.bagiHasil}
          disabled={loading}
          min="1"
          max="50"
        />
        <Form.Control.Feedback type="invalid">
          {errors.bagiHasil}
        </Form.Control.Feedback>
      </Col>
    </>
  );
}
