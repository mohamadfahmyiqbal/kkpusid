// pages/transaksi/TransaksiDashboardPage.jsx (Final Optimized)

import React, { useCallback } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaListAlt, FaArrowRight } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import DashboardLayout from "../../components/layout/DashboardLayout";

// Import komponen
import NoTransactionState from "../../components/transaksi/NoTransactionState";
import QuickActionButtons from "../../components/transaksi/QuickActionButtons";
import TransactionHistoryItem from "../../components/transaksi/transactionHistoryItem";

// --- DATA MOCKUP RIWAYAT TRANSAKSI ---
const mockHistory = []; // Kosong untuk menampilkan NoTransactionState
const mockHistoryFilled = [
  {
    id: 1,
    type: "Setoran",
    description: "Setoran Simpanan Pokok & Wajib",
    amount: "Rp 1.500.000",
    date: "01 Mar 2025",
    status: "Lunas",
    statusVariant: "success",
  },
  {
    id: 2,
    type: "Pencairan",
    description: "Pencairan Simpanan Sukarela",
    amount: "Rp 500.000",
    date: "10 Mar 2025",
    status: "Menunggu Persetujuan",
    statusVariant: "warning text-dark",
  },
];

export default function TransaksiDashboardPage() {
  const navigate = useNavigate();

  const hasTransaction = mockHistory.length > 0;
  const historyData = mockHistoryFilled;

  const CURRENT_PAGE_KEY = "transaksiDashboard";

  // Helper Navigasi generik
  const handleActionNavigation = useCallback(
    (pageKey, actionData = {}) => {
      const payload = {
        page: pageKey,
        return: CURRENT_PAGE_KEY,
        data: actionData,
      };
      const token = jwtEncode(payload);
      navigate(`/${token}`);
    },
    [navigate]
  );

  // Handler untuk Setoran/Pembayaran
  const handleSetoran = useCallback(() => {
    handleActionNavigation("billingPage");
  }, [handleActionNavigation]);

  // Handler untuk Pencairan (menuju FormPengajuanTransaksi)
  const handlePencairan = useCallback(() => {
    // Kunci rute ke FormPengajuanTransaksi.jsx
    handleActionNavigation("formPengajuanTransaksi");
  }, [handleActionNavigation]);

  // Handler untuk melihat detail transaksi
  const handleViewDetail = useCallback(
    (transaction) => {
      const actionType =
        transaction.type === "Pencairan"
          ? "withdrawalDetail"
          : "transactionDetail";
      handleActionNavigation("transactionDetailPage", {
        invoiceNumber: `TRX-${transaction.id}`,
        status: transaction.status,
        total: transaction.amount.replace(/[^0-9]/g, ""),
        tanggalPengajuan: transaction.date,
        catatan: `Detail transaksi ${transaction.description}.`,
        details: [
          {
            description: transaction.description,
            amount: transaction.amount.replace(/[^0-9]/g, ""),
          },
        ],
        action: actionType,
      });
    },
    [handleActionNavigation]
  );

  // Komponen Rendereing Riwayat Transaksi (Conditional View)
  const HistoryTransactionView = () => (
    <>
      <QuickActionButtons
        handleSetoran={handleSetoran}
        handlePencairan={handlePencairan}
      />
      <Card className="shadow-sm">
        <Card.Header className="bg-primary text-white d-flex justify-content-between align-items-center">
          <h5 className="mb-0">
            <FaListAlt className="me-2" /> Riwayat Transaksi
          </h5>
          <Button variant="light" size="sm" className="fw-bold text-primary">
            Lihat Semua <FaArrowRight />
          </Button>
        </Card.Header>
        <Card.Body>
          {historyData.map((transaksi) => (
            <TransactionHistoryItem
              key={transaksi.id}
              transaction={transaksi}
              onViewDetail={handleViewDetail}
            />
          ))}
        </Card.Body>
      </Card>
    </>
  );

  return (
    <DashboardLayout>
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">Dashboard Transaksi</h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            {hasTransaction ? (
              <HistoryTransactionView />
            ) : (
              // 💡 Menggunakan prop onAjukanPencairan yang sudah dikoreksi
              <NoTransactionState onAjukanPencairan={handlePencairan} />
            )}
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}
