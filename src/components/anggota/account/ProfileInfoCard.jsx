import React from "react";
import { Button, Card } from "react-bootstrap";
import {
  FaUserCircle,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

// Fungsi helper untuk mendapatkan src foto
const getFotoSrc = (foto) => {
  if (!foto) return "../assets/images/users/default-user.png";
  return foto.startsWith("data:image")
    ? foto
    : `data:image/jpeg;base64,${foto}`;
};

export default function ProfileInfoCard({ user }) {
  // Logic untuk menentukan badge status
  const getStatusBadge = (status) => {
    switch (status) {
      case "Aktif":
        return "badge bg-success";
      case "Pending":
        return "badge bg-warning text-dark";
      case "Nonaktif":
        return "badge bg-danger";
      default:
        return "badge bg-secondary";
    }
  };

  return (
    <Card>
      <Card.Body className="text-center">
        {/* Foto Profil */}
        <div className="profile-img-container mb-3">
          <img
            src={getFotoSrc(user.foto)}
            className="rounded-circle"
            width="100"
            height="100"
            alt="Foto Profil"
          />
        </div>

        {/* Nama dan Status */}
        <h4 className="card-title mt-2">{user.nama}</h4>
        <h6 className="card-subtitle text-muted mb-3">
          {user.jabatan}
          <span
            className={getStatusBadge(user.status)}
            style={{ marginLeft: "10px" }}
          >
            {user.status}
          </span>
        </h6>

        {/* Detail Kontak & Anggota */}
        <div className="list-group list-group-flush text-start">
          <li className="list-group-item">
            <FaUserCircle className="me-2 text-primary" />
            No. Anggota:{" "}
            <strong className="float-end">{user.no_anggota}</strong>
          </li>
          <li className="list-group-item">
            <FaEnvelope className="me-2 text-primary" />
            Email: <strong className="float-end">{user.email}</strong>
          </li>
          <li className="list-group-item">
            <FaPhone className="me-2 text-primary" />
            Telepon: <strong className="float-end">{user.telepon}</strong>
          </li>
          <li className="list-group-item">
            <FaMapMarkerAlt className="me-2 text-primary" />
            Alamat:{" "}
            <span className="float-end text-break" style={{ maxWidth: "60%" }}>
              {user.alamat}
            </span>
          </li>
        </div>

        {/* Tombol Ganti Foto (Opsional) */}
        <Button variant="outline-primary" size="sm" className="mt-4">
          Ganti Foto
        </Button>
      </Card.Body>
    </Card>
  );
}
