import React from "react";
import Card from "../../../../components/ui/Card";
import Button from "../../../../components/ui/Button";
import { FaInfoCircle, FaCalculator, FaShieldAlt } from "react-icons/fa";
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
    <div className="sticky-summary-column position-sticky" style={{ top: '100px', zIndex: 10 }}>
      <Card variant="premium" theme="primary" className="overflow-hidden border-0 rounded-4 shadow-lg">
        {/* Decorative background shapes */}
        <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: 250, height: 250, top: -100, right: -100, filter: 'blur(20px)' }} />
        <div className="position-absolute rounded-circle bg-white opacity-10" style={{ width: 150, height: 150, bottom: -50, left: -50, filter: 'blur(20px)' }} />

        <div className="p-4 border-bottom border-white border-opacity-10 position-relative z-1" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>
          <h5 className="fw-bold mb-1 font-outfit text-white d-flex align-items-center gap-2">
            <div className="bg-white bg-opacity-25 p-2 rounded-3 d-flex align-items-center justify-content-center">
              <FaCalculator className="text-white" size={16} />
            </div>
            Kalkulator Simulasi
          </h5>
          <p className="mb-0 mt-2 small text-white-75">Ringkasan estimasi angsuran pembiayaan</p>
        </div>
        
        <Card.Body className="p-4 position-relative z-1">
          <div className="d-flex flex-column gap-3 mb-4">
            
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10">
              <span className="text-white-75 small fw-medium">Jenis Pinjaman</span>
              <strong className="text-white font-outfit px-3 py-1 bg-white bg-opacity-25 rounded-pill small border border-white border-opacity-25 shadow-sm">
                {formData.jenisPinjaman || "-"}
              </strong>
            </div>
            
            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10">
              <span className="text-white-75 small fw-medium">Tipe Akad</span>
              <strong className="text-white font-outfit px-3 py-1 bg-white bg-opacity-25 rounded-pill small border border-white border-opacity-25 shadow-sm">
                {selectedProduct?.akad_type || "Qardhul Hasan"}
              </strong>
            </div>

            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10">
              <span className="text-white-75 small fw-medium">Total Pinjaman</span>
              <strong className="text-white font-outfit fs-6">{formatCurrency(nominal)}</strong>
            </div>

            <div className="d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10">
              <span className="text-white-75 small fw-medium">Tenor</span>
              <strong className="text-white font-outfit fs-6">{tenor} Bulan</strong>
            </div>

            <div className="mt-3 p-4 bg-white bg-opacity-10 rounded-4 text-center border border-white border-opacity-25 shadow-sm position-relative overflow-hidden">
              <div className="position-absolute w-100 h-100 top-0 start-0" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)', zIndex: 0 }} />
              <div className="position-relative z-1">
                <span className="text-white-75 small d-block mb-2 text-uppercase fw-bold" style={{ letterSpacing: '1.5px', fontSize: '10px' }}>Estimasi Angsuran / Bulan</span>
                <div className="display-6 fw-bolder text-white font-outfit" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                  {formatCurrency(estimasiAngsuran)}
                </div>
              </div>
            </div>

          </div>

          <Alert
            variant="info"
            className="border-0 shadow-sm mb-4 p-3"
            style={{ 
              borderRadius: "16px", 
              background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255,255,255,0.1)"
            }}
          >
            <div className="d-flex align-items-start gap-3">
              <div className="bg-white bg-opacity-25 p-2 rounded-circle mt-1 shadow-sm flex-shrink-0">
                <FaInfoCircle className="text-white fs-6" />
              </div>
              <div style={{ fontSize: "12px", lineHeight: "1.6" }}>
                <strong className="text-white d-block mb-1 fs-6">
                  Info Akad ({selectedProduct?.akad_type || "Qardhul Hasan"})
                </strong>
                <span className="text-white">
                  {selectedProduct?.akad_type === "Murabahah"
                    ? "Pembiayaan murabahah menggunakan akad jual beli barang dengan tambahan keuntungan (margin) yang disepakati bersama."
                    : "Pinjaman lunak qardhul hasan adalah pinjaman kebajikan tanpa tambahan bunga/margin (hanya mengembalikan pokok secara dicicil)."}
                </span>
              </div>
            </div>
          </Alert>

          <div className="d-grid gap-2 pt-2">
            <Button
              variant="light"
              type="submit"
              disabled={isLoadingProducts}
              isLoading={isLoading}
              loadingText="Memproses..."
              className="fw-bold py-3 shadow border-0 d-flex justify-content-center align-items-center gap-2 fs-6 rounded-pill text-primary transition-all hover-scale"
              style={{ background: 'linear-gradient(to right, #ffffff, #f8f9fa)' }}
            >
              Ajukan Pinjaman Sekarang
            </Button>
            <div className="text-center text-white mt-3 d-flex align-items-center justify-content-center gap-2 opacity-75" style={{ fontSize: "12px", fontWeight: '500' }}>
              <FaShieldAlt className="text-white" />
              <span>Data pengajuan aman & diverifikasi oleh admin</span>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
