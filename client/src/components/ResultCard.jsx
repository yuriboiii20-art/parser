import React from 'react';
import {
  User, Mail, Phone, Linkedin, Github, Globe, MapPin,
  FileText, Code, Briefcase, GraduationCap, FolderGit2,
  Award, Trophy, ExternalLink, Calendar, Building2
} from 'lucide-react';

export default function ResultCard({ data }) {
  if (!data) return null;

  const {
    name, email, phone, linkedin, github, portfolio, location,
    summary, skills = {}, experience = [], education = [],
    projects = [], certifications = [], achievements = []
  } = data;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Personal Info Header Card */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -z-10" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              {name || 'Name Not Detected'}
            </h2>
            {location && (
              <p className="text-sm text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-indigo-400 shrink-0" />
                {location}
              </p>
            )}
          </div>

          {/* Quick Contact Chips */}
          <div className="flex flex-wrap items-center gap-3">
            {email && (
              <a
                href={`mailto:${email}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 text-slate-200 hover:text-indigo-300 border border-slate-700/80 text-xs font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-indigo-400" />
                {email}
              </a>
            )}
            {phone && (
              <a
                href={`tel:${phone}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600/20 text-slate-200 hover:text-indigo-300 border border-slate-700/80 text-xs font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                {phone}
              </a>
            )}
            {linkedin && (
              <a
                href={linkedin}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-sky-600/20 text-slate-200 hover:text-sky-300 border border-slate-700/80 text-xs font-medium transition-colors"
              >
                <Linkedin className="w-4 h-4 text-sky-400" />
                LinkedIn <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-purple-600/20 text-slate-200 hover:text-purple-300 border border-slate-700/80 text-xs font-medium transition-colors"
              >
                <Github className="w-4 h-4 text-purple-400" />
                GitHub <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
            {portfolio && (
              <a
                href={portfolio}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800/80 hover:bg-cyan-600/20 text-slate-200 hover:text-cyan-300 border border-slate-700/80 text-xs font-medium transition-colors"
              >
                <Globe className="w-4 h-4 text-cyan-400" />
                Portfolio <ExternalLink className="w-3 h-3 opacity-60" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Professional Summary */}
      {summary && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-3">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-400" /> Professional Summary
          </h3>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            {summary}
          </p>
        </div>
      )}

      {/* Categorized Skills */}
      {Object.keys(skills).some((k) => skills[k] && skills[k].length > 0) && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Code className="w-5 h-5 text-cyan-400" /> Skills & Technical Expertise
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.languages?.length > 0 && (
              <SkillCategory title="Programming Languages" items={skills.languages} color="indigo" />
            )}
            {skills.frameworks?.length > 0 && (
              <SkillCategory title="Frameworks" items={skills.frameworks} color="cyan" />
            )}
            {skills.libraries?.length > 0 && (
              <SkillCategory title="Libraries" items={skills.libraries} color="purple" />
            )}
            {skills.databases?.length > 0 && (
              <SkillCategory title="Databases" items={skills.databases} color="emerald" />
            )}
            {skills.tools?.length > 0 && (
              <SkillCategory title="Tools & Platforms" items={skills.tools} color="amber" />
            )}
            {skills.technologies?.length > 0 && (
              <SkillCategory title="Other Technologies" items={skills.technologies} color="rose" />
            )}
          </div>
        </div>
      )}

      {/* Work Experience */}
      {experience.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-400" /> Work Experience
          </h3>

          <div className="space-y-6">
            {experience.map((exp, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-slate-700 transition-colors space-y-2"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h4 className="text-lg font-bold text-white">{exp.title}</h4>
                    <p className="text-sm font-semibold text-indigo-400 flex items-center gap-1.5 mt-0.5">
                      <Building2 className="w-4 h-4" /> {exp.company}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
                    {exp.duration && (
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-indigo-400" /> {exp.duration}
                      </span>
                    )}
                    {exp.location && exp.location !== 'N/A' && (
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-emerald-400" /> {exp.location}
                      </span>
                    )}
                  </div>
                </div>

                {exp.description && (
                  <p className="text-sm text-slate-300 pt-2 leading-relaxed border-t border-slate-800/80">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-amber-400" /> Education
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
                <h4 className="font-bold text-white text-base">{edu.degree}</h4>
                <p className="text-sm text-slate-300 font-medium">{edu.university || edu.college}</p>
                
                <div className="flex flex-wrap gap-2 text-xs pt-1">
                  {(edu.startYear || edu.endYear) && (
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 border border-slate-700 text-slate-400">
                      {edu.startYear && `${edu.startYear} - `}{edu.endYear}
                    </span>
                  )}
                  {edu.cgpa && edu.cgpa !== 'N/A' && (
                    <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
                      CGPA: {edu.cgpa}
                    </span>
                  )}
                  {edu.percentage && edu.percentage !== 'N/A' && (
                    <span className="px-2.5 py-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-semibold">
                      {edu.percentage}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 space-y-6">
          <h3 className="text-xl font-bold text-white flex items-center gap-2">
            <FolderGit2 className="w-5 h-5 text-purple-400" /> Personal & Academic Projects
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((proj, idx) => (
              <div key={idx} className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-white text-base">{proj.name}</h4>
                    {proj.githubLink && proj.githubLink !== 'N/A' && (
                      <a
                        href={proj.githubLink}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-400 hover:underline flex items-center gap-1"
                      >
                        Code <ExternalLink className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{proj.description}</p>
                </div>

                {proj.technologies && proj.technologies.length > 0 && proj.technologies[0] !== 'N/A' && (
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {proj.technologies.map((t, i) => (
                      <span key={i} className="px-2 py-0.5 rounded bg-slate-800 text-[11px] text-indigo-300 font-mono">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Certifications & Achievements side by side */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {certifications.length > 0 && (
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" /> Certifications & Licenses
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {certifications.map((c, i) => (
                <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {achievements.length > 0 && (
          <div className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Trophy className="w-5 h-5 text-yellow-400" /> Achievements & Honors
            </h3>
            <ul className="space-y-2 text-sm text-slate-300">
              {achievements.map((a, i) => (
                <li key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="w-2 h-2 rounded-full bg-yellow-400 mt-1.5 shrink-0" />
                  <span>{a}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

function SkillCategory({ title, items, color }) {
  return (
    <div className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
      <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">{title}</h4>
      <div className="flex flex-wrap gap-1.5">
        {items.map((item, idx) => (
          <span
            key={idx}
            className="px-2.5 py-1 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-medium"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
