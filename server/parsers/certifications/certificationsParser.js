/**
 * Certifications Parser
 * Extracts list of certification names/credentials.
 */

const { cleanBulletPoints } = require('../../utils/textUtils');

/**
 * Parses certifications section lines into an array of strings
 * @param {string[]} certLines 
 * @returns {Array<string>}
 */
function parseCertifications(certLines = []) {
  if (!Array.isArray(certLines) || certLines.length === 0) {
    return [];
  }

  const result = [];

  for (const line of certLines) {
    const cleaned = cleanBulletPoints(line);
    if (cleaned && cleaned.length > 2) {
      result.push(cleaned);
    }
  }

  return result;
}

module.exports = { parseCertifications };
