import { Row, Col } from "react-bootstrap";
import moment from "moment";

export default function InvoiceHeader({ invoiceData }) {
  return (
    <Row className="border-bottom mb-2 mt-2">
      <Col xs={6}>
        <h3 className="fw-bold">INVOICE</h3>
        <p className="mb-1 fw-bold">To:</p>
        <p>{invoiceData.recipient_name}</p>
      </Col>
      <Col xs={6} className="text-end">
        <h5 className="fw-bold">#{invoiceData.invoice_id}</h5>
        <p className="mb-1 fw-bold">Invoice Date</p>
        <p className="mb-0">
          Start: {moment(invoiceData.invoice_date).format("DD-MM-YYYY")}
        </p>
        <p>End: {moment(invoiceData.expiration_date).format("DD-MM-YYYY")}</p>
      </Col>
    </Row>
  );
}
