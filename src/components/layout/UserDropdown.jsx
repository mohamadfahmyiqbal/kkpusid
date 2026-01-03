import React from "react";
import { NavDropdown, Spinner, Badge } from "react-bootstrap";
import {
  FaUser,
  FaWallet,
  FaPowerOff,
  FaChevronRight,
  FaCog,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

export default function UserDropdown({ user, logout, loading }) {
  const navigate = useNavigate();

  // Helper untuk mendapatkan sumber foto dengan fallback default
  const getFotoSrc = (foto) => {
    if (!foto) return "/assets/images/users/default-user.png";
    return foto.startsWith("data:image")
      ? foto
      : `data:image/jpeg;base64,${foto}`;
  };

  /**
   * Handler navigasi terenkripsi
   */
  const handleNav = (page) => {
    const token = jwtEncode({ page: page });
    navigate(`/${token}`);
  };

  return (
    <NavDropdown
      as="li"
      id="dropdown-user"
      align="end"
      className="nav-item user-dropdown"
      title={
        <div className="nav-link text-white p-0 d-flex align-items-center">
          {loading ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : (
            <>
              <img
                src={getFotoSrc(user?.foto)}
                alt="user"
                width={32}
                height={32}
                className="rounded-circle border border-2 border-white-50 shadow-sm"
                style={{ objectFit: "cover" }}
              />
              <span className="ms-2 d-none d-lg-inline-block small fw-bold text-white">
                {user?.full_name?.split(" ")[0] || "User"}
              </span>
            </>
          )}
        </div>
      }
    >
      <div
        style={{ width: "280px" }}
        className="shadow-lg border-0 rounded-3 overflow-hidden"
      >
        {/* Header Profil: Informasi Utama */}
        <div className="p-3 bg-light border-bottom">
          <div className="d-flex align-items-center">
            <img
              src={getFotoSrc(user?.foto)}
              alt="user"
              width={55}
              height={55}
              className="rounded-circle shadow-sm me-3 border border-2 border-white"
              style={{ objectFit: "cover" }}
            />
            <div className="overflow-hidden">
              <h6 className="mb-0 fw-bold text-dark text-truncate">
                {user?.full_name || "Guest User"}
              </h6>
              <p
                className="text-muted mb-1 small text-truncate"
                style={{ fontSize: "0.75rem" }}
              >
                {user?.email || "No email address"}
              </p>
              <Badge
                bg="info"
                className="fw-medium px-2 py-1"
                style={{ fontSize: "0.6rem" }}
              >
                ID: {user?.member_no || "-"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="py-2">
          <NavDropdown.Item
            onClick={() => handleNav("accountPage")}
            className="py-2 px-3 dropdown-item-custom"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <FaUser className="me-3 text-muted" size={14} />
                <span className="small fw-semibold">Profil Saya</span>
              </div>
              <FaChevronRight size={10} className="text-muted opacity-50" />
            </div>
          </NavDropdown.Item>

          <NavDropdown.Item
            onClick={() => handleNav("balancePage")}
            className="py-2 px-3 dropdown-item-custom"
          >
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <FaWallet className="me-3 text-muted" size={14} />
                <span className="small fw-semibold">Saldo & Tabungan</span>
              </div>
              <FaChevronRight size={10} className="text-muted opacity-50" />
            </div>
          </NavDropdown.Item>

          <NavDropdown.Divider className="my-2" />

          {/* Logout Section */}
          <NavDropdown.Item
            onClick={logout}
            className="py-2 px-3 text-danger logout-item"
          >
            <div className="d-flex align-items-center">
              <FaPowerOff className="me-3" size={14} />
              <span className="small fw-bold">Keluar Aplikasi</span>
            </div>
          </NavDropdown.Item>
        </div>
      </div>
    </NavDropdown>
  );
}
