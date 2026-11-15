// components/layout/Footer.jsx

import React from "react";

const Footer = () => (
  <footer className="footer dashboard-footer text-center p-2 bg-white border-top">
    <div className="d-flex justify-content-between container-fluid">
      <small>Paguyuban Usaha Sukses @{new Date().getFullYear()}</small>
      <small className="text-muted">Powered By Manova</small>
    </div>
  </footer>
);

export default Footer;
