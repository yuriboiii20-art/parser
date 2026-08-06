/**
 * Projects Parser
 * Extracts Project Name, Description, Technologies Used, and GitHub Link for each project.
 */

const { GITHUB_REGEX, URL_REGEX } = require('../../utils/regexHelpers');
const { cleanBulletPoints } = require('../../utils/textUtils');

/**
 * Parses projects section lines into structured project entries
 * @param {string[]} projectLines 
 * @returns {Array<Object>}
 */
function parseProjects(projectLines = []) {
  if (!Array.isArray(projectLines) || projectLines.length === 0) {
    return [];
  }

  const projects = [];
  let currentProject = null;

  for (const line of projectLines) {
    const cleanLine = cleanBulletPoints(line);
    if (!cleanLine) continue;

    const githubMatch = cleanLine.match(GITHUB_REGEX);
    const urlMatch = cleanLine.match(URL_REGEX);
    const isTechLine = /(?:tech|technologies|built with|stack|using)[:\-]/i.test(cleanLine);

    // Look for lines that look like project titles (short, non-bullet, capital start)
    const isPossibleTitle = !isTechLine && cleanLine.length < 60 && !cleanLine.endsWith('.') && /^[A-Z0-9]/.test(cleanLine);

    if (isPossibleTitle || !currentProject) {
      if (currentProject && currentProject.descriptionLines.length > 0) {
        projects.push(finalizeProject(currentProject));
        currentProject = null;
      }

      if (!currentProject) {
        currentProject = {
          name: cleanLine.split(/[:|]/)[0].trim(),
          descriptionLines: [],
          technologies: [],
          githubLink: ''
        };
      }
    }

    // Extract GitHub or Demo Link
    if (githubMatch && !currentProject.githubLink) {
      let link = githubMatch[0];
      if (!link.startsWith('http')) link = 'https://' + link;
      currentProject.githubLink = link;
    } else if (urlMatch && !currentProject.githubLink) {
      let link = urlMatch[0];
      if (!link.startsWith('http')) link = 'https://' + link;
      currentProject.githubLink = link;
    }

    // Extract Technologies Used
    if (isTechLine) {
      const techStr = cleanLine.replace(/^(?:tech|technologies|built with|stack|using)[:\-]/i, '').trim();
      currentProject.technologies = techStr.split(/[,|•\s]+/).map(t => t.trim()).filter(Boolean);
    } else if (currentProject && currentProject.name !== cleanLine) {
      currentProject.descriptionLines.push(cleanLine);
    }
  }

  if (currentProject) {
    projects.push(finalizeProject(currentProject));
  }

  return projects;
}

function finalizeProject(proj) {
  return {
    name: proj.name || 'Untitled Project',
    description: proj.descriptionLines.join('. '),
    technologies: proj.technologies.length > 0 ? proj.technologies : ['N/A'],
    githubLink: proj.githubLink || 'N/A'
  };
}

module.exports = { parseProjects };
