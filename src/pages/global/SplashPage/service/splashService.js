import { jwtEncode } from "../../../../utils/helpers";

export const DEFAULT_SPLASH_DELAY = 5000;

export const getSplashDelay = (delay) => {
  const parsed = Number(delay);
  return Number.isFinite(parsed) ? Math.max(300, parsed) : DEFAULT_SPLASH_DELAY;
};

export const getLandingRoute = () => {
  const encryptedPath = jwtEncode({ page: "landingPage" });
  return `/${encryptedPath}`;
};
