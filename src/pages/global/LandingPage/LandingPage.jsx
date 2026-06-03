import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import LandingHeader from "./component/LandingHeader";
import HeroSection from "./component/HeroSection";
import ServicesSection from "./component/ServicesSection";
import StatsSection from "./component/StatsSection";
import AboutUsSection from "./component/AboutUsSection";
import HowItWorksSection from "./component/HowItWorksSection";
import ArticleSection from "./component/ArticleSection";
import CallToActionSection from "./component/CallToActionSection";
import LandingFooter from "./component/LandingFooter";
import api from "../../../utils/api/common";
import "./LandingPage.css";

export default function LandingPage() {
  const [services, setServices] = useState([]);
  const [stats, setStats] = useState(null);
  const [about, setAbout] = useState(null);
  const [contact, setContact] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [servicesRes, statsRes, aboutRes, contactRes] = await Promise.all([
          api.get("/landing/services"),
          api.get("/landing/stats"),
          api.get("/landing/about"),
          api.get("/landing/contact"),
        ]);

        setServices(servicesRes.data.data);
        setStats(statsRes.data.data);
        setAbout(aboutRes.data.data);
        setContact(contactRes.data.data);
      } catch (err) {
        console.error("Error fetching landing data:", err);
        setError(err.message);
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
      <ServicesSection services={services} />
      <StatsSection stats={stats} />
      <AboutUsSection about={about} />
      <HowItWorksSection />
      <ArticleSection />
      <CallToActionSection />
      <LandingFooter contact={contact} />
    </div>
  );
}
