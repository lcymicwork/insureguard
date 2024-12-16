import { Policy, Claim, PolicySummary } from './types';

export const policies: Policy[] = [
  {
    id: '1',
    name: 'Family Health Insurance',
    type: 'Health',
    provider: 'Blue Shield Insurance',
    policyNumber: 'HSP-2024-001',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    status: 'Active',
    premium: 450.00,
    coverage: 500000,
    documents: [
      {
        id: '1',
        name: 'Policy Document.pdf',
        type: 'application/pdf',
        uploadDate: '2024-01-01',
        size: '2.4 MB',
        url: '#'
      }
    ]
  },
  {
    id: '2',
    name: 'Home Insurance',
    type: 'Home',
    provider: 'SafeGuard Insurance',
    policyNumber: 'HIP-2024-002',
    startDate: '2024-02-15',
    endDate: '2025-02-14',
    status: 'Active',
    premium: 125.00,
    coverage: 350000,
    documents: [
      {
        id: '2',
        name: 'Home Insurance Policy.pdf',
        type: 'application/pdf',
        uploadDate: '2024-02-15',
        size: '1.8 MB',
        url: '#'
      }
    ]
  },
  {
    id: '3',
    name: 'Auto Insurance',
    type: 'Auto',
    provider: 'DriveSecure Insurance',
    policyNumber: 'AIP-2024-003',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    status: 'Active',
    premium: 89.00,
    coverage: 100000,
    documents: [
      {
        id: '3',
        name: 'Vehicle Insurance.pdf',
        type: 'application/pdf',
        uploadDate: '2024-03-01',
        size: '1.5 MB',
        url: '#'
      }
    ]
  }
];

export const claims: Claim[] = [
  {
    id: '1',
    policyId: '1',
    type: 'Medical Expense',
    date: '2024-03-15',
    status: 'In Review',
    amount: 2500.00,
    description: 'Emergency room visit due to acute appendicitis',
    documents: [
      {
        id: '4',
        name: 'Medical Bills.pdf',
        type: 'application/pdf',
        uploadDate: '2024-03-15',
        size: '1.2 MB',
        url: '#'
      }
    ]
  },
  {
    id: '2',
    policyId: '2',
    type: 'Property Damage',
    date: '2024-03-10',
    status: 'Approved',
    amount: 5000.00,
    description: 'Water damage from burst pipe in basement',
    documents: [
      {
        id: '5',
        name: 'Damage Photos.zip',
        type: 'application/zip',
        uploadDate: '2024-03-10',
        size: '8.5 MB',
        url: '#'
      }
    ]
  }
];

export const policySummaries: PolicySummary[] = [
  {
    id: '1',
    policyId: '1',
    keyPoints: [
      'Comprehensive family health coverage',
      'Includes dental and vision',
      'Worldwide emergency coverage'
    ],
    coverage: [
      {
        type: 'Hospital Stay',
        limit: 500000,
        deductible: 1000
      },
      {
        type: 'Prescription Drugs',
        limit: 10000,
        deductible: 200
      }
    ],
    exclusions: [
      'Pre-existing conditions within last 12 months',
      'Experimental treatments',
      'Cosmetic procedures'
    ],
    generatedDate: '2024-01-01'
  }
];
