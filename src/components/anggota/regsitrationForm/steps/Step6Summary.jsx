// src/components/anggota/regsitrationForm/steps/Step6Summary.jsx

import React from "react";
import { Card, ListGroup, Row, Col } from "react-bootstrap";
// Import komponen global
import ApprovalPlaceholder from "../../../ui/ApprovalPlaceholder";
// Import komponen lokal
import PhotoDisplay from "./PhotoDisplay";

// Helper Lokal (pertahankan)
const formatDate = (dateString) => {
  if (!dateString) return "-";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (e) {
    return dateString;
  }
};

// --- Komponen Item Detail Sederhana (Tampilan Data) ---
const DetailItem = ({ label, value }) => (
  <ListGroup.Item className="d-flex justify-content-between p-2">
    <small className="text-muted" style={{ flexBasis: "40%" }}>
      {label}
    </small>
    <small className="fw-bold text-end" style={{ flexBasis: "60%" }}>
      {value || "-"}
    </small>
  </ListGroup.Item>
);

export default function Step6Summary({ formData, handleEditStep }) {
  // --- MOCKUP DATA TAMBAHAN (Asumsi data ini didapatkan dari state/API) ---
  const MOCK_ACCOUNT_INFO = {
    tipeAnggota: "Reguler",
    noTelepon: "081294262252",
    email: "AvhanHb@gmail.com",
    jenisKelamin: "Laki-Laki",
  };

  const NIK = formData.ktp;

  return (
    <div className="p-1">
      <h5 className="mb-3 text-secondary">Detail Pendaftaran Anggota</h5>

      {/* Bagian 1: Personal Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold bg-light">Personal Info</Card.Header>
        <ListGroup variant="flush">
          <DetailItem label="Nama" value={formData.nama} />
          <DetailItem
            label="Jenis Kelamin"
            value={MOCK_ACCOUNT_INFO.jenisKelamin}
          />
          <DetailItem label="NIK" value={NIK} />
          <DetailItem label="Alamat" value={formData.alamatKtp} />
        </ListGroup>
      </Card>

      {/* Bagian 2: Foto Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold bg-light">Foto Info</Card.Header>
        <Card.Body>
          <Row>
            <Col xs={6}>
              <PhotoDisplay
                label="Foto KTP"
                imageData={formData.fotoKtp}
                type="KTP"
              />
            </Col>
            <Col xs={6}>
              <PhotoDisplay
                label="Swafoto"
                imageData={formData.swafoto}
                type="Swafoto"
              />
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Bagian 3: Account Info */}
      <Card className="mb-4">
        <Card.Header className="fw-bold bg-light">Account Info</Card.Header>
        <ListGroup variant="flush">
          <DetailItem
            label="Tipe Anggota"
            value={MOCK_ACCOUNT_INFO.tipeAnggota}
          />
          <DetailItem label="No Telepon" value={MOCK_ACCOUNT_INFO.noTelepon} />
          <DetailItem label="Email" value={MOCK_ACCOUNT_INFO.email} />
          {/* Menggabungkan Data Bank ke Account Info */}
          <DetailItem label="Nama Bank" value={formData.namaBank} />
          <DetailItem label="No Rekening" value={formData.noRek} />
        </ListGroup>
      </Card>

      {/* Bagian 4: Approval */}
      <Card className="mb-4">
        <Card.Header className="fw-bold bg-light">Approval</Card.Header>
        <Row className="p-3">
          <Col className="text-center">
            <ApprovalPlaceholder role="Pengawas" />
          </Col>
          <Col className="text-center">
            <ApprovalPlaceholder role="Ketua" />
          </Col>
        </Row>
      </Card>

      {/* Catatan untuk submit */}
      <div className="alert alert-info text-center mt-4">
        <p className="mb-0 fw-bold">
          Pastikan semua data sudah benar. Klik Kirim Permohonan di bawah untuk
          menyelesaikan proses pendaftaran.
        </p>
      </div>
    </div>
  );
}
