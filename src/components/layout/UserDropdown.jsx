// components/layout/UserDropdown.jsx

import { NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../routes/helpers";

export default function UserDropdown({ user, logout }) {
  const navigate = useNavigate();

  const getFotoSrc = (foto) => {
    if (!foto) return "../assets/images/users/default-user.png";
    return foto.startsWith("data:image")
      ? foto
      : `data:image/jpeg;base64,${foto}`;
  };

  /**
   * Handler untuk navigasi ke halaman terenkripsi.
   * @param {string} page - Nama halaman (misalnya "accountPage", "balancePage").
   */
  const handleClick = (page) => {
    const token = jwtEncode({ page: page });
    navigate(`/${token}`);
  };

  return (
    <NavDropdown
      as="li"
      title={
        <span
          className="nav-link text-white waves-effect waves-dark p-0"
          role="button"
        >
          <FaUserCircle className="profile-pic" size={20} />
        </span>
      }
      id="dropdown-user"
      align="end"
      className="nav-item"
    >
      <div className="dropdown-menu-right mailbox animated bounceInDown">
        {/* Konten User Box */}
        <div className="dw-user-box px-3 py-2">
          <div className="d-flex align-items-center">
            <img
              src={getFotoSrc(user?.foto)}
              alt="user"
              width={40}
              height={40}
              className="rounded-circle me-2"
            />
            <div>
              <h6 className="mb-0">{user?.nama || "Guest"}</h6>
              <p className="text-muted mb-1" style={{ fontSize: 12 }}>
                {user?.email || "No email"}
              </p>
              <button
                className="btn btn-rounded btn-danger btn-sm"
                // ✅ UBAH DARI "profile" ke "accountPage"
                onClick={() => handleClick("accountPage")}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Separator */}
      <NavDropdown.Divider />

      {/* Menu Item: My Profile */}
      <NavDropdown.Item onClick={() => handleClick("accountPage")}>
        {/* ✅ UBAH DARI "profile" ke "accountPage" */}
        <i className="ti-user me-2"></i> My Profile
      </NavDropdown.Item>

      {/* Menu Item: My Balance */}
      <NavDropdown.Item onClick={() => handleClick("balancePage")}>
        <i className="ti-wallet me-2"></i> My Balance
      </NavDropdown.Item>

      {/* Separator */}
      <NavDropdown.Divider />

      {/* Menu Item: Logout */}
      <NavDropdown.Item onClick={logout}>
        <i className="fa fa-power-off me-2"></i> Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
}
