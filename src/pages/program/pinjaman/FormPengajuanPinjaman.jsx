// pages/program/pinjaman/FormPengajuanPinjaman.jsx

import React, { useState, useCallback, useEffect, useMemo } from "react";
import { Row, Col, Card, Form, Alert } from "react-bootstrap";
import { FaInfoCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { jwtEncode } from "../../../utils/helpers";
import useSocketListener from "../../../utils/helper/SocketListener";
import { useProfile } from "../../../components/layout/contexts";

// Import modular sub-components
import NominalTenorSection from "./components/NominalTenorSection";
import DisbursementSection from "./components/DisbursementSection";
import FileUploadField from "./components/FileUploadField";
import SimulationSummary from "./components/SimulationSummary";

import "./FormPengajuanPinjaman.css";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  process.env.REACT_APP_API_BASE_URL ||
  "https://localhost:3445/api";

const getApiUrl = (endpoint) => {
  const base = API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`;
  return `${base}/${endpoint}`;
};

const normalizeBankName = (bankName) => {
  if (!bankName) return "Bank Syariah Indonesia";
  const name = bankName.toLowerCase();
  if (name.includes("syariah") || name.includes("bsi")) return "Bank Syariah Indonesia";
  if (name.includes("mandiri")) return "Bank Mandiri";
  if (name.includes("bca") || name.includes("central asia")) return "BCA";
  if (name.includes("bri") || name.includes("rakyat indonesia")) return "BRI";
  if (name.includes("bni") || name.includes("negara indonesia")) return "BNI";
  return "Bank Syariah Indonesia";
};

export default function FormPengajuanPinjaman() {
  const navigate = useNavigate();
  const { userData } = useProfile();
  const [formData, setFormData] = useState({
    nominalPinjaman: "3000000",
    termPembayaran: "3",
    jenisPinjaman: "Darurat",
    metodePencairan: "Non Tunai",
    noRekening: "",
    bankTujuan: "Bank Syariah Indonesia",
    lokasiPencairan: "",
    tanggalPencairan: "",
    jamPencairan: "",
    namaNasabah: "",
  });

  useEffect(() => {
    if (userData) {
      const rawBankName = userData.bank_name || userData.bank_info?.bank_name || "";
      const defaultBankName = normalizeBankName(rawBankName);
      const defaultAccountNo = userData.bank_account_no || userData.bank_info?.bank_account_no || "";
      const defaultName = userData.name || userData.full_name || userData.member?.name || "";

      setFormData((prev) => ({
        ...prev,
        noRekening: prev.noRekening || defaultAccountNo,
        bankTujuan: prev.noRekening === "" ? defaultBankName : prev.bankTujuan,
        namaNasabah: prev.namaNasabah || defaultName,
      }));
    }
  }, [userData]);

  const [isLoading, setIsLoading] = useState(false);
  const [loanProducts, setLoanProducts] = useState([]);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [errors, setErrors] = useState({});
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [notification, setNotification] = useState({
    show: false,
    type: "",
    message: "",
  });

  const formatCurrency = (val) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(val);

  const fetchLoanProducts = useCallback(async () => {
    try {
      const response = await fetch(getApiUrl("program/pinjaman/produk"), {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      const result = await response.json();
      if (result.success) {
        setLoanProducts(result.data);
        if (result.data.length > 0) {
          const first = result.data[0];
          setFormData((prev) => ({
            ...prev,
            jenisPinjaman: first.name,
            termPembayaran: Math.min(first.default_term || 3, 3).toString(),
          }));
        }
      }
    } catch (error) {
      console.error("Error products:", error);
    } finally {
      setIsLoadingProducts(false);
    }
  }, []);

  useEffect(() => {
    fetchLoanProducts();
  }, [fetchLoanProducts]);

  useSocketListener((payload) => {
    if (payload?.entityRef === "financing_applications") {
      console.log("🔄 Financing application updated via socket");
      fetchLoanProducts();
    }
  });

  const selectedProduct = useMemo(
    () => loanProducts.find((p) => p.name === formData.jenisPinjaman),
    [loanProducts, formData.jenisPinjaman],
  );

  const validateForm = () => {
    const newErrors = {};
    const nominal = parseInt(formData.nominalPinjaman) || 0;
    if (nominal < 1000000) newErrors.nominalPinjaman = "Minimal pinjaman Rp 1.000.000";
    if (nominal > 3000000) newErrors.nominalPinjaman = "Maksimal pinjaman Rp 3.000.000";
    if (parseInt(formData.termPembayaran) > 3) newErrors.termPembayaran = "Maksimal tenor 3 bulan";
    
    if (formData.metodePencairan === "Non Tunai") {
      if (!formData.noRekening) newErrors.noRekening = "Nomor rekening wajib diisi";
      if (!formData.bankTujuan) newErrors.bankTujuan = "Pilih bank tujuan";
    } else {
      if (!formData.lokasiPencairan) newErrors.lokasiPencairan = "Lokasi wajib diisi";
      if (!formData.tanggalPencairan) newErrors.tanggalPencairan = "Pilih tanggal";
      if (!formData.jamPencairan) newErrors.jamPencairan = "Pilih jam";
    }
    if (!formData.namaNasabah) newErrors.namaNasabah = "Nama nasabah wajib diisi";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrors((prev) => ({ ...prev, [name]: "" }));

    if (name === "nominalPinjaman") {
      setFormData((prev) => ({ ...prev, [name]: value.replace(/\D/g, "") }));
    } else if (name === "jenisPinjaman") {
      const product = loanProducts.find((p) => p.name === value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
        termPembayaran: Math.min(product?.default_term || 3, 3).toString(),
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const setNominalQuick = (val) => {
    setErrors((prev) => ({ ...prev, nominalPinjaman: "" }));
    setFormData((prev) => ({ ...prev, nominalPinjaman: val.toString() }));
  };

  const setTenorQuick = (val) => {
    setFormData((prev) => ({ ...prev, termPembayaran: val.toString() }));
  };

  const uploadEvidenceFile = async (financingId, file) => {
    const formDataFile = new FormData();
    formDataFile.append("evidence", file);

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open("POST", getApiUrl(`financing/evidence/${financingId}`));
      xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);

      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          setUploadProgress(percent);
        }
      };

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (xhr.status >= 200 && xhr.status < 300) resolve(res);
        else reject(new Error(res.message || "Gagal upload file"));
      };

      xhr.onerror = () => reject(new Error("Network Error"));
      xhr.send(formDataFile);
    });
  };

  const handleProses = async () => {
    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const nominal = parseInt(formData.nominalPinjaman);
      const tenure = parseInt(formData.termPembayaran);

      const payload = {
        category: formData.jenisPinjaman,
        item_name: `Pinjaman ${formData.jenisPinjaman}`,
        amount_requested: nominal,
        down_payment: 0,
        principal_amount: nominal,
        tenure: tenure,
        monthly_installment: Math.ceil(nominal / tenure),
        metode_pencairan: formData.metodePencairan,
        nama_nasabah: formData.namaNasabah,
        akad_type: selectedProduct?.akad_type || "Murabahah",
        ...(formData.metodePencairan === "Non Tunai"
          ? {
              no_rekening: formData.noRekening,
              bank_tujuan: formData.bankTujuan,
            }
          : {
              lokasi_pencairan: formData.lokasiPencairan,
              tanggal_pencairan: formData.tanggalPencairan,
              jam_pencairan: formData.jamPencairan,
            }),
      };

      const res = await fetch(getApiUrl("financing/apply"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      if (!res.ok) throw new Error(result.message);

      if (uploadedFile) {
        setIsUploading(true);
        try {
          await uploadEvidenceFile(result.data.financing_id, uploadedFile);
        } catch (uploadError) {
          console.error("Upload error:", uploadError);
          setNotification({
            show: true,
            type: "warning",
            message:
              "Pengajuan berhasil, namun upload bukti gagal. Silakan upload melalui halaman detail.",
          });
        }
      }

      setNotification({
        show: true,
        type: "success",
        message: "Pengajuan berhasil dikirim!",
      });
      const financingId = result.data?.financing_id || result.data?.id;
      setTimeout(
        () => navigate(`/${jwtEncode({ page: "transactionDetailPage", financingId })}`),
        1500,
      );
    } catch (error) {
      setNotification({ show: true, type: "danger", message: error.message });
    } finally {
      setIsLoading(false);
      setIsUploading(false);
    }
  };

  const nominal = parseInt(formData.nominalPinjaman) || 0;
  const tenor = parseInt(formData.termPembayaran) || 1;
  const estimasiAngsuran = Math.ceil(nominal / tenor);

  return (
    <div className="form-page-container px-3 pb-5">
      {/* Toast Notification Container */}
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
                className="alert-premium"
                dismissible
                onClose={() => setNotification({ show: false })}
              >
                <div className="d-flex align-items-center gap-2">
                  <FaInfoCircle size={18} />
                  <span className="font-outfit fw-bold">{notification.message}</span>
                </div>
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="container-fluid py-4 font-plus-jakarta px-0">
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            handleProses();
          }}
        >
          <Row className="g-4">
            {/* Left Column: Form Fields */}
            <Col lg={7} xl={8} className="animate-fade-in">
              <Card className="premium-form-card border-0 p-3 p-md-4">
                <Card.Body>
                  <NominalTenorSection
                    loanProducts={loanProducts}
                    formData={formData}
                    errors={errors}
                    isLoadingProducts={isLoadingProducts}
                    handleInputChange={handleInputChange}
                    setNominalQuick={setNominalQuick}
                    setTenorQuick={setTenorQuick}
                  />

                  <hr className="my-4 border-slate-100" />

                  <DisbursementSection
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                  />

                  <hr className="my-4 border-slate-100" />

                  <FileUploadField
                    onFileChange={setUploadedFile}
                    isUploading={isUploading}
                    uploadProgress={uploadProgress}
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                  />
                </Card.Body>
              </Card>
            </Col>

            {/* Right Column: Sticky Summary & Simulation */}
            <Col lg={5} xl={4} className="animate-fade-in">
              <SimulationSummary
                formData={formData}
                selectedProduct={selectedProduct}
                formatCurrency={formatCurrency}
                nominal={nominal}
                tenor={tenor}
                estimasiAngsuran={estimasiAngsuran}
                isLoading={isLoading}
                isLoadingProducts={isLoadingProducts}
              />
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
}
