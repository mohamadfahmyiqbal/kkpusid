import React from "react";
import { Navigate, useParams } from "react-router-dom";
import PAGE_COMPONENTS from "./PageRoutes";
import { jwtDecodePage } from "./helper";

export const EncryptedPages = React.memo(() => {
  const { token } = useParams();
  const pageName = jwtDecodePage(token);
  const PageComponent = PAGE_COMPONENTS[pageName];

  return PageComponent ? <PageComponent /> : <Navigate to="/" replace />;
});
