import React, { useState } from 'react';
import { Plus, X, Mail, Phone, AlertCircle } from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  relationship: string;
}

interface TriggerType {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

export default function FamilyLinkSection() {
  const [contacts, setContacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'Sarah Smith',
      email: 'sarah.smith@example.com',
      phone: '+1 (555) 987-6543',
      relationship: 'Spouse'
    }
  ]);

  const [triggerTypes] = useState<TriggerType[]>([
    {
      id: '1',
      label: 'Death',
      description: 'Send policy information and claim instructions in case of death',
      enabled: true
    },
    {
      id: '2',
      label: 'Critical Condition',
      description: 'Notify when hospitalized or in critical condition',
      enabled: true
    },
    {
      id: '3',
      label: 'Major Claims',
      description: 'Alert for claims above $10,000',
      enabled: false
    }
  ]);

  const [showAddContact, setShowAddContact] = useState(false);

  const handleAddContact = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    
    const newContact: Contact = {
      id: Date.now().toString(),
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      relationship: formData.get('relationship') as string
    };

    setContacts([...contacts, newContact]);
    setShowAddContact(false);
  };

  const handleRemoveContact = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Contacts List */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-sm font-medium text-secondary-700">Trusted Contacts</h4>
          <button
            onClick={() => setShowAddContact(true)}
            className="inline-flex items-center gap-2 text-sm text-primary-600 hover:text-primary-700"
          >
            <Plus className="w-4 h-4" />
            <span>Add Contact</span>
          </button>
        </div>

        <div className="space-y-3">
          {contacts.map(contact => (
            <div key={contact.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <h5 className="font-medium text-secondary-900">{contact.name}</h5>
                <p className="text-sm text-secondary-600">{contact.relationship}</p>
                <div className="mt-2 space-y-1">
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Mail className="w-4 h-4" />
                    <span>{contact.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-secondary-600">
                    <Phone className="w-4 h-4" />
                    <span>{contact.phone}</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => handleRemoveContact(contact.id)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Trigger Types */}
      <div>
        <h4 className="text-sm font-medium text-secondary-700 mb-4">Notification Triggers</h4>
        <div className="space-y-3">
          {triggerTypes.map(trigger => (
            <div key={trigger.id} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <AlertCircle className="w-5 h-5 text-primary-600 mt-0.5" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h5 className="font-medium text-secondary-900">{trigger.label}</h5>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked={trigger.enabled}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                  </label>
                </div>
                <p className="text-sm text-secondary-600 mt-1">{trigger.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Contact Modal */}
      {showAddContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-secondary-900">Add Trusted Contact</h3>
              <button
                onClick={() => setShowAddContact(false)}
                className="text-secondary-400 hover:text-secondary-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleAddContact} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Phone
                </label>
                <input
                  type="tel"
                  name="phone"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-secondary-700 mb-1">
                  Relationship
                </label>
                <select
                  name="relationship"
                  required
                  className="w-full px-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select relationship</option>
                  <option value="Spouse">Spouse</option>
                  <option value="Child">Child</option>
                  <option value="Parent">Parent</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddContact(false)}
                  className="px-4 py-2 border border-gray-200 rounded-lg text-secondary-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
