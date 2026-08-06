import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Github, Code2, Cpu, CheckCircle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-auto border-t border-slate-800/80 bg-slate-950/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand & Info */}
          <div className="space-y-4 md:col-span-2">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20">
                <FileText className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white">ParseAI Engine</span>
            </div>
            <p className="text-slate-400 text-sm max-w-md leading-relaxed">
              Production-ready PDF Resume Parser built with Node.js, Express, regex parsing modules, and React 19. Extract contact details, skills, experience, education, projects, certifications, and awards into structured JSON instantly.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
                <CheckCircle className="w-3.5 h-3.5" /> Node.js 22 LTS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
                <Cpu className="w-3.5 h-3.5" /> pdf-parse Engine
              </span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              Quick Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Home Landing
                </Link>
              </li>
              <li>
                <Link to="/upload" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Upload PDF Resume
                </Link>
              </li>
              <li>
                <Link to="/json-viewer" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Sample JSON Explorer
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-slate-400 hover:text-indigo-400 transition-colors">
                  Architecture & Docs
                </Link>
              </li>
            </ul>
          </div>

          {/* API Endpoints */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-300 mb-4">
              REST API Endpoints
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              <li className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-emerald-400 font-bold">POST</span> /api/parser/upload
              </li>
              <li className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-sky-400 font-bold">GET</span> /api/parser/sample
              </li>
              <li className="p-2 rounded bg-slate-900 border border-slate-800 text-slate-300">
                <span className="text-sky-400 font-bold">GET</span> /api/parser/download
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} ParseAI Resume Parser. Built for high-performance structured extraction.</p>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-slate-400">
              <Code2 className="w-4 h-4 text-indigo-400" /> React 19 + Express.js
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
