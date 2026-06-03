import React from "react";
import { Card, Badge } from "react-bootstrap";
import { motion } from "framer-motion";
import { FaReceipt, FaCheckCircle } from "react-icons/fa";
import { MdOutlineDateRange } from "react-icons/md";

const SetoranTagihanList = ({
  tagihanList,
  selectedTagihan,
  handleSelectTagihan,
  formatCurrency,
  formatDate,
}) => {
  return (
    <Card className="border-0 shadow-sm rounded-4 h-100">
      <Card.Body className="p-4">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h5 className="fw-bold mb-0 text-dark d-flex align-items-center gap-2">
            <FaReceipt className="text-primary" />
            Daftar Tagihan
          </h5>
          <Badge bg="primary" pill className="px-3 py-2 bg-opacity-10 text-primary">
            {tagihanList.length} Belum Dibayar
          </Badge>
        </div>

        <div 
          className="d-flex flex-column gap-3 overflow-y-auto pe-2 custom-scrollbar"
          style={{ maxHeight: "500px" }}
        >
          {tagihanList.length === 0 ? (
            <div className="text-center py-5 bg-light rounded-4">
              <FaCheckCircle size={48} className="text-success opacity-50 mb-3" />
              <h6 className="text-secondary fw-medium">
                Tidak ada tagihan tertunggak
              </h6>
              <p className="text-muted small mb-0">
                Semua setoran Anda sudah dibayar
              </p>
            </div>
          ) : (
            tagihanList.map((tagihan) => (
              <motion.div
                key={tagihan.id}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSelectTagihan(tagihan)}
                className={`p-3 rounded-4 cursor-pointer transition-all border ${
                  selectedTagihan?.id === tagihan.id
                    ? "border-primary bg-primary bg-opacity-10 shadow-sm"
                    : "border-light bg-white hover-bg-light"
                }`}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center gap-3">
                  <div className="form-check custom-radio flex-shrink-0">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="tagihan"
                      checked={selectedTagihan?.id === tagihan.id}
                      onChange={() => handleSelectTagihan(tagihan)}
                      style={{ cursor: "pointer" }}
                    />
                  </div>
                  <div className="flex-grow-1">
                    <h6 className="fw-bold mb-1 text-dark">{tagihan.period}</h6>
                    <div className="d-flex align-items-center gap-2 text-muted small">
                      <MdOutlineDateRange />
                      Jatuh Tempo: {formatDate(tagihan.dueDate)}
                    </div>
                  </div>
                  <div className="text-end">
                    <h6 className="fw-bold text-primary mb-1">
                      Rp {formatCurrency(tagihan.amount)}
                    </h6>
                    <Badge
                      bg="warning"
                      className="text-dark bg-opacity-25 rounded-pill px-2"
                    >
                      Belum Bayar
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default SetoranTagihanList;
