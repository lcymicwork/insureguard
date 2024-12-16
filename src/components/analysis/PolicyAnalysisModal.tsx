import React from 'react';
import { X, FileText, AlertCircle } from 'lucide-react';
import { PolicyAnalysis } from '../../types/analysis';
import { formatCurrency } from '../../utils/formatters';

interface PolicyAnalysisModalProps {
  analysis: PolicyAnalysis;
  onClose: () => void;
}

export default function PolicyAnalysisModal({ analysis, onClose }: PolicyAnalysisModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-xl max-w-3xl w-full p-6 my-8">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-secondary-900">Policy Analysis</h2>
          <button
            onClick={onClose}
            className="text-secondary-400 hover:text-secondary-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Summary */}
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Summary</h3>
            <p className="text-secondary-600">{analysis.summary}</p>
          </div>

          {/* Key Points */}
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Key Points</h3>
            <ul className="space-y-2">
              {analysis.keyPoints.map((point, index) => (
                <li key={index} className="flex items-start gap-2">
                  <FileText className="w-5 h-5 text-primary-600 mt-0.5" />
                  <span className="text-secondary-600">{point}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Coverage Details */}
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Coverage Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {analysis.coverage.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-medium text-secondary-900 mb-1">{item.type}</h4>
                  <p className="text-sm text-secondary-600 mb-2">{item.description}</p>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Limit:</span>
                    <span className="font-medium text-secondary-900">
                      {formatCurrency(item.limit)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-secondary-600">Deductible:</span>
                    <span className="font-medium text-secondary-900">
                      {formatCurrency(item.deductible)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Exclusions */}
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Exclusions</h3>
            <ul className="space-y-2">
              {analysis.exclusions.map((exclusion, index) => (
                <li key={index} className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <span className="text-secondary-600">{exclusion}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Citations */}
          <div>
            <h3 className="text-lg font-medium text-secondary-900 mb-2">Citations</h3>
            <div className="space-y-3">
              {analysis.citations.map((citation, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4">
                  <p className="text-secondary-600 mb-2">{citation.text}</p>
                  <div className="flex gap-4 text-sm text-secondary-500">
                    <span>Page {citation.page}</span>
                    <span>Section: {citation.section}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
