import { o as __toESM } from "./rolldown-runtime-Cf1989ZW.js";
import { Mn as require_react } from "./vendor-rpDlma0K.js";
import { Pr as useNavigate } from "./vendor-react-D5pUDmay.js";
import { s as jwtEncode } from "./index-BaUN0sjk.js";
//#region src/hooks/useNavigation.js
var import_react = /* @__PURE__ */ __toESM(require_react());
/**
* Custom hook for handling encrypted navigation
* Eliminates code duplication across components
*/
var useNavigation = () => {
	const navigate = useNavigate();
	return { navigateTo: (0, import_react.useCallback)((page, options = {}) => {
		if (!navigate) {
			console.warn("Navigation not available - Router context missing");
			return;
		}
		try {
			navigate(`/${jwtEncode({ page })}`, options);
		} catch (error) {
			console.error("Navigation error:", error);
			navigate(`/${page}`, options);
		}
	}, [navigate]) };
};
//#endregion
export { useNavigation as t };
