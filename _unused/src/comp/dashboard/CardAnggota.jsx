import { useEffect, useState } from "react";
import { Card, CardTitle, Col, Row, Spinner } from "react-bootstrap";
import UAnggota from "../../utils/UAnggota";
import { FaEye } from "react-icons/fa";

export default function CardAnggota({ user }) {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(false);

  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await UAnggota.GetAnggotaSaldo(); // pastikan ini async
      setDetail(res.data);
    } catch (error) {
      console.error("Gagal mengambil data anggota:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  if (loading || !detail) {
    return (
      <Card className="bg-topbar text-white text-center py-4">
        <Spinner animation="border" variant="light" />
      </Card>
    );
  }

  const { balance, anggotaWallet, bankWallet } = detail;

  return (
    <Card className="bg-topbar text-white shadow">
      <Card.Body>
        {/* Total Saldo */}
        <Row className="align-items-center mb-2">
          <Col>
            <CardTitle className="text-white fw-bold">Total Saldo </CardTitle>
          </Col>
        </Row>

        <Row className="align-items-center justify-content-between mb-3">
          <Col>
            <CardTitle className="text-white fw-bold">
              Rp.{" "}
              {Number(balance).toLocaleString("id-ID", {
                minimumFractionDigits: 2,
              })}
            </CardTitle>
          </Col>
          <Col xs="auto">
            <FaEye size={24} />
          </Col>
        </Row>

        {/* Informasi Anggota */}
        <Row className="border-top">
          <Col>
            <Card.Text className="mb-0 mt-2">
              No Anggota: {anggotaWallet?.nik || "-"}
            </Card.Text>
            <Card.Text className="mb-0">
              No Rekening Simpanan: <br />#{bankWallet?.no_rekening || "-"}
            </Card.Text>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}
