import React, { useState } from 'react';
import { ArrowLeft, Shield, MessageCircle, FileText, RefreshCw, Link, AlertCircle, CheckCircle, XCircle } from 'lucide-react';
import { Claim, ClaimContext, ClaimAnalysis } from '../types/claims';
import { formatCurrency } from '../utils/formatters';
import ChatSidebar from '../components/chat/ChatSidebar';

interface ClaimDetailProps {
  claim?: Claim;
  claimContext?: ClaimContext;
  analysis?: ClaimAnalysis;
  onBack: () => void;
  onSubmit: () => void;
}

export default function ClaimDetail({ claim, claimContext, analysis, onBack, onSubmit }: ClaimDetailProps) {
  const [showChat, setShowChat] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsRegenerating(false);
  };

  const handlePolicyClick = (policyId: string) => {
    window.location.href = `/policies/${policyId}`;
  };

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="p-2 hover:bg-gray-100 rounded-lg text-secondary-600"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-secondary-900">Claim Case Analysis</h1>
              <p className="text-secondary-600">Review eligible policies and recommendations</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleRegenerate}
              disabled={isRegenerating}
              className="inline-flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-secondary-600 hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
              <span>Regenerate Analysis</span>
            </button>
            <button
              onClick={() => setShowChat(true)}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Chat with AI</span>
            </button>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1">
            {/* Incident Summary */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Incident Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-secondary-500">Date & Time</p>
                  <p className="font-medium text-secondary-900">
                    {new Date(claimContext?.incidentDateTime || '').toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500">Location</p>
                  <p className="font-medium text-secondary-900">{claimContext?.location}</p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-sm text-secondary-500">Description</p>
                  <p className="font-medium text-secondary-900">{claimContext?.description}</p>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Required Actions</h2>
              <div className="space-y-4">
                {analysis?.recommendations.actionItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />
                    <span className="text-secondary-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Attention Items */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Important Notes</h2>
              <div className="space-y-4">
                {analysis?.recommendations.attentionItems.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <span className="text-secondary-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Eligible Policies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Eligible Policies</h2>
              <div className="space-y-4">
                {analysis?.eligiblePolicies.map(policy => (
                  <div 
                    key={policy.id}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-green-600 mt-1" />
                        <div>
                          <h3 className="font-medium text-secondary-900">{policy.name}</h3>
                          <p className="text-sm text-secondary-600">Policy #{policy.policyNumber}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm bg-green-50 text-green-700 border border-green-100">
                        Eligible
                      </span>
                    </div>

                    <div className="mt-4 space-y-3">
                      {policy.relevantTerms.map((term, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-gray-100">
                          <p className="text-sm text-secondary-600">{term.text}</p>
                          <p className="text-xs text-secondary-500 mt-1">
                            Section {term.section} • Page {term.page}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePolicyClick(policy.id)}
                      className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <Link className="w-4 h-4" />
                      <span className="text-sm font-medium">View Full Policy</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Eligible Policies */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-secondary-900 mb-4">Related Policies (Not Eligible)</h2>
              <div className="space-y-4">
                {analysis?.nonEligiblePolicies.map(policy => (
                  <div 
                    key={policy.id}
                    className="bg-gray-50 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-red-600 mt-1" />
                        <div>
                          <h3 className="font-medium text-secondary-900">{policy.name}</h3>
                          <p className="text-sm text-secondary-600">Policy #{policy.policyNumber}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-700 border border-red-100">
                        Not Eligible
                      </span>
                    </div>

                    <p className="text-sm text-red-600 mb-4">{policy.reason}</p>

                    <div className="mt-4 space-y-3">
                      {policy.relevantTerms.map((term, idx) => (
                        <div key={idx} className="bg-white rounded-lg p-3 border border-red-100">
                          <p className="text-sm text-red-600">{term.text}</p>
                          <p className="text-xs text-secondary-500 mt-1">
                            Section {term.section} • Page {term.page}
                          </p>
                        </div>
                      ))}
                    </div>

                    <button
                      onClick={() => handlePolicyClick(policy.id)}
                      className="mt-4 inline-flex items-center gap-2 text-primary-600 hover:text-primary-700"
                    >
                      <Link className="w-4 h-4" />
                      <span className="text-sm font-medium">View Full Policy</span>
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <div className="w-96">
              <ChatSidebar
                context={{ claim, claimContext, analysis }}
                onClose={() => setShowChat(false)}
                onUpdateAnalysis={handleRegenerate}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
