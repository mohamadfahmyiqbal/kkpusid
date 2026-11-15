import { Row, Col, Card, Button } from "react-bootstrap";

export default function FeatureList({ items = [] }) {
  return (
    <Row className="gy-4">
      {items.map((it, idx) => (
        <Col key={idx} xs={12} md={6} lg={4}>
          <Card className="shadow-sm" style={{ borderRadius: 16 }}>
            <Card.Body>
              <Card.Title className="fw-bold">{it.title}</Card.Title>
              <Card.Text className="text-muted">{it.description}</Card.Text>
              {it.actionText && it.onClick && (
                <Button variant="primary" onClick={it.onClick}>
                  {it.actionText}
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}
