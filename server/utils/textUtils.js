/**
 * Text Utility Functions for Resume Parsing
 */

/**
 * Normalizes raw PDF text by standardizing line breaks, removing non-printable characters,
 * and trimming excess whitespace.
 * @param {string} rawText 
 * @returns {string}
 */
function normalizeText(rawText) {
  if (!rawText || typeof rawText !== 'string') return '';
  
  return rawText
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .replace(/[\u200B-\u200D\uFEFF]/g, '') // remove zero-width spaces
    .replace(/\t/g, ' ')
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0)
    .join('\n');
}

/**
 * Splits text into non-empty line array
 * @param {string} text 
 * @returns {string[]}
 */
function getLines(text) {
  if (!text) return [];
  return text.split('\n').map(l => l.trim()).filter(Boolean);
}

/**
 * Clean bullet points and formatting artifacts from text
 * @param {string} text 
 * @returns {string}
 */
function cleanBulletPoints(text) {
  if (!text) return '';
  return text
    .replace(/^[\s•\-\*\u2022\u25CF\u25E6\u2013\u2014]+/, '')
    .trim();
}

/**
 * Capitalize first letter of each word
 * @param {string} str 
 * @returns {string}
 */
function capitalizeWords(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

module.exports = {
  normalizeText,
  getLines,
  cleanBulletPoints,
  capitalizeWords
};
