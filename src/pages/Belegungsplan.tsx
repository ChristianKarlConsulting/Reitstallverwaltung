import React, { useState } from 'react';
import WeeklyCalendar from '../components/Calendar/WeeklyCalendar';
import BookingModal from '../components/Booking/BookingModal';
import type { Booking, Facility } from '../types/booking';

const facilities: Facility[] = [
  { id: '1', name: 'Reithalle', type: 'reithalle' },
  { id: '2', name: 'Longierhalle', type: 'longierhalle' },
  { id: '3', name: 'Außenplatz 1', type: 'aussenplatz' },
  { id: '4', name: 'Außenplatz 2', type: 'aussenplatz' },
];

const Belegungsplan = () => {
  const [selectedFacility, setSelectedFacility] = useState<string>(facilities[0].id);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleSlotClick = (date: Date, hour: number) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveBooking = (data: {
    facilityId: string;
    startTime: Date;
    endTime: Date;
    title: string;
    description?: string;
  }) => {
    const newBooking: Booking = {
      id: Math.random().toString(36).substr(2, 9),
      userId: 'current-user',
      userName: 'Max Mustermann',
      ...data,
    };

    setBookings([...bookings, newBooking]);
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Belegungsplan</h1>
        <div className="flex space-x-4">
          <select
            value={selectedFacility}
            onChange={(e) => setSelectedFacility(e.target.value)}
            className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            {facilities.map((facility) => (
              <option key={facility.id} value={facility.id}>
                {facility.name}
              </option>
            ))}
          </select>
        </div>
      </header>

      <WeeklyCalendar
        bookings={bookings.filter((b) => b.facilityId === selectedFacility)}
        onSlotClick={handleSlotClick}
      />

      {selectedDate && (
        <BookingModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBooking}
          selectedDate={selectedDate}
          facilities={facilities}
        />
      )}
    </div>
  );
};

export default Belegungsplan;