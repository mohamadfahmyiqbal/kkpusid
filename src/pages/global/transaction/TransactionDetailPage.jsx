import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHistory, FaCheckCircle, FaTimesCircle, FaClock, FaInfoCircle } from "react-icons/fa";

import { jwtEncode } from "../../../utils/helpers";
import USimpanan from "../../../utils/api/USimpanan";
import { useSocket } from "../../../components/layout/contexts";
import UJualBeli from "../../../utils/api/UJualBeli";
import api from "../../../utils/api/common";
import TabunganService from "../../../services/tabungan.service";

import MemberInfoSection from "./components/MemberInfoSection";
import PaymentDetailsSection from "./components/PaymentDetailsSection";
import ReturnInfoSection from "./components/ReturnInfoSection";
import FinancingDetailsSection from "./components/FinancingDetailsSection";
import TabunganDetailsSection from "./components/TabunganDetailsSection";
import ApprovalSection from "./components/ApprovalSection";
import ActionButtons from "./components/ActionButtons";
import SukukOrderSection from "./components/SukukOrderSection";

const LoadingSkeleton = () => (
  <div className="container-fluid py-4 px-3 px-md-4 min-vh-100 d-flex justify-content-center">
    <div className="w-100">
      <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
        <Card.Body className="p-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="mb-4">
              <div className="skeleton-box skeleton-title mb-3"></div>
              <div className="skeleton-box skeleton-line-full mb-2"></div>
              <div className="skeleton-box skeleton-line-partial"></div>
            </div>
          ))}
        </Card.Body>
      </Card>
    </div>
  </div>
);

const TransactionDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const isSukukOrder = !!decodedToken?.sukukOrder;
  const isFinancing = (!isSukukOrder && !!decodedToken?.financingId) || decodedToken?.action === "arisanEnrollment";
  const isTabungan = !!decodedToken?.tabunganId;
  const transactionId = isFinancing || isSukukOrder
    ? (decodedToken?.financingId || null)
    : isTabungan
      ? decodedToken?.tabunganId
      : decodedToken?.withdrawalId;
  const returnPage = decodedToken?.return || "dashboard";

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  const isPelunasan = detail?.category?.toLowerCase().includes('pelunasan') ||
                      detail?.item_name?.toLowerCase().includes('pelunasan') ||
                      detail?.product?.toLowerCase().includes('pelunasan');

  const fetchDetail = useCallback(
    async (showLoading = true) => {
      if (!transactionId) return;
      if (showLoading) setLoading(true);
      try {
        let res;
        if (isSukukOrder) res = await api.get(`/financing/sukuk/order/${transactionId}`);
        else if (isFinancing) res = await UJualBeli.getFinancingDetail(transactionId);
        else if (isTabungan) res = await TabunganService.getTabunganDetail(transactionId);
        else res = await USimpanan.getWithdrawalDetail(transactionId);

        if (res.data?.status || res.data?.success) {
          setDetail(res.data.data);
        }
      } catch (err) {
        console.error("Fetch Detail Error:", err);
      } finally {
        setLoading(false);
      }
    },
    [transactionId, isFinancing, isTabungan, isSukukOrder],
  );

  useEffect(() => {
    if (decodedToken?.data) {
      setDetail(decodedToken.data);
      setLoading(false);
      if (transactionId) {
        fetchDetail(false);
      }
    } else {
      fetchDetail(true);
    }
  }, [fetchDetail, decodedToken, transactionId]);

  const handleBack = () => {
    const isWithdrawal = !isFinancing && !isTabungan && !isSukukOrder;

    if (isFinancing && approvalStatus?.bendaharaDone && !approvalStatus?.isRejected) {
      if (isPelunasan) {
        const invoiceToken = jwtEncode({
          page: "invoicePage",
          financingId: transactionId,
          product: detail?.category || "Pelunasan Jual Beli",
          amount: detail?.total_tagihan || detail?.amount_requested,
          return: returnPage || "dashboard"
        });
        navigate(`/${invoiceToken}`);
        return;
      } else {
        const receiptToken = jwtEncode({ page: "receiptPage", financingId: transactionId });
        navigate(`/${receiptToken}`);
        return;
      }
    }

    if (isWithdrawal && approvalStatus?.bendaharaDone && !approvalStatus?.isRejected) {
      const receiptToken = jwtEncode({ page: "receiptPage", withdrawalId: transactionId });
      navigate(`/${receiptToken}`);
      return;
    }

    const backToken = jwtEncode({ page: returnPage });
    navigate(`/${backToken}`);
  };

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      const incomingId = data.entityId || data.financing_id || data.withdrawal_id || data.id;
      if (String(incomingId) === String(transactionId)) {
        fetchDetail(false);
      }
    };

    socket.on("REGISTRATION_UPDATED", handleUpdate);
    socket.on("TRANSACTION_UPDATED", handleUpdate);
    socket.on("withdrawals:update", handleUpdate);
    socket.on("financing_applications:update", handleUpdate);
    socket.on("member_saving_targets:update", handleUpdate);

    return () => {
      socket.off("REGISTRATION_UPDATED", handleUpdate);
      socket.off("TRANSACTION_UPDATED", handleUpdate);
      socket.off("withdrawals:update", handleUpdate);
      socket.off("financing_applications:update", handleUpdate);
      socket.off("member_saving_targets:update", handleUpdate);
    };
  }, [socket, transactionId, fetchDetail]);

  const approvalStatus = useMemo(() => {
    if (!detail) return null;

    const status = detail.status?.toUpperCase();
    const isApproved = status === "APPROVED" || status === "SUCCESS" || status === "PAID" || status === "COMPLETED" || status === "DISETUJUI";
    const isReadyToPay = status === "READY_TO_PAY" || status === "WAITING_PAYMENT";
    const isRejected = status === "REJECTED" || status === "DITOLAK" || detail.is_rejected;

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
      isReadyToPay: isReadyToPay || (allStepsDone && !isApproved && !isTabungan && !isFinancing),
      isApproved: isApproved || (allStepsDone && (isTabungan || isFinancing)),
      currentStatus: status || "PENDING"
    };
  }, [detail, isFinancing, isTabungan]);

  const getStatusBadge = () => {
    if (!detail) return null;
    const status = detail.status?.toUpperCase();

    if (status === "REJECTED" || approvalStatus?.isRejected) {
      return <Badge bg="danger" className="rounded-pill px-3 py-2"><FaTimesCircle className="me-1" /> DITOLAK</Badge>;
    }
    if (status === "WITHDRAWAL_REQUESTED") {
      return <Badge bg="info" className="rounded-pill px-3 py-2"><FaClock className="me-1" /> PENCAIRAN DIPROSES</Badge>;
    }
    if (status === "WITHDRAWN") {
      return <Badge bg="success" className="rounded-pill px-3 py-2"><FaCheckCircle className="me-1" /> SUDAH DICAIRKAN</Badge>;
    }
    if (status === "COMPLETED" || status === "PAID" || status === "SUCCESS" || status === "APPROVED" || approvalStatus?.isApproved) {
      return <Badge bg="success" className="rounded-pill px-3 py-2"><FaCheckCircle className="me-1" /> DISETUJUI / SELESAI</Badge>;
    }
    if (status === "READY_TO_PAY" || status === "WAITING_PAYMENT" || approvalStatus?.isReadyToPay) {
      return <Badge bg="primary" className="rounded-pill px-3 py-2"><FaCheckCircle className="me-1" /> MENUNGGU PEMBAYARAN</Badge>;
    }

    if (approvalStatus?.pengawasDone && !approvalStatus?.ketuaDone) {
      return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2"><FaClock className="me-1" /> MENUNGGU KETUA</Badge>;
    }
    if (approvalStatus?.pengawasDone && approvalStatus?.ketuaDone && !approvalStatus?.bendaharaDone) {
      return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2"><FaClock className="me-1" /> MENUNGGU BENDAHARA</Badge>;
    }

    return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2"><FaClock className="me-1" /> MENUNGGU PENGAWAS</Badge>;
  };

  if (loading) return <LoadingSkeleton />;

  const transactionType = isFinancing ? "pembiayaan" : isTabungan ? "tabungan" : isSukukOrder ? "sukuk" : "penarikan";

  return (
    <div className="bg-light min-vh-100 pb-5">
      <style>{`
        .skeleton-title { height: 18px; width: 140px; }
        .skeleton-line-full { height: 14px; width: 100%; }
        .skeleton-line-partial { height: 14px; width: 75%; }
        .status-label { letter-spacing: 0.08em; }
        .accent-header { height: 5px; }
        .accent-financing { background: linear-gradient(90deg, #0ea5e9, #0284c7); }
        .accent-default { background: linear-gradient(90deg, #10b981, #059669); }
        
        .tracking-wider { letter-spacing: 0.1em; }
        @keyframes skeletonPulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
        .skeleton-box {
          background: #f1f5f9;
          border-radius: 4px;
          animation: skeletonPulse 1.5s ease-in-out infinite;
        }
        .calc-card {
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 1px solid rgba(255,255,255,0.08) !important;
          border-radius: 20px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 15px 35px -5px rgba(15, 23, 42, 0.3);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .calc-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 20px 40px -5px rgba(15, 23, 42, 0.4);
        }
        .calc-card::before {
          content: "";
          position: absolute;
          width: 250px;
          height: 250px;
          background: radial-gradient(circle, rgba(56, 189, 248, 0.12) 0%, transparent 70%);
          top: -50px;
          right: -50px;
          border-radius: 50%;
          pointer-events: none;
        }
        .calc-card::after {
          content: "";
          position: absolute;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%);
          bottom: -50px;
          left: -50px;
          border-radius: 50%;
          pointer-events: none;
        }
        .calc-label {
          font-size: 11px;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          opacity: 0.7;
          font-weight: 600;
          color: #cbd5e1;
        }
        .calc-value-lg {
          font-size: 32px;
          font-weight: 800;
          letter-spacing: -1px;
          background: linear-gradient(to right, #38bdf8, #818cf8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .calc-row {
          display: flex;
          justify-content: space-between;
          padding: 12px 0;
          border-bottom: 1px dashed rgba(255,255,255,0.1);
          transition: background-color 0.2s ease, padding 0.2s ease;
        }
        .calc-row:hover {
          background-color: rgba(255,255,255,0.03);
          border-radius: 8px;
          padding-left: 10px;
          padding-right: 10px;
          margin-left: -10px;
          margin-right: -10px;
        }
        .calc-row:last-of-type { border-bottom: none; }
        .detail-label { font-size: 13.5px; color: #94a3b8; font-weight: 500; }
        .detail-val { font-size: 14px; font-weight: 600; color: #f8fafc; }
        .val-highlight { color: #38bdf8; font-weight: 700; }
        .section-divider { border: 0; border-top: 1px dashed #cbd5e1; margin: 1.5rem 0; opacity: 0.5; }
      `}</style>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container-fluid py-4 px-3 px-md-4"
      >
        <Row className="justify-content-center">
          <Col xs={12}>
            <Card className="border-0 shadow rounded-4 overflow-hidden mb-4">
              {/* Accent header */}
              <div
                className={`accent-header ${isFinancing ? 'accent-financing' : 'accent-default'}`}
              />

              <Card.Body className="p-4 p-md-5">
                {/* Member Info */}
                <MemberInfoSection detail={detail} isFinancing={isFinancing} />

                <hr className="section-divider" />

                {/* Content based on type */}
                {isSukukOrder ? (
                  <SukukOrderSection detail={detail} />
                ) : (
                  <>
                    {/* Operational cost alert */}
                    {isFinancing && detail?.operational_cost && parseFloat(detail.operational_cost) !== 0 && (
                      <div className="alert alert-info py-2 px-3 small d-flex align-items-center gap-2 mb-4 border-0 bg-info bg-opacity-10 text-info rounded-3">
                        <FaInfoCircle className="flex-shrink-0" />
                        <span>
                          Biaya operasional sebesar <strong>Rp {parseFloat(Math.abs(detail.operational_cost)).toLocaleString("id-ID")}</strong> telah{" "}
                          {parseFloat(detail.operational_cost) > 0 ? "ditambahkan ke" : "dikurangi dari"} pokok pembiayaan.
                        </span>
                      </div>
                    )}



                    {/* Sections */}
                    <PaymentDetailsSection detail={detail} isFinancing={isFinancing} isTabungan={isTabungan} />
                    {isFinancing ? (
                      <FinancingDetailsSection detail={detail} isPelunasan={isPelunasan} />
                    ) : isTabungan ? (
                      <TabunganDetailsSection detail={detail} />
                    ) : (
                      <ReturnInfoSection detail={detail} />
                    )}
                  </>
                )}

                <hr className="section-divider my-4" />

                <ApprovalSection approvalStatus={approvalStatus} detail={detail} />

                <div className="mt-4">
                  <ActionButtons
                    isFinancing={isFinancing}
                    isTabungan={isTabungan}
                    isSukukOrder={isSukukOrder}
                    transactionId={transactionId}
                    onBack={handleBack}
                    approvalStatus={approvalStatus}
                    productName={detail?.category}
                    detail={detail}
                  />
                </div>

                <hr className="section-divider my-4" />

                <div className="d-flex justify-content-between align-items-center bg-light p-3 rounded-3">
                  <div className="d-flex align-items-center gap-2 text-muted">
                    <FaHistory size={16} />
                    <span className="fw-semibold text-uppercase status-label">Status Transaksi</span>
                  </div>
                  <div>
                    {getStatusBadge()}
                  </div>
                </div>
              </Card.Body>
            </Card>

            {/* Footer */}
            <div className="text-center px-4">
              <small className="text-muted opacity-50">
                Jika ada pertanyaan mengenai status {transactionType} ini, silakan hubungi pengurus koperasi.
              </small>
            </div>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

export default TransactionDetailPage;