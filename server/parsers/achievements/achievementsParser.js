/**
 * Achievements Parser
 * Extracts achievements, awards, and honors.
 */

const { cleanBulletPoints } = require('../../utils/textUtils');

/**
 * Parses achievements section lines into an array of strings
 * @param {string[]} achLines 
 * @returns {Array<string>}
 */
function parseAchievements(achLines = []) {
  if (!Array.isArray(achLines) || achLines.length === 0) {
    return [];
  }

  const result = [];

  for (const line of achLines) {
    const cleaned = cleanBulletPoints(line);
    if (cleaned && cleaned.length > 2) {
      result.push(cleaned);
    }
  }

  return result;
}

module.exports = { parseAchievements };
