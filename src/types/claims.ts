export interface ClaimContext {
  incidentDateTime: string;
  location: string;
  description: string;
  documents?: File[];
}

export interface ClaimAnalysis {
  eligiblePolicies: {
    id: string;
    name: string;
    policyNumber: string;
    coverage: number;
    relevantTerms: {
      text: string;
      section: string;
      page: number;
      isEligible: boolean;
    }[];
  }[];
  nonEligiblePolicies: {
    id: string;
    name: string;
    policyNumber: string;
    coverage: number;
    reason: string;
    relevantTerms: {
      text: string;
      section: string;
      page: number;
      isExclusion: boolean;
    }[];
  }[];
  recommendations: {
    actionItems: string[];
    attentionItems: string[];
    requiredDocuments: string[];
  };
}

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  date: string;
  status: 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Denied';
  amount: number;
  description: string;
  documents: {
    id: string;
    name: string;
    type: string;
    size: string;
  }[];
}
