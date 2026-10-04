import React, { lazy } from 'react';
import { Spinner } from 'react-bootstrap';

// Lazy loaded components
const LazyFinancialSection = lazy(() => import('./FinancialSection'));
const LazyMainMenuSection = lazy(() => import('./MainMenuSection'));
const LazyTagihanSection = lazy(() => import('./TagihanSection'));
const LazyPortofolioSection = lazy(() => import('./PortofolioSection'));
const LazyEvaluasiSection = lazy(() => import('./EvaluasiSection'));
const LazyArtikelSection = lazy(() => import('./ArtikelSection'));

const LoadingFallback = () => (
  <div className="text-center py-3">
    <Spinner animation="border" variant="primary" size="sm" />
    <small className="d-block mt-2 text-muted">Memuat...</small>
  </div>
);

export {
  LazyFinancialSection,
  LazyMainMenuSection,
  LazyTagihanSection,
  LazyPortofolioSection,
  LazyEvaluasiSection,
  LazyArtikelSection,
  LoadingFallback
};
