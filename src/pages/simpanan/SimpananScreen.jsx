import { useCallback, useEffect, useState } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import { jwtEncode } from "../../routes/helpers";
import { useNavigate } from "react-router-dom";
import USimpanan from "../../utils/USimpanan";
import CardSimpanan from "../../comp/simpanan/CardSimpanan";

export default function SimpananScreen() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  const handleClick = useCallback(
    (action, payload) => {
      switch (action) {
        case "back":
          navigate(`/${jwtEncode({ page: "dashboard" })}`);
          break;
        case "category":
          setSelectedCategory(payload);
          break;
        default:
          break;
      }
    },
    [navigate]
  );

  const getCategory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await USimpanan.getSimpananCategory();
      setCategory(res.data);
    } catch (error) {
      console.error("Gagal mengambil kategori simpanan:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getCategory();
  }, [getCategory]);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 d-flex align-items-center"
                onClick={() => handleClick("back")}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">Simpanan</h1>
            </Col>
          </Row>
          <Row className="mt-4">
            {category.map((cat, idx) => (
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
          <Row>
            {selectedCategory && (
              <CardSimpanan selectedCategory={selectedCategory} user={user} />
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}
