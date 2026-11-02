import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { A as MdAccountBalance, E as Button, O as Alert_default, Pr as useNavigate, Z as MdInfoOutline, o as Table, q as MdGroup, yt as MdVisibility } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as useSocketListener } from "./SocketListener-C630ms4G.js";
import { t as ProgramAccountCard } from "./ProgramAccountCard-lPfJAzIt.js";
import { t as ProgramStatusCard } from "./ProgramStatusCard-gRa7J8Vo.js";
//#region src/components/program/ProgramTabMenu.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ProgramTabMenu = ({ options, activeKey, onChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "dc-program-tabs-container",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 scroll-hide",
			children: options?.map((option) => {
				const Icon = option.icon;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					onClick: () => onChange(option.key),
					className: `dc-program-tab-btn ${activeKey === option.key ? "active" : ""}`,
					children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: option.label })]
				}, option.key);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .dc-program-tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 99px;
          border: 1px solid #f1f5f9;
          background: white;
          color: #64748b;
          font-size: 13.5px;
          font-weight: 600;
          white-space: nowrap;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 3px rgba(0,0,0,0.05);
        }

        .dc-program-tab-btn:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #334155;
        }

        .dc-program-tab-btn.active {
          background: #005a8d;
          border-color: #005a8d;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 90, 141, 0.2);
        }

        .dc-program-tab-btn:active {
          transform: scale(0.98);
        }

        @media (max-width: 767px) {
          .dc-program-tab-btn {
            width: 100%;
          }
        }
      ` })]
	});
};
//#endregion
//#region src/components/program/ProgramSkeleton.jsx
/**
* Skeleton Loader untuk ProgramPage
*/
var ProgramSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "animate-pulse px-1",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column flex-md-row gap-2 overflow-hidden mb-4 px-1",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-secondary bg-opacity-10 rounded-pill program-skeleton-tab" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "bg-secondary bg-opacity-10 rounded-pill program-skeleton-tab" })]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bg-secondary bg-opacity-10 rounded-5 w-100 p-4 animate-pulse",
		style: {
			height: "340px",
			border: "1px solid rgba(0,0,0,0.03)"
		},
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex justify-content-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-secondary bg-opacity-20 rounded",
					style: {
						width: "140px",
						height: "20px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-secondary bg-opacity-20 rounded-pill",
					style: {
						width: "80px",
						height: "24px"
					}
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-secondary bg-opacity-25 rounded mb-4",
				style: {
					width: "42px",
					height: "30px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-secondary bg-opacity-20 rounded mb-4",
				style: {
					width: "70%",
					height: "22px"
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "row g-3 mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-secondary bg-opacity-10 rounded mb-1",
						style: {
							width: "40px",
							height: "10px"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-secondary bg-opacity-20 rounded",
						style: {
							width: "90px",
							height: "16px"
						}
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "col-6",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-secondary bg-opacity-10 rounded mb-1",
						style: {
							width: "40px",
							height: "10px"
						}
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bg-secondary bg-opacity-20 rounded",
						style: {
							width: "90px",
							height: "16px"
						}
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-top border-secondary border-opacity-10 pt-3 d-flex justify-content-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-secondary bg-opacity-10 rounded",
					style: {
						width: "60px",
						height: "12px"
					}
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bg-secondary bg-opacity-20 rounded",
					style: {
						width: "120px",
						height: "24px"
					}
				})]
			})
		]
	})]
});
//#endregion
//#region src/pages/program/ProgramPage.jsx
var DEFAULT_OPTIONS = [{
	label: "Pinjaman Lunak",
	key: "pinjaman",
	icon: MdAccountBalance
}, {
	label: "Arisan",
	key: "arisan",
	icon: MdGroup
}];
function ProgramPage() {
	const navigate = useNavigate();
	const abortControllerRef = (0, import_react.useRef)(null);
	const optionsRef = (0, import_react.useRef)(DEFAULT_OPTIONS);
	const [activeTab, setActiveTab] = (0, import_react.useState)("pinjaman");
	const [programOptions, setProgramOptions] = (0, import_react.useState)(DEFAULT_OPTIONS);
	const [data, setData] = (0, import_react.useState)({
		pinjaman: null,
		arisan: null
	});
	const [availableArisan, setAvailableArisan] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		optionsRef.current = programOptions;
	}, [programOptions]);
	const formatCurrency = (amount) => {
		return new Intl.NumberFormat("id-ID", {
			style: "currency",
			currency: "IDR",
			minimumFractionDigits: 0
		}).format(amount || 0);
	};
	const formatDate = (dateString) => {
		if (!dateString) return "-";
		const date = new Date(dateString);
		if (isNaN(date.getTime())) return "-";
		return date.toLocaleDateString("id-ID", {
			day: "2-digit",
			month: "long",
			year: "numeric"
		});
	};
	const fetchWithAuth = (0, import_react.useCallback)(async (endpoint, signal) => {
		const response = await api.get(`/program/${endpoint}`, { signal });
		if (!response.data?.success) throw new Error(response.data?.message || `Gagal mengambil data ${endpoint}`);
		return response.data.data;
	}, []);
	const fetchAvailableArisan = (0, import_react.useCallback)(async () => {
		try {
			const response = await api.get("/program/arisan/available");
			if (response.data?.success) setAvailableArisan(response.data.data || []);
		} catch (err) {
			console.error("Error fetching available arisan:", err);
		}
	}, []);
	const mapDataToUI = (0, import_react.useCallback)((raw, type) => {
		if (!raw) return null;
		if (type === "pinjaman") return {
			nama: raw.member?.name || "-",
			produk: raw.product?.name || "Pinjaman Lunak",
			akad: raw.product?.akad_type || "Murabahah",
			tanggalBuka: formatDate(raw.created_at),
			saldoAkhir: formatCurrency(raw.principal_amount || raw.nominal_principal),
			status: raw.status,
			financingId: raw.financing_id || raw.loan_id,
			isPending: raw.is_pending || raw.status === "PENDING" || raw.status === "WAITING_APPROVAL" || raw.current_step_id != null,
			isApproved: raw.is_approved || raw.status?.toUpperCase() === "APPROVED" || [
				"LUNAS",
				"COMPLETED",
				"PAID_OFF",
				"PAID",
				"SETTLED",
				"SUCCESS"
			].includes(raw.status?.toUpperCase()),
			isLunas: [
				"LUNAS",
				"COMPLETED",
				"PAID_OFF",
				"PAID",
				"SETTLED",
				"SUCCESS"
			].includes(raw.status?.toUpperCase()),
			statusLabel: [
				"LUNAS",
				"COMPLETED",
				"PAID_OFF",
				"PAID",
				"SETTLED",
				"SUCCESS"
			].includes(raw.status?.toUpperCase()) ? "Lunas" : raw.status_label || (raw.status?.toUpperCase() === "APPROVED" ? "Aktif (Disetujui)" : "Menunggu Approval")
		};
		if (type === "arisan") return {
			nama: raw.member_name || "-",
			produk: `${raw.program_name || "Arisan"} - ${raw.batch_name || ""}`.trim(),
			akad: `No. Peserta: ${raw.participant_no || "-"}`,
			tanggalBuka: formatDate(raw.created_at),
			saldoAkhir: formatCurrency(raw.current_balance),
			status: raw.status,
			isPending: raw.is_pending,
			isApproved: raw.is_approved,
			isLunas: raw.is_lunas,
			statusLabel: raw.status_label || (raw.is_approved ? "Aktif" : "Menunggu Approval"),
			financingId: raw.financing_id
		};
		return null;
	}, []);
	const loadData = (0, import_react.useCallback)(async () => {
		if (abortControllerRef.current) abortControllerRef.current.abort();
		const controller = new AbortController();
		abortControllerRef.current = controller;
		setLoading(true);
		setError(null);
		try {
			const [optionsRaw, pinjamanRaw, arisanRaw] = await Promise.all([
				fetchWithAuth("options", controller.signal).catch(() => DEFAULT_OPTIONS),
				fetchWithAuth("pinjaman", controller.signal).catch(() => null),
				fetchWithAuth("arisan", controller.signal).catch(() => null)
			]);
			if (!controller.signal.aborted) {
				setProgramOptions(optionsRaw.map((opt) => ({
					...opt,
					icon: opt.key === "arisan" ? MdGroup : MdAccountBalance
				})));
				setData({
					pinjaman: mapDataToUI(pinjamanRaw, "pinjaman"),
					arisan: mapDataToUI(arisanRaw, "arisan")
				});
				if (!arisanRaw) fetchAvailableArisan();
			}
		} catch (err) {
			if (err.name !== "AbortError") setError(err.message);
		} finally {
			if (!controller.signal.aborted) setLoading(false);
		}
	}, [
		fetchWithAuth,
		mapDataToUI,
		fetchAvailableArisan
	]);
	(0, import_react.useEffect)(() => {
		loadData();
		return () => {
			if (abortControllerRef.current) abortControllerRef.current.abort();
		};
	}, [loadData]);
	useSocketListener((0, import_react.useCallback)((payload) => {
		if ([
			"financing_applications",
			"arisan",
			"program"
		].includes(payload?.entityRef)) loadData();
	}, [loadData]));
	const activeData = (0, import_react.useMemo)(() => data[activeTab], [data, activeTab]);
	const handlePengajuan = (0, import_react.useCallback)(() => {
		if (activeData?.isPending && activeData?.financingId) {
			navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				financingId: activeData.financingId
			})}`);
			return;
		}
		navigate(`/${jwtEncode({ page: activeTab === "arisan" ? "arisanPage" : "formPengajuanPinjaman" })}`);
	}, [
		activeTab,
		navigate,
		activeData
	]);
	const handleSetoran = (0, import_react.useCallback)(() => {
		if (activeTab === "pinjaman" && activeData?.isPending && activeData?.financingId) {
			navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				financingId: activeData.financingId
			})}`);
			return;
		}
		if (activeTab === "pinjaman" && activeData?.isApproved && activeData?.financingId) {
			navigate(`/${jwtEncode({
				page: "billingPage",
				financingId: activeData.financingId,
				category: "PINJAMAN"
			})}`);
			return;
		}
		navigate(`/${jwtEncode({ page: "billingPage" })}`);
	}, [
		activeTab,
		navigate,
		activeData
	]);
	const handleDetail = (0, import_react.useCallback)(() => {
		if (activeData?.financingId) navigate(`/${jwtEncode({
			page: "transactionDetailPage",
			financingId: activeData.financingId
		})}`);
	}, [navigate, activeData]);
	const renderContent = () => {
		if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramSkeleton, {});
		if (error) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Alert_default, {
			variant: "danger",
			className: "shadow-sm rounded-4 border-0 animate-fade-in",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-2 mb-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdInfoOutline, { size: 20 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
						className: "h6 mb-0",
						children: "Gagal Memuat Data"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "small mb-3",
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline-danger",
					size: "sm",
					className: "fw-bold px-3 rounded-pill",
					onClick: loadData,
					children: "Coba Lagi"
				})
			]
		});
		if (activeData?.isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramStatusCard, {
				title: `Informasi ${activeTab === "arisan" ? "Arisan" : "Pinjaman Lunak"}`,
				message: "Pengajuan menunggu approval",
				buttonText: "Lihat Detail Pengajuan",
				onButtonClick: handlePengajuan,
				variant: "pending"
			})
		});
		if (activeData?.isLunas) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "animate-fade-in",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramStatusCard, {
				title: `Informasi ${activeTab === "arisan" ? "Arisan" : "Pinjaman Lunak"}`,
				message: `Selamat! Transaksi ${activeTab === "pinjaman" ? "pinjaman lunak" : activeTab} Anda sebelumnya telah lunas. Anda dapat mengajukan yang baru sekarang.`,
				buttonText: activeTab === "arisan" ? "Daftar Arisan Baru" : "Pengajuan Pinjaman Baru",
				onButtonClick: handlePengajuan,
				variant: "empty"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "d-flex justify-content-between align-items-center mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold text-dark mb-1 font-outfit",
						children: activeTab === "arisan" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdGroup, {
							className: "me-2 text-primary",
							size: 22
						}), " Riwayat Arisan"] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalance, {
							className: "me-2 text-primary",
							size: 22
						}), " Riwayat Pinjaman"] })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted small mb-0",
						children: "Riwayat transaksi Anda yang telah lunas"
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
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "fw-medium",
								children: activeData.produk
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: activeData.akad }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: activeData.tanggalBuka }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "fw-bold text-success",
								children: activeData.saldoAkhir
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
									onClick: handleDetail,
									className: "text-primary border-0 rounded-circle p-2 shadow-sm",
									title: "Lihat Detail",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdVisibility, { size: 18 })
								})
							})
						] }) })]
					})
				})]
			})]
		});
		if (activeData) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramAccountCard, {
				accountData: activeData,
				handleSetoran,
				handlePengajuan,
				handleDetail
			})
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "animate-fade-in",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramStatusCard, {
				title: `Informasi ${activeTab === "arisan" ? "Arisan" : "Pinjaman Lunak"}`,
				message: `Anda belum memiliki transaksi ${activeTab === "pinjaman" ? "pinjaman lunak" : activeTab} yang aktif.`,
				buttonText: activeTab === "arisan" ? "Daftar Sekarang" : "Pengajuan Pinjaman Baru",
				onButtonClick: handlePengajuan,
				variant: "empty"
			})
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "program-page-container px-3 pb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgramTabMenu, {
				options: programOptions,
				activeKey: activeTab,
				onChange: setActiveTab
			})
		}), renderContent()]
	});
}
//#endregion
export { ProgramPage as default };
