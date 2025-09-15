import { useCallback, useEffect, useState } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import Footer from "../../comp/global/Footer";
import UNotification from "../../utils/UNotification";
import notification from "../../comp/global/Notification";
import Notification from "../../comp/global/Notification";
import { FaEye } from "react-icons/fa";
import NotificationModal from "../../comp/global/NotificationModal"; // ✅ Import komponen modal baru

export default function NotificationScreen() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [notifikasi, setNotifikasi] = useState([]);
  const [selectedNotifikasi, setSelectedNotifikasi] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  useEffect(() => {
    const fetchNotif = async () => {
      if (!user || !user.nik) {
        setNotifikasi([]);
        return;
      }
      setLoading(true);
      try {
        const res = await UNotification.getNotificationByNik({
          status: [0, 1],
        });
        if (res && res.data && Array.isArray(res.data.data)) {
          setNotifikasi(res.data.data);
        }
      } catch (error) {
        notification({
          status: 400,
          msg: "Gagal memuat notifikasi. Silakan coba lagi.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchNotif();
  }, [user]);

  const handleViewDetail = async (ntf) => {
    setSelectedNotifikasi(ntf);
    try {
      const res = await UNotification.manageNotification(ntf);
      if (res && res.data) {
        setNotifikasi((prevNotifikasi) =>
          prevNotifikasi.map((item) =>
            item.id === ntf.id ? { ...item, is_read: true } : item
          )
        );
      }
    } catch (error) {
      Notification({
        status: 400,
        msg: "Gagal memperbarui status notifikasi.",
      });
    } finally {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedNotifikasi(null);
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
          <Row className="page-titles mb-3">
            <Col>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                <h3 className="text-themecolor mb-0">Notifikasi</h3>
                <Breadcrumb className="mb-0">
                  <Breadcrumb.Item href="#">Home</Breadcrumb.Item>
                  <Breadcrumb.Item active>Notifikasi</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <Card className="bg-transparent border shadow-sm">
                <CardHeader className="bg-topbar text-white">
                  Notifikasi
                </CardHeader>
                <CardBody>
                  {loading && (
                    <div className="d-flex align-items-center gap-2 mb-2">
                      <Spinner animation="border" size="sm" /> Memuat
                      notifikasi...
                    </div>
                  )}
                  {!loading && (
                    <Table>
                      <tbody>
                        {notifikasi?.map((ntf, idx) => (
                          <tr key={idx}>
                            <td>
                              <Button
                                variant="outline-primary"
                                size="sm"
                                onClick={() => handleViewDetail(ntf)}
                              >
                                <FaEye />
                              </Button>
                            </td>
                            <td>{ntf.title}</td>
                            <td>{ntf.body}</td>
                            <td>{ntf.created_at}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  )}
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>

      {/* ✅ Gunakan komponen modal terpisah */}
      <NotificationModal
        show={showModal}
        onHide={handleCloseModal}
        notifikasi={selectedNotifikasi}
      />
    </div>
  );
}
