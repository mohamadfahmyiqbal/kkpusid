import React, { useState, useEffect, useCallback } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Spinner,
  Alert,
  Badge,
  Table,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../utils/helpers";
import LayoutGlobal from "../../../components/layout/components/LayoutGlobal";
import { FaTrophy, FaMedal, FaArrowLeft, FaUser } from "react-icons/fa";

const Ranking = () => {
  const navigate = useNavigate();
  const [rankingList, setRankingList] = useState([]);
  const [myRanking, setMyRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Fetch ranking data from API
    // fetchRankingData();

    // Mock data
    setTimeout(() => {
      setRankingList([
        {
          rank: 1,
          name: "Ahmad Fauzi",
          score: 98,
          completedModules: 25,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 2,
          name: "Siti Rahayu",
          score: 95,
          completedModules: 24,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 3,
          name: "Budi Santoso",
          score: 92,
          completedModules: 23,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 4,
          name: "Dewi Lestari",
          score: 88,
          completedModules: 22,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 5,
          name: "Eko Prasetyo",
          score: 85,
          completedModules: 21,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 6,
          name: "Fitri Handayani",
          score: 82,
          completedModules: 20,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 7,
          name: "Gunawan Wijaya",
          score: 80,
          completedModules: 19,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 8,
          name: "Hesti Utami",
          score: 78,
          completedModules: 18,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 9,
          name: "Indra Wijaya",
          score: 75,
          completedModules: 17,
          totalModules: 30,
          avatar: null,
        },
        {
          rank: 10,
          name: "Joko Susilo",
          score: 72,
          completedModules: 16,
          totalModules: 30,
          avatar: null,
        },
      ]);

      setMyRanking({
        rank: 12,
        name: "Anda",
        score: 68,
        completedModules: 15,
        totalModules: 30,
        avatar: null,
      });

      setLoading(false);
    }, 1000);
  }, []);

  const getRankIcon = (rank) => {
    if (rank === 1) return <FaTrophy className="text-warning" size={24} />;
    if (rank === 2) return <FaMedal className="text-secondary" size={24} />;
    if (rank === 3)
      return (
        <FaMedal
          className="text-warning"
          size={24}
          style={{ color: "#cd7f32" }}
        />
      );
    return <span className="fw-bold">#{rank}</span>;
  };

  const getRankBadge = (rank) => {
    if (rank === 1)
      return (
        <Badge bg="warning" className="px-3 py-2">
          Juara 1
        </Badge>
      );
    if (rank === 2)
      return (
        <Badge bg="secondary" className="px-3 py-2">
          Juara 2
        </Badge>
      );
    if (rank === 3)
      return (
        <Badge
          bg="warning"
          className="px-3 py-2"
          style={{ backgroundColor: "#cd7f32" }}
        >
          Juara 3
        </Badge>
      );
    return null;
  };

  const handleBack = useCallback(() => {
    const token = jwtEncode({ page: "trainingDashboard" });
    navigate(`/${token}`);
  }, [navigate]);

  if (loading) {
    return (
      <LayoutGlobal title="Peringkat">
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3 text-muted">Memuat peringkat...</p>
        </div>
      </LayoutGlobal>
    );
  }

  return (
    <LayoutGlobal title="Peringkat">
      <div className="row page-titles pt-3 border-bottom mb-4 mx-0">
        <div className="col-12 align-self-center">
          <h3 className="text-themecolor mb-0 mt-0 fw-bold">
            <FaTrophy className="me-2" />
            Peringkat Peserta
          </h3>
        </div>
      </div>

      <Container className="mt-4">
        <Row className="justify-content-center">
          <Col lg={10} md={12}>
            {error && (
              <Alert variant="danger" className="mb-4">
                {error}
              </Alert>
            )}

            {/* My Ranking Card */}
            {myRanking && (
              <Card className="shadow-lg border-0 mb-4 bg-primary text-white">
                <Card.Body className="p-4">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div
                          className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center"
                          style={{
                            width: "60px",
                            height: "60px",
                            fontSize: "24px",
                          }}
                        >
                          <FaUser />
                        </div>
                      </div>
                      <div>
                        <h5 className="fw-bold mb-1">{myRanking.name}</h5>
                        <p className="mb-0 opacity-75">
                          Peringkat #{myRanking.rank} dari{" "}
                          {rankingList.length + 5} peserta
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <h3 className="fw-bold mb-0">{myRanking.score} poin</h3>
                      <small className="opacity-75">
                        {myRanking.completedModules}/{myRanking.totalModules}{" "}
                        modul
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}

            {/* Top 3 Podium */}
            <Card className="shadow-sm border-0 mb-4">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-4">Top 3 Peserta</h6>
                <Row className="g-3">
                  {rankingList.slice(0, 3).map((item, index) => (
                    <Col md={4} key={item.rank}>
                      <Card
                        className={`h-100 border-0 ${
                          index === 0
                            ? "bg-warning bg-opacity-10"
                            : index === 1
                              ? "bg-secondary bg-opacity-10"
                              : "bg-warning bg-opacity-10"
                        }`}
                        style={{
                          backgroundColor: index === 2 ? "#fff8e1" : "",
                        }}
                      >
                        <Card.Body className="p-4 text-center">
                          <div className="mb-3">{getRankIcon(item.rank)}</div>
                          <h5 className="fw-bold mb-2">{item.name}</h5>
                          <h3 className="fw-bold text-primary mb-2">
                            {item.score} poin
                          </h3>
                          <p className="text-muted small mb-0">
                            {item.completedModules}/{item.totalModules} modul
                            selesai
                          </p>
                          {getRankBadge(item.rank)}
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </Card.Body>
            </Card>

            {/* Full Ranking Table */}
            <Card className="shadow-sm border-0">
              <Card.Body className="p-4">
                <h6 className="fw-bold mb-3">Peringkat Lengkap</h6>
                <div className="table-responsive">
                  <Table hover className="align-middle">
                    <thead>
                      <tr>
                        <th>Peringkat</th>
                        <th>Nama</th>
                        <th className="text-end">Skor</th>
                        <th className="text-end">Modul Selesai</th>
                        <th className="text-end">Progress</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingList.map((item) => (
                        <tr key={item.rank}>
                          <td className="fw-bold">{getRankIcon(item.rank)}</td>
                          <td>{item.name}</td>
                          <td className="text-end fw-bold">{item.score}</td>
                          <td className="text-end">
                            {item.completedModules}/{item.totalModules}
                          </td>
                          <td className="text-end">
                            <Badge
                              bg={
                                (item.completedModules / item.totalModules) *
                                  100 >=
                                80
                                  ? "success"
                                  : (item.completedModules /
                                        item.totalModules) *
                                        100 >=
                                      50
                                    ? "warning"
                                    : "secondary"
                              }
                            >
                              {Math.round(
                                (item.completedModules / item.totalModules) *
                                  100,
                              )}
                              %
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Card.Body>
            </Card>

            <div className="mt-4">
              <Button
                variant="light"
                className="px-4 py-2 fw-bold text-muted"
                onClick={handleBack}
              >
                <FaArrowLeft className="me-2" />
                Kembali ke Dashboard
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </LayoutGlobal>
  );
};

export default Ranking;
