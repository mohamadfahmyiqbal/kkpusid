// pages/program/arisan/FormPengajuanArisan.jsx

import React, { useState, useCallback, useEffect, useMemo } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Alert,
  Spinner,
} from "react-bootstrap";
import {
  FaCheck,
  FaExclamationTriangle,
  FaInfoCircle,
  FaLayerGroup,
  FaCalendarAlt,
  FaClipboardList,
  FaUsers,
  FaMoneyBillWave,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { jwtEncode } from "../../../utils/helpers";
import { useProfile } from "../../../components/layout/contexts";
import "./FormPengajuanArisan.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api";

const getApiUrl = (endpoint) => {
  const base = API_BASE_URL.endsWith("/api")
    ? API_BASE_URL
    : `${API_BASE_URL}/api`;
  return `${base}/${endpoint}`;
};

// --- Mock Data Fallback for Development ---
const MOCK_ARISAN_DETAILS = {
  "1": {
    arisan_id: 1,
    program_name: "Arisan Haji/Umroh Skema 1",
    batch_name: "Batch 2",
    category: "Arisan Haji/Umroh",
    target_amount: 50400000,
    monthly_contribution: 1400000,
    participant_count: 5,
    max_participants: 30,
    cooperation_months: 36,
    start_date: "2025-01-01",
    end_date: "2028-01-01",
    status: "available"
  },
  "0": {
    arisan_id: 0,
    program_name: "Arisan Haji/Umroh Skema 1",
    batch_name: "Batch 1",
    category: "Arisan Haji/Umroh",
    target_amount: 50400000,
    monthly_contribution: 1400000,
    participant_count: 6,
    max_participants: 6,
    cooperation_months: 36,
    start_date: "2025-01-01",
    end_date: "2025-12-31",
    status: "full"
  }
};

// --- Form Input Field Sub-component ---
const FormInputField = React.memo(
  ({
    label,
    value,
    name,
    type = "text",
    readOnly = false,
    onChange,
    placeholder = "",
    error = "",
    required = false,
    icon: Icon,
  }) => (
    <Form.Group className="mb-4 custom-input-group">
      <Form.Label className="form-label d-flex align-items-center">
        {Icon && <Icon className="me-2 text-teal" size={14} />}
        {label}
        {required && <span className="text-danger ms-1">*</span>}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        placeholder={placeholder}
        readOnly={readOnly}
        onChange={onChange}
        className={`custom-flat-input ${error ? "border-danger error-shake" : ""}`}
        isInvalid={!!error}
      />
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <Form.Control.Feedback type="invalid" className="d-block mt-1">
              <small className="text-danger fw-bold">{error}</small>
            </Form.Control.Feedback>
          </motion.div>
        )}
      </AnimatePresence>
    </Form.Group>
  )
);

// --- Summary Detail Sub-component ---
const SummaryDetail = React.memo(({ summaryData }) => {
  const getIcon = (key) => {
    if (key.includes("Kategori")) return <FaInfoCircle className="text-teal opacity-50" size={14} />;
    if (key.includes("Target")) return <FaMoneyBillWave className="text-teal opacity-50" size={14} />;
    if (key.includes("Setoran")) return <FaCheck className="text-teal opacity-50" size={14} />;
    if (key.includes("Peserta")) return <FaUsers className="text-teal opacity-50" size={14} />;
    if (key.includes("Durasi")) return <FaCalendarAlt className="text-teal opacity-50" size={14} />;
    return <FaLayerGroup className="text-teal opacity-50" size={14} />;
  };

  return (
    <div className="summary-gradient-card">
      <div className="summary-accent-header d-flex justify-content-between align-items-center">
        <h5 className="fw-bold mb-0 font-outfit">Ringkasan Arisan</h5>
        <div className="summary-badge-premium">Detail Grup</div>
      </div>
      <div className="p-4">
        <div className="summary-grid">
          {Object.entries(summaryData).map(([key, value]) => {
            const isTarget = key.includes("Target");
            const isContribution = key.includes("Setoran");
            return (
              <div className="summary-item" key={key}>
                <div className="d-flex align-items-center gap-2">
                  {getIcon(key)}
                  <span className="text-muted small fw-bold">{key}</span>
                </div>
                <span
                  className={`fw-bold ${isTarget || isContribution ? "large-amount-display" : "text-dark"}`}
                >
                  {value}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

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

      const response = await fetch(getApiUrl(`program/arisan/detail/${arisanId}`), {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        // Fallback to mock data if 404 and it's a known mock ID
        if (response.status === 404 && MOCK_ARISAN_DETAILS[arisanId]) {
          console.warn("Using mock data for arisan ID:", arisanId);
          setArisanData(MOCK_ARISAN_DETAILS[arisanId]);
          updateFormData(MOCK_ARISAN_DETAILS[arisanId]);
          return;
        }
        throw new Error(result.message || "Gagal mengambil detail arisan");
      }

      setArisanData(result.data);
      updateFormData(result.data);
    } catch (error) {
      console.error("Error fetching arisan detail:", error);
      
      // Secondary fallback attempt
      if (MOCK_ARISAN_DETAILS[arisanId]) {
        setArisanData(MOCK_ARISAN_DETAILS[arisanId]);
        updateFormData(MOCK_ARISAN_DETAILS[arisanId]);
        showNotification("warning", "Menampilkan data pratinjau (Offline Mode)");
      } else {
        showNotification(
          "danger",
          `Gagal memuat detail arisan: ${error.message}`
        );
      }
    } finally {
      setIsLoadingProducts(false);
    }
  }, [arisanId, showNotification]);

  const updateFormData = (data) => {
    if (!data) return;
    setFormData((prev) => ({
      ...prev,
      programArisan: `${data.program_name || ""} - ${data.batch_name || ""}`,
      periode: data.start_date
        ? `${new Date(data.start_date).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          })} - ${data.end_date ? new Date(data.end_date).toLocaleDateString("id-ID", {
            month: "long",
            year: "numeric",
          }) : ""}`
        : "",
    }));
  };

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
  }, [formData, arisanId, arisanData, userData, navigate, validateForm, showNotification]);

  const summaryData = useMemo(() => {
    if (!arisanData) {
      return {
        "Kategori Arisan": "-",
        "Target Nominal": "Rp -",
        "Setoran per Bulan": "Rp -",
        "Jumlah Peserta": "-",
        "Durasi Program": "-",
      };
    }

    return {
      "Kategori Arisan": arisanData.category || "-",
      "Target Nominal": new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(arisanData.target_amount || 0),
      "Setoran per Bulan": new Intl.NumberFormat("id-ID", {
        style: "currency",
        currency: "IDR",
        minimumFractionDigits: 0,
      }).format(arisanData.monthly_contribution || 0),
      "Jumlah Peserta": `${arisanData.participant_count || 0}/${arisanData.max_participants || 0} Orang`,
      "Durasi Program": `${arisanData.cooperation_months || 0} Bulan`,
    };
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
                  <Card className="premium-form-card border-0 p-3 p-md-4 mb-4">
                    <Card.Body>
                      <div className="form-section-header">
                        <h6 className="fw-bold font-outfit mb-0 text-dark">
                          Informasi Pendaftar
                        </h6>
                      </div>

                      <FormInputField
                        label="Nama Anggota"
                        name="namaAnggota"
                        value={formData.namaAnggota}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama lengkap pendaftar"
                        error={errors.namaAnggota}
                        readOnly={isLoading}
                        icon={FaUsers}
                        required
                      />

                      <FormInputField
                        label="Nama Peserta Ke-2"
                        name="namaPeserta2"
                        value={formData.namaPeserta2}
                        onChange={handleInputChange}
                        placeholder="Masukkan nama perwakilan / peserta cadangan"
                        error={errors.namaPeserta2}
                        readOnly={isLoading}
                        icon={FaUsers}
                        required
                      />

                      <div className="form-section-header mt-5">
                        <h6 className="fw-bold font-outfit mb-0 text-dark">
                          Detail Program
                        </h6>
                      </div>

                      <FormInputField
                        label="Nama Program"
                        name="programArisan"
                        value={formData.programArisan}
                        icon={FaLayerGroup}
                        readOnly
                      />

                      <FormInputField
                        label="Periode Angsuran"
                        name="periode"
                        value={formData.periode}
                        icon={FaCalendarAlt}
                        readOnly
                      />

                      <Form.Group className="mb-4 custom-input-group">
                        <Form.Label className="form-label d-flex align-items-center">
                          <FaClipboardList className="me-2 text-teal" size={14} />
                          Keterangan Pembukaan Arisan
                        </Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          name="keterangan"
                          value={formData.keterangan}
                          onChange={handleInputChange}
                          placeholder="Tambahkan keterangan pendukung pendaftaran..."
                          readOnly={isLoading}
                          className="custom-flat-input"
                        />
                      </Form.Group>

                    </Card.Body>
                  </Card>

                  {/* Akad details card */}
                  <Card className="premium-form-card border-0 p-3 p-md-4">
                    <Card.Body>
                      <div className="form-section-header">
                        <h6 className="fw-bold font-outfit mb-0 text-dark">
                          Akad Perjanjian
                        </h6>
                      </div>
                      <p className="small text-muted mb-0 leading-relaxed font-plus-jakarta">
                        {akadText}
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </Col>

              {/* RIGHT COLUMN: Sticky Summary & Agreements */}
              <Col lg={5} xl={4} className="sticky-summary-column">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                  className="d-flex flex-column gap-4"
                >
                  {/* Summary Info */}
                  <SummaryDetail summaryData={summaryData} />

                  {/* Agreement Checkboxes */}
                  <Card className="premium-form-card border-0 p-4">
                    <div className="form-section-header mb-3">
                      <h6 className="fw-bold font-outfit mb-0 text-dark">
                        Pernyataan Persetujuan
                      </h6>
                    </div>

                    <div className="d-flex flex-column gap-3">
                      <div className="custom-checkbox-premium">
                        <input
                          type="checkbox"
                          id="checkAkad"
                          checked={agreedAkad}
                          onChange={(e) => setAgreedAkad(e.target.checked)}
                          className="form-check-input"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="checkAkad"
                          className="form-check-label"
                        >
                          Saya menyetujui ketentuan Akad Perjanjian.
                        </label>
                      </div>

                      <div className="custom-checkbox-premium">
                        <input
                          type="checkbox"
                          id="checkSyarat"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="form-check-input"
                          disabled={isLoading}
                        />
                        <label
                          htmlFor="checkSyarat"
                          className="form-check-label"
                        >
                          Saya bersedia menaati Syarat & Ketentuan program.
                        </label>
                      </div>
                    </div>
                  </Card>

                  {/* Action Button */}
                  <div className="d-grid gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitDisabled}
                      className="btn-submit-premium w-100 d-flex flex-column align-items-center justify-content-center py-3"
                    >
                      {isLoading ? (
                        <div className="d-flex align-items-center gap-2">
                          <Spinner
                            animation="border"
                            size="sm"
                            variant="light"
                          />
                          <span className="fw-bold">
                            Memproses Pengajuan...
                          </span>
                        </div>
                      ) : (
                        <>
                          <span
                            className="fw-bold"
                            style={{ fontSize: "16px" }}
                          >
                            Proses Pengajuan Arisan
                          </span>
                          <small
                            className="opacity-75"
                            style={{ fontSize: "11px" }}
                          >
                            {formData.programArisan
                              ? "Konfirmasi Pendaftaran"
                              : "Pilih Program Terlebih Dahulu"}
                          </small>
                        </>
                      )}
                    </Button>

                    <div className="text-center mt-2">
                      <small
                        className="text-muted d-flex align-items-center justify-content-center gap-1"
                        style={{ fontSize: "11px" }}
                      >
                        <FaInfoCircle /> Setujui akad & ketentuan untuk
                        melanjutkan.
                      </small>
                    </div>
                  </div>
                </motion.div>
              </Col>
            </Row>
          </Form>
        )}
      </Container>
    </div>
  );
}
