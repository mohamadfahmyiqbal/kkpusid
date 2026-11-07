import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../utils/helpers";

/**
 * Sanitasi path navigasi untuk mencegah open-redirect melalui bypass karakter khusus (mis. backslash)
 * @param {string} path - Target path
 * @returns {string} Safe internal path
 */
export const sanitizeNavigatePath = (path) => {
  if (typeof path !== "string") return "/";
  // Cegah manipulasi skema http:/https: atau backslash leading/internal yang memicu domain eksternal
  const cleaned = path.replace(/\\/g, "/");
  if (cleaned.startsWith("//") || /^https?:\/\//i.test(cleaned)) {
    console.warn("Ditolak: Upaya redirect navigasi ke luar domain dibatalkan");
    return "/";
  }
  return cleaned;
};

/**
 * Custom hook for handling encrypted navigation
 * Eliminates code duplication across components
 */
export const useNavigation = () => {
  const navigate = useNavigate();

  const navigateTo = useCallback(
    (page, options = {}) => {
      if (!navigate) {
        console.warn("Navigation not available - Router context missing");
        return;
      }
      try {
        const token = jwtEncode({ page });
        const safePath = sanitizeNavigatePath(`/${token}`);
        navigate(safePath, options);
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback to direct navigation if JWT encoding fails
        const safePath = sanitizeNavigatePath(`/${page}`);
        navigate(safePath, options);
      }
    },
    [navigate],
  );

  return { navigateTo };
};
