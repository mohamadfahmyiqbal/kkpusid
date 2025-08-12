import { Container } from "react-bootstrap";
import Header from "../../comp/global/header/Header";
import Sidebar from "../../comp/global/Sidebar";
import { useCallback, useState } from "react";

// Komponen notifikasi
import { Card, Button } from "react-bootstrap";

const notifications = [
  {
    title: "Registrasi anggota",
    status: "Berhasil",
    statusVariant: "success",
    date: "23 Maret 2023",
    time: "10:00",
  },
  {
    title: "Pembayaran Setoran Pokok & Wajib",
    status: "Berhasil",
    statusVariant: "success",
    date: "23 Maret 2023",
    time: "10:30",
  },
  {
    title: "Pengajuan jual beli Yamaha NMAX",
    status: "Ditolak",
    statusVariant: "danger",
    date: "23 Maret 2023",
    time: "10:30",
  },
];

function NotificationPanel() {
  return (
    <Container className="py-4">
      {notifications.map((notif, index) => (
        <Card key={index} className="mb-3 shadow-sm">
          <Card.Body className="d-flex justify-content-between align-items-center">
            <div>
              <Card.Title>{notif.title}</Card.Title>
              <Card.Text className="text-muted">
                Administrator • {notif.date} • {notif.time}
              </Card.Text>
            </div>
            <Button variant={notif.statusVariant}>{notif.status}</Button>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default function NotifikasiScreen() {
  const [user, setUser] = useState(null);

  const handleUserChange = useCallback((newUser) => {
    setUser(newUser);
  }, []);

  return (
    <div id="main-wrapper">
      <Header onUserChange={handleUserChange} />
      <Sidebar user={user} />
      <div className="page-wrapper">
        <Container fluid>
          <h4 className="mt-4 mb-3">📢 Notifikasi</h4>
          <NotificationPanel />
        </Container>
      </div>
    </div>
  );
}
