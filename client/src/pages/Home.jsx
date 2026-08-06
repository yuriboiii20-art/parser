import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, Sparkles, Zap, ShieldCheck, Code, ArrowRight,
  CheckCircle2, Layers, Cpu, Download, Database, Check
} from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Cpu,
      title: 'Modular Regex Engine',
      description: 'Extremely fast extraction without heavy NLP dependencies. Built with modular Node.js parser files.',
      color: 'indigo'
    },
    {
      icon: Layers,
      title: 'Smart Section Detector',
      description: 'Automatically detects resume section headings across diverse template layouts and designs.',
      color: 'cyan'
    },
    {
      icon: Code,
      title: 'Categorized Skills Parser',
      description: 'Automatically separates languages, frameworks, libraries, databases, and tools into structured arrays.',
      color: 'purple'
    },
    {
      icon: Database,
      title: 'Structured JSON Export',
      description: 'Exports clean, standardized JSON ready for direct integration into ATS databases and recruitment pipelines.',
      color: 'emerald'
    },
    {
      icon: ShieldCheck,
      title: 'Graceful Fallbacks',
      description: 'Handles missing resume sections gracefully without breaking schema or throwing runtime errors.',
      color: 'amber'
    },
    {
      icon: Zap,
      title: 'Production Ready & Scalable',
      description: 'Node.js 22 LTS REST API architecture with express-validator, Multer, Jest testing, and Vite frontend.',
      color: 'rose'
    }
  ];

  const steps = [
    {
      number: '01',
      title: 'Upload PDF Resume',
      desc: 'Drag & drop any resume PDF file up to 10MB into the interactive upload interface.'
    },
    {
      number: '02',
      title: 'Text Extraction & Cleaning',
      desc: 'pdf-parse extracts raw document buffer and normalizes lines, tabs, and linebreaks.'
    },
    {
      number: '03',
      title: 'Section & Regex Processing',
      desc: 'Section Detector routes text chunks to dedicated parsers (Personal, Skills, Experience, Edu).'
    },
    {
      number: '04',
      title: 'Download JSON Payload',
      desc: 'Review structured visual cards or download/copy full JSON payload instantly.'
    }
  ];

  const supportedFields = [
    'Full Name', 'Email Address', 'Phone Number', 'LinkedIn URL', 'GitHub URL',
    'Portfolio Website', 'Location', 'Professional Summary', 'Programming Languages',
    'Frameworks', 'Libraries', 'Databases', 'Tools & Platforms', 'Work Experience',
    'Company Names', 'Job Titles', 'Employment Duration', 'Education Degrees',
    'College / University', 'CGPA & Percentage', 'Start & End Years',
    'Personal Projects', 'Technologies Used', 'Certifications', 'Achievements'
  ];

  return (
    <div className="space-y-24 py-8 sm:py-16">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 max-w-4xl mx-auto px-4">
        {/* Background Glow Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl -z-10 animate-glow" />

        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" /> Production-Grade PDF Parsing Engine
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-tight">
          Extract Structured Data from <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-indigo-400 via-purple-300 to-cyan-400 bg-clip-text text-transparent">
            Resumes into JSON
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          High-performance, modular PDF resume parser powered by Node.js, Express, regex parsers, and React 19. Converts unorganized PDFs into structured JSON instantly.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link
            to="/upload"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 via-indigo-500 to-cyan-500 hover:from-indigo-500 hover:to-cyan-400 text-white font-bold text-lg shadow-xl shadow-indigo-500/30 flex items-center justify-center gap-3 transition-all duration-300 hover:scale-105 active:scale-95"
          >
            <FileText className="w-5 h-5" />
            Upload PDF Resume
            <ArrowRight className="w-5 h-5" />
          </Link>

          <Link
            to="/json-viewer"
            className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 font-semibold text-lg border border-slate-700/80 flex items-center justify-center gap-2 transition-all duration-200"
          >
            <Code className="w-5 h-5 text-indigo-400" />
            Explore Sample JSON
          </Link>
        </div>
      </section>

      {/* Features Grid Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Built for Modular Scalability
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            Clean architectural separation between file uploads, section detectors, and independent parser modules.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="glass-card rounded-3xl p-8 border border-slate-800 hover:border-indigo-500/40 transition-all duration-300 group hover:-translate-y-1 space-y-4"
              >
                <div className="w-14 h-14 rounded-2xl bg-indigo-600/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:scale-110 transition-transform">
                  <Icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                  {feat.title}
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {feat.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How It Works Workflow Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            How The Parser Engine Works
          </h2>
          <p className="text-slate-400 max-w-xl mx-auto text-base">
            From raw PDF binary buffer to normalized section arrays and validated JSON output.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((s, idx) => (
            <div key={idx} className="glass-card rounded-3xl p-6 border border-slate-800 space-y-4 relative">
              <span className="text-4xl font-black text-indigo-500/30 font-mono">
                {s.number}
              </span>
              <h3 className="text-lg font-bold text-white">{s.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported Data Information Chips */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-slate-800 space-y-8">
          <div className="text-center space-y-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Supported Fields Extracted
            </h2>
            <p className="text-slate-400 text-sm">
              Our regex rules and text normalizer extract comprehensive resume candidate details.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {supportedFields.map((field, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-300 text-xs font-medium hover:border-indigo-500/40 hover:text-white transition-colors"
              >
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                {field}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Card */}
      <section className="max-w-5xl mx-auto px-4">
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-indigo-500/30 text-center space-y-6 bg-gradient-to-b from-indigo-950/40 to-slate-950">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Ready to Parse Your First Resume?
          </h2>
          <p className="text-slate-300 text-base max-w-xl mx-auto">
            Upload any single or multi-page PDF resume to see instant structured JSON results.
          </p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-cyan-500 text-white font-bold text-base shadow-lg shadow-indigo-500/30 hover:scale-105 transition-transform"
          >
            Start Parsing Now <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
