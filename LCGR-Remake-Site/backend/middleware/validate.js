const sanitizeHtmlLib = require('sanitize-html');

function validateMaxLength(value, fieldName, maxLength) {
  if (value && typeof value === 'string' && value.length > maxLength) {
    return `${fieldName} must be ${maxLength} characters or less.`;
  }
  return null;
}

function validateEnum(value, fieldName, allowedValues) {
  if (value && !allowedValues.includes(value)) {
    return `${fieldName} must be one of: ${allowedValues.join(', ')}`;
  }
  return null;
}

/**
 * Strip all HTML tags from a text string.
 */
function sanitizeHtml(value) {
  if (!value || typeof value !== 'string') return value;
  return sanitizeHtmlLib(value, {
    allowedTags: [],
    allowedAttributes: {},
  });
}

/**
 * Validate that a URL is safe (local upload path, relative path, or http/https).
 * Returns an error string if invalid, null if valid or falsy.
 */
function validateUrl(value, fieldName) {
  if (!value) return null;
  if (typeof value !== 'string') {
    return `${fieldName} must be a string.`;
  }
  // Reject dangerous protocols
  const lower = value.toLowerCase().trim();
  if (
    lower.startsWith('javascript:') ||
    lower.startsWith('data:') ||
    lower.startsWith('vbscript:')
  ) {
    return `${fieldName} contains a disallowed protocol.`;
  }
  // Allow relative paths starting with /
  if (value.startsWith('/')) return null;
  // Allow http and https URLs
  try {
    const parsed = new URL(value);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:') {
      return null;
    }
    return `${fieldName} must be a relative path or an http/https URL.`;
  } catch {
    return `${fieldName} must be a relative path or an http/https URL.`;
  }
}

/**
 * Validate that a value is an integer (if provided).
 */
function validateInteger(value, fieldName) {
  if (value === undefined || value === null) return null;
  if (!Number.isInteger(value)) {
    return `${fieldName} must be an integer.`;
  }
  return null;
}

/**
 * Validate that a value is a boolean or 0/1 (if provided).
 */
function validateBoolean(value, fieldName) {
  if (value === undefined || value === null) return null;
  if (typeof value === 'boolean' || value === 0 || value === 1) return null;
  return `${fieldName} must be a boolean (true/false) or 0/1.`;
}

module.exports = {
  validateMaxLength,
  validateEnum,
  sanitizeHtml,
  validateUrl,
  validateInteger,
  validateBoolean,
};
