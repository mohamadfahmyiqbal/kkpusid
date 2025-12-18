// src/pages/anggota/SimpananPage.jsx
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import InformasiRekeningCard from "../../components/simpanan/InformasiRekeningCard";

const SimpananPage = () => {
  // Label statis agar UI tombol langsung muncul tanpa menunggu API
  const categories = [
    { id: "Simpanan Pokok", label: "Simpanan Pokok" },
    { id: "Simpanan Wajib", label: "Simpanan Wajib" },
    { id: "Simpanan Sukarela", label: "Simpanan Sukarela" },
  ];

  const [activeTab, setActiveTab] = useState(categories[0].id);

  return (
    <div className="container-fluid">
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
