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
import TrainingService from "../../../services/training.service";
import { FaTrophy, FaMedal, FaArrowLeft, FaUser, FaStar } from "react-icons/fa";
import "./Ranking.css";

const Ranking = () => {
  const navigate = useNavigate();
  const [rankingList, setRankingList] = useState([]);
  const [myRanking, setMyRanking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRankingData = async () => {
      try {
        setLoading(true);
        const [resRankings, resMyRank] = await Promise.all([
          TrainingService.getRankings(),
          TrainingService.getMyRanking()
        ]);

        if (resRankings.status) {
          setRankingList(resRankings.data.map(r => ({
            rank: r.rank_position,
            name: r.member?.full_name || "Peserta",
            score: r.total_score,
            completedModules: r.completed_materials,
            totalModules: 30, // Fallback
            avatar: null,
          })));
        }

        if (resMyRank.status && resMyRank.data) {
          const r = resMyRank.data;
          setMyRanking({
            rank: r.rank_position,
            name: r.member?.full_name || "Anda",
            score: r.total_score,
            completedModules: r.completed_materials,
            totalModules: 30, // Fallback
            avatar: null,
          });
        }
      } catch (err) {
        setError("Gagal memuat data peringkat");
      } finally {
        setLoading(false);
      }
    };

    fetchRankingData();
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
      <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-white">
        <Spinner animation="border" variant="primary" size="lg" />
        <p className="mt-3 text-muted fw-medium">Memuat papan peringkat...</p>
      </div>
    );
  }

  return (
    <div className="ranking-page-container pb-5">
      <Container fluid className="mt-4 px-0">
        <Row className="mx-0">
          <Col xs={12}>
            {error && (
              <Alert variant="danger" className="mb-4 rounded-4 shadow-sm border-0">
                {error}
              </Alert>
            )}

            {/* My Ranking Card */}
            {myRanking && (
              <Card className="shadow-lg border-0 mb-4 rounded-4 overflow-hidden" style={{ background: 'linear-gradient(135deg, #02113d 0%, #05246f 100%)' }}>
                <Card.Body className="p-4 text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                      <div className="me-3">
                        <div
                          className="bg-white text-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm"
                          style={{
                            width: "64px",
                            height: "64px",
                            fontSize: "24px",
                          }}
                        >
                          <FaUser />
                        </div>
                      </div>
                      <div>
                        <h5 className="fw-black mb-1">{myRanking.name}</h5>
                        <p className="mb-0 opacity-75 small">
                          Peringkat ke-#{myRanking.rank} dari{" "}
                          {rankingList.length > 10 ? rankingList.length : rankingList.length + 5} peserta
                        </p>
                      </div>
                    </div>
                    <div className="text-end">
                      <div className="fw-black h2 mb-0">{myRanking.score}</div>
                      <small className="opacity-75 text-uppercase ls-1 fw-bold" style={{ fontSize: '10px' }}>
                        Poin Akumulasi
                      </small>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            )}
            {/* Top 3 Podium */}
            <Row className="mb-5 g-4 justify-content-center align-items-end">
              {rankingList.length > 0 && [1, 0, 2].map((idx) => {
                const item = rankingList[idx];
                if (!item) return null;
                const isFirst = idx === 0;
                return (
                  <Col md={idx === 0 ? 5 : idx === 1 ? 4 : 3} key={item.rank} className={`${idx === 1 ? 'order-1' : idx === 0 ? 'order-2' : 'order-3'}`}>
                    <Card className={`podium-card border-0 text-center ${isFirst ? 'shadow-lg py-5' : 'shadow-sm py-4'}`} 
                          style={{ background: isFirst ? 'linear-gradient(135deg, #02113d 0%, #05246f 100%)' : 'white' }}>
                      <Card.Body>
                        <div className="podium-avatar">
                           {getRankIcon(item.rank)}
                        </div>
                        <h5 className={`fw-black mb-1 ${isFirst ? 'text-white' : 'text-dark-blue'}`}>{item.name}</h5>
                        <div className={`fw-bold mb-3 ${isFirst ? 'text-info' : 'text-primary'}`}>
                           <FaStar className="me-1" /> {item.score} Poin
                        </div>
                        <Badge bg={isFirst ? "info" : "light"} className={`${isFirst ? '' : 'text-muted border'} rounded-pill px-3 py-2`}>
                           {item.completedModules} Modul Selesai
                        </Badge>
                      </Card.Body>
                    </Card>
                  </Col>
                );
              })}
            </Row>

            {/* Full Ranking Table */}
            <Card className="rank-table-card border-0 mb-4">
              <Card.Body className="p-0">
                <div className="p-4 border-bottom d-flex justify-content-between align-items-center">
                   <h6 className="fw-black text-dark-blue mb-0 text-uppercase ls-1">Papan Peringkat Lengkap</h6>
                   <Badge bg="primary" className="rounded-pill px-3">{rankingList.length} Peserta Aktif</Badge>
                </div>
                <div className="table-responsive">
                  <Table hover className="rank-table align-middle mb-0">
                    <thead>
                      <tr>
                        <th className="ps-4">Rank</th>
                        <th>Nama Peserta</th>
                        <th className="text-center">Skor</th>
                        <th className="text-center">Progress</th>
                        <th className="text-end pe-4">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rankingList.map((item) => (
                        <tr key={item.rank} className={item.name === "Anda" ? 'bg-info bg-opacity-10' : ''}>
                          <td className="ps-4">
                             <div className="rank-number-badge">{item.rank}</div>
                          </td>
                          <td>
                             <div className="d-flex align-items-center gap-3">
                                <div className="rounded-circle bg-light d-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                                   <FaUser className="text-muted" />
                                </div>
                                <span className="rank-user-name">{item.name}</span>
                             </div>
                          </td>
                          <td className="text-center">
                             <span className="fw-black text-primary">{item.score}</span>
                          </td>
                          <td className="text-center">
                             <small className="text-muted fw-bold">{item.completedModules} Modul</small>
                          </td>
                          <td className="text-end pe-4">
                            <Badge
                              bg={
                                (item.completedModules / 30) * 100 >= 80 ? "success" : 
                                (item.completedModules / 30) * 100 >= 50 ? "warning" : "secondary"
                              }
                              className="rounded-pill px-3"
                            >
                              {Math.round((item.completedModules / 30) * 100)}%
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
                className="px-4 py-2 fw-bold text-muted rounded-pill border"
                onClick={handleBack}
              >
                <FaArrowLeft className="me-2" />
                Kembali ke Dashboard
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Ranking;
