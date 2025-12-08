// src/components/anggota/regsitrationForm/steps/Step6Summary.jsx (FINAL)

import React from "react";
import { Card, ListGroup, Row, Col, Alert, Button } from "react-bootstrap";
import ApprovalPlaceholder from "../../../ui/ApprovalPlaceholder";
import PhotoDisplay from "./PhotoDisplay";

// Helper Lokal (format tanggal)
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
  const tipeAnggotaMap = {
    umum: "Anggota Umum",
    pengurus: "Pengurus (Staf Koperasi)",
    "": "-",
  };

  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Ringkasan Data Pendaftaran</h5>

      {/* Bagian 1: Data Diri & Akun */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Informasi Dasar
          <Button variant="link" size="sm" onClick={() => handleEditStep(1)}>
            Edit Data Diri & Akun
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          {/* Data Diri - Menggunakan nik_ktp */}
          <DetailItem label="NIK" value={formData.nik_ktp} />{" "}
          {/* ✅ Diubah dari nik */}
          <DetailItem label="Nama Lengkap" value={formData.full_name} />
          <DetailItem label="Alamat KTP" value={formData.alamat_ktp} />
          <hr className="my-1" />
          {/* Data Akun - Menggunakan Skema Data Step 2 */}
          <DetailItem
            label="Tipe Anggota"
            value={tipeAnggotaMap[formData.tipeAnggota]}
          />
          <DetailItem label="No Telepon" value={formData.phone_number} />
          <DetailItem label="Email" value={formData.email} />
        </ListGroup>
      </Card>

      {/* Bagian 2: Dokumen */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Dokumentasi KTP & Swafoto
          <Button variant="link" size="sm" onClick={() => handleEditStep(3)}>
            Edit Dokumen
          </Button>
        </Card.Header>
        <Row className="p-3">
          <Col md={6}>
            <PhotoDisplay
              label="Foto Kartu Tanda Penduduk (KTP)"
              imageData={formData.foto_ktp}
              type="KTP"
            />
          </Col>
          <Col md={6}>
            <PhotoDisplay
              label="Swafoto dengan KTP"
              imageData={formData.selfie_photo_path}
              type="Swafoto"
            />
          </Col>
        </Row>
      </Card>

      {/* Bagian 3: Data Bank */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Informasi Rekening Bank
          <Button variant="link" size="sm" onClick={() => handleEditStep(5)}>
            Edit Data Bank
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          <DetailItem label="Nama Bank" value={formData.bank_name} />
          <DetailItem label="No. Rekening" value={formData.account_number} />
          <DetailItem
            label="Nama Pemilik Rek."
            value={formData.account_holder_name}
          />
        </ListGroup>
      </Card>

      {/* Bagian 4: Approval */}
      <Card className="mb-4">
        <Card.Header className="fw-bold bg-light">
          Tanda Tangan Elektronik
        </Card.Header>
        <Row className="p-3">
          <Col className="text-center">
            <ApprovalPlaceholder
              role="Pemohon"
              isSigned={!!formData.full_name}
              signName={formData.full_name}
            />
          </Col>
          <Col className="text-center">
            <ApprovalPlaceholder role="Koperasi" />
          </Col>
        </Row>
      </Card>

      <div className="alert alert-danger text-center">
        Dengan menyetujui komitmen, Anda menyetujui semua data di atas adalah
        benar.
      </div>
    </div>
  );
}
