import React, { memo } from "react";
import { Card } from "react-bootstrap";

const VisiSection = memo(() => (
  <Card className="mb-3 border-0 shadow-sm bg-info text-white">
    <Card.Body>
      <h3 className="h6 fw-bold">Visi & Misi Koperasi</h3>
      <p className="mb-0">Konten Khusus Administrator (Role 1).</p>
    </Card.Body>
  </Card>
));

export default VisiSection;
