import React from 'react';
import { Horse as HorseIcon, Users, Stethoscope, Hammer } from 'lucide-react';
import type { Horse } from '../../types/horse';

type HorseCardProps = {
  horse: Horse;
  onClick: (horse: Horse) => void;
};

const HorseCard: React.FC<HorseCardProps> = ({ horse, onClick }) => {
  return (
    <div
      onClick={() => onClick(horse)}
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <HorseIcon className="h-8 w-8 text-indigo-600 mr-3" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{horse.name}</h3>
            <p className="text-sm text-gray-600">Box {horse.boxNumber}</p>
          </div>
        </div>
        <span className="px-3 py-1 text-sm bg-indigo-100 text-indigo-800 rounded-full">
          {horse.breed}
        </span>
      </div>

      <div className="space-y-3">
        <div className="flex items-center text-gray-600">
          <Users className="h-5 w-5 mr-2" />
          <span>{horse.ridingParticipants.length} Reitbeteiligungen</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Stethoscope className="h-5 w-5 mr-2" />
          <span>Nächster Tierarzt: {horse.veterinarian.nextVisit || 'Nicht geplant'}</span>
        </div>

        <div className="flex items-center text-gray-600">
          <Hammer className="h-5 w-5 mr-2" />
          <span>Nächster Hufschmied: {horse.farrier.nextVisit || 'Nicht geplant'}</span>
        </div>
      </div>
    </div>
  );
};

export default HorseCard;