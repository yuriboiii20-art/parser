import React, { useState, useEffect } from 'react';
import { Loader2, FileText, Cpu, CheckCircle2, Sparkles } from 'lucide-react';

export default function LoadingScreen() {
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Reading PDF Document Buffer...',
    'Extracting Raw Plain Text using pdf-parse...',
    'Analyzing Layout & Section Headings...',
    'Executing Modular Regex Parsers (Skills, Exp, Edu)...',
    'Synthesizing Clean Structured JSON Output...'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-8 sm:p-16 text-center space-y-6 glass-card rounded-3xl border border-indigo-500/30 max-w-xl mx-auto shadow-2xl animate-in fade-in zoom-in duration-300">
      <div className="relative">
        <div className="w-20 h-20 rounded-2xl bg-indigo-600/20 border border-indigo-500/40 flex items-center justify-center text-indigo-400">
          <FileText className="w-10 h-10 animate-pulse" />
        </div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 shadow-lg shadow-cyan-500/50 animate-spin">
          <Loader2 className="w-5 h-5" />
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
          Parsing Resume PDF <Sparkles className="w-5 h-5 text-amber-400 animate-spin" />
        </h3>
        <p className="text-slate-400 text-sm">
          Please wait while our Node.js & regex engine processes your document.
        </p>
      </div>

      <div className="w-full space-y-3 text-left pt-4 border-t border-slate-800">
        {steps.map((step, idx) => {
          const isDone = idx < stepIndex;
          const isCurrent = idx === stepIndex;

          return (
            <div
              key={idx}
              className={`flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ${
                isCurrent
                  ? 'bg-indigo-600/20 border border-indigo-500/40 text-indigo-200'
                  : isDone
                  ? 'text-emerald-400 opacity-80'
                  : 'text-slate-500 opacity-50'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="w-5 h-5 text-indigo-400 animate-spin shrink-0" />
              ) : (
                <Cpu className="w-5 h-5 text-slate-600 shrink-0" />
              )}
              <span className="text-sm font-medium">{step}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
