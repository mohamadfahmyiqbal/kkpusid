// components/dashboard/PortofolioSection.jsx

import React from "react";

const PortofolioSection = () => {
  // Data Portofolio sesuai gambar Reguler.jpg
  const investment = {
    company: "PT Bintoro Bangun Indonesia - Bintoro Build Tahap III",
    phase: "Tahap III",
    totalInvestment: "Rp. 216.892",
    businessType: "Sukuk",
    status: "Open",
  };

  return (
    <div className="mb-4">
      <h5 className="mb-3">Portofolio</h5>

      {/* Filter Options (Dropdowns) */}
      <div className="d-flex mb-3 gap-2">
        <select className="form-select form-select-sm" style={{ width: "33%" }}>
          <option>Jenis</option>
        </select>
        <select className="form-select form-select-sm" style={{ width: "33%" }}>
          <option>Status</option>
        </select>
        <select className="form-select form-select-sm" style={{ width: "33%" }}>
          <option>Urutkan</option>
        </select>
      </div>

      {/* CARD: Detail Investasi */}
      <div className="card shadow-sm">
        <div className="card-body p-3">
          <h6 className="card-subtitle text-primary mb-1">Investasi Anda</h6>
          <h5 className="card-title fw-bold mb-1">{investment.company}</h5>
          <p
            className="card-text mb-2 text-muted"
            style={{ fontSize: "0.9rem" }}
          >
            PT Bintoro Bangun Indonesia - Bintoro Build {investment.phase}
          </p>
          <a
            href="#"
            className="card-link text-decoration-none"
            style={{ fontSize: "0.9rem" }}
          >
            Lihat Detail Bisnis
          </a>

          <hr className="my-2" />

          {/* Ringkasan Finansial */}
          <div className="row">
            <div className="col-6">
              <p className="mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
                Total Investasi
              </p>
              <h6 className="fw-bold">{investment.totalInvestment}</h6>
            </div>
            <div className="col-3">
              <p className="mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
                Jenis Bisnis
              </p>
              <h6 className="fw-bold">{investment.businessType}</h6>
            </div>
            <div className="col-3">
              <p className="mb-0 text-muted" style={{ fontSize: "0.8rem" }}>
                Status Bisnis
              </p>
              <span className="badge bg-success">{investment.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortofolioSection;
