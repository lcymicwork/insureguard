import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import PolicySummaryCard from '../components/analysis/PolicySummaryCard';
import ClaimAnalysisCard from '../components/analysis/ClaimAnalysisCard';
import { policies, claims, policySummaries } from '../data';

export default function Analysis() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const getPolicy = (policyId: string) => policies.find(p => p.id === policyId);

  const mockRecommendation = {
    status: 'Recommended' as const,
    reason: 'Based on policy coverage and claim details, this claim appears to be valid and within coverage limits.',
    nextSteps: [
      'Submit all required documentation',
      'Provide detailed incident report',
      'Include relevant photos or evidence'
    ]
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Policy Analysis</h1>
          <p className="text-secondary-600">Review policy summaries and claim recommendations</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search analyses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Types</option>
            <option value="policies">Policy Summaries</option>
            <option value="claims">Claim Analysis</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {policySummaries.map(summary => {
            const policy = getPolicy(summary.policyId);
            if (!policy) return null;
            return (
              <PolicySummaryCard
                key={summary.id}
                summary={summary}
                policy={policy}
              />
            );
          })}

          {claims.map(claim => {
            const policy = getPolicy(claim.policyId);
            if (!policy) return null;
            return (
              <ClaimAnalysisCard
                key={claim.id}
                claim={claim}
                policy={policy}
                recommendation={mockRecommendation}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
