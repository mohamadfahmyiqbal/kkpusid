import React, { useState, useCallback } from "react";
import { Card, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import { FaArrowLeft } from "react-icons/fa";
import DashboardLayout from "../../components/layout/DashboardLayout";
import ProfileInfoCard from "../../components/anggota/account/ProfileInfoCard";

// --- DATA MOCKUP PENGGUNA (DIJADIKAN DINAMIS) ---
const initialUser = {
  nama: "Avhan Hadi",
  email: "avhan.hadi@pus.com",
  telepon: "081234567890",
  no_anggota: "PUS-007",
  jabatan: "Anggota Aktif",
  alamat: "Jl. Jend. Sudirman No. 12, Jakarta",
  foto: "",
  status: "Aktif", // Tambahkan status untuk badge
};

export default function AccountPage() {
  const navigate = useNavigate();
  // State utama untuk data profil
  const [userProfile, setUserProfile] = useState(initialUser);

  // State terpisah untuk form yang bisa diedit
  const [formData, setFormData] = useState({
    nama: userProfile.nama,
    telepon: userProfile.telepon,
    alamat: userProfile.alamat,
  });

  const handleBackToDashboard = useCallback(() => {
    const token = jwtEncode({ page: "dashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // ✅ Logika Simpan Perubahan (Mengupdate state userProfile)
    setUserProfile((prev) => ({
      ...prev,
      nama: formData.nama,
      telepon: formData.telepon,
      alamat: formData.alamat,
      // Email tidak diizinkan diubah di sini
    }));

    console.log("Data Akun Tersimpan:", formData);
    alert("Profil berhasil diperbarui!");
  };

  return (
    <DashboardLayout>
      {/* JUDUL HALAMAN DENGAN TOMBOL BACK */}
      <div className="row page-titles pt-3">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0">
            <span
              role="button"
              onClick={handleBackToDashboard}
              className="me-3 text-primary"
              style={{ cursor: "pointer" }}
            >
              <FaArrowLeft className="me-2" />
            </span>
            Pengaturan Akun & Profil
          </h3>
        </div>
      </div>

      {/* --- KONTEN HALAMAN AKUN --- */}
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
              <Form onSubmit={handleSubmit}>
                {/* Field Nama */}
                <Form.Group className="mb-3" controlId="formNama">
                  <Form.Label>Nama Lengkap</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Masukkan Nama Lengkap"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Field Email (Disabled/Read-only sesuai UI) */}
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Alamat Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={userProfile.email} // Ambil dari state utama
                    readOnly // ✅ Read-only sesuai praktik umum
                    disabled // ✅ Disabled agar tidak bisa diubah
                    className="bg-light"
                  />
                  <Form.Text className="text-muted">
                    Email tidak dapat diubah. Hubungi Administrator jika perlu
                    perubahan.
                  </Form.Text>
                </Form.Group>

                {/* Field Telepon */}
                <Form.Group className="mb-3" controlId="formTelepon">
                  <Form.Label>Nomor Telepon</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Masukkan Nomor Telepon"
                    name="telepon"
                    value={formData.telepon}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Field Alamat */}
                <Form.Group className="mb-4" controlId="formAlamat">
                  <Form.Label>Alamat</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Masukkan Alamat Lengkap"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                  />
                </Form.Group>

                {/* Tombol Simpan */}
                <Button variant="primary" type="submit">
                  Simpan Perubahan
                </Button>

                {/* Tombol Tambahan (Misal Ganti Password) */}
                <Button variant="outline-secondary" className="ms-2">
                  Ganti Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
