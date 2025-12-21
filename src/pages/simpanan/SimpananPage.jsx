// src/pages/anggota/SimpananPage.jsx
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaArrowLeft } from "react-icons/fa"; // Import icon untuk estetika
import { jwtEncode } from "../../routes/helpers"; // Import helper JWT Anda
import InformasiRekeningCard from "../../components/simpanan/InformasiRekeningCard";

const SimpananPage = () => {
  const navigate = useNavigate();

  const categories = [
    { id: "Simpanan Pokok", label: "Simpanan Pokok" },
    { id: "Simpanan Wajib", label: "Simpanan Wajib" },
    { id: "Simpanan Sukarela", label: "Simpanan Sukarela" },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);

  // Fungsi untuk kembali ke dashboard menggunakan sistem token Anda
  const handleBackToDashboard = () => {
    const token = jwtEncode({ page: "dashboard" });
    navigate(`/${token}`);
  };

  return (
    <div className="container-fluid py-3">
      {/* Tombol Back ke Dashboard */}
      <div className="mx-3 mb-3">
        <Button
          variant="link"
          className="p-0 text-decoration-none text-muted fw-bold"
          onClick={handleBackToDashboard}
        >
          <FaArrowLeft className="me-2" /> Kembali ke Dashboard
        </Button>
      </div>

      {/* Navigasi Tab Vertikal */}
      <div className="d-flex flex-column gap-2 mx-3 mb-4">
        {categories.map((cat) => (
          <Button
            key={cat.id}
            onClick={() => setActiveTab(cat.id)}
            className="py-2 border-0 shadow-sm"
            style={{
              backgroundColor: activeTab === cat.id ? "#005a8d" : "#e9ecef",
              color: activeTab === cat.id ? "white" : "#495057",
              fontWeight: activeTab === cat.id ? "bold" : "normal",
              borderRadius: "8px",
            }}
          >
            {cat.label}
          </Button>
        ))}
      </div>

      {/* Kartu Informasi yang memanggil data USimpanan secara mandiri */}
      <div className="mx-3">
        <InformasiRekeningCard activeType={activeTab} />
      </div>
    </div>
  );
};

export default SimpananPage;
