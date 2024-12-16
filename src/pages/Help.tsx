import React, { useState } from 'react';
import { 
  HelpCircle, 
  Mail, 
  Phone, 
  MessageCircle, 
  ChevronDown, 
  ChevronUp,
  FileText,
  Shield,
  AlertCircle
} from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: 'general' | 'policies' | 'claims';
}

const faqs: FAQItem[] = [
  {
    question: "How do I upload a new insurance policy?",
    answer: "To upload a new policy, go to the Policies page and click the 'Add Policy' button. You can then either drag and drop your policy documents or browse to select them from your computer.",
    category: "policies"
  },
  {
    question: "How does the AI-assisted claim analysis work?",
    answer: "When you submit a claim, our AI system analyzes the incident details and your policy coverage to identify eligible policies and provide recommendations for the best course of action.",
    category: "claims"
  },
  {
    question: "What file formats are supported for policy uploads?",
    answer: "We support PDF, JPG, and PNG files for policy document uploads. For best results, we recommend uploading clear, high-resolution scans of your documents.",
    category: "policies"
  }
];

const supportResources = [
  {
    title: "Getting Started Guide",
    description: "Learn how to use the platform effectively",
    icon: FileText,
    link: "#"
  },
  {
    title: "Policy Management",
    description: "Tips for organizing your insurance policies",
    icon: Shield,
    link: "#"
  },
  {
    title: "Claims Process",
    description: "Step-by-step guide to filing claims",
    icon: AlertCircle,
    link: "#"
  }
];

const contactOptions = [
  {
    icon: Mail,
    title: "Email Support",
    description: "support@insureguard.com",
    action: "Send Email"
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "1-800-123-4567",
    action: "Call Now"
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat"
  }
];

export default function Help() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'general' | 'policies' | 'claims'>('all');
  const [expandedFAQ, setExpandedFAQ] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-secondary-900">Help Center</h1>
          <p className="text-secondary-600">Find answers and get support</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <div className="flex gap-2 mt-4">
            {['all', 'general', 'policies', 'claims'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category as any)}
                className={`px-4 py-2 rounded-lg text-sm ${
                  selectedCategory === category
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-secondary-600 hover:bg-gray-200'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs */}
        <div className="bg-white rounded-xl border border-gray-200 mb-8">
          <h2 className="text-lg font-semibold text-secondary-900 p-6 border-b border-gray-200">
            Frequently Asked Questions
          </h2>
          <div className="divide-y divide-gray-200">
            {filteredFAQs.map((faq) => (
              <div key={faq.question} className="p-6">
                <button
                  onClick={() => setExpandedFAQ(expandedFAQ === faq.question ? null : faq.question)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <span className="font-medium text-secondary-900">{faq.question}</span>
                  {expandedFAQ === faq.question ? (
                    <ChevronUp className="w-5 h-5 text-secondary-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-secondary-400" />
                  )}
                </button>
                {expandedFAQ === faq.question && (
                  <p className="mt-2 text-secondary-600">{faq.answer}</p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Support Resources */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {supportResources.map(({ title, description, icon: Icon, link }) => (
            <a
              key={title}
              href={link}
              className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow"
            >
              <Icon className="w-8 h-8 text-primary-600 mb-4" />
              <h3 className="font-medium text-secondary-900 mb-2">{title}</h3>
              <p className="text-sm text-secondary-600">{description}</p>
            </a>
          ))}
        </div>

        {/* Contact Options */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-secondary-900 mb-6">Contact Support</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {contactOptions.map(({ icon: Icon, title, description, action }) => (
              <div key={title} className="p-4 rounded-lg border border-gray-200">
                <Icon className="w-6 h-6 text-primary-600 mb-3" />
                <h3 className="font-medium text-secondary-900 mb-1">{title}</h3>
                <p className="text-sm text-secondary-600 mb-3">{description}</p>
                <button className="text-sm text-primary-600 font-medium hover:text-primary-700">
                  {action}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
