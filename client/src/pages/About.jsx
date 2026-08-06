import React from 'react';
import {
  FileText, Code, Cpu, ShieldCheck, CheckCircle2,
  Server, Terminal, Layers, TerminalSquare
} from 'lucide-react';

export default function About() {
  const parsersList = [
    { name: 'Personal Parser', file: 'parsers/personal/personalParser.js', desc: 'Regex rules for Email, Phone, LinkedIn, GitHub, Portfolio URL, Name, and Location.' },
    { name: 'Summary Parser', file: 'parsers/summary/summaryParser.js', desc: 'Extracts professional summary, objective, or about me paragraphs.' },
    { name: 'Skills Parser', file: 'parsers/skills/skillsParser.js', desc: 'Categorizes technical skills into Languages, Frameworks, Libraries, Databases, Tools, and Technologies.' },
    { name: 'Experience Parser', file: 'parsers/experience/experienceParser.js', desc: 'Extracts Company Name, Job Title, Employment Duration, Location, and Bullet Descriptions.' },
    { name: 'Education Parser', file: 'parsers/education/educationParser.js', desc: 'Extracts Degree, College, University, CGPA, Percentage, Start Year, and End Year.' },
    { name: 'Projects Parser', file: 'parsers/projects/projectsParser.js', desc: 'Extracts Project Name, Description, Technologies Used, and GitHub/Demo links.' },
    { name: 'Certifications Parser', file: 'parsers/certifications/certificationsParser.js', desc: 'Extracts array of verified credentials, licenses, and certificates.' },
    { name: 'Achievements Parser', file: 'parsers/achievements/achievementsParser.js', desc: 'Extracts array of honors, awards, and accomplishments.' }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-16 space-y-12">
      {/* Title */}
      <div className="text-center space-y-3">
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Architecture & Design Specifications
        </h1>
        <p className="text-slate-400 text-base max-w-2xl mx-auto">
          High-performance PDF resume parsing engine engineered with Node.js 22 LTS, Express.js, pdf-parse, regex modules, and React 19.
        </p>
      </div>

      {/* Tech Stack Matrix */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Server className="w-6 h-6 text-indigo-400" /> Technology Stack Overview
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="font-bold text-indigo-400 text-base flex items-center gap-2">
              <Terminal className="w-4 h-4" /> Backend Engine
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Node.js 22 LTS & Express.js</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> pdf-parse for PDF text extraction</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Multer disk storage upload middleware</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> express-validator & Morgan logger</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Jest & Supertest unit / API testing</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-3">
            <h3 className="font-bold text-cyan-400 text-base flex items-center gap-2">
              <Code className="w-4 h-4" /> Frontend Client
            </h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> React 19 & Vite 6</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Tailwind CSS v4 with Glassmorphism</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> React Router v7 navigation</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-emerald-400" /> Axios with upload progress tracking</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Modular Parser Modules Breakdown */}
      <div className="glass-card rounded-3xl p-8 border border-slate-800 space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <Layers className="w-6 h-6 text-cyan-400" /> Modular Parser Components
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {parsersList.map((p, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-1">
              <h3 className="font-bold text-white text-sm">{p.name}</h3>
              <p className="text-xs font-mono text-indigo-400">{p.file}</p>
              <p className="text-xs text-slate-400 pt-1 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
