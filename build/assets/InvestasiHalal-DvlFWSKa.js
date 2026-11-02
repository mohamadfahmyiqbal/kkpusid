import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Ft as FaCertificate, Or as FaWallet, Pr as useNavigate, S as Card_default, a as Tabs, b as Container, c as Spinner, l as Row, s as Tab_default, x as Col } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
//#region src/pages/investasi/InvestasiHalal/hooks/useInvestasiData.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var useInvestasiData = () => {
	const [sukukList, setSukukList] = (0, import_react.useState)([]);
	const [portofolioList, setPortofolioList] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchSukukList = (0, import_react.useCallback)(async () => {
		try {
			const response = await api.get("/financing/sukuk/catalog");
			if (response.data.success) setSukukList(response.data.data.map((item) => ({
				id: item.issue_id,
				name: item.issue_name,
				issuer: item.issuer,
				type: item.type,
				coupon: item.coupon,
				startDate: item.start_date,
				maturity: item.end_date,
				totalAmount: item.total_amount,
				minInvestment: item.min_investment,
				price: item.price,
				status: item.status
			})));
			else throw new Error(response.data.message || "Gagal mengambil data katalog sukuk");
		} catch (err) {
			console.error("Error fetching sukuk catalog:", err);
			throw err;
		}
	}, []);
	const fetchPortofolioList = (0, import_react.useCallback)(async () => {
		try {
			const response = await api.get("/financing/sukuk/portfolio");
			if (response.data.success) setPortofolioList(response.data.data);
			else throw new Error(response.data.message || "Gagal mengambil data portofolio sukuk");
		} catch (err) {
			console.error("Error fetching sukuk portfolio:", err);
			throw err;
		}
	}, []);
	const loadAllData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			await Promise.all([fetchSukukList(), fetchPortofolioList()]);
		} catch (err) {
			setError("Gagal memuat data investasi. Silakan coba lagi nanti.");
		} finally {
			setLoading(false);
		}
	}, [fetchSukukList, fetchPortofolioList]);
	(0, import_react.useEffect)(() => {
		loadAllData();
	}, [loadAllData]);
	return {
		sukukList,
		portofolioList,
		loading,
		error,
		refreshData: loadAllData
	};
};
//#endregion
//#region src/pages/investasi/InvestasiHalal/InvestasiHalal.jsx
var import_jsx_runtime = require_jsx_runtime();
var InvestasiHalal = () => {
	const navigate = useNavigate();
	const [activeTab, setActiveTab] = (0, import_react.useState)("sukuk");
	const { sukukList, portofolioList, loading, error } = useInvestasiData();
	const activePortofolio = import_react.useMemo(() => {
		return portofolioList.filter((item) => [
			"pending",
			"ready_to_pay",
			"paid",
			"approved",
			"completed"
		].includes(item.status));
	}, [portofolioList]);
	const formatCurrency = (0, import_react.useCallback)((value) => {
		return new Intl.NumberFormat("id-ID").format(value);
	}, []);
	const formatDate = (0, import_react.useCallback)((dateString) => {
		return new Date(dateString).toLocaleDateString("id-ID", {
			day: "numeric",
			month: "long",
			year: "numeric"
		});
	}, []);
	const handleBack = (0, import_react.useCallback)(() => {
		navigate("/investasiPage");
	}, [navigate]);
	const calculateTenor = (start, end) => {
		if (!start || !end) return "-";
		const startDate = new Date(start);
		const endDate = new Date(end);
		let months = (endDate.getFullYear() - startDate.getFullYear()) * 12;
		months -= startDate.getMonth();
		months += endDate.getMonth();
		return `${months > 0 ? months : 1} Bulan`;
	};
	const handleInvestSukuk = (0, import_react.useCallback)((sukukId) => {
		navigate(`/${jwtEncode({
			page: "detailSukuk",
			sukukId
		})}`);
	}, [navigate]);
	const handleRedeem = (0, import_react.useCallback)((portofolioId) => {
		navigate(`/${jwtEncode({
			page: "pengembalianModal",
			portofolioId
		})}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column justify-content-center align-items-center vh-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "success"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "Memuat data investasi..."
		})]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "investasi-halal-container",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
			fluid: true,
			className: "px-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "investasi-halal-hero",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "investasi-halal-hero-content",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "investasi-halal-icon-wrap",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCertificate, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "investasi-halal-title",
						children: "Investasi Halal"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "investasi-halal-subtitle",
						children: "Temukan peluang investasi yang aman dan menguntungkan dalam produk Sukuk syariah. Tumbuhkan aset Anda dengan penuh keberkahan dan transparansi."
					})] })]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					lg: 12,
					children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
						variant: "danger",
						className: "mb-4 rounded-4 border-0 shadow-sm",
						children: error
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
						className: "halal-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tabs, {
								activeKey: activeTab,
								onSelect: (k) => setActiveTab(k),
								className: "halal-tabs mb-4",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tab_default, {
									eventKey: "sukuk",
									title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCertificate, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Katalog Produk" })]
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "fw-bold mb-3 mt-2 text-dark",
											children: "Daftar Sukuk Tersedia"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: sukukList.map((sukuk) => {
												return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
													lg: 4,
													md: 6,
													sm: 12,
													className: "mb-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
														className: "h-100 shadow-sm border-0 sukuk-item-card",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
															className: "d-flex flex-column p-4",
															children: [
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "d-flex justify-content-between align-items-start mb-3",
																	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
																		className: "fw-bold text-dark mb-1",
																		children: sukuk.name
																	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
																		className: "text-muted",
																		children: sukuk.issuer
																	})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																		className: "badge-soft-success px-2 py-1",
																		children: sukuk.type === "Sukuk Ritel" ? "Ijarah" : "Mudharabah"
																	})]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																	className: "sukuk-details mb-4 flex-grow-1",
																	children: [
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "d-flex justify-content-between align-items-center mb-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-muted small",
																				children: "Kategori"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "fw-bold text-dark",
																				children: sukuk.type
																			})]
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "d-flex justify-content-between align-items-center mb-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-muted small",
																				children: "Nilai Pendanaan"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																				className: "fw-bold text-dark",
																				children: ["Rp ", formatCurrency(sukuk.totalAmount || 0)]
																			})]
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "d-flex justify-content-between align-items-center mb-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-muted small",
																				children: "Minimum Investasi"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																				className: "fw-bold text-dark",
																				children: ["Rp ", formatCurrency(sukuk.minInvestment || 0)]
																			})]
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "d-flex justify-content-between align-items-center mb-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-muted small",
																				children: "Tenor"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "fw-bold text-dark",
																				children: calculateTenor(sukuk.startDate, sukuk.maturity)
																			})]
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "d-flex justify-content-between align-items-center mb-2",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-muted small",
																				children: "Jenis Bisnis"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "fw-bold text-dark",
																				children: "Infrastruktur"
																			})]
																		}),
																		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																			className: "d-flex justify-content-between align-items-center",
																			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "text-muted small",
																				children: "Status Bisnis"
																			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																				className: "fw-bold text-dark",
																				children: "Berjalan"
																			})]
																		})
																	]
																}),
																/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																	className: "mt-auto",
																	children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																		className: "btn btn-invest w-100 py-2 rounded-3 fw-bold",
																		onClick: () => handleInvestSukuk(sukuk.id),
																		children: "Detail Sukuk"
																	})
																})
															]
														})
													})
												}, sukuk.id);
											}) })
										}),
										sukukList.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center py-5 text-muted",
											children: "Tidak ada produk sukuk tersedia saat ini"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Tab_default, {
									eventKey: "portofolio",
									title: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Portofolio Saya" })]
									}),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "fw-bold mb-3 mt-2 text-dark",
											children: "Portofolio Investasi Anda"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: activePortofolio.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
												lg: 4,
												md: 6,
												sm: 12,
												className: "mb-4",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
													className: "h-100 shadow-sm border-0 sukuk-item-card",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
														className: "d-flex flex-column p-4",
														children: [
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "d-flex justify-content-between align-items-start mb-3",
																children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
																	className: "fw-bold text-dark mb-1",
																	children: item.name
																}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
																	className: "text-muted",
																	children: ["Tgl Beli: ", formatDate(item.purchaseDate)]
																})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																	className: "badge-soft-success px-2 py-1",
																	children: "Aktif"
																})]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																className: "sukuk-details mb-4 flex-grow-1",
																children: [
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "d-flex justify-content-between align-items-center mb-2",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-muted small",
																			children: "Unit Dimiliki"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "fw-bold text-dark",
																			children: item.units
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "d-flex justify-content-between align-items-center mb-2",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-muted small",
																			children: "Harga Beli"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: "fw-bold text-dark",
																			children: [item.purchasePrice, "%"]
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "d-flex justify-content-between align-items-center mb-2",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-muted small",
																			children: "Nilai Saat Ini"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: "fw-bold text-dark",
																			children: [item.currentValue, "%"]
																		})]
																	}),
																	/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
																		className: "d-flex justify-content-between align-items-center",
																		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																			className: "text-muted small",
																			children: "Keuntungan"
																		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																			className: "fw-bold text-success",
																			children: [
																				"+",
																				item.profit,
																				"%"
																			]
																		})]
																	})
																]
															}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
																className: "mt-auto",
																children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																	className: "btn-redeem w-100 py-2 rounded-3 fw-bold",
																	onClick: () => handleRedeem(item.id),
																	children: "Pencairan Dana"
																})
															})
														]
													})
												})
											}, item.id)) })
										}),
										activePortofolio.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-center py-5 text-muted",
											children: "Anda belum memiliki portofolio sukuk"
										})
									]
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-4 pt-3 border-top text-end",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "btn btn-light px-4 py-2 fw-bold text-muted",
									onClick: handleBack,
									style: { borderRadius: "8px" },
									children: "Kembali ke Pusat"
								})
							})]
						})
					})]
				})
			})]
		})
	});
};
//#endregion
export { InvestasiHalal as default };
