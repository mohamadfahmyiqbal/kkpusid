import React from "react";
import { Badge } from "react-bootstrap";
import { FaArrowLeft, FaShieldAlt } from "react-icons/fa";

export default function Header({ onBackToDashboard }) {
  return (
    <div className="row pt-4 px-3 mb-4 align-items-center">
      <div className="col-auto">
        <button
          onClick={onBackToDashboard}
          className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: "45px", height: "45px" }}
        >
          <FaArrowLeft />
        </button>
      </div>
      <div className="col">
        <Badge
          bg="soft-primary"
          className="text-primary mb-1 rounded-pill px-3 py-2 border-0"
          style={{ backgroundColor: "rgba(13, 110, 253, 0.1)" }}
        >
          <FaShieldAlt className="me-2" /> Portal Keanggotaan Resmi
        </Badge>
        <h2 className="fw-bold text-dark mb-0">Pendaftaran Anggota</h2>
      </div>
    </div>
  );
}
