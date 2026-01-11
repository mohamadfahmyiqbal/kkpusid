// src/pages/transaction/components/FinancingDetailsSection.jsx
import React from "react";
import { Row, Col, Badge } from "react-bootstrap";

const FinancingDetailsSection = ({ detail }) => (
  <>
    <div className="mb-4 bg-light p-3 rounded-3 border">
      <h6 className="fw-bold border-bottom pb-2 mb-3">Summary Detail</h6>
      <Row>
        <Col xs={6}>
          <p className="text-muted small mb-1">Nominal</p>
          <p className="fw-bold text-primary">
            Rp{(Number(detail?.amount_requested) || 0).toLocaleString("id-ID")}
          </p>
        </Col>
        <Col xs={6}>
          <p className="text-muted small mb-1">Estimasi Angsuran</p>
          <p className="fw-bold text-dark">
            Rp
            {(Number(detail?.monthly_installment) || 0).toLocaleString("id-ID")}
          </p>
        </Col>
      </Row>
    </div>
    <div className="mb-4">
      <h6 className="fw-bold border-bottom pb-2 mb-3">
        Akad dan Syarat & Ketentuan
      </h6>
      <div className="d-flex align-items-center mb-2">
        <Badge bg="success" className="me-2">
          ✓
        </Badge>
        <span className="small">Akad ({detail?.akad_type || "Murabahah"})</span>
      </div>
      <div className="d-flex align-items-center">
        <Badge bg="success" className="me-2">
          ✓
        </Badge>
        <span className="small">Syarat & Ketentuan</span>
      </div>
    </div>
  </>
);

export default React.memo(FinancingDetailsSection);
