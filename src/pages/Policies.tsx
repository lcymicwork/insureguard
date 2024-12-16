import React, { useState } from 'react';
import { Plus, Search, Filter, X } from 'lucide-react';
import PolicyCard from '../components/cards/PolicyCard';
import PolicyUploadForm from '../components/forms/PolicyUploadForm';
import { policies } from '../data';
import { Policy } from '../types';
import { useEnvironment } from '../context/EnvironmentContext';

interface PoliciesProps {
  onPolicyClick?: (policy: Policy) => void;
}

export default function Policies({ onPolicyClick }: PoliciesProps) {
  const { environment } = useEnvironment();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredPolicies = policies.filter(policy => {
    const matchesSearch = policy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         policy.policyNumber.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || policy.type === filterType;
    return matchesSearch && matchesType;
  });

  const handleUpload = (files: FileList, analysis: any) => {
    if (environment === 'demo') {
      console.log('Demo mode: Policy upload simulated', { files, analysis });
    } else {
      console.log('Live mode: Uploading policy', { files, analysis });
    }
    setShowUploadModal(false);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-secondary-900">Policies</h1>
            <p className="text-secondary-600">Manage your insurance policies</p>
          </div>

          <button
            onClick={() => setShowUploadModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Policy</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search policies..."
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
            <option value="Health">Health</option>
            <option value="Life">Life</option>
            <option value="Auto">Auto</option>
            <option value="Home">Home</option>
            <option value="Travel">Travel</option>
          </select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPolicies.map(policy => (
            <PolicyCard 
              key={policy.id} 
              policy={policy} 
              onClick={() => onPolicyClick?.(policy)}
            />
          ))}
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-white rounded-xl max-w-2xl w-full p-6 my-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-secondary-900">Add New Policy</h2>
                <button
                  onClick={() => setShowUploadModal(false)}
                  className="text-secondary-400 hover:text-secondary-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <PolicyUploadForm onUpload={handleUpload} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
