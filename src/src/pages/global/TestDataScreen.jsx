import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Row,
  Col,
} from "react-bootstrap";
import { jwtEncode } from "../../routes/helpers";

export default function TestDataScreen() {
  const navigate = useNavigate();
  const [testData] = useState({
    requester: {
      nama: "John Doe Test",
      nikKtp: "1234567890123456",
      alamat: "Jl. Test No. 123",
      no_tlp: "08123456789",
    },
    akun: {
      email: "test@example.com",
      tipe_anggota: "Regular",
    },
    job: {
      pekerjaan: "Software Developer",
      tempat_kerja: "Tech Company",
      alamat_kerja: "Jl. Office No. 456",
    },
    bank: {
      bank: "BCA",
      no_rekening: "1234567890",
      nama_nasabah: "John Doe Test",
    },
    approval: [
      {
        status: "approved",
        approval: {
          nama: "Approver 1",
          approver: { nama: "Manager 1" },
        },
      },
    ],
  });

  const handleTestInvoice = () => {
    const token = jwtEncode({ page: "invoice" });
    navigate(`/${token}`, {
      state: {
        title: "Test Invoice",
        dataPendaftaran: testData,
      },
    });
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <Card>
            <CardHeader className="bg-primary text-white">
              <CardTitle>Test Data Screen</CardTitle>
            </CardHeader>
            <CardBody>
              <h6>Data Test yang akan dikirim:</h6>
              <pre
                className="bg-light p-3 rounded"
                style={{ fontSize: "12px" }}
              >
                {JSON.stringify(testData, null, 2)}
              </pre>

              <div className="text-center mt-4">
                <Button variant="success" size="lg" onClick={handleTestInvoice}>
                  Test Kirim ke Invoice Screen
                </Button>
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
