import React from "react";
import { Card, Button } from "react-bootstrap";
import { FaInfoCircle, FaFileSignature } from "react-icons/fa";

export default function InstructionsCard({ onFillForm }) {
  return (
    <Card className="border-0 shadow-lg rounded-20 overflow-hidden h-100">
      <div className="p-4 p-md-5">
        <div className="d-flex align-items-center mb-4">
          <div className="bg-primary text-white rounded-3 p-2 me-3 d-flex align-items-center justify-content-center">
            <FaInfoCircle size={20} />
          </div>
          <h4 className="fw-bold mb-0">Instruksi Pendaftaran</h4>
        </div>

        <p
          className="text-secondary mb-4 fs-5"
          style={{ lineHeight: "1.8" }}
        >
          Pendaftaran menjadi calon anggota dapat dilakukan secara
          daring (online) melalui portal aplikasi ini untuk
          mempercepat proses verifikasi.
        </p>

        <div className="bg-light rounded-3 p-4 mb-5 border-start border-primary border-4">
          <p className="mb-0 text-dark fw-medium">
            Silahkan klik tombol di bawah ini untuk memulai pengisian
            formulir digital permohonan anggota:
          </p>
        </div>

        <Button
          onClick={onFillForm}
          variant="primary"
          className="w-100 py-3 rounded-3 fw-bold shadow-lg"
        >
          <FaFileSignature className="me-2" />
          Isi Form Permohonan Menjadi Anggota
        </Button>
      </div>
    </Card>
  );
}
