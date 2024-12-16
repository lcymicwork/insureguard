import React, { useState } from 'react';
import { Upload, X, Loader } from 'lucide-react';
import { analyzePolicyDocument } from '../../services/policyAnalysis';
import PolicyAnalysisModal from '../analysis/PolicyAnalysisModal';

interface PolicyUploadFormProps {
  onUpload: (files: FileList, analysis: any) => void;
}

export default function PolicyUploadForm({ onUpload }: PolicyUploadFormProps) {
  const [dragActive, setDragActive] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleFiles = async (files: FileList) => {
    setIsAnalyzing(true);
    try {
      const analysis = await analyzePolicyDocument(files[0]);
      setAnalysis(analysis);
      onUpload(files, analysis);
    } catch (error) {
      console.error('Error analyzing policy:', error);
      // Handle error appropriately
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  return (
    <>
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          dragActive ? 'border-primary-500 bg-primary-50' : 'border-gray-300'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        {isAnalyzing ? (
          <div className="space-y-4">
            <Loader className="w-12 h-12 text-primary-600 mx-auto animate-spin" />
            <div>
              <h3 className="text-lg font-medium text-secondary-900 mb-2">
                Analyzing Policy
              </h3>
              <p className="text-secondary-600">
                Please wait while we analyze your policy document...
              </p>
            </div>
          </div>
        ) : (
          <>
            <Upload className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">
              Upload Policy Documents
            </h3>
            <p className="text-secondary-600 mb-4">
              Drag and drop your policy documents here, or click to browse
            </p>
            <input
              type="file"
              id="policy-upload"
              className="hidden"
              multiple
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
            />
            <label
              htmlFor="policy-upload"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 cursor-pointer"
            >
              Browse Files
            </label>
          </>
        )}
      </div>

      {analysis && (
        <PolicyAnalysisModal
          analysis={analysis}
          onClose={() => setAnalysis(null)}
        />
      )}
    </>
  );
}
