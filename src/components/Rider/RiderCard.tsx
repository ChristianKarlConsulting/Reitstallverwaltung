import React from 'react';
import { User, Phone, Mail, Calendar, Bike } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { Rider } from '../../types/rider';

type RiderCardProps = {
  rider: Rider;
  onClick: (rider: Rider) => void;
};

const RiderCard: React.FC<RiderCardProps> = ({ rider, onClick }) => {
  return (
    <div
      onClick={() => onClick(rider)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <User className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">{rider.name}</h3>
            <p className="text-sm text-gray-600">
              Mitglied seit {format(rider.memberSince, 'MMMM yyyy', { locale: de })}
            </p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-sm ${
            rider.status === 'aktiv'
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {rider.status}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-center text-gray-600">
          <Mail className="h-4 w-4 mr-2" />
          <span>{rider.email}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Phone className="h-4 w-4 mr-2" />
          <span>{rider.phone}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Bike className="h-4 w-4 mr-2" />
          <span>{rider.horses.length} Pferde</span>
        </div>
      </div>
    </div>
  );
};

export default RiderCard;