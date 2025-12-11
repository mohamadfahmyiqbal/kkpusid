// src/components/anggota/regsitrationForm/steps/Step8Summary.jsx (FINAL KOREKSI)

import React from "react";
import { Card, ListGroup, Row, Col, Alert, Button, Form } from "react-bootstrap";
import ApprovalPlaceholder from "../../../ui/ApprovalPlaceholder";
import PhotoDisplay from "./PhotoDisplay"; // Asumsi komponen ini ada
import { FaCheckSquare } from "react-icons/fa";

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

export default function Step8Summary({
  formData,
  handleEditStep,
  isCommitmentChecked,
  setIsCommitmentChecked,
}) {
  // Peta tipe anggota
  const memberTypeMap = {
    reguler: "Anggota Reguler",
    alb: "Anggota Luar Biasa",
  };

  return (
    <div className="p-3">
      <h5 className="mb-4 text-primary">Ringkasan Permohonan Anggota</h5>

      <Alert variant="warning" className="mb-4">
        **Perhatian!** Silakan tinjau kembali semua data di bawah ini. Setelah
        dikirim, permohonan akan diproses oleh administrator.
      </Alert>

      {/* Bagian 1: Data Diri & Akun */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Data Diri & Akun
          <Button variant="link" size="sm" onClick={() => handleEditStep(1)}>
            Edit Data Diri
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          <DetailItem label="NIK" value={formData.nik_ktp} />
          <DetailItem label="Nama Lengkap" value={formData.full_name} />
          <DetailItem label="Alamat KTP" value={formData.alamat_ktp} />
          <DetailItem label="Tipe Anggota" value={memberTypeMap[formData.tipeAnggota]} />
          <DetailItem label="No. HP" value={formData.phone_number} />
          <DetailItem label="Email" value={formData.email} />
        </ListGroup>
      </Card>
      
      {/* Bagian 2: Dokumentasi Foto */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Dokumentasi
          <Button variant="link" size="sm" onClick={() => handleEditStep(3)}>
            Edit Foto
          </Button>
        </Card.Header>
        <Card.Body className="p-3">
            <Row>
                <Col md={6}>
                    <h6>Foto KTP</h6>
                    <PhotoDisplay base64Image={formData.foto_ktp} label="Foto KTP" />
                </Col>
                <Col md={6}>
                    <h6>Swafoto dengan KTP</h6>
                    <PhotoDisplay base64Image={formData.foto_swafoto} label="Swafoto" />
                </Col>
            </Row>
        </Card.Body>
      </Card>
      
      {/* Bagian 3: Data Pekerjaan */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Informasi Data Pekerjaan
          <Button variant="link" size="sm" onClick={() => handleEditStep(5)}>
            Edit Pekerjaan
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          <DetailItem label="Pekerjaan" value={formData.occupation} />
          <DetailItem label="Nama Tempat Kerja" value={formData.employer_name} />
          <DetailItem label="Alamat Tempat Kerja" value={formData.employer_address} />
        </ListGroup>
      </Card>
      
      {/* Bagian 4: Kontak Darurat */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Kontak Darurat
          <Button variant="link" size="sm" onClick={() => handleEditStep(6)}>
            Edit Kontak Darurat
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          <DetailItem label="Nama Kontak" value={formData.contact_name} />
          <DetailItem label="No. HP" value={formData.phone_number_emergency} />
          <DetailItem label="Hubungan" value={formData.relation} />
        </ListGroup>
      </Card>

      {/* Bagian 5: Data Bank (MENGGUNAKAN NAMA FIELD YANG DIKOREKSI) */}
      <Card className="mb-4">
        <Card.Header className="d-flex justify-content-between align-items-center fw-bold bg-light">
          Informasi Rekening Bank
          <Button variant="link" size="sm" onClick={() => handleEditStep(7)}>
            Edit Data Bank
          </Button>
        </Card.Header>
        <ListGroup variant="flush">
          <DetailItem label="Nama Bank" value={formData.bank_name} />
          <DetailItem label="No. Rekening" value={formData.bank_account_no} /> {/* ✅ KOREKSI */}
          <DetailItem
            label="Nama Pemilik Rek."
            value={formData.account_holder} // ✅ KOREKSI
          />
        </ListGroup>
      </Card>

      {/* Bagian 6: Komitmen dan Tanda Tangan */}
      <Card className="mb-4">
        <Card.Header className="fw-bold bg-light">
          Pernyataan dan Komitmen
        </Card.Header>
        <Card.Body>
          <p className="text-muted small">
            Saya menyatakan bahwa semua data yang saya masukkan adalah benar dan
            bersedia mematuhi semua Anggaran Dasar dan Anggaran Rumah Tangga (AD/ART)
            serta peraturan yang berlaku.
          </p>
          <Form.Check
            type="checkbox"
            id="commitmentCheck"
            label={
              <>
                <FaCheckSquare className="text-success me-2" />
                Saya setuju dengan pernyataan di atas.
              </>
            }
            checked={isCommitmentChecked}
            onChange={(e) => setIsCommitmentChecked(e.target.checked)}
          />
        </Card.Body>
        <Row className="p-3">
          <Col className="text-center">
            <ApprovalPlaceholder
              role="Pemohon"
              isSigned={!!formData.full_name} // Tanda tangan dianggap ada jika nama terisi
              signName={formData.full_name}
            />
          </Col>
        </Row>
      </Card>
      
    </div>
  );
}