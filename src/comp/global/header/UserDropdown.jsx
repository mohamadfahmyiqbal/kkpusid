import { NavDropdown } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { jwtEncode } from "../../../routes/helpers";
import { useNavigate } from "react-router-dom";

export default function UserDropdown({ user, logout }) {
  const navigate = useNavigate();

  // Fungsi untuk mendapatkan src gambar base64
  const getFotoSrc = (foto) => {
    if (!foto) return "/assets/icons/default-user.png"; // fallback jika tidak ada foto
    return foto.startsWith("data:image")
      ? foto
      : `data:image/jpeg;base64,${foto}`;
  };

  const handleClick = (link) => {
    const token = jwtEncode({ page: link });
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
      <div className="mailbox" style={{ minWidth: 300 }}>
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
                onClick={() => handleClick("profile")}
              >
                View Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={() => handleClick("profile")}>
        <i className="ti-user me-2"></i> My Profile
      </NavDropdown.Item>
      <NavDropdown.Item onClick={() => handleClick("balance")}>
        <i className="ti-wallet me-2"></i> My Balance
      </NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item onClick={logout}>
        <i className="fa fa-power-off me-2"></i> Logout
      </NavDropdown.Item>
    </NavDropdown>
  );
}
