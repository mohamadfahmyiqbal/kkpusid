import React, { memo, useCallback, useRef, useEffect } from "react";
import { NavDropdown, Spinner, Badge } from "react-bootstrap";
import { FaUser, FaWallet, FaPowerOff, FaChevronRight } from "react-icons/fa";
import { useNavigation } from "../../../hooks/useNavigation";
import { getSafeDisplayName, sanitizeText } from "../../../utils/sanitization";
import {
  DROPDOWN_WIDTHS,
  FONT_SIZES,
  IMAGE_SIZES,
  ACCESSIBILITY_LABELS,
  CSS_CLASSES,
} from "../../../constants/layout";

export default memo(function UserDropdown({ user, logout, loading }) {
  const { navigateTo } = useNavigation();
  const dropdownRef = useRef(null);

  // Memoize foto source function to prevent recreation
  const getFotoSrc = useCallback((foto) => {
    if (!foto) return "/assets/images/users/default-user.png";
    return foto.startsWith("data:image")
      ? foto
      : `data:image/jpeg;base64,${foto}`;
  }, []);

  /**
   * Handler navigasi terenkripsi
   */
  const handleNav = useCallback(
    (page) => {
      navigateTo(page);
    },
    [navigateTo],
  );

  // Keyboard navigation support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && dropdownRef.current) {
        dropdownRef.current.click();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <NavDropdown
      as="li"
      id="dropdown-user"
      align="end"
      className="nav-item user-dropdown"
      ref={dropdownRef}
      title={
        <div className="nav-link text-white p-0 d-flex align-items-center">
          {loading ? (
            <Spinner animation="border" size="sm" variant="light" />
          ) : (
            <>
              <img
                src={getFotoSrc(user?.foto)}
                alt="user"
                width={IMAGE_SIZES.USER_AVATAR_SMALL}
                height={IMAGE_SIZES.USER_AVATAR_SMALL}
                className="rounded-circle border border-2 border-white-50 shadow-sm"
                style={{ objectFit: "cover" }}
              />
              <span className="ms-2 d-none d-lg-inline-block small fw-bold text-white">
                {getSafeDisplayName(user?.full_name)}
              </span>
            </>
          )}
        </div>
      }
    >
      <div
        style={{ width: DROPDOWN_WIDTHS.USER }}
        className="shadow-lg border-0 rounded-3 overflow-hidden"
      >
        {/* Header Profil: Informasi Utama */}
        <div className="p-3 bg-light border-bottom">
          <div className="d-flex align-items-center">
            <img
              src={getFotoSrc(user?.foto)}
              alt="user"
              width={IMAGE_SIZES.USER_AVATAR_LARGE}
              height={IMAGE_SIZES.USER_AVATAR_LARGE}
              className="rounded-circle shadow-sm me-3 border border-2 border-white"
              style={{ objectFit: "cover" }}
            />
            <div className="overflow-hidden">
              <h6 className="mb-0 fw-bold text-dark text-truncate">
                {sanitizeText(user?.full_name) || "Guest User"}
              </h6>
              <p
                className="text-muted mb-1 small text-truncate"
                style={{ fontSize: FONT_SIZES.EXTRA_SMALL }}
              >
                {sanitizeText(user?.email) || "No email address"}
              </p>
              <Badge
                bg="info"
                className="fw-medium px-2 py-1"
                style={{ fontSize: FONT_SIZES.BADGE }}
              >
                ID: {sanitizeText(user?.member_no) || "-"}
              </Badge>
            </div>
          </div>
        </div>

        {/* Menu Navigasi */}
        <div className="py-2">
          <NavDropdown.Item
            as="div"
            onClick={() => handleNav("accountPage")}
            className={`py-2 px-3 ${CSS_CLASSES.DROPDOWN_ITEM} transition-all duration-200`}
            aria-label={ACCESSIBILITY_LABELS.PROFILE_PAGE}
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
            as="div"
            onClick={() => handleNav("balancePage")}
            className={`py-2 px-3 ${CSS_CLASSES.DROPDOWN_ITEM} transition-all duration-200`}
            aria-label={ACCESSIBILITY_LABELS.BALANCE_PAGE}
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
            as="div"
            onClick={logout}
            className={`py-2 px-3 text-danger ${CSS_CLASSES.LOGOUT_ITEM} transition-all duration-200`}
            aria-label={ACCESSIBILITY_LABELS.LOGOUT}
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
});
