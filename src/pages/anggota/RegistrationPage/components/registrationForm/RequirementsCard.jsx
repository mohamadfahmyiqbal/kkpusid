import React from "react";
import { Card } from "react-bootstrap";
import { FaGavel, FaCheckCircle } from "react-icons/fa";

export default function RequirementsCard() {
  return (
    <Card className="border-0 shadow-sm rounded-20 bg-dark text-white h-100">
      <Card.Body className="p-4 p-md-5">
        <div className="d-flex align-items-center mb-4 text-warning">
          <FaGavel className="me-2 fs-4" />
          <h5 className="fw-bold mb-0">Ketentuan Pendaftaran</h5>
        </div>

        <p className="text-white-50 small mb-4">
          Berdasarkan{" "}
          <strong>
            Peraturan Menteri Koperasi dan UKM RI No. 10/2015
          </strong>
          , syarat utama meliputi:
        </p>

        <div className="requirement-items">
          {[
            "Warga Negara Indonesia (WNI)",
            "Melengkapi Dokumen Permohonan Anggota",
            "Melunasi kewajiban Anggota (AD/ART)",
          ].map((text, idx) => (
            <div key={idx} className="d-flex align-items-start mb-4">
              <FaCheckCircle
                className="text-success mt-1 me-3 flex-shrink-0"
                size={18}
              />
              <span className="text-white opacity-90 small">
                {text}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-5 p-3 rounded-3 border border-secondary border-dashed text-center">
          <small className="text-white-50">
            Layanan <strong>Inclusive Loop</strong> UU No 4/2023.
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
