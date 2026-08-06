/**
 * Regex Helpers for Resume Parsing
 * Specialized regular expressions for extracting contacts, URLs, dates, scores, and section headers.
 */

const EMAIL_REGEX = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/i;

const PHONE_REGEX = /(?:\+?\d{1,3}[\s.-]*)?(?:\(\d{1,4}\)[\s.-]*)?\d{3,4}[\s.-]*\d{3,4}(?:[\s.-]*\d{3,4})?|\b\d{10}\b/i;

const LINKEDIN_REGEX = /(?:https?:\/\/)?(?:www\.)?linkedin\.com\/in\/[A-Za-z0-9_-]+\/?/i;

const GITHUB_REGEX = /(?:https?:\/\/)?(?:www\.)?github\.com\/[A-Za-z0-9_-]+\/?/i;

const URL_REGEX = /(?:https?:\/\/)?(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/[^\s]*)?/gi;

const DATE_RANGE_REGEX = /(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s,.-]*)?(?:\d{4}|\d{2})[\s\u2013\u2014-]+(?:(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*[\s,.-]*)?(?:\d{4}|\d{2}|Present|Current|Till Date|Now)/gi;

const YEAR_REGEX = /\b(19|20)\d{2}\b/g;

const CGPA_REGEX = /(?:CGPA|GPA|Grade)[\s:]*([0-9]\.[0-9]{1,2}(?:\s*\/\s*(?:4|5|10))?|[0-9]{1,2}\.(?:[0-9]{1,2})\s*\/\s*10)/i;

const PERCENTAGE_REGEX = /(\b\d{1,2}(?:\.\d{1,2})?\s*%|\b100\s*%|(?:Percentage|Marks)[\s:]*\d{1,2}(?:\.\d{1,2})?)/i;

// Section Heading Regexes
const HEADINGS = {
  PERSONAL: /^(personal\s+(?:details|info|information)|contact\s+(?:info|information)|about\s+me)$/i,
  SUMMARY: /^(professional\s+summary|executive\s+summary|summary|profile|about\s+me|career\s+objective|objective)$/i,
  SKILLS: /^(skills|technical\s+skills|core\s+competencies|technologies|skills\s*(?:&|and)\s*tools|expertise)$/i,
  EXPERIENCE: /^(work\s+experience|professional\s+experience|employment\s+history|experience|career\s+history|internships)$/i,
  EDUCATION: /^(education|academic\ qualification|academic\ background|scholastic\ achievements)$/i,
  PROJECTS: /^(projects|personal\ projects|key\ projects|academic\ projects)$/i,
  CERTIFICATIONS: /^(certifications|licenses\s*(?:&|and)\s*certifications|certifications\s*(?:&|and)\s*licenses|certificates|courses|training)$/i,
  ACHIEVEMENTS: /^(achievements|honors\s*(?:&|and)\s*awards|awards|accomplishments|achievements\s*(?:&|and)\s*awards)$/i
};

// Known Programming Languages, Frameworks, Libraries, Databases, Tools dictionary for Skills Parser
const SKILLS_DICTIONARY = {
  languages: [
    'javascript', 'typescript', 'python', 'java', 'c++', 'c#', 'c', 'ruby', 'go', 'golang',
    'rust', 'php', 'swift', 'kotlin', 'dart', 'r', 'scala', 'matlab', 'perl', 'shell', 'bash',
    'powershell', 'html', 'html5', 'css', 'css3', 'sass', 'scss', 'sql', 'pl/sql', 'assembly'
  ],
  frameworks: [
    'react', 'react.js', 'reactjs', 'next.js', 'nextjs', 'angular', 'angularjs', 'vue', 'vue.js',
    'vuejs', 'svelte', 'express', 'express.js', 'expressjs', 'nest.js', 'nestjs', 'django',
    'flask', 'fastapi', 'spring', 'spring boot', 'laravel', 'rails', 'ruby on rails', 'asp.net',
    '.net core', 'nuxt.js', 'gatsby', 'remix', 'tailwind', 'tailwindcss', 'bootstrap', 'material ui', 'mui'
  ],
  libraries: [
    'redux', 'redux toolkit', 'zustand', 'recoil', 'react query', 'tanstack query', 'rxjs',
    'pandas', 'numpy', 'scipy', 'scikit-learn', 'tensorflow', 'keras', 'pytorch', 'opencv',
    'three.js', 'chart.js', 'd3.js', 'axios', 'pdf-parse', 'lodash', 'moment', 'dayjs', 'jest'
  ],
  databases: [
    'mongodb', 'postgresql', 'postgres', 'mysql', 'sqlite', 'redis', 'oracle', 'microsoft sql server',
    'mssql', 'cassandra', 'couchdb', 'dynamodb', 'firebase', 'firestore', 'supabase', 'neo4j', 'mariadb'
  ],
  tools: [
    'git', 'github', 'gitlab', 'bitbucket', 'docker', 'kubernetes', 'k8s', 'jenkins', 'travis ci',
    'circleci', 'github actions', 'aws', 'amazon web services', 'azure', 'gcp', 'google cloud',
    'terraform', 'ansible', 'postman', 'swagger', 'figma', 'jira', 'confluence', 'webpack',
    'vite', 'npm', 'yarn', 'pnpm', 'linux', 'unix', 'nginx', 'apache'
  ]
};

module.exports = {
  EMAIL_REGEX,
  PHONE_REGEX,
  LINKEDIN_REGEX,
  GITHUB_REGEX,
  URL_REGEX,
  DATE_RANGE_REGEX,
  YEAR_REGEX,
  CGPA_REGEX,
  PERCENTAGE_REGEX,
  HEADINGS,
  SKILLS_DICTIONARY
};
