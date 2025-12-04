// pages/transaksi/TransaksiDashboardPage.jsx (Final Code)

import React, { useCallback, useState } from "react";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaListAlt, FaArrowRight } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import DashboardLayout from "../../components/layout/DashboardLayout";

// Import komponen (Asumsi komponen ini sudah tersedia di path tersebut)
import NoTransactionState from "../../components/transaksi/NoTransactionState";
import QuickActionButtons from "../../components/transaksi/QuickActionButtons";
import TransactionHistoryItem from "../../components/transaksi/transactionHistoryItem";

// --- DATA MOCKUP RIWAYAT TRANSAKSI ---
const mockHistoryEmpty = []; 
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

  // 💡 STATE TOGGLE: Ganti 'true' menjadi 'false' untuk melihat tampilan 'Belum Ada Transaksi'
  const [useFilledHistory] = useState(true); 
  
  const historyData = useFilledHistory ? mockHistoryFilled : mockHistoryEmpty;
  const hasTransaction = historyData.length > 0;

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

  // Handler untuk Setoran/Pembayaran -> BILLING PAGE
  const handleSetoran = useCallback(() => {
    handleActionNavigation("billingPage"); 
  }, [handleActionNavigation]);

  // Handler untuk Pengajuan/Jual Beli -> FORM PENGAJUAN TRANSAKSI
  const handlePengajuan = useCallback(() => {
    // Navigasi ke key "formPengajuanTransaksi"
    handleActionNavigation("formPengajuanTransaksi"); 
  }, [handleActionNavigation]);

  // Handler untuk melihat detail transaksi
  const handleViewDetail = useCallback(
    (transaction) => {
      const actionType =
        transaction.type === "Pencairan"
          ? "withdrawalDetail"
          : "transactionDetail";
      
      const amountInt = parseInt(transaction.amount.replace(/[^0-9]/g, ""));

      handleActionNavigation("transactionDetailPage", {
        invoiceNumber: `TRX-${transaction.id}`,
        status: transaction.status,
        total: amountInt,
        tanggalPengajuan: transaction.date,
        catatan: `Detail transaksi ${transaction.description}.`,
        details: [
          {
            description: transaction.description,
            amount: amountInt,
          },
        ],
        action: actionType,
      });
    },
    [handleActionNavigation]
  );

  // Komponen Kartu Informasi Rekening
  const AccountInfoCard = () => (
    <Card className="shadow-sm mb-4">
        <Card.Body className="p-4 bg-info text-white">
          <h4 className="fw-bold mb-3">Informasi Rekening</h4>
          <Row className="mb-4">
            <Col xs={6}>
              <small className="d-block">Nama</small>
              <h6 className="fw-bold">Budi Santoso</h6>
              <small className="d-block mt-2">Produk</small>
              <h6 className="fw-bold">Jual Beli</h6>
            </Col>
            <Col xs={6}>
              <small className="d-block">Akad</small>
              <h6 className="fw-bold">Qardh</h6>
              <small className="d-block mt-2">Tanggal Buka</small>
              <h6 className="fw-bold">01 Februari 2023</h6>
            </Col>
          </Row>
          <div className="d-flex justify-content-between align-items-center border-top pt-3">
              <small className="d-block">Saldo Akhir</small>
              <h4 className="fw-bold">Rp.100.000</h4>
          </div>
        </Card.Body>
        <Card.Footer className="bg-white">
            <QuickActionButtons
              handleSetoran={handleSetoran}
              handlePengajuan={handlePengajuan} 
            />
        </Card.Footer>
    </Card>
  );

  // Komponen Rendereing Riwayat Transaksi
  const HistoryTransactionView = () => (
    <>
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
          <h3 className="text-themecolor mb-0 mt-0">Transaksi</h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            
            {hasTransaction && <AccountInfoCard />} 
            
            {hasTransaction ? (
              <HistoryTransactionView />
            ) : (
              // Tombol di NoTransactionState akan memanggil handlePengajuan
              <NoTransactionState onAjukanPencairan={handlePengajuan} />
            )}
            
          </Col>
        </Row>
      </Container>
    </DashboardLayout>
  );
}