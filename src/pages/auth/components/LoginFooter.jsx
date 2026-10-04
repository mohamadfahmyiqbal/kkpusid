import React from "react";
import { Container } from "react-bootstrap";

const LoginFooter = () => {
  return (
    <footer className="login-footer text-center py-3 mt-auto">
      <Container>
        <p className="mb-0 text-muted small">
          &copy; 2025 Paguyuban Usaha Sukses. All rights reserved.
        </p>
      </Container>
    </footer>
  );
};

export default React.memo(LoginFooter);
