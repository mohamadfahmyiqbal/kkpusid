import React from "react";
import {
  Card,
  Row,
  Col,
  InputGroup,
  Form,
} from "react-bootstrap";
import {
  FaSearch,
  FaCalendarAlt,
} from "react-icons/fa";

const FilterControls = ({
  searchTerm,
  setSearchTerm,
  dateRange,
  setDateRange,
  transactionType,
  setTransactionType,
}) => {
  return (
    <Card className="border-0 shadow-sm mb-4 rounded-4">
      <Card.Body className="p-3">
        <Row className="align-items-center">
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text className="bg-white">
                <FaSearch />
              </InputGroup.Text>
              <Form.Control
                placeholder="Cari transaksi..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text className="bg-white">
                <FaCalendarAlt />
              </InputGroup.Text>
              <Form.Control
                type="date"
                value={dateRange.start}
                onChange={(e) =>
                  setDateRange({ ...dateRange, start: e.target.value })
                }
              />
            </InputGroup>
          </Col>
          <Col md={3}>
            <InputGroup>
              <InputGroup.Text className="bg-white">
                <FaCalendarAlt />
              </InputGroup.Text>
              <Form.Control
                type="date"
                value={dateRange.end}
                onChange={(e) =>
                  setDateRange({ ...dateRange, end: e.target.value })
                }
              />
            </InputGroup>
          </Col>
          <Col md={2}>
            <Form.Select
              value={transactionType}
              onChange={(e) => setTransactionType(e.target.value)}
            >
              <option value="ALL">Semua Tipe</option>
              <option value="DEPOSIT">Setoran</option>
              <option value="WITHDRAWAL">Penarikan</option>
              <option value="INTEREST">Bunga</option>
            </Form.Select>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default FilterControls;
