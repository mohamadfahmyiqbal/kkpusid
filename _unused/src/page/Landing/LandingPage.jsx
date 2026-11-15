import {
  Card,
  CardBody,
  CardHeader,
  CardImg,
  Container,
  Nav,
  Row,
  Col,
} from "react-bootstrap";
import { FaSignInAlt } from "react-icons/fa";
import { useEffect, useMemo, useState, useCallback } from "react";
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

export default function LandingPage() {
  const navigate = useNavigate();

  // --- Reduced motion preference ---
  const getReducedMotion = useCallback(() => {
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }
    return false;
  }, []);
  const [reducedMotion, setReducedMotion] = useState(() => getReducedMotion());

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = (e) => setReducedMotion(e.matches);
    if (mql.addEventListener) {
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    } else {
      mql.addListener(onChange);
      return () => mql.removeListener(onChange);
    }
  }, []);

  // --- Styles ---
  const styles = useMemo(
    () => ({
      pageWrapper: {
        paddingTop: "100px", // compensate fixed header
      },
      topbar: {
        background:
          "linear-gradient(90deg, rgba(13,110,253,1) 0%, rgba(32,201,151,1) 100%)",
      },
      logo: {
        height: "40px",
      },
      heroTitle: {
        letterSpacing: "0.02em",
        textShadow: "0 6px 12px rgba(0,0,0,.25)",
      },
      heroSubtitle: {
        textShadow: "0 4px 8px rgba(0,0,0,.25)",
      },
      cardImg: {
        borderRadius: 5,
        border: "1px solid #6C757D",
        marginTop: "1rem",
      },
    }),
    []
  );

  const motion = {
    headerDuration: reducedMotion ? "0ms" : "420ms",
    heroDuration: reducedMotion ? "0ms" : "560ms",
    heroDelay: reducedMotion ? "0ms" : "60ms",
    cardsDuration: reducedMotion ? "0ms" : "520ms",
    cardsDelay: reducedMotion ? "0ms" : "160ms",
  };

  const handleLoginClick = () => {
    const token = jwtEncode({ page: "login" });
    navigate(`/${token}`, { replace: true });
  };

  return (
    <div id="main-wrapper">
      {/* Header */}
      <header className="topbar fixed-top py-1 shadow-sm" style={styles.topbar}>
        <nav
          className="navbar navbar-expand-md navbar-dark px-3"
          style={{
            opacity: 0,
            animationName: "lp_fadeIn",
            animationDuration: motion.headerDuration,
            animationFillMode: "forwards",
            animationTimingFunction: "ease-out",
            willChange: "opacity",
          }}
        >
          <a className="navbar-brand" href="/">
            <img
              src="/assets/icons/logo.png"
              alt="Logo"
              style={styles.logo}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
          </a>

          <div className="ms-auto d-flex align-items-center">
            <Nav>
              <Nav.Link
                onClick={handleLoginClick}
                className="text-white d-flex align-items-center"
                style={{ cursor: "pointer" }}
                aria-label="Masuk"
              >
                <FaSignInAlt size={20} className="me-1" />
                <span>Login</span>
              </Nav.Link>
            </Nav>
          </div>
        </nav>
      </header>

      {/* Page Content */}
      <div className="page-wrapper bg-topbar" style={styles.pageWrapper}>
        <Container>
          {/* Hero Section */}
          <Row
            className="justify-content-center text-center text-white mb-5"
            style={{
              opacity: 0,
              transform: "translateY(8px)",
              animationName: "lp_fadeUp",
              animationDuration: motion.heroDuration,
              animationDelay: motion.heroDelay,
              animationTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)",
              animationFillMode: "forwards",
              willChange: "opacity, transform",
            }}
          >
            <Col md={10} lg={8}>
              <h1 className="fw-bold display-4" style={styles.heroTitle}>
                Muamalah
                <br />
                Syar&apos;i
                <br />
                Berkah Hakiki
              </h1>
              <h4 className="mt-3" style={styles.heroSubtitle}>
                Bertekad untuk melaksanakan muamalah syar’i sesuai Al-Qur’an,
                Al-Hadits, serta ijma’ para Salafush Shalih.
              </h4>
            </Col>
          </Row>

          {/* Cards Section */}
          <Row
            className="g-4"
            style={{
              opacity: 0,
              animationName: "lp_fadeIn",
              animationDuration: motion.cardsDuration,
              animationDelay: motion.cardsDelay,
              animationTimingFunction: "ease-out",
              animationFillMode: "forwards",
              willChange: "opacity",
            }}
          >
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
                      style={styles.cardImg}
                      loading="lazy"
                    />
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Keyframes lokal */}
      <style>{`
        @keyframes lp_fadeUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes lp_fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
      `}</style>
    </div>
  );
}
