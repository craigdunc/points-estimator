/**
 * Masks a points number by replacing each digit with a filled circle (⬤).
 * e.g. 100 → "⬤⬤⬤ pts"  (3 digits → 3 circles)
 * e.g. 1000 → "⬤⬤⬤⬤ pts" (4 digits → 4 circles)
 * Commas and spaces in the formatted string are ignored — only digits are counted.
 * @param {number|string} ptsValue - A raw number or formatted string like "20,600"
 * @returns {string} Masked string of ⬤ circles, one per digit
 */
export function maskPts(ptsValue) {
    if (ptsValue === null || ptsValue === undefined) return '';
    const str = String(ptsValue);
    const digitCount = str.replace(/[^0-9]/g, '').length;
    return '⬤'.repeat(digitCount);
}
