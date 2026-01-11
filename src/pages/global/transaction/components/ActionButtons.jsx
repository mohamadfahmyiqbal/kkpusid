// src/pages/global/transaction/components/ActionButtons.jsx
import React, { useMemo } from "react";
import { Button } from "react-bootstrap";

const ActionButtons = ({ isFinancing, transactionId, onBack }) => {
  const buttons = useMemo(() => {
    const baseButtons = [
      <Button
        key="back"
        variant="outline-primary"
        className="rounded-pill px-4"
        onClick={onBack}
      >
        Kembali
      </Button>,
    ];

    return baseButtons;
  }, [onBack]);

  return (
    <section className="mt-4 pt-3 border-top">
      <div className="d-flex justify-content-center gap-3">{buttons}</div>
    </section>
  );
};

export default React.memo(ActionButtons);
