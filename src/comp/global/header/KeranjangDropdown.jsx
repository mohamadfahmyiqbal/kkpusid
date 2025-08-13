import { NavDropdown } from "react-bootstrap";
import { FaFileAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";
import PropTypes from "prop-types";

export default function KeranjangDropdown({ user }) {
  const navigate = useNavigate();

  // Handler untuk navigasi ke halaman PusatTagihan
  const handleClick = (e) => {
    e.preventDefault();
    const token = jwtEncode({ page: "PusatTagihan" });
    navigate(`/page/${token}`);
  };

  return (
    <NavDropdown
      as="li"
      title={
        <span
          className="nav-link text-white waves-effect waves-dark p-0"
          role="button"
        >
          <FaFileAlt />
          <div className="notify">
            <span className="heartbit"></span>
            <span className="point"></span>
          </div>
        </span>
      }
      id="dropdown-keranjang"
      align="end"
      className="nav-item"
    >
      <div className="mailbox animated bounceInDown" style={{ minWidth: 300 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <div className="drop-title">Pusat Tagihan</div>
          </li>
          <li>
            <div
              className="slimScrollDiv"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "auto",
                height: "120px",
              }}
            >
              <div
                className="message-center d-flex align-items-center justify-content-center"
                style={{
                  overflow: "hidden",
                  width: "auto",
                  height: "100%",
                  minHeight: "100px",
                }}
              >
                <span className="text-muted">
                  {user && user.nama
                    ? `Halo, ${user.nama}!`
                    : "Belum ada tagihan baru."}
                </span>
              </div>
            </div>
          </li>
          <li>
            <a
              className="nav-link text-center"
              href="#!"
              onClick={handleClick}
            >
              <strong>Lihat Semua Tagihan</strong>
              <i className="fa fa-angle-right ms-2"></i>
            </a>
          </li>
        </ul>
      </div>
    </NavDropdown>
  );
}

KeranjangDropdown.propTypes = {
  user: PropTypes.object,
};
