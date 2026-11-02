import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { $t as FaDownload, Bn as FaPlus, E as Button, Mt as FaCalendarAlt, Or as FaWallet, Pr as useNavigate, Qn as FaShieldAlt, Qt as FaDonate, Ut as FaChevronLeft, Wt as FaChevronRight, bn as FaHistory, c as Spinner, dn as FaFileInvoiceDollar, g as Form_default, h as InputGroup_default, in as FaExclamationCircle, qt as FaClock, sn as FaEye, wn as FaInfoCircle, xt as FaArrowRight, yn as FaHeadset, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as uBilling } from "./UBilling-DLTCHisI.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as useSocketListener } from "./SocketListener-C630ms4G.js";
import { t as TabunganService } from "./tabungan.service-CPFyTv_m.js";
import { a as getDaysUntilDue, i as formatRupiah, n as formatIDR, r as formatInvoiceNumber, t as formatDate } from "./utils-Cc-fQ_fc.js";
import { t as DataTable } from "./DataTable-BARwmvUl.js";
//#region src/pages/global/BillingPage/hooks/useBillingData.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useBillingData = (decodedToken) => {
	const { registrationId, filterParams, categoryName, isSukarela, displayName, financingId, downPayment } = (0, import_react.useMemo)(() => {
		const category = decodedToken?.category || decodedToken?.setoranType || decodedToken?.product || null;
		return {
			registrationId: decodedToken?.registration_id || decodedToken?.registrationId || null,
			financingId: decodedToken?.financing_id || decodedToken?.financingId || null,
			downPayment: Number(decodedToken?.downPayment) || 0,
			orderId: decodedToken?.order_id || decodedToken?.orderId || null,
			categoryName: category,
			displayName: (() => {
				const cat = (category || "").toUpperCase();
				if (cat === "TABUNGAN_DEPOSIT" || [
					"HAJI",
					"UMRAH",
					"PENDIDIKAN",
					"QURBAN"
				].includes(cat)) return "Tabungan";
				return decodedToken?.displayName || "Simpanan";
			})(),
			isSukarela: category?.toUpperCase().includes("SUKARELA") || category?.toUpperCase() === "TABUNGAN_DEPOSIT",
			filterParams: {
				...decodedToken?.filter || {},
				category
			}
		};
	}, [decodedToken]);
	const [bills, setBills] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [tabunganDetail, setTabunganDetail] = (0, import_react.useState)(null);
	const [loadingData, setLoadingData] = (0, import_react.useState)(true);
	const hasCategory = (0, import_react.useCallback)((bill, checkFn) => {
		if (bill.category_code) return checkFn(bill.category_code);
		if (bill.items && Array.isArray(bill.items)) return bill.items.some((item) => item.category_code && checkFn(item.category_code));
		return false;
	}, []);
	const loadInitialData = (0, import_react.useCallback)(async () => {
		setLoadingData(true);
		try {
			const fetchFilter = {};
			if (filterParams.bill_type_id) fetchFilter.bill_type_id = filterParams.bill_type_id;
			const tIdFetch = decodedToken?.tabungan_id || decodedToken?.tabunganId;
			const [resPending, resHistory, resTabungan] = await Promise.all([
				!isSukarela || categoryName === "TABUNGAN_DEPOSIT" ? uBilling.getPendingBills(fetchFilter) : Promise.resolve({ data: {
					status: true,
					data: []
				} }),
				uBilling.getBillingHistory(fetchFilter),
				categoryName === "TABUNGAN_DEPOSIT" && tIdFetch ? TabunganService.getTabunganDetail(tIdFetch) : Promise.resolve({ data: null })
			]);
			if (resTabungan && resTabungan.data && resTabungan.data.data) setTabunganDetail(resTabungan.data.data);
			else setTabunganDetail(null);
			const filterContextBills = (data) => {
				let rawData = Array.isArray(data) ? data : [];
				if (categoryName === "MEMBER_REGISTRATION" || decodedToken?.return === "registrationPage") rawData = rawData.filter((bill) => bill.category_code === "SW_POKOK" || bill.category_code === "SW_WAJIB" || bill.description?.toLowerCase().includes("simpanan pokok") || bill.description?.toLowerCase().includes("simpanan wajib"));
				else if (financingId || categoryName === "FINANCING") {
					rawData = rawData.filter((bill) => hasCategory(bill, (code) => code === "TRANSACTION_DOWN_PAYMENT" || code === "TRANSACTION_INSTALLMENT"));
					if (financingId) rawData = rawData.filter((b) => String(b.financing_application_id) === String(financingId));
					if (decodedToken?.productName) {
						const prod = decodedToken.productName.toLowerCase();
						if (prod.includes("arisan")) rawData = rawData.filter((b) => b.description?.toLowerCase().includes("arisan"));
						else if (prod.includes("pinjaman")) rawData = rawData.filter((b) => b.description?.toLowerCase().includes("pinjaman"));
						else if (prod.includes("pembiayaan")) rawData = rawData.filter((b) => !b.description?.toLowerCase().includes("arisan") && !b.description?.toLowerCase().includes("pinjaman"));
					}
				} else if (categoryName === "SAVINGS") rawData = rawData.filter((bill) => hasCategory(bill, (code) => code.startsWith("TRANSACTION_")));
				else if (categoryName === "TABUNGAN_DEPOSIT") {
					const tId = decodedToken?.tabungan_id || decodedToken?.tabunganId;
					if (tId) rawData = rawData.filter((bill) => hasCategory(bill, (code) => code === `TAB_DEP_${tId}`));
					else rawData = rawData.filter((bill) => hasCategory(bill, (code) => code.startsWith("TAB_DEP_")));
				} else if (categoryName && [
					"haji",
					"umrah",
					"pendidikan",
					"qurban"
				].includes(categoryName.toLowerCase())) {
					const lowerCat = categoryName.toLowerCase();
					rawData = rawData.filter((bill) => bill.description?.toLowerCase().includes(lowerCat) || hasCategory(bill, (code) => code.startsWith("TAB_DEP_")));
				} else if (categoryName === "SUKUK_INVESTMENT") {
					const oId = decodedToken?.order_id || decodedToken?.orderId;
					if (oId) rawData = rawData.filter((bill) => bill.description?.includes(`Order #${oId}`));
					else rawData = rawData.filter((bill) => hasCategory(bill, (code) => code === "SUKUK_INVESTMENT"));
				}
				return rawData;
			};
			const filteredHistory = resHistory.data?.status ? filterContextBills(resHistory.data.data) : [];
			if (resPending.data?.status) {
				let rawData = filterContextBills(resPending.data.data);
				if (downPayment > 0) {
					const hasInHistory = filteredHistory.some((h) => hasCategory(h, (code) => code === "TRANSACTION_DOWN_PAYMENT" || code === "DP_PEMBIAYAAN") && (h.status === "PAID" || h.status === "COMPLETED"));
					const hasInPending = rawData.some((b) => hasCategory(b, (code) => code === "TRANSACTION_DOWN_PAYMENT" || code === "DP_PEMBIAYAAN"));
					if (!hasInHistory && !hasInPending) rawData.unshift({
						bill_item_id: "dp-" + (financingId || Date.now()),
						id: "dp-" + (financingId || Date.now()),
						description: "Uang Tanda Keseriusan (DP)",
						amount: downPayment,
						status: "UNPAID",
						category_code: "TRANSACTION_DOWN_PAYMENT",
						financing_application_id: financingId,
						due_date: (/* @__PURE__ */ new Date()).toISOString()
					});
				}
				setBills(rawData.sort((a, b) => new Date(a.due_date || a.createdAt) - new Date(b.due_date || b.createdAt)));
			} else setBills([]);
			setHistory(filteredHistory);
		} catch (err) {
			console.error("Gagal memuat data billing:", err);
			setBills([]);
			setHistory([]);
		} finally {
			setLoadingData(false);
		}
	}, [
		filterParams,
		isSukarela,
		categoryName,
		financingId,
		decodedToken?.productName,
		decodedToken?.tabungan_id,
		decodedToken?.tabunganId,
		decodedToken?.order_id,
		decodedToken?.orderId,
		hasCategory
	]);
	(0, import_react.useEffect)(() => {
		loadInitialData();
	}, [loadInitialData]);
	useSocketListener((payload) => {
		if (payload.entityRef === "member_registration" || payload.entityRef === "billing") loadInitialData();
	});
	return {
		bills,
		history,
		tabunganDetail,
		loadingData,
		loadInitialData,
		registrationId,
		financingId,
		filterParams,
		isSukarela,
		displayName,
		categoryName
	};
};
//#endregion
//#region src/pages/global/BillingPage/components/SummaryStats.jsx
var import_jsx_runtime = require_jsx_runtime();
function SummaryStats({ bills, history, categoryName, tabunganDetail }) {
	const safeBills = Array.isArray(bills) ? bills : [];
	const safeHistory = Array.isArray(history) ? history : [];
	const totalPending = safeBills.reduce((s, b) => s + parseFloat(b.amount || 0), 0);
	const totalPaid = safeHistory.reduce((s, h) => s + parseFloat(h.amount || 0), 0);
	const totalAll = totalPending + totalPaid;
	const nearestDue = safeBills.filter((b) => b.due_date).sort((a, b) => new Date(a.due_date) - new Date(b.due_date))[0];
	const daysLeft = nearestDue ? getDaysUntilDue(nearestDue.due_date) : null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bp-stats",
		children: [[
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, { size: 16 }),
				iconBg: "rgba(239,68,68,0.25)",
				label: categoryName === "TABUNGAN_DEPOSIT" ? "Menunggu Pembayaran" : "Total Belum Dibayar",
				value: formatIDR(totalPending),
				sub: `${safeBills.length} ${categoryName === "TABUNGAN_DEPOSIT" ? "Setoran" : "Tagihan"}`
			},
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, { size: 16 }),
				iconBg: "rgba(245,158,11,0.25)",
				label: "Jatuh Tempo Terdekat",
				value: nearestDue ? formatDate(nearestDue.due_date) : "Tidak ada",
				sub: daysLeft !== null ? daysLeft < 0 ? "Sudah lewat" : `${daysLeft} hari lagi` : "-"
			},
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { size: 16 }),
				iconBg: "rgba(16,185,129,0.25)",
				label: "Total Terbayar",
				value: formatIDR(totalPaid),
				sub: `${safeHistory.length} Transaksi`
			},
			{
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, { size: 16 }),
				iconBg: "rgba(99,102,241,0.25)",
				label: categoryName === "TABUNGAN_DEPOSIT" ? "Total Setoran" : "Total Tagihan",
				value: formatIDR(totalAll),
				sub: `${safeBills.length + safeHistory.length} ${categoryName === "TABUNGAN_DEPOSIT" ? "Setoran" : "Tagihan"}`
			}
		].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bp-stat-card",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-stat-icon",
				style: { background: s.iconBg },
				children: s.icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-stat-label",
					children: s.label
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-stat-value",
					children: s.value
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-stat-sub",
					children: s.sub
				})
			] })]
		}, i)), tabunganDetail && tabunganDetail.catalog && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bp-stat-card",
			style: {
				gridColumn: "1 / -1",
				flexDirection: "column",
				alignItems: "stretch"
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					justifyContent: "space-between",
					marginBottom: "8px"
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "bp-stat-label",
					children: ["Target ", tabunganDetail.catalog.target_name || categoryName.replace("TABUNGAN_", "Tabungan ")]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "bp-stat-value",
					style: { fontSize: "13px" },
					children: [
						formatIDR(tabunganDetail.current_balance || 0),
						" / ",
						formatIDR(tabunganDetail.catalog.target_amount)
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					width: "100%",
					height: "8px",
					background: "rgba(255,255,255,0.1)",
					borderRadius: "4px",
					overflow: "hidden"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: {
					height: "100%",
					background: "var(--bp-success)",
					width: `${Math.min(100, parseFloat(tabunganDetail.current_balance || 0) / parseFloat(tabunganDetail.catalog.target_amount || 1) * 100)}%`,
					borderRadius: "4px",
					transition: "width 0.5s ease-in-out"
				} })
			})]
		})]
	});
}
var SummaryStats_default = import_react.memo(SummaryStats);
//#endregion
//#region src/pages/global/BillingPage/components/PendingBillsTab.jsx
function PendingBillsTab({ title, bills, selectedBills, setSelectedBills, disabledBills, handlePay, isSubmitting, onViewInvoice }) {
	const safeBills = (0, import_react.useMemo)(() => Array.isArray(bills) ? bills : [], [bills]);
	const [page, setPage] = (0, import_react.useState)(1);
	const totalPages = Math.max(1, Math.ceil(safeBills.length / 5));
	const pageBills = safeBills.slice((page - 1) * 5, page * 5);
	const allSelected = safeBills.length > 0 && selectedBills.length === safeBills.length;
	const now = /* @__PURE__ */ new Date();
	const toggleBill = (0, import_react.useCallback)((id) => {
		if (disabledBills.includes(id)) return;
		setSelectedBills((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
	}, [disabledBills, setSelectedBills]);
	const toggleAll = (0, import_react.useCallback)(() => {
		setSelectedBills(allSelected ? [] : safeBills.map((b) => b.bill_item_id));
	}, [
		allSelected,
		safeBills,
		setSelectedBills
	]);
	if (safeBills.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bp-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-empty-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
					size: 30,
					color: "#059669"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-empty-title",
				children: "Semua Tagihan Lunas! 🎉"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-empty-desc",
				children: "Tidak ada tagihan yang perlu dibayar saat ini."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bp-card-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-card-title",
				children: title || "Daftar Tagihan Belum Dibayarkan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-card-sub",
				children: "Segera lakukan pembayaran sebelum melewati tanggal jatuh tempo."
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "bp-btn-unduh",
				onClick: () => handlePay(),
				disabled: selectedBills.length === 0 || isSubmitting,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaDownload, { size: 11 }), "Unduh Tagihan"]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bp-table-wrap",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "bp-table",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
						style: { width: 36 },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: allSelected,
							onChange: toggleAll,
							style: { cursor: "pointer" }
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "No. Tagihan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Jenis Tagihan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Deskripsi" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Tanggal Tagihan" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Jatuh Tempo" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Jumlah" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Status" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Aksi" })
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: pageBills.map((bill) => {
					const isChecked = selectedBills.includes(bill.bill_item_id);
					const isDisabled = disabledBills.includes(bill.bill_item_id);
					const dueDate = bill.due_date ? new Date(bill.due_date) : null;
					const isOverdue = dueDate && dueDate < now;
					const daysLeft = dueDate ? getDaysUntilDue(bill.due_date) : null;
					const isDueSoon = !isOverdue && daysLeft !== null && daysLeft <= 3;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: `${isChecked ? "bp-row-selected" : ""} ${isOverdue ? "bp-row-overdue" : ""}`,
						onClick: () => toggleBill(bill.bill_item_id),
						style: { cursor: isDisabled ? "not-allowed" : "pointer" },
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: isChecked,
									disabled: isDisabled,
									onChange: () => toggleBill(bill.bill_item_id),
									style: { cursor: isDisabled ? "not-allowed" : "pointer" }
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bp-inv-number",
								children: bill.bill_item_id ? formatInvoiceNumber(bill.bill_item_id, bill.createdAt || bill.due_date) : "-"
							}), (isOverdue || isDueSoon) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "bp-due-soon",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, { size: 9 }), isOverdue ? "Sudah lewat jatuh tempo" : `Jatuh tempo ${daysLeft} hari lagi`]
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									display: "flex",
									alignItems: "center",
									gap: 8
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bp-type-icon",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {
										size: 13,
										color: "#2563eb"
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontWeight: 600,
										fontSize: 12
									},
									children: bill.type?.type_name || "Tagihan"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									style: {
										fontSize: 10,
										color: "#6b7280"
									},
									children: bill.category_code?.replace(/_/g, " ") || ""
								})] })]
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								style: {
									fontSize: 13,
									fontWeight: 500
								},
								children: bill.description || bill.type?.type_name || "-"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: {
									fontSize: 12,
									color: "#6b7280"
								},
								children: bill.createdAt ? formatDate(bill.createdAt) : formatDate(bill.due_date)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								style: {
									fontSize: 12,
									color: isOverdue ? "#ef4444" : isDueSoon ? "#f59e0b" : "#374151",
									fontWeight: 600
								},
								children: dueDate ? formatDate(bill.due_date) : "-"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								style: { fontWeight: 700 },
								children: formatIDR(bill.amount)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `bp-badge ${isOverdue ? "bp-badge-overdue" : "bp-badge-pending"}`,
								children: isOverdue ? "Terlambat" : "Belum Dibayar"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								onClick: (e) => e.stopPropagation(),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										display: "flex",
										gap: 4,
										flexWrap: "wrap"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										className: "bp-btn-pay",
										onClick: () => {
											setSelectedBills([bill.bill_item_id]);
											handlePay([bill.bill_item_id]);
										},
										disabled: isSubmitting,
										children: "Bayar"
									}), onViewInvoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										className: "bp-btn-invoice",
										onClick: () => onViewInvoice(bill.bill_item_id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, { size: 10 }), " Invoice"]
									})]
								})
							})
						]
					}, bill.bill_item_id);
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bp-pagination",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "bp-page-info",
				children: [
					"Menampilkan ",
					(page - 1) * 5 + 1,
					"–",
					Math.min(page * 5, safeBills.length),
					" dari ",
					safeBills.length,
					" tagihan"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					display: "flex",
					alignItems: "center",
					gap: 12
				},
				children: [selectedBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "bp-btn-pay",
					onClick: () => handlePay(),
					disabled: isSubmitting,
					children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						animation: "border",
						size: "sm",
						className: "me-1"
					}), " Memproses..."] }) : `Bayar ${selectedBills.length} Tagihan`
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "bp-page-buttons",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bp-page-btn",
							onClick: () => setPage((p) => Math.max(1, p - 1)),
							disabled: page === 1,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronLeft, { size: 10 })
						}),
						Array.from({ length: totalPages }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: `bp-page-btn ${page === i + 1 ? "active" : ""}`,
							onClick: () => setPage(i + 1),
							children: i + 1
						}, i + 1)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							className: "bp-page-btn",
							onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
							disabled: page === totalPages,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, { size: 10 })
						})
					]
				})]
			})]
		})
	] });
}
var PendingBillsTab_default = import_react.memo(PendingBillsTab);
//#endregion
//#region src/pages/global/BillingPage/components/PaymentHistoryTab.jsx
function PaymentHistoryTab({ history, onViewInvoice }) {
	const safeHistory = (0, import_react.useMemo)(() => Array.isArray(history) ? history : [], [history]);
	const [page, setPage] = (0, import_react.useState)(1);
	const totalPages = Math.max(1, Math.ceil(safeHistory.length / 5));
	const pageItems = safeHistory.slice((page - 1) * 5, page * 5);
	const columns = [
		{
			header: "No. Invoice",
			render: (item) => {
				const billId = item.bill_item_id || item.id;
				const dateObj = item.bill?.updatedAt || item.bill?.updated_at || item.updated_at || item.updatedAt || item.created_at || item.createdAt;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-inv-number",
					children: billId ? formatInvoiceNumber(billId, dateObj) : "-"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: {
						fontSize: 10,
						color: "#6b7280"
					},
					children: dateObj ? new Date(dateObj).toLocaleTimeString("id-ID", {
						hour: "2-digit",
						minute: "2-digit"
					}) + " WIB" : ""
				})] });
			}
		},
		{
			header: "Jenis Tagihan",
			render: (item) => {
				const title = item.type?.type_name || "Tagihan";
				const subTitle = item.category_code?.replace(/_/g, " ") || "Pembayaran";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						alignItems: "center",
						gap: 8
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-type-icon",
						style: { background: "#f0fdf4" },
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
							size: 13,
							color: "#10b981"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontWeight: 600,
							fontSize: 12
						},
						children: title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						style: {
							fontSize: 10,
							color: "#6b7280"
						},
						children: item.description || subTitle
					})] })]
				});
			}
		},
		{
			header: "Tanggal Bayar",
			render: (item) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					style: { fontSize: 12 },
					children: formatDate(item.bill?.updatedAt || item.bill?.updated_at || item.updated_at || item.updatedAt || item.created_at || item.createdAt)
				});
			}
		},
		{
			header: "Jumlah",
			render: (item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				style: {
					fontWeight: 700,
					fontSize: 13
				},
				children: formatIDR(item.amount)
			})
		},
		{
			header: "Status",
			render: () => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "bp-badge bp-badge-paid",
				children: "Lunas"
			})
		},
		{
			header: "Aksi",
			render: (item) => {
				const billId = item.bill_item_id || item.id;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: {
						display: "flex",
						gap: 4
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "bp-btn-download",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaDownload, { size: 10 }), "Unduh"]
					}), onViewInvoice && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "bp-btn-invoice",
						onClick: () => onViewInvoice(billId),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, { size: 10 }), " Invoice"]
					})]
				});
			}
		}
	];
	if (safeHistory.length === 0) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bp-empty",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-empty-icon",
				style: { background: "linear-gradient(135deg, #e0e7ff, #c7d2fe)" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, {
					size: 28,
					color: "#4f46e5"
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-empty-title",
				children: "Belum Ada Riwayat"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-empty-desc",
				children: "Riwayat pembayaran tagihan akan muncul di sini."
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bp-card-header",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bp-card-title",
			children: "Riwayat Pembayaran"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bp-card-sub",
			children: "Daftar pembayaran tagihan yang telah Anda selesaikan."
		})] })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "bp-table-wrap",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
			columns,
			data: pageItems,
			pagination: {
				currentPage: page,
				totalPages,
				onPageChange: setPage,
				totalItems: safeHistory.length,
				itemsPerPage: 5
			},
			hover: false,
			responsive: false
		})
	})] });
}
var PaymentHistoryTab_default = import_react.memo(PaymentHistoryTab);
//#endregion
//#region src/pages/global/BillingPage/components/RingkasanTab.jsx
function RingkasanTab({ bills, history, onGoToPending }) {
	const safeBills = (0, import_react.useMemo)(() => Array.isArray(bills) ? bills : [], [bills]);
	const safeHistory = (0, import_react.useMemo)(() => Array.isArray(history) ? history : [], [history]);
	const overdue = (0, import_react.useMemo)(() => safeBills.filter((b) => b.due_date && new Date(b.due_date) < /* @__PURE__ */ new Date()), [safeBills]);
	const totalPending = (0, import_react.useMemo)(() => safeBills.reduce((s, b) => s + parseFloat(b.amount || 0), 0), [safeBills]);
	const totalPaid = (0, import_react.useMemo)(() => safeHistory.reduce((s, h) => s + parseFloat(h.amount || 0), 0), [safeHistory]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: { padding: 20 },
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "bp-ringkasan-grid",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-ringkasan-card bp-ringkasan-card--pending",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-ringkasan-card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, {
							color: "#ef4444",
							size: 16
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bp-ringkasan-card-title",
							children: "Tagihan Pending"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-ringkasan-card-value",
						children: safeBills.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-ringkasan-card-sub",
						children: ["Total: ", formatIDR(totalPending)]
					}),
					overdue.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-ringkasan-card-alert",
						children: [
							"⚠ ",
							overdue.length,
							" tagihan sudah melewati jatuh tempo"
						]
					}),
					safeBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "bp-ringkasan-btn",
						onClick: onGoToPending,
						children: "Bayar Sekarang"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-ringkasan-card bp-ringkasan-card--paid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-ringkasan-card-header",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
							color: "#10b981",
							size: 16
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "bp-ringkasan-card-title",
							children: "Riwayat Pembayaran"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-ringkasan-card-value",
						children: safeHistory.length
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-ringkasan-card-sub",
						children: ["Total: ", formatIDR(totalPaid)]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-ringkasan-card-alert",
						children: "✓ Semua transaksi berhasil"
					})
				]
			})]
		}), safeHistory.slice(0, 3).map((item, idx) => {
			const dateObj = item.bill?.updatedAt || item.bill?.updated_at || item.updated_at || item.updatedAt || item.created_at || item.createdAt;
			const description = item.description || item.type?.type_name || "Transaksi";
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-ringkasan-history-item",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-ringkasan-history-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
							color: "#10b981",
							size: 14
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						style: { flex: 1 },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bp-ringkasan-history-desc",
							children: description
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bp-ringkasan-history-date",
							children: formatDate(dateObj)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-ringkasan-history-amount",
						children: formatIDR(item.amount)
					})
				]
			}, item.bill_item_id || item.id || idx);
		})]
	});
}
var RingkasanTab_default = import_react.memo(RingkasanTab);
//#endregion
//#region src/pages/global/BillingPage/components/BillingSidebar.jsx
function BillingSidebar({ bankInfo }) {
	const methods = (0, import_react.useMemo)(() => {
		if (bankInfo) return [{
			name: `${bankInfo.bank_name || "Bank"} **** ${(bankInfo.bank_account_no || "0000").slice(-4)}`,
			owner: bankInfo.account_holder || "-",
			logo: (bankInfo.bank_name || "B")[0],
			cls: "bp-bank-bca",
			isPrimary: true
		}];
		return [{
			name: "Belum ada rekening",
			owner: "Tambahkan rekening di profil",
			logo: "?",
			cls: "bp-bank-bca",
			isPrimary: false
		}];
	}, [bankInfo]);
	const infos = [
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { size: 14 }),
			title: "Bayar Tepat Waktu",
			desc: "Hindari keterlambatan dengan membayar sebelum tanggal jatuh tempo."
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { size: 14 }),
			title: "Transaksi Aman",
			desc: "Semua pembayaran Anda dijamin aman dan sesuai prinsip syariah."
		},
		{
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHeadset, { size: 14 }),
			title: "Butuh Bantuan?",
			desc: "Hubungi tim kami jika ada pertanyaan terkait tagihan."
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bp-sidebar-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-sidebar-header",
				children: "Metode Pembayaran"
			}),
			methods.map((m, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-payment-method",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `bp-bank-logo ${m.cls}`,
						children: m.logo
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex-grow-1",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-semibold text-dark",
							style: { fontSize: "13px" },
							children: m.name
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-muted",
							style: { fontSize: "11px" },
							children: m.owner
						})]
					}),
					m.isPrimary && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "bp-badge-primary-sm",
						children: "Utama"
					})
				]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "bp-add-method",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlus, { size: 11 }), "Kelola Rekening"]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bp-sidebar-card",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-sidebar-header",
				children: "Informasi Penting"
			}),
			infos.map((info, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-info-item",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-info-icon",
					children: info.icon
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-info-title",
					children: info.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-info-desc",
					children: info.desc
				})] })]
			}, i)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
				href: "tel:+622112345678",
				className: "bp-hubungi-link",
				children: ["Hubungi Kami ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowRight, { size: 11 })]
			})
		]
	})] });
}
var BillingSidebar_default = import_react.memo(BillingSidebar);
//#endregion
//#region src/pages/global/BillingPage/components/SukarelaForm.jsx
var SukarelaForm = ({ customAmount, setCustomAmount, handleNavigateToInvoice, isSubmitting, title = "Setoran Sukarela", subtitle = "Masukkan jumlah nominal yang ingin Anda setorkan" }) => {
	const handleChange = (0, import_react.useCallback)((e) => {
		const raw = e.target.value.replace(/\./g, "");
		if (/^\d*$/.test(raw)) setCustomAmount(formatRupiah(raw));
	}, [setCustomAmount]);
	const numericValue = parseFloat(customAmount.replace(/\./g, "") || 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "bp-sukarela-form",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-sukarela-icon mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaDonate, { size: 24 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold mb-1",
						children: title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-muted small mb-0",
						children: subtitle
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				className: "mb-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
						className: "fw-bold small text-secondary text-uppercase",
						children: "Jumlah Setoran"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, {
						size: "lg",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white border-end-0 fw-bold text-primary",
							children: "Rp"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "text",
							inputMode: "numeric",
							placeholder: "0",
							className: "border-start-0 fw-bold text-center",
							style: { fontSize: "24px" },
							value: customAmount,
							onChange: handleChange
						})]
					}),
					numericValue > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-2",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "text-muted small",
							children: ["Terbilang: ", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "fw-bold text-dark",
								children: ["Rp ", customAmount]
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-1",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: "Minimal setoran Rp 1.000"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "primary",
				className: "w-100 fw-bold py-3 rounded-12 shadow-sm",
				onClick: handleNavigateToInvoice,
				disabled: !customAmount || numericValue < 1e3 || isSubmitting,
				children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
					animation: "border",
					size: "sm",
					className: "me-2"
				}), "Memproses..."] }) : "Lanjutkan Ke Pembayaran"
			})
		]
	});
};
var SukarelaForm_default = import_react.memo(SukarelaForm);
//#endregion
//#region src/pages/global/BillingPage/pages/BillingPage.jsx
var BillingPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const [selectedBills, setSelectedBills] = (0, import_react.useState)([]);
	const [customAmount, setCustomAmount] = (0, import_react.useState)("");
	const [isSubmitting, setIsSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)("");
	const [activeTab, setActiveTab] = (0, import_react.useState)("pending");
	const { bills, history, tabunganDetail, loadingData, registrationId, isSukarela, categoryName, displayName } = useBillingData(decodedToken);
	const { userData } = useProfile();
	const bankInfo = userData?.bank_info || decodedToken?.bankInfo || null;
	const pendingCount = (Array.isArray(bills) ? bills : []).length;
	const historyCount = Array.isArray(history) ? history.length : 0;
	const tabs = (0, import_react.useMemo)(() => [
		{
			key: "ringkasan",
			label: "Ringkasan",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { size: 12 })
		},
		{
			key: "pending",
			label: isSukarela && pendingCount === 0 ? categoryName === "TABUNGAN_DEPOSIT" ? "Setoran Manual" : "Setoran Sukarela" : "Belum Dibayar",
			icon: isSukarela && pendingCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlus, { size: 12 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, { size: 12 }),
			badgeKey: !(isSukarela && pendingCount === 0) ? "pendingCount" : null
		},
		{
			key: "history",
			label: "Riwayat Pembayaran",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, { size: 12 }),
			badgeKey: "historyCount"
		}
	], [
		isSukarela,
		categoryName,
		pendingCount
	]);
	const mandatoryBills = (0, import_react.useMemo)(() => {
		if (decodedToken?.return === "registrationPage") {
			const pokok = (bills || []).filter((b) => b.description?.toLowerCase().includes("simpanan pokok") || b.category_code === "SW_POKOK");
			const wajib = (bills || []).filter((b) => b.description?.toLowerCase().includes("simpanan wajib") || b.category_code === "SW_WAJIB");
			const firstWajib = wajib.length > 0 ? [wajib[0]] : [];
			return [...pokok, ...firstWajib];
		}
		if (decodedToken?.return === "savingsPage") return (bills || []).filter((b) => b.description?.toLowerCase().includes("sukarela"));
		if (decodedToken?.return === "transactionDetailPage" && decodedToken?.category === "FINANCING") return (bills || []).filter((b) => b.description?.toLowerCase().includes("down payment") || b.description?.toLowerCase().includes("dp") || b.description?.toLowerCase().includes("uang pangkal") || b.category_code === "TRANSACTION_DOWN_PAYMENT");
		if (decodedToken?.return === "transactionDetailPage" && decodedToken?.category === "TABUNGAN_DEPOSIT") {
			const tId = decodedToken?.tabungan_id || decodedToken?.tabunganId;
			const tBills = (bills || []).filter((b) => b.category_code === `TAB_DEP_${tId}`);
			if (tBills.length > 0) return [tBills[0]];
		}
		if (decodedToken?.return === "transactionDetailPage" && decodedToken?.category === "SUKUK_INVESTMENT") {
			const orderId = decodedToken?.order_id;
			return (bills || []).filter((b) => b.description?.includes(`Order #${orderId}`));
		}
		return [];
	}, [bills, decodedToken]);
	(0, import_react.useEffect)(() => {
		if (mandatoryBills.length > 0) setSelectedBills((prev) => {
			const ids = mandatoryBills.map((b) => b.bill_item_id);
			return [...new Set([...prev, ...ids])];
		});
	}, [mandatoryBills]);
	(0, import_react.useEffect)(() => {
		if (error) {
			const t = setTimeout(() => setError(""), 5e3);
			return () => clearTimeout(t);
		}
	}, [error]);
	(0, import_react.useEffect)(() => {
		if (error) setError("");
	}, [selectedBills, customAmount]);
	const handleViewInvoice = (0, import_react.useCallback)((billItemId) => {
		if (!billItemId) return;
		navigate(`/${jwtEncode({
			page: "invoicePage",
			billItemIds: [billItemId],
			return: "billingPage",
			originalReturn: decodedToken?.return,
			category: categoryName,
			financingId: decodedToken?.financingId || decodedToken?.financing_id,
			productName: decodedToken?.productName
		})}`);
	}, [
		navigate,
		decodedToken,
		categoryName
	]);
	const handlePay = (0, import_react.useCallback)(async (overrideBills) => {
		setIsSubmitting(true);
		setError("");
		try {
			const billsToUse = overrideBills || selectedBills;
			if (isSukarela && pendingCount === 0) {
				const cleanAmt = parseFloat(customAmount.replace(/\./g, ""));
				if (!cleanAmt || cleanAmt < 1e3) {
					setError("Nominal setoran minimal Rp 1.000");
					return;
				}
				const payload = {
					category: categoryName,
					amount: cleanAmt,
					tabungan_id: decodedToken?.tabungan_id || decodedToken?.tabunganId
				};
				const resp = await uBilling.createVoluntaryBill(payload);
				if (resp.data?.status) {
					const ids = resp.data.data.bill_item_ids;
					navigate(`/${jwtEncode({
						page: "invoicePage",
						billItemIds: Array.isArray(ids) ? ids : [ids],
						return: "billingPage",
						originalReturn: decodedToken?.return,
						category: categoryName,
						financingId: decodedToken?.financingId || decodedToken?.financing_id,
						productName: decodedToken?.productName
					})}`);
					return;
				} else {
					setError(resp.data?.message || "Gagal membuat tagihan sukarela.");
					return;
				}
			} else {
				if (!billsToUse.length) {
					setError("Pilih minimal satu tagihan.");
					return;
				}
				navigate(`/${jwtEncode({
					page: "invoicePage",
					billItemIds: billsToUse,
					registrationId,
					return: "billingPage",
					originalReturn: decodedToken?.return,
					category: categoryName,
					financingId: decodedToken?.financingId || decodedToken?.financing_id,
					productName: decodedToken?.productName
				})}`);
				return;
			}
		} catch (err) {
			setError(err?.response?.data?.message || "Gagal memproses transaksi. Silakan coba lagi.");
		} finally {
			setIsSubmitting(false);
		}
	}, [
		isSukarela,
		pendingCount,
		customAmount,
		categoryName,
		selectedBills,
		registrationId,
		navigate,
		decodedToken
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "pb-3 dash-fade-in",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
				variant: "danger",
				className: "mb-3 rounded-12 border-0 shadow-sm d-flex align-items-center",
				dismissible: true,
				onClose: () => setError(""),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, { className: "me-2 flex-shrink-0" }), error]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-start gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-hero-icon",
						children: categoryName === "TABUNGAN_DEPOSIT" || categoryName?.toUpperCase().includes("SUKARELA") ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, {
							size: 24,
							color: "#fff"
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaFileInvoiceDollar, {
							size: 24,
							color: "#fff"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "bp-hero-title",
						children: categoryName === "TABUNGAN_DEPOSIT" ? "Setoran Tabungan" : categoryName?.toUpperCase().includes("SUKARELA") ? "Setoran Sukarela" : "Pusat Tagihan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "bp-hero-sub",
						children: categoryName === "TABUNGAN_DEPOSIT" ? "Kelola setoran dan target tabungan Anda dengan mudah, aman, dan transparan." : categoryName?.toUpperCase().includes("SUKARELA") ? "Lakukan setoran sukarela kapan saja untuk menambah saldo Anda." : "Kelola semua tagihan dan pembayaran Anda dengan mudah, aman, dan transparan."
					})] })]
				}), loadingData ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center gap-2 mt-3 text-white-50 small",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						animation: "border",
						size: "sm"
					}), "Memuat data..."]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryStats_default, {
					bills,
					history,
					categoryName,
					tabunganDetail
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-tabs",
				children: tabs.map((tab) => {
					const count = tab.badgeKey === "pendingCount" ? pendingCount : tab.badgeKey === "historyCount" ? historyCount : 0;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: `bp-tab ${activeTab === tab.key ? "active" : ""}`,
						onClick: () => setActiveTab(tab.key),
						children: [
							tab.icon,
							tab.label,
							tab.badgeKey && count > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "bp-tab-badge",
								children: count
							})
						]
					}, tab.key);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bp-layout",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: loadingData ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "bp-card",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-loading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
							animation: "border",
							variant: "primary"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-muted mt-3 small mb-0",
							children: "Memuat data..."
						})]
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					activeTab === "ringkasan" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RingkasanTab_default, {
							bills,
							history,
							onGoToPending: () => setActiveTab("pending")
						})
					}),
					activeTab === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-card",
						children: isSukarela && pendingCount === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "p-3 p-md-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SukarelaForm_default, {
								title: categoryName === "TABUNGAN_DEPOSIT" ? `Setoran ${tabunganDetail?.target_name || tabunganDetail?.category || "Tabungan"}` : "Setoran Sukarela",
								subtitle: categoryName === "TABUNGAN_DEPOSIT" ? "Masukkan jumlah setoran tabungan yang diinginkan" : "Masukkan jumlah nominal yang ingin Anda setorkan",
								customAmount,
								setCustomAmount,
								handleNavigateToInvoice: handlePay,
								isSubmitting
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PendingBillsTab_default, {
							title: `Tagihan ${displayName}`,
							bills,
							selectedBills,
							setSelectedBills,
							disabledBills: mandatoryBills.map((b) => b.bill_item_id),
							handlePay,
							isSubmitting,
							onViewInvoice: handleViewInvoice
						})
					}),
					activeTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "bp-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PaymentHistoryTab_default, {
							history,
							onViewInvoice: handleViewInvoice
						})
					})
				] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillingSidebar_default, { bankInfo }) })]
			})
		]
	});
};
//#endregion
export { BillingPage as default };
