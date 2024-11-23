import React from 'react';
import { format, isSameDay } from 'date-fns';
import { de } from 'date-fns/locale';
import { Clock, Users } from 'lucide-react';
import type { Availability } from '../../types/instructor';

type AvailabilityCalendarProps = {
  availabilities: Availability[];
  onSlotSelect: (availability: Availability) => void;
  selectedDate: Date;
};

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({
  availabilities,
  onSlotSelect,
  selectedDate,
}) => {
  const dailyAvailabilities = availabilities.filter(
    (slot) => isSameDay(slot.date, selectedDate)
  );

  return (
    <div className="space-y-4">
      {dailyAvailabilities.map((slot) => (
        <div
          key={slot.id}
          onClick={() => onSlotSelect(slot)}
          className={`p-4 rounded-lg border ${
            slot.isBooked
              ? 'bg-gray-50 cursor-not-allowed'
              : 'bg-white hover:border-indigo-500 cursor-pointer'
          } transition-colors`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  <span className="font-medium">
                    {format(slot.startTime, 'HH:mm')} -{' '}
                    {format(slot.endTime, 'HH:mm')}
                  </span>
                </div>
                <div className="flex items-center space-x-2 mt-1">
                  <Users className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-600">
                    {slot.currentStudents}/{slot.maxStudents} Teilnehmer
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <span
                className={`px-3 py-1 rounded-full text-sm ${
                  slot.type === 'einzelstunde'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {slot.type === 'einzelstunde' ? 'Einzelstunde' : 'Gruppenstunde'}
              </span>
              <div className="mt-1 text-sm text-gray-500">
                Level: {slot.level}
              </div>
            </div>
          </div>
        </div>
      ))}

      {dailyAvailabilities.length === 0 && (
        <p className="text-center text-gray-500 py-8">
          Keine Verfügbarkeiten an diesem Tag
        </p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;