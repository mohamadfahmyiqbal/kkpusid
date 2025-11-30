import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const ProgramPage = () => {
  return (
    <DashboardLayout>
      <div className="container-fluid py-4">
        <h2>Daftar Program & Hibah</h2>
        <p>
          Tampilkan daftar program kerja sama atau peluang hibah yang tersedia
          untuk anggota.
        </p>
      </div>
    </DashboardLayout>
  );
};

export default ProgramPage;
