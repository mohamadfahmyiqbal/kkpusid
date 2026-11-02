const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/ServicesSection-CZzNVZpx.js","assets/rolldown-runtime-Cf1989ZW.js","assets/vendor-rpDlma0K.js","assets/vendor-react-D5pUDmay.js","assets/vendor-react-DVtug25g.css","assets/StatsSection-uz66pZUy.js","assets/AboutUsSection-BEzF3SSF.js","assets/HowItWorksSection-CPFw1jBo.js","assets/ArticleSection-5Y6iBlkA.js","assets/SwalAlert-C3kBxD_o.js","assets/UGlobal-MGBt7b3Z.js","assets/common-qX05v8MF.js","assets/CallToActionSection--HNMu3DY.js","assets/index-BaUN0sjk.js","assets/vendor-framer-fx3iiH1e.js","assets/ProfileContext-DQCnAT09.js","assets/UBilling-DLTCHisI.js","assets/UNotification-BqEfIC9t.js","assets/socket-CtRvCIQ2.js","assets/index-38XV6del.css","assets/vendor-bootstrap-in4RVF8B.css","assets/LandingFooter-cVFvZgiB.js"])))=>i.map(i=>d[i]);
import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Qn as FaShieldAlt, _n as FaHandshake, b as Container, d as Navbar_default, f as Nav_default, l as Row, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { a as __vitePreload, s as jwtEncode, t as masjid_default } from "./index-BaUN0sjk.js";
//#region src/pages/global/LandingPage/component/LandingHeader.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var LandingHeader = () => {
	const handleScrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	const handleRegister = () => {
		window.location.href = "/" + jwtEncode({ page: "accountRegisterPage" });
	};
	const handleLogin = () => {
		window.location.href = "/" + jwtEncode({ page: "authLogin" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar_default, {
		expand: "lg",
		fixed: "top",
		variant: "dark",
		className: "pbs-navbar py-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			fluid: true,
			className: "px-3 px-md-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Navbar_default.Brand, {
					className: "text-white d-flex align-items-center gap-2",
					href: "#",
					onClick: (e) => {
						e.preventDefault();
						window.scrollTo({
							top: 0,
							behavior: "smooth"
						});
					},
					style: { fontSize: "14px" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/icons/PUSlogo.png",
						alt: "PUS Logo",
						style: {
							height: "30px",
							width: "auto"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: {
							lineHeight: "1.1",
							fontWeight: "700"
						},
						children: [
							"Paguyuban Usaha",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: "10px",
									fontWeight: "600",
									color: "#00c6a7",
									textTransform: "uppercase",
									letterSpacing: "0.5px"
								},
								children: "Sukses"
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Navbar_default.Toggle, { "aria-controls": "landing-navbar-nav" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Navbar_default.Collapse, {
					id: "landing-navbar-nav",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Nav_default, {
							className: "mx-auto gap-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Link, {
									className: "text-white",
									href: "#",
									onClick: (e) => {
										e.preventDefault();
										window.scrollTo({
											top: 0,
											behavior: "smooth"
										});
									},
									style: {
										fontSize: "13px",
										fontWeight: "500"
									},
									children: "Beranda"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Link, {
									className: "text-white",
									href: "#layanan",
									onClick: (e) => {
										e.preventDefault();
										handleScrollToSection("layanan");
									},
									style: {
										fontSize: "13px",
										fontWeight: "500"
									},
									children: "Layanan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Link, {
									className: "text-white",
									href: "#tentang",
									onClick: (e) => {
										e.preventDefault();
										handleScrollToSection("tentang");
									},
									style: {
										fontSize: "13px",
										fontWeight: "500"
									},
									children: "Tentang Kami"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Link, {
									className: "text-white",
									href: "#cara-kerja",
									onClick: (e) => {
										e.preventDefault();
										handleScrollToSection("cara-kerja");
									},
									style: {
										fontSize: "13px",
										fontWeight: "500"
									},
									children: "Cara Kerja"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Link, {
									className: "text-white",
									href: "#artikel",
									onClick: (e) => {
										e.preventDefault();
										handleScrollToSection("artikel");
									},
									style: {
										fontSize: "13px",
										fontWeight: "500"
									},
									children: "Artikel"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Link, {
									className: "text-white",
									href: "#kontak",
									onClick: (e) => {
										e.preventDefault();
										handleScrollToSection("kontak");
									},
									style: {
										fontSize: "13px",
										fontWeight: "500"
									},
									children: "Kontak"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							className: "rounded-pill px-3 me-2",
							onClick: handleRegister,
							style: {
								fontSize: "12.5px",
								fontWeight: "600",
								padding: "5px 14px"
							},
							children: "Daftar Sekarang"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline-light",
							className: "rounded-pill px-3",
							onClick: handleLogin,
							style: {
								fontSize: "12.5px",
								fontWeight: "600",
								padding: "5px 14px"
							},
							children: "Login"
						})
					]
				})
			]
		})
	});
};
var LandingHeader_default = import_react.memo(LandingHeader);
//#endregion
//#region src/pages/global/LandingPage/component/HeroSection.jsx
var HeroSection = () => {
	const handleScrollToSection = (sectionId) => {
		const element = document.getElementById(sectionId);
		if (element) element.scrollIntoView({ behavior: "smooth" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "pbs-hero",
		id: "beranda",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
			className: "align-items-center gy-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				xs: {
					span: 12,
					order: 2
				},
				lg: {
					span: 6,
					order: 1
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "pbs-badge",
						children: "Koperasi & Layanan Pembiayaan Usaha Syariah"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "pbs-title mt-4",
						children: [
							"Paguyuban Usaha Sukses",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Kekal & Berkah"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "pbs-desc mt-3",
						children: "Jadikan transaksi usaha Anda sesuai syariat Islam, demi keberkahan dunia dan akhirat."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex gap-3 mt-4 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							className: "pbs-btn-main rounded-pill px-4",
							onClick: () => handleScrollToSection("layanan"),
							children: "Lihat Layanan"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline-light",
							className: "rounded-pill px-4",
							onClick: () => handleScrollToSection("tentang"),
							children: "Tentang Kami"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
						className: "mt-5 g-4",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 12,
								sm: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pbs-feature",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Sesuai Syariah" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 12,
								sm: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pbs-feature",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Aman & Terpercaya" })]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
								xs: 12,
								sm: 4,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pbs-feature",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHandshake, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Berkah & Bermanfaat" })]
								})
							})
						]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				xs: {
					span: 12,
					order: 1
				},
				lg: {
					span: 6,
					order: 2
				},
				className: "text-center text-lg-end d-none d-lg-block",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pbs-hero-img-wrapper",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: masjid_default,
						alt: "Hero",
						className: "pbs-hero-img"
					})
				})
			})]
		}) })
	});
};
//#endregion
//#region src/pages/global/LandingPage/LandingPage.jsx
var ServicesSection = (0, import_react.lazy)(() => __vitePreload(() => import("./ServicesSection-CZzNVZpx.js"), __vite__mapDeps([0,1,2,3,4])));
var StatsSection = (0, import_react.lazy)(() => __vitePreload(() => import("./StatsSection-uz66pZUy.js"), __vite__mapDeps([5,1,2,3,4])));
var AboutUsSection = (0, import_react.lazy)(() => __vitePreload(() => import("./AboutUsSection-BEzF3SSF.js"), __vite__mapDeps([6,1,2,3,4])));
var HowItWorksSection = (0, import_react.lazy)(() => __vitePreload(() => import("./HowItWorksSection-CPFw1jBo.js"), __vite__mapDeps([7,1,2,3,4])));
var ArticleSection = (0, import_react.lazy)(() => __vitePreload(() => import("./ArticleSection-5Y6iBlkA.js"), __vite__mapDeps([8,1,2,3,4,9,10,11])));
var CallToActionSection = (0, import_react.lazy)(() => __vitePreload(() => import("./CallToActionSection--HNMu3DY.js"), __vite__mapDeps([12,1,13,2,3,4,14,15,16,11,17,18,19,20])));
var LandingFooter = (0, import_react.lazy)(() => __vitePreload(() => import("./LandingFooter-cVFvZgiB.js"), __vite__mapDeps([21,1,2,3,4])));
function LandingPage() {
	const [services, setServices] = (0, import_react.useState)([]);
	const [stats, setStats] = (0, import_react.useState)(null);
	const [about, setAbout] = (0, import_react.useState)(null);
	const [contact, setContact] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		const fetchLandingData = async () => {
			try {
				const [servicesRes, statsRes, aboutRes, contactRes] = await Promise.all([
					api.get("/landing/services", { signal: controller.signal }),
					api.get("/landing/stats", { signal: controller.signal }),
					api.get("/landing/about", { signal: controller.signal }),
					api.get("/landing/contact", { signal: controller.signal })
				]);
				setServices(servicesRes.data.data);
				setStats(statsRes.data.data);
				setAbout(aboutRes.data.data);
				setContact(contactRes.data.data);
			} catch (err) {
				if (err.name === "CanceledError" || err.name === "AbortError") return;
				console.error("Error fetching landing data:", err);
				setServices([{
					id: 1,
					title: "Pinjaman Lunak",
					description: "Pembiayaan sesuai syariah.",
					icon: "FaHandHoldingUsd",
					color: "#2F80ED"
				}, {
					id: 2,
					title: "Pelatihan Usaha",
					description: "Tingkatkan kapasitas bisnis.",
					icon: "FaChalkboardTeacher",
					color: "#00B894"
				}]);
				setStats({
					active_members: 1250,
					financed_businesses: 850,
					satisfaction_rate: 98,
					cities: 25
				});
				setAbout({
					title: "Membangun Ekonomi Umat",
					description: "Paguyuban Usaha Sukses hadir sebagai wadah koperasi modern.",
					vision: "Menjadi koperasi syariah terpercaya.",
					mission: "Memberdayakan usaha anggota."
				});
				setContact({
					phone: "0812-3456-7890",
					email: "info@pbs.co.id",
					address: "Jakarta"
				});
			} finally {
				setLoading(false);
			}
		};
		fetchLandingData();
		return () => controller.abort();
	}, []);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex justify-content-center align-items-center min-vh-100 bg-light",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "spinner-border text-primary",
			role: "status",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "visually-hidden",
				children: "Loading..."
			})
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pbs-page",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingHeader_default, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroSection, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_react.Suspense, {
				fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-center py-5 text-muted",
					children: "Memuat bagian..."
				}),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ServicesSection, { services }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatsSection, { stats }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutUsSection, { about }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HowItWorksSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CallToActionSection, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LandingFooter, { contact })
				]
			})
		]
	});
}
//#endregion
export { LandingPage as default };
