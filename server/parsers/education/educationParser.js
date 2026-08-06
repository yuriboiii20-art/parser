/**
 * Education Parser
 * Extracts Degree, College, University, CGPA, Percentage, Start Year, and End Year.
 */

const { CGPA_REGEX, PERCENTAGE_REGEX, YEAR_REGEX } = require('../../utils/regexHelpers');
const { cleanBulletPoints } = require('../../utils/textUtils');

const DEGREE_REGEX = /(?:bachelor|master|phd|doctorate|b\.tech|m\.tech|b\.e|m\.e|b\.s|m\.s|b\.a|m\.a|bca|mca|bba|mba|diploma|associate|high\s+school)/i;

const COLLEGE_UNI_KEYWORDS = /(?:university|college|institute|school|academy|polytechnic)/i;

/**
 * Parses education section lines into structured records
 * @param {string[]} eduLines 
 * @returns {Array<Object>}
 */
function parseEducation(eduLines = []) {
  if (!Array.isArray(eduLines) || eduLines.length === 0) {
    return [];
  }

  const records = [];
  let currentRecord = null;

  for (const line of eduLines) {
    const cleanLine = cleanBulletPoints(line);
    if (!cleanLine) continue;

    const isDegreeLine = DEGREE_REGEX.test(cleanLine);
    const isInstLine = COLLEGE_UNI_KEYWORDS.test(cleanLine);

    if (isDegreeLine || isInstLine || !currentRecord) {
      if (currentRecord && (isDegreeLine || (isInstLine && currentRecord.university))) {
        records.push(finalizeEducationRecord(currentRecord));
        currentRecord = null;
      }

      if (!currentRecord) {
        currentRecord = {
          degree: '',
          college: '',
          university: '',
          cgpa: '',
          percentage: '',
          startYear: '',
          endYear: ''
        };
      }
    }

    // Extract CGPA
    const cgpaMatch = cleanLine.match(CGPA_REGEX);
    if (cgpaMatch) {
      currentRecord.cgpa = cgpaMatch[1] || cgpaMatch[0];
    }

    // Extract Percentage
    const pctMatch = cleanLine.match(PERCENTAGE_REGEX);
    if (pctMatch) {
      currentRecord.percentage = pctMatch[1] || pctMatch[0];
    }

    // Extract Years
    const years = cleanLine.match(YEAR_REGEX);
    if (years) {
      if (years.length >= 2) {
        currentRecord.startYear = years[0];
        currentRecord.endYear = years[1];
      } else if (years.length === 1) {
        if (!currentRecord.endYear) {
          currentRecord.endYear = years[0];
        } else {
          currentRecord.startYear = years[0];
        }
      }
    }

    // Degree string
    if (DEGREE_REGEX.test(cleanLine) && !currentRecord.degree) {
      currentRecord.degree = cleanLine;
    } else if (COLLEGE_UNI_KEYWORDS.test(cleanLine)) {
      if (!currentRecord.university) {
        currentRecord.university = cleanLine;
        currentRecord.college = cleanLine;
      }
    }
  }

  if (currentRecord) {
    records.push(finalizeEducationRecord(currentRecord));
  }

  return records;
}

function finalizeEducationRecord(rec) {
  return {
    degree: rec.degree || 'N/A',
    college: rec.college || 'N/A',
    university: rec.university || 'N/A',
    cgpa: rec.cgpa || 'N/A',
    percentage: rec.percentage || 'N/A',
    startYear: rec.startYear || 'N/A',
    endYear: rec.endYear || 'N/A'
  };
}

module.exports = { parseEducation };
