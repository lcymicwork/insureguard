import React from 'react';
import FamilyLinkSection from '../components/settings/FamilyLinkSection';

export default function FamilyLink() {
  return (
    <div className="p-8">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Family Link</h1>
          <p className="text-secondary-600">Manage trusted contacts and notification preferences</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200">
          <div className="p-6">
            <FamilyLinkSection />
          </div>
        </div>
      </div>
    </div>
  );
}
