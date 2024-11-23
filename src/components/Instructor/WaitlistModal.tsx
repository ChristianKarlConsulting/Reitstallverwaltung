import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { X, Clock, Users } from 'lucide-react';
import type { LessonBooking } from '../../types/instructor';

type WaitlistModalProps = {
  isOpen: boolean;
  onClose: () => void;
  waitlist: LessonBooking[];
  onAccept: (bookingId: string) => void;
  onReject: (bookingId: string) => void;
};

const WaitlistModal: React.FC<WaitlistModalProps> = ({
  isOpen,
  onClose,
  waitlist,
  onAccept,
  onReject,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Warteliste</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full"
          >
            <X className="h-6 w-6 text-gray-500" />
          </button>
        </div>

        <div className="space-y-4">
          {waitlist.map((booking) => (
            <div
              key={booking.id}
              className="p-4 border rounded-lg bg-gray-50"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{booking.studentName}</p>
                  <div className="flex items-center text-sm text-gray-600 mt-1">
                    <Clock className="h-4 w-4 mr-1" />
                    {format(booking.date, 'dd. MMMM yyyy', { locale: de })}
                  </div>
                  {booking.notes && (
                    <p className="text-sm text-gray-600 mt-2">{booking.notes}</p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => onAccept(booking.id)}
                    className="px-3 py-1 bg-green-100 text-green-800 rounded-md hover:bg-green-200"
                  >
                    Annehmen
                  </button>
                  <button
                    onClick={() => onReject(booking.id)}
                    className="px-3 py-1 bg-red-100 text-red-800 rounded-md hover:bg-red-200"
                  >
                    Ablehnen
                  </button>
                </div>
              </div>
            </div>
          ))}

          {waitlist.length === 0 && (
            <p className="text-center text-gray-500 py-4">
              Keine Einträge auf der Warteliste
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitlistModal;