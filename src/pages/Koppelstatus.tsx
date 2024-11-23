import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import StatusCard from '../components/Paddock/StatusCard';
import ExceptionList from '../components/Paddock/ExceptionList';
import AddExceptionModal from '../components/Paddock/AddExceptionModal';
import type { PaddockStatus, HorsePaddockException } from '../types/paddock';
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
    ridingParticipants: [],
    veterinarian: { id: '1', name: '', email: '', phone: '' },
    farrier: { id: '1', name: '', email: '', phone: '' },
    feedingPlan: { id: '1', morning: [], noon: [], evening: [] },
  },
];

const Koppelstatus = () => {
  const [status, setStatus] = useState<PaddockStatus>({
    isOpen: true,
    lastUpdated: new Date(),
    weather: 'sunny',
    notes: '',
  });

  const [exceptions, setExceptions] = useState<HorsePaddockException[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleStatusToggle = () => {
    setStatus({
      ...status,
      isOpen: !status.isOpen,
      lastUpdated: new Date(),
    });
  };

  const handleStatusUpdate = (updates: Partial<PaddockStatus>) => {
    setStatus({
      ...status,
      ...updates,
      lastUpdated: new Date(),
    });
  };

  const handleAddException = (data: {
    horseId: string;
    reason: string;
    startDate: Date;
    endDate: Date;
  }) => {
    const horse = mockHorses.find((h) => h.id === data.horseId);
    if (!horse) return;

    const newException: HorsePaddockException = {
      horseId: data.horseId,
      horseName: horse.name,
      reason: data.reason,
      startDate: data.startDate,
      endDate: data.endDate,
      isActive: true,
    };

    setExceptions([...exceptions, newException]);
    setIsModalOpen(false);
  };

  const handleDeleteException = (horseId: string) => {
    setExceptions(
      exceptions.map((e) =>
        e.horseId === horseId ? { ...e, isActive: false } : e
      )
    );
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Koppelstatus</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          <Plus className="h-5 w-5 mr-2" />
          Ausnahme hinzufügen
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <StatusCard
          status={status}
          onToggle={handleStatusToggle}
          onUpdate={handleStatusUpdate}
        />
        <ExceptionList
          exceptions={exceptions}
          onDelete={handleDeleteException}
        />
      </div>

      <AddExceptionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddException}
        horses={mockHorses}
      />
    </div>
  );
};

export default Koppelstatus;