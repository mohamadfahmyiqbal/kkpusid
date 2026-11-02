//#region src/utils/sanitization.js
/**
* Utility functions for input sanitization and XSS prevention
*/
/**
* Sanitize text content to prevent XSS attacks
* @param {string} text - Text to sanitize
* @returns {string} - Sanitized text
*/
var sanitizeText = (text) => {
	if (!text || typeof text !== "string") return "";
	return text.replace(/[<>]/g, "").replace(/javascript:/gi, "").replace(/on\w+=/gi, "").trim();
};
/**
* Safely get user display name
* @param {string} fullName - User's full name
* @returns {string} - Sanitized display name
*/
var getSafeDisplayName = (fullName) => {
	return sanitizeText(fullName).split(" ")[0] || "User";
};
/**
* Safe date formatting with error handling
* @param {string|Date} date - Date to format
* @param {string} locale - Locale for formatting (default: 'id-ID')
* @returns {string} - Formatted date or fallback string
*/
var safeDateFormat = (date, locale = "id-ID") => {
	try {
		if (!date) return "-";
		const dateObj = new Date(date);
		if (isNaN(dateObj.getTime())) return "-";
		return dateObj.toLocaleString(locale);
	} catch (error) {
		console.warn("Date formatting error:", error);
		return "-";
	}
};
/**
* Safe date formatting for dates only
* @param {string|Date} date - Date to format
* @param {string} locale - Locale for formatting (default: 'id-ID')
* @returns {string} - Formatted date or fallback string
*/
var safeDateOnlyFormat = (date, locale = "id-ID") => {
	try {
		if (!date) return "-";
		const dateObj = new Date(date);
		if (isNaN(dateObj.getTime())) return "-";
		return dateObj.toLocaleDateString(locale);
	} catch (error) {
		console.warn("Date formatting error:", error);
		return "-";
	}
};
//#endregion
export { sanitizeText as i, safeDateFormat as n, safeDateOnlyFormat as r, getSafeDisplayName as t };
