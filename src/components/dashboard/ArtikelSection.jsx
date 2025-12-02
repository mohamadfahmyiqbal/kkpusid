// components/dashboard/ArtikelSection.jsx

import React from "react";

const ArtikelSection = () => (
  <div className="card mb-4 shadow">
    <div className="card-body p-3">
      <h4 className="card-title mb-3">Artikel</h4>

      <div className="article-content">
        <h5 className="font-weight-bold">Pinjaman Lunak</h5>
        <p className="text-muted mb-3">
          When you search for free CSS templates, you will notice that
          TemplateMo is one of the best websites.
        </p>

        {/* Dots dan Navigasi Hamburger */}
        <div className="d-flex justify-content-between align-items-center">
          <div className="dots">
            {/* Contoh dots indicator */}
            <span className="dot active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <i className="mdi mdi-menu"></i>
        </div>
      </div>
    </div>
  </div>
);

export default ArtikelSection;
