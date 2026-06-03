import React from "react";
import { Card, Form, Button, Spinner } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import { FaReceipt } from "react-icons/fa";

const SetoranPaymentSummary = ({
  selectedTagihan,
  flexibleAmount,
  setFlexibleAmount,
  handleProsesSetoran,
  submitting,
  formatCurrency,
  formatDate,
}) => {
  return (
    <Card className="border-0 shadow-sm rounded-4 overflow-hidden">
      <div className="bg-primary bg-opacity-10 p-4 border-bottom border-primary border-opacity-10">
        <h5 className="fw-bold text-primary mb-0">Ringkasan Pembayaran</h5>
      </div>

      <Card.Body className="p-4">
        {!selectedTagihan ? (
          <div className="text-center py-4 text-muted">
            <FaReceipt size={32} className="opacity-25 mb-3" />
            <p className="mb-0 small">
              Pilih tagihan di samping untuk melihat detail dan melakukan
              pembayaran.
            </p>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTagihan.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-muted small">Periode</span>
                <span className="fw-bold text-dark">
                  {selectedTagihan.period}
                </span>
              </div>
              <div className="d-flex justify-content-between align-items-center mb-3 pb-3 border-bottom">
                <span className="text-muted small">Jatuh Tempo</span>
                <span className="fw-medium text-dark">
                  {formatDate(selectedTagihan.dueDate)}
                </span>
              </div>

              <Form.Group className="mb-4">
                <Form.Label className="fw-bold text-dark small d-flex justify-content-between">
                  Nominal Setoran
                  <span className="text-primary fw-medium">
                    Min. Rp {formatCurrency(selectedTagihan.amount)}
                  </span>
                </Form.Label>
                <div className="input-group input-group-lg shadow-sm rounded-3 overflow-hidden border">
                  <span className="input-group-text bg-light border-0 fw-bold text-secondary">
                    Rp
                  </span>
                  <Form.Control
                    type="number"
                    value={flexibleAmount}
                    onChange={(e) => setFlexibleAmount(e.target.value)}
                    min={selectedTagihan.amount}
                    className="border-0 fw-bold text-dark fs-5 shadow-none"
                    style={{ paddingLeft: "10px" }}
                  />
                </div>
                <Form.Text className="text-muted small mt-2 d-block">
                  Anda dapat menyetor lebih dari nominal tagihan untuk mempercepat
                  target.
                </Form.Text>
              </Form.Group>

              <div className="p-3 bg-light rounded-3 mb-4 d-flex justify-content-between align-items-center">
                <span className="fw-bold text-secondary">Total Bayar</span>
                <h4 className="fw-bold text-primary mb-0">
                  Rp {formatCurrency(flexibleAmount || selectedTagihan.amount)}
                </h4>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-100 rounded-pill fw-bold shadow position-relative overflow-hidden"
                onClick={handleProsesSetoran}
                disabled={submitting}
                style={{ transition: "all 0.3s" }}
              >
                {submitting ? (
                  <span className="d-flex align-items-center justify-content-center gap-2">
                    <Spinner animation="border" size="sm" /> Memproses...
                  </span>
                ) : (
                  "Bayar Sekarang"
                )}
              </Button>
            </motion.div>
          </AnimatePresence>
        )}
      </Card.Body>
    </Card>
  );
};

export default SetoranPaymentSummary;
