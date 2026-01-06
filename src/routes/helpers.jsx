// routes/helpers.jsx

/**
 * KONFIGURASI JWT ENCODING
 */
const JWT_CONFIG = {
  VERSION: "1.0",
  HEADER: {
    alg: "none",
    typ: "JWT",
    ver: "1.0",
  },
  // TTL untuk token (24 jam dalam milliseconds)
  DEFAULT_TTL: 24 * 60 * 60 * 1000,
  // Reserved keys yang tidak boleh digunakan di payload
  RESERVED_KEYS: ["_v", "_ts", "_exp", "_src", "_nav"],
};

/**
 * Validasi payload sebelum encode
 * @param {Object} payload - Data payload
 * @returns {Object} Validated payload
 */
const validatePayload = (payload) => {
  if (!payload || typeof payload !== "object") {
    throw new Error("Payload must be a non-null object");
  }

  if (!payload.page || typeof payload.page !== "string") {
    throw new Error('Payload must contain a "page" string property');
  }

  // Cek reserved keys
  JWT_CONFIG.RESERVED_KEYS.forEach((key) => {
    if (payload[key] !== undefined) {
      console.warn(
        `Payload contains reserved key: ${key}. It will be overwritten.`
      );
    }
  });

  return { ...payload };
};

/**
 * Encode object ke JWT sederhana (tanpa signature)
 * @param {Object} payload - Data yang akan diencode
 * @param {Object} options - { expiresIn: milliseconds, source: string }
 * @returns {string} JWT token
 */
export const jwtEncode = (payload, options = {}) => {
  try {
    // Validasi payload
    const validatedPayload = validatePayload(payload);

    // Tambahkan metadata
    const enhancedPayload = {
      ...validatedPayload,
      _v: JWT_CONFIG.VERSION,
      _ts: Date.now(),
      _exp: options.expiresIn
        ? Date.now() + options.expiresIn
        : Date.now() + JWT_CONFIG.DEFAULT_TTL,
      _src: options.source || "encode",
    };

    // Encode function dengan Base64URL
    const encodeToBase64URL = (obj) => {
      try {
        // Stringify dengan error handling
        const jsonString = JSON.stringify(obj);
        // Encode URI component untuk handle special characters
        const uriEncoded = encodeURIComponent(jsonString);
        // Convert to Base64
        const base64 = btoa(uriEncoded);
        // Convert to Base64URL (URL-safe)
        return base64
          .replace(/=/g, "") // Remove padding
          .replace(/\+/g, "-") // 62nd char of encoding
          .replace(/\//g, "_"); // 63rd char of encoding
      } catch (error) {
        throw new Error(`Encoding failed: ${error.message}`);
      }
    };

    // Encode header dan payload
    const encodedHeader = encodeToBase64URL(JWT_CONFIG.HEADER);
    const encodedPayload = encodeToBase64URL(enhancedPayload);

    // Return JWT format: header.payload.
    return `${encodedHeader}.${encodedPayload}.`;
  } catch (error) {
    console.error("jwtEncode Error:", error);

    // Fallback token untuk halaman landing jika terjadi error
    const fallbackPayload = {
      page: "landingPage",
      _error: true,
      _message: error.message,
      _ts: Date.now(),
    };

    try {
      const fallbackJson = JSON.stringify(fallbackPayload);
      const fallbackBase64 = btoa(encodeURIComponent(fallbackJson))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

      return `eyJhbGciOiJub25lIiwidHlwIjoiSldUIiwidmVyIjoiMS4wIn0.${fallbackBase64}.`;
    } catch (fallbackError) {
      // Ultimate fallback
      return "eyJhbGciOiJub25lIiwidHlwIjoiSldUIn0.eyJwYWdlIjoibGFuZGluZ1BhZ2UiLCJfZXJyb3IiOnRydWV9.";
    }
  }
};

/**
 * Decode JWT token menjadi object payload
 * @param {string} token - JWT token
 * @returns {Object|null} Decoded payload atau null jika invalid
 */
export const jwtDecodePage = (token) => {
  // Validasi input dasar
  if (!token || typeof token !== "string") {
    console.warn("Invalid token: must be a non-empty string");
    return null;
  }

  if (token.trim().length === 0) {
    console.warn("Invalid token: empty string");
    return null;
  }

  try {
    // Split token menjadi parts
    const parts = token.split(".");

    // Validasi format JWT (header.payload.)
    if (parts.length !== 3) {
      console.warn(`Invalid JWT format: expected 3 parts, got ${parts.length}`);
      return null;
    }

    const [, payloadBase64] = parts;

    // Validasi payload tidak kosong
    if (!payloadBase64 || payloadBase64.length === 0) {
      console.warn("Invalid JWT: empty payload");
      return null;
    }

    // Convert Base64URL back to Base64
    let base64 = payloadBase64
      .replace(/-/g, "+") // 62nd char of encoding
      .replace(/_/g, "/"); // 63rd char of encoding

    // Add padding jika diperlukan
    const paddingNeeded = base64.length % 4;
    if (paddingNeeded) {
      base64 += "=".repeat(4 - paddingNeeded);
    }

    // Decode Base64
    const decoded = atob(base64);

    // Decode URI component
    const uriDecoded = decodeURIComponent(decoded);

    // Parse JSON
    const payload = JSON.parse(uriDecoded);

    // Validasi payload structure
    if (!payload.page || typeof payload.page !== "string") {
      console.warn('Invalid payload: missing or invalid "page" property');
      return null;
    }

    // Cek expired token
    if (payload._exp && Date.now() > payload._exp) {
      console.warn(`Token expired: ${new Date(payload._exp).toISOString()}`);
      return {
        ...payload,
        _expired: true,
        _valid: false,
      };
    }

    // Tambahkan validation flag
    return {
      ...payload,
      _valid: true,
      _decodedAt: Date.now(),
    };
  } catch (error) {
    // Detailed error logging
    const errorType = error.name || "UnknownError";
    const errorMsg = error.message || "No error message";

    console.warn(`Token decode failed [${errorType}]:`, errorMsg);

    // Return minimal error object
    return {
      page: "landingPage",
      _error: true,
      _errorType: errorType,
      _errorMsg: errorMsg,
      _valid: false,
      _decodedAt: Date.now(),
    };
  }
};

/**
 * Helper untuk generate route token dengan preset options
 * @param {string} pageName - Nama halaman
 * @param {Object} extraData - Data tambahan
 * @param {Object} options - Encoding options
 * @returns {string} JWT token
 */
export const generateRouteToken = (pageName, extraData = {}, options = {}) => {
  return jwtEncode(
    {
      page: pageName,
      ...extraData,
    },
    {
      expiresIn: options.expiresIn || JWT_CONFIG.DEFAULT_TTL,
      source: options.source || "navigation",
    }
  );
};

/**
 * Validasi apakah route memerlukan authentication
 * @param {string} pageName - Nama halaman
 * @returns {boolean}
 */
export const requiresAuth = (pageName) => {
  const publicRoutes = [
    "globalSplash",
    "landingPage",
    "authLogin",
    "accountRegisterPage",
    "authForgotPassword",
    "authForgotOtp",
    "authResetPassword",
  ];

  return !publicRoutes.includes(pageName);
};

/**
 * Extract page name dari token (shortcut function)
 * @param {string} token - JWT token
 * @returns {string|null} Nama halaman atau null
 */
export const getPageFromToken = (token) => {
  const decoded = jwtDecodePage(token);
  return decoded?._valid ? decoded.page : null;
};
