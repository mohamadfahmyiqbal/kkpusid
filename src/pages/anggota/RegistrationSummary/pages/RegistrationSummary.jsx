import React, { useCallback, useEffect, useState } from "react";
import { Card, Table, Row, Col, Button } from "react-bootstrap";
import {
  FaArrowLeft,
  FaFileInvoiceDollar,
  FaUser,
  FaIdCard,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import ApprovalPlaceholder from "../../../../components/ui/ApprovalPlaceholder";
import { jwtEncode } from "../../../../utils/helpers";
import InfoRow from "../components/InfoRow";
import useApprovalStatus from "../hooks/useApprovalStatus";
import useRegistrationSocket from "../hooks/useRegistrationSocket";

export default function RegistrationSummary({
  data: initialData,
  onBackToDashboard,
  baseUrl,
}) {
  const navigate = useNavigate();

  // State lokal untuk mendukung update real-time via Socket
  const [data, setData] = useState(initialData);

  // Sinkronisasi jika parent component melakukan re-fetch
  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  /**
   * SOCKET LISTENER
   */
  useRegistrationSocket(data?.registration_id, setData);

  const {
    registration_id,
    bill_id,
    full_name,
    nik_ktp,
    address_ktp,
    gender,
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
    console.log({
      page: "billingPage",
      registration_id: registration_id,
      billId: bill_id,
      category: "MEMBER_REGISTRATION",
      filter: {
        bill_type_id: [4, 5],
        registration_id: registration_id,
      },
      displayName: "Pendaftaran Anggota",
      return: "registrationPage",
    });

    const token = jwtEncode({
      page: "billingPage",
      registration_id: registration_id,
      billId: bill_id,
      category: "MEMBER_REGISTRATION",
      filter: {
        bill_type_id: [4, 5],
        registration_id: registration_id,
      },
      displayName: "Pendaftaran Anggota",
      return: "registrationPage",
    });

    navigate(`/${token}`);
  }, [navigate, registration_id, bill_id]);

  return (
    <div className="container-fluid py-3 bg-light min-vh-100">
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
              Data Pendaftar
            </span>
          </div>
          <div className="p-3 bg-white">
            <Table borderless size="sm" className="mb-0">
              <tbody>
                <InfoRow label="Nama Lengkap" value={full_name} isBoldValue />
                <InfoRow label="NIK KTP" value={nik_ktp} />
                <InfoRow label="Status" value={member?.status?.status_name} />
                <tr>
                  <td
                    colSpan="2"
                    className="p-2 rounded bg-light text-dark small mt-2"
                  >
                    <small className="d-block text-muted mb-1">
                      Alamat KTP:
                    </small>
                    {address_ktp}
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>

          <div className="px-3 py-2 bg-white border-bottom border-top d-flex align-items-center">
            <FaIdCard className="me-2 text-primary" size={14} />
            <span className="fw-bold small text-uppercase text-secondary">
              Verifikasi Dokumen
            </span>
          </div>
          <div className="p-3 bg-white">
            <Row className="g-2">
              <Col xs={6}>
                <img
                  src={foto_ktp}
                  className="img-fluid rounded border shadow-sm"
                  alt="KTP"
                />
                <p className="text-center small text-muted mt-1">Foto KTP</p>
              </Col>
              <Col xs={6}>
                <img
                  src={foto_swafoto}
                  className="img-fluid rounded border shadow-sm"
                  alt="Selfie"
                />
                <p className="text-center small text-muted mt-1">Swafoto</p>
              </Col>
            </Row>
          </div>

          <div className="px-3 py-4 border-top bg-white text-center">
            <p className="fw-bold small text-muted text-uppercase mb-3">
              Status Persetujuan
            </p>

            <div className="d-flex justify-content-around pb-2">
              <ApprovalPlaceholder
                role="Pengawas"
                isApproved={approvalStatus.pengawasDone}
              />
              <ApprovalPlaceholder
                role="Ketua"
                isApproved={approvalStatus.ketuaDone}
              />
            </div>

            <div className="mt-3 p-2 rounded-pill bg-light d-inline-block px-4 border shadow-sm">
              <span className="small fw-bold text-muted">POSISI BERKAS: </span>
              <span className="small fw-bold text-primary">
                {final_status === "APPROVED"
                  ? bill_id
                    ? "MENUNGGU PEMBAYARAN"
                    : "APPROVED"
                  : approvalStatus.pengawasDone && !approvalStatus.ketuaDone
                    ? "DI APPROVAL KETUA"
                    : !approvalStatus.pengawasDone
                      ? "DI VERIFIKASI PENGAWAS"
                      : final_status?.toUpperCase() || "MENUNGGU ANTRIAN"}
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
            <FaFileInvoiceDollar className="me-2" /> BAYAR SIMPANAN SEKARANG
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
