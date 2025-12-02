import React, { memo } from "react";
import { Card, Row, Col } from "react-bootstrap";

const MenuSection = memo(() => (
  <Card className="mb-3 border-0 shadow-sm">
    <Card.Body>
      <h3 className="h6 fw-bold">Menu Utama</h3>
      <Row className="text-center mt-3 g-2">
        {[
          "Simpanan",
          "Transaksi",
          "Program",
          "Tabungan",
          "Investasi",
          "Training",
        ].map((item, index) => (
          <Col key={index} xs={4} sm={2} className="menu-item-col">
            <div className={`menu-item-icon p-2`}>
              <div className="icon-placeholder mb-1 fs-5">⭐</div>
              <small>{item}</small>
            </div>
          </Col>
        ))}
      </Row>
    </Card.Body>
  </Card>
));

export default MenuSection;
