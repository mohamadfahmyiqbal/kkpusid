import React from "react";
import { Row, Col, Form, Button, Spinner } from "react-bootstrap";
import { FaUpload } from "react-icons/fa";

export default function AgreementAndActions({
  akadAgreed,
  error,
  loading,
  onAkadChange,
  onBack,
}) {
  return (
    <>
      <Col md={12} className="mb-4 mt-5">
        <div className="bg-light p-4 rounded-4 border">
          <Form.Check
            type="checkbox"
            id="akad-agreement"
            checked={akadAgreed}
            onChange={onAkadChange}
            isInvalid={!!error}
            disabled={loading}
            label={
              <span className="fw-semibold text-dark ms-2">
                Saya menyatakan bahwa seluruh data yang diberikan adalah benar,
                serta menyetujui seluruh ketentuan dan akad pembiayaan syariah
                yang berlaku di Koperasi.
              </span>
            }
          />
          {error && (
            <div className="text-danger small mt-2 ms-4 fw-bold">{error}</div>
          )}
        </div>
      </Col>

      <div className="d-flex flex-column flex-md-row justify-content-between mt-5 pt-4 border-top">
        <Button
          variant="light"
          className="px-5 py-3 fw-bold text-muted mb-3 mb-md-0 rounded-pill shadow-sm transition-transform hover-scale"
          onClick={onBack}
          disabled={loading}
        >
          Batal
        </Button>
        <Button
          variant="primary"
          type="submit"
          className="px-5 py-3 fw-bold shadow-lg rounded-pill transition-transform hover-scale d-flex align-items-center justify-content-center"
          disabled={loading}
          style={{
            background:
              "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
            border: "none",
          }}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />
              Memproses Pengajuan...
            </>
          ) : (
            <>
              <FaUpload className="me-2 mb-1" />
              Kirim Pengajuan Pendanaan
            </>
          )}
        </Button>
      </div>
    </>
  );
}
