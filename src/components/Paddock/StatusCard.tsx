import React from 'react';
import { Sun, Cloud, CloudRain } from 'lucide-react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import type { PaddockStatus } from '../../types/paddock';

type StatusCardProps = {
  status: PaddockStatus;
  onToggle: () => void;
  onUpdate: (status: Partial<PaddockStatus>) => void;
};

const weatherIcons = {
  sunny: Sun,
  cloudy: Cloud,
  rainy: CloudRain,
};

const StatusCard: React.FC<StatusCardProps> = ({ status, onToggle, onUpdate }) => {
  const WeatherIcon = weatherIcons[status.weather as keyof typeof weatherIcons] || Cloud;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">Koppelstatus</h3>
          <p className="text-sm text-gray-600">
            Zuletzt aktualisiert: {format(status.lastUpdated, 'dd. MMMM, HH:mm', { locale: de })} Uhr
          </p>
        </div>
        <WeatherIcon className="h-8 w-8 text-gray-600" />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">Koppeln sind aktuell:</span>
          <button
            onClick={onToggle}
            className={`px-4 py-2 rounded-full font-medium ${
              status.isOpen
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'
            }`}
          >
            {status.isOpen ? 'Geöffnet' : 'Geschlossen'}
          </button>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Wetter
          </label>
          <select
            value={status.weather}
            onChange={(e) => onUpdate({ weather: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          >
            <option value="sunny">Sonnig</option>
            <option value="cloudy">Bewölkt</option>
            <option value="rainy">Regnerisch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Anmerkungen
          </label>
          <textarea
            value={status.notes}
            onChange={(e) => onUpdate({ notes: e.target.value })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            rows={3}
            placeholder="Zusätzliche Informationen..."
          />
        </div>
      </div>
    </div>
  );
};

export default StatusCard;