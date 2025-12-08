// src/components/dashboard/FinancialSection.jsx

import React, { useState, useEffect } from "react";
// Import http (instance Axios terkonfigurasi dengan token) dari common.jsx
import http from "../../utils/api/common";

const FinancialSection = () => {
  // 1. State untuk Data, Loading, dan Error
  const [financialSummary, setFinancialSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /**
   * Fungsi untuk mengambil ringkasan data keuangan anggota.
   */
  const fetchFinancialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Menggunakan http.get untuk mengambil data keuangan anggota
      // Asumsi Endpoint: /api/keuangan/summary
      const res = await http.get("/api/keuangan/summary");
      setFinancialSummary(res.data.data);
    } catch (err) {
      console.error("Gagal memuat ringkasan keuangan:", err);
      // Tangani error, bisa jadi 401 (token expired)
      const errorMessage =
        err.response?.data?.message || "Gagal memuat data ringkasan keuangan.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  // 2. Lifecycle: Panggil fungsi fetch saat komponen dimuat
  useEffect(() => {
    fetchFinancialData();
  }, []);

  // 3. Conditional Rendering: Loading
  if (loading) {
    return (
      <section className="financial-summary-section my-4">
        <div className="card p-3 text-center">
          <div
            className="spinner-border spinner-border-sm text-primary"
            role="status"
          ></div>
          <small className="ms-2">Memuat Ringkasan Keuangan...</small>
        </div>
      </section>
    );
  }

  // 4. Conditional Rendering: Error
  if (error) {
    return (
      <section className="financial-summary-section my-4">
        <div className="alert alert-danger">
          <strong>Kesalahan:</strong> {error}
          <button className="btn btn-sm btn-link" onClick={fetchFinancialData}>
            Coba lagi
          </button>
        </div>
      </section>
    );
  }

  // 5. Render Data
  // Pastikan data yang ditampilkan sudah di-format (misalnya Rupiah)
  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount || 0);
  };

  return (
    <section className="financial-summary-section my-4">
      <div className="row">
        {/* Kartu Summary Simpanan */}
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card shadow-sm p-3 border-left-success">
            <h5 className="card-title text-success small text-uppercase mb-0">
              Total Simpanan
            </h5>
            <p className="h3 mb-0 font-weight-bold">
              {formatRupiah(financialSummary?.totalSavings)}
            </p>
          </div>
        </div>

        {/* Kartu Summary Pinjaman */}
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card shadow-sm p-3 border-left-warning">
            <h5 className="card-title text-warning small text-uppercase mb-0">
              Sisa Pinjaman
            </h5>
            <p className="h3 mb-0 font-weight-bold">
              {formatRupiah(financialSummary?.totalLoanDebt)}
            </p>
          </div>
        </div>

        {/* Kartu Summary SHU */}
        <div className="col-lg-4 col-md-6 mb-3">
          <div className="card shadow-sm p-3 border-left-info">
            <h5 className="card-title text-info small text-uppercase mb-0">
              SHU Terkumpul
            </h5>
            <p className="h3 mb-0 font-weight-bold">
              {formatRupiah(financialSummary?.annualSHU)}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinancialSection;
