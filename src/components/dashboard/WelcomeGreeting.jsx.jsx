// src/components/dashboard/WelcomeGreeting.jsx

import React from "react";
// ✅ Import hook useProfile
import { useProfile } from "../../contexts/ProfileContext";

// ❌ Hapus prop 'user'
const WelcomeGreeting = () => {
  // 1. ✅ Ambil data dari Context
  const { userData, loading } = useProfile();

  // Tampilkan loading state jika data masih dimuat
  if (loading) {
    return (
      <div className="mb-3">
        <h2 className="text-dark mb-0 mt-3">Assalamualaikum</h2>
        <h3 className="text-themecolor font-weight-bold mb-3">Memuat...</h3>
      </div>
    );
  }

  // 2. ✅ Gunakan userData dari context
  // Asumsi properti nama adalah 'nama' atau 'full_name'
  const userName = userData?.nama || userData?.full_name || "Anggota Koperasi";

  return (
    <>
      <h2 className="text-dark mb-0 mt-3">Assalamualaikum</h2>
      {/* Gunakan nama pengguna dinamis */}
      <h3 className="text-themecolor font-weight-bold mb-3">{userName}</h3>
    </>
  );
};

export default WelcomeGreeting;
