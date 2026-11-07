import React, { useEffect, useState, useCallback, useMemo } from "react";
import PropTypes from "prop-types";
import { Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { jwtEncode } from "../../../utils/helpers";
import USimpanan from "../../../utils/api/USimpanan";
import { useSocket } from "../../../components/layout/contexts";
import UJualBeli from "../../../utils/api/UJualBeli";
import api from "../../../utils/api/common";
import TabunganService from "../../../services/tabungan.service";

import MemberInfoSection from "./components/MemberInfoSection";
import ApprovalSection from "./components/ApprovalSection";
import ActionButtons from "./components/ActionButtons";
import TransactionDetailSkeleton from "./components/TransactionDetailSkeleton";
import TransactionBodyContent from "./components/TransactionBodyContent";
import TransactionStatusFooter from "./components/TransactionStatusFooter";
import { calculateApprovalStatus } from "./components/transactionDetailHelpers";

import "./TransactionDetailPage.css";

const TransactionDetailPage = ({ decodedToken }) => {
  const navigate = useNavigate();
  const { socket } = useSocket();

  const isSukukOrder = !!decodedToken?.sukukOrder;
  const isFinancing =
    (!isSukukOrder && !!decodedToken?.financingId) ||
    decodedToken?.action === "arisanEnrollment";
  const isTabungan = !!decodedToken?.tabunganId;
  const transactionId =
    isFinancing || isSukukOrder
      ? decodedToken?.financingId || null
      : isTabungan
      ? decodedToken?.tabunganId
      : decodedToken?.withdrawalId;
  const returnPage = decodedToken?.return || "dashboard";

  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState(null);

  const isPelunasan =
    detail?.category?.toLowerCase().includes("pelunasan") ||
    detail?.item_name?.toLowerCase().includes("pelunasan") ||
    detail?.product?.toLowerCase().includes("pelunasan");

  const fetchDetail = useCallback(
    async (showLoading = true) => {
      if (!transactionId) return;
      if (showLoading) setLoading(true);
      try {
        let res;
        if (isSukukOrder)
          res = await api.get(`/financing/sukuk/order/${transactionId}`);
        else if (isFinancing)
          res = await UJualBeli.getFinancingDetail(transactionId);
        else if (isTabungan)
          res = await TabunganService.getTabunganDetail(transactionId);
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
    [transactionId, isFinancing, isTabungan, isSukukOrder]
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

  const approvalStatus = useMemo(
    () => calculateApprovalStatus(detail, isFinancing, isTabungan),
    [detail, isFinancing, isTabungan]
  );

  const handleBack = useCallback(() => {
    const isWithdrawal = !isFinancing && !isTabungan && !isSukukOrder;

    if (
      isFinancing &&
      approvalStatus?.bendaharaDone &&
      !approvalStatus?.isRejected
    ) {
      if (isPelunasan) {
        const invoiceToken = jwtEncode({
          page: "invoicePage",
          financingId: transactionId,
          product: detail?.category || "Pelunasan Jual Beli",
          amount: detail?.total_tagihan || detail?.amount_requested,
          return: returnPage || "dashboard",
        });
        navigate(`/${invoiceToken}`);
        return;
      } else {
        const receiptToken = jwtEncode({
          page: "receiptPage",
          financingId: transactionId,
        });
        navigate(`/${receiptToken}`);
        return;
      }
    }

    if (
      isWithdrawal &&
      approvalStatus?.bendaharaDone &&
      !approvalStatus?.isRejected
    ) {
      const receiptToken = jwtEncode({
        page: "receiptPage",
        withdrawalId: transactionId,
      });
      navigate(`/${receiptToken}`);
      return;
    }

    const backToken = jwtEncode({ page: returnPage });
    navigate(`/${backToken}`);
  }, [
    isFinancing,
    isTabungan,
    isSukukOrder,
    approvalStatus,
    isPelunasan,
    detail,
    transactionId,
    returnPage,
    navigate,
  ]);

  useEffect(() => {
    if (!socket) return;

    const handleUpdate = (data) => {
      const incomingId =
        data.entityId || data.financing_id || data.withdrawal_id || data.id;
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

  if (loading) return <TransactionDetailSkeleton />;

  const transactionType = isFinancing
    ? "pembiayaan"
    : isTabungan
    ? "tabungan"
    : isSukukOrder
    ? "sukuk"
    : "penarikan";

  return (
    <div className="bg-light min-vh-100 pb-5">
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
                className={`accent-header ${
                  isFinancing ? "accent-financing" : "accent-default"
                }`}
              />

              <Card.Body className="p-4 p-md-5">
                {/* Member Info */}
                <MemberInfoSection detail={detail} isFinancing={isFinancing} />

                <hr className="section-divider" />

                {/* Content based on type */}
                <TransactionBodyContent
                  detail={detail}
                  isSukukOrder={isSukukOrder}
                  isFinancing={isFinancing}
                  isTabungan={isTabungan}
                  isPelunasan={isPelunasan}
                />

                <hr className="section-divider my-4" />

                <ApprovalSection
                  approvalStatus={approvalStatus}
                  detail={detail}
                />

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
                    returnPage={returnPage}
                  />
                </div>

                <hr className="section-divider my-4" />

                <TransactionStatusFooter
                  detail={detail}
                  approvalStatus={approvalStatus}
                  transactionType={transactionType}
                />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </motion.div>
    </div>
  );
};

TransactionDetailPage.propTypes = {
  decodedToken: PropTypes.shape({
    sukukOrder: PropTypes.any,
    financingId: PropTypes.any,
    tabunganId: PropTypes.any,
    withdrawalId: PropTypes.any,
    action: PropTypes.string,
    return: PropTypes.string,
    data: PropTypes.object,
  }),
};

export default TransactionDetailPage;