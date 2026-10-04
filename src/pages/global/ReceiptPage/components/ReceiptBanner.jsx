import React from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";

export default function ReceiptBanner({ isWithdrawal, isPaid }) {
  return (
    <>
      {/* Background Decorative Element */}
      <div
        className="position-absolute no-print"
        style={{
          top: "-50px",
          right: "-50px",
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: isPaid ? "rgba(40, 167, 69, 0.05)" : "rgba(0, 123, 255, 0.05)",
          zIndex: 0,
        }}
      />

      {/* Banner Status with Gradient */}
      <div
        className="text-center py-5 position-relative bg-gradient-success text-white"
        style={{
          background: "linear-gradient(45deg, #28a745, #20c997)",
          zIndex: 1,
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 10 }}
        >
          <FaCheckCircle size={60} className="mb-3" />
          <h3 className="fw-bold mb-1 text-white">
            RESI {isWithdrawal ? "PENARIKAN" : "PINJAMAN"} BERHASIL
          </h3>
          <p className="opacity-75 mb-0 text-white">
            Transaksi telah disetujui dan diproses oleh koperasi
          </p>
        </motion.div>
      </div>
    </>
  );
}
