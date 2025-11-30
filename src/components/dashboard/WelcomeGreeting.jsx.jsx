// components/dashboard/WelcomeGreeting.jsx

import React from "react";

// Komponen hanya menerima objek 'user'
const WelcomeGreeting = ({ user }) => {
  // Ambil nama pengguna secara dinamis, fallback jika data tidak ada
  const userName = user?.nama || "Anggota Koperasi";

  return (
    <>
      <h2 className="text-dark mb-0 mt-3">Assalamualaikum</h2>
      {/* Gunakan nama pengguna dinamis */}
      <h3 className="text-themecolor font-weight-bold mb-3">{userName}</h3>
    </>
  );
};

export default WelcomeGreeting;
