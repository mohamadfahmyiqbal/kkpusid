import { useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { getLandingRoute, getSplashDelay } from "../service/splashService";

export const useSplashRedirect = (delay) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  const skip = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    navigate(getLandingRoute(), { replace: true });
  }, [navigate]);

  useEffect(() => {
    const wait = getSplashDelay(delay);

    timeoutRef.current = setTimeout(() => {
      skip();
    }, wait);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, skip]);

  return { skip };
};
