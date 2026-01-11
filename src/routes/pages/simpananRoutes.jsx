import React, { lazy } from "react";

// Gunakan Lazy Loading untuk memutus circular dependency
const PenarikanSimpananPage = lazy(() =>
  import("../../pages/simpanan/PenarikanSimpananPage/PenarikanSimpananPage")
);
const DetailSaldoPage = lazy(() =>
  import("../../pages/simpanan/DetailSaldoPage")
);
const SimpananPage = lazy(() => import("../../pages/simpanan/SimpananPage"));

const simpananRoutes = {
  simpananDetailSaldo: DetailSaldoPage,
  simpananPage: SimpananPage,
  penarikanSimpananPage: PenarikanSimpananPage,
};

export default simpananRoutes;
