import React from "react";
import { FaChalkboardTeacher } from "react-icons/fa";

const TrainingDashboardPage = () => {
  return (
    <div className="container-fluid p-4 animated fadeIn">
      <div className="d-flex align-items-center mb-4">
        <FaChalkboardTeacher className="me-2 text-primary" size={24} />
        <h4 className="mb-0 fw-bold">E-Training & Sertifikasi</h4>
      </div>
      <div className="card border-0 shadow-sm rounded-3">
        <div className="card-body p-4">
          <h5 className="fw-bold mb-3">Materi & Jadwal Pelatihan</h5>
          <p className="text-muted">
            Jadwal pelatihan dan materi edukasi koperasi akan segera tersedia di
            sini.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrainingDashboardPage;
