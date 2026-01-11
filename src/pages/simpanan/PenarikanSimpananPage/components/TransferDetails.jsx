// src/pages/simpanan/PenarikanSimpananPage/components/TransferDetails.jsx
import React from "react";
import { Form, Row, Col } from "react-bootstrap";

const TransferDetails = ({ bankInfo }) => {
  if (!bankInfo || !bankInfo.bank_account_no) {
    return (
      <div className="alert alert-warning small py-2">
        Data rekening bank belum diatur. Silahkan hubungi admin.
      </div>
    );
  }

  return (
    <div className="bg-light p-3 rounded-3 mb-3 border">
      <Form.Group className="mb-2">
        <Form.Label className="text-muted mb-0" style={{ fontSize: "10px" }}>
          NOMOR REKENING
        </Form.Label>
        <div className="fw-bold">{bankInfo.bank_account_no}</div>
      </Form.Group>

      <Row>
        <Col xs={6}>
          <Form.Group>
            <Form.Label
              className="text-muted mb-0"
              style={{ fontSize: "10px" }}
            >
              BANK
            </Form.Label>
            <div className="fw-bold">{bankInfo.bank_name || bankInfo.bank}</div>
          </Form.Group>
        </Col>
        <Col xs={6}>
          <Form.Group>
            <Form.Label
              className="text-muted mb-0"
              style={{ fontSize: "10px" }}
            >
              NAMA NASABAH
            </Form.Label>
            <div className="fw-bold text-truncate">
              {bankInfo.account_holder || bankInfo.account_name}
            </div>
          </Form.Group>
        </Col>
      </Row>
    </div>
  );
};

export default React.memo(TransferDetails);
