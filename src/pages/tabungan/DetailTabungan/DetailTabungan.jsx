import React, { useState, useEffect, useCallback } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import Swal from "sweetalert2";
import { jwtDecodePage, jwtEncode } from "../../../utils/helpers";
import http from "../../../utils/api/common";
import Alert from "../../../components/ui/SwalAlert";
import { useProfile } from "../../../components/layout/contexts";

import DetailSkeleton from "./components/DetailSkeleton";
import AccountInfoCard from "./components/AccountInfoCard";
import ActionButtonsCard from "./components/ActionButtonsCard";
import TransactionHistoryTable from "./components/TransactionHistoryTable";
import WithdrawalModal from "./components/WithdrawalModal";
import {
  TABUNGAN_CONFIG,
  normalizeBankName,
} from "./components/tabunganHelpers";
import "./DetailTabungan.css";

const DetailTabungan = () => {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const [productType, setProductType] = useState("haji");
  const [tabunganId, setTabunganId] = useState(null);
  const [accountData, setAccountData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [autoOpenWithdraw, setAutoOpenWithdraw] = useState(false);
  const [withdrawData, setWithdrawData] = useState({
    method: "TRANSFER",
    bank_name: "",
    bank_account_no: "",
    cash_name: "",
    cash_time: "",
    cash_location: "",
  });

  useEffect(() => {
    if (userData) {
      const rawBankName =
        userData.bank_name || userData.bank_info?.bank_name || "";
      const defaultBankName = normalizeBankName(rawBankName);
      const defaultAccountNo =
        userData.bank_account_no || userData.bank_info?.bank_account_no || "";

      setWithdrawData((prev) => ({
        ...prev,
        bank_name: prev.bank_name || defaultBankName,
        bank_account_no: prev.bank_account_no || defaultAccountNo,
      }));
    }
  }, [userData]);

  const productConfig = TABUNGAN_CONFIG[productType] || TABUNGAN_CONFIG.haji;

  useEffect(() => {
    const pathParts = window.location.pathname.split("/");
    const lastPart = pathParts[pathParts.length - 1];
    try {
      const decoded = jwtDecodePage(lastPart);
      if (decoded?.product && TABUNGAN_CONFIG[decoded.product]) {
        setProductType(decoded.product);
      }
      if (decoded?.tabunganId) {
        setTabunganId(decoded.tabunganId);
      }
      if (decoded?.action === "withdraw") {
        setAutoOpenWithdraw(true);
      }
    } catch (e) {
      console.error("Error decoding URL:", e);
    }

    // Mock data for now
    setTimeout(() => {
      setAccountData({
        accountNumber: "TBG-2024-001234",
        accountName: "Ahmad Fauzi",
        targetAmount: 25000000,
        currentBalance: 25000000,
        initialDeposit: 500000,
        tenor: 60,
        startDate: "2024-01-15",
        endDate: "2029-01-15",
        monthlyTarget: 416667,
        status: "active",
        transactions: [
          {
            date: "2024-01-15",
            type: "Setoran Awal",
            amount: 500000,
            balance: 500000,
          },
          {
            date: "2024-02-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 916667,
          },
          {
            date: "2024-03-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 1333334,
          },
          {
            date: "2024-04-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 1750001,
          },
          {
            date: "2024-05-15",
            type: "Setoran Bulanan",
            amount: 416667,
            balance: 2166668,
          },
        ],
      });
      setLoading(false);
    }, 1000);
  }, []);

  const progressPercentage = accountData
    ? Math.round((accountData.currentBalance / accountData.targetAmount) * 100)
    : 0;

  useEffect(() => {
    if (accountData && autoOpenWithdraw) {
      if (progressPercentage >= 100) {
        setShowWithdrawModal(true);
      }
      setAutoOpenWithdraw(false);
    }
  }, [accountData, autoOpenWithdraw, progressPercentage]);

  const handleSetoran = useCallback(() => {
    const token = jwtEncode({
      page: "setoranTabungan",
      product: productType,
    });
    navigate(`/${token}`);
  }, [navigate, productType]);

  const handlePengajuanBaru = useCallback(() => {
    const token = jwtEncode({
      page: "formPengajuanTabungan",
      product: productType,
    });
    navigate(`/${token}`);
  }, [navigate, productType]);

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "tabunganPage" });
    navigate(`/${token}`);
  }, [navigate]);

  const handlePencairanClick = useCallback(() => {
    if (progressPercentage < 100) {
      Swal.fire({
        title: "Perhatian",
        text: "Tabungan baru bisa dicairkan jika target nominal terpenuhi.",
        icon: "warning",
      });
      return;
    }
    setShowWithdrawModal(true);
  }, [progressPercentage]);

  const handleWithdrawSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const targetId =
        tabunganId || accountData?.memberSavingTargetId || "dummy-id";

      const payload = {
        method: withdrawData.method,
        bank_name:
          withdrawData.method === "TRANSFER" ? withdrawData.bank_name : null,
        bank_account_no:
          withdrawData.method === "TRANSFER"
            ? withdrawData.bank_account_no
            : null,
        cash_name:
          withdrawData.method === "TUNAI" ? withdrawData.cash_name : null,
        cash_time:
          withdrawData.method === "TUNAI" ? withdrawData.cash_time : null,
        cash_location:
          withdrawData.method === "TUNAI" ? withdrawData.cash_location : null,
      };

      const res = await http.post(
        `/tabungan/pengajuan/${targetId}/withdraw`,
        payload
      );

      const withdrawalId = res.data?.data?.withdrawal_id || res.data?.data?.id;

      setShowWithdrawModal(false);
      Swal.fire({
        title: "Berhasil",
        text: "Pengajuan pencairan tabungan berhasil dikirim. Menunggu persetujuan.",
        icon: "success",
      }).then(() => {
        const token = jwtEncode({
          page: "transactionDetailPage",
          withdrawalId: withdrawalId,
          tabunganId: targetId,
          return: "tabunganPage",
          product: productConfig?.label || "Tabungan",
        });
        navigate(`/${token}`);
      });
    } catch (err) {
      Swal.fire({
        title: "Gagal",
        text: err.response?.data?.message || "Gagal mengajukan pencairan",
        icon: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="detail-loading-state p-4">
        <div className="w-100" style={{ maxWidth: 800 }}>
          <div className="detail-tabungan-header pb-3 mb-4 border-bottom">
            <h3 className="fw-bold mb-0">Detail Tabungan</h3>
          </div>
          <DetailSkeleton />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="detail-error-state">
        <div className="w-100" style={{ maxWidth: 800 }}>
          <div className="detail-tabungan-header pb-3 mb-4 border-bottom">
            <h3 className="fw-bold mb-0">Detail Tabungan</h3>
          </div>
          <Alert variant="danger" className="shadow-sm">
            {error}
          </Alert>
          <Button
            variant="light"
            className="detail-back-btn px-4 py-2"
            onClick={handleBack}
          >
            <FaArrowLeft className="me-2" />
            Kembali
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="detail-tabungan-page pb-5">
      <div className="px-3">
        <div className="mx-auto" style={{ maxWidth: 900 }}>
          {/* Header */}
          <div className="detail-tabungan-header pt-3 pb-3 mb-4 border-bottom">
            <h3 className="fw-bold mb-0">Detail {productConfig.label}</h3>
          </div>

          <div className="detail-animate-fade-in">
            {/* Account Info Card */}
            <AccountInfoCard
              productConfig={productConfig}
              accountData={accountData}
              progressPercentage={progressPercentage}
            />

            {/* Action Buttons */}
            <ActionButtonsCard
              progressPercentage={progressPercentage}
              onSetoran={handleSetoran}
              onPencairan={handlePencairanClick}
              onPengajuanBaru={handlePengajuanBaru}
            />

            {/* Transaction History */}
            <TransactionHistoryTable
              transactions={accountData.transactions}
            />

            {/* Back Button */}
            <div className="mt-4">
              <Button
                variant="light"
                className="detail-back-btn px-4 py-2 fw-bold"
                onClick={handleBack}
              >
                <FaArrowLeft className="me-2" />
                Kembali
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Pencairan */}
      <WithdrawalModal
        show={showWithdrawModal}
        onHide={() => setShowWithdrawModal(false)}
        currentBalance={accountData?.currentBalance}
        withdrawData={withdrawData}
        onChange={setWithdrawData}
        onSubmit={handleWithdrawSubmit}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default DetailTabungan;