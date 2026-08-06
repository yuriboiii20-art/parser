/**
 * Skills Parser
 * Categorizes extracted technical skills into languages, frameworks, libraries, databases, tools, and general technologies.
 */

const { SKILLS_DICTIONARY } = require('../../utils/regexHelpers');
const { cleanBulletPoints } = require('../../utils/textUtils');

/**
 * Parses skills section and full text to classify skills into distinct categories.
 * @param {string[]} skillLines 
 * @param {string} fullText 
 * @returns {Object} { languages: [], frameworks: [], libraries: [], databases: [], tools: [], technologies: [] }
 */
function parseSkills(skillLines = [], fullText = '') {
  const result = {
    languages: new Set(),
    frameworks: new Set(),
    libraries: new Set(),
    databases: new Set(),
    tools: new Set(),
    technologies: new Set()
  };

  const combinedText = [...skillLines, fullText].join('\n').toLowerCase();

  // 1. Check for labeled lines (e.g. "Languages: JS, Python, Go")
  for (const line of skillLines) {
    const cleanLine = cleanBulletPoints(line);
    const parts = cleanLine.split(/[:\-]/);
    
    if (parts.length >= 2) {
      const categoryLabel = parts[0].toLowerCase().trim();
      const skillsValue = parts.slice(1).join(' ');
      const skillTokens = skillsValue.split(/[,|•\/\s]+/).map(s => s.trim()).filter(Boolean);

      if (categoryLabel.includes('language')) {
        skillTokens.forEach(t => result.languages.add(t));
      } else if (categoryLabel.includes('framework')) {
        skillTokens.forEach(t => result.frameworks.add(t));
      } else if (categoryLabel.includes('library') || categoryLabel.includes('libraries')) {
        skillTokens.forEach(t => result.libraries.add(t));
      } else if (categoryLabel.includes('database') || categoryLabel.includes('db')) {
        skillTokens.forEach(t => result.databases.add(t));
      } else if (categoryLabel.includes('tool') || categoryLabel.includes('platform')) {
        skillTokens.forEach(t => result.tools.add(t));
      } else {
        skillTokens.forEach(t => result.technologies.add(t));
      }
    }
  }

  // 2. Dictionary-based extraction across full text and skills section
  for (const [category, itemArray] of Object.entries(SKILLS_DICTIONARY)) {
    for (const item of itemArray) {
      // Escape special characters for regex match
      const escaped = item.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
      const regex = new RegExp(`(?:^|[^a-zA-Z0-9#+])${escaped}(?:$|[^a-zA-Z0-9#+])`, 'i');
      
      if (regex.test(combinedText)) {
        // Format neatly (e.g., JavaScript, React.js, PostgreSQL)
        const formatted = item.charAt(0).toUpperCase() + item.slice(1);
        if (result[category]) {
          result[category].add(formatted);
        }
      }
    }
  }

  // Convert Sets to Arrays and capitalize correctly
  const finalResult = {
    languages: Array.from(result.languages).map(formatSkillName),
    frameworks: Array.from(result.frameworks).map(formatSkillName),
    libraries: Array.from(result.libraries).map(formatSkillName),
    databases: Array.from(result.databases).map(formatSkillName),
    tools: Array.from(result.tools).map(formatSkillName),
    technologies: Array.from(result.technologies).map(formatSkillName)
  };

  return finalResult;
}

function formatSkillName(str) {
  if (!str) return '';
  const specialMap = {
    'js': 'JavaScript',
    'ts': 'TypeScript',
    'html': 'HTML5',
    'css': 'CSS3',
    'node.js': 'Node.js',
    'react.js': 'React.js',
    'vue.js': 'Vue.js',
    'express.js': 'Express.js',
    'next.js': 'Next.js',
    'mongodb': 'MongoDB',
    'postgresql': 'PostgreSQL',
    'mysql': 'MySQL',
    'aws': 'AWS',
    'gcp': 'GCP',
    'git': 'Git',
    'docker': 'Docker',
    'k8s': 'Kubernetes'
  };

  const lower = str.toLowerCase();
  if (specialMap[lower]) return specialMap[lower];

  return str.charAt(0).toUpperCase() + str.slice(1);
}

module.exports = { parseSkills };
