import React, { useState, useCallback, useEffect } from "react";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { profileService } from "../../../services/profileService";
import { getSocket } from "../../../utils/socket";
import { jwtEncode } from "../../../utils/helpers";
import Alert from "../../../components/ui/SwalAlert";
import "./AccountPage.css";

// Modular Components
import ProfileSkeleton from "./components/ProfileSkeleton";
import ProfileHeaderCard from "./components/ProfileHeaderCard";
import ProfileInfoCards from "./components/ProfileInfoCards";
import SecurityAndActivitySection from "./components/SecurityAndActivitySection";
import EditProfileModal from "./components/EditProfileModal";
import ChangePasswordModal from "./components/ChangePasswordModal";

export default function AccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State profil anggota
  const [userProfile, setUserProfile] = useState(null);

  // State modal edit profil & tab aktif
  const [showEditModal, setShowEditModal] = useState(false);
  const [activeTab, setActiveTab] = useState("pribadi");
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    nik_ktp: "",
    alamat: "",
    province_id: "",
    city_id: "",
    district_id: "",
    subdistrict_id: "",
    rt: "",
    rw: "",
    bank_name: "",
    bank_account_no: "",
    account_holder: "",
    occupation: "",
    employer_name: "",
    employer_address: "",
    contact_name: "",
    phone_number_emergency: "",
    relation: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State modal ubah password
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Helper sinkronisasi profile ke form data
  const syncProfileToFormData = useCallback((profile) => {
    if (!profile) return;
    setFormData({
      nama: profile.nama || "",
      telepon: profile.telepon || "",
      nik_ktp: profile.nik_ktp || "",
      alamat: profile.alamat || "",
      province_id: profile.province_id || "",
      city_id: profile.city_id || "",
      district_id: profile.district_id || "",
      subdistrict_id: profile.subdistrict_id || "",
      rt: profile.rt || "",
      rw: profile.rw || "",
      bank_name: profile.bank_name && profile.bank_name !== "-" ? profile.bank_name : "",
      bank_account_no: profile.bank_account_no && profile.bank_account_no !== "-" ? profile.bank_account_no : "",
      account_holder: profile.account_holder && profile.account_holder !== "-" ? profile.account_holder : "",
      occupation: profile.occupation || "",
      employer_name: profile.employer_name || "",
      employer_address: profile.employer_address || "",
      contact_name: profile.contact_name || "",
      phone_number_emergency: profile.phone_number_emergency || "",
      relation: profile.relation || "",
    });
  }, []);

  const showNotification = useCallback((message, variant = "success") => {
    const iconMap = { success: "success", danger: "error", warning: "warning", info: "info" };
    Swal.fire({
      title: message,
      icon: iconMap[variant] || "info",
      toast: true,
      position: "top-end",
      timer: 3000,
      showConfirmButton: false,
    });
  }, []);

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError("");
      const response = await profileService.getProfile();
      if (response.success) {
        const profileData = profileService.mapBackendToFrontend(response.data);
        setUserProfile(profileData);
        syncProfileToFormData(profileData);
      } else {
        setError(response.message || "Gagal memuat data profil");
      }
    } catch (err) {
      console.error("Error loading profile:", err);
      setError(err.message || "Terjadi kesalahan saat memuat data profil");
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadProfileData();
  }, []);

  // Socket listener real-time profile update
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      const handleProfileUpdate = (data) => {
        const updatedProfile = profileService.mapBackendToFrontend(data);
        setUserProfile(updatedProfile);
        syncProfileToFormData(updatedProfile);
      };
      socket.on("profile:update", handleProfileUpdate);
      return () => socket.off("profile:update", handleProfileUpdate);
    }
  }, [syncProfileToFormData]);

  // Validasi form profil
  const validateForm = useCallback(() => {
    const newErrors = {};
    if (!formData.nama.trim()) {
      newErrors.nama = "Nama lengkap wajib diisi";
    }
    if (!formData.telepon.trim()) {
      newErrors.telepon = "Nomor telepon wajib diisi";
    }
    if (!formData.alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi";
    }
    if (formData.bank_account_no && !formData.bank_name) {
      newErrors.bank_name = "Nama bank wajib diisi jika nomor rekening diisi";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleOpenEditModal = (tab = "pribadi") => {
    setActiveTab(tab);
    syncProfileToFormData(userProfile);
    setErrors({});
    setShowEditModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const backendData = profileService.mapFrontendToBackend(formData);
      const response = await profileService.updateProfile(backendData);

      if (response.success) {
        const updatedProfile = profileService.mapBackendToFrontend(response.data);
        setUserProfile(updatedProfile);
        syncProfileToFormData(updatedProfile);
        setErrors({});
        setShowEditModal(false);
        showNotification("Profil berhasil diperbarui!", "success");
      } else {
        showNotification(response.message || "Gagal memperbarui profil", "danger");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      showNotification(err.message || "Terjadi kesalahan saat memperbarui profil", "danger");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Validasi form password
  const validatePasswordForm = useCallback(() => {
    const newErrors = {};
    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = "Password saat ini wajib diisi";
    }
    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "Password baru wajib diisi";
    } else if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = "Password baru minimal 6 karakter";
    }
    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Konfirmasi password wajib diisi";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = "Password baru tidak cocok";
    }
    setPasswordErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [passwordData]);

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!validatePasswordForm()) return;

    try {
      setIsChangingPassword(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setPasswordErrors({});
      setShowPasswordModal(false);
      showNotification("Password berhasil diubah!", "success");
    } catch (err) {
      console.error("Error changing password:", err);
      showNotification("Gagal mengubah password. Silakan coba lagi.", "danger");
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleTerminateKeanggotaan = async () => {
    navigate(`/${jwtEncode({ page: "resignationCheck" })}`);
  };

  return (
    <div className="ap-container py-3 dash-fade-in">
      {loading ? (
        <ProfileSkeleton />
      ) : error ? (
        <Alert variant="danger" className="m-3 text-center">
          <Alert.Heading>Error Memuat Data</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={loadProfileData}>
            Coba Lagi
          </Button>
        </Alert>
      ) : (
        <div>
          {/* Header Profil */}
          <ProfileHeaderCard
            userProfile={userProfile}
            onEditPhoto={() =>
              showNotification("Fitur mengubah foto profil akan segera hadir!", "info")
            }
          />

          {/* Kartu Informasi & Data Registrasi */}
          <ProfileInfoCards
            userProfile={userProfile}
            onOpenEditModal={handleOpenEditModal}
          />

          {/* Akses Cepat, Keamanan, Aktivitas, & Danger Zone */}
          <SecurityAndActivitySection
            userProfile={userProfile}
            onOpenPasswordModal={() => setShowPasswordModal(true)}
            onTerminateKeanggotaan={handleTerminateKeanggotaan}
            onShowNotification={showNotification}
          />
        </div>
      )}

      {/* Modal Terpadu Edit Profil & Pendaftaran */}
      <EditProfileModal
        show={showEditModal}
        onHide={() => setShowEditModal(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        formData={formData}
        setFormData={setFormData}
        errors={errors}
        isSubmitting={isSubmitting}
        onSubmit={handleSubmit}
        error={error}
        userProfile={userProfile}
        handleChange={handleChange}
      />

      {/* Modal Ubah Password */}
      <ChangePasswordModal
        show={showPasswordModal}
        onHide={() => setShowPasswordModal(false)}
        passwordData={passwordData}
        passwordErrors={passwordErrors}
        isChangingPassword={isChangingPassword}
        handlePasswordInputChange={handlePasswordInputChange}
        handlePasswordSubmit={handlePasswordSubmit}
      />
    </div>
  );
}
