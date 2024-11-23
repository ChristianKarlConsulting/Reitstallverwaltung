import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import DocumentCard from '../components/Documents/DocumentCard';
import UploadModal from '../components/Documents/UploadModal';
import type { Document } from '../types/document';

// Beispieldaten
const mockDocuments: Document[] = [
  {
    id: '1',
    title: 'Einstellvertrag',
    description: 'Standardvertrag für neue Einsteller',
    category: 'verträge',
    fileUrl: '#',
    fileType: 'application/pdf',
    fileSize: 2500000,
    uploadedBy: 'Admin',
    uploadedAt: new Date('2024-03-01'),
    tags: ['wichtig', 'vertrag'],
    accessLevel: 'alle',
  },
  {
    id: '2',
    title: 'Reitordnung',
    description: 'Aktuelle Reitordnung des Stalls',
    category: 'anleitungen',
    fileUrl: '#',
    fileType: 'application/pdf',
    fileSize: 1500000,
    uploadedBy: 'Admin',
    uploadedAt: new Date('2024-02-15'),
    tags: ['regeln'],
    accessLevel: 'alle',
  },
];

const Dokumente = () => {
  const [documents, setDocuments] = useState<Document[]>(mockDocuments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const handleUpload = (data: Omit<Document, 'id' | 'fileUrl' | 'fileSize' | 'uploadedAt'>) => {
    const newDocument: Document = {
      id: Math.random().toString(36).substr(2, 9),
      fileUrl: '#', // In einer echten App würde hier die URL des hochgeladenen Dokuments stehen
      fileSize: 1000000, // Beispielgröße
      uploadedAt: new Date(),
      ...data,
    };

    setDocuments([newDocument, ...documents]);
    setIsModalOpen(false);
  };

  const handleDownload = (document: Document) => {
    // In einer echten App würde hier der Download initiiert werden
    console.log('Downloading:', document.title);
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = 
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags?.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dokumente</h1>
          <p className="mt-2 text-gray-600">
            Verwalten Sie wichtige Dokumente und Formulare
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Dokument hochladen
        </button>
      </header>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Titel, Beschreibung oder Tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">Alle Kategorien</option>
          <option value="verträge">Verträge</option>
          <option value="formulare">Formulare</option>
          <option value="anleitungen">Anleitungen</option>
          <option value="sonstiges">Sonstiges</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDocuments.map((document) => (
          <DocumentCard
            key={document.id}
            document={document}
            onDownload={handleDownload}
          />
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Keine Dokumente gefunden
        </p>
      )}

      <UploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onUpload={handleUpload}
      />
    </div>
  );
};

export default Dokumente;