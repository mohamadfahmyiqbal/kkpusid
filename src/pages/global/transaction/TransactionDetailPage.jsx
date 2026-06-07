import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, Row, Col, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaHistory, FaCheckCircle, FaTimesCircle, FaClock } from "react-icons/fa";

import { jwtEncode } from "../../../utils/helpers";
import USimpanan from "../../../utils/api/USimpanan";
import { useSocket } from "../../../components/layout/contexts";
import UTransaksi from "../../../utils/api/UTransaksi";
import api from "../../../utils/api/common";


import MemberInfoSection from "./components/MemberInfoSection";
import PaymentDetailsSection from "./components/PaymentDetailsSection";
import ReturnInfoSection from "./components/ReturnInfoSection";
import FinancingDetailsSection from "./components/FinancingDetailsSection";
import TabunganDetailsSection from "./components/TabunganDetailsSection";
import ApprovalSection from "./components/ApprovalSection";
import ActionButtons from "./components/ActionButtons";
import SukukOrderSection from "./components/SukukOrderSection";

const LoadingSkeleton = () => (
  <div className="container-fluid px-0 py-4 bg-light min-vh-100">
    <Row className="justify-content-center">
      <Col xs={12} md={10} lg={8}>
        <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
          <Card.Body className="p-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="mb-4">
                <div className="skeleton-title mb-3" style={{ height: "20px", width: "150px", background: "#f1f5f9", borderRadius: "4px" }}></div>
                <div className="skeleton-line mb-2" style={{ height: "14px", width: "100%", background: "#f8fafc", borderRadius: "4px" }}></div>
                <div className="skeleton-line" style={{ height: "14px", width: "80%", background: "#f8fafc", borderRadius: "4px" }}></div>
              </div>
            ))}
          </Card.Body>
        </Card>
      </Col>
    </Row>
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

  const fetchDetail = useCallback(
    async (showLoading = true) => {
      if (!transactionId) return;
      if (showLoading) setLoading(true);
      try {
        let res;
        if (isSukukOrder) res = await api.get(`/financing/sukuk/order/${transactionId}`);
        else if (isFinancing) res = await UTransaksi.getFinancingDetail(transactionId);
        else if (isTabungan) res = await USimpanan.getTabunganDetail(transactionId);
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
    console.log('[TxDetail] decodedToken:', decodedToken);
    console.log('[TxDetail] isSukukOrder:', isSukukOrder, '| transactionId:', transactionId);
    if (decodedToken?.data) {
      setDetail(decodedToken.data);
      setLoading(false);
      // Tetap fetch dari backend jika ada ID untuk update status persetujuan
      if (transactionId) {
        fetchDetail(false);
      }
    } else {
      fetchDetail(true);
    }
  }, [fetchDetail, decodedToken, transactionId]);

  const handleBack = () => {
    const backToken = jwtEncode({ page: returnPage });
    navigate(`/${backToken}`);
  };

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      const incomingId = data.entityId || data.financing_id || data.withdrawal_id || data.id;
      if (String(incomingId) === String(transactionId)) {
        console.log("⚡ Refreshing detail due to socket update");
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
    
    // Status normalization
    const status = detail.status?.toUpperCase();
    const isApproved = status === "APPROVED" || status === "SUCCESS" || status === "PAID" || status === "COMPLETED";
    const isReadyToPay = status === "READY_TO_PAY" || status === "WAITING_PAYMENT";
    const isRejected = status === "REJECTED" || detail.is_rejected;

    // Support for both flat detail and nested approval_status
    const flags = detail.approval_status || detail;
    const pengawasDone = flags.is_approved_pengawas || false;
    const ketuaDone = flags.is_approved_ketua || false;
    const bendaharaDone = flags.is_approved_bendahara || false;

    // Logic: If all 3 steps are done, it's effectively approved even if status hasn't transitioned yet
    const allStepsDone = pengawasDone && ketuaDone && bendaharaDone && !isRejected;

    return {
      pengawasDone,
      ketuaDone,
      bendaharaDone,
      isRejected,
      isReadyToPay: isReadyToPay || (allStepsDone && !isApproved && !isTabungan && !isFinancing), // Only auto-ready for non-fin/tab (like withdrawal)
      isApproved: isApproved || (allStepsDone && (isTabungan || isFinancing)),
      currentStatus: status || "PENDING"
    };
  }, [detail, isFinancing, isTabungan]);

  const getStatusBadge = () => {
    if (!detail) return null;
    const status = detail.status?.toUpperCase();
    
    if (status === "REJECTED" || approvalStatus?.isRejected) {
      return <Badge bg="danger" className="rounded-pill px-3 py-2"><FaTimesCircle className="me-1"/> DITOLAK</Badge>;
    }
    if (status === "COMPLETED" || status === "PAID" || status === "SUCCESS" || status === "APPROVED" || approvalStatus?.isApproved) {
      return <Badge bg="success" className="rounded-pill px-3 py-2"><FaCheckCircle className="me-1"/> DISETUJUI / SELESAI</Badge>;
    }
    if (status === "READY_TO_PAY" || status === "WAITING_PAYMENT" || approvalStatus?.isReadyToPay) {
      return <Badge bg="primary" className="rounded-pill px-3 py-2"><FaCheckCircle className="me-1"/> MENUNGGU PEMBAYARAN</Badge>;
    }

    // Tampilkan progres persetujuan spesifik
    if (approvalStatus?.pengawasDone && !approvalStatus?.ketuaDone) {
      return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2"><FaClock className="me-1"/> MENUNGGU KETUA</Badge>;
    }
    if (approvalStatus?.pengawasDone && approvalStatus?.ketuaDone && !approvalStatus?.bendaharaDone) {
      return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2"><FaClock className="me-1"/> MENUNGGU BENDAHARA</Badge>;
    }
    
    return <Badge bg="warning" text="dark" className="rounded-pill px-3 py-2"><FaClock className="me-1"/> MENUNGGU PENGAWAS</Badge>;
  };

  if (loading) return <LoadingSkeleton />;

  return (
    <div className="transaction-detail-wrapper bg-light min-vh-100 pb-5">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container-fluid px-0"
      >
        {/* Status Info Card - Sekarang sejajar dengan PageHeader */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex align-items-center gap-2 text-secondary">
            <FaHistory />
            <span className="small fw-bold text-uppercase tracking-wider">Status Pengajuan</span>
          </div>
          {getStatusBadge()}
        </div>

        <Row className="justify-content-center">
          <Col xs={12} md={12} lg={12}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden mb-4">
              <Card.Body className="p-0">
                {/* Header Accent */}
                <div 
                  style={{ 
                    height: "6px", 
                    background: isFinancing 
                      ? "linear-gradient(90deg, #0ea5e9, #0284c7)" 
                      : "linear-gradient(90deg, #10b981, #059669)" 
                  }} 
                />
                
                <div className="p-4 p-md-5">
                  <MemberInfoSection detail={detail} isFinancing={isFinancing} />
                  
                  <hr className="my-4 opacity-10" />
                  
                  {isSukukOrder ? (
                    <SukukOrderSection detail={detail} />
                  ) : (
                    <>
                      <PaymentDetailsSection
                        detail={detail}
                        isFinancing={isFinancing}
                        isTabungan={isTabungan}
                      />
                      {isFinancing ? (
                        <FinancingDetailsSection detail={detail} />
                      ) : isTabungan ? (
                        <TabunganDetailsSection detail={detail} />
                      ) : (
                        <ReturnInfoSection detail={detail} />
                      )}
                    </>
                  )}

                  <div className="my-5">
                    <ApprovalSection approvalStatus={approvalStatus} />
                  </div>

                  <ActionButtons
                    isFinancing={isFinancing}
                    isTabungan={isTabungan}
                    isSukukOrder={isSukukOrder}
                    transactionId={transactionId}
                    onBack={handleBack}
                    approvalStatus={approvalStatus}
                    productName={detail?.category}
                  />
                </div>
              </Card.Body>
            </Card>

            {/* Footer Note */}
            <div className="text-center px-4 opacity-50">
              <small className="text-muted">
                Jika ada pertanyaan mengenai status {isFinancing ? "pembiayaan" : isTabungan ? "pengajuan tabungan" : "penarikan"} ini, 
                silakan hubungi pengurus koperasi.
              </small>
            </div>
          </Col>
        </Row>
      </motion.div>

      <style>{`
        .tracking-wider { letter-spacing: 0.1em; }
        .skeleton-header { animation: pulse 2s infinite; }
        .skeleton-title { animation: pulse 2s infinite; }
        .skeleton-line { animation: pulse 2s infinite; }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }
      `}</style>
    </div>
  );
};

export default TransactionDetailPage;
