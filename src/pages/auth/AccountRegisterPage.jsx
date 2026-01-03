import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Card,
  Form,
  Button,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

// API & Helpers
import UAuth from "../../utils/api/UAuth";
import UNotification from "../../utils/api/UNotification";
import { urlBase64ToUint8Array } from "../../utils/helper/vapidHelper";
import { jwtEncode } from "../../routes/helpers";

// Layout
import LandingHeader from "../global/landing/component/LandingHeader";
import LandingFooter from "../global/landing/component/LandingFooter";

const LOGIN_PATH = `/${jwtEncode({ page: "authLogin" })}`;
const VAPID_PUBLIC_KEY =
  "BJXbT2u5wDHRDedzzH95qpvqC4blpjD_4RS2EUWWXHvbYVGkv459cP9dcpN6Ol4oc4Zr8WzVeUitO29K11rhpTA";

const AccountRegisterPage = () => {
  const navigate = useNavigate();

  // State Form Lengkap
  const [formData, setFormData] = useState({
    email: "",
    nama: "",
    nomorTelepon: "",
    password: "",
    nikKtp: "",
  });

  const [loading, setLoading] = useState(false);
  const [notifPermission, setNotifPermission] = useState("default");

  // Sinkronisasi status izin notifikasi saat komponen dimuat
  useEffect(() => {
    if ("Notification" in window) {
      setNotifPermission(Notification.permission);
    }
  }, []);

  /**
   * Fungsi pendaftaran Push Subscription ke Backend
   */
  const handlePushSubscription = useCallback(async (memberId) => {
    try {
      if (!("serviceWorker" in navigator)) return;

      // Menunggu Service Worker siap
      const registration = await navigator.serviceWorker.ready;

      // Mengambil atau membuat subscription baru
      let subscription = await registration.pushManager.getSubscription();

      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
        });
      }

      // Mengirim data subscription ke API backend
      await UNotification.subscribePush(subscription, memberId);
      console.log(
        "✅ Sinkronisasi push notification berhasil untuk member:",
        memberId
      );
    } catch (err) {
      console.error("⚠️ Gagal sinkronisasi push:", err.message);
    }
  }, []);

  /**
   * Handler Perubahan Input
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /**
   * Handler Registrasi Utama
   */
  const handleRegister = async (e) => {
    e.preventDefault();

    // Meminta izin notifikasi tepat saat tombol daftar ditekan
    let permission = "default";
    if ("Notification" in window) {
      permission = await Notification.requestPermission();
      setNotifPermission(permission);
    }

    setLoading(true);

    try {
      // 1. Eksekusi Registrasi ke API
      const res = await UAuth.accountRegister({
        email: formData.email.trim().toLowerCase(),
        full_name: formData.nama.trim(),
        phone_number: formData.nomorTelepon,
        password: formData.password,
        nik_ktp: formData.nikKtp,
      });

      if (res.data?.success) {
        toast.success("🚀 Registrasi berhasil!");

        // 2. Ambil member_id dari respon sukses
        const memberId = res.data?.data?.member_id;

        // 3. Jalankan Push Subscription jika izin diberikan
        if (memberId && permission === "granted") {
          await handlePushSubscription(memberId);
        }

        // 4. Redirect ke halaman login setelah jeda
        setTimeout(() => navigate(LOGIN_PATH), 2000);
      }
    } catch (err) {
      const msg =
        err.response?.data?.message || "Registrasi gagal, silakan coba lagi.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="l-main-wrapper">
      <LandingHeader
        targetPageName="authLogin"
        linkText="Login"
        iconType="login"
      />

      <div className="l-content d-flex align-items-center justify-content-center py-5">
        <Container>
          <Row className="justify-content-center">
            <Col xs={12} md={8} lg={6}>
              <Card className="shadow-lg border-0 rounded-4">
                <Card.Body className="p-4 p-md-5">
                  <h3 className="text-center mb-4 fw-bold">Daftar Akun Baru</h3>

                  {notifPermission === "denied" && (
                    <Alert variant="warning" className="small py-2 text-center">
                      ⚠️ Notifikasi diblokir. Mohon aktifkan di pengaturan
                      browser agar Anda bisa menerima pembaruan akun.
                    </Alert>
                  )}

                  <Form onSubmit={handleRegister}>
                    <Row>
                      <Col md={12} className="mb-3">
                        <Form.Label className="fw-semibold">
                          Nama Lengkap
                        </Form.Label>
                        <Form.Control
                          required
                          name="nama"
                          placeholder="Masukkan nama lengkap"
                          onChange={handleInputChange}
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-semibold">NIK KTP</Form.Label>
                        <Form.Control
                          required
                          name="nikKtp"
                          placeholder="16 Digit NIK"
                          onChange={handleInputChange}
                        />
                      </Col>

                      <Col md={6} className="mb-3">
                        <Form.Label className="fw-semibold">
                          Nomor WA
                        </Form.Label>
                        <Form.Control
                          required
                          name="nomorTelepon"
                          placeholder="0812..."
                          onChange={handleInputChange}
                        />
                      </Col>

                      <Col md={12} className="mb-3">
                        <Form.Label className="fw-semibold">Email</Form.Label>
                        <Form.Control
                          type="email"
                          required
                          name="email"
                          placeholder="nama@email.com"
                          onChange={handleInputChange}
                        />
                      </Col>

                      <Col md={12} className="mb-4">
                        <Form.Label className="fw-semibold">
                          Password
                        </Form.Label>
                        <Form.Control
                          type="password"
                          required
                          name="password"
                          placeholder="Minimal 6 karakter"
                          onChange={handleInputChange}
                        />
                      </Col>
                    </Row>

                    <Button
                      type="submit"
                      variant="primary"
                      className="w-100 p-3 fw-bold rounded-3 shadow-sm"
                      disabled={loading}
                    >
                      {loading ? (
                        <>
                          <Spinner
                            animation="border"
                            size="sm"
                            className="me-2"
                          />
                          Memproses...
                        </>
                      ) : (
                        "Daftar Sekarang"
                      )}
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>

      <LandingFooter />
    </div>
  );
};

export default AccountRegisterPage;
