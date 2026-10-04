import React from "react";
import { Card } from "react-bootstrap";
import { FaChevronRight } from "react-icons/fa";

const NextStepsCard = ({ nextSteps, onNavigate }) => {
  return (
    <Card className="mb-4 border-0 shadow-sm dc-card-modern">
      <Card.Body className="p-4">
        <h4 className="fw-bold mb-4 text-dark">Langkah Selanjutnya</h4>

        {nextSteps.map((item, i) => (
          <div
            key={i}
            className="dc-next-row"
            onClick={() => onNavigate(item.pageKey, item.link)}
          >
            <div className="dc-next-left">
              <div className="dc-next-icon">{item.icon}</div>
              <div>
                <strong>{item.title}</strong>
                <small>{item.desc}</small>
              </div>
            </div>
            <FaChevronRight className="text-muted" size={14} />
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default React.memo(NextStepsCard);
