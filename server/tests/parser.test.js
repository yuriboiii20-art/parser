/**
 * Jest Unit Tests for Modular Parsers and Utilities
 */

const { parseResumeText, getSampleResume } = require('../services/parserService');
const { parsePersonal } = require('../parsers/personal/personalParser');
const { parseSkills } = require('../parsers/skills/skillsParser');
const { parseEducation } = require('../parsers/education/educationParser');
const { parseExperience } = require('../parsers/experience/experienceParser');
const { identifySectionHeader, detectSections } = require('../services/sectionDetector');
const { sanitizeResumeData } = require('../utils/privacy');

describe('Resume Parser Core Engine Tests', () => {

  describe('Section Detector', () => {
    test('should identify common section headers accurately', () => {
      expect(identifySectionHeader('WORK EXPERIENCE')).toBe('EXPERIENCE');
      expect(identifySectionHeader('Technical Skills')).toBe('SKILLS');
      expect(identifySectionHeader('EDUCATION')).toBe('EDUCATION');
      expect(identifySectionHeader('Personal Projects')).toBe('PROJECTS');
      expect(identifySectionHeader('Certifications & Licenses')).toBe('CERTIFICATIONS');
      expect(identifySectionHeader('Honors & Awards')).toBe('ACHIEVEMENTS');
    });

    test('should split text into valid section buckets', () => {
      const text = `
John Doe
john.doe@email.com
+1 123-456-7890

SKILLS
JavaScript, Node.js, React, MongoDB

WORK EXPERIENCE
Software Engineer at Acme Corp (2020 - 2023)
Developed REST APIs.

EDUCATION
B.S. Computer Science, University of California (2016 - 2020)
      `;
      const sections = detectSections(text);
      expect(sections.PERSONAL.length).toBeGreaterThan(0);
      expect(sections.SKILLS.length).toBeGreaterThan(0);
      expect(sections.EXPERIENCE.length).toBeGreaterThan(0);
      expect(sections.EDUCATION.length).toBeGreaterThan(0);
    });
  });

  describe('Personal Information Parser', () => {
    test('should extract name, email, phone, and links correctly', () => {
      const personalLines = ['Jane Smith', 'Senior Developer'];
      const text = `Jane Smith
jane.smith@example.com
+1 (555) 987-6543
https://linkedin.com/in/janesmith
https://github.com/janesmith
New York, NY`;

      const result = parsePersonal(personalLines, text);
      expect(result.name).toBe('Jane Smith');
      expect(result.email).toBe('jane.smith@example.com');
      expect(result.phone).toBe('+1 (555) 987-6543');
      expect(result.linkedin).toContain('linkedin.com/in/janesmith');
      expect(result.github).toContain('github.com/janesmith');
      expect(result.location).toBe('New York, NY');
    });
  });

  describe('Skills Parser', () => {
    test('should classify skills into categories', () => {
      const skillLines = [
        'Languages: JavaScript, Python, TypeScript',
        'Frameworks: React, Express, Next.js',
        'Databases: MongoDB, PostgreSQL',
        'Tools: Git, Docker, AWS'
      ];
      const result = parseSkills(skillLines, skillLines.join('\n'));
      expect(result.languages).toContain('JavaScript');
      expect(result.languages).toContain('Python');
      expect(result.frameworks).toContain('React');
      expect(result.databases).toContain('MongoDB');
      expect(result.tools).toContain('Git');
    });
  });

  describe('Education Parser', () => {
    test('should extract degree, university, CGPA, and dates', () => {
      const eduLines = [
        'Bachelor of Technology in Computer Science',
        'Stanford University',
        'CGPA: 3.9 / 4.0',
        '2018 - 2022'
      ];
      const result = parseEducation(eduLines);
      expect(result.length).toBe(1);
      expect(result[0].degree).toContain('Bachelor');
      expect(result[0].university).toContain('Stanford');
      expect(result[0].cgpa).toContain('3.9');
      expect(result[0].startYear).toBe('2018');
      expect(result[0].endYear).toBe('2022');
    });
  });

  describe('Experience Parser', () => {
    test('should extract company, title, duration, and descriptions', () => {
      const expLines = [
        'Software Engineer at Google',
        'Jan 2021 - Present',
        'San Francisco, CA',
        'Built scalable cloud APIs with Go and Kubernetes.'
      ];
      const result = parseExperience(expLines);
      expect(result.length).toBe(1);
      expect(result[0].company).toBe('Google');
      expect(result[0].title).toBe('Software Engineer');
      expect(result[0].duration).toBe('Jan 2021 - Present');
    });
  });

  describe('Full Orchestration Service', () => {
    test('should return complete JSON schema with fallbacks for missing fields', () => {
      const rawText = `Alice Johnson\nalice@test.com\nSKILLS\nJavaScript, Docker`;
      const json = parseResumeText(rawText);

      expect(json).toHaveProperty('name', 'Redacted User');
      expect(json).toHaveProperty('email', 'redacted@example.com');
      expect(json).toHaveProperty('skills');
      expect(json.skills).toHaveProperty('languages');
      expect(json).toHaveProperty('experience');
      expect(json).toHaveProperty('education');
      expect(json).toHaveProperty('projects');
      expect(json).toHaveProperty('certifications');
      expect(json).toHaveProperty('achievements');
    });

    test('should redact personal details from parsed resume data', () => {
      const payload = {
        name: 'Jane Doe',
        email: 'jane@example.com',
        phone: '+1 555-1234',
        linkedin: 'https://www.linkedin.com/in/jane',
        github: 'https://github.com/jane',
        location: 'San Francisco',
        summary: 'Contact me at jane@example.com'
      };

      const redacted = sanitizeResumeData(payload);

      expect(redacted.name).toBe('Redacted User');
      expect(redacted.email).toBe('redacted@example.com');
      expect(redacted.phone).toBe('[REDACTED]');
      expect(redacted.linkedin).toBe('[REDACTED]');
      expect(redacted.github).toBe('[REDACTED]');
      expect(redacted.location).toBe('[REDACTED]');
      expect(redacted.summary).toContain('redacted');
    });

    test('sample resume function returns rich sample object', () => {
      const sample = getSampleResume();
      expect(sample.name).toBe('Redacted User');
      expect(sample.skills.languages).toContain('JavaScript');
    });
  });
});
