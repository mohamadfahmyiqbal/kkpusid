import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, T as require_sweetalert2_all, gn as require_jsx_runtime } from "./vendor-rpDlma0K.js";
import { E as Button, Jt as FaCoins, Mt as FaCalendarAlt, Or as FaWallet, Pr as useNavigate, Qn as FaShieldAlt, Rt as FaCheck, an as FaExclamationTriangle, g as Form_default, hr as FaUser, jt as FaCalculator, l as Row, mr as FaUpload, pr as FaUniversity, qt as FaClock, t as NumericFormat, u as ProgressBar, ur as FaTrashAlt, wn as FaInfoCircle, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as AnimatePresence, t as motion } from "./vendor-framer-fx3iiH1e.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
import { t as Button$1 } from "./Button-DpYzkz3l.js";
import { t as SwalAlert } from "./SwalAlert-C3kBxD_o.js";
import { t as useSocketListener } from "./SocketListener-C630ms4G.js";
import { t as Card } from "./Card-DeCk4TVr.js";
//#region src/pages/program/pinjaman/components/FormInputField.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function FormInputField({ label, value, name, type = "text", readOnly = false, onChange, placeholder = "", error = "", required = false, info = "", icon: Icon }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
		className: "mb-3 custom-input-group",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
				className: "small mb-1 text-muted d-flex align-items-center justify-content-between font-outfit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [label, required && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-danger ms-1",
					children: "*"
				})] }), info && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-teal cursor-pointer",
					title: info,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "position-relative",
				children: [Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "position-absolute top-50 start-0 translate-middle-y ps-3 text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 16 })
				}), type === "currency" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumericFormat, {
					thousandSeparator: ".",
					decimalSeparator: ",",
					allowNegative: false,
					value,
					onValueChange: (values) => {
						onChange({ target: {
							name,
							value: values.value
						} });
					},
					customInput: Form_default.Control,
					className: `custom-flat-input ${Icon ? "has-icon" : ""} ${error ? "border-danger error-shake" : ""}`,
					isInvalid: !!error,
					placeholder,
					readOnly
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
					type,
					name,
					value,
					placeholder,
					readOnly,
					onChange,
					className: `custom-flat-input ${Icon ? "has-icon" : ""} ${error ? "border-danger error-shake" : ""}`,
					isInvalid: !!error
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control.Feedback, {
				type: "invalid",
				className: "d-block mt-1 ps-1",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-danger",
					children: error
				})
			})
		]
	});
}
//#endregion
//#region src/pages/program/pinjaman/components/NominalTenorSection.jsx
var QUICK_NOMINALS = [
	{
		label: "500 Rb",
		value: 5e5
	},
	{
		label: "1 Jt",
		value: 1e6
	},
	{
		label: "2 Jt",
		value: 2e6
	},
	{
		label: "3 Jt",
		value: 3e6
	}
];
var QUICK_TENORS = [
	1,
	2,
	3
];
function angkaToTerbilang(num) {
	if (isNaN(num) || num <= 0) return "";
	const ones = [
		"",
		"Satu",
		"Dua",
		"Tiga",
		"Empat",
		"Lima",
		"Enam",
		"Tujuh",
		"Delapan",
		"Sembilan",
		"Sepuluh",
		"Sebelas"
	];
	function terbilang(n) {
		if (n < 12) return ones[n];
		if (n < 20) return ones[n - 10] + " Belas";
		if (n < 100) return ones[Math.floor(n / 10)] + " Puluh " + ones[n % 10];
		if (n < 200) return "Seratus " + terbilang(n - 100);
		if (n < 1e3) return ones[Math.floor(n / 100)] + " Ratus " + terbilang(n % 100);
		if (n < 2e3) return "Seribu " + terbilang(n - 1e3);
		if (n < 1e6) return terbilang(Math.floor(n / 1e3)) + " Ribu " + terbilang(n % 1e3);
		if (n < 1e9) return terbilang(Math.floor(n / 1e6)) + " Juta " + terbilang(n % 1e6);
		if (n < 0xe8d4a51000) return terbilang(Math.floor(n / 1e9)) + " Miliar " + terbilang(n % 1e9);
		return "";
	}
	const result = terbilang(num).replace(/\s+/g, " ").trim();
	if (!result) return "";
	return result.replace("Satu Ratus", "Seratus").replace("Satu Ribu", "Seribu") + " Rupiah";
}
var ProductCardSelector = ({ products, selectedValue, onChange, isLoading }) => {
	if (isLoading) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "d-flex gap-3 mb-4 overflow-hidden",
		children: [1, 2].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "bg-secondary bg-opacity-10 rounded-4 animate-pulse flex-grow-1",
			style: { height: "105px" }
		}, i))
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "product-selector-grid",
		children: products.map((p) => {
			const isSelected = selectedValue === p.name;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				whileHover: { y: -2 },
				whileTap: { scale: .98 },
				className: `product-select-card ${isSelected ? "selected" : ""}`,
				onClick: () => onChange(p.name),
				children: [isSelected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "selected-badge",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { size: 10 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: `badge mb-2 font-outfit ${p.akad_type === "Murabahah" ? "bg-success bg-opacity-10 text-success border border-success border-opacity-25" : "bg-primary bg-opacity-10 text-primary border border-primary border-opacity-25"}`,
						style: {
							fontSize: "10px",
							padding: "5px 8px",
							borderRadius: "6px"
						},
						children: ["Akad ", p.akad_type]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
						className: "fw-bold mb-1 text-dark font-outfit",
						style: { fontSize: "14.5px" },
						children: p.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "text-muted small font-outfit",
						style: { fontSize: "11.5px" },
						children: [
							"Tenor Default: ",
							p.default_term,
							" Bln"
						]
					})
				] })]
			}, p.product_id);
		})
	});
};
function NominalTenorSection({ loanProducts, formData, errors, isLoadingProducts, handleInputChange, setNominalQuick, setTenorQuick }) {
	const nominalVal = parseInt(formData.nominalPinjaman) || 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "form-section-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark font-outfit",
				children: "Pilih Produk & Nominal"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Pilih produk pembiayaan yang sesuai kebutuhan Anda"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "small text-muted mb-2 font-outfit fw-bold",
				children: "Jenis Pinjaman"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProductCardSelector, {
				products: loanProducts,
				selectedValue: formData.jenisPinjaman,
				onChange: (val) => handleInputChange({ target: {
					name: "jenisPinjaman",
					value: val
				} }),
				isLoading: isLoadingProducts
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "g-3 mb-4",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				md: 12,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
						label: "Nominal Pengajuan (Rp)",
						name: "nominalPinjaman",
						value: formData.nominalPinjaman,
						onChange: handleInputChange,
						type: "currency",
						required: true,
						icon: FaCoins,
						error: errors.nominalPinjaman,
						placeholder: "Contoh: 5.000.000"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "chip-container",
						children: QUICK_NOMINALS.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: `chip-btn ${nominalVal === item.value ? "active" : ""}`,
							onClick: () => setNominalQuick(item.value),
							children: ["Rp ", item.label]
						}, item.value))
					}),
					nominalVal > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-2 font-outfit d-flex align-items-center gap-1 flex-wrap",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-muted small fw-semibold",
							children: "Terbilang:"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold italic px-2 py-1 rounded font-plus-jakarta",
							style: {
								fontSize: "11.5px",
								backgroundColor: "#eff6ff",
								color: "#1e40af",
								border: "1px solid #bfdbfe",
								display: "inline-block"
							},
							children: angkaToTerbilang(nominalVal)
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Label, {
				className: "small text-muted mb-2 font-outfit fw-bold d-flex justify-content-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Tenor Pembayaran" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "text-teal font-outfit fw-bold",
					children: [formData.termPembayaran, " Bulan"]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "slider-container",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Range, {
					min: 1,
					max: 3,
					step: 1,
					value: formData.termPembayaran,
					name: "termPembayaran",
					onChange: handleInputChange,
					className: "custom-range-slider"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "chip-container mt-3",
					children: QUICK_TENORS.map((val) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `chip-btn ${parseInt(formData.termPembayaran) === val ? "active" : ""}`,
						onClick: () => setTenorQuick(val),
						children: [val, " Bulan"]
					}, val))
				})]
			})]
		})
	] });
}
//#endregion
//#region src/pages/program/pinjaman/components/DisbursementSection.jsx
var MethodSelectorCards = ({ selectedValue, onChange }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "method-selector-row",
		children: [{
			value: "Non Tunai",
			title: "Transfer Bank",
			subtitle: "Cairkan ke rekening bank",
			icon: FaUniversity
		}, {
			value: "Tunai",
			title: "Pencairan Tunai",
			subtitle: "Ambil langsung di koperasi",
			icon: FaWallet
		}].map((opt) => {
			const isSelected = selectedValue === opt.value;
			const Icon = opt.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(motion.div, {
				whileHover: { y: -1 },
				whileTap: { scale: .99 },
				className: `method-select-card ${isSelected ? "selected" : ""}`,
				onClick: () => onChange(opt.value),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "method-icon-wrap",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { size: 18 })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h6", {
					className: "fw-bold mb-0 text-dark font-outfit",
					style: { fontSize: "14px" },
					children: opt.title
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
					className: "text-muted",
					style: { fontSize: "11px" },
					children: opt.subtitle
				})] })]
			}, opt.value);
		})
	});
};
function DisbursementSection({ formData, errors, handleInputChange }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "form-section-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold mb-0 text-dark font-outfit",
				children: "Metode & Detail Pencairan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "text-muted",
				children: "Pilih cara Anda ingin menerima dana pembiayaan"
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
			className: "mb-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "small text-muted mb-2 font-outfit fw-bold",
				children: "Metode Pencairan"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MethodSelectorCards, {
				selectedValue: formData.metodePencairan,
				onChange: (val) => handleInputChange({ target: {
					name: "metodePencairan",
					value: val
				} })
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, {
			mode: "wait",
			children: formData.metodePencairan === "Non Tunai" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					height: 0
				},
				animate: {
					opacity: 1,
					height: "auto"
				},
				exit: {
					opacity: 0,
					height: 0
				},
				transition: { duration: .25 },
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-3 mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
							label: "No. Rekening Penerima",
							name: "noRekening",
							value: formData.noRekening,
							onChange: handleInputChange,
							required: true,
							icon: FaUniversity,
							error: errors.noRekening,
							placeholder: "Masukkan nomor rekening"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						md: 6,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
							className: "mb-3 custom-input-group",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
								className: "small mb-1 text-muted font-outfit fw-bold",
								children: "Bank Tujuan"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Select, {
								name: "bankTujuan",
								value: formData.bankTujuan,
								onChange: handleInputChange,
								className: "custom-flat-input",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Bank Syariah Indonesia",
										children: "Bank Syariah Indonesia (BSI)"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "Bank Mandiri",
										children: "Bank Mandiri"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "BCA",
										children: "BCA"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "BRI",
										children: "BRI"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "BNI",
										children: "BNI"
									})
								]
							})]
						})
					})]
				})
			}, "non-tunai") : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					height: 0
				},
				animate: {
					opacity: 1,
					height: "auto"
				},
				exit: {
					opacity: 0,
					height: 0
				},
				transition: { duration: .25 },
				className: "overflow-hidden",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mb-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
						label: "Lokasi Pengambilan Tunai",
						name: "lokasiPencairan",
						value: formData.lokasiPencairan,
						onChange: handleInputChange,
						required: true,
						icon: FaUniversity,
						error: errors.lokasiPencairan,
						placeholder: "Contoh: Kantor Pusat Koperasi"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
						className: "g-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
								label: "Tanggal Pengambilan",
								name: "tanggalPencairan",
								type: "date",
								value: formData.tanggalPencairan,
								onChange: handleInputChange,
								required: true,
								icon: FaCalendarAlt,
								error: errors.tanggalPencairan
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
							md: 6,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
								label: "Jam Pengambilan",
								name: "jamPencairan",
								type: "time",
								value: formData.jamPencairan,
								onChange: handleInputChange,
								required: true,
								icon: FaClock,
								error: errors.jamPencairan
							})
						})]
					})]
				})
			}, "tunai")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FormInputField, {
			label: "Nama Lengkap Pemohon (Sesuai Identitas)",
			name: "namaNasabah",
			value: formData.namaNasabah,
			onChange: handleInputChange,
			required: true,
			icon: FaUser,
			error: errors.namaNasabah,
			placeholder: "Masukkan nama lengkap Anda"
		})
	] });
}
//#endregion
//#region src/pages/program/pinjaman/components/FileUploadField.jsx
var import_sweetalert2_all = /* @__PURE__ */ __toESM(require_sweetalert2_all());
function FileUploadField({ onFileChange, error = "", isUploading = false, uploadProgress = 0, uploadedFile, setUploadedFile }) {
	const [isDragging, setIsDragging] = (0, import_react.useState)(false);
	const [fileInfo, setFileInfo] = (0, import_react.useState)(null);
	const handleFileSelect = (file) => {
		if (file.size > 5 * 1024 * 1024) {
			import_sweetalert2_all.default.fire({
				title: "Perhatian",
				text: "File terlalu besar. Maksimal 5MB.",
				icon: "warning"
			});
			return;
		}
		setFileInfo({
			name: file.name,
			size: (file.size / 1024).toFixed(2) + " KB"
		});
		onFileChange && onFileChange(file);
	};
	const handleRemoveFile = (e) => {
		e.stopPropagation();
		setFileInfo(null);
		setUploadedFile(null);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mb-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
				className: "small text-muted mb-2 font-outfit fw-bold",
				children: "Dokumen Pendukung (Opsional, Maks. 5MB)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: `premium-upload-zone ${isDragging ? "dragging" : ""}`,
				onDragOver: (e) => {
					e.preventDefault();
					setIsDragging(true);
				},
				onDragLeave: () => setIsDragging(false),
				onDrop: (e) => {
					e.preventDefault();
					setIsDragging(false);
					if (e.dataTransfer.files[0]) handleFileSelect(e.dataTransfer.files[0]);
				},
				onClick: () => document.getElementById("file-upload").click(),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "file",
					className: "d-none",
					id: "file-upload",
					accept: "image/*,.pdf,.doc,.docx",
					onChange: (e) => e.target.files[0] && handleFileSelect(e.target.files[0])
				}), fileInfo || uploadedFile ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "d-flex align-items-center justify-content-between p-2 bg-white rounded-3 border border-success",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center text-success text-start",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-success bg-opacity-10 rounded-circle p-2 me-3",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "fw-bold d-block text-dark font-outfit",
							style: { fontSize: "14px" },
							children: fileInfo?.name || "Dokumen terpilih"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							children: fileInfo?.size || ""
						})] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "link",
						className: "text-danger p-2",
						onClick: handleRemoveFile,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTrashAlt, { size: 16 })
					})]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-muted py-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaUpload, {
							className: "mb-2 text-teal",
							size: 24
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "fw-bold text-dark font-outfit",
							style: { fontSize: "14px" },
							children: "Klik atau Seret File ke Sini"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							className: "text-muted",
							style: { fontSize: "11.5px" },
							children: "Format: JPG, PNG, PDF, DOC"
						})
					]
				})]
			}),
			isUploading && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-2 px-1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
					className: "text-primary mb-1 d-block font-outfit",
					style: { fontSize: "12px" },
					children: [
						"Mengunggah bukti: ",
						uploadProgress,
						"%"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBar, {
					now: uploadProgress,
					size: "sm",
					animated: true,
					variant: "info",
					style: { height: "6px" }
				})]
			}),
			error && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
				className: "text-danger d-block mt-2 font-outfit",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaExclamationTriangle, { className: "me-1" }), error]
			})
		]
	});
}
//#endregion
//#region src/pages/program/pinjaman/components/SimulationSummary.jsx
function SimulationSummary({ formData, selectedProduct, formatCurrency, nominal, principal, tenor, estimasiAngsuran, isLoading, isLoadingProducts }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "sticky-summary-column position-sticky",
		style: {
			top: "100px",
			zIndex: 10
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			variant: "premium",
			theme: "primary",
			className: "overflow-hidden border-0 rounded-4 shadow-lg",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "position-absolute rounded-circle bg-white opacity-10",
					style: {
						width: 250,
						height: 250,
						top: -100,
						right: -100,
						filter: "blur(20px)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "position-absolute rounded-circle bg-white opacity-10",
					style: {
						width: 150,
						height: 150,
						bottom: -50,
						left: -50,
						filter: "blur(20px)"
					}
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "p-4 border-bottom border-white border-opacity-10 position-relative z-1",
					style: { background: "rgba(255, 255, 255, 0.05)" },
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h5", {
						className: "fw-bold mb-1 font-outfit text-white d-flex align-items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "bg-white bg-opacity-25 p-2 rounded-3 d-flex align-items-center justify-content-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCalculator, {
								className: "text-white",
								size: 16
							})
						}), "Kalkulator Simulasi"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-0 mt-2 small text-white-75",
						children: "Ringkasan estimasi angsuran pembiayaan"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, {
					className: "p-4 position-relative z-1",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-flex flex-column gap-3 mb-4",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white-75 small fw-medium",
										children: "Jenis Pinjaman"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white font-outfit px-3 py-1 bg-white bg-opacity-25 rounded-pill small border border-white border-opacity-25 shadow-sm",
										children: formData.jenisPinjaman || "-"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white-75 small fw-medium",
										children: "Tipe Akad"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white font-outfit px-3 py-1 bg-white bg-opacity-25 rounded-pill small border border-white border-opacity-25 shadow-sm",
										children: selectedProduct?.akad_type || "Qardhul Hasan"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white-75 small fw-medium",
										children: "Total Pinjaman"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
										className: "text-white font-outfit fs-6",
										children: formatCurrency(nominal)
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "d-flex justify-content-between align-items-center pb-3 border-bottom border-white border-opacity-10",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white-75 small fw-medium",
										children: "Tenor"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-white font-outfit fs-6",
										children: [tenor, " Bulan"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 p-4 bg-white bg-opacity-10 rounded-4 text-center border border-white border-opacity-25 shadow-sm position-relative overflow-hidden",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "position-absolute w-100 h-100 top-0 start-0",
										style: {
											background: "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)",
											zIndex: 0
										}
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "position-relative z-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-white-75 small d-block mb-2 text-uppercase fw-bold",
											style: {
												letterSpacing: "1.5px",
												fontSize: "10px"
											},
											children: "Estimasi Angsuran / Bulan"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "display-6 fw-bolder text-white font-outfit",
											style: { textShadow: "0 2px 10px rgba(0,0,0,0.1)" },
											children: formatCurrency(estimasiAngsuran)
										})]
									})]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
							variant: "info",
							className: "border-0 shadow-sm mb-4 p-3",
							style: {
								borderRadius: "16px",
								background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, rgba(255,255,255,0.05) 100%)",
								backdropFilter: "blur(10px)",
								border: "1px solid rgba(255,255,255,0.1)"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "d-flex align-items-start gap-3",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "bg-white bg-opacity-25 p-2 rounded-circle mt-1 shadow-sm flex-shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { className: "text-white fs-6" })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									style: {
										fontSize: "12px",
										lineHeight: "1.6"
									},
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", {
										className: "text-white d-block mb-1 fs-6",
										children: [
											"Info Akad (",
											selectedProduct?.akad_type || "Qardhul Hasan",
											")"
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "text-white",
										children: selectedProduct?.akad_type === "Murabahah" ? "Pembiayaan murabahah menggunakan akad jual beli barang dengan tambahan keuntungan (margin) yang disepakati bersama." : "Pinjaman lunak qardhul hasan adalah pinjaman kebajikan tanpa tambahan bunga/margin (hanya mengembalikan pokok secara dicicil)."
									})]
								})]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "d-grid gap-2 pt-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
								variant: "light",
								type: "submit",
								disabled: isLoadingProducts,
								isLoading,
								loadingText: "Memproses...",
								className: "fw-bold py-3 shadow border-0 d-flex justify-content-center align-items-center gap-2 fs-6 rounded-pill text-primary transition-all hover-scale",
								style: { background: "linear-gradient(to right, #ffffff, #f8f9fa)" },
								children: "Ajukan Pinjaman Sekarang"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "text-center text-white mt-3 d-flex align-items-center justify-content-center gap-2 opacity-75",
								style: {
									fontSize: "12px",
									fontWeight: "500"
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaShieldAlt, { className: "text-white" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Data pengajuan aman & diverifikasi oleh admin" })]
							})]
						})
					]
				})
			]
		})
	});
}
//#endregion
//#region src/pages/program/pinjaman/FormPengajuanPinjaman.jsx
var API_BASE_URL = "https://api.kkpus.id/api";
var getApiUrl = (endpoint) => {
	return `${API_BASE_URL.endsWith("/api") ? API_BASE_URL : `${API_BASE_URL}/api`}/${endpoint}`;
};
var normalizeBankName = (bankName) => {
	if (!bankName) return "Bank Syariah Indonesia";
	const name = bankName.toLowerCase();
	if (name.includes("syariah") || name.includes("bsi")) return "Bank Syariah Indonesia";
	if (name.includes("mandiri")) return "Bank Mandiri";
	if (name.includes("bca") || name.includes("central asia")) return "BCA";
	if (name.includes("bri") || name.includes("rakyat indonesia")) return "BRI";
	if (name.includes("bni") || name.includes("negara indonesia")) return "BNI";
	return "Bank Syariah Indonesia";
};
function FormPengajuanPinjaman() {
	const navigate = useNavigate();
	const { userData } = useProfile();
	const [formData, setFormData] = (0, import_react.useState)({
		nominalPinjaman: "3000000",
		termPembayaran: "3",
		jenisPinjaman: "Darurat",
		metodePencairan: "Non Tunai",
		noRekening: "",
		bankTujuan: "Bank Syariah Indonesia",
		lokasiPencairan: "",
		tanggalPencairan: "",
		jamPencairan: "",
		namaNasabah: ""
	});
	(0, import_react.useEffect)(() => {
		if (userData) {
			const defaultBankName = normalizeBankName(userData.bank_name || userData.bank_info?.bank_name || "");
			const defaultAccountNo = userData.bank_account_no || userData.bank_info?.bank_account_no || "";
			const defaultName = userData.name || userData.full_name || userData.member?.name || "";
			setFormData((prev) => ({
				...prev,
				noRekening: prev.noRekening || defaultAccountNo,
				bankTujuan: prev.noRekening === "" ? defaultBankName : prev.bankTujuan,
				namaNasabah: prev.namaNasabah || defaultName
			}));
		}
	}, [userData]);
	const [isLoading, setIsLoading] = (0, import_react.useState)(false);
	const [loanProducts, setLoanProducts] = (0, import_react.useState)([]);
	const [isLoadingProducts, setIsLoadingProducts] = (0, import_react.useState)(true);
	const [errors, setErrors] = (0, import_react.useState)({});
	const [uploadedFile, setUploadedFile] = (0, import_react.useState)(null);
	const [uploadProgress, setUploadProgress] = (0, import_react.useState)(0);
	const [isUploading, setIsUploading] = (0, import_react.useState)(false);
	const [notification, setNotification] = (0, import_react.useState)({
		show: false,
		type: "",
		message: ""
	});
	const formatCurrency = (val) => new Intl.NumberFormat("id-ID", {
		style: "currency",
		currency: "IDR",
		minimumFractionDigits: 0
	}).format(val);
	const fetchLoanProducts = (0, import_react.useCallback)(async () => {
		try {
			const result = await (await fetch(getApiUrl("program/pinjaman/produk"), { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })).json();
			if (result.success) {
				setLoanProducts(result.data);
				if (result.data.length > 0) {
					const first = result.data[0];
					setFormData((prev) => ({
						...prev,
						jenisPinjaman: first.name,
						termPembayaran: Math.min(first.default_term || 3, 3).toString()
					}));
				}
			}
		} catch (error) {
			console.error("Error products:", error);
		} finally {
			setIsLoadingProducts(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchLoanProducts();
	}, [fetchLoanProducts]);
	useSocketListener((payload) => {
		if (payload?.entityRef === "financing_applications") fetchLoanProducts();
	});
	const selectedProduct = (0, import_react.useMemo)(() => loanProducts.find((p) => p.name === formData.jenisPinjaman), [loanProducts, formData.jenisPinjaman]);
	const validateForm = () => {
		const newErrors = {};
		const nominal = parseInt(formData.nominalPinjaman) || 0;
		if (nominal < 1e6) newErrors.nominalPinjaman = "Minimal pinjaman Rp 1.000.000";
		if (nominal > 3e6) newErrors.nominalPinjaman = "Maksimal pinjaman Rp 3.000.000";
		if (parseInt(formData.termPembayaran) > 3) newErrors.termPembayaran = "Maksimal tenor 3 bulan";
		if (formData.metodePencairan === "Non Tunai") {
			if (!formData.noRekening) newErrors.noRekening = "Nomor rekening wajib diisi";
			if (!formData.bankTujuan) newErrors.bankTujuan = "Pilih bank tujuan";
		} else {
			if (!formData.lokasiPencairan) newErrors.lokasiPencairan = "Lokasi wajib diisi";
			if (!formData.tanggalPencairan) newErrors.tanggalPencairan = "Pilih tanggal";
			if (!formData.jamPencairan) newErrors.jamPencairan = "Pilih jam";
		}
		if (!formData.namaNasabah) newErrors.namaNasabah = "Nama nasabah wajib diisi";
		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};
	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setErrors((prev) => ({
			...prev,
			[name]: ""
		}));
		if (name === "nominalPinjaman") setFormData((prev) => ({
			...prev,
			[name]: value.replace(/\D/g, "")
		}));
		else if (name === "jenisPinjaman") {
			const product = loanProducts.find((p) => p.name === value);
			setFormData((prev) => ({
				...prev,
				[name]: value,
				termPembayaran: Math.min(product?.default_term || 3, 3).toString()
			}));
		} else setFormData((prev) => ({
			...prev,
			[name]: value
		}));
	};
	const setNominalQuick = (val) => {
		setErrors((prev) => ({
			...prev,
			nominalPinjaman: ""
		}));
		setFormData((prev) => ({
			...prev,
			nominalPinjaman: val.toString()
		}));
	};
	const setTenorQuick = (val) => {
		setFormData((prev) => ({
			...prev,
			termPembayaran: val.toString()
		}));
	};
	const uploadEvidenceFile = async (financingId, file) => {
		const formDataFile = new FormData();
		formDataFile.append("evidence", file);
		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open("POST", getApiUrl(`financing/evidence/${financingId}`));
			xhr.setRequestHeader("Authorization", `Bearer ${localStorage.getItem("token")}`);
			xhr.upload.onprogress = (event) => {
				if (event.lengthComputable) setUploadProgress(Math.round(event.loaded / event.total * 100));
			};
			xhr.onload = () => {
				const res = JSON.parse(xhr.responseText);
				if (xhr.status >= 200 && xhr.status < 300) resolve(res);
				else reject(new Error(res.message || "Gagal upload file"));
			};
			xhr.onerror = () => reject(/* @__PURE__ */ new Error("Network Error"));
			xhr.send(formDataFile);
		});
	};
	const handleProses = async () => {
		if (!validateForm()) return;
		setIsLoading(true);
		try {
			const nominal = parseInt(formData.nominalPinjaman) || 0;
			const tenure = parseInt(formData.termPembayaran) || 1;
			const principal = nominal;
			const payload = {
				category: formData.jenisPinjaman,
				item_name: `Pinjaman ${formData.jenisPinjaman}`,
				amount_requested: nominal,
				principal_amount: principal,
				tenure,
				monthly_installment: Math.ceil(principal / tenure),
				metode_pencairan: formData.metodePencairan,
				nama_nasabah: formData.namaNasabah,
				akad_type: selectedProduct?.akad_type || "Murabahah",
				...formData.metodePencairan === "Non Tunai" ? {
					no_rekening: formData.noRekening,
					bank_tujuan: formData.bankTujuan
				} : {
					lokasi_pencairan: formData.lokasiPencairan,
					tanggal_pencairan: formData.tanggalPencairan,
					jam_pencairan: formData.jamPencairan
				}
			};
			const res = await fetch(getApiUrl("financing/apply"), {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`
				},
				body: JSON.stringify(payload)
			});
			const result = await res.json();
			if (!res.ok) throw new Error(result.message);
			if (uploadedFile) {
				setIsUploading(true);
				try {
					await uploadEvidenceFile(result.data.financing_id, uploadedFile);
				} catch (uploadError) {
					console.error("Upload error:", uploadError);
					setNotification({
						show: true,
						type: "warning",
						message: "Pengajuan berhasil, namun upload bukti gagal. Silakan upload melalui halaman detail."
					});
				}
			}
			setNotification({
				show: true,
				type: "success",
				message: "Pengajuan berhasil dikirim!"
			});
			const financingId = result.data?.financing_id || result.data?.id;
			setTimeout(() => navigate(`/${jwtEncode({
				page: "transactionDetailPage",
				financingId
			})}`), 1500);
		} catch (error) {
			setNotification({
				show: true,
				type: "danger",
				message: error.message
			});
		} finally {
			setIsLoading(false);
			setIsUploading(false);
		}
	};
	const nominal = parseInt(formData.nominalPinjaman) || 0;
	const tenor = parseInt(formData.termPembayaran) || 1;
	const principal = nominal;
	const estimasiAngsuran = Math.ceil(principal / tenor);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "form-page-container px-3 pb-5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "floating-alert-container",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AnimatePresence, { children: notification.show && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(motion.div, {
				initial: {
					opacity: 0,
					y: -20,
					scale: .95
				},
				animate: {
					opacity: 1,
					y: 0,
					scale: 1
				},
				exit: {
					opacity: 0,
					y: -20,
					scale: .95
				},
				transition: { duration: .2 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwalAlert, {
					variant: notification.type,
					className: "alert-premium",
					dismissible: true,
					onClose: () => setNotification({ show: false }),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex align-items-center gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaInfoCircle, { size: 18 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-outfit fw-bold",
							children: notification.message
						})]
					})
				})
			}) })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "container-fluid py-4 font-plus-jakarta px-0",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default, {
				onSubmit: (e) => {
					e.preventDefault();
					handleProses();
				},
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
					className: "g-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 7,
						xl: 8,
						className: "animate-fade-in",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
							variant: "form",
							className: "p-3 p-md-4",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card.Body, { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NominalTenorSection, {
									loanProducts,
									formData,
									errors,
									isLoadingProducts,
									handleInputChange,
									setNominalQuick,
									setTenorQuick
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-4 border-slate-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DisbursementSection, {
									formData,
									errors,
									handleInputChange
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("hr", { className: "my-4 border-slate-100" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileUploadField, {
									onFileChange: setUploadedFile,
									isUploading,
									uploadProgress,
									uploadedFile,
									setUploadedFile
								})
							] })
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
						lg: 5,
						xl: 4,
						className: "animate-fade-in",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SimulationSummary, {
							formData,
							selectedProduct,
							formatCurrency,
							nominal,
							principal,
							tenor,
							estimasiAngsuran,
							isLoading,
							isLoadingProducts
						})
					})]
				})
			})
		})]
	});
}
//#endregion
export { FormPengajuanPinjaman as default };
