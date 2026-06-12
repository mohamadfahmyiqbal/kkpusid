import React from "react";
import { MdTrendingUp, MdTrendingDown, MdReceiptLong } from "react-icons/md";

const QuickStats = ({ stats }) => {
  return (
    <div className="row g-3">
      <div className="col-4">
        <div className="dashboard-stat-card d-flex align-items-center gap-2 p-3 shadow-sm bg-white rounded-4 border-light-1">
          <div className="stat-icon-bg bg-success-light text-success">
            <MdTrendingUp size={22} />
          </div>
          <div className="stat-text">
            <span className="stat-label d-block text-muted text-uppercase">Total Kredit</span>
            <strong className="stat-val font-outfit">Rp {Number(stats.credit).toLocaleString('id-ID')}</strong>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="dashboard-stat-card d-flex align-items-center gap-2 p-3 shadow-sm bg-white rounded-4 border-light-1">
          <div className="stat-icon-bg bg-danger-light text-danger">
            <MdTrendingDown size={22} />
          </div>
          <div className="stat-text">
            <span className="stat-label d-block text-muted text-uppercase">Total Debet</span>
            <strong className="stat-val font-outfit">Rp {Number(stats.debit).toLocaleString('id-ID')}</strong>
          </div>
        </div>
      </div>
      <div className="col-4">
        <div className="dashboard-stat-card d-flex align-items-center gap-2 p-3 shadow-sm bg-white rounded-4 border-light-1">
          <div className="stat-icon-bg bg-primary-light text-primary">
            <MdReceiptLong size={22} />
          </div>
          <div className="stat-text">
            <span className="stat-label d-block text-muted text-uppercase">Aktivitas</span>
            <strong className="stat-val font-outfit">{stats.totalCount} Transaksi</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickStats;
