import React from "react";
import { Navigate, useParams } from "react-router-dom";
import PAGE_COMPONENT from "./PageRoutes";
import { jwtDecodePage } from "./helper";

export const EncryptedPages = React.memo(() => {
  const { token } = useParams();
  const pageName = jwtDecodePage(token);
  const PageComponent = PAGE_COMPONENT[pageName];

  return PageComponent ? <PageComponent /> : <Navigate to="/" replace />;
});
