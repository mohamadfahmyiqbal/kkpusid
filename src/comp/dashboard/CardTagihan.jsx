import { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Image,
  Spinner,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import UMenu from "../../utils/UMenu";
import { formatRupiah } from "../../utils/formatRupiah";

export default function CardTagihan({ user }) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await UMenu.getAllTagihanByUser();
      setDetail(res.data);
    } catch (error) {
      console.error("Gagal mengambil data menu:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetail();
  }, []);

  const handleClick = (name) => {
    navigate(`/${jwtEncode({ page: name })}`);
    // switch (name) {
    //   case "Simpanan":
    //     navigate(`/${jwtEncode({ page: "simpanan" })}`);
    //     break;
    //   case "Invoice":
    //     navigate(`/${jwtEncode({ page: "invoice" })}`);
    //     break;
    //   default:
    //     console.log("Menu tidak dikenali:", name);
    // }
  };

  if (loading) {
    return (
      <Card className="border shadow p-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Card>
    );
  }
  return (
    <Card className="border shadow">
      <CardBody>
        <CardTitle className="fw-bold border-bottom pb-2">Tagihan</CardTitle>
        <div
          className="d-flex flex-row overflow-auto"
          style={{ gap: "1rem", paddingBottom: "0.5rem" }}
        >
          {detail?.map((det, idx) => (
            <Card
              key={idx}
              className="w-40 bg-topbar shadow-sm rounded-4 hover-scale flex-shrink-0"
              onClick={() => handleClick(det.name)}
            >
              <CardBody className="text-white">
                <CardTitle className="fw-bold">Setoran</CardTitle>
                <CardText className="">{det?.name}</CardText>
                <Button className="w-100" variant="danger">
                  {formatRupiah(det?.nominal)}
                </Button>
              </CardBody>
            </Card>
          ))}
        </div>
      </CardBody>

      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.05);
          transition: transform 0.2s ease-in-out;
        }
      `}</style>
    </Card>
  );
}
