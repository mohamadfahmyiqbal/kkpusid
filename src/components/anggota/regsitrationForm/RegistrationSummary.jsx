import React, { useMemo, useCallback, useEffect, useState } from "react";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaFileInvoiceDollar,
  FaUser,
  FaIdCard,
  FaInfoCircle,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApprovalPlaceholder from "../../ui/ApprovalPlaceholder";
import { jwtEncode } from "../../../routes/helpers";
import useSocketListener from "../../../utils/helper/SocketListener";

export default function RegistrationSummary({
  data: initialData,
  onBackToDashboard,
  baseUrl,
}) {
  const navigate = useNavigate();

  // 1. Local State untuk menampung data pendaftaran
  const [data, setData] = useState(initialData);

  // Update state jika initialData dari props berubah
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /**
   * 2. Implementasi useSocketListener
   * Hook ini akan otomatis mendengarkan event "TRANSACTION_UPDATED"
   * dan "REGISTRATION_UPDATED" dari backend.
   */
  useSocketListener((payload) => {
    // Validasi: Pastikan update ini milik pendaftaran yang sedang dibuka
    if (
      payload.entityId === String(data?.registration_id) &&
      payload.entityRef === "member_registration"
    ) {
      console.log("✅ Update status diterima via Socket:", payload.status);
      setData((prev) => ({
        ...prev,
        registration_status: payload.status,
      }));
    }
  });

  const {
    registration_id,
    bill_id,
    full_name,
    nik_ktp,
    address_ktp,
    phone_number,
    email,
    member_type,
    display_member_type,
    gender,
    ktp_photo_path,
    selfie_photo_path,
    ktp_photo_base64,
    selfie_photo_base64,
    registration_status,
  } = data || {};

  // 3. Logika Stepping sesuai ENUM Database (Gambar Anda)
  const approvalStatus = useMemo(() => {
    const s = registration_status;

    // Tahap Pengawas: Selesai jika status bukan lagi 'approval_pengawas'
    const pengawasDone = [
      "approval_ketua",
      "menunggu_pembayaran",
      "pembayaran",
      "selesai",
    ].includes(s);

    // Tahap Ketua: Selesai jika status masuk tahap pembayaran/selesai
    const ketuaDone = ["menunggu_pembayaran", "pembayaran", "selesai"].includes(
      s
    );

    // Invoice muncul saat status 'menunggu_pembayaran' (setelah Ketua Approve)
    const readyForInvoice = [
      "menunggu_pembayaran",
      "pembayaran",
      "selesai",
    ].includes(s);

    return { pengawasDone, ketuaDone, readyForInvoice };
  }, [registration_status]);

  // Handler Navigasi ke Invoice
  // Di dalam RegistrationSummary.jsx
  const handleNavigateToInvoice = useCallback(() => {
    const targetId = bill_id || registration_id;
    if (!targetId) {
      alert("Data tagihan belum tersedia.");
      return;
    }

    // SINKRONISASI: Token ini harus bisa dibaca oleh decodedToken di BillingPage
    const token = jwtEncode({
      page: "billingPage",
      registrationId: registration_id,
      billId: targetId,
      // Parameter 'category' memicu mode "Daftar Tagihan" (Bukan Sukarela)
      category: "MEMBER_REGISTRATION",
      // Parameter 'filter' membatasi hanya muncul Simpanan Pokok (1) & Wajib (2)
      filter: {
        bill_type_id: [1, 2],
        registration_id: registration_id,
      },
      displayName: "Pendaftaran Anggota",
      return: "registrationPage", // Halaman tujuan saat klik 'Back' di Billing
    });

    navigate(`/${token}`);
  }, [navigate, registration_id, bill_id]);

  // Helper Gambar
  const getDisplayImage = (base64, path) => {
    if (base64?.startsWith("data:image")) return base64;
    if (!path) return "https://via.placeholder.com/150?text=No+Image";
    const cleanBase = baseUrl?.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    return `${cleanBase}/${cleanPath}`;
  };

  const InfoRow = ({ label, value, isBoldValue = false }) => (
    <tr>
      <td
        className="text-muted py-2 fw-bold"
        style={{ fontSize: "13px", border: "none", width: "40%" }}
      >
        {label}
      </td>
      <td
        className={`text-end py-2 ${isBoldValue ? "fw-bold text-primary" : ""}`}
        style={{ fontSize: "13px", border: "none" }}
      >
        {value || "-"}
      </td>
    </tr>
  );

  return (
    <div className="container-fluid py-3 bg-light min-vh-100">
      {/* Header */}
      <div className="d-flex align-items-center mb-4 px-2">
        <FaArrowLeft
          onClick={onBackToDashboard}
          style={{ cursor: "pointer" }}
          className="me-3 text-secondary"
        />
        <h5 className="mb-0 fw-bold">Ringkasan Pendaftaran</h5>
      </div>

      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <Card.Body className="p-0">
          <div className="px-3 py-2 bg-white border-bottom d-flex align-items-center">
            <FaUser className="me-2 text-primary" size={14} />
            <span className="fw-bold small text-uppercase text-secondary">
              Informasi Pribadi
            </span>
          </div>
          <div className="p-3 bg-white">
            <Table borderless size="sm" className="mb-0">
              <tbody>
                <InfoRow label="Nama Lengkap" value={full_name} isBoldValue />
                <InfoRow label="NIK KTP" value={nik_ktp} />
                <InfoRow label="Jenis Kelamin" value={gender} />
                <tr>
                  <td
                    colSpan="2"
                    className="p-2 rounded bg-light text-dark small mt-2"
                  >
                    {address_ktp}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="px-3 py-2 bg-white border-bottom border-top d-flex align-items-center">
            <FaIdCard className="me-2 text-primary" size={14} />
            <span className="fw-bold small text-uppercase text-secondary">
              Dokumen Identitas
            </span>
          </div>
          <div className="p-3 bg-white">
            <Row className="g-2">
              <Col xs={6}>
                <img
                  src={getDisplayImage(ktp_photo_base64, ktp_photo_path)}
                  className="img-fluid rounded border shadow-sm"
                  alt="KTP"
                />
              </Col>
              <Col xs={6}>
                <img
                  src={getDisplayImage(selfie_photo_base64, selfie_photo_path)}
                  className="img-fluid rounded border shadow-sm"
                  alt="Selfie"
                />
              </Col>
            </Row>
          </div>

          {/* Progress Status (Real-time) */}
          <div className="px-3 py-4 border-top bg-white text-center">
            <p className="fw-bold small text-muted text-uppercase mb-3">
              Progress Persetujuan
            </p>
            <div
              className="d-flex justify-content-around pb-2"
              key={registration_status}
            >
              <ApprovalPlaceholder
                role="Pengawas"
                isApproved={approvalStatus.pengawasDone}
              />
              <ApprovalPlaceholder
                role="Ketua"
                isApproved={approvalStatus.ketuaDone}
              />
            </div>
            <div className="mt-3 p-2 rounded-pill bg-light d-inline-block px-4 border">
              <span className="small fw-bold text-muted">STATUS: </span>
              <span className="small fw-bold text-primary">
                {registration_status?.replace(/_/g, " ").toUpperCase()}
              </span>
            </div>
          </div>
        </Card.Body>
      </Card>

      <div className="mt-4 px-2 d-grid gap-2">
        {approvalStatus.readyForInvoice && (
          <Button
            variant="success"
            className="w-100 fw-bold py-3 shadow-sm border-0 rounded-3 animate__animated animate__pulse animate__infinite"
            onClick={handleNavigateToInvoice}
          >
            <FaFileInvoiceDollar className="me-2" /> BAYAR SEKARANG
          </Button>
        )}
        <Button
          variant="link"
          className="w-100 text-decoration-none text-secondary fw-bold"
          onClick={onBackToDashboard}
        >
          Kembali ke Dashboard
        </Button>
      </div>
    </div>
  );
}
