import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { CoverageAnalysis } from '../../types/analysis';
import { formatCurrency } from '../../utils/formatters';

interface CoverageOverviewProps {
  analysis: CoverageAnalysis;
}

export default function CoverageOverview({ analysis }: CoverageOverviewProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-secondary-900">Coverage Overview</h2>
        <div className="flex items-center gap-2">
          <span className="text-sm text-secondary-600">Coverage Score:</span>
          <span className={`text-lg font-medium ${
            analysis.score >= 80 ? 'text-green-600' :
            analysis.score >= 60 ? 'text-amber-600' : 'text-red-600'
          }`}>{analysis.score}/100</span>
        </div>
      </div>

      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium text-secondary-700 mb-2">Total Coverage</h3>
          <p className="text-2xl font-semibold text-secondary-900">
            {formatCurrency(analysis.totalCoverage)}
          </p>
        </div>

        {analysis.gaps.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-secondary-700 mb-2">Coverage Gaps</h3>
            <div className="space-y-3">
              {analysis.gaps.map((gap, index) => (
                <div key={index} className="flex items-start gap-3 bg-amber-50 rounded-lg p-4">
                  <AlertTriangle className={`w-5 h-5 mt-0.5 ${
                    gap.severity === 'high' ? 'text-red-500' :
                    gap.severity === 'medium' ? 'text-amber-500' : 'text-yellow-500'
                  }`} />
                  <div>
                    <h4 className="font-medium text-secondary-900">{gap.type}</h4>
                    <p className="text-sm text-secondary-600">{gap.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h3 className="text-sm font-medium text-secondary-700 mb-2">Recommendations</h3>
          <ul className="space-y-2">
            {analysis.recommendations.map((recommendation, index) => (
              <li key={index} className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-primary-600 mt-0.5" />
                <span className="text-secondary-600">{recommendation}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
