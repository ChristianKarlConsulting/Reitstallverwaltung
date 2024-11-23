import React, { useState } from 'react';
import { Plus, Search, Filter } from 'lucide-react';
import HealthRecordCard from '../components/Health/HealthRecordCard';
import HealthRecordModal from '../components/Health/HealthRecordModal';
import VaccinationSchedule from '../components/Health/VaccinationSchedule';
import type { HealthRecord, VaccinationSchedule as VaccinationScheduleType } from '../types/health';

// Beispieldaten
const mockHorses = [
  { id: '1', name: 'Luna' },
  { id: '2', name: 'Max' },
];

const mockHealthRecords: HealthRecord[] = [
  {
    id: '1',
    horseId: '1',
    horseName: 'Luna',
    type: 'impfung',
    date: new Date('2024-02-15'),
    nextDate: new Date('2024-08-15'),
    veterinarian: 'Dr. Mueller',
    diagnosis: 'Routineimpfung',
    status: 'abgeschlossen',
    documents: [
      {
        id: '1',
        name: 'Impfpass.pdf',
        url: '#',
        type: 'application/pdf',
        uploadDate: new Date('2024-02-15'),
      },
    ],
  },
  {
    id: '2',
    horseId: '1',
    horseName: 'Luna',
    type: 'untersuchung',
    date: new Date('2024-03-01'),
    veterinarian: 'Dr. Schmidt',
    diagnosis: 'Lahmheit vorne rechts',
    treatment: 'Ruhigstellung und Entzündungshemmer',
    status: 'abgeschlossen',
  },
];

const mockVaccinations: VaccinationScheduleType[] = [
  {
    id: '1',
    horseId: '1',
    vaccinationType: 'Influenza',
    lastDate: new Date('2024-02-15'),
    nextDate: new Date('2024-08-15'),
    interval: 6,
    status: 'aktuell',
  },
  {
    id: '2',
    horseId: '1',
    vaccinationType: 'Tetanus',
    lastDate: new Date('2023-08-15'),
    nextDate: new Date('2024-08-15'),
    interval: 12,
    status: 'aktuell',
  },
];

const Gesundheitsakten = () => {
  const [records, setRecords] = useState<HealthRecord[]>(mockHealthRecords);
  const [vaccinations] = useState<VaccinationScheduleType[]>(mockVaccinations);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<HealthRecord | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');

  const handleSave = (data: Omit<HealthRecord, 'id' | 'status'>) => {
    if (selectedRecord) {
      setRecords(records.map(record =>
        record.id === selectedRecord.id
          ? { ...record, ...data }
          : record
      ));
    } else {
      const newRecord: HealthRecord = {
        id: Math.random().toString(36).substr(2, 9),
        status: 'geplant',
        ...data,
      };
      setRecords([newRecord, ...records]);
    }
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  const filteredRecords = records.filter(record => {
    const matchesSearch = 
      record.horseName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.veterinarian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.diagnosis?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = selectedType === 'all' || record.type === selectedType;
    
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gesundheitsakten</h1>
          <p className="mt-2 text-gray-600">
            Verwalten Sie alle gesundheitlichen Informationen Ihrer Pferde
          </p>
        </div>
        <button
          onClick={() => {
            setSelectedRecord(null);
            setIsModalOpen(true);
          }}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Neue Akte
        </button>
      </header>

      <VaccinationSchedule schedules={vaccinations} />

      <div className="flex items-center space-x-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Suche nach Pferd, Tierarzt oder Diagnose..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>
        <select
          value={selectedType}
          onChange={(e) => setSelectedType(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="all">Alle Typen</option>
          <option value="impfung">Impfungen</option>
          <option value="behandlung">Behandlungen</option>
          <option value="untersuchung">Untersuchungen</option>
          <option value="medikation">Medikationen</option>
          <option value="wurmkur">Wurmkuren</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRecords.map((record) => (
          <HealthRecordCard
            key={record.id}
            record={record}
            onClick={() => {
              setSelectedRecord(record);
              setIsModalOpen(true);
            }}
          />
        ))}
      </div>

      {filteredRecords.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Keine Gesundheitsakten gefunden
        </p>
      )}

      <HealthRecordModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRecord(null);
        }}
        onSave={handleSave}
        horses={mockHorses}
        initialData={selectedRecord}
      />
    </div>
  );
};

export default Gesundheitsakten;