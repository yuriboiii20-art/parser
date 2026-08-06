import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import ResultCard from '../components/ResultCard';
import JSONViewer from '../components/JSONViewer';
import Toast from '../components/Toast';
import { getSampleResume } from '../services/api';
import {
  FileText, LayoutGrid, Code2, Download, Copy, RefreshCw,
  Sparkles, CheckCircle2, ArrowLeft
} from 'lucide-react';

export default function ResultPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state?.parsedData || null);
  const [fileId, setFileId] = useState(location.state?.fileId || '');
  const [fileName, setFileName] = useState(location.state?.fileName || 'resume.pdf');
  const [activeTab, setActiveTab] = useState('cards'); // 'cards' | 'json'
  const [toastMessage, setToastMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If user navigated directly to /result without uploading, load sample
    if (!data) {
      setLoading(true);
      getSampleResume()
        .then((res) => {
          if (res.success) {
            setData(res.data);
            setFileName('sample_resume.pdf');
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [data]);

  const handleCopyToast = (msg) => {
    setToastMessage(msg);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center space-y-4">
        <RefreshCw className="w-10 h-10 text-indigo-400 animate-spin mx-auto" />
        <p className="text-slate-400">Loading parsed result...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      {/* Top Banner & Control Header */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Link
              to="/upload"
              className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white transition-colors mr-1"
              title="Upload another"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" /> Extraction Completed
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white">
            Parsed Resume Output
          </h1>
          <p className="text-sm text-slate-400 flex items-center gap-2 font-mono">
            <span>File: {fileName}</span>
            {location.state?.metadata?.pages && (
              <>
                <span>•</span>
                <span>{location.state.metadata.pages} Page(s)</span>
              </>
            )}
          </p>
        </div>

        {/* View Switcher Tabs & Actions */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Tabs */}
          <div className="p-1 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-1">
            <button
              onClick={() => setActiveTab('cards')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'cards'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <LayoutGrid className="w-4 h-4" /> Visual Cards
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'json'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-4 h-4" /> Raw JSON
            </button>
          </div>

          <Link
            to="/upload"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs border border-slate-700 transition-colors"
          >
            <RefreshCw className="w-4 h-4 text-indigo-400" />
            Upload Another
          </Link>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'cards' ? (
        <ResultCard data={data} />
      ) : (
        <JSONViewer data={data} fileId={fileId} onCopyToast={handleCopyToast} />
      )}

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
