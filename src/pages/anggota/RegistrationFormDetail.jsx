// src/pages/anggota/RegistrationFormDetail.jsx (FINAL VERSION)

import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  Row,
  ProgressBar,
  Alert,
} from "react-bootstrap";
import { useCallback, useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import UAnggota from "../../utils/api/UAnggota"; // Utility API untuk Anggota
import { jwtEncode } from "../../routes/helpers";
import { useProfile } from "../../contexts/ProfileContext"; // Import Profile Context

// Import Step Components (Asumsi path ini benar)
import Step1PersonalData from "../../components/anggota/regsitrationForm/steps/Step1PersonalData";
import Step2Account from "../../components/anggota/regsitrationForm/steps/Step2Account";
import Step3CaptureKTP from "../../components/anggota/regsitrationForm/steps/Step3CaptureKTP";
import Step4Swafoto from "../../components/anggota/regsitrationForm/steps/Step4Swafoto";
import Step5BankData from "../../components/anggota/regsitrationForm/steps/Step5BankData";
import Step6Summary from "../../components/anggota/regsitrationForm/steps/Step6Summary";
import { FaArrowLeft } from "react-icons/fa";

// Inisialisasi state awal form data
const initialFormData = {
  // Step 1: Personal Data
  nik_ktp: "",
  full_name: "",
  alamat_ktp: "",
  // Step 2: Account Info
  tipeAnggota: "", // Akan dikirim sebagai tipe_anggota
  phone_number: "", // Akan dikirim sebagai no_tlp
  email: "",
  // Step 3: KTP
  foto_ktp: "", // Base64
  // Step 4: Swafoto
  selfie_photo_path: "", // Base64, akan dikirim sebagai foto_swafoto
  // Step 5: Bank Data
  bank_name: "", // Akan dikirim sebagai nama_bank
  account_number: "", // Akan dikirim sebagai no_rekening
  account_holder_name: "", // Akan dikirim sebagai nama_pemilik_rek
  // Step 6: Commitment (Cekbox)
  komitmen: false,
};

export default function RegistrationFormDetail() {
  const navigate = useNavigate();
  // 💡 Menggunakan ProfileContext
  const { userData, loading } = useProfile();

  const [step, setStep] = useState(1);
  const [fields, setFields] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // Status pengiriman ke API

  const totalSteps = 6;
  const isLastStep = step === totalSteps;
  const isCommitmentChecked = fields.komitmen;

  // 1. EFFECT UNTUK PRE-FILL DATA DARI PROFILE CONTEXT
  useEffect(() => {
    if (!loading && userData) {
      setFields((prevFields) => ({
        ...prevFields,
        // Mapping fields dari userData (backend) ke fields form (frontend)
        nik_ktp: userData.nik_ktp || userData.nik || prevFields.nik_ktp,
        full_name: userData.full_name || userData.nama || prevFields.full_name,
        phone_number:
          userData.phone_number || userData.no_tlp || prevFields.phone_number,
        email: userData.email || prevFields.email,
        alamat_ktp:
          userData.alamat_ktp || userData.alamat || prevFields.alamat_ktp,
      }));
    }
  }, [userData, loading]);

  // 2. HANDLER PERUBAHAN FORM
  const handleChange = useCallback((e) => {
    const target = e.target;
    const { name, value, checked, type } = target;
    const finalValue = type === "checkbox" ? checked : value;

    setFields((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  }, []);

  const setFormData = useCallback((callbackOrObject) => {
    setFields((prev) => {
      if (typeof callbackOrObject === "function") {
        return callbackOrObject(prev);
      }
      return { ...prev, ...callbackOrObject };
    });
  }, []);

  // 3. LOGIKA VALIDASI
  const validateStep = useCallback(() => {
    let newErrors = {};
    let isValid = true;

    if (step === 1) {
      if (!fields.nik_ktp || fields.nik_ktp.length !== 16) {
        newErrors.nik_ktp = "NIK harus 16 digit";
        isValid = false;
      }
      if (!fields.full_name) {
        newErrors.full_name = "Nama Lengkap wajib diisi";
        isValid = false;
      }
      if (!fields.alamat_ktp) {
        newErrors.alamat_ktp = "Alamat wajib diisi";
        isValid = false;
      }
    } else if (step === 2) {
      if (!fields.tipeAnggota) {
        newErrors.tipeAnggota = "Tipe Anggota wajib dipilih";
        isValid = false;
      }
      if (!fields.phone_number) {
        newErrors.phone_number = "Nomor HP wajib diisi";
        isValid = false;
      }
      if (!fields.email || !fields.email.includes("@")) {
        newErrors.email = "Email tidak valid";
        isValid = false;
      }
    } else if (step === 3) {
      if (!fields.foto_ktp) {
        newErrors.foto_ktp = "Foto KTP wajib diambil";
        isValid = false;
      }
    } else if (step === 4) {
      if (!fields.selfie_photo_path) {
        newErrors.selfie_photo_path = "Swafoto wajib diambil";
        isValid = false;
      }
    } else if (step === 5) {
      if (!fields.bank_name) {
        newErrors.bank_name = "Nama Bank wajib diisi";
        isValid = false;
      }
      if (!fields.account_number) {
        newErrors.account_number = "Nomor Rekening wajib diisi";
        isValid = false;
      }
      if (!fields.account_holder_name) {
        newErrors.account_holder_name = "Nama Pemilik Rekening wajib diisi";
        isValid = false;
      }
    }

    setErrors(newErrors);
    return isValid;
  }, [step, fields]);

  // 4. LOGIKA NAVIGASI
  const nextStep = useCallback(() => {
    if (validateStep()) {
      setStep((prev) => Math.min(prev + 1, totalSteps));
    }
  }, [validateStep]);

  const prevStep = useCallback(() => {
    setStep((prev) => Math.max(prev - 1, 1));
  }, []);

  const handleEditStep = useCallback((targetStep) => {
    setStep(targetStep);
  }, []);

  // 5. RENDER LANGKAH FORM
  const renderStep = useMemo(() => {
    const stepProps = {
      formData: fields,
      handleChange: handleChange,
      setFormData: setFormData,
      errors: errors,
    };

    switch (step) {
      case 1:
        return <Step1PersonalData {...stepProps} />;
      case 2:
        return <Step2Account {...stepProps} />;
      case 3:
        return <Step3CaptureKTP {...stepProps} />;
      case 4:
        return <Step4Swafoto {...stepProps} />;
      case 5:
        return <Step5BankData {...stepProps} />;
      case 6:
        return (
          <>
            <Step6Summary formData={fields} handleEditStep={handleEditStep} />
            <h4 className="mb-3 mt-4 text-primary">Komitmen Anggota</h4>
            <Alert variant="danger">
              Mohon baca dan pahami komitmen di bawah sebelum melanjutkan.
            </Alert>
            <Form.Check
              type="checkbox"
              label="Saya siap berkomitmen belajar muamalah syariah dan meninggalkan transaksi riba."
              checked={fields.komitmen || false}
              onChange={handleChange}
              name="komitmen"
              id="komitmen-check"
              isInvalid={isLastStep && !fields.komitmen}
            />
            {isLastStep && !fields.komitmen && (
              <div className="invalid-feedback d-block">
                Anda harus menyetujui komitmen.
              </div>
            )}
          </>
        );
      default:
        return null;
    }
  }, [
    step,
    fields,
    errors,
    handleChange,
    setFormData,
    handleEditStep,
    isLastStep,
  ]);

  // 6. HANDLER SUBMIT FINAL KE BACKEND
  const handleSubmit = useCallback(async () => {
    if (!isCommitmentChecked) {
      setErrors({ komitmen: true });
      return;
    }

    setIsSubmitting(true);

    try {
      // 💡 MAPPING DATA SESUAI SKEMA BACKEND (Snake_Case)
      const dataToSubmit = {
        nik_ktp: fields.nik_ktp,
        nama: fields.full_name, // full_name -> nama
        alamat: fields.alamat_ktp, // alamat_ktp -> alamat
        tipe_anggota: fields.tipeAnggota, // tipeAnggota -> tipe_anggota
        no_tlp: fields.phone_number, // phone_number -> no_tlp
        email: fields.email,
        // Data gambar (diasumsikan Base64)
        foto_ktp: fields.foto_ktp,
        foto_swafoto: fields.selfie_photo_path, // selfie_photo_path -> foto_swafoto
        // Data Bank
        nama_bank: fields.bank_name, // bank_name -> nama_bank
        no_rekening: fields.account_number, // account_number -> no_rekening
        nama_pemilik_rek: fields.account_holder_name, // account_holder_name -> nama_pemilik_rek
      };

      // ✅ PANGGIL API UAnggota
      const response = await UAnggota.submitPendaftaran(dataToSubmit);

      console.log("Respon Pendaftaran Sukses:", response.data);

      // alert(
      //   "Pendaftaran Berhasil dikirim! Status pendaftaran akan segera diperiksa."
      // );

      // // Redirect ke halaman status pendaftaran
      // navigate(`/${jwtEncode({ page: "registrationPage" })}`, {
      //   replace: true,
      // });
    } catch (error) {
      console.error("Gagal melakukan pendaftaran:", error);
      const errorMessage =
        error.response?.data?.message ||
        "Terjadi kesalahan saat mengirim data. Pastikan semua data lengkap dan valid.";
      alert(`Gagal Mendaftar: ${errorMessage}`);
    } finally {
      setIsSubmitting(false); // Akhiri proses submit
    }
  }, [fields, isCommitmentChecked, navigate]);

  return (
    <div className="d-flex flex-column align-items-center w-100 py-4">
      <Button
        variant="light"
        className="mb-3 d-flex align-items-center"
        onClick={() => navigate(`/${jwtEncode({ page: "registrationPage" })}`)}
        disabled={isSubmitting}
      >
        <FaArrowLeft className="me-2" /> Kembali ke Status Pendaftaran
      </Button>
      <Container style={{ maxWidth: "800px" }}>
        <Card className="border shadow-sm">
          <CardHeader className="bg-primary text-white py-2">
            <CardTitle className="mb-0 fs-5">
              Form Pendaftaran Anggota
            </CardTitle>
          </CardHeader>

          <CardBody>
            {/* Tampilkan Loading state jika sedang memuat profil */}
            {loading && (
              <Alert variant="warning" className="text-center">
                Memuat data profil...
              </Alert>
            )}

            <ProgressBar
              now={(step / totalSteps) * 100}
              label={`Langkah ${step} dari ${totalSteps}`}
              className="mb-4"
              variant="success"
            />

            <Form onSubmit={(e) => e.preventDefault()}>
              {renderStep}

              <div className="d-flex justify-content-between mt-4 border-top pt-3">
                <Button
                  variant="secondary"
                  onClick={prevStep}
                  disabled={step === 1 || isSubmitting}
                >
                  Sebelumnya
                </Button>

                {isLastStep ? (
                  <Button
                    variant="success"
                    onClick={handleSubmit}
                    disabled={!isCommitmentChecked || isSubmitting}
                  >
                    {isSubmitting ? "Mengirim..." : "Kirim Permohonan"}
                  </Button>
                ) : (
                  <Button
                    variant="primary"
                    onClick={nextStep}
                    disabled={isSubmitting}
                  >
                    Selanjutnya
                  </Button>
                )}
              </div>
            </Form>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
}
