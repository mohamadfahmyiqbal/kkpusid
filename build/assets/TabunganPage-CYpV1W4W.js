import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Pr as useNavigate, Qn as FaShieldAlt, at as MdPets, j as MdAccountBalanceWallet, lt as MdSavings, ut as MdSchool } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as TabunganService } from "./tabungan.service-CPFyTv_m.js";
import { t as ProgramStatusCard } from "./ProgramStatusCard-gRa7J8Vo.js";
//#region src/pages/tabungan/TabunganPage.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/tabungan/TabunganPage.jsx
var import_jsx_runtime = require_jsx_runtime();
var getIconForCategory = (category) => {
	const cat = category?.toLowerCase() || "";
	if (cat.includes("haji")) return MdSavings;
	if (cat.includes("umrah")) return MdAccountBalanceWallet;
	if (cat.includes("pendidikan")) return MdSchool;
	if (cat.includes("qurban")) return MdPets;
	return MdSavings;
};
/** Build JWT token & navigate to an encrypted route */
var navigateTo = (navigate, page, program) => {
	navigate(`/${jwtEncode({
		page,
		program
	})}`);
};
var TabunganSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "animate-pulse",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex flex-column flex-md-row gap-2 overflow-hidden mb-4 px-1",
		children: [
			1,
			2,
			3,
			4
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-pill tabungan-skeleton-tab" }, i))
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-light rounded-4 w-100 tabungan-skeleton-card" })]
});
var EmptyState = ({ onPengajuan }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: "animate-fade-in",
	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramStatusCard, {
		title: "Informasi Rekening",
		message: "Anda belum memiliki rekening tabungan untuk program ini",
		buttonText: "Pengajuan",
		onButtonClick: onPengajuan,
		status: "NG"
	})
}, "empty");
var ActiveTabunganCard = ({ accountData, onSetoran, onPencairan, productName }) => {
	const formatIDR = (val) => new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(val || 0);
	const currentBalance = parseFloat(accountData.current_balance || 0);
	const targetAmount = parseFloat(accountData.target_amount || 0);
	const progressPercent = targetAmount > 0 ? Math.min(100, currentBalance / targetAmount * 100) : 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "program-status-card program-status-active mb-4 p-4 text-white animate-fade-in",
		style: {
			position: "relative",
			overflow: "hidden",
			borderRadius: "16px"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "program-glass-sheen" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "program-decor-circle c1" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "program-decor-circle c2" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					zIndex: 2
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex justify-content-between align-items-start mb-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
							className: "fw-bold mb-1",
							style: { fontSize: "1.25rem" },
							children: progressPercent >= 100 ? "Target Tercapai" : "Rekening Aktif"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "opacity-75 m-0",
							style: { fontSize: "0.9rem" },
							children: accountData.target_name || productName
						})] }), progressPercent < 100 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-light fw-bold rounded-pill px-4",
							onClick: onSetoran,
							style: {
								color: "#2563eb",
								border: "none",
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
							},
							children: "Setoran"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "btn btn-light fw-bold rounded-pill px-4",
							onClick: onPencairan,
							style: {
								color: "#059669",
								border: "none",
								boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
							},
							children: "Pencairan"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bg-white bg-opacity-10 rounded-4 p-3 mb-3",
						style: {
							backdropFilter: "blur(8px)",
							border: "1px solid rgba(255,255,255,0.2)"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex justify-content-between mb-1 align-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small opacity-75",
									children: "Saldo Terkumpul"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fw-bold fs-5",
									children: formatIDR(currentBalance)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex justify-content-between mb-2 align-items-center",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "small opacity-75",
									children: "Target Saldo"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "fw-bold opacity-75",
									children: formatIDR(targetAmount)
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "progress mt-3",
								style: {
									height: "8px",
									backgroundColor: "rgba(255,255,255,0.2)"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "progress-bar bg-warning",
									role: "progressbar",
									style: {
										width: `${progressPercent}%`,
										transition: "width 1s ease-in-out"
									}
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-end mt-1",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "small opacity-75",
									style: { fontSize: "0.75rem" },
									children: [progressPercent.toFixed(1), "% Tercapai"]
								})
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex justify-content-between align-items-center opacity-75 mt-1",
						style: { fontSize: "0.8rem" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { className: "me-1 mb-1" }),
							"Min. Bulanan: ",
							formatIDR(accountData.min_monthly_deposit)
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: ["ID Rek: #", accountData.member_saving_target_id] })]
					})
				]
			})
		]
	});
};
function TabunganPage() {
	const navigate = useNavigate();
	const [programs, setPrograms] = (0, import_react.useState)([]);
	const [activeProgramId, setActiveProgramId] = (0, import_react.useState)(null);
	const [accountStatus, setAccountStatus] = (0, import_react.useState)({
		state: "EMPTY",
		data: null
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const fetchPrograms = async () => {
			setLoading(true);
			try {
				const res = await TabunganService.getAvailablePrograms();
				if (!cancelled && res.success && res.data) {
					setPrograms(res.data);
					if (res.data.length > 0) setActiveProgramId(res.data[0].saving_target_id);
				}
			} catch (err) {
				if (!cancelled) setError("Gagal memuat daftar program tabungan");
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		fetchPrograms();
		return () => {
			cancelled = true;
		};
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		const checkAccountStatus = async () => {
			if (!activeProgramId) return;
			setLoading(true);
			setError(null);
			try {
				const response = await TabunganService.checkAccountStatus(activeProgramId);
				if (cancelled) return;
				if (response.data && response.data.hasAccount) setAccountStatus({
					state: response.data.state,
					data: response.data
				});
				else setAccountStatus({
					state: "EMPTY",
					data: null
				});
			} catch (err) {
				if (!cancelled) {
					setError("Gagal memuat status rekening");
					setAccountStatus({
						state: "EMPTY",
						data: null
					});
				}
			} finally {
				if (!cancelled) setLoading(false);
			}
		};
		checkAccountStatus();
		return () => {
			cancelled = true;
		};
	}, [activeProgramId]);
	const handlePengajuan = (0, import_react.useCallback)(() => {
		const selectedProgram = programs.find((p) => p.saving_target_id === activeProgramId);
		if (selectedProgram) navigateTo(navigate, "formPengajuanTabungan", selectedProgram);
	}, [
		navigate,
		activeProgramId,
		programs
	]);
	const handleSetoran = (0, import_react.useCallback)(() => {
		const selectedProgram = programs.find((p) => p.saving_target_id === activeProgramId);
		navigate(`/${jwtEncode({
			page: "billingPage",
			category: "TABUNGAN_DEPOSIT",
			tabungan_id: accountStatus.data?.member_saving_target_id,
			productName: selectedProgram?.target_name || "Tabungan",
			displayName: "Setoran Tabungan",
			return: "tabunganPage"
		})}`);
	}, [
		navigate,
		activeProgramId,
		accountStatus,
		programs
	]);
	const handlePencairan = (0, import_react.useCallback)(() => {
		const selectedProgram = programs.find((p) => p.saving_target_id === activeProgramId);
		navigate(`/${jwtEncode({
			page: "penarikanTabunganPage",
			tabunganId: accountStatus.data?.member_saving_target_id,
			return: "tabunganPage",
			product: selectedProgram?.target_name || "Tabungan"
		})}`);
	}, [
		navigate,
		activeProgramId,
		accountStatus,
		programs
	]);
	const handleProductChange = (0, import_react.useCallback)((id) => {
		setActiveProgramId(id);
	}, []);
	const activeProgramData = programs.find((p) => p.saving_target_id === activeProgramId) || {};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "tabungan-page-container pb-5",
		children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
			variant: "danger",
			className: "mx-2 shadow-sm rounded-4 border-0 animate-fade-in",
			dismissible: true,
			onClose: () => setError(null),
			children: error
		}), loading && programs.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabunganSkeleton, {})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [programs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "tabungan-tabs-container mb-4 px-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 tabungan-scroll-hide",
				children: programs.map((opt) => {
					const isActive = activeProgramId === opt.saving_target_id;
					const Icon = getIconForCategory(opt.category);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						onClick: () => handleProductChange(opt.saving_target_id),
						className: `tabungan-tab-btn ${isActive ? "active" : ""}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: opt.target_name })]
					}, opt.saving_target_id);
				})
			})
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "px-2 text-center text-muted mt-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdSavings, {
				size: 48,
				className: "opacity-50 mb-3"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Belum ada program tabungan yang tersedia." })]
		}), programs.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "px-2 animate-fade-in",
			children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TabunganSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				(accountStatus.state === "EMPTY" || accountStatus.state === "COMPLETED") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EmptyState, { onPengajuan: handlePengajuan }),
				(accountStatus.state === "PENDING" || accountStatus.state === "IN_PROGRESS" || accountStatus.state === "WAITING_APPROVAL") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramStatusCard, {
					title: "Menunggu Persetujuan",
					message: `Pengajuan ${activeProgramData.target_name} sedang direview oleh pengurus`,
					buttonText: "Lihat Detail",
					onButtonClick: () => {
						navigate(`/${jwtEncode({
							page: "transactionDetailPage",
							tabunganId: accountStatus.data.member_saving_target_id,
							return: "tabunganPage",
							product: activeProgramData.target_name
						})}`);
					},
					variant: "pending"
				}),
				(accountStatus.state === "APPROVED" || accountStatus.state === "OK") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActiveTabunganCard, {
					accountData: accountStatus.data,
					onSetoran: handleSetoran,
					onPencairan: handlePencairan,
					productName: activeProgramData.target_name
				}),
				accountStatus.state === "REJECTED" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramStatusCard, {
					title: "Pengajuan Ditolak",
					message: `Pengajuan ${activeProgramData.target_name} Anda tidak disetujui`,
					buttonText: "Ajukan Ulang",
					onButtonClick: handlePengajuan,
					status: "NG"
				})
			] })
		}, activeProgramId)] })]
	});
}
//#endregion
export { TabunganPage as default };
