import React from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const TransaksiPage = () => {
  return (
    <DashboardLayout>
      <div className="container-fluid py-4">
        <h2>Halaman Transaksi Dana</h2>
        <p>
          Formulir untuk melakukan transfer antar rekening atau penarikan dana.
        </p>
        {/* Tambahkan komponen formulir transaksi di sini */}
      </div>
    </DashboardLayout>
  );
};

export default TransaksiPage;
