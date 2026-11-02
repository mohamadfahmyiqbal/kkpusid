import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, Et as FaBook, It as FaChalkboardTeacher, Pr as useNavigate, S as Card_default, a as Tabs, b as Container, c as Spinner, dr as FaTrophy, l as Row, s as Tab_default, vn as FaHeadphones, x as Col } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as TrainingService } from "./training.service-Bgth343V.js";
//#region src/pages/training/TrainingDashboardPage.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/training/TrainingDashboardPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var TrainingDashboardPage = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("kurikulum");
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [kurikulumWajib, setKurikulumWajib] = (0, import_react.useState)([]);
	const [kurikulumReguler, setKurikulumReguler] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		const fetchCurriculums = async () => {
			try {
				setLoading(true);
				const [resWajib, resReguler] = await Promise.all([TrainingService.getCurriculums("WAJIB"), TrainingService.getCurriculums("REGULER")]);
				const mapData = (item) => ({
					id: item.curriculum_id,
					title: item.curriculum_name,
					description: item.description,
					duration: "-",
					modules: item.materials_count || 0,
					completed: item.progress === 100,
					progress: item.progress || 0
				});
				if (resWajib.status) setKurikulumWajib(resWajib.data.map(mapData));
				if (resReguler.status) setKurikulumReguler(resReguler.data.map(mapData));
			} catch (err) {
				setError("Gagal memuat daftar kurikulum");
			} finally {
				setLoading(false);
			}
		};
		fetchCurriculums();
	}, []);
	const handleViewMateri = (0, import_react.useCallback)((kurikulumId, type) => {
		navigate(`/${jwtEncode({
			page: "detailMateri",
			kurikulumId,
			type
		})}`);
	}, [navigate]);
	const handleStartEvaluasi = (0, import_react.useCallback)((kurikulumId, type) => {
		navigate(`/${jwtEncode({
			page: "evaluasi",
			kurikulumId,
			type
		})}`);
	}, [navigate]);
	const handleViewRanking = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "ranking" })}`);
	}, [navigate]);
	const renderKurikulumCard = (item, type) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: `training-card h-100 border-0 shadow-sm transition-all ${item.completed ? "training-card-completed" : ""}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "training-card-header-icon p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "icon-wrapper bg-primary bg-opacity-10 text-primary rounded-3 d-flex align-items-center justify-content-center",
				style: {
					width: "48px",
					height: "48px"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChalkboardTeacher, { size: 24 })
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4 pt-0",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-start mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold text-dark-blue line-clamp-2",
						children: item.title
					}), item.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						bg: "success",
						className: "rounded-pill px-3 py-1",
						children: "Selesai"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted small mb-3 line-clamp-2",
					style: { minHeight: "3em" },
					children: item.description
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex flex-wrap gap-2 mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-1 small text-muted bg-light px-3 py-1 rounded-pill",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBook, { className: "text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [item.modules, " Modul"] })]
					}), item.duration !== "-" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-1 small text-muted bg-light px-3 py-1 rounded-pill",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadphones, { className: "text-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.duration })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "training-progress-section mb-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex justify-content-between mb-1 align-items-end",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "small text-muted fw-bold",
							children: "Progress Belajar"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "small fw-black text-primary",
							children: [item.progress, "%"]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "progress rounded-pill overflow-hidden",
						style: {
							height: "8px",
							background: "#f1f5f9"
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: `progress-bar transition-all ${item.progress === 100 ? "bg-success" : "bg-primary"}`,
							style: { width: `${item.progress}%` }
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex gap-2 mt-auto",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: item.progress > 0 ? "primary" : "outline-primary",
						className: "flex-grow-1 fw-bold rounded-3 py-2 btn-training-action",
						onClick: () => handleViewMateri(item.id, type),
						children: item.progress === 100 ? "Review Materi" : item.progress > 0 ? "Lanjutkan" : "Mulai Belajar"
					}), item.progress >= 80 && !item.completed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "success",
						className: "fw-bold rounded-3 py-2 btn-training-evaluasi px-4",
						onClick: () => handleStartEvaluasi(item.id, type),
						title: "Evaluasi",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrophy, {})
					})]
				})
			]
		})]
	}, item.id);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column justify-content-center align-items-center vh-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted fw-medium",
			children: "Memuat kurikulum training..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		fluid: true,
		className: "px-2 px-md-3 py-3 fade-in",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			xs: 12,
			children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
				variant: "danger",
				className: "mb-4",
				children: error
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
				className: "shadow-sm border-0 mb-4 rounded-4 overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
					className: "p-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
						activeKey: activeTab,
						onSelect: (k) => setActiveTab(k),
						className: "mb-4 custom-training-tabs gap-2 pt-4 px-4",
						variant: "pills",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab_default, {
							eventKey: "kurikulum",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBook, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Kurikulum" })]
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "px-4 pb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
									defaultActiveKey: "wajib",
									id: "kurikulum-sub-tabs",
									className: "mb-4 custom-training-pills gap-2",
									variant: "pills",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tab_default, {
										eventKey: "wajib",
										title: "Kurikulum Wajib",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											className: "g-4 mt-2",
											children: kurikulumWajib.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
												lg: 4,
												md: 6,
												children: renderKurikulumCard(item, "wajib")
											}, item.id))
										}), kurikulumWajib.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center py-5 bg-light rounded-4 text-muted mt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBook, { className: "fs-1 mb-3 text-secondary opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mb-0",
												children: "Tidak ada kurikulum wajib saat ini"
											})]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tab_default, {
										eventKey: "reguler",
										title: "Kurikulum Reguler",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
											className: "g-4 mt-2",
											children: kurikulumReguler.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
												lg: 4,
												md: 6,
												children: renderKurikulumCard(item, "reguler")
											}, item.id))
										}), kurikulumReguler.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "text-center py-5 bg-light rounded-4 text-muted mt-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBook, { className: "fs-1 mb-3 text-secondary opacity-50" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mb-0",
												children: "Tidak ada kurikulum reguler saat ini"
											})]
										})]
									})]
								})
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tab_default, {
							eventKey: "ranking",
							title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrophy, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Peringkat" })]
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center py-5 px-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted mb-3",
										style: { fontSize: "64px" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrophy, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
										className: "fw-bold mb-3",
										children: "Peringkat Peserta"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted mb-4",
										children: "Lihat peringkat Anda dibandingkan dengan peserta lain"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "primary",
										className: "px-5 py-2 fw-bold shadow-sm rounded-pill",
										onClick: handleViewRanking,
										children: "Lihat Peringkat"
									})
								]
							})
						})]
					})
				})
			})]
		}) })
	});
};
//#endregion
export { TrainingDashboardPage as default };
