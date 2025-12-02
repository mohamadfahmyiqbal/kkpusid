import React, { memo } from "react";
import { Card, Button } from "react-bootstrap";

const TrainingSection = memo(() => (
  <Card className="mb-3 border-0 shadow-sm">
    <Card.Body>
      <h3 className="h6 fw-bold">Evaluasi Program Wajib</h3>
      <div className="p-3 border rounded">
        <div className="d-grid gap-2">
          <Button variant="light" className="btn-materi-custom border mb-2">
            ▶ Membaca Materi
          </Button>
          <Button variant="primary">Kerjakan</Button>
        </div>
      </div>
    </Card.Body>
  </Card>
));

export default TrainingSection;
