// pages/program/arisan/ArisanPage.jsx (Kode Final)

import React, { useState, useCallback } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import DashboardLayout from '../../../components/layout/DashboardLayout'; // Path: Naik 3 tingkat
import ProgramAccountCard from '../../../components/program/ProgramAccountCard';
import ProgramStatusCard from '../../../components/program/ProgramStatusCard';
import ProgramTabMenu from '../../../components/program/ProgramTabMenu';
import { jwtEncode } from '../../../routes/helpers';

// --- DATA MOCKUP ---
const MOCK_ACCOUNT_DATA_ARISAN = {
 nama: "Budi Santoso",
 produk: "Arisan Haji/Umroh Skema 1",
 akad: "Murabahah",
 tanggalBuka: "01 Februari 2024",
 saldoAkhir: "Rp 1.400.000", // Setoran terakhir
};

const PROGRAM_OPTIONS = [
 { label: 'Pinjaman Lunak', key: 'pinjaman' },
 { label: 'Arisan', key: 'arisan' },
];

export default function ArisanPage() {
 const navigate = useNavigate();

 // STATE KONDISIONAL: Ubah ke 'true' untuk simulasi Arisan Aktif (Arisan_OK.png)
 const [hasActiveArisan] = useState(false);
 const activeTab = 'arisan';

 // Handler untuk navigasi ke halaman daftar grup arisan (ArisanJoinPage.jsx)
 const handleGabungArisan = useCallback(() => {
  const token = jwtEncode({ page: "arisanJoinPage" }); // Kunci rute baru
  navigate(`/${token}`);
 }, [navigate]);

 // Handler untuk navigasi ke halaman Setoran (contoh)
 const handleSetoran = useCallback(() => {
  const token = jwtEncode({ page: "billingPage", action: "setoranArisan" });
  navigate(`/${token}`);
  console.log("Navigasi ke halaman Setoran Arisan.");
 }, [navigate]);

 // Handle saat tab berubah (kembali ke ProgramPage)
 const handleTabChange = useCallback((key) => {
  if (key === 'pinjaman') {
   const token = jwtEncode({ page: "programPage" });
   navigate(`/${token}`);
  }
 }, [navigate]);

 const renderArisanContent = () => {
  if (hasActiveArisan) {
   // Tampilan OK (Arisan Aktif)
   return (
    <ProgramAccountCard
     accountData={MOCK_ACCOUNT_DATA_ARISAN}
     handleSetoran={handleSetoran}
     // Tombol 'Pengajuan' di ProgramAccountCard diubah fungsinya menjadi 'Gabung Grup Arisan'
     handlePengajuan={handleGabungArisan}
    />
   );
  } else {
   // Tampilan NG (Belum Ada Arisan Aktif)
   return (
    <ProgramStatusCard
     title="Informasi Rekening"
     message="Anda belum terdaftar dalam grup Arisan manapun."
     buttonText="Gabung Grup Arisan"
     onButtonClick={handleGabungArisan}
    />
   );
  }
 };

 return (
  <DashboardLayout title="Arisan">
   <div className="row page-titles pt-3">
    <div className="col-12 align-self-center">
     <h3 className="text-themecolor mb-0 mt-0 fw-bold">Arisan</h3>
    </div>
   </div>

   <Container className="mt-4">
    <Row className="justify-content-center">
     <Col lg={10} md={12}>

      {/* Tab Menu */}
      <ProgramTabMenu
       options={PROGRAM_OPTIONS}
       activeKey={activeTab}
       onChange={handleTabChange}
      />

      {renderArisanContent()}

     </Col>
    </Row>
   </Container>
  </DashboardLayout>
 );
}