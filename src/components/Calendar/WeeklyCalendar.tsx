import React from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { de } from 'date-fns/locale';
import type { Booking } from '../../types/booking';

type WeeklyCalendarProps = {
  bookings: Booking[];
  onSlotClick: (date: Date, hour: number) => void;
};

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ bookings, onSlotClick }) => {
  const hours = Array.from({ length: 14 }, (_, i) => i + 6); // 6:00 - 20:00
  const today = new Date();
  const weekStart = startOfWeek(today, { locale: de });
  const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="grid grid-cols-8 border-b">
        <div className="p-2 border-r bg-gray-50"></div>
        {days.map((day) => (
          <div
            key={day.toString()}
            className="p-2 text-center border-r bg-gray-50"
          >
            <div className="font-medium">
              {format(day, 'EEEEEE', { locale: de })}
            </div>
            <div className="text-sm text-gray-600">
              {format(day, 'd.MM')}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-8">
        {hours.map((hour) => (
          <React.Fragment key={hour}>
            <div className="p-2 border-r border-b text-sm text-gray-600">
              {hour}:00
            </div>
            {days.map((day) => {
              const date = new Date(day);
              date.setHours(hour);

              return (
                <div
                  key={`${day}-${hour}`}
                  onClick={() => onSlotClick(date, hour)}
                  className="p-2 border-r border-b min-h-[4rem] cursor-pointer hover:bg-gray-50"
                >
                  {bookings
                    .filter(
                      (booking) =>
                        booking.startTime.getDate() === date.getDate() &&
                        booking.startTime.getHours() === hour
                    )
                    .map((booking) => (
                      <div
                        key={booking.id}
                        className="text-sm bg-indigo-100 text-indigo-800 p-1 rounded mb-1"
                      >
                        {booking.title}
                      </div>
                    ))}
                </div>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;