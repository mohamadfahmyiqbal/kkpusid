import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { MdArrowBack } from "react-icons/md";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="py-5" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container>
        <div className="mb-4 d-flex align-items-center">
          <button 
            onClick={() => navigate(-1)} 
            className="btn btn-link text-decoration-none p-0 d-flex align-items-center"
            style={{ color: '#0d6efd' }}
          >
            <MdArrowBack size={24} className="me-2" />
            Kembali
          </button>
        </div>

        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="shadow-sm border-0 rounded-4">
              <Card.Body className="p-5">
                <h1 className="mb-4 text-center">Kebijakan Privasi</h1>
                <p className="text-muted text-center mb-5">Pembaruan Terakhir: 15 Juli 2026</p>

                <div className="privacy-content">
                  <h4 className="mb-3">1. Pengumpulan Data Informasi</h4>
                  <p className="text-secondary mb-4">
                    KKPUS (Koperasi & Layanan Pembiayaan Usaha Syariah) mengumpulkan informasi pribadi Anda saat Anda mendaftar sebagai anggota, mengajukan pembiayaan, atau menggunakan layanan kami. Informasi ini mencakup namun tidak terbatas pada nama, alamat, nomor identitas, data pekerjaan, dan data keuangan.
                  </p>

                  <h4 className="mb-3">2. Penggunaan Data</h4>
                  <p className="text-secondary mb-4">
                    Data yang dikumpulkan digunakan secara eksklusif untuk tujuan verifikasi keanggotaan, analisis kelayakan pembiayaan syariah, pencegahan penipuan, serta peningkatan layanan Koperasi sesuai regulasi Kementerian Koperasi dan UKM serta pengawasan Dewan Pengawas Syariah (DPS).
                  </p>

                  <h4 className="mb-3">3. Perlindungan & Keamanan Data</h4>
                  <p className="text-secondary mb-4">
                    KKPUS menerapkan standar keamanan tingkat perusahaan (Enterprise Standard) dalam melindungi data pribadi Anda. Kami menggunakan teknologi enkripsi, server aman, dan kontrol akses ketat untuk mencegah akses, pengubahan, atau kebocoran data yang tidak sah. Data keuangan Anda dijaga kerahasiaannya dengan tingkat perlindungan tertinggi.
                  </p>

                  <h4 className="mb-3">4. Berbagi Informasi dengan Pihak Ketiga</h4>
                  <p className="text-secondary mb-4">
                    Kami tidak akan menjual, menyewakan, atau menukar informasi pribadi Anda kepada pihak ketiga manapun untuk tujuan pemasaran komersial. Kami hanya membagikan data Anda kepada otoritas terkait jika diwajibkan oleh hukum, atau kepada mitra terpercaya yang terikat oleh perjanjian kerahasiaan ketat semata-mata untuk memfasilitasi layanan pembiayaan.
                  </p>

                  <h4 className="mb-3">5. Perubahan Kebijakan Privasi</h4>
                  <p className="text-secondary mb-4">
                    Kebijakan privasi ini dapat diperbarui dari waktu ke waktu menyesuaikan dengan regulasi pemerintah dan kebijakan internal koperasi. Perubahan substansial akan diinformasikan kepada anggota melalui email atau notifikasi dalam aplikasi.
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PrivacyPolicyPage;
