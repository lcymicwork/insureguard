import { Mail, Phone, MessageCircle, Shield, FileText, AlertCircle } from 'lucide-react';

export interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'policies' | 'claims';
}

export const faqs: FAQItem[] = [
  {
    question: "How do I upload a new insurance policy?",
    answer: "To upload a new policy, go to the Policies page and click the 'Add Policy' button. You can then either drag and drop your policy documents or browse to select them from your computer.",
    category: "policies"
  },
  // ... rest of the FAQs
];

export const supportResources = [
  {
    title: "Policy Guide",
    description: "Learn how to manage your insurance policies effectively",
    icon: Shield,
    link: "#"
  },
  // ... rest of the resources
];

export const contactOptions = [
  {
    icon: Mail,
    title: "Email Support",
    description: "support@insureguard.com",
    action: "Send Email"
  },
  // ... rest of the contact options
];
