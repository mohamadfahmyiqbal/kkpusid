import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Row,
  Image,
 Form
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import CardSimpanan from "../../comp/simpanan/CardSimpanan";

import { jwtEncode } from "../../routes/helpers";
import UTransaksi from "../../utils/UTransaksi";
import URequest from "../../utils/URequest";

export default function JBScreen() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [JBData, setJBData] = useState([]);
  const [loading, setLoading] = useState(false);

  /** Handler untuk update user */
  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  /** Handler click tombol atau kategori */
  const handleClick = useCallback(
    (action, payload) => {
      switch (action) {
        case "formJB":
          navigate(`/${jwtEncode({ page: "formJB" })}`);
          break;
        case "back":
          navigate(`/${jwtEncode({ page: "dashboard" })}`);
          break;
        case "category":
          setSelectedCategory(payload);
          break;
        case "tagihan":
          navigate(`/${jwtEncode({ page: "tagihan" })}`);
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  /** Ambil data transaksi Jual Beli */
  const getTransaksi = useCallback(async () => {
    setLoading(true);
    try {
      const res = await UTransaksi.findTransByJenis({ jenis: "Jual Beli" });
     
      setJBData(res?.data?.data || []);
    } catch (error) {
      console.error("Gagal mengambil transaksi:", error);
      setJBData([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getTransaksi();
 }, [getTransaksi]);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container fluid>
          {/* Header page */}
          <Row className="border-bottom mb-3 align-items-center">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 d-flex align-items-center"
                onClick={() => handleClick("back")}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">Transaksi</h1>
            </Col>
          </Row>

          {/* Card informasi transaksi */}
          <Row className="mt-4">
            <Col xs={12}>
              <Card
                className={`text-white text-center ${
                  JBData.length > 0 ? "bg-blue700" : "bg-danger"
                }`}
              >
                <CardBody>
                  <CardTitle>Informasi Transaksi</CardTitle>

                  {loading ? (
                    <CardText>Memuat data...</CardText>
                  ) : JBData.length === 0 ? (
                    <div className="d-flex flex-column align-items-center justify-content-center mt-3">
                      <CardText className="mb-3">
                        Anda Belum Memiliki Transaksi
                      </CardText>
                      <Button
                        size="sm"
                        variant="light"
                        className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                        onClick={() => handleClick("formJB", null)}
                      >
                        <Image
                          src="/assets/icons/handshake.png"
                          height={28}
                          className="mb-1"
                        />
                        <span>Pengajuan</span>
                      </Button>
                    </div>
                  ) : (<>
                   
                    <Row>
                   <Col xs="4">
                   <CardText className="text-start">
                      Nama
                      </CardText>
                   </Col>
                  <Col xs="8">
                   <CardText className="text-end">
                      {JBData?.anggota?.nama}
                      </CardText>
                   </Col>
                    </Row>
                   <Row>
                   <Col xs="6">
                   <CardText className="text-start">
                      Produk
                      </CardText>
                   </Col>
                  <Col xs="6">
                   <CardText className="text-end">
                      Transaksi
                      </CardText>
                   </Col>
                    </Row>
                   <Row>
                   <Col xs="6">
                   <CardText className="text-start">
                      Akad
                      </CardText>
                   </Col>
                  <Col xs="6">
                   <CardText className="text-end">
                      Nama
                      </CardText>
                   </Col>
                    </Row>
                   <Row>
                   <Col xs="6">
                   <CardText className="text-start">
                      Saldo Akhir
                      </CardText>
                   </Col>
                  <Col xs="6">
                   <CardText className="text-end">
                      Nama
                      </CardText>
                   </Col>
                    </Row>
                   <Row>
                   <Col xs="6">
                   <CardText className="text-start">
                      Tanggal Buka
                      </CardText>
                   </Col>
                  <Col xs="6">
                   <CardText className="text-end">
                       {JBData?.createdAt}
                      </CardText>
                   </Col>
                    </Row>
                   <Row className="text-center justify-content-center">
                  <Col xs="auto">
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                      onClick={() => handleClick("Sukarela")}
                    >
                      <Image
                        src="/assets/icons/depositbox.png"
                        height={28}
                        className="mb-1"
                      />
                      <span>Setoran</span>
                    </Button>
                  </Col>
                  <Col xs="auto">
                    <Button
                      size="sm"
                      variant="outline-light"
                      className="rounded fw-bold d-flex flex-column align-items-center justify-content-center px-3 py-2 shadow-sm hover-scale text-center"
                      onClick={() => handleClick("formJB")}
                    >
                      <Image
                        src="/assets/icons/handshake.png"
                        height={28}
                        className="mb-1"
                      />
                      <span>Pengajuan</span>
                    </Button>
                  </Col>
                </Row>
                    </>
                    
                  )}                </CardBody>
              </Card>
            </Col>
          </Row>

          {/* Pilih kategori (jika ada) */}
          {JBData.length > 0 && (
            <Row className="mt-3">
              {JBData.map((cat, idx) => (
                <Col xs={12} key={idx} className="mb-2">
                  <Button
                    active={selectedCategory?.name === cat.name}
                    variant="outline-primary w-100"
                    onClick={() => handleClick("category", cat)}
                  >
                    {cat.name}
                  </Button>
                </Col>
              ))}
            </Row>
          )}

          {/* Detail kategori */}
          {selectedCategory && (
            <Row className="mt-3">
              <CardSimpanan selectedCategory={selectedCategory} user={user} />
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}
