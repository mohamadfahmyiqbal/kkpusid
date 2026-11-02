import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Bn as FaPlus, D as Badge, E as Button, Fn as FaMoneyBillWave, Or as FaWallet, Ot as FaBriefcase, Pr as useNavigate, S as Card_default, ar as FaSyncAlt, b as Container, bn as FaHistory, cr as FaTimesCircle, l as Row, qt as FaClock, rr as FaStore, wn as FaInfoCircle, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { t as api } from "./common-qX05v8MF.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as LoadingState } from "./LoadingState-Bg-49PHx.js";
//#region src/pages/investasi/PendanaanSyariah/hooks/usePendanaanData.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var usePendanaanData = () => {
	const [pengajuanData, setPengajuanData] = (0, import_react.useState)(null);
	const [hasPengajuan, setHasPengajuan] = (0, import_react.useState)(false);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const fetchPengajuanData = (0, import_react.useCallback)(async () => {
		setLoading(true);
		setError(null);
		try {
			const historyResponse = await api.get("/financing/history");
			if (!historyResponse.data.status) throw new Error(historyResponse.data.message);
			const history = historyResponse.data.data || [];
			if (history.length > 0) {
				setHasPengajuan(true);
				const latestId = history[0].financing_id || history[0].id;
				const detailResponse = await api.get(`/financing/detail/${latestId}`);
				if (detailResponse.data.status) setPengajuanData(detailResponse.data.data);
				else setPengajuanData(history[0]);
			} else {
				setHasPengajuan(false);
				setPengajuanData(null);
			}
		} catch (err) {
			console.error("[usePendanaanData]", err);
			setError("Gagal memuat data pendanaan. Silakan coba lagi.");
		} finally {
			setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchPengajuanData();
	}, [fetchPengajuanData]);
	return {
		pengajuanData,
		hasPengajuan,
		loading,
		error,
		refreshData: fetchPengajuanData
	};
};
//#endregion
//#region src/pages/investasi/PendanaanSyariah/PendanaanSyariah.jsx
var import_jsx_runtime = require_jsx_runtime();
var PendanaanSyariah = () => {
	const navigate = useNavigate();
	const { pengajuanData, hasPengajuan, loading, error, refreshData } = usePendanaanData();
	const formatCurrency = (0, import_react.useCallback)((value) => {
		return new Intl.NumberFormat("id-ID").format(value);
	}, []);
	const handlePengajuanBaru = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "formPendanaanSyariah" })}`);
	}, [navigate]);
	const handleViewPortofolio = (0, import_react.useCallback)(() => {}, []);
	const handleSetoran = (0, import_react.useCallback)(() => {
		if (!pengajuanData?.financing_id) return;
		navigate(`/${jwtEncode({
			page: "billingPage",
			return: "investasiPage",
			category: "FINANCING",
			financingId: pengajuanData.financing_id,
			productName: pengajuanData.category || "Pembiayaan"
		})}`);
	}, [navigate, pengajuanData]);
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "investasiPage" })}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
		message: "Memuat data pendanaan...",
		minHeight: "100vh",
		className: "bg-light"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "investasi-wrapper pb-5 bg-light min-vh-100",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "px-0 mt-4 font-outfit",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				lg: 12,
				children: [
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
						variant: "danger",
						className: "mb-4 shadow-sm border-0 rounded-4 d-flex align-items-center justify-content-between p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex align-items-center",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { className: "fs-4 me-3" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "fw-medium",
								children: error
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							size: "sm",
							variant: "outline-danger",
							className: "rounded-pill px-3",
							onClick: refreshData,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaSyncAlt, { className: "me-2" }), " Coba Lagi"]
						})]
					}),
					!hasPengajuan ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card mb-4",
						style: {
							background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
							boxShadow: "0 20px 40px -10px rgba(7, 89, 133, 0.3)",
							borderRadius: "16px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5 relative card-body-front text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "d-flex justify-content-center mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect bg-white bg-opacity-10 border border-white border-opacity-25",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaStore, {
											size: 14,
											className: "text-light"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "fw-bold tracking-wider card-type-label",
											style: {
												letterSpacing: "1px",
												fontSize: "11px"
											},
											children: "PENGAJUAN BARU"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "text-white mb-3",
									style: { fontSize: "60px" },
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaStore, { className: "opacity-75" })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
									className: "fw-bold mb-3 text-white",
									children: "Mulai Ajukan Pendanaan"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-white opacity-75 mb-4 mx-auto",
									style: { maxWidth: "600px" },
									children: "Anda belum memiliki pengajuan pendanaan aktif. Ajukan pendanaan baru untuk usaha Anda dan dapatkan bantuan permodalan dengan prinsip syariah yang adil dan menentramkan."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "light",
									className: "px-4 py-2 fw-bold rounded-pill text-primary shadow-sm transition-transform hover-scale mt-2",
									onClick: handlePengajuanBaru,
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaPlus, { className: "me-2 mb-1" }), "Ajukan Pendanaan Sekarang"]
								})
							]
						})]
					}) : pengajuanData?.status === "PENDING" || pengajuanData?.status === "REVIEW" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card mb-4",
						style: {
							background: "linear-gradient(135deg, #92400e 0%, #d97706 40%, #f59e0b 100%)",
							boxShadow: "0 20px 40px -10px rgba(217, 119, 6, 0.3)",
							borderRadius: "16px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5 relative card-body-front",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "d-flex justify-content-center mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect bg-white bg-opacity-10 border border-white border-opacity-25",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHistory, {
											size: 14,
											className: "text-light"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "fw-bold tracking-wider card-type-label",
											style: {
												letterSpacing: "1px",
												fontSize: "11px"
											},
											children: "STATUS PENGAJUAN"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "text-center mb-5",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
										className: "fw-bold mb-3 text-white",
										children: "Pengajuan Dalam Proses"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-white opacity-75 mx-auto",
										style: { maxWidth: "650px" },
										children: [
											"Pengajuan ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: pengajuanData.category || "Pembiayaan" }),
											" Anda sedang dalam tahap tinjauan pengurus. Berikut adalah detail status persetujuan saat ini:"
										]
									})]
								}),
								pengajuanData?.approvalChain && pengajuanData.approvalChain.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mx-auto",
									style: { maxWidth: "800px" },
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
										className: "fw-bold mb-4 text-white d-flex align-items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-white opacity-75 me-2" }), " Riwayat Persetujuan"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "bg-white bg-opacity-10 border border-white border-opacity-25 rounded-4 p-4 shadow-sm text-start",
										children: pengajuanData.approvalChain.map((step, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `d-flex align-items-start ${idx !== pengajuanData.approvalChain.length - 1 ? "mb-4 position-relative" : ""}`,
											children: [
												idx !== pengajuanData.approvalChain.length - 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "position-absolute bg-white bg-opacity-25",
													style: {
														width: "2px",
														height: "100%",
														left: "15px",
														top: "30px",
														zIndex: 0
													}
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "position-relative z-1",
													style: { paddingRight: "15px" },
													children: step.decision === "APPROVED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-success rounded-circle d-flex align-items-center justify-content-center",
														style: {
															width: "32px",
															height: "32px"
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-white" })
													}) : step.decision === "REJECTED" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-danger rounded-circle d-flex align-items-center justify-content-center",
														style: {
															width: "32px",
															height: "32px"
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimesCircle, { className: "text-white" })
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "bg-white bg-opacity-25 rounded-circle d-flex align-items-center justify-content-center",
														style: {
															width: "32px",
															height: "32px"
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaClock, { className: "text-white" })
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "flex-grow-1",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
														className: "d-flex justify-content-between align-items-center mb-1",
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
															className: "fw-bold text-white fs-5",
															children: step.role || step.stepName
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
															bg: step.decision === "APPROVED" ? "success" : step.decision === "REJECTED" ? "danger" : "light",
															className: step.decision === "PENDING" || !step.decision ? "text-dark rounded-pill px-3 py-2" : "rounded-pill px-3 py-2",
															children: step.decision || "PENDING"
														})]
													}), step.approverName ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
														className: "text-white opacity-75 mb-0",
														children: ["Ditinjau oleh: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: step.approverName })]
													}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
														className: "text-white opacity-50 mb-0 fst-italic",
														children: "Menunggu tinjauan"
													})]
												})
											]
										}, idx))
									})]
								})
							]
						})]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "premium-card premium-card-active border-0 text-white overflow-hidden shadow-lg animate-fade-in premium-main-card mb-4",
						style: {
							background: "linear-gradient(135deg, #075985 0%, #0369a1 40%, #0ea5e9 100%)",
							boxShadow: "0 20px 40px -10px rgba(7, 89, 133, 0.3)",
							borderRadius: "16px"
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glass-sheen" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5 relative card-body-front",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-wrap justify-content-between align-items-center mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center gap-2 px-3 py-1 rounded-pill blur-effect bg-white bg-opacity-10 border border-white border-opacity-25 mb-2 mb-md-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaWallet, {
											size: 14,
											className: "text-light"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "fw-bold tracking-wider card-type-label",
											style: {
												letterSpacing: "1px",
												fontSize: "11px"
											},
											children: "REKENING PENDANAAN"
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "d-flex align-items-center gap-2",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											bg: "light",
											text: "primary",
											className: "px-3 py-1 rounded-pill fw-bold",
											style: { fontSize: "12px" },
											children: "AKTIF"
										})
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "dc-saldo-display mb-4",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "small text-white-50 mb-1 fw-medium",
										children: "Nilai Pembiayaan"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
										className: "fw-bold mb-0 text-white font-outfit",
										style: { fontSize: "3rem" },
										children: ["Rp ", formatCurrency(pengajuanData?.amount_requested || pengajuanData?.nominal_kredit || 0)]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "row g-4 mb-5 pt-4 border-top border-white border-opacity-25 text-start",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-sm-6 col-md-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-uppercase text-white-50 fw-bold mb-1",
												style: {
													fontSize: "10px",
													letterSpacing: "1px"
												},
												children: "NAMA ANGGOTA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "fw-bold text-white fs-5",
												children: pengajuanData?.member?.full_name || pengajuanData?.nama_nasabah || "-"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-sm-6 col-md-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-uppercase text-white-50 fw-bold mb-1",
												style: {
													fontSize: "10px",
													letterSpacing: "1px"
												},
												children: "AKAD"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "fw-bold text-white fs-5",
												children: pengajuanData?.akad_type || "Mudharabah"
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "col-sm-6 col-md-4",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "text-uppercase text-white-50 fw-bold mb-1",
												style: {
													fontSize: "10px",
													letterSpacing: "1px"
												},
												children: "TANGGAL BUKA"
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "fw-bold text-white fs-5",
												children: pengajuanData?.createdAt ? new Date(pengajuanData.createdAt).toLocaleDateString("id-ID", {
													day: "numeric",
													month: "long",
													year: "numeric"
												}) : pengajuanData?.created_at ? new Date(pengajuanData.created_at).toLocaleDateString("id-ID", {
													day: "numeric",
													month: "long",
													year: "numeric"
												}) : "-"
											})]
										})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-wrap gap-2 pt-4 border-top border-white border-opacity-25 justify-content-start",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "light",
										className: "px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center text-primary transition-transform hover-scale",
										onClick: handleSetoran,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMoneyBillWave, { className: "me-2" }), " Setoran"]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "outline-light",
										className: "px-4 py-2 fw-bold rounded-pill shadow-sm d-flex align-items-center justify-content-center transition-transform hover-scale",
										onClick: handleViewPortofolio,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaBriefcase, { className: "me-2" }), " Portofolio"]
									})]
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "text-center mt-5 mb-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "light",
							className: "px-5 py-3 fw-bold text-secondary rounded-pill shadow-sm bg-white hover-scale border",
							onClick: handleBack,
							children: "Kembali ke Pusat Investasi"
						})
					})
				]
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
        .tracking-wider { letter-spacing: 0.05em; }
        .transition-hover { transition: all 0.3s ease; }
        .transition-hover:hover { transform: translateY(-5px); box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important; }
        .hover-scale { transition: transform 0.2s ease; }
        .hover-scale:hover { transform: scale(1.02); }
      ` })]
	});
};
//#endregion
export { PendanaanSyariah as default };
