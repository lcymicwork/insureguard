import { Policy } from './index';

export interface PolicyAnalysis {
  id: string;
  policyId: string;
  summary: string;
  keyPoints: string[];
  coverage: CoverageDetail[];
  exclusions: string[];
  recommendations: string[];
  citations: Citation[];
  generatedDate: string;
}

export interface CoverageDetail {
  type: string;
  description: string;
  limit: number;
  deductible: number;
}

export interface Citation {
  text: string;
  page: number;
  section: string;
}

export interface CoverageGap {
  type: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  recommendation: string;
}

export interface UserProfile {
  age: number;
  occupation: string;
  familySize: number;
  assets: {
    type: string;
    value: number;
  }[];
  riskFactors: string[];
}

export interface CoverageAnalysis {
  totalCoverage: number;
  gaps: CoverageGap[];
  recommendations: string[];
  score: number; // 0-100
  breakdown: {
    category: string;
    coverage: number;
    adequacy: 'insufficient' | 'adequate' | 'excellent';
  }[];
}
