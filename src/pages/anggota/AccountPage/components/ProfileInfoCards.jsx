import React from "react";
import { Card, Button, Row, Col } from "react-bootstrap";
import {
  FaUser,
  FaEdit,
  FaUniversity,
  FaBriefcase,
  FaUserFriends,
  FaExclamationTriangle,
} from "react-icons/fa";

// Helper format tanggal Indonesia
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

export default function ProfileInfoCards({ userProfile, onOpenEditModal }) {
  return (
    <>
      {/* 1. Informasi Utama Profil & Kontak */}
      <Card className="ap-info-card mb-4">
        <div className="card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4">
          <div className="ap-header-title">
            <FaUser className="ap-header-icon" />
            <span>Informasi Pribadi & Kontak</span>
          </div>
          <Button
            variant="outline-primary"
            className="ap-edit-btn"
            onClick={() => onOpenEditModal("pribadi")}
          >
            <FaEdit className="me-2" />
            Edit Profil
          </Button>
        </div>
        <Card.Body className="p-4">
          <div className="ap-grid-container">
            {/* Kolom 1 */}
            <div className="ap-grid-item">
              <div className="ap-info-item">
                <span className="ap-info-label">ID Anggota</span>
                <span className="ap-info-value">{userProfile?.no_anggota || "-"}</span>
              </div>
              <div className="ap-info-item">
                <span className="ap-info-label">NIK (KTP)</span>
                <span className="ap-info-value">{userProfile?.nik_ktp || "-"}</span>
              </div>
              <div className="ap-info-item">
                <span className="ap-info-label">Alamat Domisili</span>
                <span className="ap-info-value">
                  {userProfile?.alamat || "-"}
                  {(userProfile?.rt || userProfile?.rw) && (
                    <span className="d-block text-muted small">
                      RT {userProfile?.rt || "-"} / RW {userProfile?.rw || "-"}
                    </span>
                  )}
                </span>
              </div>
            </div>

            {/* Kolom 2 */}
            <div className="ap-grid-item">
              <div className="ap-info-item">
                <span className="ap-info-label">Jenis Kelamin</span>
                <span className="ap-info-value">{userProfile?.gender || "-"}</span>
              </div>
              <div className="ap-info-item">
                <span className="ap-info-label">Tanggal Bergabung</span>
                <span className="ap-info-value">
                  {userProfile?.join_date && userProfile.join_date !== "-"
                    ? formatDate(userProfile.join_date)
                    : "-"}
                </span>
              </div>
            </div>

            {/* Kolom 3 */}
            <div className="ap-grid-item">
              <div className="ap-info-item">
                <span className="ap-info-label">Email</span>
                <span className="ap-info-value">{userProfile?.email || "-"}</span>
              </div>
              <div className="ap-info-item">
                <span className="ap-info-label">No. Telepon / WhatsApp</span>
                <span className="ap-info-value">{userProfile?.telepon || "-"}</span>
              </div>
              <div className="ap-info-item">
                <span className="ap-info-label">Status Akun</span>
                <span className="ap-status-badge">Aktif</span>
              </div>
            </div>
          </div>
        </Card.Body>
      </Card>

      {/* 2. Card Data Pendaftaran: Rekening Bank, Pekerjaan, Kontak Darurat */}
      <Row className="g-4 mb-4">
        {/* Card Rekening Bank */}
        <Col lg={4} md={6} sm={12}>
          <Card className="ap-info-card h-100">
            <div className="card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4">
              <div className="ap-header-title d-flex align-items-center gap-2">
                <FaUniversity className="text-primary" />
                <span className="fs-6 fw-bold">Rekening Bank</span>
              </div>
              <Button
                variant="link"
                className="p-0 text-primary text-decoration-none fw-semibold fs-7"
                onClick={() => onOpenEditModal("bank")}
              >
                <FaEdit className="me-1" /> Ubah
              </Button>
            </div>
            <Card.Body className="p-4 d-flex flex-column justify-content-between">
              <div className="d-flex flex-column gap-3">
                <div className="ap-info-item">
                  <span className="ap-info-label">Nama Bank</span>
                  <strong className="ap-info-value fs-6 text-dark">
                    {userProfile?.bank_name || "-"}
                  </strong>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-label">Nomor Rekening</span>
                  <span className="ap-info-value fw-bold text-primary font-monospace fs-6">
                    {userProfile?.bank_account_no || "-"}
                  </span>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-label">Atas Nama Pemilik</span>
                  <span className="ap-info-value">{userProfile?.account_holder || "-"}</span>
                </div>
              </div>
              {(!userProfile?.bank_account_no || userProfile?.bank_account_no === "-") && (
                <div className="mt-3 p-2 rounded bg-warning-subtle text-warning-emphasis fs-8 d-flex align-items-center gap-2">
                  <FaExclamationTriangle />
                  <span>Belum diatur. Segera lengkapi untuk penarikan dana.</span>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>

        {/* Card Pekerjaan */}
        <Col lg={4} md={6} sm={12}>
          <Card className="ap-info-card h-100">
            <div className="card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4">
              <div className="ap-header-title d-flex align-items-center gap-2">
                <FaBriefcase className="text-success" />
                <span className="fs-6 fw-bold">Pekerjaan</span>
              </div>
              <Button
                variant="link"
                className="p-0 text-primary text-decoration-none fw-semibold fs-7"
                onClick={() => onOpenEditModal("pekerjaan")}
              >
                <FaEdit className="me-1" /> Ubah
              </Button>
            </div>
            <Card.Body className="p-4">
              <div className="d-flex flex-column gap-3">
                <div className="ap-info-item">
                  <span className="ap-info-label">Pekerjaan / Jabatan</span>
                  <strong className="ap-info-value fs-6 text-dark">
                    {userProfile?.occupation || "-"}
                  </strong>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-label">Instansi / Perusahaan</span>
                  <span className="ap-info-value">{userProfile?.employer_name || "-"}</span>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-label">Alamat Kantor / Usaha</span>
                  <span className="ap-info-value">{userProfile?.employer_address || "-"}</span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>

        {/* Card Kontak Darurat */}
        <Col lg={4} md={12} sm={12}>
          <Card className="ap-info-card h-100">
            <div className="card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4">
              <div className="ap-header-title d-flex align-items-center gap-2">
                <FaUserFriends className="text-danger" />
                <span className="fs-6 fw-bold">Kontak Darurat</span>
              </div>
              <Button
                variant="link"
                className="p-0 text-primary text-decoration-none fw-semibold fs-7"
                onClick={() => onOpenEditModal("darurat")}
              >
                <FaEdit className="me-1" /> Ubah
              </Button>
            </div>
            <Card.Body className="p-4">
              <div className="d-flex flex-column gap-3">
                <div className="ap-info-item">
                  <span className="ap-info-label">Nama Kontak</span>
                  <strong className="ap-info-value fs-6 text-dark">
                    {userProfile?.contact_name || "-"}
                  </strong>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-label">Hubungan</span>
                  <span className="ap-info-value">{userProfile?.relation || "-"}</span>
                </div>
                <div className="ap-info-item">
                  <span className="ap-info-label">No. Telepon Darurat</span>
                  <span className="ap-info-value font-monospace">
                    {userProfile?.phone_number_emergency || "-"}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
}
