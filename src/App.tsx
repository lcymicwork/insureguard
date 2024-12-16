import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Policies from './pages/Policies';
import Claims from './pages/Claims';
import Analysis from './pages/Analysis';
import Documents from './pages/Documents';
import Profile from './pages/Profile';
import Help from './pages/Help';
import PolicyDetail from './pages/PolicyDetail';
import ClaimDetail from './pages/ClaimDetail';
import FamilyLink from './pages/FamilyLink';
import { EnvironmentProvider } from './context/EnvironmentContext';
import { LanguageProvider } from './context/LanguageContext';
import { Policy } from './types';
import { Claim, ClaimContext, ClaimAnalysis } from './types/claims';

const App = () => {
  const [currentPage, setCurrentPage] = useState<
    'dashboard' | 'policies' | 'claims' | 'analysis' | 'documents' | 'profile' | 'help' | 'policy-detail' | 'claim-detail' | 'family-link'
  >('dashboard');
  const [selectedPolicy, setSelectedPolicy] = useState<Policy | null>(null);
  const [selectedClaim, setSelectedClaim] = useState<Claim | null>(null);
  const [claimData, setClaimData] = useState<{context: ClaimContext; analysis: ClaimAnalysis} | null>(null);

  const handlePolicyClick = (policy: Policy) => {
    setSelectedPolicy(policy);
    setCurrentPage('policy-detail');
  };

  const handleClaimClick = (claim: Claim) => {
    setSelectedClaim(claim);
    setCurrentPage('claim-detail');
  };

  const handleClaimContextSubmit = (context: ClaimContext, analysis: ClaimAnalysis) => {
    setClaimData({ context, analysis });
    setCurrentPage('claim-detail');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'policy-detail':
        return selectedPolicy ? (
          <PolicyDetail 
            policy={selectedPolicy} 
            onBack={() => setCurrentPage('policies')}
          />
        ) : null;
      case 'claim-detail':
        return claimData ? (
          <ClaimDetail 
            claimContext={claimData.context}
            analysis={claimData.analysis}
            onBack={() => setCurrentPage('claims')}
            onSubmit={() => {
              console.log('Submitting claim:', claimData);
              setCurrentPage('claims');
            }}
          />
        ) : selectedClaim ? (
          <ClaimDetail 
            claim={selectedClaim}
            onBack={() => setCurrentPage('claims')}
            onSubmit={() => {
              console.log('Updating claim:', selectedClaim);
              setCurrentPage('claims');
            }}
          />
        ) : null;
      case 'policies':
        return <Policies onPolicyClick={handlePolicyClick} />;
      case 'claims':
        return (
          <Claims 
            onClaimClick={handleClaimClick}
            onClaimContextSubmit={handleClaimContextSubmit} 
          />
        );
      case 'analysis':
        return <Analysis />;
      case 'documents':
        return <Documents />;
      case 'profile':
        return <Profile />;
      case 'help':
        return <Help />;
      case 'family-link':
        return <FamilyLink />;
      default:
        return <Dashboard onPolicyClick={handlePolicyClick} />;
    }
  };

  return (
    <EnvironmentProvider>
      <LanguageProvider>
        <div className="flex min-h-screen bg-gray-50">
          <Sidebar onNavigate={(page) => setCurrentPage(page as any)} currentPage={currentPage} />
          <main className="flex-1">
            {renderContent()}
          </main>
        </div>
      </LanguageProvider>
    </EnvironmentProvider>
  );
};

export default App;
