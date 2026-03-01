// pages/global/landing/LandingPage.jsx
import React, { lazy, Suspense } from "react";
import { Container, Spinner } from "react-bootstrap";

// Lazy load components
const LandingHeader = lazy(() => import("./component/LandingHeader"));
const HeroSection = lazy(() => import("./component/HeroSection"));
const ArticleSection = lazy(() => import("./component/ArticleSection"));
const LandingFooter = lazy(() => import("./component/LandingFooter"));

// Loading fallback component
const LoadingFallback = () => (
  <Container className="text-center py-5">
    <Spinner animation="border" variant="light" />
    <p className="text-white mt-3">Memuat halaman...</p>
  </Container>
);

export default function LandingPage() {
  return (
    <div id="l-main-wrapper">
      <Suspense fallback={<LoadingFallback />}>
        {/* MENGIRIM PROPS UNTUK HEADER DINAMIS */}
        <LandingHeader
          targetPageName="authLogin"
          linkText="Login"
          iconType="login"
        />

        <div className="l-content">
          <HeroSection />
          <ArticleSection />
        </div>

        <LandingFooter />
      </Suspense>
    </div>
  );
}
