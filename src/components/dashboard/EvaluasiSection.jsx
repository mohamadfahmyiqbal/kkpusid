// components/dashboard/EvaluasiSection.jsx

import React from "react";
// Asumsi Button diimpor dari components/ui/Button
// const Button = ({ children, className = 'btn btn-info' }) => (<button className={className}>{children}</button>);

const EvaluasiSection = () => (
  <div className="card mb-4 shadow">
    <div className="card-body p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="card-title mb-0">Evaluasi</h4>
        <span className="badge badge-success">Aktif</span>
      </div>

      <span className="badge badge-secondary mb-2">Program Wajib</span>

      <h5 className="font-weight-bold mb-1">QA.EM01</h5>
      <p className="text-muted mb-3">Pembahasan Akad Jual Beli</p>

      <div className="d-flex align-items-center mb-3">
        <ul className="list-inline mr-3 mb-0">
          <li className="list-inline-item">
            <i className="mdi mdi-format-list-numbered"></i> 15 Soal
          </li>
        </ul>
        <span className="text-info ml-auto">
          <i className="mdi mdi-clock"></i> Jumat, 2 Mei 2025
          <br />
          &nbsp;&nbsp;&nbsp;&nbsp;30 Menit
        </span>
      </div>

      <div className="row">
        <div className="col-12 mb-2">
          {/* Menggunakan placeholder Button, harusnya diimpor dari components/ui */}
          <button className="btn btn-block btn-outline-info">
            <i className="mdi mdi-play"></i> Membaca Materi
          </button>
        </div>
        <div className="col-12">
          <button className="btn btn-block btn-danger">Kerjakan</button>
        </div>
      </div>
    </div>
  </div>
);

export default EvaluasiSection;
