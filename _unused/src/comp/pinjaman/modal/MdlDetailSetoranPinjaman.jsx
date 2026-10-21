import {
  Badge,
  Button,
  Card,
  Col,
  ModalBody,
  ModalFooter,
  Row,
  Table,
} from "react-bootstrap";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import UPinjaman from "../../../utils/UPinjaman";
import Loading from "../../global/Loading";

export default function MdlDetailSetoranPinjaman({ detailData, onHide }) {
  const [loading, setLoading] = useState(false);
  const [dataSetoran, setDataSetoran] = useState([]);

  const formatRupiah = (number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number || 0);

  const alamat = (
    <>
      Jl. Antah Berantah No.01
      <br />
      Ds. Nan Jauh
      <br />
      Kec. Cikarang Utara
      <br />
      Kab. Bekasi
    </>
  );

  const biayaAdmin = 2500;
  const jumlahCicilan = Number(detailData?.jumlah) || 0;
  const totalPembayaran = jumlahCicilan + biayaAdmin;

  return (
    <>
      <ModalBody>
        <Card>
          <Card.Header className="bg-white border-top border-bottom" as="h5">
            Invoice Pembayaran
          </Card.Header>
          <Card.Body>
            {loading ? (
              <Loading />
            ) : (
              <>
                {/* Alamat */}
                <Row className="mb-3">
                  <Col md={6}>
                    <h5>{detailData?.nama || "-"}</h5>
                    <p className="mb-0">{alamat}</p>
                  </Col>
                  <Col md={6} className="text-end">
                    <h5>Kepada:</h5>
                    <p className="mb-0">
                      Koperasi PUS
                      <br />
                      {alamat}
                    </p>
                  </Col>
                </Row>

                {/* Tanggal */}
                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Tanggal:</strong> {moment().format("DD-MM-YYYY")}
                  </Col>
                  <Col md={6} className="text-end">
                    <strong>Expire:</strong> {moment().format("DD-MM-YYYY")}
                  </Col>
                </Row>

                {/* Detail Pembayaran */}
                <h5 className="border-top border-bottom py-3 mb-3">
                  Detail Pembayaran
                </h5>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Deskripsi</th>
                      <th>Jumlah</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Pembayaran cicilan pinjaman lunak ke 1</td>
                      <td>{formatRupiah(jumlahCicilan)}</td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Biaya Administrasi</td>
                      <td>{formatRupiah(biayaAdmin)}</td>
                    </tr>
                    <tr>
                      <td colSpan="2">
                        <strong>Total</strong>
                      </td>
                      <td>
                        <strong>{formatRupiah(totalPembayaran)}</strong>
                      </td>
                    </tr>
                  </tbody>
                </Table>

                {/* Info Bank */}
                <h5 className="border-top border-bottom py-3 mb-3">
                  Bank Info
                </h5>
                <Row>
                  <Col md={6}>
                    <p>
                      <strong>Bank:</strong> Bank Syariah Indonesia
                    </p>
                  </Col>
                  <Col md={6}>
                    <p>
                      <strong>Virtual Account:</strong> 123123123123123
                    </p>
                  </Col>
                </Row>

                {/* Status */}
                <div className="mt-3">
                  <h5>Status</h5>
                  <Badge bg="success" pill className="px-4 py-2 fs-5 w-100">
                    Pembayaran Berhasil
                  </Badge>
                </div>
              </>
            )}
          </Card.Body>
        </Card>
      </ModalBody>

      <ModalFooter>
        <Button variant="danger" onClick={onHide}>
          Tutup
        </Button>
      </ModalFooter>
    </>
  );
}
