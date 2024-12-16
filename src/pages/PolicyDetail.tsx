import React, { useState } from 'react';
import { ArrowLeft, Shield, MessageCircle, ExternalLink, Phone, Mail, FileText, Calendar, DollarSign } from 'lucide-react';
import { Policy } from '../types';
import { formatCurrency, formatDate } from '../utils/formatters';
import { getStatusColor } from '../utils/styles';
import DocumentCard from '../components/documents/DocumentCard';
import PolicySummarySection from '../components/policy/PolicySummarySection';
import CoverageDetailsSection from '../components/policy/CoverageDetailsSection';
import ChatSidebar from '../components/chat/ChatSidebar';

interface PolicyDetailProps {
  policy: Policy;
  onBack: () => void;
}

export default function PolicyDetail({ policy, onBack }: PolicyDetailProps) {
  const [showChat, setShowChat] = useState(false);
  const statusColor = getStatusColor(policy.status);

  const resources = [
    {
      title: 'File a Claim',
      description: 'Submit a new claim for this policy',
      icon: FileText,
      link: '#/claims/new'
    },
    {
      title: 'Provider Portal',
      description: 'Access your insurance provider\'s website',
      icon: ExternalLink,
      link: 'https://example.com'
    },
    {
      title: 'Contact Support',
      description: '24/7 customer support',
      icon: Phone,
      link: 'tel:1-800-123-4567'
    },
    {
      title: 'Email Support',
      description: 'Get help via email',
      icon: Mail,
      link: 'mailto:support@example.com'
    }
  ];

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
              <h1 className="text-2xl font-bold text-secondary-900">Policy Details</h1>
              <p className="text-secondary-600">View and manage policy information</p>
            </div>
          </div>
          
          <button
            onClick={() => setShowChat(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Chat with AI</span>
          </button>
        </div>

        {/* Main Content */}
        <div className="flex gap-6">
          <div className="flex-1">
            {/* Policy Info Card */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-50 rounded-lg">
                    <Shield className="w-8 h-8 text-primary-600" />
                  </div>
                  <div>
                    <h2 className="text-xl font-semibold text-secondary-900">{policy.name}</h2>
                    <p className="text-secondary-600">{policy.provider}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm ${statusColor}`}>
                  {policy.status}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-secondary-500 mb-1">Policy Number</p>
                  <p className="font-medium text-secondary-900">{policy.policyNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 mb-1">Type</p>
                  <p className="font-medium text-secondary-900">{policy.type}</p>
                </div>
                <div>
                  <p className="text-sm text-secondary-500 mb-1">Coverage Amount</p>
                  <p className="font-medium text-secondary-900">{formatCurrency(policy.coverage)}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 pt-6 border-t border-gray-100">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-500">Start Date</p>
                    <p className="font-medium text-secondary-900">{formatDate(policy.startDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-500">End Date</p>
                    <p className="font-medium text-secondary-900">{formatDate(policy.endDate)}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-secondary-400" />
                  <div>
                    <p className="text-sm text-secondary-500">Monthly Premium</p>
                    <p className="font-medium text-secondary-900">{formatCurrency(policy.premium)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {resources.map((resource) => {
                const Icon = resource.icon;
                return (
                  <a
                    key={resource.title}
                    href={resource.link}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
                    target={resource.link.startsWith('http') ? '_blank' : undefined}
                    rel={resource.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    <div className="p-2 bg-primary-50 rounded-lg">
                      <Icon className="w-5 h-5 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-secondary-900">{resource.title}</h3>
                      <p className="text-sm text-secondary-600">{resource.description}</p>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Rest of the content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <PolicySummarySection policy={policy} />
              </div>
              <div>
                <CoverageDetailsSection policy={policy} />
              </div>
            </div>

            {/* Documents Section */}
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-secondary-900 mb-4">Policy Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {policy.documents.map(document => (
                  <DocumentCard
                    key={document.id}
                    document={document}
                    onDownload={() => console.log('Downloading:', document.name)}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Chat Sidebar */}
          {showChat && (
            <ChatSidebar
              policy={policy}
              onClose={() => setShowChat(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}
