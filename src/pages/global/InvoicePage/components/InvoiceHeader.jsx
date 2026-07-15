import React from "react";
import { Button } from "react-bootstrap";
import { FaPrint } from "react-icons/fa";
import { motion } from "framer-motion";

const InvoiceHeader = ({ onBack, onPrint }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="d-flex justify-content-between align-items-center mb-4 d-print-none"
    >
      <div className="d-flex gap-2">
        <Button
          variant="light"
          className="rounded-3 shadow-sm px-3 fw-bold border-0 bg-white d-flex align-items-center gap-2"
          onClick={onPrint}
        >
          <FaPrint /> <span>Cetak Invoice</span>
        </Button>
      </div>
    </motion.div>
  );
};

export default InvoiceHeader;
