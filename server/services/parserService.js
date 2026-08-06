/**
 * Parser Service Orchestrator
 * Integrates text normalization, section detection, and individual parser modules.
 */

const { normalizeText } = require('../utils/textUtils');
const { detectSections } = require('./sectionDetector');
const { parsePersonal } = require('../parsers/personal/personalParser');
const { sanitizeResumeData } = require('../utils/privacy');
const { parseSummary } = require('../parsers/summary/summaryParser');
const { parseSkills } = require('../parsers/skills/skillsParser');
const { parseExperience } = require('../parsers/experience/experienceParser');
const { parseEducation } = require('../parsers/education/educationParser');
const { parseProjects } = require('../parsers/projects/projectsParser');
const { parseCertifications } = require('../parsers/certifications/certificationsParser');
const { parseAchievements } = require('../parsers/achievements/achievementsParser');

/**
 * Parses raw text extracted from PDF into a structured JSON resume format
 * @param {string} rawText 
 * @returns {Object} Structured JSON resume
 */
function parseResumeText(rawText) {
  const normalized = normalizeText(rawText);
  const sections = detectSections(normalized);

  const personal = parsePersonal(sections.PERSONAL, normalized);
  const summary = parseSummary(sections.SUMMARY);
  const skills = parseSkills(sections.SKILLS, normalized);
  const experience = parseExperience(sections.EXPERIENCE);
  const education = parseEducation(sections.EDUCATION);
  const projects = parseProjects(sections.PROJECTS);
  const certifications = parseCertifications(sections.CERTIFICATIONS);
  const achievements = parseAchievements(sections.ACHIEVEMENTS);

  const parsed = {
    name: personal.name || '',
    email: personal.email || '',
    phone: personal.phone || '',
    linkedin: personal.linkedin || '',
    github: personal.github || '',
    portfolio: personal.portfolio || '',
    location: personal.location || '',
    summary: summary || '',
    skills: {
      languages: skills.languages || [],
      frameworks: skills.frameworks || [],
      libraries: skills.libraries || [],
      databases: skills.databases || [],
      tools: skills.tools || [],
      technologies: skills.technologies || []
    },
    experience: experience || [],
    education: education || [],
    projects: projects || [],
    certifications: certifications || [],
    achievements: achievements || []
  };

  return sanitizeResumeData(parsed);
}

/**
 * Generates sample structured JSON response for demonstration / GET /api/parser/sample
 * @returns {Object}
 */
function getSampleResume() {
  const sample = {
    name: "Alex Mercer",
    email: "alex.mercer@example.com",
    phone: "+1 (555) 234-5678",
    linkedin: "https://linkedin.com/in/alexmercer",
    github: "https://github.com/alexmercer",
    portfolio: "https://alexmercer.dev",
    location: "San Francisco, CA",
    summary: "Senior Full Stack Software Engineer with over 6 years of experience designing scalable web applications, RESTful microservices, and distributed cloud systems using React, Node.js, and TypeScript.",
    skills: {
      languages: ["JavaScript", "TypeScript", "Python", "Go", "SQL", "HTML5", "CSS3"],
      frameworks: ["React", "Next.js", "Express.js", "NestJS", "Tailwind CSS"],
      libraries: ["Redux Toolkit", "Zustand", "Jest", "Axios", "pdf-parse"],
      databases: ["PostgreSQL", "MongoDB", "Redis"],
      tools: ["Git", "Docker", "Kubernetes", "AWS", "GitHub Actions", "Postman", "Vite"]
    },
    experience: [
      {
        company: "TechScale Solutions Inc.",
        title: "Senior Full Stack Engineer",
        duration: "Jan 2022 - Present",
        location: "San Francisco, CA",
        description: "Architected microservices handling 5M+ daily requests using Node.js and PostgreSQL. Spearheaded migration of legacy frontend to Next.js and Tailwind CSS, reducing page load time by 45%."
      },
      {
        company: "Innovate AI Systems",
        title: "Software Engineer",
        duration: "Jun 2019 - Dec 2021",
        location: "Austin, TX",
        description: "Developed real-time analytics dashboard with React and Express. Integrated REST APIs and automated deployment pipelines using Docker and GitHub Actions."
      }
    ],
    education: [
      {
        degree: "Bachelor of Science in Computer Science",
        college: "College of Engineering",
        university: "University of California, Berkeley",
        cgpa: "3.85 / 4.0",
        percentage: "N/A",
        startYear: "2015",
        endYear: "2019"
      }
    ],
    projects: [
      {
        name: "Resume Parser Cloud",
        description: "Full-stack web application for parsing PDF resumes into structured JSON using Node.js, Express, pdf-parse, and React.",
        technologies: ["Node.js", "Express", "React", "Tailwind CSS", "pdf-parse"],
        githubLink: "https://github.com/alexmercer/resume-parser-cloud"
      },
      {
        name: "Realtime Collaborative Canvas",
        description: "Interactive canvas enabling multi-user real-time drawing and document editing over WebSockets.",
        technologies: ["TypeScript", "React", "Node.js", "Socket.io"],
        githubLink: "https://github.com/alexmercer/collab-canvas"
      }
    ],
    certifications: [
      "AWS Certified Solutions Architect – Associate",
      "Meta Senior Full-Stack Software Engineer Specialization"
    ],
    achievements: [
      "1st Place Winner - Bay Area Cloud Hackathon 2023",
      "Published technical article on Node.js performance optimization (100k+ reads)"
    ]
  };

  return sanitizeResumeData(sample);
}

module.exports = {
  parseResumeText,
  getSampleResume
};
