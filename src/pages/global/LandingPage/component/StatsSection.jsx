import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import {
  FaUsers,
  FaBriefcase,
  FaChartLine,
  FaMapMarkerAlt,
} from "react-icons/fa";

const StatsSection = ({ stats = null }) => {
  const statsData = stats
    ? [
        {
          icon: <FaUsers />,
          value: `${stats.active_members}+`,
          label: "Anggota Aktif",
        },
        {
          icon: <FaBriefcase />,
          value: `${stats.financed_businesses}+`,
          label: "Usaha Dibiayai",
        },
        {
          icon: <FaChartLine />,
          value: `${stats.satisfaction_rate}%`,
          label: "Tingkat Kepuasan",
        },
        {
          icon: <FaMapMarkerAlt />,
          value: `${stats.cities}+`,
          label: "Kota di Indonesia",
        },
      ]
    : [];

  if (statsData.length === 0) return null;

  return (
    <section className="pb-5">
      <Container>
        <div className="pbs-stats">
          <Row className="g-4">
            {statsData.map((item, i) => (
              <Col xs={12} sm={6} md={6} lg={3} key={i}>
                <div className="pbs-stat-item">
                  <div className="pbs-stat-icon">{item.icon}</div>
                  <div className="pbs-stat-content">
                    <h3>{item.value}</h3>
                    <p>{item.label}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default React.memo(StatsSection);
