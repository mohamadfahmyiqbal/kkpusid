import React from "react";
import { Row, Col, Form } from "react-bootstrap";

export default function DocumentUploadSection({
  errors,
  loading,
  onFileChange,
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
            3
          </div>
          <h4 className="fw-bold mb-0 text-dark">
            Dokumen Legalitas & Pendukung
          </h4>
        </div>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label
          className="fw-semibold text-dark"
          htmlFor="bukti-kepemilikan"
        >
          Bukti Kepemilikan Usaha (NIB/SIUP/SKDU){" "}
          <span className="text-danger">*</span>
        </Form.Label>
        <Form.Control
          id="bukti-kepemilikan"
          type="file"
          onChange={(e) => onFileChange("buktiKepemilikan", e)}
          className="p-3 bg-light border-0"
          isInvalid={!!errors.buktiKepemilikan}
          disabled={loading}
        />
        <Form.Control.Feedback type="invalid">
          {errors.buktiKepemilikan}
        </Form.Control.Feedback>
        <Form.Text className="text-muted d-block mt-2">
          Format: PDF, JPG, PNG (Maks 5MB)
        </Form.Text>
      </Col>

      <Col md={6} className="mb-4">
        <Form.Label
          className="fw-semibold text-dark"
          htmlFor="bukti-kerjasama"
        >
          Bukti Kerjasama / Kontrak (Opsional)
        </Form.Label>
        <Form.Control
          id="bukti-kerjasama"
          type="file"
          className="p-3 bg-light border-0"
          onChange={(e) => onFileChange("buktiKerjasama", e)}
          disabled={loading}
        />
        <Form.Text className="text-muted d-block mt-2">
          Format: PDF, JPG, PNG (Maks 5MB)
        </Form.Text>
      </Col>

      <Col md={12} className="mb-4">
        <Form.Label
          className="fw-semibold text-dark"
          htmlFor="file-pendukung"
        >
          Dokumen Pendukung Tambahan (Opsional)
        </Form.Label>
        <Form.Control
          id="file-pendukung"
          type="file"
          className="p-3 bg-light border-0"
          onChange={(e) => onFileChange("filePendukung", e)}
          disabled={loading}
        />
        <Form.Text className="text-muted d-block mt-2">
          Seperti proposal bisnis atau rekap laporan keuangan.
        </Form.Text>
      </Col>
    </>
  );
}
