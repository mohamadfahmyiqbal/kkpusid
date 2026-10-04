import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { jwtEncode } from "../utils/helpers";

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
        navigate(`/${token}`, options);
      } catch (error) {
        console.error("Navigation error:", error);
        // Fallback to direct navigation if JWT encoding fails
        navigate(`/${page}`, options);
      }
    },
    [navigate],
  );

  return { navigateTo };
};
