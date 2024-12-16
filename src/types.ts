export interface Policy {
  id: string;
  name: string;
  type: 'Health' | 'Life' | 'Auto' | 'Home' | 'Travel';
  provider: string;
  policyNumber: string;
  startDate: string;
  endDate: string;
  status: 'Active' | 'Expired' | 'Pending Renewal';
  premium: number;
  coverage: number;
  documents: Document[];
}

export interface Claim {
  id: string;
  policyId: string;
  type: string;
  date: string;
  status: 'Draft' | 'Submitted' | 'In Review' | 'Approved' | 'Denied';
  amount: number;
  description: string;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
  size: string;
  url: string;
}

export interface PolicySummary {
  id: string;
  policyId: string;
  keyPoints: string[];
  coverage: {
    type: string;
    limit: number;
    deductible: number;
  }[];
  exclusions: string[];
  generatedDate: string;
}
