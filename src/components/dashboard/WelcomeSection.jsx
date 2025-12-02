// components/dashboard/WelcomeSection.jsx

import React from "react";

const WelcomeSection = ({ userName = "Avhan Hadi Bijaksana" }) => (
  <>
    <h2 className="text-dark mb-0 mt-3">Assalamualaikum</h2>
    <h3 className="text-themecolor font-weight-bold mb-3">{userName}</h3>

    <div className="card bg-info text-white p-3 mb-4 shadow">
      <div className="card-body">
        <h4 className="card-title text-white">Silahkan Daftar Anggota</h4>
        <p className="card-text">
          Untuk dapat mengakses keseluruhan fitur. (*Mengaju pada UU No 4 Tahun
          2023 dan Permenkop UKM No 8 Tahun 2023. Layanan ini bersifat inclusive
          loop, hanya diperuntukan untuk Anggota Koperasi
        </p>
        <div className="float-right text-white" style={{ fontSize: "2rem" }}>
          <i className="fa fa-arrow-right"></i>
        </div>
      </div>
    </div>
  </>
);

export default WelcomeSection;
