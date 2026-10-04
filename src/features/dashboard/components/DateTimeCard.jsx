import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import { FaCalendarAlt } from "react-icons/fa";

/**
 * Standalone component to isolate clock state and prevent full Dashboard page re-renders.
 */
const DateTimeCard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date) => {
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }) + " WIB";
  };

  return (
    <Card className="dc-date-card border-0">
      <Card.Body className="d-flex align-items-center gap-3 p-0">
        <FaCalendarAlt />
        <div>
          <p className="mb-1">{formatDate(currentTime)}</p>
          <strong>{formatTime(currentTime)}</strong>
        </div>
      </Card.Body>
    </Card>
  );
};

export default React.memo(DateTimeCard);
