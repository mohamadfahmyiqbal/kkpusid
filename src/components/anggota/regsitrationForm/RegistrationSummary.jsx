// src/components/anggota/regsitrationForm/RegistrationSummary.jsx

import React, { useCallback } from "react";
import { Card, Button, Table, Row, Col, Alert } from "react-bootstrap";
import { FaArrowLeft, FaMoneyBillWave } from "react-icons/fa";
import ApprovalPlaceholder from "../../ui/ApprovalPlaceholder";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";

// Komponen Utama
export default function RegistrationSummary({
  data,
  onBackToDashboard,
  baseUrl,
}) {
  const navigate = useNavigate();

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
    currentStep,
    final_status,
    registration_status, // <-- Nilai terbaru: "menunggu_pembayaran"
    initial_bill_id, // <-- Nilai yang harus dikirim: 123 (contoh)
  } = data;
  console.log(data);

  // 🚨 HANDLER NAVIGASI KE INVOICE PAGE
  const handleNavigateToInvoice = useCallback(() => {
    if (!initial_bill_id) {
      alert(
        "Maaf, ID Tagihan Awal belum tersedia. Silakan hubungi administrator."
      );
      return;
    }

    // Mengirim billId melalui token JWT
    const token = jwtEncode({
      page: "invoicePage", // Rute tujuan: InvoicePage
      billId: initial_bill_id,
      return: "registrationPage", // Untuk navigasi kembali dari InvoicePage
    });

    navigate(`/${token}`);
    console.log(`Navigasi ke halaman Invoice Bill ID: ${initial_bill_id}`);
  }, [navigate, initial_bill_id]);

  // FIX: FUNGSI getFullImagePath DENGAN SAFEGURAD UNTUK MENCEGAH TypeError
  const getFullImagePath = (relativePath) => {
    if (!relativePath || typeof relativePath !== "string") {
      return "assets/images/no-image.png";
    }
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = relativePath.startsWith("/")
      ? relativePath.slice(1)
      : relativePath;
    return `${cleanBase}/${cleanPath}`;
  };

  // Logika Status Display
  let statusVariant;
  let statusText;
  switch (final_status) {
    case "APPROVED":
      // 🛑 KOREKSI LOGIKA STATUS (Berlaku untuk APPROVED)
      if (registration_status === "menunggu_pembayaran") {
        statusVariant = "warning";
        statusText =
          "Selamat! Pendaftaran Anda **telah disetujui penuh**. Silakan lanjutkan ke **Pembayaran Tagihan Awal** untuk mengaktifkan akun.";
      } else if (registration_status === "selesai") {
        // Asumsi "selesai" berarti sudah bayar/aktif
        statusVariant = "success";
        statusText =
          "Selamat! Pendaftaran Anda **telah disetujui penuh** dan akun Anda **telah aktif**.";
      }
      break;
    case "REJECTED":
      statusVariant = "danger";
      statusText = "Maaf, pendaftaran Anda **telah ditolak**. Proses selesai.";
      break;
    case "IN_PROGRESS":
    default:
      statusVariant = "warning";
      statusText = `Pendaftaran sedang dalam proses persetujuan. Menunggu verifikasi di tahap: <b>${
        currentStep?.step_name || "Tidak Diketahui"
      }</b>.`;
      break;
  }

  // Logika Approval Placeholder
  const currentStepId = currentStep ? currentStep.approval_step_id : 0;
  // Kita bisa menggunakan final_status APPROVED untuk menandai semua step telah dilalui
  const isPengawasApproved = final_status === "APPROVED" || currentStepId > 1;
  const isKetuaApproved = final_status === "APPROVED";

  // 🛑 KOREKSI LOGIKA UNTUK TOMBOL BAYAR SEKARANG
  // Tombol Bayar muncul jika APPROVED penuh DAN status berikutnya adalah 'menunggu_pembayaran'
  const showPayNowButton =
    final_status === "APPROVED" &&
    registration_status === "menunggu_pembayaran" &&
    initial_bill_id;

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
          <Card className="shadow-lg mb-4">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Detail Pendaftaran Anggota</h5>
            </Card.Header>
            <Card.Body className="p-0">
              {/* === 1. Personal Info === */}
              {/* ... (Konten Personal Info tidak berubah) */}
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
              {/* ... (Konten Foto Info tidak berubah) */}
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
              {/* ... (Konten Account Info tidak berubah) */}
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
                    <ApprovalPlaceholder
                      role="Pengawas"
                      isApproved={isPengawasApproved}
                    />
                  </Col>
                  <Col xs={6}>
                    <ApprovalPlaceholder
                      role="Ketua"
                      isApproved={isKetuaApproved}
                    />
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

          {/* === 5. Tombol Aksi === */}
          <div className="d-grid gap-2 mb-5">
            {/* Tampilkan Tombol Bayar Sekarang jika APPROVED penuh DAN status 'menunggu_pembayaran' */}
            {showPayNowButton && (
              <Button
                onClick={handleNavigateToInvoice}
                variant="success"
                size="lg"
              >
                <FaMoneyBillWave className="me-2" /> Bayar Sekarang (Tagihan
                Awal)
              </Button>
            )}

            {/* Tombol Kembali */}
            <Button onClick={onBackToDashboard} variant="primary">
              Kembali ke Dashboard
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}
