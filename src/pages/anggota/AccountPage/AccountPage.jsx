import React, { useState, useCallback, useEffect } from "react";
import { Card, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import { FaArrowLeft } from "react-icons/fa";
import ProfileInfoCard from "../../../components/anggota/account/ProfileInfoCard";
import { profileService } from "../../../services/profileService";
import { getSocket } from "../../../utils/socket";

// --- DATA MOCKUP PENGGUNA (DIJADIKAN DINAMIS) ---
const initialUser = {
  nama: "Avhan Hadi",
  email: "avhan.hadi@pus.com",
  telepon: "081234567890",
  no_anggota: "PUS-007",
  jabatan: "Anggota Aktif",
  alamat: "Jl. Jend. Sudirman No. 12, Jakarta",
  foto: "",
  status_id: 1, // Tambahkan status untuk badge
  member_type: "Calon Anggota", // Tambahkan status untuk badge
};

export default function AccountPage() {
  const navigate = useNavigate();
  // State untuk loading dan error
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // State utama untuk data profil
  const [userProfile, setUserProfile] = useState(null);

  // State terpisah untuk form yang bisa diedit
  const [formData, setFormData] = useState({
    nama: "",
    telepon: "",
    alamat: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load profile data dari backend
  useEffect(() => {
    loadProfileData();
  }, []);

  // Socket listener for real-time profile updates
  useEffect(() => {
    const socket = getSocket();
    if (socket) {
      const handleProfileUpdate = (data) => {
        console.log("👤 Profile update received:", data);
        // Update userProfile with new data
        const updatedProfile = profileService.mapBackendToFrontend(data);
        setUserProfile(updatedProfile);
        // Update formData to sync
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

  const loadProfileData = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await profileService.getProfile();

      if (response.success) {
        const profileData = profileService.mapBackendToFrontend(response.data);
        setUserProfile(profileData);

        // Update form data dengan data dari backend
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
    } else if (!/^\d+$/.test(formData.telepon.replace(/[-\s]/g, ""))) {
      newErrors.telepon = "Nomor telepon hanya boleh mengandung angka";
    }

    if (!formData.alamat.trim()) {
      newErrors.alamat = "Alamat wajib diisi";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleBackToDashboard = useCallback(() => {
    const token = jwtEncode({ page: "dashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error untuk field yang sedang di-edit
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi form sebelum submit
    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);
      setError("");

      // Map frontend data ke backend format
      const backendData = profileService.mapFrontendToBackend(formData);

      // Update profile via API
      const response = await profileService.updateProfile(backendData);

      if (response.success) {
        // Update local state dengan data baru dari backend
        const updatedProfile = profileService.mapBackendToFrontend(
          response.data,
        );
        setUserProfile(updatedProfile);

        // Update form data untuk sinkronisasi
        setFormData({
          nama: updatedProfile.nama,
          telepon: updatedProfile.telepon,
          alamat: updatedProfile.alamat,
        });

        // Clear errors setelah berhasil
        setErrors({});

        // Success feedback
        alert("Profil berhasil diperbarui!");
        // TODO: Ganti dengan toast notification yang lebih baik
      } else {
        setError(response.message || "Gagal memperbarui profil");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message || "Terjadi kesalahan saat memperbarui profil");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = useCallback(() => {
    // TODO: Implement password change functionality
    console.log("Password change clicked - implement modal or navigation");
  }, []);

  return (
    <div className="container-fluid pb-5 dash-fade-in dashboard-shell">
      {/* Header sederhana */}
      <div className="text-center mb-4">
        <h2 className="text-primary mb-3">Profil Anggota</h2>
        <p className="text-muted">Kelola informasi profil Anda</p>
      </div>

      {/* --- KONTEN HALAMAN AKUN --- */}
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "400px" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : error ? (
        <Alert variant="danger" className="m-3">
          <Alert.Heading>Error Memuat Data</Alert.Heading>
          <p>{error}</p>
          <Button variant="outline-danger" onClick={loadProfileData}>
            Coba Lagi
          </Button>
        </Alert>
      ) : (
        <div className="row">
          {/* Kolom Kiri: Profil Card (Menggunakan Komponen Baru) */}
          <div className="col-lg-4 col-xlg-3 col-md-5">
            <ProfileInfoCard user={userProfile} />
          </div>

          {/* Kolom Kanan: Form Pengaturan/Edit Profil */}
          <div className="col-lg-8 col-xlg-9 col-md-7">
            <Card>
              <Card.Body>
                <h4 className="card-title mb-4">Edit Informasi Akun</h4>

                {/* Error Alert */}
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.nama}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Field Email (Disabled/Read-only sesuai UI) */}
                  <Form.Group className="mb-3" controlId="formEmail">
                    <Form.Label>Alamat Email</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={userProfile?.email || ""} // Ambil dari state utama
                      readOnly //
                      disabled //
                      className="bg-light"
                    />
                    <Form.Text className="text-muted">
                      Email tidak dapat diubah. Hubungi Administrator jika perlu
                      perubahan.
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.telepon}
                    </Form.Control.Feedback>
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
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.alamat}
                    </Form.Control.Feedback>
                  </Form.Group>

                  {/* Tombol Aksi */}
                  <div className="d-flex gap-2">
                    <Button
                      variant="primary"
                      type="submit"
                      disabled={isSubmitting}
                    >
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

                    <Button
                      variant="outline-secondary"
                      onClick={handlePasswordChange}
                      disabled={isSubmitting}
                    >
                      Ganti Password
                    </Button>

                    <Button
                      variant="outline-primary"
                      onClick={handleBackToDashboard}
                      disabled={isSubmitting}
                    >
                      <FaArrowLeft className="me-2" />
                      Kembali ke Dashboard
                    </Button>
                  </div>
                </Form>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
