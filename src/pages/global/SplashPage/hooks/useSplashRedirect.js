import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { getLandingRoute, getSplashDelay } from "../service/splashService";

export const useSplashRedirect = (delay) => {
  const navigate = useNavigate();
  const timeoutRef = useRef(null);

  useEffect(() => {
    const wait = getSplashDelay(delay);

    timeoutRef.current = setTimeout(() => {
      navigate(getLandingRoute(), { replace: true });
    }, wait);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [delay, navigate]);
};
