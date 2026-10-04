// pages/global/ReceiptPage/ReceiptPage.jsx
// Halaman Resi Pembayaran / Penarikan

import React, { useState, useEffect, useRef } from "react";
import { Container, Card, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import html2pdf from "html2pdf.js";
import { jwtEncode } from "../../../utils/helpers";

import ReceiptHeaderActions from "./components/ReceiptHeaderActions";
import ReceiptBanner from "./components/ReceiptBanner";
import ReceiptMemberInfo from "./components/ReceiptMemberInfo";
import ReceiptDetailsTable from "./components/ReceiptDetailsTable";
import ReceiptLegalDocuments from "./components/ReceiptLegalDocuments";
import ReceiptApprovalChain from "./components/ReceiptApprovalChain";
import ReceiptTransferProof from "./components/ReceiptTransferProof";
import ReceiptTotalSummary from "./components/ReceiptTotalSummary";
import { API_BASE_URL } from "./components/receiptHelpers";
import "./ReceiptPage.css";

export default function ReceiptPage({ decodedToken }) {
  const navigate = useNavigate();
  const [receiptData, setReceiptData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const receiptRef = useRef(null);

  const financingId = decodedToken?.financingId;
  const withdrawalId = decodedToken?.withdrawalId;
  const isWithdrawal = !!withdrawalId;

  const fetchReceiptData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const baseUrl = API_BASE_URL.endsWith("/api")
        ? API_BASE_URL.slice(0, -4)
        : API_BASE_URL;

      const endpoint = isWithdrawal
        ? `/api/simpanan/penarikan/detail/${withdrawalId}`
        : `/api/financing/detail/${financingId}`;

      const response = await fetch(`${baseUrl}${endpoint}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil data resi");
      }

      return result;
    } catch (error) {
      console.error("Error fetching receipt:", error);
      throw error;
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!financingId && !withdrawalId) {
          throw new Error("ID Transaksi tidak ditemukan.");
        }

        const result = await fetchReceiptData();

        const flags = result.data?.approval_status || result.data || {};
        const pengawasDone = flags.is_approved_pengawas || false;
        const ketuaDone = flags.is_approved_ketua || false;
        const bendaharaDone = flags.is_approved_bendahara || false;

        const isAllApproved = pengawasDone && ketuaDone && bendaharaDone;

        if (!isAllApproved) {
          throw new Error("Transaksi belum disetujui sepenuhnya.");
        }

        setReceiptData(result.data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Gagal Memuat Resi",
          text: error.message,
          confirmButtonText: "Kembali",
          confirmButtonColor: "#dc3545",
        }).then(() => {
          navigate(`/${jwtEncode({ page: "programPage" })}`);
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [financingId, withdrawalId, isWithdrawal, navigate]);

  const handleDownloadPDF = () => {
    const element = receiptRef.current;
    if (!element) return;

    Swal.fire({
      title: "Memproses PDF...",
      text: "Mohon tunggu sebentar",
      allowOutsideClick: false,
      didOpen: () => Swal.showLoading(),
    });

    const fileName = `Resi_${isWithdrawal ? "Penarikan" : "Pinjaman"}_${
      isWithdrawal
        ? receiptData.id || receiptData.withdrawal_id
        : receiptData.financing_id
    }.pdf`;

    const opt = {
      margin: 0.5,
      filename: fileName,
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, logging: false },
      jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
    };

    html2pdf()
      .set(opt)
      .from(element)
      .outputPdf("bloburl")
      .then((pdfUrl) => {
        Swal.close();
        window.open(pdfUrl, "_blank");
      })
      .catch((err) => {
        Swal.close();
        console.error(err);
        Swal.fire("Error", "Gagal memproses PDF", "error");
      });
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
        <div className="text-center">
          <Spinner animation="grow" variant="primary" />
          <p className="mt-3 text-muted fw-semibold">Menyiapkan Resi Anda...</p>
        </div>
      </div>
    );
  }

  if (!receiptData) {
    return null;
  }

  const approvalFlags = receiptData.approval_status || receiptData || {};
  const isPaid = true; // Always true since this page is only for approved receipts
  const isPendanaanSyariah =
    receiptData?.category === "Pendanaan Syariah UMKM" ||
    receiptData?.category === "Pendanaan Syariah";

  return (
    <Container fluid className="py-3 px-0">
      {/* Header Actions */}
      <ReceiptHeaderActions
        onBack={() => navigate(-1)}
        onPrint={() => window.print()}
        onDownloadPDF={handleDownloadPDF}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div ref={receiptRef}>
          <Card className="border-0 shadow-lg rounded-4 overflow-hidden position-relative print-area bg-white">
            <ReceiptBanner isWithdrawal={isWithdrawal} isPaid={isPaid} />

            <Card.Body
              className="p-4 p-md-5 position-relative"
              style={{ zIndex: 1 }}
            >
              <ReceiptMemberInfo
                receiptData={receiptData}
                isWithdrawal={isWithdrawal}
              />

              <ReceiptDetailsTable
                receiptData={receiptData}
                isWithdrawal={isWithdrawal}
                isPendanaanSyariah={isPendanaanSyariah}
              />

              {isPendanaanSyariah && (
                <ReceiptLegalDocuments receiptData={receiptData} />
              )}

              <ReceiptApprovalChain approvalFlags={approvalFlags} />

              <ReceiptTransferProof
                receiptData={receiptData}
                isWithdrawal={isWithdrawal}
              />

              <ReceiptTotalSummary
                receiptData={receiptData}
                isWithdrawal={isWithdrawal}
              />
            </Card.Body>
          </Card>
        </div>
      </motion.div>

      {/* Footer Branding */}
      <div className="text-center mt-5 d-print-none opacity-50">
        <small className="text-muted">
          &copy; {new Date().getFullYear()} Koperasi Digital - System Generated Receipt
        </small>
      </div>
    </Container>
  );
}
