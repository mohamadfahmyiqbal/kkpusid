import React from "react";
import { FaChartLine } from "react-icons/fa";

const InvestasiDashboardPage = () => {
  return (
    <div className="container-fluid p-4 animated fadeIn">
      <div className="d-flex align-items-center mb-4">
        <FaChartLine className="me-2 text-primary" size={24} />
        <h4 className="mb-0 fw-bold">Dashboard Investasi</h4>
      </div>
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Portofolio Investasi</h5>
          <p className="text-muted">
            Tampilkan portofolio, kinerja investasi, dan opsi investasi baru di
            sini.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvestasiDashboardPage;
