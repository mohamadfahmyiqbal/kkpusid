import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaInfoCircle, FaFileSignature } from "react-icons/fa";

export default function InstructionsCard({ onFillForm }) {
  const steps = [
    {
      no: 1,
      title: "Isi Formulir Anggota",
      desc: "Masukkan data pribadi, data pekerjaan/usaha, kontak darurat, dan data rekening bank Anda secara lengkap."
    },
    {
      no: 2,
      title: "Unggah Foto Identitas",
      desc: "Siapkan dan unggah foto KTP asli dan foto swafoto (selfie) memegang KTP dengan pencahayaan yang terang."
    },
    {
      no: 3,
      title: "Kirim & Verifikasi",
      desc: "Periksa ringkasan data, kirim berkas, lalu pantau verifikasi oleh Pengawas dan persetujuan oleh Ketua Koperasi."
    }
  ];

  return (
    <Card className="border-0 rp-card-instructions h-100">
      <div className="p-4 p-md-5">
        <div className="d-flex align-items-center mb-4">
          <div className="rp-icon-box me-3">
            <FaInfoCircle />
          </div>
          <div>
            <h5 className="fw-bold mb-0 text-dark" style={{ fontSize: "16px" }}>Instruksi Pendaftaran</h5>
            <small className="text-muted">Proses pengisian berkas keanggotaan online</small>
          </div>
        </div>

        <p className="text-secondary mb-4" style={{ fontSize: "13px", lineHeight: "1.6" }}>
          Pendaftaran calon anggota koperasi dilakukan secara daring (online) untuk mempercepat verifikasi data Anda secara aman dan efisien sesuai peraturan yang berlaku.
        </p>

        <div className="rp-step-list mb-4">
          {steps.map((step) => (
            <div key={step.no} className="rp-step-list-item">
              <div className="rp-step-number-badge">{step.no}</div>
              <div className="rp-step-text">
                <strong>{step.title}</strong>
                <span>{step.desc}</span>
              </div>
            </div>
          ))}
        </div>

        <Button
          onClick={onFillForm}
          className="rp-btn-cta mt-2"
        >
          <FaFileSignature />
          Isi Form Permohonan Menjadi Anggota
        </Button>
      </div>
    </Card>
  );
}
