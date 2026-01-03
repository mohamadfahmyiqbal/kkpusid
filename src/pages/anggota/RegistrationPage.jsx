import React, { useCallback, useState, useEffect } from "react";
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
import RegistrationSummary from "../../components/anggota/regsitrationForm/RegistrationSummary";

export default function RegistrationPage() {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [registrationData, setRegistrationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE_URL = "https://api.kkpus.id";

  const fetchRegistrationStatus = useCallback(async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const response = await UAnggota.getRegistrationStatus();
      const result = response.data;

      if (result?.status === true && result.data) {
        setIsRegistered(true);
        setRegistrationData({ ...result.data });
      } else {
        setIsRegistered(false);
        setRegistrationData(null);
      }
    } catch (err) {
      if (showLoading) setError("Gagal memuat status pendaftaran.");
    } finally {
      if (showLoading) setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRegistrationStatus();
    const handleRefresh = () => fetchRegistrationStatus(false);
    window.addEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);
    return () =>
      window.removeEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);
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
      <RegistrationSummary
        data={registrationData}
        onBackToDashboard={handleBackToDashboard}
        baseUrl={BASE_URL}
      />
    );
  }

  return (
    <div className="container-fluid pb-5 min-vh-100 bg-white">
      {/* Header Area */}
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
            className="text-primary mb-1 rounded-pill px-3 py-2"
          >
            <FaShieldAlt className="me-2" /> Portal Keanggotaan Resmi
          </Badge>
          <h2 className="fw-bold text-dark mb-0">Pendaftaran Anggota</h2>
        </div>
      </div>

      <div className="row justify-content-center px-3">
        <div className="col-xl-10">
          <div className="row g-4">
            {/* SISI KIRI */}
            <div className="col-lg-7">
              <Card className="border-0 shadow-lg rounded-20 overflow-hidden h-100">
                <div className="p-4 p-md-5">
                  <div className="d-flex align-items-center mb-4">
                    <div className="icon-box bg-primary text-white me-3">
                      <FaInfoCircle />
                    </div>
                    <h4 className="fw-bold mb-0">Instruksi Pendaftaran</h4>
                  </div>

                  <p
                    className="text-secondary mb-4 fs-5"
                    style={{ lineHeight: "1.8" }}
                  >
                    Pendaftaran menjadi calon anggota dapat dilakukan dengan
                    cara mengunjungi kantor layanan terdekat atau secara daring
                    (online) melalui aplikasi ini.
                  </p>

                  <div className="bg-light rounded-15 p-4 mb-5 border-start border-primary border-4">
                    <p className="mb-0 text-dark fw-medium">
                      Jika anda berminat untuk mendaftar sebagai anggota,
                      silahkan klik tombol di bawah ini untuk memulai pengisian
                      formulir digital:
                    </p>
                  </div>

                  <Button
                    onClick={handleFillForm}
                    variant="primary"
                    className="w-100 py-3 rounded-15 fw-bold shadow-lg btn-modern-action"
                  >
                    <FaFileSignature className="me-2" />
                    Isi Form Permohonan Menjadi Anggota
                  </Button>
                </div>
              </Card>
            </div>

            {/* SISI KANAN */}
            <div className="col-lg-5">
              <Card className="border-0 shadow-sm rounded-20 bg-dark text-white h-100">
                <Card.Body className="p-4 p-md-5">
                  <div className="d-flex align-items-center mb-4 text-warning">
                    <FaGavel className="me-2 fs-4" />
                    <h5 className="fw-bold mb-0">Ketentuan Pendaftaran</h5>
                  </div>

                  <p className="text-white-50 small mb-4">
                    Mengacu pada{" "}
                    <strong>
                      Peraturan Menteri Koperasi dan Usaha Kecil dan Menengah
                      Republik Indonesia Nomor 10/Per/M.KUKM/IX/2015
                    </strong>
                    , syarat utama meliputi:
                  </p>

                  <div className="requirement-items">
                    {[
                      "Warga Negara Indonesia",
                      "Melengkapi Dokumen Permohonan menjadi Anggota Koperasi",
                      "Melunasi kewajiban Anggota yang ditentukan pada Anggaran Dasar / Anggaran Dasar Rumah Tangga",
                    ].map((text, idx) => (
                      <div key={idx} className="d-flex align-items-start mb-4">
                        <FaCheckCircle
                          className="text-success mt-1 me-3 flex-shrink-0"
                          size={20}
                        />
                        <span className="text-white opacity-90">{text}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 p-3 rounded-12 border border-secondary border-dashed">
                    <small className="text-white-50 d-block text-center">
                      Sistem ini bersifat <strong>Inclusive Loop</strong> sesuai
                      UU No 4 Tahun 2023.
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
