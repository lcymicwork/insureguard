import { Policy, PolicyAnalysis, UserProfile, CoverageAnalysis } from '../types';
import { useEnvironment } from '../context/EnvironmentContext';

// Demo data for policy analysis
const demoAnalysis: PolicyAnalysis = {
  id: 'demo-1',
  policyId: '1',
  summary: 'This is a comprehensive health insurance policy with extensive coverage for medical expenses.',
  keyPoints: [
    'Covers both inpatient and outpatient treatments',
    'Includes prescription drug coverage',
    'Worldwide emergency coverage'
  ],
  coverage: [
    {
      type: 'Hospital Stay',
      description: 'Coverage for hospital room and board',
      limit: 500000,
      deductible: 1000
    },
    {
      type: 'Prescription Drugs',
      description: 'Coverage for prescribed medications',
      limit: 10000,
      deductible: 200
    }
  ],
  exclusions: [
    'Pre-existing conditions within last 12 months',
    'Cosmetic procedures',
    'Experimental treatments'
  ],
  recommendations: [
    'Consider adding dental coverage',
    'Review deductible options',
    'Add family members to the policy'
  ],
  citations: [
    {
      text: 'Hospital stays are covered up to $500,000 per year',
      page: 12,
      section: '3.1'
    }
  ],
  generatedDate: new Date().toISOString()
};

export async function analyzePolicyDocument(file: File): Promise<PolicyAnalysis> {
  try {
    // In demo mode, return mock data
    if (process.env.NODE_ENV === 'development') {
      return new Promise(resolve => setTimeout(() => resolve(demoAnalysis), 2000));
    }

    // In production, implement actual analysis logic
    const text = await extractTextFromPDF(file);
    const response = await callAIService(text);
    return response;
  } catch (error) {
    console.error('Error analyzing policy:', error);
    // Return demo data as fallback
    return demoAnalysis;
  }
}

export async function analyzeCoverageAdequacy(
  policies: Policy[],
  userProfile: UserProfile
): Promise<CoverageAnalysis> {
  // Demo coverage analysis
  return {
    totalCoverage: policies.reduce((sum, policy) => sum + policy.coverage, 0),
    gaps: [
      {
        type: 'Life Insurance',
        description: 'Current coverage may be insufficient for family needs',
        severity: 'high',
        recommendation: 'Consider increasing life insurance coverage'
      }
    ],
    recommendations: [
      'Increase life insurance coverage',
      'Consider adding disability insurance',
      'Review auto insurance deductibles'
    ],
    score: 75,
    breakdown: policies.map(policy => ({
      category: policy.type,
      coverage: policy.coverage,
      adequacy: 'adequate'
    }))
  };
}

async function extractTextFromPDF(file: File): Promise<string> {
  // Implement PDF text extraction
  return 'Extracted text from PDF';
}

async function callAIService(text: string): Promise<PolicyAnalysis> {
  // Implement AI service call
  return demoAnalysis;
}
