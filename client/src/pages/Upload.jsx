import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DragDropUpload from '../components/DragDropUpload';
import PDFPreview from '../components/PDFPreview';
import LoadingScreen from '../components/LoadingScreen';
import Toast from '../components/Toast';
import { uploadResume } from '../services/api';
import { Sparkles, FileText } from 'lucide-react';

export default function UploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [toast, setToast] = useState({ message: '', type: 'success' });
  const navigate = useNavigate();

  const handleFileSelect = (file) => {
    setSelectedFile(file);
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setProgress(0);
  };

  const handleUploadSubmit = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    setProgress(10);

    try {
      const response = await uploadResume(selectedFile, (percent) => {
        setProgress(percent);
      });

      if (response && response.success) {
        setToast({ message: 'Resume parsed successfully!', type: 'success' });
        setTimeout(() => {
          navigate('/result', {
            state: {
              parsedData: response.data,
              fileId: response.fileId,
              metadata: response.metadata,
              fileName: selectedFile.name
            }
          });
        }, 800);
      } else {
        throw new Error(response.error || 'Failed to parse resume');
      }
    } catch (err) {
      console.error('Upload Error:', err);
      const msg = err.response?.data?.error || err.message || 'An error occurred during file parsing.';
      setToast({ message: msg, type: 'error' });
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-cyan-400" /> PDF Resume Extraction
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Upload Resume PDF
        </h1>
        <p className="text-slate-400 text-base max-w-xl mx-auto">
          Select or drag-and-drop your PDF resume. Our regex parsers will automatically detect sections and return structured JSON.
        </p>
      </div>

      {isUploading ? (
        <LoadingScreen />
      ) : (
        <div className="space-y-8">
          <DragDropUpload
            onFileSelect={handleFileSelect}
            selectedFile={selectedFile}
            onRemoveFile={handleRemoveFile}
            onUploadSubmit={handleUploadSubmit}
            progress={progress}
            isUploading={isUploading}
          />

          {selectedFile && <PDFPreview file={selectedFile} />}
        </div>
      )}

      <Toast
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ message: '', type: 'success' })}
      />
    </div>
  );
}
