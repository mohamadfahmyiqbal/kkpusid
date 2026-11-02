import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react, gn as require_jsx_runtime, gt as axios } from "./vendor-rpDlma0K.js";
import { C as CardTitle, E as Button, O as Alert_default, Pr as useNavigate, Rt as FaCheck, S as Card_default, Sn as FaHourglassHalf, T as CardBody, b as Container, bt as FaArrowLeft, c as Spinner, g as Form_default, l as Row, sr as FaTimes, v as Image, w as CardHeader, x as Col } from "./vendor-react-D5pUDmay.js";
import { n as useProfile } from "./ProfileContext-DQCnAT09.js";
import "./index-BaUN0sjk.js";
//#region src/utils/common.jsx
var import_react = /* @__PURE__ */ __toESM(require_react());
var api = axios.create({
	baseURL: "https://api.kkpus.id",
	withCredentials: true
});
api.interceptors.request.use((config) => {
	const token = localStorage.getItem("token");
	if (token) config.headers.Authorization = `${token}`;
	return config;
}, (error) => Promise.reject(error));
//#endregion
//#region src/utils/UApproval.jsx
var UApproval = class {
	postJSON(url, data) {
		return api.post(url, data, { headers: { "Content-Type": "application/json" } });
	}
	postFormData(url, data) {
		const formData = new FormData();
		Object.entries(data || {}).forEach(([key, value]) => {
			formData.append(key, value);
		});
		return api.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
	}
	getApprovalByNikAndType(fields) {
		return this.postJSON("/getApprovalByNikAndType", fields);
	}
	getApprovalDetail(fields) {
		return this.postJSON("/getApprovalDetail", fields);
	}
};
var UApproval_default = new UApproval();
//#endregion
//#region src/utils/UAnggota.jsx
var UAnggota = class {
	postJSON(url, data) {
		return api.post(url, data, { headers: { "Content-Type": "application/json" } });
	}
	postFormData(url, data) {
		const formData = new FormData();
		Object.entries(data || {}).forEach(([key, value]) => {
			formData.append(key, value);
		});
		return api.post(url, formData, { headers: { "Content-Type": "multipart/form-data" } });
	}
	logout(fields) {
		return this.postJSON("/logout", fields);
	}
	login(fields) {
		return this.postJSON("/login", fields);
	}
	forgot(fields) {
		return this.postJSON("/forgot", fields);
	}
	verifikasiOTP(fields) {
		return this.postJSON("/verifikasiOTP", fields);
	}
	resetPassword(fields) {
		return this.postJSON("/resetPassword", fields);
	}
	register(fields) {
		return this.postJSON("/register", fields);
	}
	getAnggotaCategory(fields) {
		return this.postJSON("/getAnggotaCategory", fields);
	}
	findAnggotaByToken(fields) {
		return this.postJSON("/findAnggotaByToken", fields);
	}
	getDetailAnggotaByToken(fields) {
		return this.postJSON("/getDetailAnggotaByToken", fields);
	}
	anggotaList(fields) {
		return this.postJSON("/anggotaList", fields);
	}
	cekPendaftaranAnggota(fields) {
		return this.postJSON("/cekPendaftaranAnggota", fields);
	}
	daftarAnggota(fields) {
		return this.postFormData("/daftarAnggota", fields);
	}
	AnnggotaDetailByNIK(fields) {
		return this.postFormData("/AnnggotaDetailByNIK", fields);
	}
	GetAnggotaSaldo(fields) {
		return this.postFormData("/GetAnggotaSaldo", fields);
	}
};
var UAnggota_default = new UAnggota();
//#endregion
//#region src/routes/helpers.jsx
var jwtEncode = (payload) => {
	const encode = (obj) => btoa(unescape(encodeURIComponent(JSON.stringify(obj)))).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
	return `${encode({
		alg: "none",
		typ: "JWT"
	})}.${encode(payload)}.`;
};
//#endregion
//#region src/pages/anggota/detail-pendaftaran/PersonalInfoSection.jsx
var import_jsx_runtime = require_jsx_runtime();
function PersonalInfoSection({ detail, nama }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-bottom mb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold border-bottom pb-2",
				children: "Personal Info"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextNIK",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "2",
					children: "NIK"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "10",
					className: "d-flex justify-content-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						plaintext: true,
						readOnly: true,
						defaultValue: detail?.nik || "-",
						className: "text-end"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextNama",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "2",
					children: "Nama"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "10",
					className: "d-flex justify-content-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						plaintext: true,
						readOnly: true,
						defaultValue: nama || "-",
						className: "text-end"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextAlamat",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "2",
					children: "Alamat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "10",
					className: "d-flex justify-content-end",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: detail?.alamat || "-",
						className: "text-end"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/anggota/detail-pendaftaran/PhotoInfoSection.jsx
function PhotoInfoSection({ ktpImg, fotoImg }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-bottom mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: "fw-bold pb-2",
			children: "Foto Info"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			xs: 6,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "KTP" }), ktpImg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
				src: ktpImg,
				alt: "Foto KTP",
				rounded: true,
				fluid: true,
				className: "d-block mx-auto mt-2 w-100"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "-" })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
			xs: 6,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Foto Anggota" }), fotoImg ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {
				src: fotoImg,
				alt: "Foto Anggota",
				rounded: true,
				fluid: true,
				className: "d-block mx-auto mt-2 w-100"
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: "-" })]
		})] })]
	});
}
//#endregion
//#region src/pages/anggota/detail-pendaftaran/AccountInfoSection.jsx
function AccountInfoSection({ categoryName, noTlp, email }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-bottom mb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold border-bottom pb-2",
				children: "Account Info"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextTipe",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Tipe Anggota"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: categoryName || "-",
						className: "text-end py-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextNoHP",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "No HP"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: noTlp || "-",
						className: "text-end py-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextEmail",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Email"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: email || "-",
						className: "text-end py-0"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/anggota/detail-pendaftaran/JobInfoSection.jsx
function JobInfoSection({ job }) {
	const currentJob = job?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-bottom mb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold border-bottom pb-2",
				children: "Job Info"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextPekerjaan",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Pekerjaan"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: currentJob?.pekerjaan || "-",
						className: "text-end py-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextTempatKerja",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Tempat Kerja"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: currentJob?.tempat_kerja || "-",
						className: "text-end py-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextAlamatKerja",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Alamat"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: currentJob?.alamat_kerja || "-",
						className: "text-end py-0"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/anggota/detail-pendaftaran/BankInfoSection.jsx
function BankInfoSection({ bank }) {
	const currentBank = bank?.[0];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-bottom mb-2",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
				className: "fw-bold border-bottom pb-2",
				children: "Bank Info"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextBank",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Bank"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: currentBank?.bank || "-",
						className: "text-end py-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextNoRekening",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "No Rekening"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: currentBank?.no_rekening || "-",
						className: "text-end py-0"
					})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Form_default.Group, {
				as: Row,
				controlId: "formPlaintextNamaNasabah",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Label, {
					column: true,
					xs: "4",
					className: "py-0",
					children: "Nama Nasabah"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: "8",
					className: "d-flex justify-content-end py-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Form_default.Control, {
						as: "textarea",
						plaintext: true,
						readOnly: true,
						defaultValue: currentBank?.nama_nasabah || "-",
						className: "text-end py-0"
					})
				})]
			})
		]
	});
}
//#endregion
//#region src/pages/anggota/detail-pendaftaran/ApprovalInfoSection.jsx
function ApprovalInfoSection({ requestApprovals, allApproved, onNext }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "border-bottom mb-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h5", {
			className: "fw-bold border-bottom pb-2",
			children: "Approval Info"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "text-center justify-content-center",
			children: requestApprovals?.map((app, index) => {
				const status = app?.status?.toLowerCase();
				let bgColor = "secondary";
				let icon;
				if (status === "approved") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaCheck, { size: 30 });
				else if (status === "rejected") icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaTimes, { size: 30 });
				else icon = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaHourglassHalf, { size: 40 });
				if (status === "approved") bgColor = "success";
				if (status === "rejected") bgColor = "danger";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
					xs: 6,
					md: 6,
					lg: 3,
					className: "mb-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "d-flex flex-column align-items-center justify-content-center h-100 gap-1",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card_default, {
								bg: bgColor,
								text: "white",
								className: "rounded-circle d-flex align-items-center justify-content-center shadow-sm mb-0",
								style: {
									width: "90px",
									height: "90px"
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "fs-3",
									children: icon
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "fw-semibold text-center text-truncate",
								style: {
									maxWidth: "100px",
									lineHeight: "1.2"
								},
								children: app?.approverAnggota?.nama || "-"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "small fst-italic text-muted text-center",
								style: { lineHeight: "1.2" },
								children: app?.status || "-"
							})
						]
					})
				}, app?.id || index);
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "border-top",
			children: allApproved && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
				xs: 12,
				className: "mt-3",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "bg-blue700 w-100 text-white",
					onClick: onNext,
					children: "Selanjutnya"
				})
			})
		})] })]
	});
}
//#endregion
//#region src/pages/anggota/DetailPendaftaranAnggota.jsx
function DetailPendaftaranAnggota() {
	const { userData } = useProfile();
	const [dataPendaftaran, setDataPendaftaran] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const navigate = useNavigate();
	const getPendaftaran = (0, import_react.useCallback)(async () => {
		let nik = userData?.nik;
		if (!nik) try {
			nik = (await UAnggota_default.findAnggotaByToken()).data?.nik;
		} catch (err) {
			console.error("Gagal mendapatkan data user:", err);
		}
		if (!nik) return;
		setLoading(true);
		try {
			setDataPendaftaran((await UApproval_default.getApprovalDetail({
				nik,
				type: "pendaftaran_anggota"
			})).data);
		} catch (err) {
			console.error(err);
			navigate(`/${jwtEncode({ page: "formPendaftaranAnggota" })}`, { state: {
				back: "pendaftaranAnggota",
				jenis: "pendaftaranAnggota"
			} });
		} finally {
			setLoading(false);
		}
	}, [userData, navigate]);
	(0, import_react.useEffect)(() => {
		getPendaftaran();
	}, [getPendaftaran]);
	const allApproved = dataPendaftaran?.RequestApproval?.length > 0 && dataPendaftaran.RequestApproval.every((apr) => apr?.status?.toLowerCase() === "approved");
	const handleInvoiceClick = () => {
		navigate(`/${jwtEncode({ page: "invoice" })}`, { state: {
			title: "Invoice Pendaftaran Anggota",
			back: "detailPendaftaranAnggota",
			data: dataPendaftaran?.token
		} });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
		fluid: true,
		className: "py-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
			className: "border-bottom mb-3 pb-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Col, {
				xs: 12,
				className: "d-flex align-items-center",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "link",
					className: "p-0 me-2",
					onClick: () => navigate(-1),
					style: { textDecoration: "none" },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FaArrowLeft, {
						size: 15,
						color: "black"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "fw-bold mb-0",
					children: "Pendaftaran Anggota"
				})]
			})
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Col, {
			md: 12,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card_default, {
				className: "border shadow-sm rounded-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardHeader, {
					className: "bg-topbar text-white rounded-top-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, {
						className: "mb-0",
						children: "Detail Pendaftaran"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardBody, { children: loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center my-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Spinner, {
						animation: "border",
						role: "status"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-muted",
						children: "Memuat data..."
					})]
				}) : dataPendaftaran ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Container, {
					fluid: true,
					className: "px-0",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PersonalInfoSection, {
							nik: dataPendaftaran?.anggota?.nik,
							nama: dataPendaftaran?.anggota?.nama,
							tempatLahir: dataPendaftaran?.anggota?.tempat_lahir,
							tglLahir: dataPendaftaran?.anggota?.tgl_lahir,
							jenisKelamin: dataPendaftaran?.anggota?.jenis_kelamin,
							golDarah: dataPendaftaran?.anggota?.gol_darah,
							alamat: dataPendaftaran?.anggota?.alamat,
							agama: dataPendaftaran?.anggota?.agama,
							statusKawin: dataPendaftaran?.anggota?.status_kawin
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PhotoInfoSection, {
							ktpImg: dataPendaftaran?.anggota?.ktpImg,
							fotoImg: dataPendaftaran?.anggota?.fotoImg
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AccountInfoSection, {
							categoryName: dataPendaftaran?.categoryAnggota?.nama,
							noTlp: dataPendaftaran?.anggota?.no_tlp,
							email: dataPendaftaran?.anggota?.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(JobInfoSection, { job: dataPendaftaran?.anggota?.job }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BankInfoSection, { bank: dataPendaftaran?.anggota?.bank }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalInfoSection, {
							requestApprovals: dataPendaftaran?.RequestApproval,
							allApproved,
							onNext: handleInvoiceClick
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Alert_default, {
					variant: "warning",
					className: "text-center my-3",
					children: "Data pendaftaran tidak tersedia."
				}) })]
			})
		}) })]
	});
}
//#endregion
export { DetailPendaftaranAnggota as default };
