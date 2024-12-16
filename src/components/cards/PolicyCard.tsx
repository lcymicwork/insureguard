import React from 'react';
import { Shield, Calendar, DollarSign } from 'lucide-react';
import { Policy } from '../../types';
import { formatCurrency } from '../../utils/formatters';
import { getStatusColor } from '../../utils/styles';

interface PolicyCardProps {
  policy: Policy;
  onClick?: () => void;
}

export default function PolicyCard({ policy, onClick }: PolicyCardProps) {
  const statusColor = getStatusColor(policy.status);

  return (
    <div 
      className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Shield className="w-6 h-6 text-primary-600" />
          <div>
            <h3 className="font-semibold text-secondary-900">{policy.name}</h3>
            <p className="text-sm text-secondary-500">{policy.provider}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
          {policy.status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-secondary-500">Policy Number</p>
          <p className="font-medium text-secondary-900">{policy.policyNumber}</p>
        </div>
        <div>
          <p className="text-sm text-secondary-500">Type</p>
          <p className="font-medium text-secondary-900">{policy.type}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2 text-sm text-secondary-600">
          <Calendar className="w-4 h-4" />
          <span>Expires {new Date(policy.endDate).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-primary-600">
          <DollarSign className="w-4 h-4" />
          <span>{formatCurrency(policy.premium)}/mo</span>
        </div>
      </div>
    </div>
  );
}
