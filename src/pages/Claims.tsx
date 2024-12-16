import React, { useState } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import ClaimCard from '../components/cards/ClaimCard';
import ClaimContextForm from '../components/forms/ClaimContextForm';
import { claims } from '../data';
import { Claim, ClaimContext, ClaimAnalysis } from '../types/claims';
import { analyzeClaimContext } from '../services/claimAnalysis';

interface ClaimsProps {
  onClaimClick: (claim: Claim) => void;
  onClaimContextSubmit: (context: ClaimContext, analysis: ClaimAnalysis) => void;
}

export default function Claims({ onClaimClick, onClaimContextSubmit }: ClaimsProps) {
  const [showNewClaimModal, setShowNewClaimModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredClaims = claims.filter(claim => {
    const matchesSearch = claim.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         claim.id.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || claim.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleSubmitContext = async (context: ClaimContext) => {
    try {
      const analysis = await analyzeClaimContext(context);
      onClaimContextSubmit(context, analysis);
      setShowNewClaimModal(false);
    } catch (error) {
      console.error('Error analyzing claim:', error);
      // Handle error appropriately
    }
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Claim Cases</h1>
            <p className="text-secondary-600">Manage and track your insurance claims</p>
          </div>

          <button
            onClick={() => setShowNewClaimModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>New Claim Case</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search claims..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
          
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Status</option>
            <option value="Draft">Draft</option>
            <option value="Submitted">Submitted</option>
            <option value="In Review">In Review</option>
            <option value="Approved">Approved</option>
            <option value="Denied">Denied</option>
          </select>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredClaims.map(claim => (
            <ClaimCard 
              key={claim.id} 
              claim={claim}
              onClick={() => onClaimClick(claim)}
            />
          ))}
        </div>

        {/* New Claim Modal */}
        {showNewClaimModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">New Claim Case</h2>
                <button
                  onClick={() => setShowNewClaimModal(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <ClaimContextForm onSubmit={handleSubmitContext} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
