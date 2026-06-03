// src/pages/global/transaction/components/ActionButtons.jsx
import React, { useMemo } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaFileInvoiceDollar, FaWallet } from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";

const ActionButtons = ({
  isFinancing,
  isTabungan,
  transactionId,
  onBack,
  approvalStatus,
  productName,
}) => {
  const navigate = useNavigate();

  const isApprovedAndReady = useMemo(() => {
    const isDone = 
      approvalStatus?.pengawasDone &&
      approvalStatus?.ketuaDone &&
      (isFinancing || isTabungan ? approvalStatus?.bendaharaDone : true) &&
      !approvalStatus?.isRejected;
    
    return isDone || approvalStatus?.isApproved || approvalStatus?.isReadyToPay;
  }, [isFinancing, isTabungan, approvalStatus]);

  const handlePay = () => {
    const category = isFinancing ? "FINANCING" : isTabungan ? "TABUNGAN_DEPOSIT" : "WITHDRAWAL";
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
    }
    
    if (productName) params.productName = productName;
    
    navigate(`/${jwtEncode(params)}`);
  };

  return (
    <section className="mt-5 d-print-none">
      <div className="d-flex flex-column flex-sm-row justify-content-center gap-3">
        {isApprovedAndReady && (isFinancing || isTabungan) && (
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
            onClick={handlePay}
            style={{ 
              background: isFinancing 
                ? 'linear-gradient(45deg, #0284c7, #0ea5e9)' 
                : 'linear-gradient(45deg, #10b981, #059669)',
              border: 'none'
            }}
          >
            <FaFileInvoiceDollar />
            {isFinancing ? "BAYAR INVOICE SEKARANG" : "BAYAR SETORAN PERTAMA"}
          </Button>
        )}

        {isApprovedAndReady && !isFinancing && !isTabungan && (
          <Button
            variant="primary"
            size="lg"
            className="rounded-pill px-5 py-3 fw-bold shadow d-flex align-items-center justify-content-center gap-2"
            onClick={() => navigate(`/${jwtEncode({ page: 'simpananPage' })}`)}
            style={{ 
              background: 'linear-gradient(45deg, #10b981, #059669)',
              border: 'none'
            }}
          >
            <FaWallet />
            KEMBALI KE SIMPANAN
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
