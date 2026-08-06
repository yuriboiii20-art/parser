/**
 * Experience Parser
 * Extracts Company Name, Job Title, Duration, Location, and Description bullets for every job entry.
 */

const { DATE_RANGE_REGEX, YEAR_REGEX } = require('../../utils/regexHelpers');
const { cleanBulletPoints } = require('../../utils/textUtils');

const TITLE_KEYWORDS = /(?:engineer|developer|architect|lead|manager|consultant|intern|specialist|analyst|designer|administrator|associate|director|vp|head|co-founder|founder)/i;

/**
 * Parses experience section lines into structured job experience objects
 * @param {string[]} expLines 
 * @returns {Array<Object>}
 */
function parseExperience(expLines = []) {
  if (!Array.isArray(expLines) || expLines.length === 0) {
    return [];
  }

  const experiences = [];
  let currentEntry = null;

  for (let i = 0; i < expLines.length; i++) {
    const line = cleanBulletPoints(expLines[i]);
    if (!line) continue;

    // Check if line contains date range (indicates job timeline)
    const dateMatch = line.match(DATE_RANGE_REGEX) || line.match(YEAR_REGEX);

    if (dateMatch) {
      if (currentEntry && !currentEntry.duration && currentEntry.descriptionLines.length === 0) {
        currentEntry.duration = dateMatch[0].trim();
      } else {
        if (currentEntry) {
          experiences.push(formatEntry(currentEntry));
        }

        currentEntry = {
          company: '',
          title: '',
          duration: dateMatch[0].trim(),
          location: '',
          descriptionLines: []
        };

        const lineWithoutDate = line.replace(DATE_RANGE_REGEX, '').replace(YEAR_REGEX, '').trim();
        parseTitleAndCompany(lineWithoutDate, currentEntry, expLines, i);
      }
      continue;
    } else if (TITLE_KEYWORDS.test(line) && (!currentEntry || currentEntry.descriptionLines.length > 0)) {
      if (currentEntry) {
        experiences.push(formatEntry(currentEntry));
      }

      currentEntry = {
        company: '',
        title: '',
        duration: '',
        location: '',
        descriptionLines: []
      };

      parseTitleAndCompany(line, currentEntry, expLines, i);
      continue;
    }

    if (currentEntry) {
      // Check if line is a location (e.g. "San Francisco, CA")
      if (!currentEntry.location && /^[A-Z][a-zA-B\s]+,\s*(?:[A-Z]{2}|[A-Z][a-zA-B\s]+)$/.test(line)) {
        currentEntry.location = line;
      } else {
        currentEntry.descriptionLines.push(line);
      }
    }
  }

  if (currentEntry) {
    experiences.push(formatEntry(currentEntry));
  }

  return experiences;
}

function parseTitleAndCompany(lineStr, entry, expLines, currentIndex) {
  if (!lineStr && currentIndex > 0) {
    lineStr = expLines[currentIndex - 1];
  }

  const parts = lineStr.split(/\s+at\s+|\s+[|@-]\s+|\s+,\s+/i);
  if (parts.length >= 2) {
    if (TITLE_KEYWORDS.test(parts[0])) {
      entry.title = parts[0].trim();
      entry.company = parts[1].trim();
    } else if (TITLE_KEYWORDS.test(parts[1])) {
      entry.company = parts[0].trim();
      entry.title = parts[1].trim();
    } else {
      entry.title = parts[0].trim();
      entry.company = parts[1].trim();
    }
  } else if (lineStr) {
    if (TITLE_KEYWORDS.test(lineStr)) {
      entry.title = lineStr;
    } else {
      entry.company = lineStr;
    }
  }
}

function formatEntry(entry) {
  return {
    company: entry.company || 'N/A',
    title: entry.title || 'N/A',
    duration: entry.duration || 'N/A',
    location: entry.location || 'N/A',
    description: entry.descriptionLines.join('. ')
  };
}

module.exports = { parseExperience };
