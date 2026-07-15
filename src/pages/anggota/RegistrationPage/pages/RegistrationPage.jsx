import React, { useCallback, useEffect, lazy, Suspense } from "react";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  FaFileSignature,
  FaListAlt,
  FaHeadset,
  FaArrowRight,
} from "react-icons/fa";
import { jwtEncode } from "../../../../utils/helpers";
import NotificationPrompt from "../../../../components/ui/NotificationPrompt";
import useRegistrationStatus from "../hooks/useRegistrationStatus";
import usePaymentHandler from "../../../../hooks/usePaymentHandler";
import "./RegistrationPage.css";

// Lazy load component yang berat
const RegistrationSummary = lazy(() => import("../../../../pages/anggota/RegistrationSummary"));

const REQUIREMENTS = [
  "Warga Negara Indonesia",
  "Melengkapi Dokumen Permohonan menjadi Anggota Koperasi",
  "Melunasi kewajiban Anggota yang ditentukan pada Anggaran Dasar / Anggaran Dasar Rumah Tangga",
];

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://localhost:3445/api";
const CLEAN_BASE_URL = BASE_URL.replace(/\/api$/, "") + "/";

const SUSPENSE_FALLBACK = (
  <div className="text-center p-5">
    <Spinner animation="border" />
  </div>
);

const RegistrationPage = () => {
  const navigate = useNavigate();
  const { isRegistered, registrationData, loading } = useRegistrationStatus();
  const { paymentSuccess, resetPaymentState } = usePaymentHandler();

  useEffect(() => {
    if (paymentSuccess) {
      const timer = setTimeout(() => resetPaymentState(), 3000);
      return () => clearTimeout(timer);
    }
  }, [paymentSuccess, resetPaymentState]);

  const handleBackToDashboard = useCallback(() => {
    navigate(`/${jwtEncode({ page: "dashboard" })}`);
  }, [navigate]);

  const handleFillForm = useCallback(() => {
    navigate(`/${jwtEncode({ page: "registrationFormDetail" })}`);
  }, [navigate]);

  /* ── Loading ── */
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center rp-loading-container">
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  /* ── Already registered ── */
  if (isRegistered && registrationData) {
    return (
      <Suspense fallback={SUSPENSE_FALLBACK}>
        {registrationData.final_status !== "APPROVED" && (
          <NotificationPrompt memberId={registrationData.registration_id} />
        )}
        <RegistrationSummary
          data={registrationData}
          onBackToDashboard={handleBackToDashboard}
          baseUrl={CLEAN_BASE_URL}
        />
      </Suspense>
    );
  }

  /* ── Main View ── */
  return (
    <div className="pb-5 dash-fade-in">
      <div className="rp-wrapper">

        {/* ── Section 1: Pendaftaran Anggota ── */}
        <div className="rp-section-card mb-4">
          <div className="p-4">
            {/* Card header */}
            <div className="d-flex align-items-flex-start gap-3 mb-3">
              <div className="rp-card-icon rp-card-icon-blue">
                <FaFileSignature size={22} />
              </div>
              <div>
                <h5 className="fw-bold mb-1 rp-section-title">
                  Pendaftaran Anggota
                </h5>
                <p className="mb-0 text-muted rp-section-desc">
                  Pendaftaran menjadi calon anggota dapat dilakukan dengan cara mengunjungi kantor
                  layanan terdekat atau secara daring (online) melalui aplikasi ini.
                </p>
              </div>
            </div>

            <p className="text-muted mb-4 rp-section-desc rp-section-content">
              Jika anda berminat untuk mendaftar sebagai anggota, silahkan klik tombol di bawah ini.
            </p>

            {/* CTA */}
            <div className="rp-section-content">
              <div className="rp-label">Permohonan Menjadi Anggota :</div>
              <button className="rp-btn-cta" onClick={handleFillForm}>
                <FaFileSignature size={15} />
                Isi Form Permohonan Menjadi Anggota
              </button>
            </div>
          </div>
        </div>

        {/* ── Section 2: Ketentuan Pendaftaran ── */}
        <div className="rp-section-card mb-4">
          <div className="p-4">
            {/* Card header */}
            <div className="d-flex align-items-flex-start gap-3 mb-4">
              <div className="rp-card-icon rp-card-icon-teal">
                <FaListAlt size={22} />
              </div>
              <div>
                <h5 className="fw-bold mb-1 rp-section-title">
                  Ketentuan Pendaftaran Anggota
                </h5>
                <p className="mb-0 text-muted rp-section-desc">
                  Mengacu pada Peraturan Menteri Koperasi dan Usaha Kecil dan Menengah Republik
                  Indonesia Nomor 10/Per/M.KUKM/IX/2015 syarat untuk menjadi anggota koperasi
                  sebagai berikut :
                </p>
              </div>
            </div>

            {/* Numbered requirements */}
            <div className="rp-section-content">
              {REQUIREMENTS.map((req, idx) => (
                <div className="rp-req-row" key={idx}>
                  <div className="rp-req-num">{idx + 1}</div>
                  <div className="rp-req-text">{req}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Section 3: Butuh Bantuan ── */}
        <div className="rp-bantuan-card">
          <div className="d-flex align-items-center gap-3">
            <div className="rp-bantuan-icon">
              <FaHeadset size={20} />
            </div>
            <div>
              <div className="fw-bold mb-1 rp-bantuan-title">
                Butuh Bantuan?
              </div>
              <p className="mb-0 text-muted rp-bantuan-desc">
                Jika Anda memiliki pertanyaan seputar pendaftaran anggota,<br className="d-none d-sm-block" />
                silakan hubungi tim layanan kami.
              </p>
            </div>
          </div>
          <button className="rp-btn-hubungi">
            <FaArrowRight size={12} />
            Hubungi Kami
          </button>
        </div>

      </div>
    </div>
  );
};

export default React.memo(RegistrationPage);
