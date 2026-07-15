// src/pages/global/transaction/components/ActionButtons.jsx
import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileInvoiceDollar, FaWallet } from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";

const ActionButtons = ({
  isFinancing,
  isTabungan,
  isSukukOrder,
  transactionId,
  onBack,
  approvalStatus,
  productName,
  detail,
}) => {
  const navigate = useNavigate();

  const isApprovedAndReady = useMemo(() => {
    const hasBendahara = detail?.approvalChain?.some(a => a.role?.toUpperCase() === 'BENDAHARA') ||
                         detail?.approvals?.some(a => (a.role || a.role_name)?.toUpperCase() === 'BENDAHARA');
                         
    const isDone = 
      approvalStatus?.pengawasDone &&
      approvalStatus?.ketuaDone &&
      (hasBendahara ? approvalStatus?.bendaharaDone : true) &&
      !approvalStatus?.isRejected;
    
    return isDone || approvalStatus?.isApproved || approvalStatus?.isReadyToPay;
  }, [approvalStatus, detail]);

  const isPinjamanProduct = isFinancing && 
    !(productName?.toLowerCase().includes('arisan')) && 
    !(productName?.toLowerCase().includes('pelunasan')) &&
    (
      (productName && !['Property', 'Kendaraan', 'Elektronik'].includes(productName)) ||
      (detail?.purpose?.toLowerCase().includes('pinjaman')) ||
      (!productName && detail?.purpose?.toLowerCase().includes('pinjaman'))
    );

  const isPelunasan = productName?.toLowerCase().includes('pelunasan') || detail?.category?.toLowerCase().includes('pelunasan');

  const handlePay = () => {
    if (isPinjamanProduct) {
      navigate(`/${jwtEncode({ page: "receiptPage", financingId: transactionId })}`);
      return;
    }

    if (isPelunasan) {
      navigate(`/${jwtEncode({ 
        page: "invoicePage", 
        financingId: transactionId,
        product: productName || detail?.category || "Pelunasan Jual Beli",
        amount: detail?.total_tagihan || detail?.amount_requested,
        return: "transactionDetailPage"
      })}`);
      return;
    }

    const category = isFinancing ? "FINANCING" : isTabungan ? "TABUNGAN_DEPOSIT" : isSukukOrder ? "SUKUK_INVESTMENT" : "WITHDRAWAL";
    const page = "billingPage";
    const params = {
      page,
      category,
      return: "transactionDetailPage"
    };
    
    if (isFinancing) params.financing_id = transactionId;
    else if (isTabungan) {
      params.tabungan_id = transactionId;
      params.displayName = "Setoran Tabungan";
    } else if (isSukukOrder) {
      params.order_id = transactionId;
      params.displayName = "Pembelian Sukuk";
    }
    
    if (productName) params.productName = productName;
    
    navigate(`/${jwtEncode(params)}`);
  };

  const getButtonText = () => {
    if (isPinjamanProduct) return "LIHAT RESI PENCAIRAN";
    if (isPelunasan) return "LIHAT INVOICE";
    if (isFinancing) {
      if (productName?.toLowerCase().includes('arisan')) return "BAYAR SETORAN ARISAN";
      return "BAYAR INVOICE SEKARANG";
    }
    if (isSukukOrder) return "BAYAR PEMBELIAN SUKUK";
    return "BAYAR SETORAN PERTAMA";
  };

  return (
    <section className="mt-5 d-print-none">
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
        {isApprovedAndReady && (isFinancing || isTabungan || isSukukOrder) && detail?.status !== 'PAID' && (
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
            onClick={handlePay}
            style={{ 
              background: isFinancing 
                ? 'linear-gradient(45deg, #0284c7, #0ea5e9)' 
                : isSukukOrder
                  ? 'linear-gradient(45deg, #f59e0b, #d97706)'
                  : 'linear-gradient(45deg, #10b981, #059669)',
              border: 'none'
            }}
          >
            <FaFileInvoiceDollar />
            {getButtonText()}
          </Button>
        )}

        {isSukukOrder && detail?.status === 'PAID' && detail?.sukuk?.status === 'COMPLETED' && (
           <Button
            variant="success"
            size="lg"
            className="rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
            onClick={async () => {
              try {
                // we should add sweetalert but simple fetch first, or we can use the default handler
                const res = await fetch(`/api/sukuk/withdraw/${transactionId}`, {
                   method: 'POST',
                   headers: {
                     'Content-Type': 'application/json',
                     'Authorization': `Bearer ${localStorage.getItem('token')}`
                   }
                });
                const data = await res.json();
                if (data.status) {
                   alert("Pengajuan pencairan berhasil dikirim.");
                   window.location.reload();
                } else {
                   alert(data.message || "Gagal mengajukan pencairan.");
                }
              } catch (e) {
                 alert("Terjadi kesalahan.");
              }
            }}
            style={{ background: 'linear-gradient(45deg, #10b981, #059669)', border: 'none' }}
          >
            <FaWallet />
            AJUKAN PENCAIRAN
          </Button>
        )}

        {isApprovedAndReady && !isFinancing && !isTabungan && !isSukukOrder && (
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate(`/${jwtEncode({ page: 'receiptPage', withdrawalId: transactionId })}`)}
            style={{ 
              background: 'linear-gradient(45deg, #10b981, #059669)',
              border: 'none'
            }}
          >
            <FaFileInvoiceDollar />
            LIHAT RESI PENCAIRAN
          </Button>
        )}
        
        <Button
          variant={isApprovedAndReady ? "light" : "outline-secondary"}
          size={isApprovedAndReady ? "lg" : "md"}
          className={`rounded-pill px-5 ${isApprovedAndReady ? 'py-3 fw-semibold border text-secondary' : 'py-2'} d-flex align-items-center justify-content-center gap-2`}
          onClick={onBack}
        >
          <FaArrowLeft size={isApprovedAndReady ? 14 : 12} />
          <span>KEMBALI</span>
        </Button>
      </div>
    </section>
  );
};

export default React.memo(ActionButtons);
