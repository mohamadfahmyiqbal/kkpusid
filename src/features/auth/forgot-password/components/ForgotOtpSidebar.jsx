import React from "react";
import { FaShieldAlt, FaClock, FaSyncAlt, FaUsers, FaGift, FaHeadset } from "react-icons/fa";

export default function ForgotOtpSidebar({ emailHp }) {
  return (
    <section className="pbs-register-left-v2">
      <span className="pbs-mini-badge">KOPERASI SYARIAH</span>

      <h1>
        Verifikasi
        <br />
        Kode
        <br />
        <span>OTP</span>
      </h1>

      <p>
        Masukkan kode 6 digit yang telah dikirim ke{" "}
        {emailHp || "email Anda"} untuk melanjutkan proses reset password.
      </p>

      <div className="pbs-left-illustration">
        <FaShieldAlt className="pbs-hero-icon" />
      </div>

      <div className="pbs-feature-list">
        <h4>Informasi OTP</h4>

        <div className="pbs-feature-item">
          <FaClock />
          <div>
            <strong>Berlaku 5 Menit</strong>
            <span>Kode OTP akan kadaluarsa dalam 5 menit.</span>
          </div>
        </div>

        <div className="pbs-feature-item">
          <FaSyncAlt />
          <div>
            <strong>Bisa Kirim Ulang</strong>
            <span>Request ulang jika tidak menerima kode.</span>
          </div>
        </div>

        <div className="pbs-feature-item">
          <FaUsers />
          <div>
            <strong>Aman & Privat</strong>
            <span>Kode hanya dikirim ke nomor terdaftar.</span>
          </div>
        </div>

        <div className="pbs-feature-item">
          <FaGift />
          <div>
            <strong>Proses Otomatis</strong>
            <span>Setelah verifikasi, lanjut ke reset password.</span>
          </div>
        </div>
      </div>

      <div className="pbs-help-box">
        <FaHeadset />
        <div>
          <strong>Butuh bantuan?</strong>
          <span>0812-3456-7890</span>
          <small>info@pbs.co.id</small>
        </div>
      </div>
    </section>
  );
}
