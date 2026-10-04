/**
 * Utility functions for input sanitization and XSS prevention
 */

/**
 * Sanitize text content to prevent XSS attacks
 * @param {string} text - Text to sanitize
 * @returns {string} - Sanitized text
 */
export const sanitizeText = (text) => {
  if (!text || typeof text !== 'string') return '';
  
  return text
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

/**
 * Safely get user display name
 * @param {string} fullName - User's full name
 * @returns {string} - Sanitized display name
 */
export const getSafeDisplayName = (fullName) => {
  const sanitized = sanitizeText(fullName);
  return sanitized.split(' ')[0] || 'User';
};

/**
 * Safe date formatting with error handling
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'id-ID')
 * @returns {string} - Formatted date or fallback string
 */
export const safeDateFormat = (date, locale = 'id-ID') => {
  try {
    if (!date) return '-';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '-';
    return dateObj.toLocaleString(locale);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return '-';
  }
};

/**
 * Safe date formatting for dates only
 * @param {string|Date} date - Date to format
 * @param {string} locale - Locale for formatting (default: 'id-ID')
 * @returns {string} - Formatted date or fallback string
 */
export const safeDateOnlyFormat = (date, locale = 'id-ID') => {
  try {
    if (!date) return '-';
    const dateObj = new Date(date);
    if (isNaN(dateObj.getTime())) return '-';
    return dateObj.toLocaleDateString(locale);
  } catch (error) {
    console.warn('Date formatting error:', error);
    return '-';
  }
};
