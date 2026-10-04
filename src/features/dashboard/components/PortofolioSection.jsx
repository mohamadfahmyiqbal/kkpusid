import React, { useMemo } from "react";
import { useTransaction } from "../../../components/layout/contexts";
import { Badge, Card, Row, Col, Form } from "react-bootstrap";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount || 0);
};

const PortofolioSection = () => {
  const { activeFinancing } = useTransaction();

  const renderedPortofolio = useMemo(() => {
    if (!activeFinancing || activeFinancing.length === 0) {
      return (
        <Card className="border-0 shadow-sm bg-light">
          <Card.Body className="text-center py-4">
            <p className="text-muted mb-0 small">Belum ada portofolio aktif.</p>
          </Card.Body>
        </Card>
      );
    }

    return activeFinancing.map((item) => (
      <Card key={item.id} className="shadow-sm border-0 mb-3">
        <Card.Body className="p-3">
          <h6 className="card-subtitle text-primary mb-1 small fw-bold">
            Investasi Anda
          </h6>
          <h5 className="card-title fw-bold mb-1" style={{ fontSize: "1rem" }}>
            {item.title || "Proyek Investasi"}
          </h5>
          <p className="card-text mb-2 text-muted small">
            {item.company_name || "Internal KKPUS"}
          </p>

          <hr className="my-2 opacity-50" />

          <Row className="g-2">
            <Col xs={6}>
              <p className="mb-0 text-muted" style={{ fontSize: "0.7rem" }}>
                Total Investasi
              </p>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                {formatCurrency(item.amount)}
              </h6>
            </Col>
            <Col xs={3}>
              <p className="mb-0 text-muted" style={{ fontSize: "0.7rem" }}>
                Jenis
              </p>
              <h6 className="fw-bold mb-0" style={{ fontSize: "0.9rem" }}>
                {item.type || "Sukuk"}
              </h6>
            </Col>
            <Col xs={3} className="text-end">
              <p className="mb-0 text-muted" style={{ fontSize: "0.7rem" }}>
                Status
              </p>
              <Badge
                bg={item.status === "active" ? "success" : "warning"}
                className="small"
              >
                {item.status?.toUpperCase() || "OPEN"}
              </Badge>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    ));
  }, [activeFinancing]);

  return (
    <div className="mb-4">
      <h5 className="mb-3 fw-bold">Portofolio</h5>

      <div className="d-flex mb-3 gap-2">
        <Form.Select size="sm" className="border-0 shadow-sm">
          <option>Jenis</option>
        </Form.Select>
        <Form.Select size="sm" className="border-0 shadow-sm">
          <option>Status</option>
        </Form.Select>
        <Form.Select size="sm" className="border-0 shadow-sm">
          <option>Urutkan</option>
        </Form.Select>
      </div>

      {renderedPortofolio}
    </div>
  );
};

export default PortofolioSection;
