import React from "react";
import { Card, ProgressBar } from "react-bootstrap";

export default function FormProgressBar({ progress }) {
  return (
    <Card
      className="shadow-sm border-0 mb-4 rounded-4"
      style={{ position: "sticky", top: "80px", zIndex: 10 }}
    >
      <Card.Body className="px-4 py-3">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span
            className="text-muted fw-bold small text-uppercase"
            style={{ letterSpacing: "0.5px" }}
          >
            Kelengkapan Formulir
          </span>
          <span
            className={`fw-bold px-3 py-1 rounded-pill small ${
              progress === 100
                ? "bg-success text-white"
                : "bg-primary bg-opacity-10 text-primary"
            }`}
          >
            {progress}%
          </span>
        </div>
        <ProgressBar
          now={progress}
          variant={progress === 100 ? "success" : "primary"}
          style={{ height: "8px", borderRadius: "10px" }}
          className="bg-light shadow-sm"
        />
      </Card.Body>
    </Card>
  );
}
