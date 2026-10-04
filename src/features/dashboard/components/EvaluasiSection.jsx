// components/dashboard/EvaluasiSection.jsx

import React from "react";
import { FaClock, FaListOl, FaPlay } from "react-icons/fa";

const EvaluasiSection = () => (
  <div className="card mb-4 shadow-sm border-0">
    <div className="card-body p-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h4 className="card-title mb-0">Evaluasi</h4>
        <span className="badge text-bg-success">Aktif</span>
      </div>

      <span className="badge text-bg-secondary mb-2">Program Wajib</span>

      <h5 className="fw-bold mb-1">QA.EM01</h5>
      <p className="text-muted mb-3">Pembahasan Akad Jual Beli</p>

      <div className="d-flex align-items-center mb-3">
        <ul className="list-inline me-3 mb-0">
          <li className="list-inline-item">
            <FaListOl className="me-1" /> 15 Soal
          </li>
        </ul>
        <span className="text-info ms-auto small text-end">
          <FaClock className="me-1" /> Jumat, 2 Mei 2025
          <br />
          30 Menit
        </span>
      </div>

      <div className="row">
        <div className="col-12 mb-2">
          <button className="btn w-100 btn-outline-info">
            <FaPlay className="me-1" /> Membaca Materi
          </button>
        </div>
        <div className="col-12">
          <button className="btn w-100 btn-danger">Kerjakan</button>
        </div>
      </div>
    </div>
  </div>
);

export default EvaluasiSection;
