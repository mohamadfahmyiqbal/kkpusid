import React from "react";
import { Button, Row, Col } from "react-bootstrap";
import { FaExchangeAlt, FaMoneyBillWave } from "react-icons/fa";

const ActionButtons = ({
  handlePenarikanClick,
  handleSetoranClick,
  fetchData,
  balanceSummary,
}) => {
  return (
    <Row className="mt-4">
      <Col md={4}>
        <Button
          variant="outline-primary"
          className="w-100 d-flex align-items-center justify-content-center py-3"
          onClick={handlePenarikanClick}
          disabled={!balanceSummary?.balance || balanceSummary.balance <= 0}
        >
          <FaExchangeAlt className="me-2" />
          Ajukan Penarikan
        </Button>
      </Col>
      <Col md={4}>
        <Button
          variant="primary"
          className="w-100 d-flex align-items-center justify-content-center py-3"
          onClick={handleSetoranClick}
        >
          <FaMoneyBillWave className="me-2" />
          Setoran Baru
        </Button>
      </Col>
      <Col md={4}>
        <Button
          variant="light"
          className="w-100 d-flex align-items-center justify-content-center py-3"
          onClick={fetchData}
        >
          Refresh Data
        </Button>
      </Col>
    </Row>
  );
};

export default ActionButtons;
