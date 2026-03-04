/**
 * Masks a spend string by replacing digits with '$'.
 * e.g. "$100" → "$$$" (3 digits → 3 $ signs, prefix $ is kept as literal)
 * e.g. "$1,000" → "$$$$" (4 digits → 4 $ signs)
 * @param {string} spendStr - A formatted spend string like "$1,234" or "1,234"
 * @returns {string} Masked string like "$$$$" with one $ per digit
 */
export function maskSpend(spendStr) {
    if (!spendStr) return spendStr;
    // Count digit characters only (strip $, commas, dots)
    const digitsOnly = spendStr.replace(/[^0-9]/g, '');
    return '$'.repeat(digitsOnly.length);
}
