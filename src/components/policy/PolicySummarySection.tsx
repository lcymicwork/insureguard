import React from 'react';
import { FileText, AlertCircle } from 'lucide-react';
import { Policy } from '../../types';
import { policySummaries } from '../../data';

interface PolicySummarySectionProps {
  policy: Policy;
}

export default function PolicySummarySection({ policy }: PolicySummarySectionProps) {
  const summary = policySummaries.find(s => s.policyId === policy.id);

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Policy Summary</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Key Points</h4>
          <ul className="space-y-2">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="flex items-start gap-2">
                <FileText className="w-5 h-5 text-primary-600 mt-0.5" />
                <span className="text-secondary-600">{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Exclusions</h4>
          <ul className="space-y-2">
            {summary.exclusions.map((exclusion, index) => (
              <li key={index} className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                <span className="text-secondary-600">{exclusion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
