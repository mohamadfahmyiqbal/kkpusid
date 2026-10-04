import React from "react";
import { Badge } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

export const calculateApprovalStatus = (detail, isFinancing, isTabungan) => {
  if (!detail) return null;

  const status = detail.status?.toUpperCase();
  const isApproved =
    status === "APPROVED" ||
    status === "SUCCESS" ||
    status === "PAID" ||
    status === "COMPLETED" ||
    status === "DISETUJUI";
  const isReadyToPay =
    status === "READY_TO_PAY" || status === "WAITING_PAYMENT";
  const isRejected =
    status === "REJECTED" || status === "DITOLAK" || detail.is_rejected;

  const flags = detail.approval_status || detail;
  const pengawasDone = flags.is_approved_pengawas || false;
  const ketuaDone = flags.is_approved_ketua || false;
  const bendaharaDone = flags.is_approved_bendahara || false;

  const allStepsDone = pengawasDone && ketuaDone && bendaharaDone && !isRejected;

  let pengawasRejected = false;
  let ketuaRejected = false;
  let bendaharaRejected = false;

  if (isRejected) {
    if (!pengawasDone) {
      pengawasRejected = true;
    } else if (!ketuaDone) {
      ketuaRejected = true;
    } else {
      bendaharaRejected = true;
    }
  }

  return {
    pengawasDone,
    ketuaDone,
    bendaharaDone,
    pengawasRejected,
    ketuaRejected,
    bendaharaRejected,
    isRejected,
    isReadyToPay:
      isReadyToPay ||
      (allStepsDone && !isApproved && !isTabungan && !isFinancing),
    isApproved: isApproved || (allStepsDone && (isTabungan || isFinancing)),
    currentStatus: status || "PENDING",
  };
};

export const renderStatusBadge = (detail, approvalStatus) => {
  if (!detail) return null;
  const status = detail.status?.toUpperCase();

  if (status === "REJECTED" || approvalStatus?.isRejected) {
    return (
      <Badge bg="danger" className="rounded-pill px-3 py-2">
        <FaTimesCircle className="me-1" /> DITOLAK
      </Badge>
    );
  }
  if (status === "WITHDRAWAL_REQUESTED") {
    return (
      <Badge bg="info" className="rounded-pill px-3 py-2">
        <FaClock className="me-1" /> PENCAIRAN DIPROSES
      </Badge>
    );
  }
  if (status === "WITHDRAWN") {
    return (
      <Badge bg="success" className="rounded-pill px-3 py-2">
        <FaCheckCircle className="me-1" /> SUDAH DICAIRKAN
      </Badge>
    );
  }
  if (
    status === "COMPLETED" ||
    status === "PAID" ||
    status === "SUCCESS" ||
    status === "APPROVED" ||
    approvalStatus?.isApproved
  ) {
    return (
      <Badge bg="success" className="rounded-pill px-3 py-2">
        <FaCheckCircle className="me-1" /> DISETUJUI / SELESAI
      </Badge>
    );
  }
  if (
    status === "READY_TO_PAY" ||
    status === "WAITING_PAYMENT" ||
    approvalStatus?.isReadyToPay
  ) {
    return (
      <Badge bg="primary" className="rounded-pill px-3 py-2">
        <FaCheckCircle className="me-1" /> MENUNGGU PEMBAYARAN
      </Badge>
    );
  }

  if (approvalStatus?.pengawasDone && !approvalStatus?.ketuaDone) {
    return (
      <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">
        <FaClock className="me-1" /> MENUNGGU KETUA
      </Badge>
    );
  }
  if (
    approvalStatus?.pengawasDone &&
    approvalStatus?.ketuaDone &&
    !approvalStatus?.bendaharaDone
  ) {
    return (
      <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">
        <FaClock className="me-1" /> MENUNGGU BENDAHARA
      </Badge>
    );
  }

  return (
    <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2">
      <FaClock className="me-1" /> MENUNGGU PENGAWAS
    </Badge>
  );
};
