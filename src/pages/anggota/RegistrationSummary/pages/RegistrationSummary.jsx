import React, { useCallback, useEffect, useState } from "react";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaFileInvoiceDollar,
  FaUser,
  FaIdCard,
  FaCheckCircle,
  FaMapMarkerAlt
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApprovalPlaceholder from "../../../../components/ui/ApprovalPlaceholder";
import { jwtEncode } from "../../../../utils/helpers";
import InfoRow from "../components/InfoRow";
import useApprovalStatus from "../hooks/useApprovalStatus";
import useRegistrationSocket from "../hooks/useRegistrationSocket";
import usePaymentHandler from "../../../../hooks/usePaymentHandler";

export default function RegistrationSummary({
  data: initialData,
  onBackToDashboard,
  baseUrl,
}) {
  const navigate = useNavigate();

  // State lokal untuk mendukung update real-time via Socket
  const [data, setData] = useState(initialData);

  // Handle payment success untuk menutup Snap dan update UI
  const { paymentSuccess, paymentData } = usePaymentHandler();

  // Sinkronisasi jika parent component melakukan re-fetch
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /**
   * SOCKET LISTENER
   */
  useRegistrationSocket(data?.registration_id, setData);

  // Helper untuk melengkapi path gambar relatif dari backend
  const getImgSrc = (img) => {
    if (!img) return "";
    if (img.startsWith("http") || img.startsWith("data:")) {
      return img;
    }
    const base = baseUrl ? baseUrl.replace(/\/$/, "") : "";
    const path = img.startsWith("/") ? img : `/${img}`;
    return `${base}${path}`;
  };

  const {
    registration_id,
    bill_id,
    full_name,
    nik_ktp,
    address_ktp,
    foto_ktp,
    foto_swafoto,
    final_status,
    is_approved_pengawas,
    is_approved_ketua,
    current_step_id,
    member,
  } = data || {};

  /**
   * LOGIKA STEPPER SIKRON (FIXED)
   */
  const approvalStatus = useApprovalStatus(
    is_approved_pengawas,
    is_approved_ketua,
    bill_id,
    current_step_id,
    final_status,
  );

  const handleNavigateToInvoice = useCallback(() => {
    // Menghapus pengecekan ketat bill_id karena sistem menggunakan BillItems
    

    const token = jwtEncode({
      page: "billingPage",
      registration_id: registration_id,
      billId: bill_id,
      category: "MEMBER_REGISTRATION",
      filter: {
        registration_id: registration_id,
      },
      displayName: "Pendaftaran Anggota",
      return: "registrationPage",
    });

    navigate(`/${token}`);
  }, [navigate, registration_id, bill_id]);

  return (
    <div className="container-fluid py-4 bg-light min-vh-100">
      {/* HEADER SECTION */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-3">
        <div className="d-flex align-items-center">
          <div className="icon-box bg-soft-primary text-primary me-3 d-flex align-items-center justify-content-center" style={{ width: "48px", height: "48px", borderRadius: "12px" }}>
            <FaIdCard size={20} />
          </div>
          <div>
            <h4 className="fw-bold mb-0 text-dark" style={{ fontSize: "18px" }}>Detail Pendaftaran</h4>
            <small className="text-muted">Berikut adalah detail permohonan keanggotaan Anda.</small>
          </div>
        </div>
        <Button
          variant="outline-secondary"
          className="px-4 py-2 rounded-12 fw-bold text-muted border-light bg-white shadow-sm d-flex align-items-center"
          onClick={onBackToDashboard}
        >
          <FaArrowLeft className="me-2" size={12} /> Kembali
        </Button>
      </div>

      {/* CARD 1: DATA PENDAFTAR */}
      <Card className="border-0 shadow-sm rounded-20 p-4 mb-4" style={{ borderColor: "#f1f5f9" }}>
        <Row className="align-items-center">
          <Col md={2} className="text-center text-md-start mb-3 mb-md-0">
            <div className="mx-auto mx-md-0 rounded-circle bg-soft-primary text-primary d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
              <FaUser size={36} />
            </div>
          </Col>
          <Col md={10}>
            <div className="d-flex flex-column gap-3">
              <Row className="border-bottom border-light pb-2">
                <Col xs={4} md={3} className="text-muted fw-medium small">Nama</Col>
                <Col xs={8} md={9} className="fw-bold text-dark text-start">{full_name || "-"}</Col>
              </Row>
              <Row className="border-bottom border-light pb-2">
                <Col xs={4} md={3} className="text-muted fw-medium small">Nomor Identitas (NIK)</Col>
                <Col xs={8} md={9} className="fw-bold text-dark text-start">{nik_ktp || "-"}</Col>
              </Row>
              <Row className="pb-1">
                <Col xs={4} md={3} className="text-muted fw-medium small">Status Anggota</Col>
                <Col xs={8} md={9} className="text-start">
                  <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill fw-bold" style={{ fontSize: "11px" }}>
                    {member?.status?.status_name || "Calon Anggota"}
                  </span>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </Card>

      {/* CARD 2: VERIFIKASI DOKUMEN FOTO */}
      <Card className="border-0 shadow-sm rounded-20 p-4 mb-4" style={{ borderColor: "#f1f5f9" }}>
        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
          <span className="bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
            <FaIdCard size={14} />
          </span>
          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "14px" }}>Verifikasi Dokumen</h6>
        </div>
        <Row className="g-3 mt-1">
          <Col md={6}>
            <div className="text-center p-3 border rounded-12 bg-light shadow-sm">
              <p className="small fw-bold text-muted mb-2">Foto KTP</p>
              <img
                src={getImgSrc(foto_ktp)}
                className="img-fluid rounded border shadow-sm"
                alt="KTP"
                style={{ maxHeight: "200px", objectFit: "contain", width: "100%", backgroundColor: "#fff" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x300?text=Gambar+Tidak+Ditemukan";
                }}
              />
            </div>
          </Col>
          <Col md={6}>
            <div className="text-center p-3 border rounded-12 bg-light shadow-sm">
              <p className="small fw-bold text-muted mb-2">Swafoto</p>
              <img
                src={getImgSrc(foto_swafoto)}
                className="img-fluid rounded border shadow-sm"
                alt="Selfie"
                style={{ maxHeight: "200px", objectFit: "contain", width: "100%", backgroundColor: "#fff" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "https://placehold.co/400x300?text=Gambar+Tidak+Ditemukan";
                }}
              />
            </div>
          </Col>
        </Row>
      </Card>

      {/* CARD 3: DETAIL DOMISILI */}
      <Card className="border-0 shadow-sm rounded-20 p-4 mb-4" style={{ borderColor: "#f1f5f9" }}>
        <div className="d-flex align-items-center border-bottom pb-3 mb-3">
          <span className="bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
            <FaMapMarkerAlt size={14} />
          </span>
          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "14px" }}>Detail Domisili (Sesuai KTP)</h6>
        </div>
        <div className="d-flex flex-column gap-3">
          <Row className="border-bottom border-light pb-2">
            <Col xs={4} md={3} className="text-muted fw-medium small">Provinsi</Col>
            <Col xs={8} md={9} className="fw-semibold text-dark text-start">{data?.provinsi || "-"}</Col>
          </Row>
          <Row className="border-bottom border-light pb-2">
            <Col xs={4} md={3} className="text-muted fw-medium small">Kota / Kabupaten</Col>
            <Col xs={8} md={9} className="fw-semibold text-dark text-start">{data?.kota_kab || "-"}</Col>
          </Row>
          <Row className="border-bottom border-light pb-2">
            <Col xs={4} md={3} className="text-muted fw-medium small">Kecamatan</Col>
            <Col xs={8} md={9} className="fw-semibold text-dark text-start">{data?.kecamatan || "-"}</Col>
          </Row>
          <Row className="border-bottom border-light pb-2">
            <Col xs={4} md={3} className="text-muted fw-medium small">Kelurahan</Col>
            <Col xs={8} md={9} className="fw-semibold text-dark text-start">{data?.kelurahan || "-"}</Col>
          </Row>
          <Row className="border-bottom border-light pb-2">
            <Col xs={4} md={3} className="text-muted fw-medium small">RT / RW</Col>
            <Col xs={8} md={9} className="fw-semibold text-dark text-start">RT.{data?.rt || "00"} / RW.{data?.rw || "00"}</Col>
          </Row>
          <Row className="pb-1">
            <Col xs={4} md={3} className="text-muted fw-medium small">Alamat Lengkap</Col>
            <Col xs={8} md={9} className="fw-semibold text-dark text-start">{address_ktp || "-"}</Col>
          </Row>
        </div>
      </Card>

      {/* CARD 4: STATUS PERSETUJUAN */}
      <Card className="border-0 shadow-sm rounded-20 p-4 mb-4" style={{ borderColor: "#f1f5f9" }}>
        <div className="d-flex align-items-center border-bottom pb-3 mb-4">
          <span className="bg-soft-primary text-primary rounded-8 p-2 me-2 d-inline-flex align-items-center justify-content-center" style={{ width: "32px", height: "32px" }}>
            <FaCheckCircle size={14} />
          </span>
          <h6 className="fw-bold mb-0 text-dark" style={{ fontSize: "14px" }}>Status Persetujuan</h6>
        </div>

        {/* Stepper container */}
        <div className="position-relative py-4">
          {/* Stepper connector line */}
          <div className="position-absolute top-50 start-50 translate-middle-y bg-light" style={{ height: "2px", zIndex: 1, left: "25%", right: "25%" }}></div>
          
          <Row className="position-relative justify-content-center" style={{ zIndex: 2 }}>
            <Col xs={5} md={4} className="text-center">
              <ApprovalPlaceholder
                role="Pengawas"
                isApproved={approvalStatus.pengawasDone}
                isRejected={approvalStatus.pengawasRejected}
                note={data?.approvals?.find(a => a.step?.verifierRole?.role_name === "Pengawas" || a.step?.step_order === 1)?.note || 
                       data?.approvals?.find(a => data?.flow?.steps?.find(s => s.approval_step_id === a.approval_step_id && s.step_order === 1))?.note}
              />
            </Col>
            <Col xs={5} md={4} className="text-center">
              <ApprovalPlaceholder
                role="Ketua"
                isApproved={approvalStatus.ketuaDone}
                isRejected={approvalStatus.ketuaRejected}
                note={data?.approvals?.find(a => a.step?.verifierRole?.role_name === "Ketua" || a.step?.step_order === 2)?.note || 
                       data?.approvals?.find(a => data?.flow?.steps?.find(s => s.approval_step_id === a.approval_step_id && s.step_order === 2))?.note}
              />
            </Col>
          </Row>
        </div>

        {/* Posisi berkas badge */}
        <div className="text-center mt-3">
          <div className="p-2 rounded-pill bg-light d-inline-block px-4 border border-light shadow-sm">
            <span className="small fw-bold text-muted">POSISI BERKAS: </span>
            <span className="small fw-bold text-primary">
              {final_status === "APPROVED" || final_status === "DISETUJUI"
                ? bill_id
                  ? "MENUNGGU PEMBAYARAN"
                  : "APPROVED"
                : approvalStatus.isRejected
                  ? "DITOLAK"
                  : approvalStatus.pengawasDone && !approvalStatus.ketuaDone
                    ? "DI APPROVAL KETUA"
                    : !approvalStatus.pengawasDone
                      ? "DI VERIFIKASI PENGAWAS"
                      : final_status?.toUpperCase() || "MENUNGGU ANTRIAN"}
            </span>
          </div>
        </div>
      </Card>

      {/* ACTION ACTIONS */}
      <div className="mt-4 d-grid gap-2">
        {approvalStatus.readyForInvoice && (
          <Button
            variant="success"
            className="w-100 fw-bold py-3 shadow-sm border-0 rounded-12 btn-gradient-success"
            onClick={handleNavigateToInvoice}
            style={{ fontSize: "15px", letterSpacing: "0.5px" }}
          >
            <FaFileInvoiceDollar className="me-2" /> BAYAR SIMPANAN SEKARANG
          </Button>
        )}
        <Button
          variant="link"
          className="w-100 text-decoration-none text-secondary fw-bold mt-2"
          onClick={onBackToDashboard}
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
}
