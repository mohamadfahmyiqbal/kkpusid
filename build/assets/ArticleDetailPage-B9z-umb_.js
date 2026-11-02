import "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { Pr as useNavigate, S as Card_default, b as Container, k as MdAccessTime } from "./vendor-react-D5pUDmay.js";
import { t as ARTICLE_DATA } from "./dashboardData-DBz-4ArF.js";
require_react();
var import_jsx_runtime = require_jsx_runtime();
var ArticleDetailPage = ({ decodedToken }) => {
	useNavigate();
	const articleId = decodedToken?.id;
	const article = ARTICLE_DATA.find((a) => a.id === articleId) || {
		title: "Artikel Tidak Ditemukan",
		desc: "Maaf, artikel yang Anda cari tidak tersedia atau telah dihapus.",
		date: "-"
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Container, {
		className: "py-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
			className: "border-0 shadow-sm rounded-4 overflow-hidden",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: {
					height: "250px",
					background: "linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center"
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-muted opacity-50",
					children: "Gambar Artikel"
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default.Body, {
				className: "p-4 p-md-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2 text-muted mb-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MdAccessTime, { size: 16 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: article.date })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "fw-bold mb-4",
						style: { color: "#1e293b" },
						children: article.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "article-content",
						style: {
							lineHeight: "1.8",
							color: "#475569"
						},
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "lead fw-semibold text-dark",
								children: article.desc
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Ini adalah halaman detail artikel sementara. Konten teks yang lebih rinci mengenai topik ini akan dimuat sepenuhnya setelah sistem terintegrasi dengan backend." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sebagai koperasi yang mendukung pertumbuhan UMKM, Paguyuban Usaha Sukses senantiasa berkomitmen untuk menyediakan edukasi dan informasi yang bermanfaat demi kemajuan ekonomi kerakyatan secara syariah." })
						]
					})
				]
			})]
		})
	});
};
//#endregion
export { ArticleDetailPage as default };
