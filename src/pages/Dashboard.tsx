import React from 'react';
import { Shield, FileText, AlertCircle, TrendingUp, DollarSign } from 'lucide-react';
import StatsCard from '../components/cards/StatsCard';
import PolicyCard from '../components/cards/PolicyCard';
import ClaimCard from '../components/cards/ClaimCard';
import CoverageOverview from '../components/dashboard/CoverageOverview';
import { policies, claims } from '../data';
import { Policy } from '../types';
import { formatCurrency } from '../utils/formatters';

const mockCoverageAnalysis = {
  totalCoverage: 950000,
  gaps: [
    {
      type: 'Life Insurance',
      description: 'Current coverage may be insufficient for family needs',
      severity: 'high',
      recommendation: 'Consider increasing life insurance coverage by $250,000'
    }
  ],
  recommendations: [
    'Increase life insurance coverage',
    'Consider adding disability insurance',
    'Review auto insurance deductibles'
  ],
  score: 75,
  breakdown: [
    { category: 'Health', coverage: 500000, adequacy: 'excellent' },
    { category: 'Auto', coverage: 100000, adequacy: 'adequate' },
    { category: 'Home', coverage: 350000, adequacy: 'adequate' }
  ]
};

interface DashboardProps {
  onPolicyClick?: (policy: Policy) => void;
}

export default function Dashboard({ onPolicyClick }: DashboardProps) {
  const totalPremium = policies.reduce((sum, policy) => sum + policy.premium, 0);
  const activePolicies = policies.filter(p => p.status === 'Active').length;
  const pendingClaims = claims.filter(c => c.status === 'In Review').length;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Dashboard</h1>
          <p className="text-secondary-600">Overview of your insurance portfolio</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatsCard
            label="Total Coverage"
            value={formatCurrency(mockCoverageAnalysis.totalCoverage)}
            icon={Shield}
            iconColor="text-primary-600"
            iconBg="bg-primary-50"
            trend="Across all policies"
          />
          <StatsCard
            label="Monthly Premium"
            value={formatCurrency(totalPremium)}
            icon={DollarSign}
            iconColor="text-green-600"
            iconBg="bg-green-50"
            trend="Total monthly cost"
          />
          <StatsCard
            label="Active Policies"
            value={activePolicies}
            icon={FileText}
            iconColor="text-blue-600"
            iconBg="bg-blue-50"
            trend="Currently active"
          />
          <StatsCard
            label="Pending Claims"
            value={pendingClaims}
            icon={AlertCircle}
            iconColor="text-amber-600"
            iconBg="bg-amber-50"
            trend="Under review"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-secondary-900">Your Policies</h2>
              <button 
                onClick={() => onPolicyClick?.(policies[0])}
                className="text-sm text-primary-600 hover:text-primary-700 font-medium"
              >
                View All
              </button>
            </div>
            {policies.slice(0, 3).map(policy => (
              <PolicyCard 
                key={policy.id} 
                policy={policy}
                onClick={() => onPolicyClick?.(policy)}
              />
            ))}
          </div>
          
          <div>
            <CoverageOverview analysis={mockCoverageAnalysis} />
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-secondary-900">Recent Claims</h2>
            <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
              View All
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {claims.slice(0, 2).map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
