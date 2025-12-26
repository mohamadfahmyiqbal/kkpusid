// 📁 src/components/anggota/regsitrationForm/RegistrationSummary.jsx

import React, { useCallback, useMemo } from "react";
import { Card, Button, Table, Row, Col, Alert } from "react-bootstrap";
import { FaArrowLeft, FaMoneyBillWave, FaCheckCircle, FaClock } from "react-icons/fa";
import ApprovalPlaceholder from "../../ui/ApprovalPlaceholder";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";

export default function RegistrationSummary({
  data,
  onBackToDashboard,
  baseUrl,
}) {
  const navigate = useNavigate();

  // Extract data dengan aman
  const {
    full_name,
    email,
    phone_number,
    nik_ktp,
    address_ktp,
    member_type,
    ktp_photo_path,
    selfie_photo_path,
    registration_status,
    final_status,
    initial_bill_id,
    allSteps = []
  } = data;

  // 1. Logika untuk menentukan status approval tiap peran secara akurat
  const approvalStatus = useMemo(() => {
    const pengawas = allSteps.find(s => s.step_name.toLowerCase().includes("pengawas"));
    const ketua = allSteps.find(s => s.step_name.toLowerCase().includes("ketua"));

    return {
      isPengawasApproved: pengawas?.decision === "APPROVE",
      isKetuaApproved: ketua?.decision === "APPROVE",
      currentStepName: allSteps.find(s => s.is_current)?.step_name || "Proses Verifikasi"
    };
  }, [allSteps]);

  // 2. Handler Navigasi ke Invoice
  const handleNavigateToInvoice = useCallback(() => {
    if (!initial_bill_id) {
      alert("ID Tagihan belum tersedia. Mohon tunggu persetujuan akhir dari Ketua.");
      return;
    }

    const token = jwtEncode({
      page: "invoicePage",
      billId: initial_bill_id,
      return: "registrationPage",
    });

    navigate(`/${token}`);
  }, [navigate, initial_bill_id]);

  // 3. Helper Image Path
  const getFullImagePath = (relativePath) => {
    if (!relativePath || typeof relativePath !== "string") {
      return "/assets/images/no-image.png";
    }
    const cleanBase = baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = relativePath.startsWith("/") ? relativePath.slice(1) : relativePath;
    return `${cleanBase}/${cleanPath}`;
  };

  // 4. Penentuan UI Status (Variant & Text)
  let statusVariant = "info";
  let statusText = "";

  if (final_status === "REJECTED") {
    statusVariant = "danger";
    statusText = "Maaf, pendaftaran Anda <b>ditolak</b>.";
  } else if (registration_status === "menunggu_pembayaran" && initial_bill_id) {
    statusVariant = "success";
    statusText = "<b>Selamat!</b> Pendaftaran disetujui penuh. Silakan lakukan pembayaran tagihan awal.";
  } else if (approvalStatus.isPengawasApproved && !approvalStatus.isKetuaApproved) {
    statusVariant = "warning";
    statusText = `Disetujui oleh <b>Pengawas</b>. Menunggu verifikasi akhir oleh <b>Ketua</b>.`;
  } else {
    statusVariant = "primary";
    statusText = `Pendaftaran dalam proses: <b>${approvalStatus.currentStepName}</b>.`;
  }

  const showPayNowButton = !!(initial_bill_id && registration_status === "menunggu_pembayaran");

  return (
    <div className="container-fluid">
      <div className="row page-titles pt-3">
        <div className="col-12">
          <h3 className="text-themecolor mb-0 mt-0">
            <span role="button" onClick={onBackToDashboard} className="me-3">
              <FaArrowLeft />
            </span>
            Detail Pendaftaran
          </h3>
        </div>
      </div>

      <Row>
        <Col lg={12}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-info text-white">
              <h5 className="mb-0">Informasi Pendaftaran</h5>
            </Card.Header>
            <Card.Body className="p-0">
              
              {/* Personal Info */}
              <div className="p-3 border-bottom">
                <h6 className="fw-bold text-uppercase small text-muted mb-3">Data Pribadi</h6>
                <Table borderless size="sm" className="mb-0">
                  <tbody>
                    <tr><th width="30%">Nama</th><td className="text-end">{full_name}</td></tr>
                    <tr><th>NIK</th><td className="text-end">{nik_ktp}</td></tr>
                    <tr><th>Tipe</th><td className="text-end text-capitalize">{member_type}</td></tr>
                  </tbody>
                </Table>
              </div>

              {/* Foto Info */}
              <div className="p-3 border-bottom bg-light">
                <Row>
                  <Col xs={6}>
                    <p className="small fw-bold mb-1 text-center">KTP</p>
                    <img src={getFullImagePath(ktp_photo_path)} className="img-thumbnail" alt="KTP" />
                  </Col>
                  <Col xs={6}>
                    <p className="small fw-bold mb-1 text-center">Swafoto</p>
                    <img src={getFullImagePath(selfie_photo_path)} className="img-thumbnail" alt="Selfie" />
                  </Col>
                </Row>
              </div>

              {/* Approval Section */}
              <div className="p-3">
                <h6 className="fw-bold text-uppercase small text-muted mb-3">Status Persetujuan</h6>
                <Alert variant={statusVariant} className="text-center py-2 mb-4">
                  <span dangerouslySetInnerHTML={{ __html: statusText }} />
                </Alert>

                <Row>
                  <Col xs={6}>
                    <ApprovalPlaceholder 
                      role="Pengawas" 
                      isApproved={approvalStatus.isPengawasApproved} 
                    />
                  </Col>
                  <Col xs={6}>
                    <ApprovalPlaceholder 
                      role="Ketua" 
                      isApproved={approvalStatus.isKetuaApproved} 
                    />
                  </Col>
                </Row>
              </div>

            </Card.Body>
          </Card>

          {/* Action Buttons */}
          <div className="d-grid gap-2 mb-5">
            {showPayNowButton && (
              <Button onClick={handleNavigateToInvoice} variant="success" size="lg" className="py-3 shadow">
                <FaMoneyBillWave className="me-2" /> Bayar Tagihan Awal Sekarang
              </Button>
            )}
            
            <Button onClick={onBackToDashboard} variant="outline-primary">
              Kembali ke Dashboard
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
}