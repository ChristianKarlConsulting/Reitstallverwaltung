import React, { useState } from 'react';
import type { Facility } from '../../types/booking';

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: {
    facilityId: string;
    startTime: Date;
    endTime: Date;
    title: string;
    description?: string;
  }) => void;
  selectedDate: Date;
  facilities: Facility[];
};

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  facilities,
}) => {
  const [formData, setFormData] = useState({
    facilityId: facilities[0]?.id || '',
    title: '',
    description: '',
    duration: '60',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const endTime = new Date(selectedDate);
    endTime.setMinutes(endTime.getMinutes() + parseInt(formData.duration));

    onSave({
      ...formData,
      startTime: selectedDate,
      endTime,
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Neue Buchung</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Anlage
            </label>
            <select
              value={formData.facilityId}
              onChange={(e) =>
                setFormData({ ...formData, facilityId: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              {facilities.map((facility) => (
                <option key={facility.id} value={facility.id}>
                  {facility.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Titel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Dauer (Minuten)
            </label>
            <select
              value={formData.duration}
              onChange={(e) =>
                setFormData({ ...formData, duration: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            >
              <option value="30">30 Minuten</option>
              <option value="60">1 Stunde</option>
              <option value="90">1,5 Stunden</option>
              <option value="120">2 Stunden</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Beschreibung
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
            >
              Abbrechen
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
            >
              Speichern
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;