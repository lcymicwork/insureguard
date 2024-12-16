import React from 'react';
import { FileText, Calendar, DollarSign } from 'lucide-react';
import { Claim } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { getClaimStatusColor } from '../../utils/styles';

interface ClaimCardProps {
  claim: Claim;
  onClick?: () => void;
}

export default function ClaimCard({ claim, onClick }: ClaimCardProps) {
  const statusColor = getClaimStatusColor(claim.status);

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-600" />
          <div>
            <h3 className="font-semibold text-secondary-900">{claim.type}</h3>
            <p className="text-sm text-secondary-500">Claim #{claim.id}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
          {claim.status}
        </span>
      </div>

      <p className="text-sm text-secondary-600 mb-4">{claim.description}</p>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-secondary-600">
          <Calendar className="w-4 h-4" />
          <span>Filed on {new Date(claim.date).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <DollarSign className="w-4 h-4" />
          <span>{formatCurrency(claim.amount)}</span>
        </div>
      </div>
    </div>
  );
}
