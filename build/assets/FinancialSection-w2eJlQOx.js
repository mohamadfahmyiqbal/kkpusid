import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { $n as FaShoppingCart, Dn as FaLayerGroup, E as Button, Lt as FaChartLine, Or as FaWallet, Qn as FaShieldAlt, Yn as FaRegMoneyBillAlt, ar as FaSyncAlt, cn as FaEyeSlash, gn as FaHandHoldingUsd, o as Table, p as Modal_default, pr as FaUniversity, sn as FaEye, wn as FaInfoCircle } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import "./index-BaUN0sjk.js";
import { t as FinancialScrollButtons } from "./FinancialScrollButtons-DXW_bC2Z.js";
import { t as uGlobal } from "./UGlobal-MGBt7b3Z.js";
//#region src/features/dashboard/service/dashboardService.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var getDashboardFinancialSummary = () => uGlobal.getFinancialSummary();
//#endregion
//#region src/features/dashboard/hooks/useFinancialSummary.js
var useFinancialSummary = (userData) => {
	const [data, setData] = (0, import_react.useState)({
		balance: 0,
		tabunganDetails: [],
		jualBeliBalance: 0,
		jualBeliSisaCicilan: 0,
		jualBeliBelumDibayar: 0,
		jualBeliTerbayar: 0,
		pinjamanTagihan: 0,
		pinjamanSisaCicilan: 0,
		pinjamanNominal: 0,
		pinjamanNominalCicilan: 0,
		pinjamanTerbayar: 0,
		simpananPokok: 0,
		simpananWajib: 0,
		simpananSukarela: 0,
		simpananDeposit: 0,
		arisanTagihan: 0,
		arisanDiikutiCount: 0,
		arisanSisaCicilan: 0,
		arisanTerbayar: 0,
		totalInvestasi: 0,
		totalPendanaanSyariah: 0,
		tabunganBalance: 0,
		tabunganSubItemsData: {
			haji: 0,
			umroh: 0,
			pendidikan: 0,
			qurban: 0
		},
		details: []
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [isRefreshing, setIsRefreshing] = (0, import_react.useState)(false);
	const fetchBalance = (0, import_react.useCallback)(async (isRefresh = false) => {
		if (!userData?.member_id) return;
		if (isRefresh) setIsRefreshing(true);
		else setLoading(true);
		try {
			const res = await getDashboardFinancialSummary();
			if (res.data?.success) {
				const fetchedDetails = res.data.data.details || [];
				const tDetails = fetchedDetails.filter((d) => d.type && d.type.startsWith("TABUNGAN_") && d.type !== "TABUNGAN_DEPOSIT");
				const pokok = fetchedDetails.find((d) => d.type === "SW_POKOK")?.balance || 0;
				const wajib = fetchedDetails.find((d) => d.type === "SW_WAJIB")?.balance || 0;
				const sukarela = fetchedDetails.find((d) => d.type === "SS_SUKARELA")?.balance || 0;
				const deposit = fetchedDetails.find((d) => d.type === "TABUNGAN_DEPOSIT")?.balance || 0;
				const totalSimpanan = pokok + wajib + sukarela;
				const tabunganBalance = tDetails.reduce((acc, curr) => acc + (curr.balance || 0), 0);
				const getSum = (keyword) => tDetails.filter((d) => d.name?.toLowerCase().includes(keyword)).reduce((acc, curr) => acc + (curr.balance || 0), 0);
				setData({
					balance: totalSimpanan,
					tabunganDetails: tDetails,
					tabunganBalance,
					tabunganSubItemsData: {
						haji: getSum("haji"),
						umroh: getSum("umroh"),
						pendidikan: getSum("pendidikan"),
						qurban: getSum("qurban")
					},
					simpananPokok: pokok,
					simpananWajib: wajib,
					simpananSukarela: sukarela,
					simpananDeposit: deposit,
					details: fetchedDetails,
					jualBeliBalance: res.data.data.totalJualBeli || 0,
					jualBeliSisaCicilan: res.data.data.sisaCicilanJualBeli || 0,
					jualBeliBelumDibayar: res.data.data.jumlahCicilanBelumDibayar || 0,
					jualBeliTerbayar: res.data.data.terbayarJualBeli || 0,
					pinjamanTagihan: res.data.data.totalLoanDebt || 0,
					pinjamanSisaCicilan: res.data.data.sisaCicilanPinjaman || 0,
					pinjamanNominal: res.data.data.totalNominalPinjaman || 0,
					pinjamanNominalCicilan: res.data.data.totalNominalCicilanPinjaman || 0,
					pinjamanTerbayar: res.data.data.terbayarPinjaman || 0,
					arisanTagihan: res.data.data.totalArisanTagihan || 0,
					arisanDiikutiCount: res.data.data.arisanDiikutiCount || 0,
					arisanSisaCicilan: res.data.data.sisaCicilanArisan || 0,
					arisanTerbayar: res.data.data.terbayarArisan || 0,
					totalInvestasi: res.data.data.totalInvestasi || 0,
					totalPendanaanSyariah: res.data.data.totalPendanaanSyariah || 0
				});
			}
		} catch (err) {
			console.error("Gagal memuat saldo:", err);
		} finally {
			setLoading(false);
			setIsRefreshing(false);
		}
	}, [userData]);
	(0, import_react.useEffect)(() => {
		fetchBalance();
	}, [fetchBalance]);
	return {
		...data,
		loading,
		isRefreshing,
		refresh: () => fetchBalance(true)
	};
};
//#endregion
//#region src/features/dashboard/components/financial/FinancialCard.jsx
var import_jsx_runtime = require_jsx_runtime();
var FinancialCard = ({ title, icon: Icon, showBalance, onToggleBalance, isRefreshing, onRefresh, onDetail, subItems, variant, formattedAmount }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: `card border-0 shadow-sm overflow-hidden financial-card ${variant ? `card-variant-${variant}` : ""}`,
	children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "financial-card-decor-top" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "financial-card-decor-bottom" }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "card-body p-4 position-relative financial-card-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center mb-1",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "financial-card-icon-wrapper bg-opacity-20 p-2 rounded d-flex align-items-center justify-content-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
							className: "fw-semibold mb-0 opacity-90 financial-card-title",
							children: title
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex gap-2",
						children: [
							onDetail && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all",
								onClick: onDetail,
								"aria-label": "Detail",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: `btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all ${isRefreshing ? "fa-spin" : ""}`,
								onClick: onRefresh,
								disabled: isRefreshing,
								"aria-label": "Refresh",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSyncAlt, { size: 16 })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "btn btn-link p-0 text-white opacity-75 hover-opacity-100 transition-all",
								onClick: onToggleBalance,
								"aria-label": "Toggle",
								children: showBalance ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEyeSlash, { size: 18 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaEye, { size: 18 })
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "py-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "fw-bold mb-0 d-flex align-items-baseline financial-card-amount",
						children: showBalance ? formattedAmount : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "financial-card-amount-hidden",
							children: "Rp ••••••••"
						})
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "row g-2 mt-0",
					children: subItems && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "col-12",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "d-flex flex-column gap-2 text-white mt-1",
							children: subItems.map((item, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: `d-flex justify-content-between align-items-center ${idx !== subItems.length - 1 ? "border-bottom border-white border-opacity-10 pb-2" : ""}`,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex align-items-center gap-2",
									children: [item.icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(item.icon, {
										size: 12,
										className: "opacity-75"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "opacity-75 fw-bold financial-card-subitem-label",
										children: item.label
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fw-bold financial-card-subitem-amount",
									children: showBalance ? item.formattedAmount : "Rp ••••••••"
								})]
							}, idx))
						})
					})
				})
			]
		})
	]
});
//#endregion
//#region src/features/dashboard/components/financial/FinancialDetailModal.jsx
var FinancialDetailModal = ({ show, onHide, details, formatCurrency }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal_default, {
		show,
		onHide,
		centered: true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Header, {
				closeButton: true,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Title, { children: "Rekap Simpanan & Tabungan" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Body, { children: details && details.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
				responsive: true,
				hover: true,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Jenis" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
					className: "text-end",
					children: "Saldo"
				})] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: details.map((detail, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: detail.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
					className: "text-end fw-semibold text-primary",
					children: formatCurrency(detail.balance)
				})] }, index)) })]
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center text-muted py-4",
				children: "Belum ada data simpanan."
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal_default.Footer, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "secondary",
				onClick: onHide,
				children: "Tutup"
			}) })
		]
	});
};
//#endregion
//#region src/features/dashboard/components/FinancialSection.jsx
var currencyFormatter = new Intl.NumberFormat("id-ID", {
	style: "currency",
	currency: "IDR",
	minimumFractionDigits: 0
});
var formatCurrency = (amount) => {
	return currencyFormatter.format(amount || 0);
};
var FinancialSection = () => {
	const { userData } = useProfile();
	const scrollContainerRef = (0, import_react.useRef)(null);
	const [showBalance, setShowBalance] = (0, import_react.useState)(false);
	const [showDetailModal, setShowDetailModal] = (0, import_react.useState)(false);
	const { balance, tabunganDetails, tabunganBalance, tabunganSubItemsData, jualBeliBalance, jualBeliSisaCicilan, jualBeliBelumDibayar, jualBeliTerbayar, pinjamanNominal, pinjamanNominalCicilan, pinjamanTerbayar, pinjamanTagihan, pinjamanSisaCicilan, simpananPokok, simpananWajib, simpananSukarela, simpananDeposit, arisanTagihan, arisanDiikutiCount, arisanSisaCicilan, arisanTerbayar, totalInvestasi, totalPendanaanSyariah, details, loading, isRefreshing, refresh } = useFinancialSummary(userData);
	const toggleBalance = (0, import_react.useCallback)(() => setShowBalance((prev) => !prev), []);
	const handleShowDetailModal = (0, import_react.useCallback)(() => setShowDetailModal(true), []);
	const handleScrollLeft = (0, import_react.useCallback)(() => {
		if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({
			left: -350,
			behavior: "smooth"
		});
	}, []);
	const handleScrollRight = (0, import_react.useCallback)(() => {
		if (scrollContainerRef.current) scrollContainerRef.current.scrollBy({
			left: 350,
			behavior: "smooth"
		});
	}, []);
	const formattedBalance = (0, import_react.useMemo)(() => formatCurrency(balance), [balance]);
	const formattedPokok = (0, import_react.useMemo)(() => formatCurrency(simpananPokok), [simpananPokok]);
	const formattedWajib = (0, import_react.useMemo)(() => formatCurrency(simpananWajib), [simpananWajib]);
	const formattedSukarela = (0, import_react.useMemo)(() => formatCurrency(simpananSukarela), [simpananSukarela]);
	const formattedTabungan = (0, import_react.useMemo)(() => formatCurrency(tabunganBalance), [tabunganBalance]);
	const simpananSubItems = (0, import_react.useMemo)(() => [
		{
			label: "Pokok",
			formattedAmount: formattedPokok,
			icon: FaShieldAlt
		},
		{
			label: "Wajib",
			formattedAmount: formattedWajib,
			icon: FaRegMoneyBillAlt
		},
		{
			label: "Sukarela",
			formattedAmount: formattedSukarela,
			icon: FaHandHoldingUsd
		}
	], [
		formattedPokok,
		formattedWajib,
		formattedSukarela
	]);
	const tabunganSubItems = (0, import_react.useMemo)(() => [
		{
			label: "Haji",
			formattedAmount: formatCurrency(tabunganSubItemsData.haji),
			icon: FaUniversity
		},
		{
			label: "Umroh",
			formattedAmount: formatCurrency(tabunganSubItemsData.umroh),
			icon: FaUniversity
		},
		{
			label: "Pendidikan",
			formattedAmount: formatCurrency(tabunganSubItemsData.pendidikan),
			icon: FaUniversity
		},
		{
			label: "Qurban",
			formattedAmount: formatCurrency(tabunganSubItemsData.qurban),
			icon: FaUniversity
		}
	], [tabunganSubItemsData]);
	const jualBeliSubItems = (0, import_react.useMemo)(() => [
		{
			label: "Sisa Cicilan",
			formattedAmount: formatCurrency(jualBeliSisaCicilan),
			icon: FaShoppingCart
		},
		{
			label: "Sudah Dibayar",
			formattedAmount: formatCurrency(jualBeliTerbayar),
			icon: FaShoppingCart
		},
		{
			label: "Belum Dibayar",
			formattedAmount: `${jualBeliBelumDibayar} Cicilan`,
			icon: FaShoppingCart
		}
	], [
		jualBeliSisaCicilan,
		jualBeliTerbayar,
		jualBeliBelumDibayar
	]);
	const pinjamanSubItems = (0, import_react.useMemo)(() => [
		{
			label: "Sisa Cicilan",
			formattedAmount: formatCurrency(pinjamanSisaCicilan),
			icon: FaLayerGroup
		},
		{
			label: "Nominal Cicilan",
			formattedAmount: formatCurrency(pinjamanNominalCicilan),
			icon: FaLayerGroup
		},
		{
			label: "Sudah Dibayar",
			formattedAmount: formatCurrency(pinjamanTerbayar),
			icon: FaLayerGroup
		}
	], [
		pinjamanSisaCicilan,
		pinjamanNominalCicilan,
		pinjamanTerbayar
	]);
	const arisanSubItems = (0, import_react.useMemo)(() => [
		{
			label: "Total Arisan Diikuti",
			formattedAmount: `${arisanDiikutiCount} Program`,
			icon: FaLayerGroup
		},
		{
			label: "Total Tagihan",
			formattedAmount: formatCurrency(arisanTagihan),
			icon: FaLayerGroup
		},
		{
			label: "Belum Dibayar",
			formattedAmount: formatCurrency(arisanSisaCicilan),
			icon: FaRegMoneyBillAlt
		}
	], [
		arisanDiikutiCount,
		arisanTagihan,
		arisanSisaCicilan
	]);
	const investasiSubItems = (0, import_react.useMemo)(() => [{
		label: "Sukuk",
		formattedAmount: formatCurrency(totalInvestasi),
		icon: FaChartLine
	}], [totalInvestasi]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "financial-section mb-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "financial-placeholder placeholder-glow p-4 rounded-4" })
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "financial-section mb-4 dash-fade-in position-relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialScrollButtons, {
			onScrollLeft: handleScrollLeft,
			onScrollRight: handleScrollRight
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			ref: scrollContainerRef,
			className: "d-flex flex-nowrap overflow-auto gap-3 pb-3 custom-scrollbar financial-scroll-container",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL SIMPANAN",
					icon: FaWallet,
					formattedAmount: formattedBalance,
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					onDetail: handleShowDetailModal,
					subItems: simpananSubItems,
					variant: "simpanan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL JUAL BELI",
					icon: FaShoppingCart,
					formattedAmount: formatCurrency(jualBeliBalance),
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					subItems: jualBeliSubItems,
					variant: "jualbeli"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL PINJAMAN",
					icon: FaLayerGroup,
					formattedAmount: formatCurrency(pinjamanTagihan),
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					subItems: pinjamanSubItems,
					variant: "pinjaman"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL TABUNGAN",
					icon: FaUniversity,
					formattedAmount: formattedTabungan,
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					subItems: tabunganSubItems,
					variant: "tabungan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL ARISAN",
					icon: FaLayerGroup,
					formattedAmount: formatCurrency(arisanTerbayar),
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					subItems: arisanSubItems,
					variant: "arisan"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL PENDANAAN SYARIAH",
					icon: FaHandHoldingUsd,
					formattedAmount: formatCurrency(totalPendanaanSyariah),
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					variant: "investasi"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialCard, {
					title: "TOTAL INVESTASI",
					icon: FaChartLine,
					formattedAmount: formatCurrency(totalInvestasi),
					showBalance,
					onToggleBalance: toggleBalance,
					isRefreshing,
					onRefresh: refresh,
					subItems: investasiSubItems,
					variant: "investasi"
				})
			]
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FinancialDetailModal, {
		show: showDetailModal,
		onHide: () => setShowDetailModal(false),
		details,
		formatCurrency
	})] });
};
var FinancialSection_default = import_react.memo(FinancialSection);
//#endregion
export { FinancialSection_default as default };
