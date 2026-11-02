import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { D as Badge, E as Button, Pn as FaMedal, Pr as useNavigate, S as Card_default, b as Container, bt as FaArrowLeft, dr as FaTrophy, hr as FaUser, l as Row, nr as FaStar, o as Table, x as Col } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as LoadingState } from "./LoadingState-Bg-49PHx.js";
import { t as TrainingService } from "./training.service-Bgth343V.js";
//#region src/pages/training/Ranking/Ranking.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/training/Ranking/Ranking.jsx
var import_jsx_runtime = require_jsx_runtime();
var Ranking = () => {
	const navigate = useNavigate();
	const [rankingList, setRankingList] = (0, import_react.useState)([]);
	const [myRanking, setMyRanking] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		const fetchRankingData = async () => {
			try {
				setLoading(true);
				const [resRankings, resMyRank] = await Promise.all([TrainingService.getRankings(), TrainingService.getMyRanking()]);
				if (resRankings.status) setRankingList(resRankings.data.map((r) => ({
					rank: r.rank_position,
					name: r.member?.full_name || "Peserta",
					score: r.total_score,
					completedModules: r.completed_materials,
					totalModules: 30,
					avatar: null
				})));
				if (resMyRank.status && resMyRank.data) {
					const r = resMyRank.data;
					setMyRanking({
						rank: r.rank_position,
						name: r.member?.full_name || "Anda",
						score: r.total_score,
						completedModules: r.completed_materials,
						totalModules: 30,
						avatar: null
					});
				}
			} catch (err) {
				setError("Gagal memuat data peringkat");
			} finally {
				setLoading(false);
			}
		};
		fetchRankingData();
	}, []);
	const getRankIcon = (rank) => {
		if (rank === 1) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrophy, {
			className: "text-warning",
			size: 24
		});
		if (rank === 2) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMedal, {
			className: "text-secondary",
			size: 24
		});
		if (rank === 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaMedal, {
			className: "text-warning",
			size: 24,
			style: { color: "#cd7f32" }
		});
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "fw-bold",
			children: ["#", rank]
		});
	};
	const handleBack = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "trainingDashboard" })}`);
	}, [navigate]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadingState, {
		size: "lg",
		message: "Memuat papan peringkat...",
		minHeight: "100vh",
		className: "bg-white"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ranking-page-container pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "mt-4 px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "mx-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xs: 12,
					children: [
						error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
							variant: "danger",
							className: "mb-4 rounded-4 shadow-sm border-0",
							children: error
						}),
						myRanking && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
							className: "shadow-lg border-0 mb-4 rounded-4 overflow-hidden",
							style: { background: "linear-gradient(135deg, #02113d 0%, #05246f 100%)" },
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Body, {
								className: "p-4 text-white",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex justify-content-between align-items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex align-items-center",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "me-3",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "bg-white text-primary rounded-circle d-flex align-items-center justify-content-center shadow-sm",
												style: {
													width: "64px",
													height: "64px",
													fontSize: "24px"
												},
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, {})
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
											className: "fw-black mb-1",
											children: myRanking.name
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "mb-0 opacity-75 small",
											children: [
												"Peringkat ke-#",
												myRanking.rank,
												" dari",
												" ",
												rankingList.length > 10 ? rankingList.length : rankingList.length + 5,
												" peserta"
											]
										})] })]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "text-end",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "fw-black h2 mb-0",
											children: myRanking.score
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
											className: "opacity-75 text-uppercase ls-1 fw-bold",
											style: { fontSize: "10px" },
											children: "Poin Akumulasi"
										})]
									})]
								})
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							className: "mb-5 g-4 justify-content-center align-items-end",
							children: rankingList.length > 0 && [
								1,
								0,
								2
							].map((idx) => {
								const item = rankingList[idx];
								if (!item) return null;
								const isFirst = idx === 0;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
									md: idx === 0 ? 5 : idx === 1 ? 4 : 3,
									className: `${idx === 1 ? "order-1" : idx === 0 ? "order-2" : "order-3"}`,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
										className: `podium-card border-0 text-center ${isFirst ? "shadow-lg py-5" : "shadow-sm py-4"}`,
										style: { background: isFirst ? "linear-gradient(135deg, #02113d 0%, #05246f 100%)" : "white" },
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "podium-avatar",
												children: getRankIcon(item.rank)
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
												className: `fw-black mb-1 ${isFirst ? "text-white" : "text-dark-blue"}`,
												children: item.name
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: `fw-bold mb-3 ${isFirst ? "text-info" : "text-primary"}`,
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaStar, { className: "me-1" }),
													" ",
													item.score,
													" Poin"
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
												bg: isFirst ? "info" : "light",
												className: `${isFirst ? "" : "text-muted border"} rounded-pill px-3 py-2`,
												children: [item.completedModules, " Modul Selesai"]
											})
										] })
									})
								}, item.rank);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
							className: "rank-table-card border-0 mb-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
								className: "p-0",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "p-4 border-bottom d-flex justify-content-between align-items-center",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
										className: "fw-black text-dark-blue mb-0 text-uppercase ls-1",
										children: "Papan Peringkat Lengkap"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
										bg: "primary",
										className: "rounded-pill px-3",
										children: [rankingList.length, " Peserta Aktif"]
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "table-responsive",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, {
										hover: true,
										className: "rank-table align-middle mb-0",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "ps-4",
												children: "Rank"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", { children: "Nama Peserta" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "text-center",
												children: "Skor"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "text-center",
												children: "Progress"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
												className: "text-end pe-4",
												children: "Status"
											})
										] }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: rankingList.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
											className: item.name === "Anda" ? "bg-info bg-opacity-10" : "",
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "ps-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "rank-number-badge",
														children: item.rank
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "d-flex align-items-center gap-3",
													children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
														className: "rounded-circle bg-light d-flex align-items-center justify-content-center",
														style: {
															width: 40,
															height: 40
														},
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUser, { className: "text-muted" })
													}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "rank-user-name",
														children: item.name
													})]
												}) }),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
														className: "fw-black text-primary",
														children: item.score
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "text-center",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
														className: "text-muted fw-bold",
														children: [item.completedModules, " Modul"]
													})
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
													className: "text-end pe-4",
													children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
														bg: item.completedModules / 30 * 100 >= 80 ? "success" : item.completedModules / 30 * 100 >= 50 ? "warning" : "secondary",
														className: "rounded-pill px-3",
														children: [Math.round(item.completedModules / 30 * 100), "%"]
													})
												})
											]
										}, item.rank)) })]
									})
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
								variant: "light",
								className: "px-4 py-2 fw-bold text-muted rounded-pill border",
								onClick: handleBack,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, { className: "me-2" }), "Kembali ke Dashboard"]
							})
						})
					]
				})
			})
		})
	});
};
//#endregion
export { Ranking as default };
