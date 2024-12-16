import { ClaimContext, ClaimAnalysis } from '../types/claims';
import { policies } from '../data';

export async function analyzeClaimContext(context: ClaimContext): Promise<ClaimAnalysis> {
  // Demo analysis
  const demoAnalysis: ClaimAnalysis = {
    eligiblePolicies: [
      {
        id: '1',
        name: 'Family Health Insurance',
        policyNumber: 'HSP-2024-001',
        coverage: 500000,
        relevantTerms: [
          {
            text: "Medical expenses resulting from accidents are covered up to $500,000",
            section: "2.1",
            page: 5,
            isEligible: true
          },
          {
            text: "Emergency room visits and ambulance services are fully covered",
            section: "2.3",
            page: 6,
            isEligible: true
          }
        ]
      },
      {
        id: '2',
        name: 'Personal Accident Coverage',
        policyNumber: 'PAC-2024-002',
        coverage: 100000,
        relevantTerms: [
          {
            text: "Accidental injuries are covered up to $100,000",
            section: "1.2",
            page: 3,
            isEligible: true
          }
        ]
      }
    ],
    nonEligiblePolicies: [
      {
        id: '3',
        name: 'Home Insurance',
        policyNumber: 'HIP-2024-003',
        coverage: 350000,
        reason: "Incident occurred outside of covered property",
        relevantTerms: [
          {
            text: "Coverage only applies to incidents occurring within the insured property",
            section: "3.1",
            page: 8,
            isExclusion: true
          }
        ]
      }
    ],
    recommendations: {
      actionItems: [
        "Submit medical bills and receipts within 30 days",
        "Obtain detailed medical report from treating physician",
        "File police report if applicable",
        "Keep all receipts for out-of-pocket expenses"
      ],
      attentionItems: [
        "Pre-authorization required for treatments over $5,000",
        "Follow-up treatments must be completed within 90 days",
        "Notify insurance provider within 24 hours of hospitalization"
      ],
      requiredDocuments: [
        "Medical bills and receipts",
        "Incident report",
        "Medical records",
        "Photo evidence of injury",
        "Police report (if applicable)"
      ]
    }
  };

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return demoAnalysis;
}
