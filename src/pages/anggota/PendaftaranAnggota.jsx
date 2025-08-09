import { useState, useCallback } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
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
  Spinner,
} from "react-bootstrap";
import CardCalon from "../../comp/dashboard/CardCalon";
import CardAnggota from "../../comp/dashboard/CardAnggota";
import CardTraining from "../../comp/training/CardTraining";
import CardArticle from "../../comp/article/CardArticle";
import Footer from "../../comp/global/Footer";

export default function PendaftaranAnggota() {
  const [user, setUser] = useState(null);

  // Optimized: useCallback to prevent unnecessary re-renders
  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12}>
              <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={12} lg={12} className="mb-3">
              <Card className="border shadow mb-3s">
                <CardHeader className="bg-blue700 text-white">
                  <CardTitle>Informasi Pendaftaran Anggota</CardTitle>
                </CardHeader>
                <CardBody>
                  <CardText>
                    Pendaftaran menjadi calon anggota dapat dilakukan dengan
                    cara mengunjungi kantor layanan terdekat atau secara daring
                    (online) melalui aplikasi ini. Jika anda berminat untuk
                    mendaftar sebagai anggota, silahkan klik tombol Isi Form
                    Permohonan Menjadi Anggota :
                  </CardText>
                  <Button
                    className="bg-blue700 text-white fw-bold w-100 mb-2"
                    onClick={() =>
                      (window.location.href = "/formPendaftaranAnggota")
                    }
                  >
                    Daftar Sekarang
                  </Button>
                  <CardTitle className="fw-bolder border-top border-bottom p-2">
                    Ketentuan Pendaftaran Anggota
                  </CardTitle>
                  <CardText>
                    Mengacu pada Peraturan Menteri Koperasi dan Usaha Kecil dan
                    Menengah Republik Indonesia Nomor 10/Per/M.KUKM/IX/2015
                    syarat untuk menjadi anggota koperasi sebagai berikut :{" "}
                    <br />
                    1. Warga Negara Indonesia <br />
                    2. Melengkapi Dokumen Permohonan menjadi Anggota Koperasi
                    <br />
                    3. Melunasi kewajiban Anggota yang ditentukan pada Anggaran
                    Dasar / Anggaran Dasar Rumah Tangga
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
