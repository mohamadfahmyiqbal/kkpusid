// src/pages/global/dashboard/DashboardPage.jsx

import React from "react";
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
  // 1. Ambil data user dari ProfileContext
  const { userData } = useProfile();

  // Guard Clause jika data belum dimuat
  if (!userData) {
    return null;
  }

  // ============================================================
  // 1. LOGIKA STATUS (Berdasarkan status_id di tabel members)
  // ============================================================
  const statusId = parseInt(userData.status_id);

  // Asumsi: status_id 1 adalah 'Calon/Pending', status_id 2 ke atas adalah 'Aktif/Verified'
  const isCandidate = statusId <= 1;
  const isFullMember = statusId >= 2;
console.log(userData);

  // ============================================================
  // 2. LOGIKA ROLE (Berdasarkan role_id untuk hak akses menu)
  // ============================================================
  const roleId = parseInt(userData.role);

  const isManagement = roleId >= 2 && roleId <= 4; // Pengurus
  const isReguler = roleId === 5; // Anggota Reguler
  const isALB = roleId === 6; // Anggota Luar Biasa
  // 3. Logika Cek Kelengkapan Profil (Gunakan penamaan tabel)
  // Memeriksa address (tabel members), bank_info (tabel bank), dan employment_info (tabel pekerjaan)
  const isProfileIncomplete =
    !userData.address || !userData.bank_info || !userData.employment_info;

  return (
    <div className="container-fluid">
      {/* Kirim full_name ke WelcomeGreeting jika komponen tersebut membutuhkannya */}
      <WelcomeGreeting name={userData.full_name} />

      {/* --- ALERT KELENGKAPAN PROFIL --- */}
      {isProfileIncomplete && (
        <div className="alert alert-warning border-0 shadow-sm d-flex align-items-center mb-4">
          <div className="me-3 fs-3">⚠️</div>
          <div>
            <h6 className="mb-1 fw-bold">Profil Belum Lengkap</h6>
            <p className="mb-0 small text-dark">
              Mohon lengkapi data
              <span className="fw-bold">
                {!userData.address && " [Alamat]"}
                {!userData.bank_info && " [Rekening Bank]"}
                {!userData.employment_info && " [Pekerjaan]"}
              </span>{" "}
              agar akun Anda dapat diverifikasi sepenuhnya.
            </p>
          </div>
        </div>
      )}

      {/* --- AREA KONDISIONAL BERDASARKAN ROLE --- */}

      {/* 1. Jika masih Calon Anggota (Role 0 atau 1) */}
      {isCandidate && (
        <div className="mb-4">
          <RegistrationCard user={userData} />
        </div>
      )}

      {/* 2. Jika Anggota Luar Biasa (Role 6) - Beri Identitas Khusus */}
      {isALB && (
        <div className="alert alert-info border-0 shadow-sm mb-4">
          <i className="fa fa-info-circle me-2"></i>
          Anda login sebagai <strong>Anggota Luar Biasa (ALB)</strong>.
        </div>
      )}

      {/* 3. Fitur Utama (Hanya muncul untuk Role >= 2) */}
      {isFullMember && (
        <>
          {/* Ringkasan Saldo/Keuangan */}
          <FinancialSection />

          {/* Grid Menu Utama */}
          <MainMenuSection
            user={userData}
            isALB={isALB}
            isReguler={isReguler}
            isManagement={isManagement}
          />

          {/* Daftar Tagihan Aktif */}
          <TagihanSection />
        </>
      )}

      {/* --- SECTION UMUM (Tampil untuk semua role) --- */}
      <div className="row">
        <div className="col-lg-8">
          <EvaluasiSection />
          {/* Portofolio hanya untuk anggota penuh */}
          {isFullMember && <PortofolioSection />}
        </div>
        <div className="col-lg-4">
          <ArtikelSection />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
