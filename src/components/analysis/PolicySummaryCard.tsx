import React from 'react';
import { FileText, ChevronRight } from 'lucide-react';
import { PolicySummary, Policy } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface PolicySummaryCardProps {
  summary: PolicySummary;
  policy: Policy;
  onClick?: () => void;
}

export default function PolicySummaryCard({ summary, policy, onClick }: PolicySummaryCardProps) {
  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-600" />
          <div>
            <h3 className="font-semibold text-secondary-900">{policy.name}</h3>
            <p className="text-sm text-secondary-500">Generated on {new Date(summary.generatedDate).toLocaleDateString()}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-secondary-400" />
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Key Points</h4>
          <ul className="list-disc list-inside space-y-1">
            {summary.keyPoints.map((point, index) => (
              <li key={index} className="text-sm text-secondary-600">{point}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Coverage Details</h4>
          <div className="space-y-2">
            {summary.coverage.map((item, index) => (
              <div key={index} className="flex justify-between text-sm">
                <span className="text-secondary-600">{item.type}</span>
                <span className="font-medium text-secondary-900">
                  {formatCurrency(item.limit)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
