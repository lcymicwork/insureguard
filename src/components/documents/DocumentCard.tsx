import React from 'react';
import { FileText, Download, Calendar } from 'lucide-react';
import { Document } from '../../types';

interface DocumentCardProps {
  document: Document;
  onDownload?: () => void;
}

export default function DocumentCard({ document, onDownload }: DocumentCardProps) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <FileText className="w-6 h-6 text-primary-600" />
          <div>
            <h3 className="font-semibold text-secondary-900">{document.name}</h3>
            <p className="text-sm text-secondary-500">{document.size}</p>
          </div>
        </div>
        <button
          onClick={onDownload}
          className="p-2 hover:bg-gray-100 rounded-lg text-secondary-600"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2 text-sm text-secondary-600">
        <Calendar className="w-4 h-4" />
        <span>Uploaded on {new Date(document.uploadDate).toLocaleDateString()}</span>
      </div>
    </div>
  );
}
