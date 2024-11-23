import React from 'react';
import { FileText, Download, Calendar, Tag, Users } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { Document } from '../../types/document';

type DocumentCardProps = {
  document: Document;
  onDownload: (document: Document) => void;
};

const categoryColors = {
  verträge: 'bg-blue-100 text-blue-800',
  formulare: 'bg-green-100 text-green-800',
  anleitungen: 'bg-purple-100 text-purple-800',
  sonstiges: 'bg-gray-100 text-gray-800',
};

const DocumentCard: React.FC<DocumentCardProps> = ({ document, onDownload }) => {
  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <FileText className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{document.title}</h3>
            <p className="text-sm text-gray-600">{formatFileSize(document.fileSize)}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm ${categoryColors[document.category]}`}>
          {document.category}
        </span>
      </div>

      {document.description && (
        <p className="text-gray-600 mb-4">{document.description}</p>
      )}

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Calendar className="h-4 w-4 mr-2" />
          <span>
            Hochgeladen am {format(document.uploadedAt, 'dd. MMMM yyyy', { locale: de })}
          </span>
        </div>

        <div className="flex items-center text-gray-600">
          <Users className="h-4 w-4 mr-2" />
          <span>Zugriff: {document.accessLevel}</span>
        </div>

        {document.tags && document.tags.length > 0 && (
          <div className="flex items-center text-gray-600">
            <Tag className="h-4 w-4 mr-2" />
            <div className="flex flex-wrap gap-2">
              {document.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 bg-gray-100 rounded-full text-xs text-gray-600"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => onDownload(document)}
        className="mt-4 flex items-center px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md"
      >
        <Download className="h-4 w-4 mr-2" />
        Herunterladen
      </button>
    </div>
  );
};

export default DocumentCard;