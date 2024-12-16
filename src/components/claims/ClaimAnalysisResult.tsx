import React from 'react';
import { Shield, AlertTriangle, CheckCircle, FileText } from 'lucide-react';
import { ClaimAnalysis } from '../../types/claims';
import { formatCurrency } from '../../utils/formatters';

interface ClaimAnalysisResultProps {
  analysis: ClaimAnalysis;
  onProceed: () => void;
}

export default function ClaimAnalysisResult({ analysis, onProceed }: ClaimAnalysisResultProps) {
  const getRiskBadgeColor = (level: string) => {
    switch (level) {
      case 'low':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'medium':
        return 'bg-amber-50 text-amber-700 border-amber-100';
      case 'high':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-gray-50 text-gray-700 border-gray-100';
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-secondary-900">Claim Analysis Results</h2>
          <span className={`px-3 py-1 rounded-full text-sm border ${getRiskBadgeColor(analysis.riskAssessment.level)}`}>
            {analysis.riskAssessment.level.charAt(0).toUpperCase() + analysis.riskAssessment.level.slice(1)} Risk
          </span>
        </div>

        <div className="space-y-6">
          {/* Primary Policy */}
          <div>
            <h3 className="text-sm font-medium text-secondary-700 mb-3">Recommended Policy</h3>
            <div className="bg-primary-50 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="w-5 h-5 text-primary-600 mt-1" />
                <div>
                  <h4 className="font-medium text-secondary-900">{analysis.recommendations.primaryPolicy.name}</h4>
                  <p className="text-sm text-secondary-600 mt-1">
                    Coverage up to {formatCurrency(analysis.recommendations.primaryPolicy.coverage)}
                  </p>
                  <p className="text-sm text-primary-600 mt-2">Best match for your claim</p>
                </div>
              </div>
            </div>
          </div>

          {/* Alternative Policies */}
          {analysis.recommendations.alternativePolicies.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-secondary-700 mb-3">Alternative Policies</h3>
              <div className="space-y-3">
                {analysis.recommendations.alternativePolicies.map(policy => (
                  <div key={policy.id} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-start gap-3">
                      <Shield className="w-5 h-5 text-secondary-400 mt-1" />
                      <div>
                        <h4 className="font-medium text-secondary-900">{policy.name}</h4>
                        <p className="text-sm text-secondary-600 mt-1">
                          Coverage up to {formatCurrency(policy.coverage)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Required Documents */}
          <div>
            <h3 className="text-sm font-medium text-secondary-700 mb-3">Required Documents</h3>
            <div className="space-y-2">
              {analysis.recommendations.requiredDocuments.map((doc, index) => (
                <div key={index} className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-secondary-400" />
                  <span className="text-sm text-secondary-600">{doc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onProceed}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Proceed with Claim
        </button>
      </div>
    </div>
  );
}
