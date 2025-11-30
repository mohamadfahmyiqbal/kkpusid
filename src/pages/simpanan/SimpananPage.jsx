// src/pages/anggota/SimpananPage.jsx

import React, { useState, useCallback } from "react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "react-bootstrap";
import InformasiRekeningCard from "../../components/simpanan/InformasiRekeningCard";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

// --- DATA MOCKUP SIMPANAN DETAILED ---
const mockSavingsData = {
  "Simpanan Pokok": {
    product: "Simpanan Pokok",
    akad: "Mudorobah",
    tanggalBuka: "01 Februari 2023",
    nominal: 500000,
    saldoAkhir: 500000,
    nama: "Budi Santoso",
  },
  "Simpanan Wajib": {
    product: "Simpanan Wajib",
    akad: "Wadi’ah",
    tanggalBuka: "15 Maret 2023",
    nominal: 200000,
    saldoAkhir: 2500000,
    nama: "Budi Santoso",
  },
  "Simpanan Sukarela": {
    product: "Simpanan Sukarela",
    akad: "Wadi’ah",
    tanggalBuka: "10 Mei 2023",
    nominal: 100000,
    saldoAkhir: 1250000,
    nama: "Budi Santoso",
  },
};

const SimpananPage = () => {
  const [activeSavingsType, setActiveSavingsType] = useState("Simpanan Pokok");
  const activeData = mockSavingsData[activeSavingsType];
  const navigate = useNavigate();

  // PERBAIKAN: handleActionNavigation sekarang menerima returnPageKey
  const handleActionNavigation = useCallback(
    (pageKey, returnPageKey) => {
      // Bangun payload
      const payload = { page: pageKey };
      if (returnPageKey) {
        payload.return = returnPageKey;
      }

      const token = jwtEncode(payload);
      navigate(`/${token}`);
    },
    [navigate]
  );

  return (
    <DashboardLayout>
      <div className="container-fluid py-4">
        <h2 className="mb-3 mx-3">Simpanan</h2>

        {/* 1. BUTTONS/TABS UNTUK MEMILIH JENIS SIMPANAN */}
        <div className="d-flex flex-column gap-2 mx-3 mb-4">
          {Object.keys(mockSavingsData).map((type) => (
            <Button
              key={type}
              variant={activeSavingsType === type ? "" : "outline-secondary"}
              onClick={() => setActiveSavingsType(type)}
              className={
                activeSavingsType === type ? "border-2" : "border-secondary"
              }
              style={{
                fontWeight: activeSavingsType === type ? "bold" : "normal",
                backgroundColor:
                  activeSavingsType === type ? "#005a8d" : "white",
                borderColor: activeSavingsType === type ? "#005a8d" : "#ced4da",
                color: activeSavingsType === type ? "white" : "black",
              }}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* 2. INFORMASI REKENING (Meneruskan fungsi navigasi yang sudah diperbarui) */}
        <div className="mx-3">
          {activeData && (
            <InformasiRekeningCard
              data={activeData}
              handleActionNavigation={handleActionNavigation}
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SimpananPage;
