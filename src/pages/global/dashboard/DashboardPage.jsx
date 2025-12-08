// src/pages/global/dashboard/DashboardPage.jsx

import React from "react";
// ✅ Ambil Custom Hook useProfile dari Context
import { useProfile } from "../../../contexts/ProfileContext";

// --- Import Komponen Dashboard ---
import RegistrationCard from "../../../components/dashboard/RegistrationCard";
import EvaluasiSection from "../../../components/dashboard/EvaluasiSection";
import FinancialSection from "../../../components/dashboard/FinancialSection";
import TagihanSection from "../../../components/dashboard/TagihanSection";
import PortofolioSection from "../../../components/dashboard/PortofolioSection";
import MainMenuSection from "../../../components/dashboard/MainMenuSection";
import ArtikelSection from "../../../components/dashboard/ArtikelSection";
import WelcomeGreeting from "../../../components/dashboard/WelcomeGreeting.jsx";

const DashboardPage = () => {
  // 1. Ambil userData dari Context.
  const { userData } = useProfile();

  // Guard Clause: DashboardLayout sudah menangani loading/error.
  // Ini hanya untuk memastikan data ada sebelum rendering konten dashboard.
  if (!userData) {
    return null;
  }

  // 2. Logika Penentuan Role
  // Asumsi: role 3 ke atas = Anggota Penuh, 1 ke bawah = Calon Anggota/Tidak Aktif
  const isFullMember = userData.role >= 3;
  const isCandidate = userData.role <= 1;

  // 3. Render Konten Dashboard
  return (
    <div className="container-fluid">
      {/* Wajib: Sambutan Personal (kini ambil data sendiri dari Context) */}
      <WelcomeGreeting />

      {/* Kondisional: Kartu Pendaftaran untuk Calon Anggota */}
      {isCandidate && <RegistrationCard user={userData} />}

      {/* Kondisional: Fitur Keuangan Inti (Hanya Anggota Penuh) */}
      {/* Catatan: FinancialSection, TagihanSection, dan PortofolioSection
           sebaiknya juga mengambil data mereka sendiri (self-fetching)
           dan tidak menerima userData sebagai props, kecuali MainMenuSection. */}
      {isFullMember && (
        <>
          <FinancialSection />
          {/* MainMenuSection masih bisa menerima user jika ada logika akses menu */}
          <MainMenuSection user={userData} />
          <TagihanSection />
        </>
      )}

      {/* Evaluasi Section (Asumsi Wajib) */}
      <EvaluasiSection />

      {/* Kondisional: Portofolio (Hanya Anggota Penuh) */}
      {isFullMember && <PortofolioSection />}

      {/* Wajib: Artikel Publik */}
      <ArtikelSection />
    </div>
  );
};

export default DashboardPage;
