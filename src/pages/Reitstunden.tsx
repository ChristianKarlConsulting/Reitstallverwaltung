import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar as CalendarIcon } from 'lucide-react';
import type { Instructor, Availability, LessonBooking } from '../types/instructor';
import AvailabilityCalendar from '../components/Instructor/AvailabilityCalendar';
import BookingModal from '../components/Instructor/BookingModal';

// Beispieldaten
const mockInstructors: Instructor[] = [
  {
    id: '1',
    name: 'Sarah Schmidt',
    email: 'sarah.schmidt@example.com',
    phone: '+49 123 456789',
    specializations: ['Dressur', 'Springreiten'],
    description: 'Erfahrene Reitlehrerin mit Fokus auf klassische Dressur',
    imageUrl: 'https://images.unsplash.com/photo-1534551767192-78b8dd45b51b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
  },
];

const mockAvailabilities: Availability[] = [
  {
    id: '1',
    instructorId: '1',
    date: new Date(),
    startTime: new Date(new Date().setHours(9, 0)),
    endTime: new Date(new Date().setHours(10, 0)),
    isBooked: false,
    maxStudents: 1,
    currentStudents: 0,
    type: 'einzelstunde',
    level: 'alle',
  },
  {
    id: '2',
    instructorId: '1',
    date: new Date(),
    startTime: new Date(new Date().setHours(10, 0)),
    endTime: new Date(new Date().setHours(11, 0)),
    isBooked: true,
    maxStudents: 4,
    currentStudents: 4,
    type: 'gruppenstunde',
    level: 'anfänger',
  },
];

const Reitstunden = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedInstructor, setSelectedInstructor] = useState<string>(mockInstructors[0].id);
  const [selectedAvailability, setSelectedAvailability] = useState<Availability | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);

  const handleBook = (data: { availabilityId: string; studentName: string; notes?: string }) => {
    const availability = mockAvailabilities.find(a => a.id === data.availabilityId);
    if (!availability) return;

    const booking: LessonBooking = {
      id: Math.random().toString(36).substr(2, 9),
      availabilityId: data.availabilityId,
      instructorId: availability.instructorId,
      studentId: 'current-user',
      studentName: data.studentName,
      date: availability.date,
      status: availability.isBooked ? 'warteliste' : 'bestätigt',
      createdAt: new Date(),
      notes: data.notes,
    };

    // Hier würde normalerweise die Buchung gespeichert werden
    console.log('Neue Buchung:', booking);
    setIsBookingModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-gray-900">Reitstunden buchen</h1>
        <p className="mt-2 text-gray-600">
          Wählen Sie einen Reitlehrer und buchen Sie Ihre Reitstunde
        </p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Reitlehrer</h2>
            <div className="space-y-4">
              {mockInstructors.map((instructor) => (
                <div
                  key={instructor.id}
                  onClick={() => setSelectedInstructor(instructor.id)}
                  className={`p-4 rounded-lg border cursor-pointer ${
                    selectedInstructor === instructor.id
                      ? 'border-indigo-500 bg-indigo-50'
                      : 'hover:border-gray-300'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={instructor.imageUrl}
                      alt={instructor.name}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-medium">{instructor.name}</h3>
                      <p className="text-sm text-gray-600">
                        {instructor.specializations.join(', ')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Datum wählen</h2>
            <div className="flex items-center space-x-4">
              <CalendarIcon className="h-5 w-5 text-gray-400" />
              <input
                type="date"
                value={format(selectedDate, 'yyyy-MM-dd')}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Verfügbare Zeiten</h2>
            <AvailabilityCalendar
              availabilities={mockAvailabilities.filter(
                (a) => a.instructorId === selectedInstructor
              )}
              selectedDate={selectedDate}
              onSlotSelect={(availability) => {
                setSelectedAvailability(availability);
                setIsBookingModalOpen(true);
              }}
            />
          </div>
        </div>
      </div>

      {selectedAvailability && (
        <BookingModal
          isOpen={isBookingModalOpen}
          onClose={() => setIsBookingModalOpen(false)}
          onBook={handleBook}
          availability={selectedAvailability}
        />
      )}
    </div>
  );
};

export default Reitstunden;