import React, { useState, useEffect, Suspense, lazy } from "react";
import LandingHeader from "./component/LandingHeader";
import HeroSection from "./component/HeroSection";
import api from "../../../utils/api/common";
import "./LandingPage.css";

const ServicesSection = lazy(() => import("./component/ServicesSection"));
const StatsSection = lazy(() => import("./component/StatsSection"));
const AboutUsSection = lazy(() => import("./component/AboutUsSection"));
const HowItWorksSection = lazy(() => import("./component/HowItWorksSection"));
const ArticleSection = lazy(() => import("./component/ArticleSection"));
const CallToActionSection = lazy(() => import("./component/CallToActionSection"));
const LandingFooter = lazy(() => import("./component/LandingFooter"));

export default function LandingPage() {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchLandingData = async () => {
      try {
        const [servicesRes, statsRes, aboutRes, contactRes] = await Promise.all([
          api.get("/landing/services", { signal: controller.signal }),
          api.get("/landing/stats", { signal: controller.signal }),
          api.get("/landing/about", { signal: controller.signal }),
          api.get("/landing/contact", { signal: controller.signal }),
        ]);

        setServices(servicesRes.data.data);
        setStats(statsRes.data.data);
        setAbout(aboutRes.data.data);
        setContact(contactRes.data.data);
      } catch (err) {
        if (err.name === "CanceledError" || err.name === "AbortError") return;

        console.error("Error fetching landing data:", err);
        // Fallback data
        setServices([
          { id: 1, title: "Pinjaman Lunak", description: "Pembiayaan sesuai syariah.", icon: "FaHandHoldingUsd", color: "#2F80ED" },
          { id: 2, title: "Pelatihan Usaha", description: "Tingkatkan kapasitas bisnis.", icon: "FaChalkboardTeacher", color: "#00B894" },
        ]);
        setStats({ active_members: 1250, financed_businesses: 850, satisfaction_rate: 98, cities: 25 });
        setAbout({
          title: "Membangun Ekonomi Umat",
          description: "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern.",
          vision: "Menjadi koperasi syariah terpercaya.",
          mission: "Memberdayakan usaha anggota.",
        });
        setContact({ phone: "0812-3456-7890", email: "info@pbs.co.id", address: "Jakarta" });
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
    
    return () => controller.abort();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="pbs-page">
      <LandingHeader />
      <HeroSection />
      <Suspense fallback={<div className="text-center py-5 text-muted">Memuat bagian...</div>}>
        <ServicesSection services={services} />
        <StatsSection stats={stats} />
        <AboutUsSection about={about} />
        <HowItWorksSection />
        <ArticleSection />
        <CallToActionSection />
        <LandingFooter contact={contact} />
      </Suspense>
    </div>
  );
}
