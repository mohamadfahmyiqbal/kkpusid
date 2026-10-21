import { useEffect, useState } from "react";
import {
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

export default function CardMenu({ user }) {
  const [detail, setDetail] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getDetail = async () => {
    try {
      setLoading(true);
      const res = await UMenu.getMenuUtama();
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
    console.log(name);

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
        <CardTitle className="fw-bold mb-3 border-bottom pb-2">
          Menu Utama
        </CardTitle>
        <div
          className="d-flex flex-row overflow-auto"
          style={{ gap: "1rem", paddingBottom: "0.5rem" }}
        >
          {detail.map((det, idx) => (
            <Card
              key={idx}
              className="bg-topbar shadow-sm rounded-4 text-center hover-scale flex-shrink-0"
              style={{ width: 100 }} // lebar card tetap kecil
              onClick={() => handleClick(det.nama_menu)}
            >
              <CardBody className="d-flex flex-column align-items-center justify-content-center p-2">
                <Image
                  src={det.gambar}
                  alt={det.nama_menu}
                  fluid
                  style={{ maxHeight: 60, objectFit: "contain" }}
                />
                <CardText
                  className="fw-bold mt-2 text-white text-truncate"
                  title={det.nama_menu}
                >
                  {det.nama_menu}
                </CardText>
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
