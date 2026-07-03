import React from "react";
import { Card,  Button, Spinner } from "react-bootstrap";
import { FaInfoCircle, FaExclamationTriangle } from "react-icons/fa";
import Alert from "../../../../components/ui/SwalAlert";


export default function SimulationSummary({
  formData,
  selectedProduct,
  formatCurrency,
  nominal,
  principal,
  tenor,
  estimasiAngsuran,
  isLoading,
  isLoadingProducts,
}) {
  return (
    <div className="sticky-summary-column">
      <Card className="summary-gradient-card border-0">
        <div className="summary-accent-header">
          <h5 className="fw-bold mb-1 font-outfit">Kalkulator Simulasi</h5>
          <p className="mb-0 small opacity-90">Ringkasan estimasi angsuran bulanan</p>
        </div>
        <Card.Body className="p-4">
          <div className="summary-grid mb-4">
            <div className="summary-item">
              <span className="text-muted small">Jenis Pinjaman</span>
              <strong className="text-dark font-outfit">
                {formData.jenisPinjaman || "-"}
              </strong>
            </div>
            <div className="summary-item">
              <span className="text-muted small">Tipe Akad</span>
              <strong className="text-dark font-outfit">
                {selectedProduct?.akad_type || "Murabahah"}
              </strong>
            </div>
            <div className="summary-item">
              <span className="text-muted small">Total Pinjaman</span>
              <strong className="text-dark font-outfit">{formatCurrency(nominal)}</strong>
            </div>

            <div className="summary-item">
              <span className="text-muted small">Tenor</span>
              <strong className="text-dark font-outfit">{tenor} Bulan</strong>
            </div>
            <div className="summary-item flex-column align-items-start pt-2">
              <span className="text-muted small mb-1">Estimasi Angsuran / Bulan</span>
              <span className="large-amount-display">{formatCurrency(estimasiAngsuran)}</span>
            </div>
          </div>

          <Alert
            variant="info"
            className="border-0 bg-light shadow-sm mb-4"
            style={{ borderRadius: "12px" }}
          >
            <div className="d-flex align-items-start gap-2">
              <FaInfoCircle className="text-teal mt-1 flex-shrink-0" />
              <div style={{ fontSize: "11.5px", lineHeight: "1.5" }}>
                <strong className="text-dark d-block mb-1">
                  Info Akad ({selectedProduct?.akad_type || "Murabahah"})
                </strong>
                <span className="text-muted">
                  {selectedProduct?.akad_type === "Murabahah"
                    ? "Pembiayaan murabahah menggunakan akad jual beli barang dengan tambahan keuntungan (margin) yang disepakati."
                    : "Pinjaman qardhul hasan adalah pinjaman kebajikan tanpa tambahan bunga/margin (hanya mengembalikan pokok)."}
                </span>
              </div>
            </div>
          </Alert>

          <div className="d-grid gap-2">
            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || isLoadingProducts}
              className="btn-submit-premium"
            >
              {isLoading ? (
                <>
                  <Spinner size="sm" className="me-2" />
                  Memproses...
                </>
              ) : (
                "Kirim Pengajuan Sekarang"
              )}
            </Button>
            <small className="text-center text-muted mt-2" style={{ fontSize: "11px" }}>
              <FaExclamationTriangle className="me-1 text-warning" />
              Data pengajuan akan melewati verifikasi admin.
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
