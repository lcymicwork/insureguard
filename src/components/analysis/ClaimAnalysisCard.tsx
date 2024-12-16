import React from 'react';
import { AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Claim, Policy } from '../../types';
import { formatCurrency } from '../../utils/formatters';

interface ClaimAnalysisCardProps {
  claim: Claim;
  policy: Policy;
  recommendation: {
    status: 'Recommended' | 'Not Recommended' | 'Review Required';
    reason: string;
    nextSteps: string[];
  };
}

export default function ClaimAnalysisCard({ claim, policy, recommendation }: ClaimAnalysisCardProps) {
  const getStatusIcon = () => {
    switch (recommendation.status) {
      case 'Recommended':
        return <CheckCircle className="w-6 h-6 text-green-500" />;
      case 'Not Recommended':
        return <XCircle className="w-6 h-6 text-red-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-amber-500" />;
    }
  };

  const getStatusColor = () => {
    switch (recommendation.status) {
      case 'Recommended':
        return 'bg-green-50 text-green-700 border-green-100';
      case 'Not Recommended':
        return 'bg-red-50 text-red-700 border-red-100';
      default:
        return 'bg-amber-50 text-amber-700 border-amber-100';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <h3 className="font-semibold text-secondary-900">{claim.type}</h3>
            <p className="text-sm text-secondary-500">Claim #{claim.id}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor()}`}>
          {recommendation.status}
        </span>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Analysis</h4>
          <p className="text-sm text-secondary-600">{recommendation.reason}</p>
        </div>

        <div>
          <h4 className="text-sm font-medium text-secondary-700 mb-2">Next Steps</h4>
          <ul className="space-y-2">
            {recommendation.nextSteps.map((step, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-secondary-600">
                <span className="font-medium text-secondary-900">{index + 1}.</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex justify-between text-sm">
            <span className="text-secondary-600">Claim Amount</span>
            <span className="font-medium text-secondary-900">{formatCurrency(claim.amount)}</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-secondary-600">Policy Coverage</span>
            <span className="font-medium text-secondary-900">{formatCurrency(policy.coverage)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
