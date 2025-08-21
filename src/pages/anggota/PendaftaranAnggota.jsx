import { useState, useCallback } from "react";
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
// import UAnggota from "../../utils/UAnggota"; // (Tidak dipakai)
import UApproval from "../../utils/UApproval";
import { FaArrowLeft } from "react-icons/fa";

export default function PendaftaranAnggota() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const handleNavigateEncrypted = useCallback(async () => {
    if (!user?.nik) {
      setError("Silakan login/isi data pengguna terlebih dahulu.");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const res = await UApproval.getApprovalByNikAndType({
        nik: user.nik,
        type: "pendaftaran_anggota",
      });

      const hasApproval = !!res?.data?.status;

      const token = jwtEncode({
        page: "detailPendaftaranAnggota",
        data: res.data,
      });

      navigate(`/page/${token}`);
    } catch (err) {
      // Fallback langsung ke form pendaftaran jika request gagal
      const token = jwtEncode({ page: "formPendaftaranAnggota", step: 1 });
      navigate(`/page/${token}`);
    } finally {
      setLoading(false);
    }
  }, [user?.nik, navigate]);

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
                <CardHeader className="bg-blue700 text-white">
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
                    className="bg-blue700 text-white fw-bold w-100 mb-3"
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
