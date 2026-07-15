import React from "react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
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
      <Card variant="premium">
        <div className="summary-accent-header">
          <h5 className="fw-bold mb-1 font-outfit">Kalkulator Simulasi</h5>
          <p className="mb-0 small opacity-90">Ringkasan estimasi angsuran bulanan</p>
        </div>
        <Card.Body className="p-4">
          <div className="summary-grid mb-4">
            <div className="summary-item">
              <span className="text-white-50 small">Jenis Pinjaman</span>
              <strong className="text-white font-outfit">
                {formData.jenisPinjaman || "-"}
              </strong>
            </div>
            <div className="summary-item">
              <span className="text-white-50 small">Tipe Akad</span>
              <strong className="text-white font-outfit">
                {selectedProduct?.akad_type || "Murabahah"}
              </strong>
            </div>
            <div className="summary-item">
              <span className="text-white-50 small">Total Pinjaman</span>
              <strong className="text-white font-outfit">{formatCurrency(nominal)}</strong>
            </div>

            <div className="summary-item">
              <span className="text-white-50 small">Tenor</span>
              <strong className="text-white font-outfit">{tenor} Bulan</strong>
            </div>
            <div className="summary-item flex-column align-items-start pt-2">
              <span className="text-white-50 small mb-1">Estimasi Angsuran / Bulan</span>
              <span className="large-amount-display text-white">{formatCurrency(estimasiAngsuran)}</span>
            </div>
          </div>

          <Alert
            variant="info"
            className="border-0 bg-white bg-opacity-10 shadow-sm mb-4"
            style={{ borderRadius: "12px" }}
          >
            <div className="d-flex align-items-start gap-2">
              <FaInfoCircle className="text-white mt-1 flex-shrink-0" />
              <div style={{ fontSize: "11.5px", lineHeight: "1.5" }}>
                <strong className="text-white d-block mb-1">
                  Info Akad ({selectedProduct?.akad_type || "Murabahah"})
                </strong>
                <span className="text-white-75">
                  {selectedProduct?.akad_type === "Murabahah"
                    ? "Pembiayaan murabahah menggunakan akad jual beli barang dengan tambahan keuntungan (margin) yang disepakati."
                    : "Pinjaman qardhul hasan adalah pinjaman kebajikan tanpa tambahan bunga/margin (hanya mengembalikan pokok)."}
                </span>
              </div>
            </div>
          </Alert>

          <div className="d-grid gap-2">
            <Button
              variant="form"
              type="submit"
              disabled={isLoadingProducts}
              isLoading={isLoading}
              loadingText="Memproses..."
            >
              Kirim Pengajuan Sekarang
            </Button>
            <small className="text-center text-white-50 mt-2" style={{ fontSize: "11px" }}>
              <FaExclamationTriangle className="me-1 text-warning" />
              Data pengajuan akan melewati verifikasi admin.
            </small>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
