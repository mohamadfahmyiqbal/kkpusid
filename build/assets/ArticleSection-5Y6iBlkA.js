import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, S as Card_default, T as CardBody, b as Container, l as Row, x as Col } from "./vendor-react-D5pUDmay.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as uGlobal } from "./UGlobal-MGBt7b3Z.js";
//#region src/pages/global/LandingPage/component/ArticleSkeleton.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var ArticleSkeleton = () => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("style", { children: `
    .skeleton {
      background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
      background-size: 200% 100%;
      animation: loading 1.5s infinite;
      border-radius: 4px;
    }
    
    .skeleton-title {
      height: 24px;
      width: 70%;
    }
    
    .skeleton-text {
      height: 16px;
      width: 100%;
    }
    
    .skeleton-text-short {
      height: 16px;
      width: 60%;
    }
    
    .skeleton-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
    }
    
    .skeleton-menu {
      width: 20px;
      height: 20px;
      border-radius: 2px;
    }
    
    .skeleton-image {
      height: 200px;
    }
    
    @keyframes loading {
      0% {
        background-position: 200% 0;
      }
      100% {
        background-position: -200% 0;
      }
    }
  ` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "py-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "pbs-title-section text-center mb-5",
			children: "Artikel Terbaru"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "justify-content-center",
			children: [
				1,
				2,
				3
			].map((index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				sm: 12,
				md: 8,
				lg: 6,
				className: "mb-4",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
					className: "shadow-lg border-0 mx-3 h-100 rounded-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton skeleton-title mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton skeleton-text mb-2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton skeleton-text mb-3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton skeleton-text-short" }),
						index === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex justify-content-between align-items-center mb-3 pt-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "skeleton skeleton-dot me-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "skeleton skeleton-dot me-1" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "skeleton skeleton-dot" })
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton skeleton-menu" })]
						})
					] }), index === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "p-3",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "skeleton skeleton-image rounded-4 w-100" })
					})]
				})
			}, index))
		})]
	})] });
};
//#endregion
//#region src/pages/global/LandingPage/component/ArticleSection.jsx
var ArticleSection = () => {
	const [articles, setArticles] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const [error, setError] = (0, import_react.useState)(null);
	const [retryCount, setRetryCount] = (0, import_react.useState)(0);
	const retryTimeoutRef = (0, import_react.useRef)(null);
	const fetchArticles = (0, import_react.useCallback)(async () => {
		try {
			setError(null);
			const fetchedArticles = (await uGlobal.getLandingArticles()).data.data || [];
			let formattedArticles = [];
			if (fetchedArticles.length > 0) formattedArticles = fetchedArticles.map((article) => ({
				title: article.title || "Judul Artikel",
				text: article.text || "Deskripsi artikel tidak tersedia.",
				img: article.img || null
			}));
			setArticles(formattedArticles);
			setRetryCount(0);
		} catch (err) {
			console.error("Gagal mengambil data Artikel:", err);
			setError(err.message || "Terjadi kesalahan saat mengambil data");
			setArticles([]);
			if (retryCount < 3) retryTimeoutRef.current = setTimeout(() => {
				setRetryCount((prev) => prev + 1);
				fetchArticles();
			}, 5e3);
		} finally {
			setLoading(false);
		}
	}, [retryCount]);
	(0, import_react.useEffect)(() => {
		fetchArticles();
		return () => {
			if (retryTimeoutRef.current) clearTimeout(retryTimeoutRef.current);
		};
	}, [fetchArticles]);
	if (loading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArticleSkeleton, {});
	if (error && retryCount >= 3) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-5",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SwalAlert, {
			variant: "warning",
			className: "text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert.Heading, { children: "Gagal Memuat Data" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Tidak dapat memuat artikel setelah beberapa percobaan." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					className: "btn btn-warning",
					onClick: () => {
						setRetryCount(0);
						setLoading(true);
						fetchArticles();
					},
					children: "Coba Lagi"
				})
			]
		})
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		className: "article-section py-5",
		id: "artikel",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "text-center mb-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "pbs-badge",
					children: "Berita & Informasi"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "pbs-title-section mt-3 text-center",
					children: "Artikel Terbaru"
				})]
			}),
			articles.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					md: 8,
					className: "text-center py-5",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "pbs-card-glass p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "lead text-white mb-0",
							children: "Belum ada artikel yang dipublikasikan saat ini."
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-white-50 mt-2",
							children: "Nantikan informasi menarik lainnya dari kami segera."
						})]
					})
				})
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
				className: "justify-content-center g-3 g-md-4",
				children: articles.map((card, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 6,
					md: 6,
					lg: 4,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
						className: "article-card h-100 shadow-sm border-0",
						children: [card.img ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "article-image-wrapper",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Img, {
								variant: "top",
								src: card.img,
								alt: card.title,
								className: "article-image"
							})
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "article-image-wrapper d-flex align-items-center justify-content-center bg-light",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: "No Image"
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardBody, {
							className: "p-4 d-flex flex-column",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Title, {
									className: "fw-bold",
									children: card.title
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default.Text, {
									className: "flex-grow-1",
									children: card.text
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									href: "#",
									className: "article-btn-link",
									onClick: (e) => e.preventDefault(),
									children: ["Selengkapnya ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "→" })]
								})
							]
						})]
					})
				}, index))
			}),
			articles.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "text-center mt-5",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline-light",
					className: "rounded-pill px-5 py-2",
					children: "Lihat Semua Artikel"
				})
			})
		]
	});
};
var ArticleSection_default = (0, import_react.memo)(ArticleSection);
//#endregion
export { ArticleSection_default as default };
