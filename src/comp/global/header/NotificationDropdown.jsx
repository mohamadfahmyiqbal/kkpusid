import { NavDropdown } from "react-bootstrap";
import { FaBell, FaLink } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../../../routes/helpers";

export default function NotificationDropdown() {
  const navigate = useNavigate();

  // Handler untuk navigasi ke halaman notifikasi
  const handleClick = (e) => {
    e.preventDefault();
    const token = jwtEncode({ page: "notifikasi" });
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
          <FaBell />
          <div className="notify">
            <span className="heartbit"></span>
            <span className="point"></span>
          </div>
        </span>
      }
      id="dropdown-messages"
      align="end"
      className="nav-item"
    >
      <div className="mailbox animated bounceInDown" style={{ minWidth: 300 }}>
        <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
          <li>
            <div className="drop-title">Notifikasi</div>
          </li>
          <li>
            <div
              className="slimScrollDiv"
              style={{
                position: "relative",
                overflow: "hidden",
                width: "auto",
                height: "250px",
              }}
            >
              <div
                className="message-center"
                style={{
                  overflow: "hidden",
                  width: "auto",
                  height: "250px",
                }}
              >
                <a href="#!">
                  <div className="btn btn-danger btn-circle">
                    <FaLink />
                  </div>
                  <div className="mail-contnet">
                    <h6>Launch Admin</h6>
                    <span className="mail-desc">Just see my new admin!</span>
                    <span className="time">9:30 AM</span>
                  </div>
                </a>
              </div>
            </div>
          </li>
          <li>
            <a
              className="nav-link text-center"
              href="#!"
              onClick={handleClick}
              role="button"
              tabIndex={0}
            >
              <strong>Lihat semua notifikasi</strong>
              <i className="fa fa-angle-right"></i>
            </a>
          </li>
        </ul>
      </div>
    </NavDropdown>
  );
}
