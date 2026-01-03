import React from "react";
import { ListGroup, Row, Col, Alert, Button, Form } from "react-bootstrap";
import { FaEdit, FaClipboardCheck, FaInfoCircle } from "react-icons/fa";
import ApprovalPlaceholder from "../../../ui/ApprovalPlaceholder";
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

export default function Step8Summary({
  formData,
  handleEditStep,
  isCommitmentChecked,
  setIsCommitmentChecked,
}) {
  const memberTypeMap = { 5: "Reguler", 6: "Anggota Luar Biasa" };

  // Menggabungkan alamat teks yang sudah diset di Step 1
  const fullAddress = `
    ${formData.alamat_ktp || ""} 
    RT.${formData.rt || "00"}/RW.${formData.rw || "00"}, 
    ${formData.kelurahan || "-"}, ${formData.kecamatan || "-"}, 
    ${formData.kota_kab || "-"}, ${formData.provinsi || "-"}
  `
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div className="p-2">
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaClipboardCheck />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Ringkasan Permohonan</h5>
          <small className="text-muted">
            Tinjau kembali data Anda sebelum dikirim
          </small>
        </div>
      </div>

      <div className="p-3 bg-white rounded-20 shadow-sm border">
        {/* DATA PRIBADI */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
            <h6 className="fw-bold mb-0 text-primary">Data Pribadi</h6>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-decoration-none"
              onClick={() => handleEditStep(1)}
            >
              <FaEdit /> Edit
            </Button>
          </div>
          <ListGroup variant="flush">
            <DetailItem label="Nama Lengkap" value={formData.full_name} />
            <DetailItem label="NIK" value={formData.nik_ktp} />
            <DetailItem label="Alamat Sesuai KTP" value={fullAddress} />
          </ListGroup>
        </div>

        {/* DOKUMEN FOTO */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-3">
            <h6 className="fw-bold mb-0 text-primary">Dokumen Foto</h6>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-decoration-none"
              onClick={() => handleEditStep(3)}
            >
              <FaEdit /> Edit
            </Button>
          </div>
          <Row>
            <Col xs={6}>
              <PhotoDisplay base64Image={formData.foto_ktp} label="KTP" />
            </Col>
            <Col xs={6}>
              <PhotoDisplay
                base64Image={formData.foto_swafoto}
                label="Swafoto"
              />
            </Col>
          </Row>
        </div>

        {/* INFO KONTAK & AKUN */}
        <div className="mb-4">
          <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
            <h6 className="fw-bold mb-0 text-primary">Informasi Akun</h6>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-decoration-none"
              onClick={() => handleEditStep(2)}
            >
              <FaEdit /> Edit
            </Button>
          </div>
          <ListGroup variant="flush">
            <DetailItem
              label="Tipe Anggota"
              value={memberTypeMap[formData.tipeAnggota]}
            />
            <DetailItem label="Email" value={formData.email} />
            <DetailItem label="No. Handphone" value={formData.phone_number} />
          </ListGroup>
        </div>

        {/* PERSETUJUAN */}
        <div className="mt-4 pt-3 border-top">
          <Alert
            variant="info"
            className="small border-0 rounded-12 shadow-sm mb-3"
          >
            <FaInfoCircle className="me-2" />
            Dengan menekan tombol kirim, Anda menyetujui seluruh aturan
            Koperasi.
          </Alert>
          <Form.Check
            type="checkbox"
            id="commitmentCheck"
            label="Saya menyatakan data di atas adalah benar dan valid"
            className="small fw-bold"
            checked={isCommitmentChecked}
            onChange={(e) => setIsCommitmentChecked(e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
}
