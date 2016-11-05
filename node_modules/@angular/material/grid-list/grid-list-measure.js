/**
 * Converts values into strings. Falsy values become empty strings.
 * TODO: internal
 */
export function coerceToString(value) {
    return "" + (value || '');
}
/**
 * Converts a value that might be a string into a number.
 * TODO: internal
 */
export function coerceToNumber(value) {
    return typeof value === 'string' ? parseInt(value, 10) : value;
}

//# sourceMappingURL=grid-list-measure.js.map
