import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, S as Card_default, an as FaExclamationTriangle, bn as FaHistory, c as Spinner, f as Nav_default, g as Form_default, ht as MdStars, in as FaExclamationCircle, j as MdAccountBalanceWallet, lt as MdSavings, m as ListGroup_default, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as uBilling } from "./UBilling-DLTCHisI.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as Pagination } from "./Pagination-vCZxXKAR.js";
import { t as uSimpanan } from "./USimpanan-BSasVMP7.js";
import { t as InformasiRekeningCard } from "./InformasiRekeningCard-1ueVXDAk.js";
//#region src/pages/global/BillingPage/components/BillList.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var BillList = ({ bills, selectedBills = [], setSelectedBills, totalAmount, handleNavigateToInvoice, isSubmitting, loadingData, disabledBills = [] }) => {
	const safeBills = (0, import_react.useMemo)(() => Array.isArray(bills) ? bills : [], [bills]);
	const [currentPage, setCurrentPage] = (0, import_react.useState)(1);
	const itemsPerPage = 5;
	const totalPages = Math.ceil(safeBills.length / itemsPerPage);
	const currentBills = (0, import_react.useMemo)(() => {
		const startIndex = (currentPage - 1) * itemsPerPage;
		return safeBills.slice(startIndex, startIndex + itemsPerPage);
	}, [safeBills, currentPage]);
	const allSelected = safeBills.length > 0 && selectedBills.length === safeBills.length;
	const handlePageChange = (page) => {
		setCurrentPage(page);
	};
	const handleToggleBill = (0, import_react.useCallback)((billId) => {
		if (disabledBills.includes(billId)) return;
		setSelectedBills((prev) => prev.includes(billId) ? prev.filter((id) => id !== billId) : [...prev, billId]);
	}, [disabledBills, setSelectedBills]);
	const handleSelectAll = (0, import_react.useCallback)(() => {
		if (allSelected) setSelectedBills([]);
		else setSelectedBills(safeBills.map((b) => b.bill_item_id));
	}, [
		allSelected,
		safeBills,
		setSelectedBills
	]);
	if (loadingData) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
		className: "bg-primary text-white py-3 px-4 d-flex align-items-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "fw-bold",
			style: { fontSize: "15px" },
			children: "Daftar Tagihan"
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
		className: "p-5 text-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-muted mt-3 small",
			children: "Memuat tagihan..."
		})]
	})] });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Header, {
		className: "bg-primary text-white py-3 px-4 d-flex justify-content-between align-items-center",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "fw-bold",
			style: { fontSize: "15px" },
			children: "Daftar Tagihan"
		}), safeBills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Check, {
			type: "checkbox",
			id: "select-all-bills",
			label: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "fw-bold small text-white",
				children: "Pilih Semua"
			}),
			checked: allSelected,
			onChange: handleSelectAll,
			className: "mb-0"
		})]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
		className: "p-0",
		children: safeBills.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-bill-scroll",
				style: {
					maxHeight: "350px",
					overflowY: "auto"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default, {
					variant: "flush",
					children: currentBills.map((bill) => {
						const isDisabled = disabledBills.includes(bill.bill_item_id);
						const isChecked = selectedBills.includes(bill.bill_item_id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListGroup_default.Item, {
							className: `py-3 px-4 border-bottom border-light bp-bill-item ${isChecked ? "bp-bill-selected" : ""}`,
							action: !isDisabled,
							onClick: () => handleToggleBill(bill.bill_item_id),
							disabled: isDisabled,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Check, {
										type: "checkbox",
										id: `bill-${bill.bill_item_id}`,
										checked: isChecked,
										disabled: isDisabled,
										onChange: () => handleToggleBill(bill.bill_item_id),
										className: "mb-0",
										onClick: (e) => e.stopPropagation()
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex-grow-1 min-w-0",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "fw-bold text-dark small",
												children: bill.description || bill.type?.type_name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-primary fw-bold",
												children: [
													"Rp",
													" ",
													parseFloat(bill.amount || 0).toLocaleString("id-ID")
												]
											}),
											bill.due_date && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "text-muted",
												style: { fontSize: "11px" },
												children: [
													"Jatuh tempo:",
													" ",
													new Date(bill.due_date).toLocaleDateString("id-ID", {
														month: "short",
														year: "numeric"
													})
												]
											})
										]
									}),
									isChecked && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
										className: "text-success flex-shrink-0",
										size: 16
									})
								]
							})
						}, bill.bill_item_id);
					})
				})
			}),
			totalPages > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-3 pb-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, {
					currentPage,
					totalPages,
					onPageChange: handlePageChange,
					totalItems: bills.length,
					itemsPerPage: 5
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-4 bg-white border-top shadow-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted fw-semibold",
						style: { fontSize: "13px" },
						children: [
							"Total Terpilih (",
							selectedBills.length,
							"):"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "fw-bold text-primary",
						style: { fontSize: "18px" },
						children: ["Rp ", (totalAmount || 0).toLocaleString("id-ID")]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "primary",
					className: "w-100 fw-bold py-2 rounded-12 shadow-sm",
					onClick: handleNavigateToInvoice,
					disabled: selectedBills.length === 0 || isSubmitting,
					children: isSubmitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						animation: "border",
						size: "sm",
						className: "me-2"
					}), "Memproses..."] }) : "Bayar Sekarang"
				})]
			})
		] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "p-5 text-center text-muted",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {
				className: "mb-2 opacity-50",
				size: 28
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-0 small",
				children: "Tidak ada tagihan tertunda."
			})]
		})
	})] });
};
var BillList_default = import_react.memo(BillList);
//#endregion
//#region src/pages/global/BillingPage/components/HistoryList.jsx
var HistoryList = ({ history }) => {
	const safeHistory = Array.isArray(history) ? history : [];
	const hasHistory = safeHistory.length > 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "border-0 shadow-sm rounded-20 overflow-hidden",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Header, {
			className: "bg-dark text-white py-3 px-4 d-flex align-items-center gap-2",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, { size: 14 }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "fw-bold",
					style: { fontSize: "15px" },
					children: "Histori Transaksi"
				}),
				hasHistory && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ms-auto text-white-50 small",
					children: [safeHistory.length, " transaksi"]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
			className: "p-0",
			children: hasHistory ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bp-history-scroll",
				children: safeHistory.map((item) => {
					const itemKey = item.id || item.bill_item_id || `${item.createdAt}-${item.amount}-${Math.random()}`;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "bp-history-item d-flex align-items-center gap-3 p-3 px-4 border-bottom border-light",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "bp-history-icon",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, {
									className: "text-success",
									size: 16
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex-grow-1 min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "fw-bold text-dark small text-truncate",
										children: item.description || "Transaksi"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-success fw-bold small",
										children: [
											"Rp",
											" ",
											parseFloat(item.amount || 0).toLocaleString("id-ID")
										]
									}),
									item.createdAt && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "text-muted",
										style: { fontSize: "10px" },
										children: new Date(item.createdAt).toLocaleDateString("id-ID", {
											day: "2-digit",
											month: "short",
											year: "numeric",
											hour: "2-digit",
											minute: "2-digit"
										})
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								bg: "success",
								className: "fw-normal rounded-pill flex-shrink-0",
								style: { fontSize: "10px" },
								children: "Lunas"
							})
						]
					}, itemKey);
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "p-5 text-center text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, {
					className: "mb-2 opacity-25",
					size: 28
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mb-0 small",
					children: "Belum ada transaksi."
				})]
			})
		})]
	});
};
var HistoryList_default = import_react.memo(HistoryList);
//#endregion
//#region src/pages/simpanan/SimpananPage/components/SimpananBillingTabs.jsx
var SimpananBillingTabs = ({ activeType }) => {
	const [activeTab, setActiveTab] = (0, import_react.useState)("pending");
	const [bills, setBills] = (0, import_react.useState)([]);
	const [history, setHistory] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const loadData = (0, import_react.useCallback)(async () => {
		if (!activeType) return;
		setLoading(true);
		try {
			const filter = { category: activeType };
			const [resPending, resHistory] = await Promise.all([uBilling.getPendingBills(filter), uBilling.getBillingHistory(filter)]);
			const processBills = (res) => {
				if (res.data?.status) {
					let rawData = Array.isArray(res.data.data) ? res.data.data : [];
					const activeUpper = (activeType || "").toUpperCase();
					return rawData.filter((bill) => {
						const billCat = (bill.category_code || "").toUpperCase();
						if (billCat && (billCat === activeUpper || activeUpper.includes(billCat) || billCat.includes(activeUpper))) return true;
						if (bill.items && Array.isArray(bill.items)) return bill.items.some((item) => {
							const itemCat = (item.category_code || "").toUpperCase();
							return itemCat && (itemCat === activeUpper || activeUpper.includes(itemCat) || itemCat.includes(activeUpper));
						});
						if (activeUpper.includes("POKOK") && (billCat.includes("POKOK") || bill.description?.toUpperCase().includes("POKOK"))) return true;
						if (activeUpper.includes("WAJIB") && (billCat.includes("WAJIB") || bill.description?.toUpperCase().includes("WAJIB"))) return true;
						if (activeUpper.includes("SUKARELA") && (billCat.includes("SUKARELA") || bill.description?.toUpperCase().includes("SUKARELA"))) return true;
						return false;
					});
				}
				return [];
			};
			setBills(processBills(resPending));
			setHistory(processBills(resHistory));
		} catch (err) {
			console.error("Failed to load bills/history:", err);
		} finally {
			setLoading(false);
		}
	}, [activeType]);
	(0, import_react.useEffect)(() => {
		loadData();
	}, [loadData]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mt-4 text-center p-4 bg-white rounded-4 shadow-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary",
			size: "sm"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 mb-0 small text-muted",
			children: "Memuat data transaksi..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "border-0 shadow-sm rounded-4 mt-4 overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
				className: "bg-white border-bottom-0 pt-4 pb-0 px-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Nav_default, {
					variant: "pills",
					className: "custom-nav-pills gap-2 pb-3",
					style: {
						flexWrap: "nowrap",
						overflowX: "auto"
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Nav_default.Link, {
						active: activeTab === "pending",
						onClick: () => setActiveTab("pending"),
						className: "d-flex align-items-center gap-2 rounded-pill px-4 py-2",
						style: {
							fontWeight: "600",
							whiteSpace: "nowrap",
							transition: "all 0.2s"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationCircle, {}),
							"Tagihan",
							bills.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "badge bg-danger rounded-pill ms-1",
								children: bills.length
							})
						]
					}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Nav_default.Item, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Nav_default.Link, {
						active: activeTab === "history",
						onClick: () => setActiveTab("history"),
						className: "d-flex align-items-center gap-2 rounded-pill px-4 py-2",
						style: {
							fontWeight: "600",
							whiteSpace: "nowrap",
							transition: "all 0.2s"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, {}), "Riwayat"]
					}) })]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
				className: "p-0 bg-light",
				children: [activeTab === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BillList_default, { bills })
				}), activeTab === "history" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "p-3",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HistoryList_default, { history })
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .custom-nav-pills .nav-link {
          color: #64748b;
          background: #f1f5f9;
          border: 1px solid transparent;
        }
        .custom-nav-pills .nav-link:hover {
          background: #e2e8f0;
          color: #334155;
        }
        .custom-nav-pills .nav-link.active {
          color: #fff;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          box-shadow: 0 4px 12px rgba(15, 23, 42, 0.15);
        }
        .custom-nav-pills::-webkit-scrollbar {
          display: none;
        }
      ` })
		]
	});
};
//#endregion
//#region src/pages/simpanan/SimpananPage/page/SimpananPage.jsx
/**
* Skeleton Loader untuk SimpananPage
*/
var SimpananSkeleton = () => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
	className: "animate-pulse",
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "simpanan-tabs-container mb-4 px-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "d-flex flex-column flex-md-row gap-2 overflow-hidden pb-2 simpanan-scroll-hide",
			children: [
				1,
				2,
				3
			].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "bg-light rounded-pill simpanan-skeleton-tab",
				style: { border: "1px solid #f1f5f9" }
			}, i))
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "px-2",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "w-100 shadow-sm",
			style: {
				height: "280px",
				borderRadius: "24px",
				background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)"
			}
		})
	})]
});
var SimpananPage = ({ decodedToken }) => {
	const [categories, setCategories] = (0, import_react.useState)([]);
	const [activeTab, setActiveTab] = (0, import_react.useState)({
		code: null,
		name: null
	});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const abortControllerRef = (0, import_react.useRef)(new AbortController());
	const fetchMasterProducts = (0, import_react.useCallback)(async () => {
		const controller = abortControllerRef.current;
		try {
			setLoading(true);
			setError(null);
			const response = await uSimpanan.getProducts({ signal: controller.signal });
			if (response.data?.status) {
				const products = response.data.data;
				setCategories(products);
				if (products.length > 0) {
					const targetCode = decodedToken?.activeTab;
					let targetProduct = null;
					if (targetCode) {
						const targetUpper = targetCode.toString().toUpperCase();
						targetProduct = products.find((p) => p.product_code === targetCode || p.product_code?.toUpperCase().includes(targetUpper) || targetUpper.includes(p.product_code?.toUpperCase()) || targetUpper.includes("WAJIB") && p.product_code?.toUpperCase().includes("WAJIB") || targetUpper.includes("POKOK") && p.product_code?.toUpperCase().includes("POKOK") || targetUpper.includes("SUKARELA") && p.product_code?.toUpperCase().includes("SUKARELA"));
					}
					if (targetProduct) setActiveTab({
						code: targetProduct.product_code,
						name: targetProduct.product_name
					});
					else setActiveTab({
						code: products[0].product_code,
						name: products[0].product_name
					});
				}
			} else setError("Gagal memuat kategori simpanan.");
		} catch (err) {
			if (err.name !== "AbortError") {
				console.error("Error Fetching Products:", err);
				setError(err.response?.data?.message || "Gagal terhubung ke server.");
			}
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchMasterProducts();
		const controller = abortControllerRef.current;
		return () => {
			controller.abort();
		};
	}, [fetchMasterProducts]);
	const getProductIcon = (code) => {
		if (code?.includes("POKOK")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdStars, { size: 18 });
		if (code?.includes("WAJIB")) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccountBalanceWallet, { size: 18 });
		return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdSavings, { size: 18 });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "simpanan-page-container pb-5",
		children: [
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
				variant: "danger",
				className: "mx-2 shadow-sm rounded-4 border-0 animate-fade-in",
				children: error
			}),
			loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpananSkeleton, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "simpanan-tabs-container mb-4 px-2",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "d-flex flex-column flex-md-row gap-2 overflow-auto pb-2 simpanan-scroll-hide",
					children: categories.map((cat) => {
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							onClick: () => setActiveTab({
								code: cat.product_code,
								name: cat.product_name
							}),
							className: `simpanan-tab-btn ${activeTab.code === cat.product_code ? "active" : ""}`,
							children: [getProductIcon(cat.product_code), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: cat.product_name })]
						}, cat.product_code);
					})
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "px-2 animate-fade-in",
				children: activeTab.code ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InformasiRekeningCard, {
					activeType: activeTab.code,
					displayName: activeTab.name,
					fromPage: "simpananPage"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimpananBillingTabs, { activeType: activeTab.code })] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center py-5 bg-light rounded-4 text-muted",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdSavings, {
						size: 48,
						className: "opacity-20 mb-3"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-0",
						children: "Data simpanan tidak tersedia."
					})]
				})
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .simpanan-scroll-hide::-webkit-scrollbar {
          display: none;
        }
        .simpanan-scroll-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }

        .simpanan-tab-btn {
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

        .simpanan-skeleton-tab {
          width: 100%;
          height: 40px;
        }
        @media (min-width: 768px) {
          .simpanan-skeleton-tab {
            width: 120px;
          }
        }

        .simpanan-tab-btn:hover {
          background: #f8fafc;
          border-color: #e2e8f0;
          color: #334155;
        }

        .simpanan-tab-btn.active {
          background: #005a8d;
          border-color: #005a8d;
          color: white;
          box-shadow: 0 4px 12px rgba(0, 90, 141, 0.2);
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .5; }
        }

        .animate-fade-in {
          animation: fadeIn 0.4s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      ` })
		]
	});
};
//#endregion
export { SimpananPage as default };
