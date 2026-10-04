// components/dashboard/ArtikelSection.jsx

import React from "react";
import { FaBars } from "react-icons/fa";

const ArtikelSection = () => (
  <div className="card mb-4 shadow-sm border-0">
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
            <span className="dot dot-active"></span>
            <span className="dot"></span>
            <span className="dot"></span>
          </div>
          <FaBars className="text-muted" />
        </div>
      </div>
    </div>
  </div>
);

export default ArtikelSection;
