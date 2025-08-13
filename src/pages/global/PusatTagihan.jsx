import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { jwtEncode } from "../../routes/helpers";

export default function PusatTagihan() {
  const [user, setUser] = useState(null);
  const [selectedTagihan, setSelectedTagihan] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Helper untuk format Rupiah
  const formatCurrency = useCallback(
    (value) => `Rp. ${value.toLocaleString("id-ID")},-`,
    []
  );

  // Dummy data tagihan, bisa diganti dengan fetch API jika perlu
  const tagihanList = useMemo(
    () => [
      { id: 1, month: "Maret 2024", nominal: 200000 },
      { id: 2, month: "April 2024", nominal: 200000 },
      { id: 3, month: "Mei 2024", nominal: 200000 },
      { id: 4, month: "Juni 2024", nominal: 200000 },
    ],
    []
  );

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const handleTagihanChange = useCallback((id) => {
    setSelectedTagihan((prev) =>
      prev.includes(id) ? prev.filter((tid) => tid !== id) : [...prev, id]
    );
  }, []);

  const handleProses = useCallback(
    (e) => {
      e.preventDefault();
      if (selectedTagihan.length === 0) return;


      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const selectedData = tagihanList.filter((t) =>
          selectedTagihan.includes(t.id)
        );
        const token = jwtEncode({page: "InvoiceMenungguPembayaran"})
        navigate(`/page/${token}`, { state: { data: selectedData, user } });
      }, 1200);
    },
    [selectedTagihan, navigate, user, tagihanList]
  );

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />

      <div className="page-wrapper">
        <Container fluid>
          {/* Header Page */}
          <Row className="border-bottom mb-4">
            <Col>
              <h2 className="mt-3 fw-bold">Pusat Tagihan</h2>
              <h5 className="text-muted">{user?.nama || "Pengguna"}</h5>
            </Col>
          </Row>

          {/* Tagihan */}
          <Row>
            <Col md={6}>
              <Card className="mb-4 shadow-sm">
                <Card.Header className="fw-semibold">Tagihan</Card.Header>
                <Card.Body>
                  <Form onSubmit={handleProses}>
                    {tagihanList.length === 0 ? (
                      <div className="text-center text-muted py-3">
                        Tidak ada tagihan.
                      </div>
                    ) : (
                      tagihanList.map((item) => (
                        <Form.Check
                          key={item.id}
                          type="checkbox"
                          id={`tagihan-${item.id}`}
                          label={`Tagihan simpanan pokok periode ${item.month} ${formatCurrency(
                            item.nominal
                          )}`}
                          checked={selectedTagihan.includes(item.id)}
                          onChange={() => handleTagihanChange(item.id)}
                          className="mb-2"
                        />
                      ))
                    )}
                    <Button
                      variant="primary"
                      className="mt-3"
                      type="submit"
                      disabled={selectedTagihan.length === 0 || loading}
                    >
                      {loading ? (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                      ) : null}
                      Proses Tagihan
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <Footer />
      </div>
    </div>
  );
}
