// pages/anggota/DashboardPage.jsx

import React from "react";
import DashboardLayout from "../../../components/layout/DashboardLayout";
import WelcomeGreeting from "../../../components/dashboard/WelcomeGreeting.jsx";
import RegistrationCard from "../../../components/dashboard/RegistrationCard";
import EvaluasiSection from "../../../components/dashboard/EvaluasiSection";
import ArtikelSection from "../../../components/dashboard/ArtikelSection";

// --- Komponen BARU untuk Role 3 (Sesuai Reguler.jpg) ---
import FinancialSection from "../../../components/dashboard/FinancialSection";
import TagihanSection from "../../../components/dashboard/TagihanSection";
import PortofolioSection from "../../../components/dashboard/PortofolioSection";
import MainMenuSection from "../../../components/dashboard/MainMenuSection.jsx";

// --- Data Mockup Pengguna (ROLE 3: Anggota Reguler/Penuh) ---
const mockUser = {
  nama: "Avhan Hadi Bijaksana", // Sesuai gambar Reguler.jpg
  email: "avhan.hadi@pus.com",
  foto: "../assets/images/users/1.jpg",
  role: 3, // 💡 SET 3 (Anggota Reguler/Penuh)
  no_anggota: "7100710000002103", // Sesuai gambar Reguler.jpg
  no_rekening: "010260000002103", // Sesuai gambar Reguler.jpg
  total_saldo: 800000.0, // Data mockup untuk Saldo
};

const DashboardPage = () => {
  // Logika: Tampilkan Kartu Pendaftaran HANYA JIKA role <= 1.
  const isCandidate = mockUser.role <= 1;

  // Logika: Tampilkan Fitur Penuh HANYA JIKA role >= 3.
  // Asumsi: role 2 adalah transisi/verifikasi. role 3 adalah aktif penuh.
  const isFullMember = mockUser.role >= 3;

  return (
    <DashboardLayout>
      <div className="container-fluid">
        <WelcomeGreeting user={mockUser} />

        {/* 1. KARTU PENDAFTARAN (Hanya untuk Calon Anggota) */}
        {isCandidate && <RegistrationCard user={mockUser} />}

        {/* 2. FITUR ANGGOTA PENUH (Hanya untuk Anggota Reguler/Penuh) */}
        {isFullMember && (
          <>
            <FinancialSection user={mockUser} />
            <MainMenuSection user={mockUser} />
            <TagihanSection user={mockUser} />
          </>
        )}

        {/* Evaluasi muncul untuk semua role, tetapi kontennya bisa berbeda */}
        <EvaluasiSection />

        {/* Portofolio dan Artikel ditampilkan di bawah Evaluasi */}
        {isFullMember && <PortofolioSection />}

        <ArtikelSection />
      </div>
    </DashboardLayout>
  );
};

export default DashboardPage;
