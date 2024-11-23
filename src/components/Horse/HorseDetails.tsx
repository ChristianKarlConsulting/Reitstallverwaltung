import React from 'react';
import { X, Calendar, Apple, Users } from 'lucide-react';
import type { Horse } from '../../types/horse';

type HorseDetailsProps = {
  horse: Horse;
  onClose: () => void;
};

const HorseDetails: React.FC<HorseDetailsProps> = ({ horse, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">{horse.name}</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2">Allgemeine Informationen</h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Besitzer:</span> {horse.owner}</p>
                  <p><span className="font-medium">Rasse:</span> {horse.breed}</p>
                  <p><span className="font-medium">Farbe:</span> {horse.color}</p>
                  <p><span className="font-medium">Box:</span> {horse.boxNumber}</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Users className="h-5 w-5 mr-2" />
                  Reitbeteiligungen
                </h3>
                <div className="space-y-2">
                  {horse.ridingParticipants.map((participant) => (
                    <div key={participant.id} className="bg-gray-50 p-3 rounded">
                      <p className="font-medium">{participant.name}</p>
                      <p className="text-sm text-gray-600">{participant.email}</p>
                      <p className="text-sm text-gray-600">{participant.phone}</p>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-4">
              <section>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Termine
                </h3>
                <div className="space-y-2">
                  <p><span className="font-medium">Tierarzt:</span> {horse.veterinarian.nextVisit}</p>
                  <p><span className="font-medium">Hufschmied:</span> {horse.farrier.nextVisit}</p>
                </div>
              </section>

              <section>
                <h3 className="text-lg font-semibold mb-2 flex items-center">
                  <Apple className="h-5 w-5 mr-2" />
                  Fütterungsplan
                </h3>
                <div className="space-y-2">
                  <div>
                    <p className="font-medium">Morgens:</p>
                    <ul className="list-disc list-inside">
                      {horse.feedingPlan.morning.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Mittags:</p>
                    <ul className="list-disc list-inside">
                      {horse.feedingPlan.noon.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-medium">Abends:</p>
                    <ul className="list-disc list-inside">
                      {horse.feedingPlan.evening.map((item, index) => (
                        <li key={index} className="text-sm text-gray-600">{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorseDetails;