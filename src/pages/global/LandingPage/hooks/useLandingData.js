import React from "react";
import api from "../../../../utils/api/common";

console.log("DEBUG: useLandingData.js loaded. React:", React);

const useLandingData = () => {
  console.log("DEBUG: useLandingData called. React:", React);
  if (React) {
    console.log("DEBUG: React.useState type:", typeof React.useState);
  }
  
  const [services, setServices] = React.useState([]);
  const [stats, setStats] = React.useState(null);
  const [about, setAbout] = React.useState(null);
  const [contact, setContact] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const [servicesRes, statsRes, aboutRes, contactRes] = await Promise.all(
          [
            api.get("/landing/services"),
            api.get("/landing/stats"),
            api.get("/landing/about"),
            api.get("/landing/contact"),
          ],
        );

        setServices(servicesRes.data.data);
        setStats(statsRes.data.data);
        setAbout(aboutRes.data.data);
        setContact(contactRes.data.data);
      } catch (err) {
        console.error("Error fetching landing data:", err);
        setError(err.message);
        // Set default data on error
        setServices([
          {
            id: 1,
            title: "Pinjaman Lunak",
            description: "Pembiayaan sesuai syariah dengan akad yang amanah.",
            icon: "FaHandHoldingUsd",
            color: "#2F80ED",
            order: 1,
          },
          {
            id: 2,
            title: "Pelatihan Usaha",
            description: "Tingkatkan kapasitas dan keterampilan bisnis Anda.",
            icon: "FaChalkboardTeacher",
            color: "#00B894",
            order: 2,
          },
          {
            id: 3,
            title: "Kemitraan Produk",
            description: "Kerjasama produk berkualitas untuk usaha Anda.",
            icon: "FaHandshake",
            color: "#6FCF97",
            order: 3,
          },
          {
            id: 4,
            title: "Pendampingan Bisnis",
            description: "Kami dampingi hingga usaha Anda berkembang.",
            icon: "FaUsers",
            color: "#BB6BD9",
            order: 4,
          },
        ]);
        setStats({
          active_members: 1250,
          financed_businesses: 850,
          satisfaction_rate: 98,
          cities: 25,
        });
        setAbout({
          title: "Membangun Ekonomi Umat dengan Prinsip Syariah",
          description:
            "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern yang membantu anggota berkembang melalui pembiayaan halal, pelatihan usaha, dan kemitraan berkelanjutan.",
          vision: "Menjadi koperasi syariah terpercaya di Indonesia.",
          mission:
            "Memberdayakan usaha anggota dengan sistem amanah, transparan, and berkelanjutan.",
        });
        setContact({
          phone: "0812-3456-7890",
          email: "info@pbs.co.id",
          address: "Jakarta, Indonesia",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
  }, []);

  return { services, stats, about, contact, loading, error };
};

export default useLandingData;
