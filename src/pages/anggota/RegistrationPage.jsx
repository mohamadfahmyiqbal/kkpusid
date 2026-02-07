// src/pages/registration/RegistrationPage.jsx

import React, { useCallback, useState, useEffect, useRef } from "react";
import { Card, Button, Spinner, Badge } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import {
  FaArrowLeft,
  FaFileSignature,
  FaCheckCircle,
  FaInfoCircle,
  FaShieldAlt,
  FaGavel,
} from "react-icons/fa";
import UAnggota from "../../utils/api/UAnggota";
import NotificationPrompt from "../../components/ui/NotificationPrompt";
import RegistrationSummary from "../../components/anggota/regsitrationForm/RegistrationSummary";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const intervalRef = useRef(null);

  const BASE_URL = "https://api.kkpus.id";

  const fetchRegistrationStatus = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);

      const response = await UAnggota.getRegistrationStatus();
      const result = response.data;
      console.log(result);

      // Validasi berdasarkan flag pendaftaran selesai dari API
      if (
        result?.status === true &&
        result.is_registration_done === true &&
        result.data
      ) {
        setIsRegistered(true);
        setRegistrationData(result.data);

        // Hentikan polling jika sudah disetujui sepenuhnya
        if (result.data.final_status === "APPROVED" && intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      } else {
        setIsRegistered(false);
        setRegistrationData(null);
      }
    } catch (err) {
      console.error("--- DEBUG ERROR ---");
      console.error("Error Message:", err.message);
      setIsRegistered(false);
      setRegistrationData(null);
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrationStatus();

    // Polling setiap 30 detik
    intervalRef.current = setInterval(() => {
      fetchRegistrationStatus(false);
    }, 30000);

    const handleRefresh = () => {
      fetchRegistrationStatus(false);
    };
    window.addEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      window.removeEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);
    };
  }, [fetchRegistrationStatus]);

  const handleBackToDashboard = useCallback(() => {
    navigate(`/${jwtEncode({ page: "dashboard" })}`);
  }, [navigate]);

  const handleFillForm = useCallback(() => {
    navigate(`/${jwtEncode({ page: "registrationFormDetail" })}`);
  }, [navigate]);

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "80vh" }}
      >
        <Spinner animation="grow" variant="primary" />
      </div>
    );
  }

  if (isRegistered && registrationData) {
    return (
      <>
        {registrationData.final_status !== "APPROVED" && (
          <NotificationPrompt memberId={registrationData.registration_id} />
        )}
        <RegistrationSummary
          data={registrationData}
          onBackToDashboard={handleBackToDashboard}
          baseUrl={BASE_URL}
        />
      </>
    );
  }

  return (
    <div className="container-fluid pb-5 min-vh-100 bg-white">
      <div className="row pt-4 px-3 mb-4 align-items-center">
        <div className="col-auto">
          <button
            onClick={handleBackToDashboard}
            className="btn btn-outline-primary rounded-circle d-flex align-items-center justify-content-center"
            style={{ width: "45px", height: "45px" }}
          >
            <FaArrowLeft />
          </button>
        </div>
        <div className="col">
          <Badge
            bg="soft-primary"
            className="text-primary mb-1 rounded-pill px-3 py-2 border-0"
            style={{ backgroundColor: "rgba(13, 110, 253, 0.1)" }}
          >
            <FaShieldAlt className="me-2" /> Portal Keanggotaan Resmi
          </Badge>
          <h2 className="fw-bold text-dark mb-0">Pendaftaran Anggota</h2>
        </div>
      </div>

      <div className="row justify-content-center px-3">
        <div className="col-xl-10">
          <div className="row g-4">
            <div className="col-lg-7">
              <Card className="border-0 shadow-lg rounded-20 overflow-hidden h-100">
                <div className="p-4 p-md-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="bg-primary text-white rounded-3 p-2 me-3 d-flex align-items-center justify-content-center">
                      <FaInfoCircle size={20} />
                    </div>
                    <h4 className="fw-bold mb-0">Instruksi Pendaftaran</h4>
                  </div>

                  <p
                    className="text-secondary mb-4 fs-5"
                    style={{ lineHeight: "1.8" }}
                  >
                    Pendaftaran menjadi calon anggota dapat dilakukan secara
                    daring (online) melalui portal aplikasi ini untuk
                    mempercepat proses verifikasi.
                  </p>

                  <div className="bg-light rounded-3 p-4 mb-5 border-start border-primary border-4">
                    <p className="mb-0 text-dark fw-medium">
                      Silahkan klik tombol di bawah ini untuk memulai pengisian
                      formulir digital permohonan anggota:
                    </p>
                  </div>

                  <Button
                    onClick={handleFillForm}
                    variant="primary"
                    className="w-100 py-3 rounded-3 fw-bold shadow-lg"
                  >
                    <FaFileSignature className="me-2" />
                    Isi Form Permohonan Menjadi Anggota
                  </Button>
                </div>
              </Card>
            </div>

            <div className="col-lg-5">
              <Card className="border-0 shadow-sm rounded-20 bg-dark text-white h-100">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center mb-4 text-warning">
                    <FaGavel className="me-2 fs-4" />
                    <h5 className="fw-bold mb-0">Ketentuan Pendaftaran</h5>
                  </div>

                  <p className="text-white-50 small mb-4">
                    Berdasarkan{" "}
                    <strong>
                      Peraturan Menteri Koperasi dan UKM RI No. 10/2015
                    </strong>
                    , syarat utama meliputi:
                  </p>

                  <div className="requirement-items">
                    {[
                      "Warga Negara Indonesia (WNI)",
                      "Melengkapi Dokumen Permohonan Anggota",
                      "Melunasi kewajiban Anggota (AD/ART)",
                    ].map((text, idx) => (
                      <div key={idx} className="d-flex align-items-start mb-4">
                        <FaCheckCircle
                          className="text-success mt-1 me-3 flex-shrink-0"
                          size={18}
                        />
                        <span className="text-white opacity-90 small">
                          {text}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-3 rounded-3 border border-secondary border-dashed text-center">
                    <small className="text-white-50">
                      Layanan <strong>Inclusive Loop</strong> UU No 4/2023.
                    </small>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
