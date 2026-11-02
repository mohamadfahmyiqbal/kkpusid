import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime, n as hooks } from "./vendor-rpDlma0K.js";
import { $t as FaDownload, D as Badge, E as Button, Fn as FaMoneyBillWave, Mt as FaCalendarAlt, Pr as useNavigate, S as Card_default, Zn as FaSearch, bt as FaArrowLeft, c as Spinner, g as Form_default, h as InputGroup_default, l as Row, rn as FaExchangeAlt, x as Col } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as DataTable } from "./DataTable-BARwmvUl.js";
import { t as uSimpanan } from "./USimpanan-BSasVMP7.js";
import { t as formatRupiah } from "./formatRupiah-x0ZMkhue.js";
import { t as InformasiRekeningCard } from "./InformasiRekeningCard-1ueVXDAk.js";
//#region src/pages/simpanan/DetailSaldoPage/hooks/useDetailSaldo.js
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
var import_react = /* @__PURE__ */ __toESM(require_react());
var useDetailSaldo = (decodedToken) => {
	const [transactions, setTransactions] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [balanceSummary, setBalanceSummary] = (0, import_react.useState)(null);
	const [searchTerm, setSearchTerm] = (0, import_react.useState)("");
	const [dateRange, setDateRange] = (0, import_react.useState)({
		start: hooks().subtract(1, "month").format("YYYY-MM-DD"),
		end: hooks().format("YYYY-MM-DD")
	});
	const [transactionType, setTransactionType] = (0, import_react.useState)("ALL");
	const { categoryCode, displayName, returnPage } = (0, import_react.useMemo)(() => {
		return {
			categoryCode: decodedToken?.category || "SS_SUKARELA",
			displayName: decodedToken?.displayName || "Simpanan Sukarela",
			returnPage: decodedToken?.return || "simpananPage"
		};
	}, [decodedToken]);
	const fetchData = (0, import_react.useCallback)(async (signal) => {
		setLoading(true);
		setError(null);
		try {
			const [balanceRes, historyRes] = await Promise.all([uSimpanan.getAccountDetail({ category: categoryCode }, { signal }), uSimpanan.getSavingsHistory({
				category: categoryCode,
				start_date: dateRange.start,
				end_date: dateRange.end
			}, { signal })]);
			if (balanceRes.data?.status) setBalanceSummary(balanceRes.data.data);
			if (historyRes.data?.status) setTransactions(historyRes.data.data || []);
		} catch (err) {
			if (err.name !== "AbortError" && !signal?.aborted) {
				console.error("Error fetching detail saldo:", err);
				setError(err.response?.data?.message || "Gagal memuat data transaksi");
			}
		} finally {
			if (!signal?.aborted) setLoading(false);
		}
	}, [categoryCode, dateRange]);
	(0, import_react.useEffect)(() => {
		const controller = new AbortController();
		fetchData(controller.signal);
		return () => {
			controller.abort();
		};
	}, [fetchData]);
	return {
		loading,
		error,
		balanceSummary,
		transactions,
		filteredTransactions: (0, import_react.useMemo)(() => {
			return transactions.filter((transaction) => {
				if (transactionType !== "ALL" && transaction.type !== transactionType) return false;
				if (searchTerm) {
					const searchLower = searchTerm.toLowerCase();
					return transaction.description?.toLowerCase().includes(searchLower) || transaction.reference_no?.toLowerCase().includes(searchLower) || transaction.amount?.toString().includes(searchTerm);
				}
				return true;
			});
		}, [
			transactions,
			searchTerm,
			transactionType
		]),
		summary: (0, import_react.useMemo)(() => {
			let totalDeposit = 0;
			let totalWithdrawal = 0;
			transactions.forEach((transaction) => {
				const type = (transaction.type || "").toUpperCase();
				const isWithdrawal = type === "WITHDRAWAL" || type === "PENARIKAN";
				const isDeposit = type === "DEPOSIT" || type === "SETORAN" || !type && parseFloat(transaction.amount || 0) > 0;
				if (isWithdrawal) totalWithdrawal += parseFloat(transaction.amount || 0);
				else if (isDeposit) totalDeposit += parseFloat(transaction.amount || 0);
			});
			return {
				totalDeposit,
				totalWithdrawal
			};
		}, [transactions]),
		dateRange,
		setDateRange,
		searchTerm,
		setSearchTerm,
		transactionType,
		setTransactionType,
		categoryCode,
		displayName,
		returnPage,
		fetchData
	};
};
//#endregion
//#region src/pages/simpanan/DetailSaldoPage/component/SummaryCard.jsx
var import_jsx_runtime = require_jsx_runtime();
var SummaryCard = ({ summary, balanceSummary, transactionsLength }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "border-0 shadow-sm h-100 rounded-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
			className: "p-4",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold mb-4 text-muted",
					children: "Ringkasan Periode"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted d-block",
						children: "Total Setoran"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-success fw-bold",
						children: ["Rp ", formatRupiah((summary?.totalDeposit ?? 0).toString())]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted d-block",
						children: "Total Penarikan"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-danger fw-bold",
						children: ["Rp ", formatRupiah((summary?.totalWithdrawal ?? 0).toString())]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted d-block",
						children: "Jumlah Transaksi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h4", {
						className: "text-primary fw-bold",
						children: [transactionsLength || 0, " Transaksi"]
					})]
				}),
				balanceSummary && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-4 pt-3 border-top",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted d-block",
						children: "Saldo Akhir"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", {
						className: "fw-bold text-dark",
						children: ["Rp ", formatRupiah(balanceSummary.balance?.toString() || "0")]
					})]
				})
			]
		})
	});
};
//#endregion
//#region src/pages/simpanan/DetailSaldoPage/component/FilterControls.jsx
var FilterControls = ({ searchTerm, setSearchTerm, dateRange, setDateRange, transactionType, setTransactionType }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
		className: "border-0 shadow-sm mb-4 rounded-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
			className: "p-3",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "align-items-center",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 4,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSearch, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							placeholder: "Cari transaksi...",
							value: searchTerm,
							onChange: (e) => setSearchTerm(e.target.value)
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "date",
							value: dateRange.start,
							onChange: (e) => setDateRange({
								...dateRange,
								start: e.target.value
							})
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 3,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InputGroup_default, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InputGroup_default.Text, {
							className: "bg-white",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalendarAlt, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
							type: "date",
							value: dateRange.end,
							onChange: (e) => setDateRange({
								...dateRange,
								end: e.target.value
							})
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 2,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
							value: transactionType,
							onChange: (e) => setTransactionType(e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "ALL",
									children: "Semua Tipe"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "DEPOSIT",
									children: "Setoran"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "WITHDRAWAL",
									children: "Penarikan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "INTEREST",
									children: "Bunga"
								})
							]
						})
					})
				]
			})
		})
	});
};
//#endregion
//#region src/pages/simpanan/DetailSaldoPage/component/TransactionTable.jsx
var TransactionTable = ({ filteredTransactions, handleTransactionClick, transactionsLength, setSearchTerm, setTransactionType }) => {
	const columns = [
		{
			header: "Tanggal",
			headerClassName: "ps-4",
			cellClassName: "ps-4",
			render: (row) => hooks(row.created_at).format("DD/MM/YYYY")
		},
		{
			header: "Keterangan",
			render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "fw-semibold",
				children: row.description || "Transaksi"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: row.notes
			})] })
		},
		{
			header: "No. Referensi",
			render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", { children: row.reference_no || "-" })
		},
		{
			header: "Jenis",
			render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				bg: row.type === "DEPOSIT" ? "success" : row.type === "WITHDRAWAL" ? "danger" : "warning",
				className: "px-3 py-1",
				children: row.type === "DEPOSIT" ? "Setoran" : row.type === "WITHDRAWAL" ? "Penarikan" : "Bunga"
			})
		},
		{
			header: "Jumlah",
			headerClassName: "text-end pe-4",
			cellClassName: "text-end pe-4 fw-bold",
			render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: row.type === "DEPOSIT" ? "text-success" : "text-danger",
				children: [
					row.type === "DEPOSIT" ? "+" : "-",
					" Rp ",
					formatRupiah(row.amount?.toString() || "0")
				]
			})
		},
		{
			header: "Status",
			headerClassName: "text-center",
			cellClassName: "text-center",
			render: (row) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
				bg: row.status === "SUCCESS" ? "success" : row.status === "PENDING" ? "warning" : "secondary",
				className: "px-3",
				children: row.status || "PENDING"
			})
		}
	];
	const emptyState = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "text-center py-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, {
				size: 48,
				className: "text-muted mb-3"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-muted",
				children: "Tidak ada transaksi ditemukan"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline-primary",
				size: "sm",
				onClick: () => {
					setSearchTerm("");
					setTransactionType("ALL");
				},
				children: "Reset Filter"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
		className: "border-0 shadow-sm rounded-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Header, {
				className: "bg-white border-0 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "fw-bold mb-0",
						children: "Riwayat Transaksi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
						bg: "light",
						text: "dark",
						className: "px-3 py-2",
						children: [filteredTransactions.length, " transaksi ditemukan"]
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
				className: "p-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataTable, {
					columns,
					data: filteredTransactions,
					emptyState,
					onRowClick: handleTransactionClick
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Footer, {
				className: "bg-white border-0 py-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex justify-content-between align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
						className: "text-muted",
						children: [
							"Menampilkan ",
							filteredTransactions.length,
							" dari ",
							transactionsLength,
							" transaksi"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline-secondary",
							size: "sm",
							disabled: true,
							children: "Sebelumnya"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline-primary",
							size: "sm",
							disabled: true,
							children: "Selanjutnya"
						})]
					})]
				})
			})
		]
	});
};
//#endregion
//#region src/pages/simpanan/DetailSaldoPage/component/ActionButtons.jsx
var ActionButtons = ({ handlePenarikanClick, handleSetoranClick, fetchData, balanceSummary }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
		className: "mt-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 4,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-primary",
					className: "w-100 d-flex align-items-center justify-content-center py-3",
					onClick: handlePenarikanClick,
					disabled: !balanceSummary?.balance || balanceSummary.balance <= 0,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExchangeAlt, { className: "me-2" }), "Ajukan Penarikan"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 4,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "primary",
					className: "w-100 d-flex align-items-center justify-content-center py-3",
					onClick: handleSetoranClick,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { className: "me-2" }), "Setoran Baru"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				md: 4,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "light",
					className: "w-100 d-flex align-items-center justify-content-center py-3",
					onClick: fetchData,
					children: "Refresh Data"
				})
			})
		]
	});
};
//#endregion
//#region src/pages/simpanan/DetailSaldoPage/page/DetailSaldoPage.jsx
var DetailSaldoPage = ({ decodedToken }) => {
	const navigate = useNavigate();
	const { loading, error, balanceSummary, transactions, filteredTransactions, summary, dateRange, setDateRange, searchTerm, setSearchTerm, transactionType, setTransactionType, categoryCode, displayName, returnPage, fetchData } = useDetailSaldo(decodedToken);
	const handleBack = (0, import_react.useCallback)(() => {
		try {
			navigate(`/${jwtEncode({ page: returnPage })}`);
		} catch (error) {
			console.error("Back navigation error:", error);
			for (const page of [
				"simpananPage",
				"dashboard",
				"landingPage"
			]) try {
				navigate(`/${jwtEncode({ page })}`);
				break;
			} catch {
				continue;
			}
		}
	}, [returnPage, navigate]);
	const handleExport = (0, import_react.useCallback)(() => {
		import_sweetalert2_all.default.fire({
			title: "Perhatian",
			text: "Fitur export akan segera tersedia",
			icon: "info"
		});
	}, []);
	const handleTransactionClick = (0, import_react.useCallback)((transaction) => {
		try {
			navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				transactionId: transaction.id,
				return: "detailSaldoPage",
				category: categoryCode
			})}`);
		} catch (error) {
			console.error("Transaction detail navigation error:", error);
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: "Tidak dapat membuka detail transaksi. Silakan coba lagi.",
				icon: "error"
			});
		}
	}, [categoryCode, navigate]);
	const handlePenarikanClick = (0, import_react.useCallback)(() => {
		try {
			navigate(`/${jwtEncode({
				page: "penarikanSimpananPage",
				category: categoryCode,
				displayName,
				return: "detailSaldoPage"
			})}`);
		} catch (error) {
			console.error("Penarikan navigation error:", error);
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: "Tidak dapat membuka halaman penarikan.",
				icon: "error"
			});
		}
	}, [
		categoryCode,
		displayName,
		navigate
	]);
	const handleSetoranClick = (0, import_react.useCallback)(() => {
		try {
			navigate(`/${jwtEncode({
				page: "billingPage",
				category: categoryCode,
				displayName,
				return: "detailSaldoPage"
			})}`);
		} catch (error) {
			console.error("Setoran navigation error:", error);
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: "Tidak dapat membuka halaman setoran.",
				icon: "error"
			});
		}
	}, [
		categoryCode,
		displayName,
		navigate
	]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vh-100 d-flex flex-column justify-content-center align-items-center bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-muted small",
			children: "Memuat detail saldo..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "container-fluid py-4 bg-light min-vh-100",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "d-flex align-items-center justify-content-between mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "light",
						onClick: handleBack,
						className: "rounded-circle me-3 shadow-sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
						className: "fw-bold mb-0",
						children: "Detail Saldo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
						className: "text-muted",
						children: displayName
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
					variant: "outline-primary",
					onClick: handleExport,
					className: "d-flex align-items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaDownload, { className: "me-2" }), "Export"]
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
				variant: "danger",
				className: "rounded-4 shadow-sm border-0 mb-4",
				children: error
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
				className: "mb-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 8,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InformasiRekeningCard, {
						activeType: categoryCode,
						displayName,
						variant: "primary",
						showActions: false
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 4,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SummaryCard, {
						summary,
						balanceSummary,
						transactionsLength: transactions.length
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilterControls, {
				searchTerm,
				setSearchTerm,
				dateRange,
				setDateRange,
				transactionType,
				setTransactionType
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TransactionTable, {
				filteredTransactions,
				handleTransactionClick,
				transactionsLength: transactions.length,
				setSearchTerm,
				setTransactionType
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActionButtons, {
				handlePenarikanClick,
				handleSetoranClick,
				fetchData,
				balanceSummary
			})
		]
	});
};
//#endregion
export { DetailSaldoPage as default };
