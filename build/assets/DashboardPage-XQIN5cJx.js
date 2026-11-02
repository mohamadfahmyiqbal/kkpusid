const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/CandidateStepsCard-2GOPFa9r.js","assets/rolldown-runtime-Cf1989ZW.js","assets/vendor-rpDlma0K.js","assets/vendor-react-D5pUDmay.js","assets/vendor-react-DVtug25g.css","assets/FinancialScrollButtons-DXW_bC2Z.js","assets/FinancialSection-w2eJlQOx.js","assets/index-BaUN0sjk.js","assets/vendor-framer-fx3iiH1e.js","assets/ProfileContext-DQCnAT09.js","assets/UBilling-DLTCHisI.js","assets/common-qX05v8MF.js","assets/UNotification-BqEfIC9t.js","assets/socket-CtRvCIQ2.js","assets/index-38XV6del.css","assets/vendor-bootstrap-in4RVF8B.css","assets/UGlobal-MGBt7b3Z.js","assets/FinancialSection-Bw3bfIfW.css","assets/TagihanSection-h4QGLDrT.js"])))=>i.map(i=>d[i]);
import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { $ as MdOutlineAssignment, A as MdAccountBalance, E as Button, H as MdChevronRight, I as MdBarChart, Kt as FaClipboardList, Mt as FaCalendarAlt, Or as FaWallet, Ot as FaBriefcase, P as MdArticle, Pr as useNavigate, Q as MdMenuBook, Qn as FaShieldAlt, S as Card_default, U as MdCollectionsBookmark, Wt as FaChevronRight, Y as MdHistory, Yt as FaComments, b as Container, c as Spinner, hr as FaUser, k as MdAccessTime, l as Row, mr as FaUpload, mt as MdShoppingCart, ot as MdPlayArrow, q as MdGroup, ut as MdSchool, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { a as __vitePreload, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as getSafeDisplayName } from "./sanitization-Pu2qiHfl.js";
import { t as useRegistrationStatus } from "./useRegistrationStatus-DtKOk69r.js";
import { n as TRAINING_DATA, t as ARTICLE_DATA } from "./dashboardData-DBz-4ArF.js";
//#region src/features/dashboard/constants/roles.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var ROLE_IDS = {
	CALON_ANGGOTA: "1",
	PENGAWAS: "2",
	KETUA: "3",
	BENDAHARA: "4",
	ANGGOTA_PENUH: "5",
	ANGGOTA_PENUH_ALB: "6"
};
ROLE_IDS.CALON_ANGGOTA, ROLE_IDS.PENGAWAS, ROLE_IDS.KETUA, ROLE_IDS.BENDAHARA, ROLE_IDS.ANGGOTA_PENUH, ROLE_IDS.ANGGOTA_PENUH_ALB;
var isCandidate = (roleId) => roleId === ROLE_IDS.CALON_ANGGOTA;
var isFullMember = (roleId) => roleId === ROLE_IDS.ANGGOTA_PENUH || roleId === ROLE_IDS.ANGGOTA_PENUH_ALB;
var isALB = (roleId) => roleId === ROLE_IDS.ANGGOTA_PENUH_ALB;
var isPengawas = (roleId) => roleId === ROLE_IDS.PENGAWAS;
var isKetua = (roleId) => roleId === ROLE_IDS.KETUA;
var isBendahara = (roleId) => roleId === ROLE_IDS.BENDAHARA;
//#endregion
//#region src/features/dashboard/hooks/useDashboardRole.js
var MAX_CACHE_SIZE = 50;
var roleCache = /* @__PURE__ */ new Map();
var manageCacheSize = () => {
	if (roleCache.size > MAX_CACHE_SIZE) {
		const firstKey = roleCache.keys().next().value;
		roleCache.delete(firstKey);
	}
};
var getRoleConfig = (statusId) => {
	const roleId = String(statusId);
	return {
		roleId,
		isCandidate: isCandidate(roleId),
		isFullMember: isFullMember(roleId),
		isALB: isALB(roleId),
		isPengawas: isPengawas(roleId),
		isKetua: isKetua(roleId),
		isBendahara: isBendahara(roleId)
	};
};
var useDashboardRole = (userData) => {
	return (0, import_react.useMemo)(() => {
		if (!userData) return null;
		const cacheKey = userData.status_id;
		if (roleCache.has(cacheKey)) return roleCache.get(cacheKey);
		const roleConfig = getRoleConfig(userData.status_id);
		manageCacheSize();
		roleCache.set(cacheKey, roleConfig);
		return roleConfig;
	}, [userData]);
};
//#endregion
//#region src/features/dashboard/components/DashboardSkeleton.jsx
var import_jsx_runtime = require_jsx_runtime();
var DashboardSkeleton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-fluid pb-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "placeholder-glow",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "placeholder col-6 mb-2",
						style: { height: "2rem" }
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "placeholder col-4 mb-3",
						style: { height: "1.5rem" }
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card border-0 shadow-sm mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-body",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "placeholder-glow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder col-12 mb-3",
								style: { height: "1.5rem" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder col-8 mb-2",
								style: { height: "1rem" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder col-10 mb-3",
								style: { height: "1rem" }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder col-6",
								style: { height: "2.5rem" }
							})
						]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "card border-0 shadow-sm mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "card-body p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "placeholder me-2",
							style: {
								width: "1rem",
								height: "1rem"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "placeholder-glow flex-grow-1",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder col-12",
								style: { height: "1.2rem" }
							})
						})]
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row g-4 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-lg-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card border-0 shadow-sm mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder-glow mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "placeholder col-4",
									style: { height: "1.5rem" }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "row g-3",
								children: [
									1,
									2,
									3,
									4
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-md-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "placeholder-glow",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "placeholder col-8 mb-2",
											style: { height: "0.8rem" }
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "placeholder col-6",
											style: { height: "1.5rem" }
										})]
									})
								}, i))
							})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card border-0 shadow-sm mb-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder-glow mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "placeholder col-6",
									style: { height: "1.5rem" }
								})
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "row g-3",
								children: [
									1,
									2,
									3,
									4,
									5,
									6
								].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "col-md-4 col-6",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "placeholder-glow",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "placeholder",
											style: { height: "4rem" }
										})
									})
								}, i))
							})]
						})
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "col-lg-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "card border-0 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "card-body",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "placeholder-glow mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "placeholder col-8",
									style: { height: "1.5rem" }
								})
							}), [
								1,
								2,
								3
							].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "placeholder-glow",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "placeholder col-12 mb-2",
											style: { height: "2rem" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "placeholder col-10 mb-1",
											style: { height: "0.8rem" }
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "placeholder col-8",
											style: { height: "0.8rem" }
										})
									]
								})
							}, i))]
						})
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center py-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					animation: "border",
					variant: "primary",
					size: "sm"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "d-block mt-2 text-muted",
					children: "Memuat dashboard..."
				})]
			})
		]
	});
};
//#endregion
//#region src/features/dashboard/components/DateTimeCard.jsx
/**
* Standalone component to isolate clock state and prevent full Dashboard page re-renders.
*/
var DateTimeCard = () => {
	const [currentTime, setCurrentTime] = (0, import_react.useState)(/* @__PURE__ */ new Date());
	(0, import_react.useEffect)(() => {
		const timer = setInterval(() => {
			setCurrentTime(/* @__PURE__ */ new Date());
		}, 1e3);
		return () => clearInterval(timer);
	}, []);
	const formatDate = (date) => {
		return date.toLocaleDateString("id-ID", {
			weekday: "long",
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	};
	const formatTime = (date) => {
		return date.toLocaleTimeString("id-ID", {
			hour: "2-digit",
			minute: "2-digit",
			second: "2-digit",
			hour12: false
		}) + " WIB";
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "dc-date-card border-0",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "d-flex align-items-center gap-3 p-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1",
				children: formatDate(currentTime)
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: formatTime(currentTime) })] })]
		})
	});
};
var DateTimeCard_default = import_react.memo(DateTimeCard);
//#endregion
//#region src/features/dashboard/components/MainMenuSection.jsx
/**
* Konfigurasi item menu dengan warna dan gradasi yang unik
*/
var MENU_ITEMS = [
	{
		id: "simpanan",
		label: "Simpanan",
		icon: FaWallet,
		pageKey: "simpananPage",
		gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
		shadow: "rgba(16, 185, 129, 0.2)"
	},
	{
		id: "program",
		label: "Program",
		icon: MdGroup,
		pageKey: "programPage",
		gradient: "linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)",
		shadow: "rgba(139, 92, 246, 0.2)"
	},
	{
		id: "tabungan",
		label: "Tabungan",
		icon: MdAccountBalance,
		pageKey: "tabunganPage",
		gradient: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
		shadow: "rgba(245, 158, 11, 0.2)"
	},
	{
		id: "investasi",
		label: "Investasi",
		icon: MdBarChart,
		pageKey: "investasiPage",
		gradient: "linear-gradient(135deg, #ec4899 0%, #db2777 100%)",
		shadow: "rgba(236, 72, 153, 0.2)"
	},
	{
		id: "training",
		label: "Training",
		icon: MdSchool,
		pageKey: "trainingPage",
		gradient: "linear-gradient(135deg, #06b6d4 0%, #0891b2 100%)",
		shadow: "rgba(6, 182, 212, 0.2)"
	},
	{
		id: "jual-beli",
		label: "Jual Beli",
		icon: MdShoppingCart,
		pageKey: "jualBeliPage",
		gradient: "linear-gradient(135deg, #f97316 0%, #ea580c 100%)",
		shadow: "rgba(249, 115, 22, 0.2)"
	},
	{
		id: "transaksi",
		label: "Riwayat",
		icon: MdHistory,
		pageKey: "billingPage",
		gradient: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
		shadow: "rgba(59, 130, 246, 0.2)"
	}
];
var MainMenuSection = import_react.memo(({ isALB, isCandidate }) => {
	const navigate = useNavigate();
	const handleNavigation = (0, import_react.useCallback)((pageKey) => {
		if (!pageKey || isCandidate) return;
		navigate(`/${jwtEncode({ page: pageKey })}`);
	}, [navigate, isCandidate]);
	const filteredMenu = (0, import_react.useMemo)(() => {
		return MENU_ITEMS.filter((item) => {
			if (isALB) return ![
				"transaksi",
				"program",
				"investasi"
			].includes(item.id);
			return true;
		});
	}, [isALB]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 dc-main-menu-section animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex align-items-center justify-content-between mb-3 px-1",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0",
				style: {
					fontSize: "1rem",
					color: "#1e293b"
				},
				children: "Menu Utama"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dc-menu-grid",
			children: filteredMenu.map((item) => {
				const Icon = item.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: `dc-menu-item ${isCandidate ? "is-disabled" : ""}`,
					onClick: () => handleNavigation(item.pageKey),
					disabled: isCandidate,
					"aria-label": `Buka menu ${item.label}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-menu-icon-wrapper",
						style: {
							background: item.gradient,
							boxShadow: `0 8px 16px ${item.shadow}`
						},
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "dc-menu-label",
						children: item.label
					})]
				}, item.id);
			})
		})]
	});
});
//#endregion
//#region src/features/dashboard/components/TrainingCardSection.jsx
/**
* Komponen kartu pelatihan individu
*/
var TrainingItem = import_react.memo(({ item, onViewMateri, onStartEvaluasi }) => {
	const isWajib = item.label === "Program Wajib";
	const statusConfig = (0, import_react.useMemo)(() => {
		switch (item.status) {
			case "Aktif": return {
				bg: "#dcfce7",
				color: "#15803d",
				label: "Tersedia"
			};
			case "Selesai": return {
				bg: "#dbeafe",
				color: "#1e40af",
				label: "Selesai"
			};
			default: return {
				bg: "#f1f5f9",
				color: "#475569",
				label: "Belum Mulai"
			};
		}
	}, [item.status]);
	const handleViewMateri = (0, import_react.useCallback)(() => {
		onViewMateri(item.id, item.type);
	}, [
		item.id,
		item.type,
		onViewMateri
	]);
	const handleStartEvaluasi = (0, import_react.useCallback)(() => {
		onStartEvaluasi(item.id, item.type);
	}, [
		item.id,
		item.type,
		onStartEvaluasi
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dc-train-card-wrapper h-100",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
			className: "dc-train-card-v2 h-100 border-0 shadow-sm",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
				className: "p-4 d-flex flex-column",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex justify-content-between align-items-center mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `dc-badge-program ${isWajib ? "wajib" : "pilihan"}`,
							children: item.label
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "dc-status-pill",
							style: {
								backgroundColor: statusConfig.bg,
								color: statusConfig.color
							},
							children: statusConfig.label
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-grow-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "dc-train-code d-flex align-items-center gap-1 mb-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdOutlineAssignment, {
									size: 14,
									className: "opacity-50"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.code })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
								className: "dc-train-title mb-3",
								children: item.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-center gap-3 mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dc-meta-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdMenuBook, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "1 Materi" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dc-meta-info",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccessTime, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "15 Soal" })]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-grid gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "outline-primary",
							className: "dc-btn-secondary d-flex align-items-center justify-content-center gap-2",
							onClick: handleViewMateri,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdMenuBook, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Baca Materi" })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							variant: "primary",
							className: "dc-btn-primary d-flex align-items-center justify-content-center gap-2",
							onClick: handleStartEvaluasi,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPlayArrow, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Mulai Evaluasi" })]
						})]
					})
				]
			})
		})
	});
});
var TrainingCardSection = ({ trainingData, onSeeAll, onViewMateri, onStartEvaluasi }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 dc-training-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center justify-content-between mb-3 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dc-section-icon bg-primary bg-opacity-10 text-primary",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdSchool, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-0",
					style: {
						fontSize: "1rem",
						color: "#1e293b"
					},
					children: "Evaluasi (Training)"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "link",
				className: "p-0 text-decoration-none fw-bold d-flex align-items-center",
				style: { fontSize: "13px" },
				onClick: onSeeAll,
				children: ["Lihat Semua ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdChevronRight, { size: 18 })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-4",
			children: trainingData.slice(0, 2).map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				xs: 12,
				md: 6,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingItem, {
					item,
					onViewMateri,
					onStartEvaluasi
				})
			}, item.code))
		})]
	});
};
var TrainingCardSection_default = import_react.memo(TrainingCardSection);
//#endregion
//#region src/features/dashboard/components/ArticleCardSection.jsx
/**
* Mapping gradasi untuk thumbnail artikel agar variatif
*/
var gradients = [
	"linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
	"linear-gradient(135deg, #34d399 0%, #10b981 100%)",
	"linear-gradient(135deg, #f472b6 0%, #db2777 100%)"
];
var ArticleItem = import_react.memo(({ item, index, onReadArticle }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dc-article-row-v2",
		onClick: (0, import_react.useCallback)(() => {
			if (onReadArticle) onReadArticle(item.id);
		}, [item.id, onReadArticle]),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "dc-article-thumb",
			style: { background: gradients[index % gradients.length] },
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdArticle, {
				size: 28,
				color: "white"
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dc-article-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "d-flex justify-content-between align-items-start mb-1",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "dc-article-title mb-0",
						children: item.title
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "dc-article-desc mb-2 text-muted",
					children: item.desc
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-article-meta d-flex align-items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccessTime, {
							size: 14,
							className: "opacity-50"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.date })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "dc-read-more",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Baca Selengkapnya" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdChevronRight, { size: 16 })]
					})]
				})
			]
		})]
	});
});
/**
* Komponen kartu artikel terbaru
*/
var ArticleCardSection = ({ articleData, onSeeAll, onReadArticle }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mb-4 dc-article-section",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center justify-content-between mb-3 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "dc-section-icon bg-success bg-opacity-10 text-success",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdCollectionsBookmark, { size: 20 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
					className: "fw-bold mb-0",
					style: {
						fontSize: "1rem",
						color: "#1e293b"
					},
					children: "Artikel Terbaru"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "link",
				className: "p-0 text-decoration-none fw-bold d-flex align-items-center",
				style: { fontSize: "13px" },
				onClick: onSeeAll,
				children: ["Lihat Semua ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdChevronRight, { size: 18 })]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
			className: "border-0 shadow-sm dc-card-modern overflow-hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
				className: "p-0",
				children: articleData.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleItem, {
					item,
					index: i,
					onReadArticle
				}, item.id ?? i))
			})
		})]
	});
};
var ArticleCardSection_default = import_react.memo(ArticleCardSection);
//#endregion
//#region src/features/dashboard/components/NextStepsCard.jsx
var NextStepsCard = ({ nextSteps, onNavigate }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "mb-4 border-0 shadow-sm dc-card-modern",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
				className: "fw-bold mb-4 text-dark",
				children: "Langkah Selanjutnya"
			}), nextSteps.map((item, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "dc-next-row",
				onClick: () => onNavigate(item.pageKey, item.link),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dc-next-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "dc-next-icon",
						children: item.icon
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: item.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.desc })] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, {
					className: "text-muted",
					size: 14
				})]
			}, i))]
		})
	});
};
var NextStepsCard_default = import_react.memo(NextStepsCard);
//#endregion
//#region src/features/dashboard/page/DashboardPage.jsx
var CandidateStepsCard = import_react.lazy(() => __vitePreload(() => import("./CandidateStepsCard-2GOPFa9r.js"), __vite__mapDeps([0,1,2,3,4,5])));
var FinancialSection = import_react.lazy(() => __vitePreload(() => import("./FinancialSection-w2eJlQOx.js"), __vite__mapDeps([6,1,7,2,3,4,8,9,10,11,12,13,14,15,5,16,17])));
var TagihanSection = import_react.lazy(() => __vitePreload(() => import("./TagihanSection-h4QGLDrT.js"), __vite__mapDeps([18,1,7,2,3,4,8,9,10,11,12,13,14,15,5])));
var CS_WHATSAPP_LINK = "https://wa.me/6281234567890";
function DashboardPage() {
	const navigate = useNavigate();
	const { userData, loading: profileLoading, error: profileError } = useProfile();
	const roleConfigs = useDashboardRole(userData);
	const { isRegistered, registrationData, loading: registrationLoading } = useRegistrationStatus();
	const isCandidate = roleConfigs?.isCandidate ?? true;
	const isALB = roleConfigs?.isALB ?? false;
	const safeGreetingName = (0, import_react.useMemo)(() => {
		if (!userData?.full_name) return userData?.email?.split("@")[0] || "Anggota";
		return getSafeDisplayName(userData.full_name);
	}, [userData]);
	const steps = (0, import_react.useMemo)(() => {
		const isApproved = (registrationData?.final_status || "PENDING") === "APPROVED";
		return [
			{
				no: 1,
				title: "Buat Akun",
				desc: "Selesai",
				status: "done",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, {})
			},
			{
				no: 2,
				title: "Daftar Menjadi Anggota",
				desc: isRegistered ? "Selesai" : "Belum Lengkap",
				status: isRegistered ? "done" : "active",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardList, {})
			},
			{
				no: 3,
				title: "Approval",
				desc: isApproved ? "Disetujui" : isRegistered ? "Proses Verifikasi" : "Menunggu",
				status: isApproved ? "done" : isRegistered ? "active" : "pending",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, {})
			},
			{
				no: 4,
				title: "Menjadi Anggota Koperasi",
				desc: isApproved ? "Selesai" : "Menunggu",
				status: isApproved ? "done" : "pending",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, {})
			}
		];
	}, [isRegistered, registrationData?.final_status]);
	const nextSteps = (0, import_react.useMemo)(() => [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClipboardList, {}),
			title: "Lengkapi Data Usaha",
			desc: "Isi informasi detail usaha Anda",
			pageKey: isCandidate ? "registrationFormDetail" : "accountPage"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUpload, {}),
			title: "Unggah Dokumen",
			desc: "Upload KTP, NPWP dan lainnya",
			pageKey: isCandidate ? "registrationFormDetail" : "accountPage"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, {}),
			title: "Ajukan Pembiayaan",
			desc: "Ajukan pembiayaan sesuai kebutuhan",
			pageKey: isCandidate ? "registrationPage" : "formPengajuanTransaksi"
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaComments, {}),
			title: "Konsultasi Dengan Kami",
			desc: "Tim kami siap membantu Anda",
			link: CS_WHATSAPP_LINK
		}
	], [isCandidate]);
	const navigateToPage = (0, import_react.useCallback)((pageData) => {
		if (!pageData) return;
		const payload = typeof pageData === "string" ? { page: pageData } : pageData;
		try {
			navigate(`/${jwtEncode(payload)}`);
		} catch {
			navigate(`/${payload.page}`);
		}
	}, [navigate]);
	const handleContactCS = (0, import_react.useCallback)(() => {
		window.open(CS_WHATSAPP_LINK, "_blank", "noopener,noreferrer");
	}, []);
	const handleStepNavigation = (0, import_react.useCallback)((pageKey, link) => {
		if (link) {
			window.open(link, "_blank", "noopener,noreferrer");
			return;
		}
		navigateToPage(pageKey);
	}, [navigateToPage]);
	const handleTrainingNavigation = (0, import_react.useCallback)(() => navigateToPage("trainingPage"), [navigateToPage]);
	const handleViewMateri = (0, import_react.useCallback)((id, type) => {
		navigate(`/${jwtEncode({
			page: "trainingMateri",
			id,
			type,
			return: "dashboard"
		})}`);
	}, [navigate]);
	const handleReadArticle = (0, import_react.useCallback)((id) => {
		navigate(`/${jwtEncode({
			page: "articleDetail",
			id,
			return: "dashboard"
		})}`);
	}, [navigate]);
	const handleStartEvaluasi = (0, import_react.useCallback)((kurikulumId, type) => navigateToPage({
		page: "evaluasi",
		kurikulumId,
		type
	}), [navigateToPage]);
	if (profileLoading || isCandidate && registrationLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {});
	if (!profileLoading && (!userData || profileError)) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "dc-page-container d-flex justify-content-center align-items-center",
		style: { minHeight: "100vh" },
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
			className: "text-center p-4 border-0 shadow-sm dc-support-box",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
					className: "mb-3",
					children: "Gagal Memuat Data"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-muted mb-4",
					children: "Maaf, kami mengalami kendala saat memuat data profil Anda. Silakan coba lagi."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					onClick: () => window.location.reload(),
					children: "Muat Ulang Halaman"
				})
			] })
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dc-page-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			fluid: true,
			className: "px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-4 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					lg: 8,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "dc-hero border-0 h-100",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
									"Assalamu'alaikum, ",
									safeGreetingName,
									"!"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Selamat datang di Paguyuban Usaha Sukses." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: isCandidate ? "Lengkapi data dan mulai perjalanan usaha bersama kami." : "Kelola tabungan, pembiayaan, dan ikuti kurikulum usaha syariah secara mandiri." })
							]
						})
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 12,
					lg: 4,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DateTimeCard_default, {})
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "g-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xs: 12,
					lg: 8,
					children: [
						isCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {})
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CandidateStepsCard, {
								steps,
								onNavigate: handleStepNavigation
							})
						}),
						!isCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {})
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialSection, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MainMenuSection, {
							isALB,
							isCandidate
						}),
						!isCandidate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_react.Suspense, {
							fallback: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mb-4",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DashboardSkeleton, {})
							}),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TagihanSection, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrainingCardSection_default, {
							trainingData: TRAINING_DATA,
							onSeeAll: handleTrainingNavigation,
							onViewMateri: handleViewMateri,
							onStartEvaluasi: handleStartEvaluasi
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleCardSection_default, {
							articleData: ARTICLE_DATA,
							onSeeAll: handleTrainingNavigation,
							onReadArticle: handleReadArticle
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xs: 12,
					lg: 4,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NextStepsCard_default, {
						nextSteps,
						onNavigate: handleStepNavigation
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "dc-support-box border-0",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "dc-support-content p-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Butuh Bantuan?" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tim kami siap membantu Anda dalam setiap langkah perjalanan usaha Anda." }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "primary",
									onClick: handleContactCS,
									children: "Hubungi Kami"
								})
							]
						})
					})]
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "dc-safe-bar",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Aman & Terpercaya" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data Anda aman bersama kami dan semua transaksi sesuai prinsip syariah." })
			]
		})]
	});
}
//#endregion
export { DashboardPage as default };
