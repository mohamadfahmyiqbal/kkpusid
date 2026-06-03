import React, { useMemo, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { jwtEncode } from "../../../utils/helpers";

const SPLASH_PAGE_NAME = "globalSplash";

const LoginHeader = ({ targetPageName = "authLogin", linkText = "Login" }) => {
  const [isLoading, setIsLoading] = useState(false);

  const safePaths = useMemo(() => {
    const encodePath = (page) => {
      try {
        return `/${jwtEncode({ page })}`;
      } catch {
        return "/";
      }
    };

    return {
      splashPath: encodePath(SPLASH_PAGE_NAME),
      targetPath: encodePath(targetPageName),
    };
  }, [targetPageName]);

  const handleNavigation = (e) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }

    setIsLoading(true);
  };

  return (
    <header className="pbs-header fixed-top">
      <div className="pbs-navbar py-3">
        <Container className="d-flex justify-content-between align-items-center">
          <a
            href={safePaths.splashPath}
            className="pbs-brand text-decoration-none"
          >
            <img
              src={`${process.env.PUBLIC_URL}/assets/icons/PUSlogo.png`}
              alt="Logo PBS"
              className="pbs-brand-logo"
            />

            <div className="pbs-brand-text-wrap">
              <span className="pbs-brand-title">Paguyuban Usaha</span>
              <span className="pbs-brand-subtitle">Sukses</span>
            </div>
          </a>

          <a
            href={safePaths.targetPath}
            onClick={handleNavigation}
            className="pbs-login-link-btn text-decoration-none"
          >
            {isLoading ? (
              <>
                <Spinner size="sm" animation="border" className="me-2" />
                Loading...
              </>
            ) : (
              linkText
            )}
          </a>
        </Container>
      </div>
    </header>
  );
};

export default React.memo(LoginHeader);
