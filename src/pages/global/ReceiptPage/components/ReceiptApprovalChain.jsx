import React from "react";
import { Row, Col } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";

export default function ReceiptApprovalChain({ approvalFlags }) {
  const steps = [
    { role: "Pengawas", done: approvalFlags.is_approved_pengawas },
    { role: "Ketua", done: approvalFlags.is_approved_ketua },
    { role: "Bendahara", done: approvalFlags.is_approved_bendahara },
  ];

  return (
    <>
      <h6 className="text-uppercase text-muted fw-bold ls-1 mb-3">
        Status Persetujuan
      </h6>
      <Row className="mb-5 gy-3">
        {steps.map((step, idx) => (
          <Col xs={4} key={idx}>
            <div
              className={`p-3 rounded-4 text-center h-100 d-flex flex-column justify-content-center align-items-center ${
                step.done
                  ? "bg-success bg-opacity-10 border border-success border-opacity-25"
                  : "bg-light border"
              }`}
            >
              <div className={`mb-2 ${step.done ? "text-success" : "text-muted"}`}>
                {step.done ? (
                  <FaCheckCircle size={24} />
                ) : (
                  <div className="spinner-grow spinner-grow-sm" role="status">
                    <span className="visually-hidden">Loading...</span>
                  </div>
                )}
              </div>
              <small className="d-block fw-bold text-dark mb-1">{step.role}</small>
              <small className={`fw-medium ${step.done ? "text-success" : "text-muted"}`}>
                {step.done ? "Disetujui" : "Menunggu"}
              </small>
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}
