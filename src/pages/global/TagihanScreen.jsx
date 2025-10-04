import { useCallback, useEffect, useMemo, useState } from "react";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Form,
  FormCheck,
  Row,
  Table,
} from "react-bootstrap";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";
import UMenu from "../../utils/UMenu";
import notification from "../../comp/global/Notification";
import Loading from "../../comp/global/Loading";
import { formatRupiah } from "../../utils/formatRupiah";
import moment from "moment";

export default function TagihanScreen() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tagihan, setTagihan] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectAll, setSelectAll] = useState(false);
  const { back } = location.state || {};

  const handleUserChange = useCallback((newUser) => setUser(newUser), []);

  const handleClick = useCallback(() => {
    if (back) navigate(`/${jwtEncode({ page: back })}`);
    else navigate(-1);
  }, [navigate, back]);

  const getData = useCallback(async () => {
    try {
      setLoading(true);
      const res = await UMenu.getAllTagihanDetail();
      setTagihan(res.data || []);
    } catch (error) {
      notification(error, "Gagal mengambil data tagihan");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  // filter hanya sekali
  const { unpaidTagihan, paidTagihan } = useMemo(() => {
    return {
      unpaidTagihan: tagihan.filter(
        (row) => row?.status === "Menunggu Pembayaran"
      ),
      paidTagihan: tagihan.filter(
        (row) => row?.status === "Pembayaran Berhasil"
      ),
    };
  }, [tagihan]);

  // toggle select item
  const handleSelectItem = (id) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  // toggle select all
  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedItems([]);
    } else {
      const allIds = unpaidTagihan.flatMap((row, idx) =>
        row.items?.map((_, idc) => `unpaid-${idx}-${idc}`)
      );
      setSelectedItems(allIds);
    }
    setSelectAll(!selectAll);
  };

  const renderTagihanItems = () => {
    if (unpaidTagihan.length === 0) {
      return (
        <Card className="mb-3">
          <CardBody className="text-center">
            <CardTitle>Anda belum memiliki tagihan</CardTitle>
          </CardBody>
        </Card>
      );
    }
    return (
      <Card className="shadow border mb-3">
        <CardHeader className="bg-topbar text-white">
          <CardTitle className="mb-0">Tagihan</CardTitle>
        </CardHeader>
        <CardBody>
          <Table bordered hover responsive>
            <thead>
              <tr>
                <th style={{ width: "50px" }}>
                  <FormCheck
                    type="checkbox"
                    label="All"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {unpaidTagihan.map((row, idx) =>
                row?.items?.map((item, idc) => {
                  const key = `unpaid-${idx}-${idc}`;
                  return (
                    <tr key={key}>
                      <td>
                        <Form.Check
                          type="checkbox"
                          checked={selectedItems.includes(key)}
                          onChange={() => handleSelectItem(key)}
                        />
                      </td>
                      <td>
                        <Row>
                          <Col xs={8}>{item?.name}</Col>
                          <Col xs={4} className="text-end fw-bold">
                            {formatRupiah(item?.jumlah)}
                          </Col>
                        </Row>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </Table>
          <Row className="justify-content-center mt-3">
            <Col xs="auto">
              <Button
                className="bg-topbar text-white px-4"
                disabled={selectedItems.length === 0}
              >
                Proses ({selectedItems.length})
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
    );
  };

  const renderTransaksi = () => {
    if (paidTagihan.length === 0) {
      return (
        <Card className="mb-3">
          <CardBody className="text-center">
            <CardTitle>Belum ada pembayaran</CardTitle>
          </CardBody>
        </Card>
      );
    }
    return (
      <Card className="shadow border mb-3">
        <CardHeader className="bg-topbar text-white">
          <CardTitle className="mb-0">History Transaksi</CardTitle>
        </CardHeader>
        <CardBody>
          <Row>
            {paidTagihan.map((pai, idp) =>
              pai?.items?.map((itms, ids) => (
                <Col
                  xs={12}
                  key={`paid-${idp}-${ids}`}
                  className="border-bottom py-2 d-flex justify-content-between align-items-center"
                >
                  <div>
                    <div className="fw-bold">{itms?.name}</div>
                    <div className="text-muted">
                      {formatRupiah(itms?.jumlah)}
                    </div>
                    <div className="text-muted small">
                      {moment(itms?.createdAt).format("DD MMM YYYY HH:mm")}
                    </div>
                  </div>
                  <Button size="sm" className="bg-topbar text-white">
                    <FaSearch /> Detail
                  </Button>
                </Col>
              ))
            )}
          </Row>
        </CardBody>
      </Card>
    );
  };

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          {/* Header Page */}
          <Row className="border-bottom mb-3">
            <Col xs={12} className="d-flex align-items-center">
              <Button
                variant="none"
                className="p-0 me-2 d-flex align-items-center"
                onClick={handleClick}
              >
                <FaArrowLeft size={15} className="me-1" />
              </Button>
              <h1 className="fw-bold mb-0">Tagihan</h1>
            </Col>
          </Row>

          {/* Content */}
          <Row>
            {loading ? (
              <Card className="w-100">
                <CardBody className="text-center">
                  <Loading />
                </CardBody>
              </Card>
            ) : (
              <Container fluid>
                {renderTagihanItems()}
                {renderTransaksi()}
              </Container>
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}
