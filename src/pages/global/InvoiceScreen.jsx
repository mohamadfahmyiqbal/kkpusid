import React, { useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Alert,
} from "react-bootstrap";

import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import Footer from "../../comp/global/Footer";

export default function InvoiceScreen() {
  const [user, setUser] = useState(null);
  const location = useLocation();

  const { title, data } = location.state || {}; // ambil title & data dari state
  const cardTitle = title ?? "Invoice";

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <Row className="border-bottom mb-3">
            <Col md={12} xs={12}>
              <h1 className="fw-bold mb-0">{cardTitle}</h1>
            </Col>
          </Row>

          {!data && (
            <Row>
              <Col>
                <Alert variant="warning">
                  Tidak ada data invoice untuk ditampilkan.
                </Alert>
              </Col>
            </Row>
          )}

          {data && (
            <Row className="mt-4">
              <Col md={12}>
                <Card>
                  <CardHeader className="bg-blue700 text-white">
                    <CardTitle>{cardTitle}</CardTitle>
                  </CardHeader>
                  <CardBody>
                    {/* Contoh menampilkan data invoice */}
                    <pre>{JSON.stringify(data, null, 2)}</pre>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          )}
        </Container>
        <Footer />
      </div>
    </div>
  );
}
