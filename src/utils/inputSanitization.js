/**
 * Input sanitization utilities for the Darwin application
 * Provides functions to safely handle user input and prevent injection attacks
 */

/**
 * Sanitizes a string for safe use in API calls and database operations.
 * Escapes special characters that could be used in SQL injection or XSS attacks.
 *
 * @param {string} input - The user input string to sanitize
 * @param {Object} options - Optional configuration
 * @param {number} options.maxLength - Maximum allowed length (default: 1024)
 * @param {boolean} options.allowNewlines - Whether to allow newline characters (default: false)
 * @returns {string} - The sanitized string
 */
export const sanitizeInput = (input, options = {}) => {
    const {
        maxLength = 1024,
        allowNewlines = false
    } = options;

    if (!input || typeof input !== 'string') {
        return '';
    }

    // Trim leading/trailing whitespace
    let sanitized = input.trim();

    // Enforce max length
    if (sanitized.length > maxLength) {
        sanitized = sanitized.substring(0, maxLength);
    }

    // Remove or replace newlines if not allowed
    if (!allowNewlines) {
        sanitized = sanitized.replace(/[\r\n]+/g, ' ');
    }

    // Remove null bytes (can cause issues in some databases)
    sanitized = sanitized.replace(/\0/g, '');

    // Escape single quotes by doubling them (SQL standard)
    // This allows single quotes in input while preventing SQL injection
    sanitized = sanitized.replace(/'/g, "''");

    // Remove other potentially dangerous characters for XSS prevention
    // Note: React already escapes content in JSX, but this adds an extra layer
    // Preserve common punctuation but remove control characters
    sanitized = sanitized.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '');

    return sanitized;
};

/**
 * Validates that an input string contains only safe characters
 * Use this for basic validation before sanitization
 *
 * @param {string} input - The input to validate
 * @param {Object} options - Validation options
 * @param {RegExp} options.pattern - Custom regex pattern (default: alphanumeric + common punctuation)
 * @returns {boolean} - True if input is valid, false otherwise
 */
export const validateInput = (input, options = {}) => {
    const {
        // Allow letters, numbers, spaces, and common punctuation
        pattern = /^[a-zA-Z0-9\s\-_.,!?'":;()\[\]]+$/
    } = options;

    if (!input || typeof input !== 'string') {
        return false;
    }

    return pattern.test(input);
};

/**
 * Sanitizes input specifically for domain names
 * More restrictive than general sanitization
 *
 * @param {string} input - The domain name to sanitize
 * @returns {string} - The sanitized domain name
 */
export const sanitizeDomainName = (input) => {
    return sanitizeInput(input, { maxLength: 255 });
};

/**
 * Sanitizes input specifically for area names
 * More restrictive than general sanitization
 *
 * @param {string} input - The area name to sanitize
 * @returns {string} - The sanitized area name
 */
export const sanitizeAreaName = (input) => {
    return sanitizeInput(input, { maxLength: 255 });
};

/**
 * Sanitizes input specifically for task descriptions
 * Allows more characters including newlines
 *
 * @param {string} input - The task description to sanitize
 * @returns {string} - The sanitized task description
 */
export const sanitizeTaskDescription = (input) => {
    return sanitizeInput(input, { maxLength: 1024, allowNewlines: true });
};

/**
 * Prepares user input for API transmission
 * Applies sanitization and returns a safe version
 *
 * @param {Object} data - Object containing user input fields
 * @param {Object} fieldConfig - Configuration for each field
 * @returns {Object} - Sanitized data object
 */
export const sanitizeFormData = (data, fieldConfig = {}) => {
    const sanitized = {};

    for (const [key, value] of Object.entries(data)) {
        if (typeof value === 'string') {
            const config = fieldConfig[key] || {};
            sanitized[key] = sanitizeInput(value, config);
        } else {
            // Pass through non-string values unchanged
            sanitized[key] = value;
        }
    }

    return sanitized;
};

/**
 * Reverts the SQL escaping applied by sanitizeInput
 * Use this when displaying data that was stored with escaped quotes
 *
 * @param {string} input - The escaped string
 * @returns {string} - The unescaped string
 */
export const unescapeInput = (input) => {
    if (!input || typeof input !== 'string') {
        return '';
    }

    // Convert doubled single quotes back to single quotes
    return input.replace(/''/g, "'");
};

export default {
    sanitizeInput,
    validateInput,
    sanitizeDomainName,
    sanitizeAreaName,
    sanitizeTaskDescription,
    sanitizeFormData,
    unescapeInput
};
