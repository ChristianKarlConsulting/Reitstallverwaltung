import React, { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import HorseCard from '../components/Horse/HorseCard';
import HorseDetails from '../components/Horse/HorseDetails';
import type { Horse } from '../types/horse';

// Example data - In a real app, this would come from an API
const mockHorses: Horse[] = [
  {
    id: '1',
    name: 'Luna',
    owner: 'Anna Schmidt',
    birthDate: '2015-03-15',
    breed: 'Hannoveraner',
    color: 'Rappe',
    boxNumber: '12',
    ridingParticipants: [
      {
        id: '1',
        name: 'Marie Weber',
        email: 'marie@example.com',
        phone: '+49 123 456789',
        schedule: ['Montag', 'Donnerstag'],
      },
    ],
    veterinarian: {
      id: '1',
      name: 'Dr. Mueller',
      email: 'mueller@vet.de',
      phone: '+49 123 456789',
      lastVisit: '2024-02-15',
      nextVisit: '2024-05-15',
    },
    farrier: {
      id: '1',
      name: 'Hans Schmidt',
      email: 'schmidt@hufschmied.de',
      phone: '+49 123 456789',
      lastVisit: '2024-03-01',
      nextVisit: '2024-04-01',
    },
    feedingPlan: {
      id: '1',
      morning: ['2kg Hafer', '1kg Heu'],
      noon: ['1kg Heu'],
      evening: ['2kg Hafer', '2kg Heu'],
      specialInstructions: 'Langsamer Fresser',
    },
  },
  // Add more mock horses here
];

const PferdeUebersicht = () => {
  const [horses] = useState<Horse[]>(mockHorses);
  const [selectedHorse, setSelectedHorse] = useState<Horse | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHorses = horses.filter((horse) =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.boxNumber.includes(searchTerm)
  );

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Pferdeübersicht</h1>
        <button className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700">
          <Plus className="h-5 w-5 mr-2" />
          Pferd hinzufügen
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Suche nach Pferd, Besitzer oder Box..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredHorses.map((horse) => (
          <HorseCard
            key={horse.id}
            horse={horse}
            onClick={() => setSelectedHorse(horse)}
          />
        ))}
      </div>

      {selectedHorse && (
        <HorseDetails
          horse={selectedHorse}
          onClose={() => setSelectedHorse(null)}
        />
      )}
    </div>
  );
};

export default PferdeUebersicht;