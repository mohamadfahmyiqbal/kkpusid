import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react } from "./vendor-rpDlma0K.js";
import { t as api } from "./common-qX05v8MF.js";
//#region src/utils/api/UAnggota.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var UAnggota = class {
	submitRegistration(formData) {
		return api.post("/anggota/pendaftaran", formData, { timeout: 3e4 });
	}
	getRegistrationStatus() {
		return api.get("/anggota/getRegistrationStatus");
	}
	getProfile() {
		return api.get("/anggota/profil");
	}
	daftarAnggota(filter = {}) {
		return api.get("/anggota/list", { params: filter });
	}
};
var uAnggota = new UAnggota();
//#endregion
//#region src/pages/anggota/RegistrationPage/hooks/useRegistrationStatus.js
function useRegistrationStatus() {
	const [isRegistered, setIsRegistered] = (0, import_react.useState)(false);
	const [registrationData, setRegistrationData] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	const intervalRef = (0, import_react.useRef)(null);
	const fetchRegistrationStatus = (0, import_react.useCallback)(async (showLoading = true) => {
		try {
			if (showLoading) setLoading(true);
			const result = (await uAnggota.getRegistrationStatus()).data;
			if (result?.status === true && result.is_registration_done === true && result.data) {
				setIsRegistered(true);
				setRegistrationData(result.data);
				if (result.data.final_status === "APPROVED" && intervalRef.current) {
					clearInterval(intervalRef.current);
					intervalRef.current = null;
				}
			} else {
				setIsRegistered(false);
				setRegistrationData(null);
			}
		} catch (err) {
			console.error("--- DEBUG ERROR ---");
			console.error("Error Message:", err.message);
			setIsRegistered(false);
			setRegistrationData(null);
		} finally {
			if (showLoading) setLoading(false);
		}
	}, []);
	(0, import_react.useEffect)(() => {
		fetchRegistrationStatus();
		intervalRef.current = setInterval(() => {
			fetchRegistrationStatus(false);
		}, 3e4);
		const handleRefresh = () => {
			fetchRegistrationStatus(false);
		};
		window.addEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);
		return () => {
			if (intervalRef.current) clearInterval(intervalRef.current);
			window.removeEventListener("REFRESH_REGISTRATION_STATUS", handleRefresh);
		};
	}, [fetchRegistrationStatus]);
	return {
		isRegistered,
		registrationData,
		loading
	};
}
//#endregion
export { useRegistrationStatus as t };
