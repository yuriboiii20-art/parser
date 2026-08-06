const REDACTED_VALUE = '[REDACTED]';
const REDACTED_EMAIL = 'redacted@example.com';

function sanitizeText(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, REDACTED_EMAIL)
    .replace(/\b(?:https?:\/\/|www\.)[^\s]+/gi, REDACTED_VALUE)
    .replace(/\b(?:\+?\d[\d\s().-]{7,}\d)\b/g, REDACTED_VALUE);
}

function sanitizeResumeData(data) {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const redacted = Array.isArray(data) ? [] : {};

  for (const [key, value] of Object.entries(data)) {
    if (value && typeof value === 'object' && !Array.isArray(value)) {
      redacted[key] = sanitizeResumeData(value);
    } else if (Array.isArray(value)) {
      redacted[key] = value.map((item) => {
        if (item && typeof item === 'object') {
          return sanitizeResumeData(item);
        }
        return sanitizeText(item);
      });
    } else if (typeof value === 'string') {
      if (['name', 'email', 'phone', 'linkedin', 'github', 'portfolio', 'location', 'summary'].includes(key)) {
        if (key === 'name') {
          redacted[key] = 'Redacted User';
        } else if (key === 'email') {
          redacted[key] = REDACTED_EMAIL;
        } else {
          redacted[key] = key === 'summary' ? sanitizeText(value).replace(/\bcontact\b/gi, 'contact information') : REDACTED_VALUE;
        }
      } else {
        redacted[key] = sanitizeText(value);
      }
    } else {
      redacted[key] = value;
    }
  }

  return redacted;
}

module.exports = {
  sanitizeResumeData,
  REDACTED_VALUE,
  REDACTED_EMAIL
};
