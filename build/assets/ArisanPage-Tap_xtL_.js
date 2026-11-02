import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, mt as require_prop_types } from "./vendor-rpDlma0K.js";
import { A as MdAccountBalance, D as Badge, E as Button, H as MdChevronRight, K as MdEvent, Kn as FaRedo, O as Alert_default, Pr as useNavigate, S as Card_default, Vn as FaPlusCircle, _t as MdTrackChanges, b as Container, l as Row, nt as MdPayments, o as Table, q as MdGroup, rt as MdPeople, x as Col, yt as MdVisibility } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as ProgramAccountCard } from "./ProgramAccountCard-lPfJAzIt.js";
import { n as getApiUrl } from "./arisanHelpers-Dxoh5B_0.js";
//#region src/pages/program/arisan/components/ArisanProgramTabs.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_prop_types = /* @__PURE__ */ __toESM(require_prop_types());
var import_jsx_runtime = require_jsx_runtime();
var PROGRAM_OPTIONS = [{
	label: "Pinjaman Lunak",
	key: "pinjaman",
	icon: MdAccountBalance
}, {
	label: "Arisan",
	key: "arisan",
	icon: MdGroup
}];
function ArisanProgramTabs({ activeTab, onTabChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "arisan-tabs-container mb-4 px-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 arisan-scroll-hide",
			children: PROGRAM_OPTIONS.map((opt) => {
				const isActive = activeTab === opt.key;
				const IconComponent = opt.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onTabChange(opt.key),
					className: `arisan-tab-btn ${isActive ? "active" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconComponent, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.label })]
				}, opt.key);
			})
		})
	});
}
ArisanProgramTabs.propTypes = {
	activeTab: import_prop_types.default.string.isRequired,
	onTabChange: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/pages/program/arisan/components/ArisanSkeleton.jsx
function ArisanSkeleton() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
		className: "g-3",
		children: [
			1,
			2,
			3
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			md: 6,
			lg: 6,
			xl: 4,
			className: "mb-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "arisan-skeleton-card arisan-skeleton",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex justify-content-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arisan-skeleton",
							style: {
								width: "60px",
								height: "16px"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arisan-skeleton",
							style: {
								width: "80px",
								height: "20px",
								borderRadius: "12px"
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "my-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arisan-skeleton mb-2",
							style: {
								width: "80%",
								height: "24px"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arisan-skeleton",
							style: {
								width: "50%",
								height: "16px"
							}
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid gap-3",
						style: {
							display: "grid",
							gridTemplateColumns: "1fr 1fr",
							gap: "10px"
						},
						children: [
							1,
							2,
							3,
							4
						].map((j) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "arisan-skeleton",
							style: {
								height: "40px",
								borderRadius: "8px"
							}
						}, j))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 arisan-skeleton",
						style: {
							height: "40px",
							borderRadius: "20px"
						}
					})
				]
			})
		}, i))
	});
}
//#endregion
//#region src/components/program/AvailableArisanList.jsx
var formatCurrency = (amount) => {
	return new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(amount || 0);
};
/**
* Komponen untuk menampilkan daftar Arisan yang tersedia untuk diikuti.
*/
function AvailableArisanList({ availableArisan = [], onJoinClick }) {
	if (!availableArisan || availableArisan.length === 0) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "animate-fade-in",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex align-items-center gap-2 mb-3 px-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTrackChanges, {
				size: 20,
				className: "text-teal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold mb-0 text-muted font-outfit",
				style: { letterSpacing: "0.2px" },
				children: "Pilih Arisan yang Tersedia"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3",
			children: availableArisan.map((arisan, idx) => {
				const programName = arisan.program_name || arisan.title || "-";
				const batchName = arisan.batch_name || arisan.batch || "-";
				const currentPeserta = arisan.participant_count ?? (arisan.peserta ? parseInt(arisan.peserta.split("/")[0]) : 0);
				const maxPeserta = arisan.max_participants ?? (arisan.peserta ? parseInt(arisan.peserta.split("/")[1]) : 1);
				const isFull = arisan.status === "full" || currentPeserta >= maxPeserta;
				const fillPercentage = maxPeserta > 0 ? Math.min(100, Math.round(currentPeserta / maxPeserta * 100)) : 0;
				const targetValue = arisan.target_amount ?? arisan.target ?? 0;
				const contributionValue = arisan.monthly_contribution ?? arisan.setoran ?? 0;
				const displayPeriod = arisan.start_date ? isNaN(new Date(arisan.start_date).getTime()) ? arisan.start_date : new Date(arisan.start_date).toLocaleDateString("id-ID", {
					month: "short",
					year: "numeric"
				}) : arisan.periode || "-";
				const participantsDisplay = arisan.peserta || `${currentPeserta}/${maxPeserta} Peserta`;
				const displayTarget = typeof targetValue === "string" ? targetValue : formatCurrency(targetValue);
				const displayContribution = typeof contributionValue === "string" ? contributionValue : `${formatCurrency(contributionValue)}/bln`;
				const displayTerm = arisan.cooperation_months ? `${arisan.cooperation_months} Bulan` : "-";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					md: 6,
					lg: 6,
					xl: 4,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "dc-arisan-card border-0 shadow-sm h-100 overflow-hidden font-outfit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "dc-arisan-card-header px-4 py-3 text-white d-flex justify-content-between align-items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "small fw-bold text-uppercase opacity-75",
								style: {
									letterSpacing: "1px",
									fontSize: "10px"
								},
								children: ["Batch ", batchName]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: isFull ? "danger" : "success",
								className: `premium-status-badge border-0 ${isFull ? "status-full" : "status-available"}`,
								children: isFull ? "Penuh" : "Tersedia"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 d-flex flex-column justify-content-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
									className: "fw-bold mb-3 text-dark font-outfit",
									style: { fontSize: "1.1rem" },
									children: programName
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dc-arisan-grid mb-4",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dc-arisan-info-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPeople, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Peserta" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: participantsDisplay })] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dc-arisan-info-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTrackChanges, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Target" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: displayTarget })] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dc-arisan-info-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPayments, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Setoran" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: displayContribution })] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dc-arisan-info-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdEvent, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Durasi" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: displayTerm })] })]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "dc-arisan-info-item",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdEvent, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Mulai/Periode" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: displayPeriod })] })]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "arisan-progress-section mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex justify-content-between align-items-center mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-muted fw-bold",
											style: { fontSize: "10.5px" },
											children: "Keterisian Batch"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-teal fw-bold",
											style: { fontSize: "10.5px" },
											children: [fillPercentage, "%"]
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "progress-bar-track",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "progress-bar-fill",
											style: { width: `${fillPercentage}%` }
										})
									})]
								})
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								variant: isFull ? "outline-secondary" : "primary",
								className: `w-100 fw-bold rounded-pill py-2 d-flex align-items-center justify-content-center gap-2 shadow-sm border-0 ${isFull ? "arisan-btn-full" : "premium-btn-hover arisan-btn-join"}`,
								disabled: isFull,
								style: !isFull ? {
									background: "linear-gradient(135deg, #0d9488 0%, #0f766e 100%)",
									transition: "all 0.2s"
								} : {},
								onClick: () => onJoinClick && onJoinClick(arisan),
								children: isFull ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdPeople, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Penuh" })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Gabung Arisan" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdChevronRight, { size: 18 })] })
							})]
						})]
					})
				}, arisan.arisan_id || arisan.id || idx);
			})
		})]
	});
}
//#endregion
//#region src/pages/program/arisan/components/ArisanEmptyState.jsx
function ArisanEmptyState({ onCreate, canCreate }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert_default, {
		variant: "light",
		className: "text-center py-5 border-0 bg-light rounded-4 font-outfit",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mb-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-white rounded-circle mx-auto d-flex align-items-center justify-content-center shadow-sm arisan-empty-icon-container",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdGroup, {
						size: 32,
						className: "text-muted"
					})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
				className: "fw-bold text-dark",
				children: "Belum Ada Arisan Tersedia"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-muted small mb-3",
				children: ["Saat ini tidak ada grup arisan yang terbuka.", canCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}), "Anda bisa membuat arisan baru untuk memulai."] })]
			}),
			canCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "primary",
				className: "rounded-pill px-4",
				onClick: onCreate,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlusCircle, { className: "me-2" }), "Buat Arisan Baru"]
			})
		]
	});
}
ArisanEmptyState.propTypes = {
	onCreate: import_prop_types.default.func.isRequired,
	canCreate: import_prop_types.default.bool.isRequired
};
//#endregion
//#region src/pages/program/arisan/components/AvailableArisanSection.jsx
function AvailableArisanSection({ availableArisans, error, canCreate, onRetry, onJoinClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert_default, {
			variant: "warning",
			className: "d-flex align-items-center justify-content-between mb-4 rounded-3 border-0 bg-warning bg-opacity-10 text-warning",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "small",
				children: error
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "link",
				className: "p-0 text-warning text-decoration-none d-flex align-items-center",
				onClick: onRetry,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaRedo, {
					className: "me-1",
					size: 12
				}), " Coba Lagi"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "d-flex justify-content-between align-items-center mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
				className: "fw-bold text-dark mb-1 font-outfit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdGroup, {
					className: "me-2 text-primary",
					size: 22
				}), "Arisan Tersedia"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted small mb-0",
				children: "Pilih grup arisan yang sesuai dengan kebutuhan Anda"
			})] }), canCreate && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline-primary",
				size: "sm",
				className: "d-none d-md-flex align-items-center rounded-pill px-3",
				onClick: () => onJoinClick("new"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlusCircle, { className: "me-2" }), "Buat Arisan Baru"]
			})]
		}),
		availableArisans.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanEmptyState, {
			onCreate: () => onJoinClick("new"),
			canCreate
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvailableArisanList, {
			availableArisan: availableArisans,
			onJoinClick: (item) => onJoinClick(item.arisan_id || item.id)
		})
	] });
}
AvailableArisanSection.propTypes = {
	availableArisans: import_prop_types.default.arrayOf(import_prop_types.default.object).isRequired,
	error: import_prop_types.default.string,
	canCreate: import_prop_types.default.bool.isRequired,
	onRetry: import_prop_types.default.func.isRequired,
	onJoinClick: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/pages/program/arisan/components/ArisanHistoryTable.jsx
function ArisanHistoryTable({ historyArisan, onDetailClick }) {
	if (!historyArisan) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex justify-content-between align-items-center mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
				className: "fw-bold text-dark mb-1 font-outfit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdTrackChanges, {
					className: "me-2 text-primary",
					size: 22
				}), "Riwayat Arisan"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted small mb-0",
				children: "Riwayat keikutsertaan arisan Anda yang telah lunas"
			})] })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "table-responsive",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				hover: true,
				className: "align-middle bg-white rounded-3 overflow-hidden shadow-sm text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "bg-light",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nama Program" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "No. Peserta / Akad" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tanggal Buka" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Total Saldo" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "text-center",
							children: "Aksi"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
						className: "fw-medium",
						children: [
							historyArisan.program_name,
							" (",
							historyArisan.batch_name,
							")"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: ["No. Peserta: ", historyArisan.participant_no || "-"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: historyArisan.created_at ? new Date(historyArisan.created_at).toLocaleDateString("id-ID", {
						day: "numeric",
						month: "long",
						year: "numeric"
					}) : "-" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "fw-bold text-success",
						children: new Intl.NumberFormat("id-ID", {
							style: "currency",
							currency: "IDR",
							minimumFractionDigits: 0
						}).format(historyArisan.current_balance || 0)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "badge bg-secondary",
						children: "Closed"
					}) }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
						className: "text-center",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							size: "sm",
							onClick: onDetailClick,
							className: "text-primary border-0 rounded-circle p-2 shadow-sm",
							title: "Lihat Detail",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdVisibility, { size: 18 })
						})
					})
				] }) })]
			})
		})]
	});
}
ArisanHistoryTable.propTypes = {
	historyArisan: import_prop_types.default.shape({
		program_name: import_prop_types.default.string,
		batch_name: import_prop_types.default.string,
		participant_no: import_prop_types.default.string,
		created_at: import_prop_types.default.string,
		current_balance: import_prop_types.default.number
	}),
	onDetailClick: import_prop_types.default.func.isRequired
};
//#endregion
//#region src/pages/program/arisan/ArisanPage.jsx
function ArisanPage() {
	const navigate = useNavigate();
	const { userData } = useProfile();
	const canCreate = !!userData && [
		"2",
		"3",
		"4"
	].includes(String(userData.status_id));
	const activeTab = "arisan";
	const [activeArisan, setActiveArisan] = (0, import_react.useState)(null);
	const [historyArisan, setHistoryArisan] = (0, import_react.useState)(null);
	const [availableArisans, setAvailableArisans] = (0, import_react.useState)([]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchArisanData = (0, import_react.useCallback)(async () => {
		setIsLoading(true);
		setError(null);
		try {
			const token = localStorage.getItem("token");
			const headers = {
				"Content-Type": "application/json",
				...token ? { Authorization: `Bearer ${token}` } : {}
			};
			const activeRes = await fetch(getApiUrl("program/arisan"), {
				method: "GET",
				headers
			});
			if (!activeRes.ok) throw new Error(`HTTP error! status: ${activeRes.status}`);
			const activeResult = await activeRes.json();
			let hasActive = false;
			if (activeResult.success && activeResult.data) if (activeResult.data.is_lunas) {
				setHistoryArisan(activeResult.data);
				setActiveArisan(null);
			} else {
				setActiveArisan(activeResult.data);
				setHistoryArisan(null);
				hasActive = true;
			}
			else {
				setActiveArisan(null);
				setHistoryArisan(null);
			}
			if (!hasActive) {
				const availableRes = await fetch(getApiUrl("program/arisan/available"), {
					method: "GET",
					headers
				});
				if (!availableRes.ok) throw new Error(`HTTP error! status: ${availableRes.status}`);
				const availableResult = await availableRes.json();
				if (availableResult.success) setAvailableArisans(availableResult.data || []);
				else throw new Error(availableResult.message || "Gagal memuat daftar arisan");
			}
		} catch (err) {
			console.error("Error fetching arisan details:", err);
			setError("Gagal memuat data dari server. Menampilkan mode preview.");
			setAvailableArisans([]);
		} finally {
			setIsLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchArisanData();
	}, [fetchArisanData]);
	const handleGabungArisan = (0, import_react.useCallback)((arisanId) => {
		if (activeArisan?.is_pending && activeArisan?.financing_id) {
			navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				financingId: activeArisan.financing_id
			})}`);
			return;
		}
		navigate(`/${jwtEncode({
			page: "formPengajuanArisan",
			arisanId
		})}`);
	}, [navigate, activeArisan]);
	const handleSetoran = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "billingPage",
			action: "setoranArisan"
		})}`);
	}, [navigate]);
	const handleHistoryDetail = (0, import_react.useCallback)(() => {
		if (historyArisan?.financing_id) navigate(`/${jwtEncode({
			page: "transactionDetailPage",
			financingId: historyArisan.financing_id
		})}`);
	}, [historyArisan, navigate]);
	const handleTabChange = (0, import_react.useCallback)((key) => {
		if (key === "pinjaman") navigate(`/${jwtEncode({ page: "programPage" })}`);
	}, [navigate]);
	const renderArisanContent = () => {
		if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanSkeleton, {});
		if (activeArisan) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramAccountCard, {
			accountData: {
				nama: activeArisan.member_name || userData?.name || "Anggota Koperasi",
				produk: `${activeArisan.program_name} (${activeArisan.batch_name})`,
				akad: `No. Peserta: ${activeArisan.participant_no || "-"}`,
				tanggalBuka: activeArisan.created_at ? new Date(activeArisan.created_at).toLocaleDateString("id-ID", {
					day: "numeric",
					month: "long",
					year: "numeric"
				}) : "-",
				saldoAkhir: new Intl.NumberFormat("id-ID", {
					style: "currency",
					currency: "IDR",
					minimumFractionDigits: 0
				}).format(activeArisan.current_balance || 0),
				statusLabel: activeArisan.status_label || activeArisan.status || "Aktif",
				isApproved: activeArisan.is_approved,
				isPending: activeArisan.is_pending,
				financingId: activeArisan.financing_id,
				isLunas: activeArisan.is_lunas
			},
			handleSetoran,
			handlePengajuan: handleGabungArisan
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AvailableArisanSection, {
			availableArisans,
			error,
			canCreate,
			onRetry: fetchArisanData,
			onJoinClick: handleGabungArisan
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanHistoryTable, {
			historyArisan,
			onDetailClick: handleHistoryDetail
		})] });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "arisan-page-container pb-5 font-outfit",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "mt-4 px-3 px-md-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xl: 10,
					lg: 11,
					md: 12,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArisanProgramTabs, {
						activeTab,
						onTabChange: handleTabChange
					}), renderArisanContent()]
				})
			})
		})
	});
}
//#endregion
export { ArisanPage as default };
