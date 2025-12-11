// src/pages/anggota/RegistrationFormDetail.jsx (FINAL DENGAN USER DATA & MOCKUP)

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
import UAnggota from "../../utils/api/UAnggota";
import { useProfile } from "../../contexts/ProfileContext";

// Import Step Components
import Step1PersonalData from "../../components/anggota/regsitrationForm/steps/Step1PersonalData";
import Step2Account from "../../components/anggota/regsitrationForm/steps/Step2Account";
import Step3CaptureKTP from "../../components/anggota/regsitrationForm/steps/Step3CaptureKTP.jsx";
import Step4Swafoto from "../../components/anggota/regsitrationForm/steps/Step4Swafoto";
import Step5Employment from "../../components/anggota/regsitrationForm/steps/Step5Employment";
import Step6EmergencyContact from "../../components/anggota/regsitrationForm/steps/Step6EmergencyContact";
import Step7BankData from "../../components/anggota/regsitrationForm/steps/Step7BankData";
import Step8Summary from "../../components/anggota/regsitrationForm/steps/Step8Summary";
import { FaCheckSquare } from "react-icons/fa"; // Pastikan ikon diimpor (jika digunakan)

// Base64 Placeholder untuk gambar (1x1 transparent PNG)
const IMAGE_MOCKUP_BASE64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0I... (Placeholder)";

// --- INITAL STATE DENGAN MOCKUP DATA ---
const initialFormData = {
 // Langkah 1: Data Diri Dasar (NIK dan Nama akan di-override oleh userData)
 nik_ktp: "1111111111111111", // MOCKUP: Akan di-override oleh userData.nik
 full_name: "Fahmy", // MOCKUP: Akan di-override oleh userData.full_name
 alamat_ktp: "Jl. Mockup No. 10, RT 01/RW 02, Jakarta Selatan", // MOCKUP

 // Langkah 2: Account Info (Email dan HP akan di-override oleh userData)
 tipeAnggota: "reguler", // MOCKUP: Nilai default
 phone_number: "081234567890", // MOCKUP: Akan di-override oleh userData.phone_number
 email: "mohamadfahmyiqbal@gmail.com", // MOCKUP: Akan di-override oleh userData.email

 // Langkah 3 & 4: Dokumentasi (Menggunakan placeholder Base64)
 foto_ktp: IMAGE_MOCKUP_BASE64, // MOCKUP
 foto_swafoto: IMAGE_MOCKUP_BASE64, // MOCKUP

 // Langkah 5: Employment
 occupation: "Software Engineer", // MOCKUP
 employer_name: "PT Mockup Cipta Solusi", // MOCKUP
 employer_address: "Komp. Ruko Dummy Blok B, Jakarta Barat", // MOCKUP

 // Langkah 6: Emergency Contact
 contact_name: "Ani Setiabudi", // MOCKUP
 phone_number_emergency: "089876543210", // MOCKUP
 relation: "Istri", // MOCKUP

 // Langkah 7: Bank Data
 bank_name: "Bank BNI", // MOCKUP
 bank_account_no: "1234567890", // MOCKUP
 account_holder: "Fahmy", // MOCKUP: Sesuaikan dengan nama pengguna
};

const totalSteps = 8;

export default function RegistrationFormDetail() {
 const navigate = useNavigate();
 const { userData, loading: profileLoading } = useProfile();

 const [step, setStep] = useState(1);
 const [formData, setFormData] = useState(initialFormData);
 const [errors, setErrors] = useState({});
 const [isSubmitting, setIsSubmitting] = useState(false);
 const [isCommitmentChecked, setIsCommitmentChecked] = useState(true); // MOCKUP: Set true agar mudah submit
 const [submitError, setSubmitError] = useState(null);

 const isLastStep = step === totalSteps;

 // --- INTEGRASI USER DATA DARI PROFILE CONTEXT ---
 useEffect(() => {
  if (userData) {
   setFormData((prevData) => ({
    ...prevData,
    // Override data mockup dengan data asli dari profil jika tersedia
    full_name: userData.full_name || prevData.full_name,
    nik_ktp: userData.nik || prevData.nik_ktp, // userData menggunakan 'nik'
    email: userData.email || prevData.email,
    phone_number: userData.phone_number || prevData.phone_number,

    // Optional: Jika Anda ingin nama pemilik rekening mengikuti nama profil
    account_holder: userData.full_name || prevData.account_holder,
   }));
  }
 }, [userData]);
 // --------------------------------------------------

 const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
   ...prevData,
   [name]: value,
  }));
  setErrors((prevErrors) => ({
   ...prevErrors,
   [name]: undefined,
  }));
 };

 const handleSetCapturedImage = useCallback(
  (fieldName, base64Image) => {
   setFormData((prevData) => ({
    ...prevData,
    [fieldName]: base64Image,
   }));
   setErrors((prevErrors) => ({
    ...prevErrors,
    [fieldName]: undefined,
   }));
  },
  [setFormData]
 );

 const stepProps = {
  formData,
  handleChange,
  errors,
  setFormData,
  handleSetCapturedImage
 };

 const handleEditStep = (targetStep) => {
  setStep(targetStep);
 };

 // --- VALIDASI PER LANGKAH (Sama seperti sebelumnya) ---
 const validateStep = (currentStep, data) => {
  let stepErrors = {};
  // ... (Logika validasi per langkah, tidak berubah)
  if (currentStep === 1) {
   if (!data.nik_ktp || data.nik_ktp.length !== 16) {
    stepErrors.nik_ktp = "NIK harus 16 digit.";
   }
   if (!data.full_name) {
    stepErrors.full_name = "Nama lengkap wajib diisi.";
   }
   if (!data.alamat_ktp) {
    stepErrors.alamat_ktp = "Alamat wajib diisi.";
   }
  } else if (currentStep === 2) {
   if (!data.tipeAnggota) {
    stepErrors.tipeAnggota = "Tipe anggota wajib dipilih.";
   }
   if (!data.phone_number || data.phone_number.length < 10) {
    stepErrors.phone_number = "Nomor HP tidak valid.";
   }
   if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) {
    stepErrors.email = "Format email tidak valid.";
   }
  } else if (currentStep === 3 && !data.foto_ktp) {
   stepErrors.foto_ktp = "Foto KTP wajib diambil.";
  } else if (currentStep === 4 && !data.foto_swafoto) {
   stepErrors.foto_swafoto = "Swafoto wajib diambil.";
  } else if (currentStep === 7) {
   if (!data.bank_name) {
    stepErrors.bank_name = "Nama bank wajib diisi.";
   }
   if (!data.bank_account_no) {
    stepErrors.bank_account_no = "Nomor rekening wajib diisi.";
   }
   if (!data.account_holder) {
    stepErrors.account_holder = "Nama pemilik rekening wajib diisi.";
   }
  }
  return stepErrors;
 };
 // --- END VALIDASI ---


 const nextStep = () => {
  const currentErrors = validateStep(step, formData);

  if (Object.keys(currentErrors).length > 0) {
   setErrors(currentErrors);
   return;
  }

  setErrors({});
  if (step < totalSteps) {
   setStep((prevStep) => prevStep + 1);
  }
 };

 const prevStep = () => {
  if (step > 1) {
   setStep((prevStep) => prevStep - 1);
  }
 };

 const handleSubmit = async () => {
  if (!isCommitmentChecked) {
   setErrors({ commitment: "Anda harus menyetujui pernyataan dan komitmen." });
   return;
  }

  setIsSubmitting(true);
  setSubmitError(null);

  try {
   const payload = { ...formData };
   const response = await UAnggota.submitRegistration(payload); // Ganti dengan fungsi API Anda

   if (response.status) {
    alert(
     "Pendaftaran Berhasil! Aplikasi Anda sedang dalam proses verifikasi."
    );
    // navigate("/registration/success");
   } else {
    setSubmitError(
     response.message || "Gagal mengirim pendaftaran. Silakan coba lagi."
    );
   }
  } catch (error) {
   console.error("Error saat submit:", error);
   setSubmitError(
    `Terjadi kesalahan sistem: ${error.message || "Gagal terhubung ke server."}`
   );
  } finally {
   setIsSubmitting(false);
  }
 };

 const renderStep = useMemo(() => {
  switch (step) {
   case 1:
    return <Step1PersonalData {...stepProps} />;
   case 2:
    return <Step2Account {...stepProps} isDataLoaded={!!userData} />;
   case 3:
    return <Step3CaptureKTP {...stepProps} setFormData={setFormData} />;
   case 4:
    return <Step4Swafoto {...stepProps} setFormData={setFormData} />;
   case 5:
    return <Step5Employment {...stepProps} />;
   case 6:
    return <Step6EmergencyContact {...stepProps} />;
   case 7:
    return <Step7BankData {...stepProps} />;
   case 8:
    return (
     <Step8Summary
      formData={formData}
      handleEditStep={handleEditStep}
      isCommitmentChecked={isCommitmentChecked}
      setIsCommitmentChecked={setIsCommitmentChecked}
     />
    );
   default:
    return <div>Langkah tidak ditemukan.</div>;
  }
 }, [step, stepProps, formData, isCommitmentChecked, userData]);


 if (profileLoading) {
  return (
   <Container className="py-5 text-center">
    <Alert variant="info" className="shadow-lg">
     Memuat data profil pengguna. Mohon tunggu sebentar...
    </Alert>
   </Container>
  );
 }


 return (
  <div className="registration-form-page py-5">
   <Container>
    <Card className="shadow-lg">
     <CardHeader className="bg-primary text-white">
      <CardTitle as="h3" className="mb-0">
       Formulir Pendaftaran Anggota
      </CardTitle>
     </CardHeader>
     <CardBody>

      <ProgressBar
       now={(step / totalSteps) * 100}
       label={`Langkah ${step} dari ${totalSteps}`}
       className="mb-4"
       variant="success"
      />

      {submitError && <Alert variant="danger">{submitError}</Alert>}
      {errors.commitment && <Alert variant="danger">{errors.commitment}</Alert>}

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