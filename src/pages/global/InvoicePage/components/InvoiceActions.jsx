import React from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import { FaMoneyBillWave, FaArrowLeft, FaCheckCircle, FaLock } from "react-icons/fa";
import { motion } from "framer-motion";

const InvoiceActions = ({ isPaid, isProcessing, onPay, onBack, returnPageName }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-4 d-print-none"
    >
      {!isPaid ? (
        <div className="text-center">
          <Button
            variant="primary"
            size="lg"
            className="w-100 py-3 fw-bold rounded-4 shadow-sm mb-3 d-flex align-items-center justify-content-center gap-2"
            onClick={onPay}
            disabled={isProcessing}
            style={{ 
              background: "linear-gradient(45deg, #007bff, #0056b3)",
              border: "none",
              fontSize: "1.1rem"
            }}
          >
            {isProcessing ? (
              <>
                <Spinner animation="border" size="sm" />
                <span>Menghubungkan ke Midtrans...</span>
              </>
            ) : (
              <>
                <FaMoneyBillWave /> 
                <span>BAYAR SEKARANG</span>
              </>
            )}
          </Button>
          <div className="d-flex align-items-center justify-content-center gap-2 text-muted small">
            <FaLock size={12} />
            <span>Pembayaran aman via Midtrans Secure Payment</span>
          </div>
        </div>
      ) : (
        <div className="text-center">
          <Alert
            variant="success"
            className="rounded-4 py-4 mb-4 text-center border-0 shadow-sm bg-success bg-opacity-10 text-success"
          >
            <div className="d-flex flex-column align-items-center gap-2">
              <FaCheckCircle size={30} />
              <div className="fw-bold h5 mb-0">Pembayaran Terverifikasi</div>
              <p className="small mb-0 opacity-75">
                Transaksi ini telah dibayar lunas. Terima kasih atas kontribusi Anda.
              </p>
            </div>
          </Alert>
          <Button
            variant="outline-primary"
            size="lg"
            className="w-100 py-3 fw-bold rounded-4 shadow-sm border-2 d-flex align-items-center justify-content-center gap-2"
            onClick={onBack}
          >
            <FaArrowLeft /> 
            <span>KEMBALI KE {returnPageName.toUpperCase()}</span>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default InvoiceActions;
