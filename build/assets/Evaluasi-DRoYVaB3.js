import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Pr as useNavigate, S as Card_default, Ut as FaChevronLeft, Wt as FaChevronRight, an as FaExclamationTriangle, b as Container, bt as FaArrowLeft, c as Spinner, dr as FaTrophy, l as Row, u as ProgressBar, x as Col, zt as FaCheckCircle } from "./vendor-react-D5pUDmay.js";
import { o as jwtDecodePage, s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as TrainingService } from "./training.service-Bgth343V.js";
//#region src/pages/training/Evaluasi/Evaluasi.css
var import_react = /* @__PURE__ */ __toESM(require_react());
//#endregion
//#region src/pages/training/Evaluasi/Evaluasi.jsx
var import_jsx_runtime = require_jsx_runtime();
var Evaluasi = () => {
	const navigate = useNavigate();
	const [materiData, setMateriData] = (0, import_react.useState)(null);
	const [questions, setQuestions] = (0, import_react.useState)([]);
	const [currentQuestion, setCurrentQuestion] = (0, import_react.useState)(0);
	const [answers, setAnswers] = (0, import_react.useState)({});
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	const [error, setError] = (0, import_react.useState)(null);
	const [showResult, setShowResult] = (0, import_react.useState)(false);
	const [score, setScore] = (0, import_react.useState)(0);
	const [passed, setPassed] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		const pathParts = window.location.pathname.split("/");
		const lastPart = pathParts[pathParts.length - 1];
		try {
			const decoded = jwtDecodePage(lastPart);
			decoded?.kurikulumId;
			const modulId = decoded?.modulId;
			const type = decoded?.type;
			const fetchQuestions = async () => {
				try {
					setLoading(true);
					const response = await TrainingService.getMaterialDetail(modulId);
					if (response.status) {
						const material = response.data;
						setMateriData({
							id: material.material_id,
							title: material.material_title,
							type: type || "WAJIB"
						});
						if (material.quiz_questions && Array.isArray(material.quiz_questions)) setQuestions(material.quiz_questions);
						else setError("Materi ini belum memiliki soal kuis.");
					}
				} catch (err) {
					setError("Gagal memuat soal kuis.");
				} finally {
					setLoading(false);
				}
			};
			if (modulId) fetchQuestions();
		} catch (e) {
			console.error("Error decoding URL:", e);
			setError("URL tidak valid");
			setLoading(false);
		}
	}, []);
	const handleAnswerChange = (0, import_react.useCallback)((questionId, answerIndex) => {
		setAnswers((prev) => ({
			...prev,
			[questionId]: answerIndex
		}));
		setError(null);
	}, []);
	const handleNext = (0, import_react.useCallback)(() => {
		if (currentQuestion < questions.length - 1) setCurrentQuestion((prev) => prev + 1);
	}, [currentQuestion, questions.length]);
	const handlePrevious = (0, import_react.useCallback)(() => {
		if (currentQuestion > 0) setCurrentQuestion((prev) => prev - 1);
	}, [currentQuestion]);
	const handleSubmit = async () => {
		const answeredCount = Object.keys(answers).length;
		if (answeredCount < questions.length) {
			setError(`Belum selesai! Harap jawab semua pertanyaan (${answeredCount}/${questions.length} terjawab).`);
			return;
		}
		setSubmitting(true);
		setError(null);
		try {
			const formattedAnswers = questions.map((q) => ({
				question_id: q.id,
				selected_option: answers[q.id],
				is_correct: answers[q.id] === q.correctAnswer
			}));
			const response = await TrainingService.submitEvaluation(materiData.id, formattedAnswers);
			if (response.status) {
				setScore(response.data.score);
				setPassed(response.data.passed);
				setShowResult(true);
				window.scrollTo(0, 0);
			}
		} catch (err) {
			setError("Gagal mengirim jawaban. Silakan coba lagi.");
		} finally {
			setSubmitting(false);
		}
	};
	const handleRetry = (0, import_react.useCallback)(() => {
		setCurrentQuestion(0);
		setAnswers({});
		setShowResult(false);
		setScore(0);
		setPassed(false);
		setError(null);
	}, []);
	const handleBackToDashboard = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({ page: "trainingDashboard" })}`);
	}, [navigate]);
	const handleBackToDetail = (0, import_react.useCallback)(() => {
		navigate(`/${jwtEncode({
			page: "detailMateri",
			kurikulumId: materiData?.id,
			type: materiData?.type
		})}`);
	}, [navigate, materiData]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "d-flex flex-column justify-content-center align-items-center vh-100 bg-white",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
			animation: "border",
			variant: "primary",
			size: "lg"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted fw-medium",
			children: "Menyiapkan kuis evaluasi..."
		})]
	});
	if (showResult) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "evaluasi-container pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "mt-4 px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center mx-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					lg: 8,
					xl: 7,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "result-card shadow-lg border-0 text-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
							className: `result-premium-header ${passed ? "result-header-success" : "result-header-fail"}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "quiz-glass-sheen" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "quiz-decor-circle c1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "quiz-decor-circle c2" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "relative",
										zIndex: 2
									},
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mb-3",
											children: passed ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrophy, { size: 64 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, { size: 64 })
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
											className: "fw-black mb-0 text-white",
											children: passed ? "SELAMAT! ANDA LULUS" : "MAAF, BELUM LULUS"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "opacity-75 mt-2 mb-0",
											children: ["Evaluasi: ", materiData?.title]
										})
									]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5 pt-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-4",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "score-circle",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "score-val",
											style: { color: passed ? "#059669" : "#dc2626" },
											children: score
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "score-label",
											children: "Skor Akhir"
										})]
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mb-5 px-md-5",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-muted mb-0 lead-sm",
										children: passed ? `Luar biasa! Anda telah menyelesaikan seluruh materi dan evaluasi ini dengan hasil yang sangat memuaskan.` : `Jangan patah semangat! Nilai minimum untuk lulus adalah 70%. Silakan tinjau kembali materi pembelajaran dan coba lagi saat Anda sudah siap.`
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex flex-column flex-md-row gap-3 justify-content-center px-md-5",
									children: [!passed && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "primary",
										className: "py-3 px-5 fw-bold rounded-pill shadow-sm flex-grow-1",
										onClick: handleRetry,
										children: "Ulangi Kuis"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: passed ? "primary" : "outline-secondary",
										className: "py-3 px-5 fw-bold rounded-pill flex-grow-1",
										onClick: handleBackToDashboard,
										children: "Dashboard Training"
									})]
								})
							]
						})]
					})
				})
			})
		})
	});
	const progress = Math.round((currentQuestion + 1) / questions.length * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "evaluasi-container pb-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
			fluid: true,
			className: "mt-4 px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "mx-0",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
					xs: 12,
					children: [error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
						variant: "warning",
						className: "mb-4 border-0 shadow-sm rounded-4 d-flex align-items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, {
							className: "text-warning",
							size: 20
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold",
							children: error
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "quiz-card border-0",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "quiz-premium-header",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "quiz-glass-sheen" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "quiz-decor-circle c1" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										position: "relative",
										zIndex: 2
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "d-flex justify-content-between align-items-end mb-2",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "text-info fw-bold small text-uppercase ls-1 opacity-75",
											children: [
												"Pertanyaan ",
												currentQuestion + 1,
												" dari ",
												questions.length
											]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
											className: "fw-black text-white mb-0 mt-1",
											children: materiData?.title
										})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "text-end",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "fw-black text-white h3 mb-0",
												children: [progress, "%"]
											})
										})]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
										now: progress,
										variant: "info",
										style: {
											height: "8px",
											background: "rgba(255,255,255,0.1)"
										},
										className: "rounded-pill border-0"
									})]
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
							className: "p-4 p-md-5",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
									className: "question-text fw-bold mb-4",
									children: questions[currentQuestion]?.question
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "quiz-options-list",
									children: questions[currentQuestion]?.options.map((option, index) => {
										const isSelected = answers[questions[currentQuestion].id] === index;
										return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: `quiz-option-item ${isSelected ? "selected" : ""}`,
											onClick: () => handleAnswerChange(questions[currentQuestion].id, index),
											children: [
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "radio",
													id: `option-${index}`,
													name: `question-${questions[currentQuestion].id}`,
													checked: isSelected,
													readOnly: true
												}),
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
													className: "quiz-option-label",
													htmlFor: `option-${index}`,
													children: option
												}),
												isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheckCircle, { className: "text-primary ms-auto" })
											]
										}, index);
									})
								})]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex justify-content-between align-items-center gap-3 mt-4 pt-4 border-top",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
									variant: "link",
									className: "text-decoration-none text-muted fw-bold d-flex align-items-center gap-2 p-0",
									onClick: currentQuestion === 0 ? handleBackToDetail : handlePrevious,
									disabled: submitting,
									children: [currentQuestion === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronLeft, {}), currentQuestion === 0 ? "Batal" : "Sebelumnya"]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "d-flex gap-2",
									children: currentQuestion === questions.length - 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
										variant: "success",
										className: "px-5 py-2 fw-black rounded-pill shadow-md border-0",
										style: { background: "linear-gradient(135deg, #10b981 0%, #059669 100%)" },
										onClick: handleSubmit,
										disabled: submitting,
										children: submitting ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
											animation: "border",
											size: "sm",
											className: "me-2"
										}), "Mengirim..."] }) : "SELESAIKAN KUIS"
									}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
										variant: "primary",
										className: "px-4 py-2 fw-bold rounded-pill d-flex align-items-center gap-2 shadow-sm",
										onClick: handleNext,
										disabled: submitting,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Selanjutnya" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaChevronRight, { size: 14 })]
									})
								})]
							})]
						})]
					})]
				})
			})
		})
	});
};
//#endregion
export { Evaluasi as default };
