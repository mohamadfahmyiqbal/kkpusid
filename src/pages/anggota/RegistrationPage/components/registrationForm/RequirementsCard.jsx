import React from "react";
import { Card } from "react-bootstrap";
import { FaGavel, FaCheckCircle } from "react-icons/fa";

export default function RequirementsCard() {
  const requirements = [
    {
      title: "Warga Negara Indonesia",
      desc: "Memiliki KTP asli Republik Indonesia yang sah dan aktif."
    },
    {
      title: "Dokumen Persyaratan",
      desc: "Menyiapkan KTP asli dan Swafoto yang jelas untuk keperluan verifikasi."
    },
    {
      title: "Kewajiban Keanggotaan",
      desc: "Sanggup melunasi simpanan pokok dan wajib koperasi sesuai ketentuan AD/ART."
    }
  ];

  return (
    <Card className="border-0 rp-card-requirements h-100">
      <Card.Body className="p-4 p-md-5 d-flex flex-column justify-content-between">
        <div>
          <div className="d-flex align-items-center mb-4">
            <div className="rp-req-header-icon me-3">
              <FaGavel />
            </div>
            <div>
              <h5 className="fw-bold mb-0 text-white" style={{ fontSize: "16px" }}>Ketentuan Anggota</h5>
              <small className="text-white-50">Permenkop UKM No. 10/2015</small>
            </div>
          </div>

          <div className="rp-requirement-list mb-4">
            {requirements.map((req, idx) => (
              <div key={idx} className="rp-requirement-item">
                <FaCheckCircle className="rp-req-icon" />
                <div className="rp-req-text">
                  <strong>{req.title}</strong>
                  <span>{req.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 rounded-3 text-center" style={{ backgroundColor: "rgba(255, 255, 255, 0.05)", border: "1px dashed rgba(255, 255, 255, 0.15)" }}>
          <small className="text-white-50" style={{ fontSize: "11px" }}>
            Sistem Layanan <strong>Inclusive Loop</strong> sesuai UU No 4 Tahun 2023.
          </small>
        </div>
      </Card.Body>
    </Card>
  );
}
