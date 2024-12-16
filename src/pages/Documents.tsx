import React, { useState } from 'react';
import { Search, Filter, FolderOpen } from 'lucide-react';
import DocumentCard from '../components/documents/DocumentCard';
import { policies, claims } from '../data';

export default function Documents() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');

  // Combine all documents from policies and claims
  const allDocuments = [
    ...policies.flatMap(policy => 
      policy.documents.map(doc => ({ ...doc, source: 'Policy', policyId: policy.id }))
    ),
    ...claims.flatMap(claim => 
      claim.documents.map(doc => ({ ...doc, source: 'Claim', claimId: claim.id }))
    )
  ];

  const filteredDocuments = allDocuments.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || doc.source === filterType;
    return matchesSearch && matchesType;
  });

  const handleDownload = (document: typeof allDocuments[0]) => {
    // Handle document download logic here
    console.log('Downloading document:', document);
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Documents</h1>
          <p className="text-secondary-600">Access and manage your insurance documents</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search documents..."
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
            <option value="all">All Documents</option>
            <option value="Policy">Policy Documents</option>
            <option value="Claim">Claim Documents</option>
          </select>
        </div>

        {filteredDocuments.length === 0 ? (
          <div className="text-center py-12">
            <FolderOpen className="w-12 h-12 text-secondary-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-secondary-900 mb-2">No documents found</h3>
            <p className="text-secondary-600">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDocuments.map(document => (
              <DocumentCard
                key={document.id}
                document={document}
                onDownload={() => handleDownload(document)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
