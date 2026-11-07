import React from "react";
import { colors } from "../../theme/tokens";

/**
 * AppFooter terpusat (ME-04).
 * Penggunaan: <AppFooter variant="dark" />
 * Digunakan di halaman autentikasi dan halaman publik agar footer konsisten.
 * @param {string} variant - "dark" (default) atau "light"
 */
export default function AppFooter({ variant = "dark" }) {
  const isDark = variant === "dark";
  return (
    <footer
      className="app-footer text-center py-2"
      style={{
        background: isDark ? colors.primary : "#F8F9FA",
        color: isDark ? "#FFFFFF" : "#212529",
      }}
    >
      <div className="container-fluid">
        <div className="row align-items-center">
          <div className="col-md-6 text-start small fw-bold">
            Paguyuban Usaha Sukses &copy; {new Date().getFullYear()}
          </div>
          <div className="col-md-6 text-end small fw-bold">
            Powered By Manova
          </div>
        </div>
      </div>
    </footer>
  );
}
