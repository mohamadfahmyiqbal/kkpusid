import React from "react";
import { Row, Col, Form } from "react-bootstrap";
import { SECTOR_OPTIONS, formatCurrency } from "./formHelpers";

export default function BusinessInfoSection({
  formData,
  errors,
  loading,
  firstInputRef,
  onChange,
  onCurrencyChange,
}) {
  return (
    <>
      <Col md={12} className="mb-4">
        <div className="d-flex align-items-center mb-4">
          <div
            className="bg-primary text-white rounded-circle d-flex align-items-center justify-content-center fw-bold me-3 shadow-sm"
            style={{ width: "36px", height: "36px" }}
          >
            1
          </div>
          <h4 className="fw-bold mb-0 text-dark">Informasi Usaha</h4>
        </div>
      </Col>

      <Col md={12} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="nama-usaha">
          Nama Usaha
        </Form.Label>
        <Form.Control
          id="nama-usaha"
          ref={firstInputRef}
          name="namaUsaha"
          value={formData.namaUsaha}
          onChange={onChange}
          placeholder="Contoh: Kedai Kopi Nusantara"
          className="p-3 bg-light border-0"
          isInvalid={!!errors.namaUsaha}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.namaUsaha}
        </Form.Control.Feedback>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="pemilik">
          Nama Pemilik Usaha
        </Form.Label>
        <Form.Control
          id="pemilik"
          name="pemilikUsaha"
          value={formData.pemilikUsaha}
          onChange={onChange}
          placeholder="Sesuai KTP"
          className="p-3 bg-light border-0"
          isInvalid={!!errors.pemilikUsaha}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.pemilikUsaha}
        </Form.Control.Feedback>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="sektor">
          Sektor Bisnis Utama
        </Form.Label>
        <Form.Select
          id="sektor"
          name="sektor"
          value={formData.sektor}
          onChange={onChange}
          className="p-3 bg-light border-0"
          disabled={loading}
        >
          <option value="">-- Pilih sektor industri --</option>
          {SECTOR_OPTIONS.map((sector) => (
            <option key={sector} value={sector}>
              {sector}
            </option>
          ))}
        </Form.Select>
      </Col>

      <Col md={12} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="alamat">
          Alamat Lengkap Tempat Usaha
        </Form.Label>
        <Form.Control
          id="alamat"
          as="textarea"
          rows={3}
          name="alamat"
          value={formData.alamat}
          onChange={onChange}
          placeholder="Jalan, RT/RW, Kelurahan, Kecamatan, Kota/Kabupaten"
          className="p-3 bg-light border-0"
          isInvalid={!!errors.alamat}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.alamat}
        </Form.Control.Feedback>
      </Col>

      <Col md={12} className="mb-4">
        <Form.Label className="fw-semibold text-dark" htmlFor="omset">
          Estimasi Omset Tahunan Saat Ini
        </Form.Label>
        <Form.Control
          id="omset"
          type="text"
          value={
            formData.omsetTahunan
              ? `Rp ${formatCurrency(formData.omsetTahunan)}`
              : ""
          }
          onChange={(e) => onCurrencyChange("omsetTahunan", e)}
          placeholder="Min. Rp 10.000.000"
          className="p-3 bg-light border-0 fw-bold text-success"
          isInvalid={!!errors.omsetTahunan}
          disabled={loading}
          inputMode="numeric"
        />
        <Form.Control.Feedback type="invalid">
          {errors.omsetTahunan}
        </Form.Control.Feedback>
      </Col>
    </>
  );
}
