import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { Instructor, Availability, LessonBooking } from '../types/instructor';
import InstructorSchedule from '../components/Instructor/InstructorSchedule';
import WaitlistModal from '../components/Instructor/WaitlistModal';
import useNotifications from '../hooks/useNotifications';

// Beispieldaten für den eingeloggten Reitlehrer
const mockInstructor: Instructor = {
  id: '1',
  name: 'Sarah Schmidt',
  email: 'sarah.schmidt@example.com',
  phone: '+49 123 456789',
  specializations: ['Dressur', 'Springreiten'],
  description: 'Erfahrene Reitlehrerin mit Fokus auf klassische Dressur',
};

const mockBookings: LessonBooking[] = [
  {
    id: '1',
    availabilityId: '1',
    instructorId: '1',
    studentId: 'student1',
    studentName: 'Max Mustermann',
    date: new Date(),
    status: 'bestätigt',
    createdAt: new Date(),
  },
  {
    id: '2',
    availabilityId: '1',
    instructorId: '1',
    studentId: 'student2',
    studentName: 'Anna Weber',
    date: new Date(),
    status: 'warteliste',
    createdAt: new Date(),
  },
];

const ReitlehrerBereich = () => {
  const [bookings, setBookings] = useState<LessonBooking[]>(mockBookings);
  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const { addNotification } = useNotifications();

  const waitlistBookings = bookings.filter((b) => b.status === 'warteliste');

  const handleAddAvailability = (
    data: Omit<Availability, 'id' | 'isBooked' | 'currentStudents'>
  ) => {
    // Hier würde normalerweise die neue Verfügbarkeit gespeichert werden
    console.log('Neue Verfügbarkeit:', data);
  };

  const handleAcceptWaitlist = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'bestätigt' }
          : booking
      )
    );

    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      addNotification({
        title: 'Reitstunde bestätigt',
        message: `Die Buchung für ${booking.studentName} wurde bestätigt.`,
        type: 'success',
      });
    }
  };

  const handleRejectWaitlist = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((booking) =>
        booking.id === bookingId
          ? { ...booking, status: 'storniert' }
          : booking
      )
    );

    const booking = bookings.find((b) => b.id === bookingId);
    if (booking) {
      addNotification({
        title: 'Buchung abgelehnt',
        message: `Die Buchung für ${booking.studentName} wurde abgelehnt.`,
        type: 'error',
      });
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Reitlehrer-Bereich</h1>
          <p className="mt-2 text-gray-600">
            Verwalten Sie Ihre Verfügbarkeiten und Buchungen
          </p>
        </div>
        <button
          onClick={() => setIsWaitlistOpen(true)}
          className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
        >
          Warteliste ({waitlistBookings.length})
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <InstructorSchedule
            instructorId={mockInstructor.id}
            onAddAvailability={handleAddAvailability}
          />
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Aktuelle Buchungen</h2>
          <div className="space-y-4">
            {bookings
              .filter((b) => b.status === 'bestätigt')
              .map((booking) => (
                <div
                  key={booking.id}
                  className="p-4 border rounded-lg hover:border-indigo-500 transition-colors"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">{booking.studentName}</p>
                      <p className="text-sm text-gray-600">
                        {format(booking.date, 'dd. MMMM yyyy', { locale: de })}
                      </p>
                    </div>
                    <span className="px-2 py-1 rounded-full text-sm bg-green-100 text-green-800">
                      {booking.status}
                    </span>
                  </div>
                  {booking.notes && (
                    <p className="mt-2 text-sm text-gray-600">{booking.notes}</p>
                  )}
                </div>
              ))}

            {bookings.filter((b) => b.status === 'bestätigt').length === 0 && (
              <p className="text-center text-gray-500 py-4">
                Keine aktuellen Buchungen
              </p>
            )}
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistOpen}
        onClose={() => setIsWaitlistOpen(false)}
        waitlist={waitlistBookings}
        onAccept={handleAcceptWaitlist}
        onReject={handleRejectWaitlist}
      />
    </div>
  );
};

export default ReitlehrerBereich;