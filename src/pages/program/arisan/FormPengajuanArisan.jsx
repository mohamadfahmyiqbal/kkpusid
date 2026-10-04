// pages/program/arisan/FormPengajuanArisan.jsx

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Container, Row, Col, Form, Spinner } from "react-bootstrap";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { jwtEncode } from "../../../utils/helpers";
import { useProfile } from "../../../components/layout/contexts";
import Alert from "../../../components/ui/SwalAlert";

import ArisanApplicantForm from "./components/ArisanApplicantForm";
import ArisanAgreementSidebar from "./components/ArisanAgreementSidebar";
import { getApiUrl, buildSummaryData } from "./components/arisanHelpers";
import "./FormPengajuanArisan.css";

export default function FormPengajuanArisan({ decodedToken }) {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const arisanId = decodedToken?.arisanId;

  // Form input state
  const [formData, setFormData] = useState({
    namaAnggota: "",
    namaPeserta2: "",
    keterangan: "",
    programArisan: "",
    periode: "",
  });

  // Pre-fill user data
  useEffect(() => {
    if (userData) {
      setFormData((prev) => ({
        ...prev,
        namaAnggota:
          prev.namaAnggota ||
          userData.full_name ||
          userData.name ||
          userData.member?.name ||
          "",
      }));
    }
  }, [userData]);

  // API State
  const [arisanData, setArisanData] = useState(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [agreedAkad, setAgreedAkad] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);

  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const showNotification = useCallback((type, message) => {
    setNotification({ show: true, type, message });
    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 5000);
  }, []);

  const updateFormData = (data) => {
    if (!data) return;
    setFormData((prev) => ({
      ...prev,
      programArisan: `${data.program_name || ""} - ${data.batch_name || ""}`,
      periode: data.start_date
        ? `${new Date(data.start_date).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })} - ${
            data.end_date
              ? new Date(data.end_date).toLocaleDateString("id-ID", {
                  month: "long",
                  year: "numeric",
                })
              : ""
          }`
        : "",
    }));
  };

  // Fetch arisan metadata details
  const fetchArisanDetail = useCallback(async () => {
    if (arisanId === undefined || arisanId === null) {
      showNotification(
        "danger",
        "ID Arisan tidak ditemukan. Silakan pilih arisan dari daftar."
      );
      setIsLoadingProducts(false);
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const response = await fetch(
        getApiUrl(`program/arisan/detail/${arisanId}`),
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengambil detail arisan");
      }

      setArisanData(result.data);
      updateFormData(result.data);
    } catch (error) {
      console.error("Error fetching arisan detail:", error);
      showNotification(
        "danger",
        `Gagal memuat detail arisan: ${error.message}`
      );
    } finally {
      setIsLoadingProducts(false);
    }
  }, [arisanId, showNotification]);

  useEffect(() => {
    fetchArisanDetail();
  }, [fetchArisanDetail]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    if (!formData.namaAnggota || formData.namaAnggota.trim().length < 3) {
      newErrors.namaAnggota = "Nama anggota minimal 3 karakter";
    }

    if (!formData.namaPeserta2 || formData.namaPeserta2.trim().length < 3) {
      newErrors.namaPeserta2 = "Nama peserta kedua minimal 3 karakter";
    }

    if (!formData.programArisan) {
      newErrors.programArisan = "Program arisan belum terpilih";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setFormData((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleProses = useCallback(async () => {
    if (!validateForm()) {
      showNotification(
        "danger",
        "Mohon periksa kembali data yang Anda masukkan"
      );
      return;
    }

    setIsLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token tidak ditemukan. Silakan login kembali.");
      }

      const applicationData = {
        arisan_id: arisanId,
        item_name: formData.programArisan,
        nama_anggota: formData.namaAnggota,
        nama_peserta_2: formData.namaPeserta2,
        periode: formData.periode,
        keterangan: formData.keterangan,
      };

      const response = await fetch(getApiUrl("financing/apply-arisan"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(applicationData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Gagal mengirim pengajuan arisan");
      }

      localStorage.setItem("currentArisanId", result.data.arisan_id);
      showNotification("success", "Pengajuan arisan berhasil dikirim!");

      setTimeout(() => {
        const detailToken = jwtEncode({
          page: "transactionDetailPage",
          financingId: result.data.financing_id,
          action: "arisanEnrollment",
          return: "programPage",
        });
        navigate(`/${detailToken}`);
      }, 2000);
    } catch (error) {
      showNotification("danger", `Gagal mengirim pengajuan: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  }, [formData, arisanId, navigate, validateForm, showNotification]);

  const summaryData = useMemo(() => {
    return buildSummaryData(arisanData);
  }, [arisanData]);

  const akadText = useMemo(() => {
    return (
      arisanData?.akad_text ||
      "Berdasarkan akad Musyarakah Mutanaqisah (Kerjasama yang berkurang), di mana peserta bergabung dalam program arisan dengan pembayaran berkala sesuai kesepakatan."
    );
  }, [arisanData]);

  const isSubmitDisabled =
    isLoading || isLoadingProducts || !agreedAkad || !agreedTerms;

  return (
    <div className="form-page-container px-3 pb-5">
      {/* Floating Toast Notification */}
      <div className="floating-alert-container">
        <AnimatePresence>
          {notification.show && (
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
            >
              <Alert
                variant={notification.type}
                className="alert-premium d-flex align-items-center"
                dismissible
                onClose={() =>
                  setNotification((prev) => ({ ...prev, show: false }))
                }
              >
                {notification.type === "success" ? (
                  <FaCheck className="me-2 text-success" size={18} />
                ) : (
                  <FaExclamationTriangle
                    className="me-2 text-danger"
                    size={18}
                  />
                )}
                <div className="font-outfit fw-bold">
                  {notification.message}
                </div>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <Container fluid className="mt-4 px-0">
        {isLoadingProducts ? (
          <div className="text-center py-5">
            <Spinner
              animation="border"
              variant="teal"
              role="status"
              className="mb-3"
            >
              <span className="visually-hidden">Memuat data...</span>
            </Spinner>
            <p className="text-muted">Memuat detail grup arisan...</p>
          </div>
        ) : (
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              handleProses();
            }}
          >
            <Row className="g-4">
              {/* LEFT COLUMN: Input Fields */}
              <Col lg={7} xl={8}>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ArisanApplicantForm
                    formData={formData}
                    errors={errors}
                    isLoading={isLoading}
                    onChange={handleInputChange}
                    akadText={akadText}
                  />
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: Sticky Summary & Agreements */}
              <Col lg={5} xl={4} className="sticky-summary-column">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <ArisanAgreementSidebar
                    summaryData={summaryData}
                    agreedAkad={agreedAkad}
                    onAgreedAkadChange={setAgreedAkad}
                    agreedTerms={agreedTerms}
                    onAgreedTermsChange={setAgreedTerms}
                    isSubmitDisabled={isSubmitDisabled}
                    isLoading={isLoading}
                    programArisan={formData.programArisan}
                  />
                </motion.div>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
}
