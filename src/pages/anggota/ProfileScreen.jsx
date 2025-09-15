import { useCallback, useState, useEffect } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Breadcrumb,
  Card,
  CardBody,
  Col,
  Container,
  Row,
  Spinner,
} from "react-bootstrap";
import UAnggota from "../../utils/UAnggota";
import { toast } from "react-toastify";
import { FaIdCard } from "react-icons/fa";

export default function ProfileScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const getUser = async () => {
    try {
      setLoading(true);
      const res = await UAnggota.AnnggotaDetailByNIK();
      if (res.data) {
        setUser(res.data);
      }
    } catch (error) {
      toast.error("Gagal mengambil data profil");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  // Fungsi untuk memastikan foto base64 bisa tampil
  const getFotoSrc = (foto) => {
    if (!foto) return "/assets/icons/default-user.png"; // fallback
    return foto.startsWith("data:image")
      ? foto
      : `data:image/jpeg;base64,${foto}`;
  };

  return (
    <div
      id="main-wrapper"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper" style={{ flex: 1, overflowY: "auto" }}>
        <Container>
          {/* Header Page */}
          <Row className="page-titles mb-3">
            <Col>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                <h3 className="text-themecolor mb-0">Profile</h3>
                <Breadcrumb className="mb-0">
                  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>

          {/* Content */}
          {loading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Row>
              <Col md={12}>
                <Card className="bg-topbar text-white shadow border-0">
                  <CardBody>
                    {user ? (
                      <Row className="border-bottom">
                        <Col xs={4} className="text-start mb-3">
                          {console.log(user)}
                          <img
                            src={getFotoSrc(user?.fotoImg)}
                            alt="user"
                            className="rounded-circle img-fluid"
                            style={{
                              width: "80px",
                              height: "80px",
                              objectFit: "cover",
                            }}
                          />
                        </Col>
                        <Col xs={8}>
                          <Row>
                            <Col xs={12}>
                              <h4 className="fw-bold">{user?.nama}</h4>
                              <Col xs={12}>
                                <h4 className="fw-bold d-flex align-items-center gap-2">
                                  <FaIdCard /> {user?.categoryAnggota?.nama}
                                </h4>
                              </Col>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    ) : (
                      <p className="text-center text-muted">
                        Tidak ada data profil
                      </p>
                    )}
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
      </div>
    </div>
  );
}
