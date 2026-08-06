/**
 * Personal Information Parser
 * Extracts Name, Email, Phone, LinkedIn, GitHub, Portfolio, and Location.
 */

const {
  EMAIL_REGEX,
  PHONE_REGEX,
  LINKEDIN_REGEX,
  GITHUB_REGEX,
  URL_REGEX
} = require('../../utils/regexHelpers');
const { cleanBulletPoints, capitalizeWords } = require('../../utils/textUtils');

const LOCATION_PATTERN = /\b([A-Z][a-zA-Z\t ]{1,30},\s*(?:[A-Z]{2}|[A-Z][a-zA-Z\t ]+))/;

/**
 * Extracts personal information from personal section lines and full text
 * @param {string[]} personalLines 
 * @param {string} fullText 
 * @returns {Object}
 */
function parsePersonal(personalLines = [], fullText = '') {
  const result = {
    name: '',
    email: '',
    phone: '',
    linkedin: '',
    github: '',
    portfolio: '',
    location: ''
  };

  const combinedText = [personalLines.join(' '), fullText].join('\n');

  // Extract Email
  const emailMatch = combinedText.match(EMAIL_REGEX);
  if (emailMatch) {
    result.email = emailMatch[0].trim();
  }

  // Extract Phone
  const phoneMatch = combinedText.match(PHONE_REGEX);
  if (phoneMatch) {
    result.phone = phoneMatch[0].trim();
  }

  // Extract LinkedIn
  const linkedinMatch = combinedText.match(LINKEDIN_REGEX);
  if (linkedinMatch) {
    let url = linkedinMatch[0].trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    result.linkedin = url;
  }

  // Extract GitHub
  const githubMatch = combinedText.match(GITHUB_REGEX);
  if (githubMatch) {
    let url = githubMatch[0].trim();
    if (!url.startsWith('http')) url = 'https://' + url;
    result.github = url;
  }

  // Extract Portfolio Website (other URLs not linkedin or github)
  const allUrls = combinedText.match(URL_REGEX) || [];
  for (const rawUrl of allUrls) {
    const url = rawUrl.toLowerCase();
    if (!url.includes('linkedin.com') && !url.includes('github.com') && !url.includes('email')) {
      let finalUrl = rawUrl.trim();
      if (!finalUrl.startsWith('http')) finalUrl = 'https://' + finalUrl;
      result.portfolio = finalUrl;
      break;
    }
  }

  // Extract Location
  const locMatch = combinedText.match(LOCATION_PATTERN);
  if (locMatch) {
    result.location = locMatch[1].trim();
  }

  // Extract Name (Usually the first non-contact line in personal section)
  for (const line of personalLines) {
    const cleanLine = cleanBulletPoints(line);
    if (!cleanLine) continue;
    
    // Ignore lines containing email, phone, url, or common resume titles
    if (
      EMAIL_REGEX.test(cleanLine) ||
      PHONE_REGEX.test(cleanLine) ||
      LINKEDIN_REGEX.test(cleanLine) ||
      GITHUB_REGEX.test(cleanLine) ||
      /resume|curriculum|cv|page|email|phone|contact|address/i.test(cleanLine)
    ) {
      continue;
    }

    // Name is typically 2 to 4 words with only alphabets and spaces
    if (/^[A-Za-z\s.'-]{2,40}$/.test(cleanLine) && cleanLine.split(/\s+/).length <= 4) {
      result.name = capitalizeWords(cleanLine);
      break;
    }
  }

  // Fallback name if missing: check top 3 lines of full text
  if (!result.name && fullText) {
    const topLines = fullText.split('\n').slice(0, 3);
    for (const line of topLines) {
      const cleanLine = cleanBulletPoints(line);
      if (
        cleanLine &&
        !EMAIL_REGEX.test(cleanLine) &&
        !PHONE_REGEX.test(cleanLine) &&
        /^[A-Za-z\s.'-]{2,40}$/.test(cleanLine)
      ) {
        result.name = capitalizeWords(cleanLine);
        break;
      }
    }
  }

  return result;
}

module.exports = { parsePersonal };
