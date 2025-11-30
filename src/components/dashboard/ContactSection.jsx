import React, { memo } from "react";
import { Card } from "react-bootstrap";

const ContactSection = memo(() => (
  <Card className="mb-3 border-0 shadow-sm">
    <Card.Body>
      <h3 className="h6 fw-bold">Hubungi Kami</h3>
      <p className="mb-0">Email: info@pus.co.id | Telp: (021) 1234567</p>
    </Card.Body>
  </Card>
));

export default ContactSection;
