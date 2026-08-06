/**
 * Professional Summary Parser
 * Extracts About / Summary / Objective paragraph from detected section lines.
 */

const { cleanBulletPoints } = require('../../utils/textUtils');

/**
 * Parses summary section lines
 * @param {string[]} summaryLines 
 * @returns {string}
 */
function parseSummary(summaryLines = []) {
  if (!Array.isArray(summaryLines) || summaryLines.length === 0) {
    return '';
  }

  const cleaned = summaryLines
    .map(line => cleanBulletPoints(line))
    .filter(Boolean)
    .join(' ');

  return cleaned;
}

module.exports = { parseSummary };
