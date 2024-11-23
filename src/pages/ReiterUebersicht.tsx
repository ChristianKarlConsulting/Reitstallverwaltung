import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import RiderCard from '../components/Rider/RiderCard';
import RiderModal from '../components/Rider/RiderModal';
import type { Rider } from '../types/rider';

// Beispieldaten
const mockRiders: Rider[] = [
  {
    id: '1',
    name: 'Anna Schmidt',
    email: 'anna.schmidt@example.com',
    phone: '+49 123 456789',
    address: 'Musterstraße 1, 12345 Musterstadt',
    emergencyContact: {
      name: 'Thomas Schmidt',
      phone: '+49 987 654321',
      relation: 'Ehemann',
    },
    horses: [
      {
        horseId: '1',
        horseName: 'Luna',
        role: 'besitzer',
      },
    ],
    memberSince: new Date('2023-01-15'),
    status: 'aktiv',
  },
  {
    id: '2',
    name: 'Max Mustermann',
    email: 'max.mustermann@example.com',
    phone: '+49 123 456788',
    horses: [
      {
        horseId: '2',
        horseName: 'Star',
        role: 'reitbeteiligung',
        schedule: ['Montag', 'Donnerstag'],
      },
    ],
    memberSince: new Date('2023-06-01'),
    status: 'aktiv',
  },
];

const ReiterUebersicht = () => {
  const [riders, setRiders] = useState<Rider[]>(mockRiders);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRider, setSelectedRider] = useState<Rider | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'aktiv' | 'inaktiv'>('all');

  const handleSave = (data: Omit<Rider, 'id' | 'memberSince'>) => {
    if (selectedRider) {
      setRiders(riders.map(rider =>
        rider.id === selectedRider.id
          ? { ...rider, ...data }
          : rider
      ));
    } else {
      const newRider: Rider = {
        id: Math.random().toString(36).substr(2, 9),
        memberSince: new Date(),
        ...data,
      };
      setRiders([newRider, ...riders]);
    }
    setIsModalOpen(false);
    setSelectedRider(null);
  };

  const filteredRiders = riders.filter(rider => {
    const matchesSearch = 
      rider.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rider.phone.includes(searchTerm);
    
    const matchesStatus = statusFilter === 'all' || rider.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reiterübersicht</h1>
          <p className="mt-2 text-gray-600">
            Verwalten Sie alle Reiter und deren Informationen
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedRider(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Neuer Reiter
        </button>
      </header>

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Name, E-Mail oder Telefon..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value as 'all' | 'aktiv' | 'inaktiv')}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">Alle Status</option>
          <option value="aktiv">Aktiv</option>
          <option value="inaktiv">Inaktiv</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRiders.map((rider) => (
          <RiderCard
            key={rider.id}
            rider={rider}
            onClick={() => {
              setSelectedRider(rider);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {filteredRiders.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Keine Reiter gefunden
        </p>
      )}

      <RiderModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRider(null);
        }}
        onSave={handleSave}
        initialData={selectedRider}
      />
    </div>
  );
};

export default ReiterUebersicht;