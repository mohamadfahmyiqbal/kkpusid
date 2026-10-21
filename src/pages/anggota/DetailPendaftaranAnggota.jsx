import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Row,
  Spinner,
  Alert,
} from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";
import UApproval from "../../utils/UApproval";
import UAnggota from "../../utils/UAnggota";
import { jwtEncode } from "../../routes/helpers";
import { useProfile } from "../../components/layout/contexts";

import PersonalInfoSection from "./detail-pendaftaran/PersonalInfoSection";
import PhotoInfoSection from "./detail-pendaftaran/PhotoInfoSection";
import AccountInfoSection from "./detail-pendaftaran/AccountInfoSection";
import JobInfoSection from "./detail-pendaftaran/JobInfoSection";
import BankInfoSection from "./detail-pendaftaran/BankInfoSection";
import ApprovalInfoSection from "./detail-pendaftaran/ApprovalInfoSection";

export default function DetailPendaftaranAnggota() {
  const { userData } = useProfile();
  const [dataPendaftaran, setDataPendaftaran] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const getPendaftaran = useCallback(async () => {
    let nik = userData?.nik;
    if (!nik) {
      try {
        const resUser = await UAnggota.findAnggotaByToken();
        nik = resUser.data?.nik;
      } catch (err) {
        console.error("Gagal mendapatkan data user:", err);
      }
    }

    if (!nik) return;

    setLoading(true);
    try {
      const res = await UApproval.getApprovalDetail({
        nik,
        type: "pendaftaran_anggota",
      });

      setDataPendaftaran(res.data);
    } catch (err) {
      console.error(err);

      // Fallback langsung ke form pendaftaran jika request gagal
      navigate(`/${jwtEncode({ page: "formPendaftaranAnggota" })}`, {
        state: {
          back: "pendaftaranAnggota",
          jenis: "pendaftaranAnggota",
        },
      });
    } finally {
      setLoading(false);
    }
  }, [userData, navigate]);

  useEffect(() => {
    getPendaftaran();
  }, [getPendaftaran]);

  // Cek semua approval sudah approved
  const allApproved =
    dataPendaftaran?.RequestApproval?.length > 0 &&
    dataPendaftaran.RequestApproval.every(
      (apr) => apr?.status?.toLowerCase() === "approved",
    );

  const handleInvoiceClick = () => {
    const token = jwtEncode({ page: "invoice" });
    navigate(`/${token}`, {
      state: {
        title: "Invoice Pendaftaran Anggota",
        back: "detailPendaftaranAnggota",
        data: dataPendaftaran?.token,
      },
    });
  };

  return (
    <Container fluid className="py-3">
      <Row className="border-bottom mb-3 pb-2">
        <Col xs={12} className="d-flex align-items-center">
          <Button
            variant="link"
            className="p-0 me-2"
            onClick={() => navigate(-1)}
            style={{ textDecoration: "none" }}
          >
            <FaArrowLeft size={15} color="black" />
          </Button>
          <h1 className="fw-bold mb-0">Pendaftaran Anggota</h1>
        </Col>
      </Row>

      <Row>
        <Col md={12}>
          <Card className="border shadow-sm rounded-4">
            <CardHeader className="bg-topbar text-white rounded-top-4">
              <CardTitle className="mb-0">Detail Pendaftaran</CardTitle>
            </CardHeader>
            <CardBody>
              {loading ? (
                <div className="text-center my-5">
                  <Spinner animation="border" role="status" />
                  <div className="mt-2 text-muted">Memuat data...</div>
                </div>
              ) : dataPendaftaran ? (
                <Container fluid className="px-0">
                  {/* Personal Info */}
                  <PersonalInfoSection
                    nik={dataPendaftaran?.anggota?.nik}
                    nama={dataPendaftaran?.anggota?.nama}
                    tempatLahir={dataPendaftaran?.anggota?.tempat_lahir}
                    tglLahir={dataPendaftaran?.anggota?.tgl_lahir}
                    jenisKelamin={dataPendaftaran?.anggota?.jenis_kelamin}
                    golDarah={dataPendaftaran?.anggota?.gol_darah}
                    alamat={dataPendaftaran?.anggota?.alamat}
                    agama={dataPendaftaran?.anggota?.agama}
                    statusKawin={dataPendaftaran?.anggota?.status_kawin}
                  />

                  {/* Photo Info */}
                  <PhotoInfoSection
                    ktpImg={dataPendaftaran?.anggota?.ktpImg}
                    fotoImg={dataPendaftaran?.anggota?.fotoImg}
                  />

                  {/* Account Info */}
                  <AccountInfoSection
                    categoryName={dataPendaftaran?.categoryAnggota?.nama}
                    noTlp={dataPendaftaran?.anggota?.no_tlp}
                    email={dataPendaftaran?.anggota?.email}
                  />

                  {/* Job Info */}
                  <JobInfoSection job={dataPendaftaran?.anggota?.job} />

                  {/* Bank Info */}
                  <BankInfoSection bank={dataPendaftaran?.anggota?.bank} />

                  {/* Approval Info */}
                  <ApprovalInfoSection
                    requestApprovals={dataPendaftaran?.RequestApproval}
                    allApproved={allApproved}
                    onNext={handleInvoiceClick}
                  />
                </Container>
              ) : (
                <Alert variant="warning" className="text-center my-3">
                  Data pendaftaran tidak tersedia.
                </Alert>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
