import React from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import {
  FaEdit,
  FaClipboardCheck,
  FaInfoCircle,
  FaUser,
  FaCamera,
  FaUserCircle,
  FaBriefcase,
  FaUserFriends,
  FaCreditCard
} from "react-icons/fa";
import PhotoDisplay from "./PhotoDisplay";

const DetailItem = ({ label, value }) => (
  <div className="d-flex justify-content-between align-items-center py-2 px-1 border-bottom border-light flex-wrap">
    <span className="text-muted small fw-medium me-2">{label}</span>
    <span
      className="fw-semibold text-dark text-end small text-break"
      style={{ maxWidth: "100%", flex: "1 1 auto", textAlign: "right" }}
    >
      {value || "-"}
    </span>
  </div>
);

const SectionWrapper = ({ title, icon: Icon, onEdit, children }) => (
  <div className="bg-white rounded-20 border shadow-sm p-2 p-md-3 mb-3 h-100 d-flex flex-column" style={{ borderColor: "#f1f5f9" }}>
    <div className="d-flex justify-content-between align-items-center border-bottom pb-2 mb-2">
      <h6 className="fw-bold mb-0 text-dark d-flex align-items-center" style={{ fontSize: "14px" }}>
        <span className="bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
          <Icon size={14} />
        </span>
        {title}
      </h6>
      <Button
        variant="outline-primary"
        size="sm"
        className="px-3 py-1 rounded-pill fw-semibold border-1"
        style={{ fontSize: "11px", transition: "all 0.2s" }}
        onClick={onEdit}
      >
        <FaEdit className="me-1" size={10} /> Edit
      </Button>
    </div>
    <div className="flex-grow-1">
      {children}
    </div>
  </div>
);

export default React.memo(function Step8Summary({
  formData,
  handleEditStep,
  isCommitmentChecked,
  setIsCommitmentChecked,
}) {
  const memberTypeMap = { 5: "Reguler", 6: "Anggota Luar Biasa" };

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
      {/* HEADER */}
      <div className="d-flex align-items-center mb-4">
        <div className="icon-box bg-soft-primary text-primary me-3">
          <FaClipboardCheck />
        </div>
        <div>
          <h5 className="fw-bold mb-0 text-dark">Ringkasan Permohonan</h5>
          <small className="text-muted">
            Tinjau kembali seluruh data Anda sebelum dikirimkan ke pengurus
          </small>
        </div>
      </div>

      {/* DASHBOARD GRID */}
      <Row className="g-4">
        {/* KOLOM KIRI */}
        <Col lg={6}>
          {/* DATA PRIBADI */}
          <div className="mb-4">
            <SectionWrapper title="Data Pribadi" icon={FaUser} onEdit={() => handleEditStep(1)}>
              <div className="d-flex flex-column gap-1">
                <DetailItem label="Nama Lengkap" value={formData.full_name} />
                <DetailItem label="NIK KTP" value={formData.nik_ktp} />
                <DetailItem label="Alamat KTP" value={fullAddress} />
              </div>
            </SectionWrapper>
          </div>

          {/* INFORMASI AKUN */}
          <div className="mb-4">
            <SectionWrapper title="Informasi Akun" icon={FaUserCircle} onEdit={() => handleEditStep(2)}>
              <div className="d-flex flex-column gap-1">
                <DetailItem
                  label="Tipe Anggota"
                  value={memberTypeMap[formData.tipeAnggota]}
                />
                <DetailItem label="Alamat Email" value={formData.email} />
                <DetailItem label="No. WhatsApp / HP" value={formData.phone_number} />
              </div>
            </SectionWrapper>
          </div>

          {/* REKENING BANK */}
          <div className="mb-4">
            <SectionWrapper title="Rekening Bank" icon={FaCreditCard} onEdit={() => handleEditStep(7)}>
              <div className="d-flex flex-column gap-1">
                <DetailItem label="Nama Bank" value={formData.bank_name} />
                <DetailItem
                  label="Nomor Rekening"
                  value={formData.bank_account_no || formData.account_number}
                />
                <DetailItem
                  label="Pemilik Rekening"
                  value={formData.account_holder}
                />
              </div>
            </SectionWrapper>
          </div>
        </Col>

        {/* KOLOM KANAN */}
        <Col lg={6}>
          {/* DOKUMEN FOTO */}
          <div className="mb-4">
            <SectionWrapper title="Dokumen Foto" icon={FaCamera} onEdit={() => handleEditStep(3)}>
              <Row className="g-3 mt-1">
                <Col xs={6}>
                  <PhotoDisplay
                    base64Image={formData.foto_ktp || formData.ktp_photo}
                    label="KTP"
                  />
                </Col>
                <Col xs={6}>
                  <PhotoDisplay
                    base64Image={formData.foto_swafoto || formData.selfie_photo}
                    label="Swafoto"
                  />
                </Col>
              </Row>
            </SectionWrapper>
          </div>

          {/* PEKERJAAN */}
          <div className="mb-4">
            <SectionWrapper title="Pekerjaan" icon={FaBriefcase} onEdit={() => handleEditStep(5)}>
              <div className="d-flex flex-column gap-1">
                <DetailItem
                  label="Pekerjaan"
                  value={formData.occupation || formData.job_title}
                />
                <DetailItem
                  label="Tempat Bekerja"
                  value={formData.employer_name}
                />
                <DetailItem
                  label="Alamat Kantor"
                  value={formData.employer_address}
                />
              </div>
            </SectionWrapper>
          </div>

          {/* KONTAK DARURAT */}
          <div className="mb-4">
            <SectionWrapper title="Kontak Darurat" icon={FaUserFriends} onEdit={() => handleEditStep(6)}>
              <div className="d-flex flex-column gap-1">
                <DetailItem label="Nama Kontak" value={formData.contact_name} />
                <DetailItem label="No. Handphone" value={formData.phone_number_emergency} />
                <DetailItem label="Hubungan" value={formData.relation} />
              </div>
            </SectionWrapper>
          </div>
        </Col>
      </Row>

      {/* PERSETUJUAN */}
      <div className="mt-3 p-2 p-md-3 rounded-20 bg-white border shadow-sm" style={{ borderColor: "#f1f5f9" }}>
        <div className="border-start border-4 border-info rounded-12 shadow-sm p-2 p-md-3 mb-3 bg-white d-flex align-items-start">
          <FaInfoCircle className="text-info me-2 mt-1 flex-shrink-0" size={16} />
          <div className="small text-muted" style={{ lineHeight: "1.6" }}>
            Dengan menekan tombol <strong>Kirim Sekarang</strong>, Anda menyatakan telah membaca, memahami, dan menyetujui seluruh Anggaran Dasar serta Anggaran Rumah Tangga (AD/ART) Koperasi Paguyuban Usaha Sukses.
          </div>
        </div>

        <Form.Check
          type="checkbox"
          id="commitmentCheck"
          label={
            <span className="small fw-bold text-dark ms-2" style={{ cursor: "pointer" }}>
              Saya menyatakan bahwa seluruh data yang saya masukkan adalah <span className="text-primary">benar, valid</span>, dan dapat dipertanggungjawabkan sesuai hukum yang berlaku.
            </span>
          }
          style={{ cursor: "pointer" }}
          checked={isCommitmentChecked}
          onChange={(e) => setIsCommitmentChecked(e.target.checked)}
          className="p-2 p-md-3 bg-white rounded-12 border shadow-sm d-flex align-items-center"
        />
      </div>
    </div>
  );
});