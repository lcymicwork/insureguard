import React from 'react';
import { Shield } from 'lucide-react';
import { Policy } from '../../types';
import { policySummaries } from '../../data';
import { formatCurrency } from '../../utils/formatters';

interface CoverageDetailsSectionProps {
  policy: Policy;
}

export default function CoverageDetailsSection({ policy }: CoverageDetailsSectionProps) {
  const summary = policySummaries.find(s => s.policyId === policy.id);

  if (!summary) {
    return null;
  }

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-secondary-900 mb-4">Coverage Details</h3>
      
      <div className="space-y-4">
        {summary.coverage.map((item, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="w-5 h-5 text-primary-600" />
              <h4 className="font-medium text-secondary-900">{item.type}</h4>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Coverage Limit</span>
                <span className="font-medium text-secondary-900">
                  {formatCurrency(item.limit)}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-secondary-600">Deductible</span>
                <span className="font-medium text-secondary-900">
                  {formatCurrency(item.deductible)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
