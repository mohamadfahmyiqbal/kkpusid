// src/components/anggota/regsitrationForm/RegistrationSummary.jsx (KODE FINAL)

import React from "react";
import { Card, Button, Table, Row, Col, Alert } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import ApprovalPlaceholder from "../../ui/ApprovalPlaceholder";

// Komponen Utama
export default function RegistrationSummary({
  data,
  onBackToDashboard,
  baseUrl,
}) {
  // Data utama dari tabel member_registrations
  const {
    full_name,
    email,
    phone_number,
    nik_ktp,
    address_ktp,
    member_type,
    ktp_photo_path,
    selfie_photo_path,
    // ✅ FIX: Menggunakan alias yang benar dari backend
    currentStep,
    final_status,
  } = data;

  // Gabungkan baseUrl dengan path relatif dari backend
  const getFullImagePath = (relativePath) => {
    // Menghapus dan memastikan path tergabung dengan benar
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;
    return `${cleanBase}/${cleanPath}`;
  };

  // Logika Status untuk Alert di bagian Approval
  let statusVariant;
  let statusText;

  switch (final_status) {
    case "APPROVED":
      statusVariant = "success";
      statusText = "Pendaftaran Anda telah **DISETUJUI**.";
      break;
    case "REJECTED":
      statusVariant = "danger";
      statusText = "Pendaftaran Anda **DITOLAK**. Silakan hubungi admin.";
      break;
    case "PENDING":
    default:
      statusVariant = "warning";
      statusText = `Pendaftaran masih dalam proses verifikasi. Tahap saat ini: ${
        currentStep?.step_name || "Menunggu Verifikasi Awal"
      }.`;
      break;
  }

  return (
    <div className="container-fluid">
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={onBackToDashboard}
              style={{ cursor: "pointer" }}
              className="me-3"
            >
              <FaArrowLeft className="me-2" />
            </span>
            Pendaftaran Anggota
          </h3>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">Dashboard</li>
            <li className="breadcrumb-item active">Detail Pendaftaran</li>
          </ol>
        </div>
      </div>

      <Row>
        <Col lg={12}>
          {/* Card: Detail Pendaftaran Anggota (Sesuai Gambar) */}
          <Card className="shadow-lg mb-4">
            {/* Header Biru Gelap */}
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Detail Pendaftaran Anggota</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {/* === 1. Personal Info === */}
              <div className="p-3 border-bottom">
                <h6 className="mt-0 mb-3 fw-bold">Personal Info</h6>
                <Table borderless size="sm" className="mb-0 registration-table">
                  <tbody>
                    <tr>
                      <th style={{ width: "30%" }}>Nama</th>
                      <td style={{ width: "70%" }} className="text-end">
                        {full_name}
                      </td>
                    </tr>
                    <tr>
                      <th>Jenis Kelamin</th>
                      <td className="text-end">Laki-Laki (Placeholder)</td>
                    </tr>
                    <tr>
                      <th>NIK</th>
                      <td className="text-end">{nik_ktp}</td>
                    </tr>
                    <tr>
                      <th>Alamat</th>
                      <td colSpan="2">{address_ktp}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* === 2. Foto Info === */}
              <div className="p-3 border-bottom">
                <h6 className="mt-0 mb-3 fw-bold">Foto Info</h6>
                <Row>
                  <Col xs={6} className="text-center">
                    <Card className="border">
                      <Card.Body className="p-2">
                        <p className="mb-1 fw-bold">Foto KTP</p>
                        <img
                          src={getFullImagePath(ktp_photo_path)}
                          alt="Foto KTP"
                          className="img-fluid rounded"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={6} className="text-center">
                    <Card className="border">
                      <Card.Body className="p-2">
                        <p className="mb-1 fw-bold">Swafoto</p>
                        <img
                          src={getFullImagePath(selfie_photo_path)}
                          alt="Foto Swafoto"
                          className="img-fluid rounded"
                          style={{
                            maxWidth: "100%",
                            maxHeight: "150px",
                            objectFit: "contain",
                          }}
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </div>

              {/* === 3. Account Info === */}
              <div className="p-3 border-bottom">
                <h6 className="mt-0 mb-3 fw-bold">Account Info</h6>
                <Table borderless size="sm" className="mb-0 registration-table">
                  <tbody>
                    <tr>
                      <th style={{ width: "30%" }}>Tipe Anggota</th>
                      <td style={{ width: "70%" }} className="text-end">
                        {member_type}
                      </td>
                    </tr>
                    <tr>
                      <th>No Telepon</th>
                      <td className="text-end">{phone_number}</td>
                    </tr>
                    <tr>
                      <th>Email</th>
                      <td className="text-end">{email}</td>
                    </tr>
                  </tbody>
                </Table>
              </div>

              {/* === 4. Approval Status & Placeholder === */}
              <div className="p-3">
                <h6 className="mt-0 mb-3 fw-bold">Approval</h6>

                {/* Alert Status */}
                <Alert variant={statusVariant} className="text-center p-2">
                  <small dangerouslySetInnerHTML={{ __html: statusText }} />
                </Alert>

                <Row className="text-center">
                  <Col xs={6}>
                    <ApprovalPlaceholder role="Pengawas" />
                  </Col>
                  <Col xs={6}>
                    <ApprovalPlaceholder role="Ketua" />
                  </Col>
                </Row>
              </div>

              <div className="p-3 border-top">
                <Alert variant="secondary" className="mb-0">
                  <small>
                    Catatan: Detail data pekerjaan, bank, dan kontak darurat
                    tersimpan, tetapi tidak ditampilkan di ringkasan ini.
                  </small>
                </Alert>
              </div>
            </Card.Body>
          </Card>

          {/* Tombol kembali */}
          <div className="d-grid mb-5">
            <Button onClick={onBackToDashboard} variant="primary">
              Kembali ke Dashboard
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
