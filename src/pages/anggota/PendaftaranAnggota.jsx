import { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Alert,
  Spinner,
} from "react-bootstrap";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";

import { jwtEncode } from "../../routes/helpers";
import UAnggota from "../../utils/UAnggota";
import { FaArrowLeft } from "react-icons/fa";

export default function PendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // State untuk pengecekan status pendaftaran
  const [regStatus, setRegStatus] = useState(null);
  const [regLoading, setRegLoading] = useState(true);
  const [regChecked, setRegChecked] = useState(false);

  const navigate = useNavigate();

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  /**
   * Cek apakah user sudah memiliki pendaftaran anggota
   * Jika sudah, alihkan ke halaman detail pendaftaran
   */
  const checkRegistrationStatus = useCallback(async () => {
    const nik = user?.nik;
    if (!nik) {
      setRegLoading(false);
      setRegChecked(true);
      return;
    }

    try {
      setRegLoading(true);
      const res = await UAnggota.cekPendaftaranAnggota({ nik });

      if (res.data?.success && res.data?.exists) {
        // Sudah ada pendaftaran, alihkan ke halaman detail
        const data = res.data.data || {};
        navigate(`/${jwtEncode({ page: "detailPendaftaranAnggota" })}`, {
          state: {
            back: "pendaftaranAnggota",
            jenis: "pendaftaranAnggota",
            ...data,
          },
        });
      }
    } catch (err) {
      console.error("Gagal memeriksa status pendaftaran:", err);
      // Jika gagal cek, tetap izinkan akses ke form (fail-open)
    } finally {
      setRegLoading(false);
      setRegChecked(true);
    }
  }, [user?.nik, navigate]);

  useEffect(() => {
    checkRegistrationStatus();
  }, [checkRegistrationStatus]);

  const handleNavigateEncrypted = useCallback(async () => {
    if (!user?.nik) {
      setError("Silakan login/isi data pengguna terlebih dahulu.");
      return;
    }

    navigate(`/${jwtEncode({ page: "detailPendaftaranAnggota" })}`, {
      state: {
        back: "pendaftaranAnggota",
        jenis: "pendaftaranAnggota",
      },
    });
  }, [user?.nik, navigate]);

  // Jika masih sedang mengecek status, tampilkan loading
  if (regLoading) {
    return (
      <div id="main-wrapper">
        <Header onUserChange={handleUserChange} />
        <Sidebar user={user} />
        <div className="page-wrapper">
          <Container fluid className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
            <Spinner animation="border" role="status" className="text-primary" />
            <span className="ms-2">Memeriksa status pendaftaran...</span>
          </Container>
        </div>
        <Footer />
      </div>
    );
  }

  // Jika sudah dicek dan ada pendaftaran, sudah di-redirect di useEffect di atas
  // Tidak perlu render form lagi (sudah navigate)
  // Namun jika regChecked true dan tidak ada redirect (mis. exists false), tampilkan form

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="link"
                className="p-0 me-2"
                onClick={() => navigate(-1)}
                style={{ textDecoration: "none" }}
              >
                <FaArrowLeft size={15} color="black" />
              </Button>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col md={12} className="mb-3">
              <Card className="border shadow">
                <CardHeader className="bg-topbar text-white">
                  <CardTitle>Informasi Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  {error && (
                    <Alert variant="warning" className="mb-3">
                      {error}
                    </Alert>
                  )}

                  <CardText>
                    Pendaftaran menjadi calon anggota dapat dilakukan dengan
                    cara mengunjungi kantor layanan terdekat atau secara daring
                    melalui aplikasi ini. Jika Anda berminat untuk mendaftar
                    sebagai anggota, silakan klik tombol berikut:
                  </CardText>

                  <Button
                    className="bg-topbar text-white fw-bold w-100 mb-3"
                    onClick={handleNavigateEncrypted}
                    disabled={loading || !user?.nik}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          animation="border"
                          size="sm"
                          className="me-2"
                          role="status"
                          aria-hidden="true"
                        />
                        Memproses...
                      </>
                    ) : (
                      "Daftar Sekarang"
                    )}
                  </Button>

                  <CardTitle className="fw-bolder border-top border-bottom p-2">
                    Ketentuan Pendaftaran Anggota
                  </CardTitle>
                  <CardText as="div">
                    Mengacu pada Peraturan Menteri Koperasi dan UKM RI Nomor
                    10/Per/M.KUKM/IX/2015, syarat menjadi anggota koperasi:
                    <ul className="mb-0">
                      <li>Warga Negara Indonesia</li>
                      <li>Melengkapi dokumen permohonan</li>
                      <li>Melunasi kewajiban sesuai AD/ART</li>
                    </ul>
                  </CardText>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
