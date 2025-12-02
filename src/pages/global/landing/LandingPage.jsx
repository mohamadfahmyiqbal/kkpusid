// pages/global/landing/LandingPage.jsx
import React from "react";
import LandingHeader from "./component/LandingHeader";
import HeroSection from "./component/HeroSection";
import ArticleSection from "./component/ArticleSection";
import LandingFooter from "./component/LandingFooter";

export default function LandingPage() {
  return (
    <div id="l-main-wrapper">
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
    </div>
  );
}
