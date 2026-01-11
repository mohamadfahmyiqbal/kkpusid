// src/pages/global/transaction/TransactionDetailPage.jsx
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";
import USimpanan from "../../../utils/api/USimpanan";
import { useSocket } from "../../../contexts/SocketContext";
import UTransaksi from "../../../utils/api/UTransaksi";
import { useProfile } from "../../../contexts/ProfileContext";
import PageHeader from "./components/PageHeader";
import MemberInfoSection from "./components/MemberInfoSection";
import PaymentDetailsSection from "./components/PaymentDetailsSection";
import ReturnInfoSection from "./components/ReturnInfoSection";
import FinancingDetailsSection from "./components/FinancingDetailsSection";
import ApprovalSection from "./components/ApprovalSection";
import ActionButtons from "./components/ActionButtons";

const LoadingSpinner = () => (
  <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
    <Spinner animation="grow" variant="primary" />
  </div>
);

const TransactionDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();
  const { socketConnected } = useProfile();
  const isFinancing = !!decodedToken?.financingId;
  const transactionId = isFinancing
    ? decodedToken?.financingId
    : decodedToken?.withdrawalId;
  const returnPage = decodedToken?.return || "dashboard";
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  const fetchDetail = useCallback(
    async (showLoading = true) => {
      if (!transactionId) return;
      if (showLoading) setLoading(true);
      try {
        const res = isFinancing
          ? await UTransaksi.getFinancingDetail(transactionId)
          : await USimpanan.getWithdrawalDetail(transactionId);
        setDetail(res.data.data);
      } catch (err) {
      } finally {
        setLoading(false);
      }
    },
    [transactionId, isFinancing]
  );

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const handleBack = () => {
    const backToken = jwtEncode({ page: returnPage });
    navigate(`/${backToken}`);
  };

  useEffect(() => {
    if (!socket) return;
    const handleSocketUpdate = (data) => {
      if (String(data.entityId) === String(transactionId)) {
        fetchDetail(false);
      }
    };
    socket.on("REGISTRATION_UPDATED", handleSocketUpdate);
    socket.on("TRANSACTION_UPDATED", handleSocketUpdate);
    socket.on("withdrawals:update", (data) => {
      const hasMatchingWithdrawal = data.withdrawals?.some(
        (w) => String(w.withdrawal_id) === String(transactionId)
      );
      if (hasMatchingWithdrawal) {
        fetchDetail(false);
      }
    });
    return () => {
      socket.off("REGISTRATION_UPDATED", handleSocketUpdate);
      socket.off("TRANSACTION_UPDATED", handleSocketUpdate);
      socket.off("withdrawals:update", handleSocketUpdate);
    };
  }, [socket, transactionId, fetchDetail]);

  const approvalStatus = useMemo(() => {
    if (!detail) return null;

    return {
      pengawasDone: detail.is_approved_pengawas || false,
      ketuaDone: detail.is_approved_ketua || false,
      bendaharaDone: detail.is_approved_bendahara || false,
      isRejected: detail.is_rejected || false,
      isReadyToPay: detail.status === "READY_TO_PAY" || false,
    };
  }, [detail]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="container-fluid py-3 bg-light min-vh-100">
      <PageHeader isFinancing={isFinancing} onBack={handleBack} />
      <Row className="justify-content-center">
        <Col xs={12} md={10} lg={8}>
          <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
            <Card.Body className="p-4">
              <MemberInfoSection detail={detail} isFinancing={isFinancing} />
              <PaymentDetailsSection
                detail={detail}
                isFinancing={isFinancing}
              />
              {!isFinancing && <ReturnInfoSection detail={detail} />}
              {isFinancing && <FinancingDetailsSection detail={detail} />}
              <ApprovalSection approvalStatus={approvalStatus} />
              <ActionButtons
                isFinancing={isFinancing}
                transactionId={transactionId}
                onBack={handleBack}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default TransactionDetailPage;
