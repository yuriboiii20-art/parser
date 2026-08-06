/**
 * Section Detector Service
 * Identifies section headings in resume text and splits raw text into named sections.
 */

const { HEADINGS } = require('../utils/regexHelpers');
const { getLines } = require('../utils/textUtils');

/**
 * Detects section header type from line string
 * @param {string} line 
 * @returns {string|null} Section key or null if not a heading line
 */
function identifySectionHeader(line) {
  if (!line || line.length > 50) return null; // Headings are usually concise
  
  const cleanLine = line.replace(/[^a-zA-Z&\s]/g, '').trim();
  if (!cleanLine) return null;

  for (const [sectionKey, regex] of Object.entries(HEADINGS)) {
    if (regex.test(cleanLine)) {
      return sectionKey;
    }
  }

  return null;
}

/**
 * Detects sections in normalized text
 * @param {string} text 
 * @returns {Object} Map of section names to array of line strings
 */
function detectSections(text) {
  const lines = getLines(text);
  const sections = {
    PERSONAL: [],
    SUMMARY: [],
    SKILLS: [],
    EXPERIENCE: [],
    EDUCATION: [],
    PROJECTS: [],
    CERTIFICATIONS: [],
    ACHIEVEMENTS: []
  };

  let currentSection = 'PERSONAL';

  for (const line of lines) {
    const detectedHeader = identifySectionHeader(line);
    if (detectedHeader) {
      currentSection = detectedHeader;
    } else {
      if (sections[currentSection]) {
        sections[currentSection].push(line);
      } else {
        sections.PERSONAL.push(line);
      }
    }
  }

  return sections;
}

module.exports = {
  identifySectionHeader,
  detectSections
};
