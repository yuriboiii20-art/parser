import React from 'react';
import { FileText, ExternalLink, HardDrive } from 'lucide-react';

export default function PDFPreview({ file }) {
  if (!file) return null;

  const fileUrl = URL.createObjectURL(file);

  return (
    <div className="glass-card rounded-2xl p-4 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-semibold text-slate-200">
          <FileText className="w-4 h-4 text-indigo-400" />
          <span>PDF Preview ({file.name})</span>
        </div>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 hover:underline"
        >
          Open Full Tab <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      <div className="w-full h-80 rounded-xl overflow-hidden bg-slate-900 border border-slate-800">
        <iframe
          src={fileUrl}
          title="PDF Document Preview"
          className="w-full h-full border-0"
        />
      </div>
    </div>
  );
}
