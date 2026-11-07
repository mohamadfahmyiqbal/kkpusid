import React from "react";
import { useNavigate } from "react-router-dom";

/**
 * Skip link — wcag 2.4.1 Bypass Blocks.
 * Fokuskan ke konten utama saat pengguna menekan Tab pertama kali.
 * Tempatkan di paling atas root/layout tiap halaman.
 */
export default function SkipLink({ targetId = "main-content" }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (el) {
      el.focus();
      el.setAttribute("tabindex", "-1");
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <a
      href={`#${targetId}`}
      onClick={handleClick}
      className="skip-link"
      aria-label="Lewati ke konten utama"
    >
      Lewati ke konten utama
    </a>
  );
};
