import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Col,
  Container,
  Nav,
  Row,
} from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

const cardData = [
  {
    title: "Pinjaman Lunak",
    text: "Solusi pembiayaan dengan bunga rendah untuk mendukung usaha Anda.",
    img: "https://placehold.co/382x315",
  },
  {
    title: "Pelatihan Usaha",
    text: "Ikuti pelatihan bisnis untuk meningkatkan keterampilan dan jaringan.",
    img: "https://placehold.co/382x315",
  },
  {
    title: "Kemitraan Produk",
    text: "Bergabung dalam kemitraan distribusi produk lokal unggulan.",
    img: "https://placehold.co/382x315",
  },
  {
    title: "Pendampingan Bisnis",
    text: "Dapatkan bimbingan langsung dari mentor berpengalaman.",
    img: "https://placehold.co/382x315",
  },
];

export default function LandingScreen() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    const token = jwtEncode({ page: "login" });
    navigate(`/${token}`, { replace: true });
  };

  return (
    <div id="main-wrapper">
      {/* Header */}
      <header className="topbar bg-primary fixed-top py-1 shadow-sm">
        <nav className="navbar navbar-expand-md navbar-dark">
          <a className="navbar-brand me-3" href="/">
            <img
              src="/assets/icons/pusLogo.png"
              alt="Logo PUS"
              style={{ height: 40, width: "auto" }}
            />
          </a>

          <div className="ms-auto d-flex align-items-center">
            <Nav>
              <Nav.Link
                onClick={handleLoginClick}
                className="text-white d-flex align-items-center"
                style={{ cursor: "pointer" }}
              >
                <FaSignInAlt size={20} className="me-1" />
                <span>Login</span>
              </Nav.Link>
            </Nav>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <div className="page-wrapper bg-topbar" style={{ paddingTop: "100px" }}>
        <Container>
          {/* Hero Section */}
          <Row className="justify-content-center text-center text-white mb-5">
            <Col md={10} lg={8}>
              <h1 className="fw-bold display-4">
                Muamalah
                <br />
                Syar'i
                <br />
                Berkah Hakiki
              </h1>
              <h4 className="mt-3">
                Bertekad untuk melaksanakan muamalah syar’i sesuai Al-Qur’an,
                Al-Hadits, serta ijma’ para Salafush Shalih.
              </h4>
            </Col>
          </Row>

          {/* Cards Section */}
          <Row className="g-4">
            {cardData.map((card, index) => (
              <Col key={index} sm={12} md={6} lg={3}>
                <Card className="h-100 shadow-sm">
                  <CardHeader className="bg-white fw-bold text-center">
                    {card.title}
                  </CardHeader>
                  <CardBody>
                    <Card.Text>{card.text}</Card.Text>
                    <CardImg
                      variant="bottom"
                      src={card.img}
                      alt={card.title}
                      style={{
                        borderRadius: 5,
                        border: "1px solid #6C757D",
                        marginTop: "1rem",
                      }}
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>
    </div>
  );
}
