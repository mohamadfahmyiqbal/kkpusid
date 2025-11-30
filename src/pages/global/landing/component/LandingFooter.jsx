import React from "react";
import { Container } from "react-bootstrap";

const LandingFooter = () => {
  return (
    // PERUBAHAN: Kelas bg-dark dihapus. Footer kini menyatu dengan background utama (l-main-wrapper).
    <footer className="l-footer text-white p-3 mt-auto">
      <Container className="d-flex justify-content-between align-items-center small">
        <span>Paguyuban Usaha Sukses @2025</span>
        <span>Powered By Manova</span>
      </Container>
    </footer>
  );
};

export default LandingFooter;
