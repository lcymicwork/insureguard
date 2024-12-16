import React from 'react';
import { Policy } from '../../types';

interface ClaimFormProps {
  policies: Policy[];
  onSubmit: (data: any) => void;
}

export default function ClaimForm({ policies, onSubmit }: ClaimFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Select Policy
        </label>
        <select
          name="policyId"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
        >
          <option value="">Select a policy</option>
          {policies.map(policy => (
            <option key={policy.id} value={policy.id}>
              {policy.name} - {policy.policyNumber}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Claim Type
        </label>
        <input
          type="text"
          name="type"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          placeholder="e.g., Medical Expense, Property Damage"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Date of Incident
        </label>
        <input
          type="date"
          name="date"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Claim Amount
        </label>
        <input
          type="number"
          name="amount"
          required
          step="0.01"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          placeholder="0.00"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={4}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
          placeholder="Provide details about the incident..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Supporting Documents
        </label>
        <input
          type="file"
          name="documents"
          multiple
          className="mt-1 block w-full text-sm text-secondary-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-primary-50 file:text-primary-700
            hover:file:bg-primary-100"
        />
      </div>

      <div className="flex justify-end space-x-3">
        <button
          type="button"
          className="px-4 py-2 border border-gray-300 rounded-md text-secondary-700 hover:bg-gray-50"
        >
          Save as Draft
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700"
        >
          Submit Claim
        </button>
      </div>
    </form>
  );
}
