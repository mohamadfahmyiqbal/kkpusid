import React from "react";
import { ListGroup, Row, Col, Alert, Button, Form } from "react-bootstrap";
import { FaEdit, FaClipboardCheck, FaInfoCircle } from "react-icons/fa";
import PhotoDisplay from "./PhotoDisplay";

const DetailItem = ({ label, value }) => (
  <ListGroup.Item className="d-flex justify-content-between align-items-center border-0 px-0 py-2">
    <span className="text-muted small fw-medium">{label}</span>
    <span
      className="fw-bold text-dark text-end small"
      style={{ maxWidth: "60%" }}
    >
      {value || "-"}
    </span>
  </ListGroup.Item>
);

const SectionHeader = ({ title, onEdit }) => (
  <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2 mt-4">
    <h6 className="fw-bold mb-0 text-primary">{title}</h6>
    <Button
      variant="link"
      size="sm"
      className="p-0 text-decoration-none"
      onClick={onEdit}
    >
      <FaEdit /> Edit
    </Button>
  </div>
);

export default function Step8Summary({
  formData,
  handleEditStep,
  isCommitmentChecked,
  setIsCommitmentChecked,
}) {
  const memberTypeMap = { 5: "Reguler", 6: "Anggota Luar Biasa" };

  const fullAddress = `
    ${formData.alamat_ktp || ""} 
    RT.${formData.rt || "00"}/RW.${formData.rw || "00"}, 
    ${formData.subdistrict_name || "-"}, ${formData.district_name || "-"}, 
    ${formData.city_name || "-"}, ${formData.province_name || "-"}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className="p-2">
      <div className="d-flex align-items-center mb-4">
        <div className="bg-light text-primary p-3 rounded-circle me-3">
          <FaClipboardCheck size={24} />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Ringkasan Permohonan</h5>
          <small className="text-muted">
            Tinjau kembali data Anda sebelum dikirim
          </small>
        </div>
      </div>

      <div className="p-4 bg-white rounded-20 border">
        {/* DATA PRIBADI */}
        <SectionHeader title="Data Pribadi" onEdit={() => handleEditStep(1)} />
        <ListGroup variant="flush">
          <DetailItem label="Nama Lengkap" value={formData.full_name} />
          <DetailItem label="NIK" value={formData.nik_ktp} />
          <DetailItem label="Alamat Sesuai KTP" value={fullAddress} />
        </ListGroup>

        {/* DOKUMEN FOTO */}
        <SectionHeader title="Dokumen Foto" onEdit={() => handleEditStep(3)} />
        <Row className="mt-3">
          <Col xs={6}>
            <PhotoDisplay base64Image={formData.foto_ktp} label="KTP" />
          </Col>
          <Col xs={6}>
            <PhotoDisplay base64Image={formData.foto_swafoto} label="Swafoto" />
          </Col>
        </Row>

        {/* INFO AKUN & KONTAK */}
        <SectionHeader
          title="Informasi Akun"
          onEdit={() => handleEditStep(2)}
        />
        <ListGroup variant="flush">
          <DetailItem
            label="Tipe Anggota"
            value={memberTypeMap[formData.tipeAnggota]}
          />
          <DetailItem label="Email" value={formData.email} />
          <DetailItem label="No. Handphone" value={formData.phone_number} />
        </ListGroup>

        {/* INFO KEUANGAN & PEKERJAAN */}
        <SectionHeader
          title="Pekerjaan & Rekening"
          onEdit={() => handleEditStep(7)}
        />
        <ListGroup variant="flush">
          <DetailItem label="Pekerjaan" value={formData.job_title} />
          <DetailItem label="Nama Bank" value={formData.bank_name} />
          <DetailItem label="No. Rekening" value={formData.account_number} />
          <DetailItem
            label="Pemilik Rekening"
            value={formData.account_holder}
          />
        </ListGroup>

        {/* PERSETUJUAN */}
        <div className="mt-5 pt-4 border-top">
          <Alert
            variant="info"
            className="small border-0 rounded-12 shadow-sm mb-4"
          >
            <div className="d-flex">
              <FaInfoCircle className="me-2 mt-1" />
              <span>
                Dengan menekan tombol kirim, Anda menyatakan telah membaca dan
                menyetujui seluruh Anggaran Dasar dan Anggaran Rumah Tangga
                (AD/ART) Koperasi.
              </span>
            </div>
          </Alert>
          <Form.Check
            type="checkbox"
            id="commitmentCheck"
            label="Saya menyatakan bahwa seluruh data yang saya masukkan adalah benar, valid, dan dapat dipertanggungjawabkan sesuai hukum yang berlaku."
            className="small fw-bold text-dark"
            style={{ cursor: "pointer" }}
            checked={isCommitmentChecked}
            onChange={(e) => setIsCommitmentChecked(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
