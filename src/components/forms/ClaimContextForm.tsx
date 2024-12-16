import React, { useState } from 'react';
import { Calendar, MapPin, FileText, Loader } from 'lucide-react';

interface ClaimContextFormProps {
  onSubmit: (data: any) => void;
}

export default function ClaimContextForm({ onSubmit }: ClaimContextFormProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAnalyzing(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = Object.fromEntries(formData.entries());
    
    // Simulate AI analysis delay
    setTimeout(() => {
      setIsAnalyzing(false);
      onSubmit(data);
    }, 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Date and Time of Incident
        </label>
        <input
          type="datetime-local"
          name="incidentDateTime"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Location of Incident
        </label>
        <input
          type="text"
          name="location"
          required
          placeholder="Enter address or location details"
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-secondary-700">
          Incident Description
        </label>
        <textarea
          name="description"
          required
          rows={4}
          placeholder="Describe what happened in detail..."
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-primary-500 focus:outline-none focus:ring-primary-500"
        />
        <p className="mt-1 text-sm text-secondary-500">
          Provide as much detail as possible to help us identify eligible policies
        </p>
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
        <p className="mt-1 text-sm text-secondary-500">
          Upload any relevant photos, reports, or documentation
        </p>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isAnalyzing}
          className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
        >
          {isAnalyzing ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              <span>Analyzing Incident...</span>
            </>
          ) : (
            <>
              <span>Proceed to Next Step</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
