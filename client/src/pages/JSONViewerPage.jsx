import React, { useState, useEffect } from 'react';
import JSONViewer from '../components/JSONViewer';
import Toast from '../components/Toast';
import { getSampleResume } from '../services/api';
import { Code2, Sparkles, RefreshCw } from 'lucide-react';

export default function JSONViewerPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');

  useEffect(() => {
    getSampleResume()
      .then((res) => {
        if (res.success) {
          setData(res.data);
        }
      })
      .catch((err) => console.error('Sample fetch error:', err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Code2 className="w-4 h-4 text-cyan-400" /> JSON Format Explorer
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Standardized JSON Schema
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Explore the exact JSON structure returned by our backend parser. Copy or download the sample JSON payload below.
        </p>
      </div>

      {loading ? (
        <div className="text-center py-16 space-y-3">
          <RefreshCw className="w-8 h-8 text-indigo-400 animate-spin mx-auto" />
          <p className="text-slate-400 text-sm">Fetching sample payload...</p>
        </div>
      ) : (
        <JSONViewer data={data} onCopyToast={(msg) => setToastMessage(msg)} />
      )}

      <Toast
        message={toastMessage}
        type="success"
        onClose={() => setToastMessage('')}
      />
    </div>
  );
}
