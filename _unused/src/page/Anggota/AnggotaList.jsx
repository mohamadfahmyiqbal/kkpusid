import { useState } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Breadcrumb,
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  FormControl,
  InputGroup,
  Row,
} from "react-bootstrap";
import TAnggotaList from "../../comp/anggota/TAnggotaList";

export default function AnggotaList() {
  const [user, setUser] = useState(null);
  return (
    <div
      id="main-wrapper"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Header onUserReady={setUser} />
      <Sidebar />
      <div className="page-wrapper" style={{ flex: 1, overflowY: "auto" }}>
        <Container>
          {/* 🧭 Judul & Breadcrumb */}
          <Row className="page-titles mb-3">
            <Col>
              <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between gap-2">
                <h3 className="text-themecolor mb-0">Anggota</h3>
                <Breadcrumb className="mb-0">
                  <Breadcrumb.Item href="#">Anggota</Breadcrumb.Item>
                  <Breadcrumb.Item active>List</Breadcrumb.Item>
                </Breadcrumb>
              </div>
            </Col>
          </Row>
          {/* <Row className="g-3 mb-3"> */}
          <Card>
            <CardHeader className="bg-topbar text-white rounded-top d-flex align-items-center">
              <CardTitle className="fw-bold mb-0">Anggota PUS</CardTitle>
            </CardHeader>
            <TAnggotaList />
          </Card>
          {/* </Row> */}
        </Container>
      </div>
    </div>
  );
}
