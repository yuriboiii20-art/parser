import React, { useState } from 'react';
import { Copy, Download, Check, Search, Code2, Eye, EyeOff } from 'lucide-react';
import { getDownloadUrl } from '../services/api';

export default function JSONViewer({ data, fileId, onCopyToast }) {
  const [copied, setCopied] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFormatted, setIsFormatted] = useState(true);

  if (!data) return null;

  const jsonString = JSON.stringify(data, null, isFormatted ? 2 : 0);

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(data, null, 2));
    setCopied(true);
    if (onCopyToast) onCopyToast('JSON copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  const downloadUrl = getDownloadUrl(fileId);

  return (
    <div className="glass-card rounded-3xl border border-slate-800 overflow-hidden shadow-2xl space-y-0">
      {/* Header Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-4 bg-slate-900/90 border-b border-slate-800">
        <div className="flex items-center gap-2">
          <Code2 className="w-5 h-5 text-indigo-400" />
          <span className="font-bold text-white text-base">Structured JSON Payload</span>
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
            {Object.keys(data).length} Root Keys
          </span>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Search Filter */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search keys..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            onClick={() => setIsFormatted(!isFormatted)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
            title="Toggle Format"
          >
            {isFormatted ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {isFormatted ? 'Compact' : 'Format'}
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md transition-all cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
            {copied ? 'Copied!' : 'Copy JSON'}
          </button>

          <a
            href={downloadUrl}
            download="parsed_resume.json"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            Download JSON
          </a>
        </div>
      </div>

      {/* JSON Output Area */}
      <div className="p-6 bg-slate-950/90 overflow-x-auto max-h-[600px] text-xs font-mono">
        <pre className="text-slate-300 leading-relaxed">
          <code>
            {searchQuery
              ? jsonString
                  .split('\n')
                  .filter((line) => line.toLowerCase().includes(searchQuery.toLowerCase()))
                  .join('\n')
              : jsonString}
          </code>
        </pre>
      </div>
    </div>
  );
}
