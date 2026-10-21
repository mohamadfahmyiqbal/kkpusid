import { Button } from "react-bootstrap";

export default function CTASection({
  primaryText = "Daftar Sekarang",
  onPrimary,
  secondaryText = "Masuk",
  onSecondary,
}) {
  return (
    <div className="d-flex flex-wrap justify-content-center gap-2">
      <Button
        size="lg"
        variant="light"
        className="fw-semibold"
        onClick={onPrimary}
      >
        {primaryText}
      </Button>
      <Button
        size="lg"
        variant="outline-light"
        className="fw-semibold"
        onClick={onSecondary}
      >
        {secondaryText}
      </Button>
    </div>
  );
}
