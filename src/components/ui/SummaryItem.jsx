// src/components/ui/SummaryItem.jsx

import React from "react";
import { Button } from "react-bootstrap";
import { FaEdit } from "react-icons/fa";

export default function SummaryItem({ label, value, onEdit, stepIndex }) {
  return (
    <div className="d-flex justify-content-between align-items-start border-bottom py-2">
      <div>
        <small className="text-muted">{label}</small>
        <p className="mb-0 fw-bold">{value}</p>
      </div>
      <Button
        variant="outline-primary"
        size="sm"
        onClick={() => onEdit(stepIndex)}
      >
        <FaEdit />
      </Button>
    </div>
  );
}
