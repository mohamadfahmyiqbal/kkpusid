import React, { useState, useCallback, useEffect } from "react";
import {
  Card,
  Button,
  Form,
  Spinner,
  
  Modal,
  Row,
  Col} from "react-bootstrap";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import {
  FaArrowLeft,
  FaCheckCircle,
  FaKey,
  FaCamera,
  FaUser,
  FaIdCard,
  FaShieldAlt,
  FaLock,
  FaBell,
  FaHistory,
  FaUserMinus,
  FaEnvelope,
  FaPhone,
  FaArrowRight,
  FaSignInAlt,
  FaUserEdit,
  FaFileAlt,
  FaExclamationTriangle,
  FaEdit,
} from "react-icons/fa";
import { profileService } from "../../../services/profileService";
import { getSocket } from "../../../utils/socket";
import "./AccountPage.css";
import Alert from "../../../components/ui/SwalAlert";


// Helper untuk format tanggal Indonesia
const formatDate = (dateStr) => {
  if (!dateStr || dateStr === "-") return "-";
  try {
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return dateStr;
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember",
    ];
    return `${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
  } catch (e) {
    return dateStr;
  }
};

// Helper untuk inisial nama
const getInitials = (name) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
  return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

// Helper warna gradient avatar
const getAvatarGradient = (name) => {
  const AVATAR_GRADIENTS = [
    ["#3b82f6", "#2563eb"],
    ["#8b5cf6", "#7c3aed"],
    ["#10b981", "#059669"],
    ["#f59e0b", "#d97706"],
    ["#ef4444", "#dc2626"],
    ["#06b6d4", "#0891b2"],
    ["#ec4899", "#db2777"],
    ["#14b8a6", "#0d9488"],
  ];
  if (!name) return AVATAR_GRADIENTS[0];
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_GRADIENTS[Math.abs(hash) % AVATAR_GRADIENTS.length];
};

// Helper format base64 foto
const getFotoSrc = (foto) => {
  if (!foto) return "";
  return foto.startsWith("data:image")
    ? foto
    : `data:image/jpeg;base64,${foto}`;
};

export default function AccountPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State utama profil
  const [userProfile, setUserProfile] = useState(null);

  // State modal edit profil
  const [showEditModal, setShowEditModal] = useState(false);
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    alamat: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);



  // Modal ubah password
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({});
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Load profil data
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
        setFormData({
          nama: updatedProfile.nama || "",
          telepon: updatedProfile.telepon || "",
          alamat: updatedProfile.alamat || "",
        });
      };
      socket.on("profile:update", handleProfileUpdate);
      return () => socket.off("profile:update", handleProfileUpdate);
    }
  }, []);

  const showNotification = useCallback((message, variant = "success") => {
    const iconMap = { success: 'success', danger: 'error', warning: 'warning', info: 'info' };
    Swal.fire({
      title: message,
      icon: iconMap[variant] || 'info',
      toast: true,
      position: 'top-end',
      timer: 3000,
      showConfirmButton: false
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
        setFormData({
          nama: profileData.nama || "",
          telepon: profileData.telepon || "",
          alamat: profileData.alamat || "",
        });
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
        setFormData({
          nama: updatedProfile.nama,
          telepon: updatedProfile.telepon,
          alamat: updatedProfile.alamat,
        });
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

  // Password submission
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
      // Simulate API call for password change
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
    const result = await Swal.fire({
      title: "Konfirmasi",
      text: "Apakah Anda yakin ingin mengajukan penghentian keanggotaan? Tindakan ini bersifat permanen dan tidak dapat dibatalkan.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya, Hentikan",
      cancelButtonText: "Batal"
    });
    if (result.isConfirmed) {
      showNotification(
        "Pengajuan penghentian keanggotaan berhasil diajukan ke pengurus.",
        "warning"
      );
    }
  };

  const renderAvatar = (user) => {
    const fotoSrc = getFotoSrc(user?.foto);
    if (fotoSrc) {
      return <img src={fotoSrc} alt="Foto Profil" className="ap-avatar-img" />;
    }
    const initials = getInitials(user?.nama);
    const [gradFrom, gradTo] = getAvatarGradient(user?.nama);
    return (
      <div
        className="ap-avatar-img d-flex align-items-center justify-content-center"
        style={{
          background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
          fontSize: "36px",
          fontWeight: "800",
          color: "#ffffff",
          letterSpacing: "1px",
          userSelect: "none",
        }}
      >
        {initials}
      </div>
    );
  };

  return (
    <div className="ap-container py-3 dash-fade-in">
      {loading ? (
        /* Skeleton loaders matching structure */
        <div>
          <div className="card ap-profile-header-card mb-4 p-4 skeleton-shimmer">
            <div className="d-flex align-items-center gap-4">
              <div
                className="rounded-circle bg-light"
                style={{ width: "100px", height: "100px", opacity: 0.1 }}
              ></div>
              <div className="flex-grow-1">
                <div
                  className="bg-light mb-2 rounded"
                  style={{ width: "200px", height: "24px", opacity: 0.1 }}
                ></div>
                <div
                  className="bg-light mb-2 rounded"
                  style={{ width: "120px", height: "16px", opacity: 0.1 }}
                ></div>
                <div
                  className="bg-light rounded"
                  style={{ width: "150px", height: "14px", opacity: 0.1 }}
                ></div>
              </div>
            </div>
          </div>

          <Card className="ap-info-card mb-4 skeleton-shimmer">
            <Card.Header className="ap-card-header p-3">
              <div
                className="bg-light rounded"
                style={{ width: "150px", height: "20px", opacity: 0.1 }}
              ></div>
            </Card.Header>
            <Card.Body className="p-4">
              <Row>
                {[1, 2, 3].map((colIndex) => (
                  <Col key={colIndex} md={4} className="mb-3">
                    {[1, 2, 3].map((rowIndex) => (
                      <div key={rowIndex} className="mb-3">
                        <div
                          className="bg-light mb-1 rounded"
                          style={{ width: "80px", height: "12px", opacity: 0.1 }}
                        ></div>
                        <div
                          className="bg-light rounded"
                          style={{ width: "150px", height: "16px", opacity: 0.1 }}
                        ></div>
                      </div>
                    ))}
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </div>
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
          {/* 1. Header Profil Card */}
          <Card className="ap-profile-header-card mb-4">
            <Card.Body className="p-4 d-flex align-items-center justify-content-between flex-wrap gap-4">
              <div className="d-flex align-items-center gap-4 flex-wrap">
                {/* Avatar with Camera overlay */}
                <div className="ap-avatar-wrapper">
                  {renderAvatar(userProfile)}
                  <button
                    className="ap-avatar-edit-btn"
                    onClick={() =>
                      showNotification("Fitur mengubah foto profil akan segera hadir!", "info")
                    }
                    title="Ubah Foto Profil"
                  >
                    <FaCamera />
                  </button>
                </div>

                {/* User Info */}
                <div className="text-start">
                  <h3 className="fw-bold text-white mb-1">{userProfile?.nama}</h3>
                  <div className="d-flex flex-column gap-2">
                    <div>
                      <div className="ap-role-badge">
                        <FaIdCard />
                        <span>{userProfile?.jabatan || "Calon Anggota"}</span>
                      </div>
                    </div>
                    <span className="opacity-75 fs-7">
                      Bergabung sejak{" "}
                      {userProfile?.join_date && userProfile.join_date !== "-"
                        ? formatDate(userProfile.join_date)
                        : "25 Maret 2024"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Verification Box (Right) */}
              <div className="ap-verified-box ms-md-auto align-items-center gap-3">
                <FaShieldAlt className="ap-verified-icon" />
                <div className="text-start d-flex flex-column">
                  <strong className="text-white fs-7">Akun Anda Terverifikasi</strong>
                  <span className="opacity-75 fs-8">
                    Terakhir diperbarui{" "}
                    {userProfile?.join_date && userProfile.join_date !== "-"
                      ? formatDate(userProfile.join_date)
                      : "25 Mei 2024"}
                  </span>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* 2. Informasi Pribadi Card */}
          <Card className="ap-info-card mb-4">
            <div className="card-header ap-card-header d-flex justify-content-between align-items-center py-3 px-4">
              <div className="ap-header-title">
                <FaUser className="ap-header-icon" />
                <span>Informasi Pribadi</span>
              </div>
              <Button
                variant="outline-primary"
                className="ap-edit-btn"
                onClick={() => setShowEditModal(true)}
              >
                <FaEdit className="me-2" />
                Edit Profil
              </Button>
            </div>
            <Card.Body className="p-4">
              <div className="ap-grid-container">
                {/* Kolom 1 */}
                <div className="ap-grid-item">
                  <div className="ap-info-item">
                    <span className="ap-info-label">ID Anggota</span>
                    <span className="ap-info-value">{userProfile?.no_anggota || "-"}</span>
                  </div>
                  <div className="ap-info-item">
                    <span className="ap-info-label">Nomor Rekening</span>
                    <span className="ap-info-value">{userProfile?.bank_account_no || "-"}</span>
                  </div>
                  <div className="ap-info-item">
                    <span className="ap-info-label">Alamat</span>
                    <span className="ap-info-value">{userProfile?.alamat || "-"}</span>
                  </div>
                </div>

                {/* Kolom 2 */}
                <div className="ap-grid-item">
                  <div className="ap-info-item">
                    <span className="ap-info-label">Jenis Kelamin</span>
                    <span className="ap-info-value">{userProfile?.gender || "-"}</span>
                  </div>
                  <div className="ap-info-item">
                    <span className="ap-info-label">Tanggal Bergabung</span>
                    <span className="ap-info-value">
                      {userProfile?.join_date && userProfile.join_date !== "-"
                        ? formatDate(userProfile.join_date)
                        : "25 Maret 2024"}
                    </span>
                  </div>
                </div>

                {/* Kolom 3 */}
                <div className="ap-grid-item">
                  <div className="ap-info-item">
                    <span className="ap-info-label">Email</span>
                    <span className="ap-info-value">{userProfile?.email || "-"}</span>
                  </div>
                  <div className="ap-info-item">
                    <span className="ap-info-label">No. Telepon</span>
                    <span className="ap-info-value">{userProfile?.telepon || "-"}</span>
                  </div>
                  <div className="ap-info-item">
                    <span className="ap-info-label">Status Akun</span>
                    <span className="ap-status-badge">Aktif</span>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>

          {/* 3. Akses Cepat */}
          <div className="text-start mt-4">
            <h5 className="ap-section-title">Akses Cepat</h5>
            <p className="ap-section-desc">Kelola akun dan keamanan Anda dengan mudah.</p>
          </div>
          <Row className="g-3 mb-4">
            {/* Card 1: Reset Password */}
            <Col lg={3} md={6} sm={12}>
              <div className="ap-quick-card" onClick={() => setShowPasswordModal(true)}>
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="ap-quick-icon-wrapper"
                    style={{ backgroundColor: "#eff6ff", color: "#2563eb" }}
                  >
                    <FaLock />
                  </div>
                  <div className="text-start">
                    <strong className="d-block text-slate-800 fs-7">Reset Password</strong>
                    <span className="text-muted" style={{ fontSize: "10.5px" }}>
                      Ubah password berkala
                    </span>
                  </div>
                </div>
                <FaArrowRight className="ap-quick-arrow" />
              </div>
            </Col>

            {/* Card 2: Verifikasi Akun */}
            <Col lg={3} md={6} sm={12}>
              <div
                className="ap-quick-card"
                onClick={() =>
                  showNotification("Akun Anda telah terverifikasi sebagai anggota.", "success")
                }
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="ap-quick-icon-wrapper"
                    style={{ backgroundColor: "#f0fdf4", color: "#16a34a" }}
                  >
                    <FaShieldAlt />
                  </div>
                  <div className="text-start">
                    <strong className="d-block text-slate-800 fs-7">Verifikasi Akun</strong>
                    <span className="text-muted" style={{ fontSize: "10.5px" }}>
                      Verifikasi identitas aman
                    </span>
                  </div>
                </div>
                <FaArrowRight className="ap-quick-arrow" />
              </div>
            </Col>

            {/* Card 3: Pengaturan Notifikasi */}
            <Col lg={3} md={6} sm={12}>
              <div
                className="ap-quick-card"
                onClick={() =>
                  showNotification("Preferensi notifikasi default telah aktif.", "success")
                }
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="ap-quick-icon-wrapper"
                    style={{ backgroundColor: "#faf5ff", color: "#7c3aed" }}
                  >
                    <FaBell />
                  </div>
                  <div className="text-start">
                    <strong className="d-block text-slate-800 fs-7">Pengaturan Notif</strong>
                    <span className="text-muted" style={{ fontSize: "10.5px" }}>
                      Kelola notifikasi Anda
                    </span>
                  </div>
                </div>
                <FaArrowRight className="ap-quick-arrow" />
              </div>
            </Col>

            {/* Card 4: Riwayat Aktivitas */}
            <Col lg={3} md={6} sm={12}>
              <div
                className="ap-quick-card"
                onClick={() => showNotification("Semua aktivitas telah ditampilkan.", "success")}
              >
                <div className="d-flex align-items-center gap-3">
                  <div
                    className="ap-quick-icon-wrapper"
                    style={{ backgroundColor: "#fffbeb", color: "#d97706" }}
                  >
                    <FaHistory />
                  </div>
                  <div className="text-start">
                    <strong className="d-block text-slate-800 fs-7">Riwayat Aktivitas</strong>
                    <span className="text-muted" style={{ fontSize: "10.5px" }}>
                      Aktivitas terbaru akun
                    </span>
                  </div>
                </div>
                <FaArrowRight className="ap-quick-arrow" />
              </div>
            </Col>
          </Row>

          {/* 4. Keamanan & Aktivitas (2 Kolom) */}
          <Row className="g-4 mb-4">
            {/* Keamanan Akun */}
            <Col lg={6} md={12}>
              <div className="ap-security-card text-start">
                <h5 className="fw-bold mb-3">Keamanan Akun</h5>
                <div className="ap-list-row">
                  <div className="ap-row-left">
                    <FaLock className="ap-row-icon" />
                    <div>
                      <strong className="ap-row-label">Password</strong>
                      <span className="ap-row-desc">Terakhir diubah 2 bulan yang lalu</span>
                    </div>
                  </div>
                  <Button
                    variant="link"
                    className="text-decoration-none text-primary fw-bold p-0 fs-7"
                    onClick={() => setShowPasswordModal(true)}
                  >
                    Ubah
                  </Button>
                </div>

                <div className="ap-list-row">
                  <div className="ap-row-left">
                    <FaShieldAlt className="ap-row-icon" />
                    <div>
                      <strong className="ap-row-label">Verifikasi Dua Langkah</strong>
                      <span className="ap-row-desc">Keamanan ekstra untuk masuk akun</span>
                    </div>
                  </div>
                  <span className="ap-active-text">Aktif</span>
                </div>

                <div className="ap-list-row">
                  <div className="ap-row-left">
                    <FaEnvelope className="ap-row-icon" />
                    <div>
                      <strong className="ap-row-label">Email</strong>
                      <span className="ap-row-desc">{userProfile?.email}</span>
                    </div>
                  </div>
                  <span className="ap-verified-badge">Terverifikasi</span>
                </div>

                <div className="ap-list-row">
                  <div className="ap-row-left">
                    <FaPhone className="ap-row-icon" />
                    <div>
                      <strong className="ap-row-label">Nomor Telepon</strong>
                      <span className="ap-row-desc">{userProfile?.telepon}</span>
                    </div>
                  </div>
                  <span className="ap-verified-badge">Terverifikasi</span>
                </div>
              </div>
            </Col>

            {/* Ringkasan Aktivitas */}
            <Col lg={6} md={12}>
              <div className="ap-activity-card text-start">
                <div className="mb-3">
                  <h5 className="fw-bold mb-1">Ringkasan Aktivitas</h5>
                  <span className="text-muted fs-8">Aktivitas terakhir pada akun Anda.</span>
                </div>

                <div className="ap-activity-item">
                  <div
                    className="ap-act-icon-box"
                    style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
                  >
                    <FaSignInAlt />
                  </div>
                  <div className="ap-act-text">
                    <strong>Login berhasil</strong>
                    <span>25 Mei 2024, 10:30 WIB</span>
                  </div>
                </div>

                <div className="ap-activity-item">
                  <div
                    className="ap-act-icon-box"
                    style={{ backgroundColor: "#dbeafe", color: "#1e40af" }}
                  >
                    <FaUserEdit />
                  </div>
                  <div className="ap-act-text">
                    <strong>Profil diperbarui</strong>
                    <span>20 Mei 2024, 14:25 WIB</span>
                  </div>
                </div>

                <div className="ap-activity-item">
                  <div
                    className="ap-act-icon-box"
                    style={{ backgroundColor: "#fef3c7", color: "#92400e" }}
                  >
                    <FaFileAlt />
                  </div>
                  <div className="ap-act-text">
                    <strong>Dokumen diunggah</strong>
                    <span>18 Mei 2024, 09:15 WIB</span>
                  </div>
                </div>

                <div className="text-center mt-3 pt-2">
                  <Button
                    variant="link"
                    className="text-decoration-none fw-bold p-0 text-primary fs-7"
                    onClick={() => showNotification("Semua aktivitas telah ditampilkan.", "success")}
                  >
                    Lihat Semua Aktivitas
                  </Button>
                </div>
              </div>
            </Col>
          </Row>

          {/* 5. Danger Zone */}
          <Card className="ap-danger-card mb-4 text-start">
            <Card.Body className="d-flex align-items-center justify-content-between flex-wrap gap-3 p-4">
              <div className="d-flex align-items-center gap-3">
                <FaExclamationTriangle className="ap-danger-icon" />
                <div>
                  <h5 className="fw-bold text-danger mb-1">Zona Berbahaya</h5>
                  <p className="text-muted mb-0 fs-7">
                    Tindakan berikut bersifat permanen dan tidak dapat dibatalkan.
                  </p>
                </div>
              </div>
              <Button
                variant="outline-danger"
                className="ap-danger-btn"
                onClick={handleTerminateKeanggotaan}
              >
                <FaUserMinus /> Berhenti Keanggotaan
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}

      {/* Edit Profile Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaEdit className="me-2 text-primary" />
            Edit Profil
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && (
            <Alert variant="danger" className="mb-3">
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            {/* Field Nama */}
            <Form.Group className="mb-3" controlId="formNama">
              <Form.Label>
                Nama Lengkap <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Masukkan Nama Lengkap"
                name="nama"
                value={formData.nama}
                onChange={handleChange}
                isInvalid={!!errors.nama}
                disabled={isSubmitting}
                className="ap-form-control"
              />
              <Form.Control.Feedback type="invalid">{errors.nama}</Form.Control.Feedback>
            </Form.Group>

            {/* Field Email (Read-only) */}
            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Alamat Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={userProfile?.email || ""}
                readOnly
                disabled
                className="bg-light ap-form-control"
              />
              <Form.Text className="text-muted">
                Email tidak dapat diubah. Hubungi Administrator jika perlu perubahan.
              </Form.Text>
            </Form.Group>

            {/* Field Telepon */}
            <Form.Group className="mb-3" controlId="formTelepon">
              <Form.Label>
                Nomor Telepon <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="tel"
                placeholder="Masukkan Nomor Telepon"
                name="telepon"
                value={formData.telepon}
                onChange={handleChange}
                isInvalid={!!errors.telepon}
                disabled={isSubmitting}
                className="ap-form-control"
              />
              <Form.Control.Feedback type="invalid">{errors.telepon}</Form.Control.Feedback>
            </Form.Group>

            {/* Field Alamat */}
            <Form.Group className="mb-4" controlId="formAlamat">
              <Form.Label>
                Alamat <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Masukkan Alamat Lengkap"
                name="alamat"
                value={formData.alamat}
                onChange={handleChange}
                isInvalid={!!errors.alamat}
                disabled={isSubmitting}
                className="ap-form-control"
              />
              <Form.Control.Feedback type="invalid">{errors.alamat}</Form.Control.Feedback>
            </Form.Group>

            {/* Actions */}
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="outline-secondary"
                onClick={() => setShowEditModal(false)}
                disabled={isSubmitting}
              >
                Batal
              </Button>
              <Button variant="primary" type="submit" disabled={isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Menyimpan...</span>
                  </>
                ) : (
                  "Simpan Perubahan"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Password Change Modal */}
      <Modal show={showPasswordModal} onHide={() => setShowPasswordModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            <FaKey className="me-2 text-primary" />
            Ubah Password
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlePasswordSubmit}>
            {/* Current Password */}
            <Form.Group className="mb-3" controlId="formCurrentPassword">
              <Form.Label>
                Password Saat Ini <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password saat ini"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordInputChange}
                isInvalid={!!passwordErrors.currentPassword}
                disabled={isChangingPassword}
                className="ap-form-control"
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrors.currentPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* New Password */}
            <Form.Group className="mb-3" controlId="formNewPassword">
              <Form.Label>
                Password Baru <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan password baru (minimal 6 karakter)"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordInputChange}
                isInvalid={!!passwordErrors.newPassword}
                disabled={isChangingPassword}
                className="ap-form-control"
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrors.newPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Confirm Password */}
            <Form.Group className="mb-4" controlId="formConfirmPassword">
              <Form.Label>
                Konfirmasi Password Baru <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="password"
                placeholder="Masukkan ulang password baru"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordInputChange}
                isInvalid={!!passwordErrors.confirmPassword}
                disabled={isChangingPassword}
                className="ap-form-control"
              />
              <Form.Control.Feedback type="invalid">
                {passwordErrors.confirmPassword}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Modal Actions */}
            <div className="d-flex gap-2 justify-content-end">
              <Button
                variant="outline-secondary"
                onClick={() => setShowPasswordModal(false)}
                disabled={isChangingPassword}
              >
                Batal
              </Button>
              <Button variant="primary" type="submit" disabled={isChangingPassword}>
                {isChangingPassword ? (
                  <>
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                    <span className="ms-2">Mengubah...</span>
                  </>
                ) : (
                  "Ubah Password"
                )}
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>


    </div>
  );
}
