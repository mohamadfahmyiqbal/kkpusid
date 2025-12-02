// components/layout/Footer.jsx

import React from "react";

const Footer = () => (
  // Menggunakan kelas untuk footer sticky/fixed di mobile
  <footer className="footer fixed-bottom text-center p-2 bg-white border-top">
    <div className="d-flex justify-content-between container-fluid">
      <small>Paguyuban Usaha Sukses @2025</small>
      <small className="text-muted">Powered By Manova</small>
    </div>
  </footer>
);

export default Footer;
